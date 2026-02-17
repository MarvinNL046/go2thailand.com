import React, { useState, useEffect, useCallback } from "react";
import Head from "next/head";

// ---- Types ----

interface PostMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
}

interface RecentPost {
  slug: string;
  title: string;
  date: string;
  category: string;
}

interface StatusData {
  content: {
    totalPosts: number;
    recentPosts: RecentPost[];
    localeStats: Record<string, number>;
  };
  health: {
    status: string;
    timestamp: string;
    contentDir: string;
    enDirExists: boolean;
  };
}

interface GenerateResult {
  success: boolean;
  slug: string;
  title: string;
  category: string;
  locales: string[];
  filePath?: string;
}

interface ScrapeResult {
  status: string;
  type: string;
  query: string | null;
  startedAt: string;
  completedAt: string;
  results: unknown;
}

// ---- Auth gate ----

function LoginForm({ onLogin }: { onLogin: (key: string) => void }) {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (key.length < 8) {
      setError("Key must be at least 8 characters.");
      return;
    }
    onLogin(key);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Admin Login</h1>
        <p className="text-sm text-gray-500 mb-6">Enter your pipeline key to access the dashboard.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pipeline Key
            </label>
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter key (min 8 chars)"
              autoFocus
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

// ---- Spinner ----

function Spinner() {
  return (
    <svg
      className="animate-spin h-5 w-5 text-blue-600 inline-block"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8H4z"
      />
    </svg>
  );
}

// ---- Section wrapper ----

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
      {children}
    </div>
  );
}

// ---- Main Dashboard ----

