import { useState, useEffect } from "react";
import { fetchFlaggedBots } from "../api";

const ScoreBar = ({ score }) => {
  const pct = Math.round(score * 100);
  const color = pct >= 85 ? "#ff4466" : pct >= 70 ? "#ffcc00" : "#9b5de5";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-ntro-700 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="font-mono text-xs" style={{ color }}>{pct}%</span>
    </div>
  );
};

const Flag = ({ text }) => (
  <span className="inline-block bg-ntro-700 border border-ntro-red text-ntro-red text-xs px-2 py-0.5 rounded mr-1 mb-1">
    {text}
  </span>
);

export default function BotTab() {
  const [bots, setBots]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy]   = useState("bot_score");
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    fetchFlaggedBots(30).then(d => setBots(d.bots || [])).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const sorted = [...bots].sort((a, b) => b[sortBy] - a[sortBy]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-ntro-red font-bold text-lg uppercase tracking-widest">⚠ Bot Detection Panel</h2>
        <div className="flex items-center gap-3">
          <span className="bg-ntro-red/20 border border-ntro-red text-ntro-red text-xs px-3 py-1 rounded-full">
            {bots.length} Accounts Flagged
          </span>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="bg-ntro-700 border border-ntro-600 text-gray-300 text-xs rounded px-3 py-1"
          >
            <option value="bot_score">Sort: Bot Score</option>
            <option value="posts_per_hour">Sort: Post Frequency</option>
            <option value="repetition_rate">Sort: Repetition Rate</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-gray-500 text-sm py-12 text-center">Loading bot data…</div>
      ) : (
        <div className="bg-ntro-800 border border-ntro-700 rounded-xl overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-ntro-700 text-gray-400 uppercase tracking-widest">
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">User ID</th>
                <th className="px-4 py-3 text-left">Platform</th>
                <th className="px-4 py-3 text-left w-40">Bot Score</th>
                <th className="px-4 py-3 text-right">Posts/hr</th>
                <th className="px-4 py-3 text-right">Repetition</th>
                <th className="px-4 py-3 text-left">Detected</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((bot, i) => (
                <>
                  <tr
                    key={bot.hashed_user_id}
                    onClick={() => setExpanded(expanded === bot.hashed_user_id ? null : bot.hashed_user_id)}
                    className={`border-t border-ntro-700 cursor-pointer transition-colors
                      ${expanded === bot.hashed_user_id ? "bg-ntro-700" : "hover:bg-ntro-700/50"}`}
                  >
                    <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                    <td className="px-4 py-3 font-mono text-ntro-red">
                      {bot.hashed_user_id.slice(0, 12)}…
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold
                        ${bot.platform === "telegram" ? "bg-blue-900/40 text-blue-300" : "bg-gray-800 text-gray-300"}`}>
                        {bot.platform}
                      </span>
                    </td>
                    <td className="px-4 py-3 w-40">
                      <ScoreBar score={bot.bot_score} />
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-ntro-yellow">{bot.posts_per_hour?.toFixed(1)}</td>
                    <td className="px-4 py-3 text-right font-mono text-ntro-purple">
                      {(bot.repetition_rate * 100)?.toFixed(0)}%
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(bot.detected_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </td>
                  </tr>
                  {expanded === bot.hashed_user_id && (
                    <tr key={`${bot.hashed_user_id}-detail`} className="bg-ntro-900">
                      <td colSpan={7} className="px-8 py-3">
                        <div className="flex flex-wrap gap-1">
                          <span className="text-gray-400 text-xs mr-2">Anomaly Flags:</span>
                          {(bot.anomaly_flags || []).map(f => <Flag key={f} text={f} />)}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Summary stats */}
      {bots.length > 0 && (
        <div className="grid grid-cols-3 gap-3 text-center text-xs">
          <div className="bg-ntro-800 border border-ntro-700 rounded-lg p-3">
            <div className="text-gray-400 mb-1">Avg Bot Score</div>
            <div className="text-ntro-red font-bold text-xl">
              {(bots.reduce((s, b) => s + b.bot_score, 0) / bots.length * 100).toFixed(1)}%
            </div>
          </div>
          <div className="bg-ntro-800 border border-ntro-700 rounded-lg p-3">
            <div className="text-gray-400 mb-1">Max Posts/hr</div>
            <div className="text-ntro-yellow font-bold text-xl">
              {Math.max(...bots.map(b => b.posts_per_hour)).toFixed(1)}
            </div>
          </div>
          <div className="bg-ntro-800 border border-ntro-700 rounded-lg p-3">
            <div className="text-gray-400 mb-1">Platforms Affected</div>
            <div className="text-ntro-accent font-bold text-xl">
              {new Set(bots.map(b => b.platform)).size}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
