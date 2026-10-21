import { useState, useEffect } from "react";
import { fetchOverview } from "../api";
import { Activity, Database, Radio, Bot, Users } from "lucide-react";

const DOT = ({ ok }) => (
  <span className={`inline-block w-2.5 h-2.5 rounded-full mr-2 ${ok ? "bg-ntro-green animate-pulse" : "bg-ntro-red"}`} />
);

const StatCard = ({ label, value, color = "text-ntro-accent" }) => (
  <div className="bg-ntro-800 border border-ntro-600 rounded-lg p-4 flex flex-col gap-1 glow-accent hover:bg-ntro-700 transition-colors">
    <span className="text-gray-400 text-xs uppercase tracking-widest">{label}</span>
    <span className={`text-2xl font-bold ${color}`}>{value}</span>
  </div>
);

export default function Header({ onTabChange, activeTab, activePlatforms, onPlatformToggle }) {
  const [overview, setOverview] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const load = () => fetchOverview().then(setOverview).catch(() => setError(true));
    load();
    const id = setInterval(load, 15000);
    return () => clearInterval(id);
  }, []);

  const tabs = [
    { id: "sentiment", label: "Sentiment Analytics" },
    { id: "network", label: "Network Graph" },
    { id: "trends", label: "Trends & Demographics" },
    { id: "feed", label: "Live Feed & Ingestion" },
  ];

  return (
    <header className="bg-ntro-800 border-b border-ntro-600 sticky top-0 z-50">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-ntro-700">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-ntro-accent animate-pulse" />
          <span className="text-ntro-accent font-bold text-lg tracking-widest uppercase">
            NTRO · Social Media Intelligence
          </span>
        </div>

        {/* Platform Toggle Controls */}
        <div className="flex items-center gap-4 border border-ntro-600 bg-ntro-900 rounded-lg px-3 py-1">
          <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Monitor:</span>
          {["telegram", "x"].map(p => (
            <label key={p} className="flex items-center gap-2 cursor-pointer text-xs font-mono select-none">
              <input
                type="checkbox"
                checked={activePlatforms[p]}
                onChange={() => onPlatformToggle(p)}
                className="accent-ntro-accent"
              />
              <span className={activePlatforms[p] ? "text-ntro-accent font-bold" : "text-gray-500"}>
                {p.toUpperCase()}
              </span>
            </label>
          ))}
        </div>

        <div className="flex items-center gap-4 text-xs">
          {overview && (
            <>
              <span className="flex items-center gap-1">
                <DOT ok={overview.services?.clickhouse} />
                <span className="text-gray-400">ClickHouse</span>
              </span>
              <span className="flex items-center gap-1">
                <DOT ok={overview.services?.rabbitmq} />
                <span className="text-gray-400">RabbitMQ</span>
              </span>
              <span className="flex items-center gap-1">
                <DOT ok={overview.services?.neo4j} />
                <span className="text-gray-400">Neo4j</span>
              </span>
            </>
          )}
          <span className="text-ntro-yellow font-mono text-xs">
            {new Date().toLocaleTimeString()} IST
          </span>
        </div>
      </div>

      {/* Stat cards */}
      {overview && (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 px-6 py-3">
          <StatCard label="Posts Ingested" value={overview.total_posts_ingested?.toLocaleString() ?? "—"} />
          <StatCard label="Posts / Hour"   value={overview.posts_last_hour?.toLocaleString() ?? "—"} color="text-ntro-green" />
          <StatCard label="Active Topics"  value={overview.active_topics ?? "—"} color="text-ntro-yellow" />
          <StatCard label="KOLs"           value={overview.kol_count ?? "—"} color="text-ntro-purple" />
          <StatCard label="Bots Flagged"   value={overview.flagged_bots ?? "—"} color="text-ntro-red" />
        </div>
      )}

      {/* Nav tabs */}
      <nav className="flex gap-1 px-6 pb-0">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => onTabChange(t.id)}
            className={`px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded-t border-t border-l border-r transition-all
              ${activeTab === t.id
                ? "bg-ntro-900 border-ntro-accent text-ntro-accent"
                : "border-transparent text-gray-500 hover:text-gray-300 hover:bg-ntro-700"}`}
          >
            {t.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