function Dashboard({ pipelineKey, onLogout }: { pipelineKey: string; onLogout: () => void }) {
  // --- Status state ---
  const [status, setStatus] = useState<StatusData | null>(null);
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusError, setStatusError] = useState("");

  // --- Posts state ---
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [postsError, setPostsError] = useState("");
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

  // --- Generate state ---
  const [topic, setTopic] = useState("");
  const [model, setModel] = useState<"claude-haiku" | "gpt-4o-mini" | "gpt-5-nano">("gpt-5-nano");
  const [generating, setGenerating] = useState(false);
  const [generateResult, setGenerateResult] = useState<GenerateResult | null>(null);
  const [generateError, setGenerateError] = useState("");

  // --- Scrape state ---
  const [scrapeLoading, setScrapeLoading] = useState(false);
  const [scrapeResult, setScrapeResult] = useState<ScrapeResult | null>(null);
  const [scrapeError, setScrapeError] = useState("");
  const [scrapeTopicQuery, setScrapeTopicQuery] = useState("");

  const headers = {
    "Content-Type": "application/json",
    "x-pipeline-key": pipelineKey,
  };

  // --- Fetch status ---
  const fetchStatus = useCallback(async () => {
    setStatusLoading(true);
    setStatusError("");
    try {
      const res = await fetch("/api/pipeline/status", { headers });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      const data: StatusData = await res.json();
      setStatus(data);
    } catch (err) {
      setStatusError(err instanceof Error ? err.message : "Failed to load status");
    } finally {
      setStatusLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pipelineKey]);

  // --- Fetch posts ---
  const fetchPosts = useCallback(async () => {
    setPostsLoading(true);
    setPostsError("");
    try {
      const res = await fetch("/api/pipeline/posts", { headers });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      const data: { posts: PostMeta[]; total: number } = await res.json();
      setPosts(data.posts);
    } catch (err) {
      setPostsError(err instanceof Error ? err.message : "Failed to load posts");
    } finally {
      setPostsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pipelineKey]);

  // Load on mount
  useEffect(() => {
    fetchStatus();
    fetchPosts();
  }, [fetchStatus, fetchPosts]);

  // --- Generate post ---
  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setGenerating(true);
    setGenerateResult(null);
    setGenerateError("");
    try {
      const res = await fetch("/api/pipeline/generate", {
        method: "POST",
        headers,
        body: JSON.stringify({
          topic: topic.trim() || undefined,
          model,
          publish: false,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || data.details || `HTTP ${res.status}`);
      }
      setGenerateResult(data as GenerateResult);
      // Refresh posts and status after generation
      fetchPosts();
      fetchStatus();
    } catch (err) {
      setGenerateError(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setGenerating(false);
    }
  }

  // --- Delete post ---
  async function handleDelete(slug: string) {
    if (!confirm(`Delete post "${slug}" from all locales?`)) return;
    setDeletingSlug(slug);
    try {
      const res = await fetch(`/api/pipeline/posts?slug=${encodeURIComponent(slug)}`, {
        method: "DELETE",
        headers,
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      // Remove from local state
      setPosts((prev) => prev.filter((p) => p.slug !== slug));
      fetchStatus();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeletingSlug(null);
    }
  }

  // --- Scrape ---
  async function handleScrape(type: "news" | "thailandblog" | "topic") {
    setScrapeLoading(true);
    setScrapeResult(null);
    setScrapeError("");
    try {
      const body: { type: string; query?: string } = { type };
      if (type === "topic") {
        if (!scrapeTopicQuery.trim()) {
          setScrapeError("Please enter a search query.");
          setScrapeLoading(false);
          return;
        }
        body.query = scrapeTopicQuery.trim();
      }
      const res = await fetch("/api/pipeline/scrape", {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || data.details || `HTTP ${res.status}`);
      }
      setScrapeResult(data as ScrapeResult);
    } catch (err) {
      setScrapeError(err instanceof Error ? err.message : "Scrape failed");
    } finally {
      setScrapeLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-gray-900">go2thailand</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600 font-medium">Pipeline Admin</span>
        </div>
        <button
          onClick={onLogout}
          className="text-sm text-gray-500 hover:text-gray-700 underline"
        >
          Logout
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Status Section */}
        <Section title="Status">
          {statusLoading && <p className="text-sm text-gray-500">Loading status... <Spinner /></p>}
          {statusError && <p className="text-red-600 text-sm">{statusError}</p>}
          {status && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-blue-700">{status.content.totalPosts}</div>
                  <div className="text-sm text-blue-600 mt-1">Total Posts (EN)</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-lg font-bold text-green-700 capitalize">{status.health.status}</div>
                  <div className="text-sm text-green-600 mt-1">Health</div>
                </div>
                <div className={`rounded-lg p-4 text-center ${status.health.enDirExists ? "bg-green-50" : "bg-red-50"}`}>
                  <div className={`text-lg font-bold ${status.health.enDirExists ? "text-green-700" : "text-red-700"}`}>
                    {status.health.enDirExists ? "Yes" : "No"}
                  </div>
                  <div className={`text-sm mt-1 ${status.health.enDirExists ? "text-green-600" : "text-red-600"}`}>
                    EN dir exists
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-sm font-bold text-gray-700">
                    {new Date(status.health.timestamp).toLocaleTimeString()}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Last check</div>
                </div>
              </div>

              {/* Locale stats */}
              {Object.keys(status.content.localeStats).length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Posts per locale</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(status.content.localeStats).map(([locale, count]) => (
                      <span
                        key={locale}
                        className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded"
                      >
                        <span className="font-bold">{locale}</span>
                        <span className="text-gray-500">{count}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent posts */}
              {status.content.recentPosts.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Recent posts</h3>
                  <ul className="text-sm space-y-1">
                    {status.content.recentPosts.map((p) => (
                      <li key={p.slug} className="text-gray-600">
                        <span className="font-medium">{p.title}</span>
                        <span className="text-gray-400 ml-2">{p.date}</span>
                        {p.category && (
                          <span className="ml-2 text-xs bg-gray-100 text-gray-500 px-1 py-0.5 rounded">{p.category}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          <button
            onClick={fetchStatus}
            disabled={statusLoading}
            className="mt-4 text-sm text-blue-600 hover:text-blue-800 underline disabled:opacity-50"
          >
            Refresh status
          </button>
        </Section>

        {/* Generate Section */}
        <Section title="Generate New Blog Post">
          <form onSubmit={handleGenerate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Topic <span className="text-gray-400 font-normal">(optional — leave blank for auto-selection)</span>
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  disabled={generating}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  placeholder="e.g. Best beaches in Koh Samui"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value as "claude-haiku" | "gpt-4o-mini" | "gpt-5-nano")}
                  disabled={generating}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                >
                  <option value="gpt-4o-mini">gpt-4o-mini</option>
                  <option value="gpt-5-nano">gpt-5-nano</option>
                  <option value="claude-haiku">claude-haiku (needs Anthropic key)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={generating}
                className="bg-blue-600 text-white rounded-md px-5 py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition flex items-center gap-2"
              >
                {generating && <Spinner />}
                {generating ? "Generating... (up to 5 min)" : "Generate Post"}
              </button>
              {generating && (
                <p className="text-sm text-gray-500 italic">
                  This can take several minutes. Please wait...
                </p>
              )}
            </div>
          </form>

          {/* Generate result */}
          {generateError && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-3 text-sm text-red-700">
              <strong>Error:</strong> {generateError}
            </div>
          )}
          {generateResult && (
            <div className="mt-4 bg-green-50 border border-green-200 rounded-md p-4 text-sm">
              <p className="font-semibold text-green-800 mb-2">Post generated successfully!</p>
              <dl className="space-y-1 text-green-700">
                <div className="flex gap-2">
                  <dt className="font-medium w-20">Title:</dt>
                  <dd>{generateResult.title}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-medium w-20">Slug:</dt>
                  <dd className="font-mono text-xs">{generateResult.slug}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-medium w-20">Category:</dt>
                  <dd>{generateResult.category}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-medium w-20">Locales:</dt>
                  <dd>{generateResult.locales.join(", ")}</dd>
                </div>
              </dl>
            </div>
          )}
        </Section>

        {/* Posts List */}
        <Section title={`Blog Posts (${posts.length})`}>
          {postsLoading && <p className="text-sm text-gray-500">Loading posts... <Spinner /></p>}
          {postsError && <p className="text-red-600 text-sm">{postsError}</p>}
          {!postsLoading && posts.length === 0 && !postsError && (
            <p className="text-sm text-gray-500">No posts found.</p>
          )}
          {posts.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-500 uppercase tracking-wide border-b border-gray-200">
                    <th className="pb-2 pr-4 font-medium">Title</th>
                    <th className="pb-2 pr-4 font-medium">Category</th>
                    <th className="pb-2 pr-4 font-medium">Date</th>
                    <th className="pb-2 pr-4 font-medium">Tags</th>
                    <th className="pb-2 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {posts.map((post) => (
                    <tr key={post.slug} className="hover:bg-gray-50">
                      <td className="py-2 pr-4">
                        <span className="font-medium text-gray-800">{post.title}</span>
                        <br />
                        <span className="text-xs text-gray-400 font-mono">{post.slug}</span>
                      </td>
                      <td className="py-2 pr-4">
                        {post.category && (
                          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded">
                            {post.category}
                          </span>
                        )}
                      </td>
                      <td className="py-2 pr-4 text-gray-500 whitespace-nowrap">
                        {post.date ? post.date.slice(0, 10) : "—"}
                      </td>
                      <td className="py-2 pr-4">
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="text-xs text-gray-400">+{post.tags.length - 3}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-2">
                        <button
                          onClick={() => handleDelete(post.slug)}
                          disabled={deletingSlug === post.slug}
                          className="text-xs text-red-600 hover:text-red-800 underline disabled:opacity-50"
                        >
                          {deletingSlug === post.slug ? "Deleting..." : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <button
            onClick={fetchPosts}
            disabled={postsLoading}
            className="mt-4 text-sm text-blue-600 hover:text-blue-800 underline disabled:opacity-50"
          >
            Refresh posts
          </button>
        </Section>

        {/* Scrape Section */}
        <Section title="Scrape Content">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleScrape("news")}
                disabled={scrapeLoading}
                className="bg-indigo-600 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition flex items-center gap-2"
              >
                {scrapeLoading && <Spinner />}
                Scrape Thailand News
              </button>
              <button
                onClick={() => handleScrape("thailandblog")}
                disabled={scrapeLoading}
                className="bg-indigo-600 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition flex items-center gap-2"
              >
                {scrapeLoading && <Spinner />}
                Scrape ThailandBlog.nl
              </button>
            </div>

            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={scrapeTopicQuery}
                onChange={(e) => setScrapeTopicQuery(e.target.value)}
                disabled={scrapeLoading}
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                placeholder="Search topic..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleScrape("topic");
                }}
              />
              <button
                onClick={() => handleScrape("topic")}
                disabled={scrapeLoading}
                className="bg-indigo-600 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition flex items-center gap-2"
              >
                {scrapeLoading && <Spinner />}
                Search Topic
              </button>
            </div>
          </div>

          {scrapeError && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-3 text-sm text-red-700">
              <strong>Error:</strong> {scrapeError}
            </div>
          )}

          {scrapeResult && (
            <div className="mt-4 bg-indigo-50 border border-indigo-200 rounded-md p-4 text-sm">
              <p className="font-semibold text-indigo-800 mb-2">
                Scrape completed — type: <span className="font-mono">{scrapeResult.type}</span>
                {scrapeResult.query && (
                  <> query: &quot;{scrapeResult.query}&quot;</>
                )}
              </p>
              <p className="text-indigo-600 text-xs mb-3">
                {new Date(scrapeResult.startedAt).toLocaleTimeString()} → {new Date(scrapeResult.completedAt).toLocaleTimeString()}
              </p>
              <details className="cursor-pointer">
                <summary className="text-indigo-700 font-medium text-xs hover:underline">View raw results</summary>
                <pre className="mt-2 text-xs bg-white border border-indigo-100 rounded p-3 overflow-x-auto max-h-96 text-gray-700 whitespace-pre-wrap">
                  {JSON.stringify(scrapeResult.results, null, 2)}
                </pre>
              </details>
            </div>
          )}
        </Section>

      </div>
    </div>
  );
}

// ---- Page ----

const STORAGE_KEY = "go2thailand_pipeline_key";

export default function PipelinePage() {
  const [pipelineKey, setPipelineKey] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && stored.length >= 8) {
      setPipelineKey(stored);
    }
  }, []);

  function handleLogin(key: string) {
    localStorage.setItem(STORAGE_KEY, key);
    setPipelineKey(key);
  }

  function handleLogout() {
    localStorage.removeItem(STORAGE_KEY);
    setPipelineKey(null);
  }

  // Avoid SSR mismatch
  if (!mounted) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Pipeline Admin — go2thailand</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      {pipelineKey ? (
        <Dashboard pipelineKey={pipelineKey} onLogout={handleLogout} />
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </>
  );
}
