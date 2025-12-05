"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import { Music, Github, GitBranch, Code } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface GithubDay {
  count: number;
  date: string;
  label?: string;
}

interface GithubData {
  contributions: GithubDay[];
  totalPRs: number;
  totalCommits: number;
  totalContributions: number;
}

interface SpotifyTrack {
  title: string;
  artist: string;
  songUrl: string;
  albumImageUrl: string;
}

interface NowPlaying {
  isPlaying: boolean;
  isRecent: boolean;
  title: string;
  artist: string;
  songUrl: string;
  albumImageUrl?: string;
  progressMs: number;
  durationMs: number;
  stats?: {
    totalGenres: number;
    topGenre: string;
  };
  recentTracks: SpotifyTrack[];
}

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fade-up" | "scale" | "slide-left" | "zoom-in";
  delay?: number;
}

interface BarData {
  height: string;
  opacity: number;
  data?: {
    count: number;
    date: string;
    label?: string;
  };
}


function useOnScreen<T extends Element>(ref: React.RefObject<T | null>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
    }, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return visible;
}

const Reveal = ({ children, className = "", animation = "fade-up", delay = 0 }: RevealProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isVisible = useOnScreen(ref);
  const getTransform = () => {
    switch (animation) {
      case "fade-up":
        return isVisible ? "translateY(0)" : "translateY(50px)";
      case "scale":
        return isVisible ? "scale(1)" : "scale(0.8)";
      case "slide-left":
        return isVisible ? "translateX(0)" : "translateX(-50px)";
      case "zoom-in":
        return isVisible ? "scale(1)" : "scale(1.1)";
      default:
        return "none";
    }
  };
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${className}`}
      style={{ opacity: isVisible ? 1 : 0, transform: getTransform(), transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function DataSection() {
  const t = useTranslations('Home.Data');

  const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const res = await fetch('/api/spotify');
        const data = await res.json();
        setNowPlaying(data);
      } catch (e) {
        console.error("Error fetching spotify data", e);
      }
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 10000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`;
  };

  const [githubData, setGithubData] = useState<GithubData | null>(null);
  const [filter, setFilter] = useState("1M");
  const [hoveredDay, setHoveredDay] = useState<GithubDay | null>(null);

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const res = await fetch('/api/github');
        const data = await res.json();
        setGithubData(data);
      } catch (e) {
        console.error("Error fetching github data", e);
      }
    };
    fetchGithubData();
  }, []);

  const bars = useMemo(() => {
    if (!githubData?.contributions) {
      return Array.from({ length: 30 }, () => ({ height: "0%", opacity: 0, data: undefined }));
    }

    let days = [...githubData.contributions].sort((a: GithubDay, b: GithubDay) => new Date(a.date).getTime() - new Date(b.date).getTime());
    if (filter === "1M") days = days.slice(-30);
    else if (filter === "6M") days = days.slice(-180);
    else if (filter === "1Y") days = days.slice(-365);

    let mode: "day" | "week" | "month" = "day";
    if (days.length > 360) mode = "month";
    else if (days.length > 90) mode = "week";

    let series: Array<{ count: number; date: string; label?: string }>;
    if (mode === "day") {
      series = days.map((d: GithubDay) => ({ count: d.count, date: d.date }));
    } else if (mode === "week") {
      const buckets: Record<string, { count: number; start: Date; end: Date }> = {};
      for (const d of days) {
        const dt = new Date(d.date);
        const start = new Date(dt);
        const dow = start.getDay();
        start.setHours(0, 0, 0, 0);
        start.setDate(start.getDate() - dow);
        const end = new Date(start);
        end.setDate(end.getDate() + 6);
        const key = start.toISOString().slice(0, 10);
        if (!buckets[key]) buckets[key] = { count: 0, start, end };
        buckets[key].count += d.count;
      }
      series = Object.keys(buckets)
        .sort()
        .map((k) => ({
          count: buckets[k].count,
          date: buckets[k].start.toISOString(),
          label: `${buckets[k].start.toLocaleDateString()} - ${buckets[k].end.toLocaleDateString()}`,
        }));
    } else {
      const buckets: Record<string, { count: number; date: Date; label: string }> = {};
      for (const d of days) {
        const dt = new Date(d.date);
        const key = `${dt.getFullYear()}-${dt.getMonth() + 1}`;
        const label = dt.toLocaleDateString(undefined, { year: "numeric", month: "short" });
        if (!buckets[key]) buckets[key] = { count: 0, date: new Date(dt.getFullYear(), dt.getMonth(), 1), label };
        buckets[key].count += d.count;
      }
      series = Object.keys(buckets)
        .sort()
        .map((k) => ({ count: buckets[k].count, date: buckets[k].date.toISOString(), label: buckets[k].label }));
    }

    const counts = series.map((d) => d.count);
    const max = Math.max(...counts, 1);
    return series.map((d) => ({
      height: `${Math.max(10, (d.count / max) * 100)}%`,
      opacity: d.count === 0 ? 0.2 : Math.max(0.4, d.count / max),
      data: d,
    }));
  }, [githubData, filter]);
  return (
    <section id="data" className="relative z-10 isolate w-full bg-black text-white py-32 px-8 md:px-12 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <Reveal animation="fade-up">
          <h2 className="text-4xl md:text-5xl font-light tracking-tighter mb-8">
            {t('title')} <span className="text-[#486F99]">{t('titleSpan')}</span> {t('titleFlow')}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-5 bg-[#0a0a0a] rounded-4xl p-8 border border-white/5 relative overflow-hidden group hover:border-[#486F99]/30 transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
              <Image src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png" alt="Spotify" width={80} height={24} className="w-20" />
            </div>
            <div className="relative z-10 flex flex-col h-full justify-between gap-8">
              <div>
                <div className="flex items-center gap-2 text-[#1DB954] mb-4">
                  <Music size={18} className={nowPlaying?.isPlaying ? "animate-spin" : ""} />
                  <span className="text-xs font-mono tracking-widest">
                    {nowPlaying?.isPlaying ? t('spotify.nowPlaying') : nowPlaying?.isRecent ? t('spotify.recentlyPlayed') : t('spotify.offline')}
                  </span>
                </div>
                {nowPlaying?.isPlaying || nowPlaying?.isRecent ? (
                  <>
                    <a href={nowPlaying.songUrl} target="_blank" rel="noopener noreferrer" className="block group-hover:underline decoration-[#1DB954] underline-offset-4 transition-all">
                      <h4 className="text-3xl mb-1 text-white line-clamp-2">{nowPlaying.title}</h4>
                    </a>
                    <p className="text-gray-400 text-sm line-clamp-1">{nowPlaying.artist}</p>
                  </>
                ) : (
                  <>
                    <h4 className="text-3xl mb-1 text-white">{t('spotify.notPlaying')}</h4>
                    <p className="text-gray-400 text-sm">{t('spotify.spotifyName')}</p>
                  </>
                )}
              </div>

              {nowPlaying?.isPlaying && (
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-mono text-gray-500">
                    <span>{formatTime(nowPlaying.progressMs)}</span>
                    <span>{formatTime(nowPlaying.durationMs)}</span>
                  </div>
                  <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#1DB954] transition-all duration-1000 ease-linear"
                      style={{ width: `${(nowPlaying.progressMs / nowPlaying.durationMs) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {(!nowPlaying?.isPlaying && nowPlaying?.isRecent) && (
                <div className="space-y-2 opacity-50">
                  <div className="flex justify-between text-[10px] font-mono text-gray-500">
                    <span>--:--</span>
                    <span>--:--</span>
                  </div>
                  <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gray-600 w-full" />
                  </div>
                </div>
              )}

              {(!nowPlaying?.isPlaying && !nowPlaying?.isRecent) && (
                <div className="space-y-2 opacity-50">
                  <div className="flex justify-between text-[10px] font-mono text-gray-500">
                    <span>--:--</span>
                    <span>--:--</span>
                  </div>
                  <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gray-600 w-0" />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/5">
                <div>
                  <p className="text-2xl font-mono text-white">{nowPlaying?.stats?.totalGenres || "-"}</p>
                  <p className="text-[10px] text-gray-500 uppercase">{t('spotify.genres')}</p>
                </div>
                <div>
                  <p className="text-xl font-mono text-white truncate" title={nowPlaying?.stats?.topGenre}>{nowPlaying?.stats?.topGenre || "-"}</p>
                  <p className="text-[10px] text-gray-500 uppercase">{t('spotify.topGenre')}</p>
                </div>
              </div>

              {nowPlaying?.recentTracks && nowPlaying.recentTracks.length > 0 && (
                <div className="mt-4 pt-4 border-t border-white/5">
                  <p className="text-[10px] text-gray-500 uppercase mb-3">{t('spotify.recentHistory')}</p>
                  <div className="space-y-3">
                    {nowPlaying?.recentTracks.map((track: SpotifyTrack, i: number) => (
                      <a key={i} href={track.songUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group/track">
                        <Image src={track.albumImageUrl} alt={track.title} width={40} height={40} className="w-10 h-10 rounded-md opacity-60 grayscale group-hover/track:grayscale-0 group-hover/track:opacity-100 transition-all" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-white truncate group-hover/track:text-[#1DB954] transition-colors">{track.title}</p>
                          <p className="text-[10px] text-gray-500 truncate">{track.artist}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {nowPlaying?.albumImageUrl && (
              <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-[100px] opacity-20 group-hover:opacity-30 transition-opacity">
                <Image src={nowPlaying.albumImageUrl} alt="Background" fill className="w-full h-full object-cover opacity-50" />
              </div>
            )}
            {!nowPlaying?.albumImageUrl && (
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#1DB954] rounded-full blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity" />
            )}
          </div>

          <div className="md:col-span-7 grid grid-rows-2 gap-6">
            <div className="bg-[#0a0a0a] rounded-4xl p-8 border border-white/5 flex flex-col justify-center relative overflow-hidden hover:border-[#486F99]/30 transition-all group/github">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-xl font-medium flex items-center gap-2">
                    <Github size={20} /> {t('github.title')}
                  </h4>
                  <div className="flex gap-2 mt-2">
                    {['1M', '6M', '1Y', 'ALL'].map((f) => (
                      <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`text-[10px] font-mono px-2 py-1 rounded-md transition-colors ${filter === f
                          ? "bg-[#486F99] text-white"
                          : "bg-white/5 text-gray-500 hover:bg-white/10"
                          }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`w-3 h-3 rounded-sm ${i > 1 ? "bg-[#486F99]" : "bg-gray-800"}`} />
                    ))}
                  </div>
                  {hoveredDay && (
                    <div className="text-[10px] font-mono text-[#486F99] animate-fade-in">
                      {hoveredDay.count} {t('github.contribsIn')} {hoveredDay.label ? `${hoveredDay.label}` : `${t('github.contribsOn')} ${new Date(hoveredDay.date).toLocaleDateString()}`}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-[2px] h-24 items-end w-full">
                {bars.map((b: BarData, i: number) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm bg-[#486F99] transition-all duration-300 hover:bg-[#5a8bc0] relative group/bar"
                    style={{ height: b.height, opacity: b.opacity }}
                    onMouseEnter={() => setHoveredDay(b.data || null)}
                    onMouseLeave={() => setHoveredDay(null)}
                  >
                  </div>
                ))}
              </div>

              <div className="mt-4 flex gap-4 text-xs font-mono text-gray-400">
                <span className="flex items-center gap-1"><GitBranch size={12} /> {githubData?.totalPRs || "-"} {t('github.prs')}</span>
                <span className="flex items-center gap-1"><Code size={12} /> {githubData?.totalCommits || "-"} {t('github.commits')}</span>
                <span className="flex items-center gap-1 ml-auto text-[#486F99]">{githubData?.totalContributions || "-"} {t('github.totalContribs')}</span>
              </div>
            </div>

            <div className="bg-[#486F99] rounded-4xl p-8 flex items-center relative overflow-hidden text-black">
              <div className="relative z-10 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                  <div>
                    <h5 className="font-bold text-xl opacity-50 mb-2 uppercase tracking-wider">{t('stack.title')}</h5>
                    <p className="text-sm font-medium text-lg leading-relaxed">
                      {t('stack.description')}
                    </p>
                  </div>
                  <div>
                    <h5 className="font-bold text-xl opacity-50 mb-2 uppercase tracking-wider">{t('skills.title')}</h5>
                    <p className="text-sm font-medium text-lg leading-relaxed">
                      {t('skills.description')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}
