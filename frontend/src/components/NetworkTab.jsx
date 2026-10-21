import { useState, useEffect, useRef } from "react";
import { fetchNetworkGraph } from "../api";
import { Network } from "vis-network/standalone";

export default function NetworkTab() {
  const [loading, setLoading]   = useState(true);
  const [selected, setSelected]   = useState(null);
  const [summary, setSummary]     = useState({ nodes: 0, edges: 0, kols: 0, bots: 0 });
  const containerRef = useRef(null);
  const networkRef = useRef(null);

  useEffect(() => {
    fetchNetworkGraph()
      .then(d => {
        setLoading(false);
        if (!containerRef.current) return;

        const nodes = (d.nodes || []).map(n => {
          let color = { background: "#1a2340", border: "#2a3f5f", highlight: { background: "#1e2d4a", border: "#00d4ff" } };
          let shape = "dot";
          let size = 16;
          let label = n.label || n.id?.slice(0, 6);

          if (n.is_kol) {
            color = { background: "#00d4ff22", border: "#00d4ff", highlight: { background: "#00d4ff44", border: "#00d4ff" } };
            shape = "star";
            size = 22;
            label += " ★";
          } else if (n.is_bot) {
            color = { background: "#ff446622", border: "#ff4466", highlight: { background: "#ff446644", border: "#ff4466" } };
            shape = "triangle";
            size = 14;
            label += " ⚠";
          }

          return {
            id: n.id,
            label: label,
            title: `User ID: ${n.id}\nPlatform: ${n.platform}\nPR: ${n.pagerank?.toFixed(4)}\nBot Score: ${n.bot_score?.toFixed(2)}`,
            color: color,
            shape: shape,
            size: size,
            font: { color: "#9ca3af", size: 10, face: "monospace" },
            raw: n
          };
        });

        const edges = (d.edges || []).map(e => ({
          from: e.from,
          to: e.to,
          width: Math.min(e.weight || 1, 3),
          color: { color: "#2a3f5f", highlight: "#00d4ff" },
          arrows: "to"
        }));

        setSummary({
          nodes: nodes.length,
          edges: edges.length,
          kols: (d.nodes || []).filter(n => n.is_kol).length,
          bots: (d.nodes || []).filter(n => n.is_bot).length
        });

        const options = {
          physics: {
            barnesHut: {
              gravitationalConstant: -2000,
              centralGravity: 0.3,
              springLength: 95,
              springConstant: 0.04
            }
          },
          interaction: {
            hover: true,
            tooltipDelay: 200,
            zoomView: true,
            dragView: true
          }
        };

        const network = new Network(containerRef.current, { nodes, edges }, options);
        networkRef.current = network;

        network.on("selectNode", (params) => {
          const nodeId = params.nodes[0];
          const found = nodes.find(n => n.id === nodeId);
          if (found) setSelected(found.raw);
        });

        network.on("deselectNode", () => {
          setSelected(null);
        });
      })
      .catch(() => setLoading(false));

    return () => {
      if (networkRef.current) {
        networkRef.current.destroy();
        networkRef.current = null;
      }
    };
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-ntro-accent font-bold text-lg uppercase tracking-widest">
          Interactive Node Topology Canvas
        </h2>
        <div className="flex gap-4 text-xs font-mono">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-ntro-accent inline-block rounded-full" /> Key Opinion Leader ★
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-ntro-red inline-block rounded-full" /> Flagged Bot Cluster ⚠
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-ntro-500 inline-block rounded-full" /> Standard Agent
          </span>
        </div>
      </div>

      <div className="flex gap-4">
        {/* Topology Canvas */}
        <div className="flex-1 bg-ntro-800 border border-ntro-700 rounded-xl overflow-hidden relative">
          {loading ? (
            <div className="h-[480px] flex items-center justify-center text-gray-500 font-mono">
              Analyzing interaction link topology...
            </div>
          ) : (
            <div ref={containerRef} className="h-[480px] w-full" />
          )}
        </div>

        {/* Selected Node Details Inspector */}
        {selected && (
          <div className="w-64 bg-ntro-800 border border-ntro-600 rounded-xl p-4 space-y-3 flex-shrink-0">
            <h3 className="text-ntro-accent font-bold text-xs uppercase tracking-wider">Node Inspector</h3>
            <div className="border-t border-ntro-700 pt-2 space-y-2 text-xs">
              <div>
                <span className="text-gray-500 block">Hashed User ID</span>
                <span className="font-mono text-white font-semibold break-all">{selected.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Platform</span>
                <span className="text-white font-mono uppercase">{selected.platform}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">PageRank</span>
                <span className="text-white font-mono">{selected.pagerank?.toFixed(5)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Betweenness</span>
                <span className="text-white font-mono">{selected.betweenness?.toFixed(5)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Bot Score</span>
                <span className={selected.is_bot ? "text-ntro-red font-bold font-mono" : "text-ntro-green font-mono"}>
                  {selected.bot_score?.toFixed(3)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Classification</span>
                <span className={`font-bold ${selected.is_kol ? "text-ntro-accent" : selected.is_bot ? "text-ntro-red" : "text-gray-400"}`}>
                  {selected.is_kol ? "KOL ★" : selected.is_bot ? "Bot ⚠" : "Standard User"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Summary Analytics Cards */}
      <div className="grid grid-cols-4 gap-3 text-center text-xs">
        <div className="bg-ntro-800 border border-ntro-700 rounded-lg p-3">
          <div className="text-gray-400 mb-1">Total Graph Nodes</div>
          <div className="text-ntro-accent font-bold text-xl">{summary.nodes}</div>
        </div>
        <div className="bg-ntro-800 border border-ntro-700 rounded-lg p-3">
          <div className="text-gray-400 mb-1">Interaction Links</div>
          <div className="text-ntro-green font-bold text-xl">{summary.edges}</div>
        </div>
        <div className="bg-ntro-800 border border-ntro-700 rounded-lg p-3">
          <div className="text-gray-400 mb-1">Key Opinion Leaders</div>
          <div className="text-ntro-purple font-bold text-xl">{summary.kols}</div>
        </div>
        <div className="bg-ntro-800 border border-ntro-700 rounded-lg p-3">
          <div className="text-gray-400 mb-1">Flagged Bots</div>
          <div className="text-ntro-red font-bold text-xl">{summary.bots}</div>
        </div>
      </div>
    </div>
  );
}
