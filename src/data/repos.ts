import fallback from './repos.fallback.json';

export interface Repo {
  name: string;
  url: string;
  description: string | null;
  language: string | null;
  stars: number;
  pushedAt: string;
}

const OWNER = 'kameshrajshan';

// The profile README repo is not a project.
const HIDDEN = new Set([OWNER]);

// Repos on GitHub with no description get one here. Remove an entry once the
// description is written on GitHub itself.
const DESCRIPTIONS: Record<string, string> = {
  Dutam:
    'Multi-page company website with pages for services, capabilities, industries, and careers.',
  Portfolio:
    'This site. Built with Astro, with images optimized at build time and this repo list fetched from GitHub.',
};

// Repos with a deployed site link there instead of to the GitHub repo. A repo's
// "Website" field on GitHub (homepage) is used automatically; add entries here for
// anything that has no homepage set.
const LIVE: Record<string, string> = {
  Dutam: 'https://kameshrajshan.github.io/Dutam/index.html?lang=en',
};

/**
 * Public, non-fork repositories, newest push first. Fetched from the GitHub API at
 * build time. If the request fails (rate limit, offline), the committed snapshot in
 * repos.fallback.json is used so the build never breaks. Set GITHUB_TOKEN in CI to
 * avoid the unauthenticated rate limit.
 */
export async function getRepos(): Promise<Repo[]> {
  let raw: Repo[] = fallback as Repo[];

  try {
    const token = process.env.GITHUB_TOKEN;
    const res = await fetch(`https://api.github.com/users/${OWNER}/repos?per_page=100&sort=pushed`, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'portfolio-build',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);
    const data = (await res.json()) as any[];
    raw = data
      .filter((r) => !r.private && !r.fork)
      .map((r) => ({
        name: r.name,
        url: r.homepage || r.html_url,
        description: r.description,
        language: r.language,
        stars: r.stargazers_count,
        pushedAt: r.pushed_at,
      }));
  } catch (err) {
    console.warn(`[repos] using fallback snapshot: ${(err as Error).message}`);
  }

  return raw
    .filter((r) => !HIDDEN.has(r.name))
    .map((r) => ({ ...r, url: LIVE[r.name] ?? r.url, description: r.description ?? DESCRIPTIONS[r.name] ?? null }))
    .sort((a, b) => b.pushedAt.localeCompare(a.pushedAt));
}
