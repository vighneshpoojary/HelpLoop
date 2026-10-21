import { useState, useEffect } from "react";
import { fetchSentiment } from "../api";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, Area, AreaChart,
} from "recharts";

const EMOTION_COLORS = {
  sarcasm_score:    "#9b5de5",
  anxiety_score:    "#ff4466",
  excitement_score: "#00d4ff",
  support_score:    "#00ff88",
  opposition_score: "#ffcc00",
};

const EMOTION_LABELS = {
  sarcasm_score:    "Sarcasm",
  anxiety_score:    "Anxiety",
  excitement_score: "Excitement",
  support_score:    "Support",
  opposition_score: "Opposition",
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-ntro-800 border border-ntro-600 rounded-lg p-3 text-xs">
      <p className="text-gray-400 mb-2">{new Date(label).toLocaleString()}</p>
      {payload.map(p => (
        <p key={p.dataKey} style={{ color: p.color }} className="font-mono">
          {EMOTION_LABELS[p.dataKey]}: {(p.value * 100).toFixed(1)}%
        </p>
      ))}
    </div>
  );
};

export default function SentimentTab() {
  const [data, setData]       = useState([]);
  const [hours, setHours]     = useState(24);
  const [loading, setLoading] = useState(true);
  const [source, setSource]   = useState("mock");
  const [visible, setVisible] = useState(
    Object.fromEntries(Object.keys(EMOTION_COLORS).map(k => [k, true]))
  );

  useEffect(() => {
    setLoading(true);
    fetchSentiment(hours)
      .then(res => { setData(res.timeline || []); setSource(res.source); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [hours]);

  const toggle = key => setVisible(v => ({ ...v, [key]: !v[key] }));

  // Latest snapshot from last data point
  const latest = data[data.length - 1] || {};

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <h2 className="text-ntro-accent font-bold text-lg uppercase tracking-widest">
          Emotion Sentiment Timeline
        </h2>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500">
            Source: <span className={source === "clickhouse" ? "text-ntro-green" : "text-ntro-yellow"}>{source}</span>
          </span>
          <select
            value={hours}
            onChange={e => setHours(Number(e.target.value))}
            className="bg-ntro-700 border border-ntro-600 text-gray-300 text-xs rounded px-3 py-1"
          >
            <option value={6}>Last 6h</option>
            <option value={24}>Last 24h</option>
            <option value={72}>Last 72h</option>
            <option value={168}>Last 7d</option>
          </select>
        </div>
      </div>

      {/* Legend / filter toggles */}
      <div className="flex flex-wrap gap-3">
        {Object.entries(EMOTION_COLORS).map(([key, color]) => (
          <button
            key={key}
            onClick={() => toggle(key)}
            className={`flex items-center gap-2 px-3 py-1 rounded text-xs border transition-all
              ${visible[key] ? "opacity-100" : "opacity-30"}`}
            style={{ borderColor: color, color }}
          >
            <span className="w-3 h-1 rounded-full inline-block" style={{ background: color }} />
            {EMOTION_LABELS[key]}
          </button>
        ))}
      </div>

      {/* Current snapshot tiles */}
      <div className="grid grid-cols-5 gap-3">
        {Object.entries(EMOTION_COLORS).map(([key, color]) => (
          <div key={key} className="bg-ntro-800 border border-ntro-700 rounded-lg p-3 text-center">
            <div className="text-gray-400 text-xs mb-1">{EMOTION_LABELS[key]}</div>
            <div className="text-xl font-bold" style={{ color }}>
              {latest[key] != null ? `${(latest[key] * 100).toFixed(1)}%` : "—"}
            </div>
          </div>
        ))}
      </div>

      {/* Main area chart */}
      {loading ? (
        <div className="h-72 flex items-center justify-center text-gray-500 text-sm">
          Loading sentiment data…
        </div>
      ) : (
        <div className="bg-ntro-800 border border-ntro-700 rounded-xl p-4">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <defs>
                {Object.entries(EMOTION_COLORS).map(([key, color]) => (
                  <linearGradient key={key} id={`grad_${key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={color} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={color} stopOpacity={0.0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2d4a" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={v => new Date(v).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                tick={{ fill: "#6b7280", fontSize: 10 }}
                tickLine={false}
              />
              <YAxis
                tickFormatter={v => `${(v * 100).toFixed(0)}%`}
                tick={{ fill: "#6b7280", fontSize: 10 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              {Object.entries(EMOTION_COLORS).map(([key, color]) =>
                visible[key] ? (
                  <Area
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={color}
                    strokeWidth={2}
                    fill={`url(#grad_${key})`}
                    dot={false}
                    activeDot={{ r: 4, fill: color }}
                  />
                ) : null
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Post count bar */}
      <div className="bg-ntro-800 border border-ntro-700 rounded-xl p-4">
        <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider">Post Volume</p>
        <ResponsiveContainer width="100%" height={80}>
          <AreaChart data={data}>
            <XAxis dataKey="timestamp" hide />
            <YAxis hide />
            <Area type="monotone" dataKey="post_count" stroke="#00d4ff" fill="#00d4ff22" strokeWidth={1} dot={false} />
            <Tooltip
              formatter={(v) => [v.toLocaleString(), "Posts"]}
              labelFormatter={(l) => new Date(l).toLocaleString()}
              contentStyle={{ background: "#0f1629", border: "1px solid #2a3f5f", fontSize: 11 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
