import { useState, useEffect } from "react";
import { fetchTopics, fetchDemographics } from "../api";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid
} from "recharts";

const COLORS = ["#00d4ff", "#9b5de5", "#00ff88", "#ffcc00", "#ff4466", "#f97316", "#06b6d4", "#84cc16"];

const VelocityBar = ({ score, max }) => {
  const pct = Math.min((score / max) * 100, 100);
  const color = pct > 70 ? "#ff4466" : pct > 40 ? "#ffcc00" : "#00d4ff";
  return (
    <div className="w-full h-1.5 bg-ntro-700 rounded-full overflow-hidden">
      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
};

export default function TrendsTab() {
  const [topics, setTopics]   = useState([]);
  const [demo, setDemo]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchTopics(10), fetchDemographics()])
      .then(([t, d]) => { setTopics(t.topics || []); setDemo(d); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const maxVelocity = Math.max(...topics.map(t => t.velocity_score), 1);

  const ageData = demo ? Object.entries(demo.age_brackets).map(([k, v]) => ({ name: k, count: v })) : [];
  const roleData = demo ? Object.entries(demo.professional_roles)
    .sort((a, b) => b[1] - a[1])
    .map(([k, v]) => ({ name: k.split("&")[0].trim(), count: v })) : [];
  const locData = demo ? Object.entries(demo.locations)
    .sort((a, b) => b[1] - a[1])
    .map(([k, v]) => ({ name: k, count: v })) : [];

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Trending Topics Panel */}
      <div className="col-span-2 bg-ntro-800 border border-ntro-700 rounded-xl p-5">
        <h2 className="text-ntro-accent font-bold text-lg uppercase tracking-widest mb-4">
          🔥 Trending Topics Panel
        </h2>
        {loading ? (
          <div className="text-gray-500 text-sm py-8 text-center font-mono">Querying top topics…</div>
        ) : (
          <div className="space-y-3">
            {topics.map((t, i) => (
              <div key={t.topic_id} className="flex items-start gap-4 p-3 bg-ntro-700 rounded-lg hover:bg-ntro-600 transition-colors">
                <span className="text-ntro-accent font-bold text-lg w-6 flex-shrink-0">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-white text-sm truncate">{t.label}</span>
                    <span className="text-ntro-red font-mono text-xs ml-2 flex-shrink-0 font-bold">
                      ↑ {t.velocity_score?.toFixed(1)}/hr velocity
                    </span>
                  </div>
                  <VelocityBar score={t.velocity_score} max={maxVelocity} />
                  <div className="flex flex-wrap gap-1 mt-2">
                    {(t.keywords || []).slice(0, 5).map(kw => (
                      <span key={kw} className="bg-ntro-600 border border-ntro-500 text-ntro-accent text-[10px] font-mono px-2 py-0.5 rounded">
                        #{kw}
                      </span>
                    ))}
                    <span className="text-gray-500 text-xs ml-auto font-mono">{t.post_count?.toLocaleString()} posts</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Age Distribution Card */}
      <div className="bg-ntro-800 border border-ntro-700 rounded-xl p-5">
        <h3 className="text-ntro-purple font-bold uppercase tracking-widest text-sm mb-4">Age Distribution</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={ageData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2d4a" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: "#9ca3af", fontSize: 10 }} tickLine={false} />
            <YAxis tick={{ fill: "#9ca3af", fontSize: 10 }} tickLine={false} />
            <Tooltip contentStyle={{ background: "#0f1629", border: "1px solid #2a3f5f", fontSize: 11 }} />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {ageData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* GPE Locations Card */}
      <div className="bg-ntro-800 border border-ntro-700 rounded-xl p-5">
        <h3 className="text-ntro-yellow font-bold uppercase tracking-widest text-sm mb-4">Top GPE Locations</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={locData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2d4a" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: "#9ca3af", fontSize: 10 }} tickLine={false} />
            <YAxis tick={{ fill: "#9ca3af", fontSize: 10 }} tickLine={false} />
            <Tooltip contentStyle={{ background: "#0f1629", border: "1px solid #2a3f5f", fontSize: 11 }} />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {locData.map((_, i) => <Cell key={i} fill={COLORS[(i + 2) % COLORS.length]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Professional Role Card */}
      <div className="col-span-2 bg-ntro-800 border border-ntro-700 rounded-xl p-5">
        <h3 className="text-ntro-green font-bold uppercase tracking-widest text-sm mb-4">Professional Roles</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={roleData} layout="vertical" margin={{ left: 10, right: 20, top: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2d4a" horizontal={false} />
            <XAxis type="number" tick={{ fill: "#9ca3af", fontSize: 10 }} tickLine={false} />
            <YAxis type="category" dataKey="name" tick={{ fill: "#d1d5db", fontSize: 10 }} tickLine={false} width={130} />
            <Tooltip contentStyle={{ background: "#0f1629", border: "1px solid #2a3f5f", fontSize: 11 }} />
            <Bar dataKey="count" radius={[0, 4, 4, 0]}>
              {roleData.map((_, i) => <Cell key={i} fill={COLORS[(i + 4) % COLORS.length]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
