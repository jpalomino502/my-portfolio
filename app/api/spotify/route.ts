import { NextResponse } from 'next/server';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;

interface SpotifyArtist {
    name: string;
    genres: string[];
}

interface SpotifyImage {
    url: string;
}

interface SpotifyAlbum {
    name: string;
    images: SpotifyImage[];
}

interface SpotifyTrack {
    name: string;
    artists: SpotifyArtist[];
    external_urls: { spotify: string };
    album: SpotifyAlbum;
    duration_ms: number;
}

interface SpotifyPlayHistory {
    track: SpotifyTrack;
}

interface SpotifySong {
    is_playing: boolean;
    item: SpotifyTrack;
    progress_ms: number;
}


const getAccessToken = async () => {
    if (!refresh_token) {
        console.error("No Refresh Token found");
        return null;
    }

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token,
        }),
    });

    return response.json();
};

export async function GET() {
    if (!refresh_token) {
        return NextResponse.json({ isPlaying: false, error: "Missing Refresh Token" });
    }

    try {
        const { access_token } = await getAccessToken();

        if (!access_token) {
            return NextResponse.json({ isPlaying: false, error: "Failed to get access token" });
        }

        const response = await fetch(NOW_PLAYING_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        if (response.status === 204 || response.status > 400) {
            return await getSpotifyData(access_token, null);
        }

        const song = await response.json();

        if (song.item === null) {
            return await getSpotifyData(access_token, null);
        }

        return await getSpotifyData(access_token, song);
    } catch (error) {
        console.error("Error fetching Spotify data:", error);
        return NextResponse.json({ isPlaying: false });
    }
}

async function getSpotifyData(access_token: string, currentSong: SpotifySong | null) {
    const [recentlyPlayed, topArtists] = await Promise.all([
        getRecentlyPlayed(access_token),
        getTopArtists(access_token)
    ]);

    const recentTracks = recentlyPlayed.items ? recentlyPlayed.items.map((item: SpotifyPlayHistory) => ({
        title: item.track.name,
        artist: item.track.artists.map((_artist: SpotifyArtist) => _artist.name).join(', '),
        songUrl: item.track.external_urls.spotify,
        albumImageUrl: item.track.album.images[0].url,
    })) : [];

    const genres = new Set<string>();
    if (topArtists.items) {
        topArtists.items.forEach((artist: SpotifyArtist) => {
            artist.genres.forEach((genre: string) => genres.add(genre));
        });
    }

    const topGenre = topArtists.items && topArtists.items[0]?.genres[0]
        ? topArtists.items[0].genres[0]
        : "Music";

    let nowPlaying = null;
    if (currentSong && currentSong.item) {
        nowPlaying = {
            isPlaying: currentSong.is_playing,
            title: currentSong.item.name,
            artist: currentSong.item.artists.map((_artist: SpotifyArtist) => _artist.name).join(', '),
            album: currentSong.item.album.name,
            albumImageUrl: currentSong.item.album.images[0].url,
            songUrl: currentSong.item.external_urls.spotify,
            progressMs: currentSong.progress_ms,
            durationMs: currentSong.item.duration_ms,
        };
    } else if (recentTracks.length > 0) {
        const lastTrack = recentTracks[0];
        nowPlaying = {
            isPlaying: false,
            isRecent: true,
            title: lastTrack.title,
            artist: lastTrack.artist,
            albumImageUrl: lastTrack.albumImageUrl,
            songUrl: lastTrack.songUrl,
        };
    }

    return NextResponse.json({
        ...nowPlaying,
        recentTracks: recentTracks.slice(1, 3),
        stats: {
            totalGenres: genres.size,
            topGenre: topGenre.charAt(0).toUpperCase() + topGenre.slice(1),
        }
    });
}

async function getRecentlyPlayed(access_token: string) {
    const response = await fetch(`https://api.spotify.com/v1/me/player/recently-played?limit=5`, {
        headers: { Authorization: `Bearer ${access_token}` },
    });
    return response.json();
}

async function getTopArtists(access_token: string) {
    try {
        const response = await fetch(`https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term`, {
            headers: { Authorization: `Bearer ${access_token}` },
        });

        if (!response.ok) {
            console.error("Error fetching top artists:", response.status, response.statusText);
            const text = await response.text();
            console.error("Response body:", text);
            return { items: [] };
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Exception in getTopArtists:", error);
        return { items: [] };
    }
}
