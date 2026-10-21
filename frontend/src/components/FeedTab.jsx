import { useState, useEffect } from "react";
import { fetchFeedLive } from "../api";
import { RefreshCw, Radio } from "lucide-react";

export default function FeedTab({ activePlatforms }) {
  const [feed, setFeed]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit]     = useState(20);

  const loadFeed = () => {
    setLoading(true);
    fetchFeedLive(limit)
      .then(d => { setFeed(d.feed || []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadFeed();
  }, [limit]);

  // Filter feed based on active header toggles
  const filtered = feed.filter(item => {
    const platform = item.platform?.toLowerCase();
    const platKey = platform === "twitter" ? "x" : platform;
    return activePlatforms[platKey];
  });

  const getSentimentBadge = (item) => {
    const scores = [
      { name: "Sarcastic", val: item.sarcasm_score, bg: "bg-purple-900/40 text-purple-300 border-purple-500" },
      { name: "Anxious", val: item.anxiety_score, bg: "bg-red-900/40 text-red-300 border-red-500" },
      { name: "Excited", val: item.excitement_score, bg: "bg-blue-900/40 text-blue-300 border-blue-500" },
      { name: "Supportive", val: item.support_score, bg: "bg-green-900/40 text-green-300 border-green-500" },
      { name: "Opposition", val: item.opposition_score, bg: "bg-yellow-900/40 text-yellow-300 border-yellow-500" }
    ];
    // Find the highest score above a threshold
    const highest = scores.reduce((prev, current) => (prev.val > current.val) ? prev : current);
    if (highest.val > 0.4) {
      return (
        <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${highest.bg}`}>
          {highest.name} ({(highest.val * 100).toFixed(0)}%)
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded text-[10px] font-mono border border-gray-600 bg-gray-800 text-gray-400">
        Neutral
      </span>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-ntro-accent font-bold text-lg uppercase tracking-widest flex items-center gap-2">
          <Radio className="w-5 h-5 animate-pulse text-ntro-accent" /> Live Ingestion Feed
        </h2>
        <div className="flex items-center gap-3">
          <button
            onClick={loadFeed}
            className="p-1.5 rounded bg-ntro-700 hover:bg-ntro-600 text-gray-300 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <select
            value={limit}
            onChange={e => setLimit(Number(e.target.value))}
            className="bg-ntro-700 border border-ntro-600 text-gray-300 text-xs rounded px-3 py-1"
          >
            <option value={10}>Show 10</option>
            <option value={20}>Show 20</option>
            <option value={50}>Show 50</option>
          </select>
        </div>
      </div>

      {loading && feed.length === 0 ? (
        <div className="text-center py-12 text-gray-500">Connecting to ingestion stream...</div>
      ) : (
        <div className="bg-ntro-800 border border-ntro-700 rounded-xl overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-ntro-700 text-gray-400 uppercase tracking-widest text-left">
                <th className="px-4 py-3 w-16">Timestamp</th>
                <th className="px-4 py-3 w-16">Platform</th>
                <th className="px-4 py-3 w-28">User ID</th>
                <th className="px-4 py-3">Message Content</th>
                <th className="px-4 py-3 w-36">Sentiment State</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, idx) => (
                <tr key={idx} className="border-t border-ntro-700 hover:bg-ntro-700/40 transition-colors">
                  <td className="px-4 py-3 font-mono text-gray-500">
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold
                      ${item.platform?.toLowerCase() === "telegram" ? "bg-blue-900/40 text-blue-300" : "bg-gray-800 text-gray-300"}`}>
                      {item.platform}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-gray-400">
                    {item.user_id?.slice(0, 10)}...
                  </td>
                  <td className="px-4 py-3 text-white font-sans max-w-md truncate">
                    {item.raw_text}
                  </td>
                  <td className="px-4 py-3">
                    {getSentimentBadge(item)}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-500 font-mono">
                    No posts matched active platform filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
