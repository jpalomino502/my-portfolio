import { NextResponse } from 'next/server';

const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

interface GitHubDay {
  contributionCount: number;
  date: string;
}

interface GitHubWeek {
  contributionDays: GitHubDay[];
}


export async function GET() {
  if (!GITHUB_TOKEN || !GITHUB_USERNAME) {
    return NextResponse.json({ error: "Missing GitHub Credentials" }, { status: 500 });
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
          totalCommitContributions
          totalPullRequestContributions
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username: GITHUB_USERNAME },
      }),
    });

    const data = await response.json();

    if (data.errors) {
      console.error("GitHub API Errors:", data.errors);
      return NextResponse.json({ error: "GitHub API Error" }, { status: 500 });
    }

    const user = data.data.user;
    const calendar = user.contributionsCollection.contributionCalendar;
    const weeks = calendar.weeks;
    const days = weeks.flatMap((week: GitHubWeek) => week.contributionDays);

    return NextResponse.json({
      totalContributions: calendar.totalContributions,
      totalCommits: user.contributionsCollection.totalCommitContributions,
      totalPRs: user.contributionsCollection.totalPullRequestContributions,
      contributions: days.map((day: GitHubDay) => ({
        count: day.contributionCount,
        date: day.date
      })),
    });

  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
