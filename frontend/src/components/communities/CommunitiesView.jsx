import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  Users,
  Search,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  MessageSquare,
  Share2,
  Heart
} from "lucide-react";

export default function CommunitiesView() {
  const {
    communities,
    toggleJoinCommunity,
    setActiveScreen,
    setActiveChatId,
    setIsDonateModalOpen,
    setDonateCampaignTarget
  } = useApp();

  const [filter, setFilter] = useState("all"); // 'all', 'joined'
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCommunities = communities.filter(c => {
    if (filter === "joined" && !c.isJoined) return false;
    if (searchTerm.trim() && !c.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Telegram-Inspired HelpCircles</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Collective Helping & Cause Circles
          </h2>
          <p className="text-xs sm:text-sm text-emerald-50 mt-2 leading-relaxed">
            Join forces with hundreds of compassionate community members. Pool support towards shared goals, coordinate relief drives, and amplify your impact with verified Sponsor Match Multipliers.
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors">
        <div className="flex items-center gap-2">
          {["all", "joined"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
                filter === f
                  ? "bg-emerald-500 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
              }`}
            >
              {f === "all" ? "All Communities" : "My Circles"}
            </button>
          ))}
        </div>

        <div className="relative flex-1 sm:max-w-xs">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search communities..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 text-xs rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Community Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredCommunities.map((comm) => (
          <div
            key={comm.id}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col justify-between transition-all hover:border-emerald-500/40"
          >
            <div>
              {/* Banner Image */}
              <div className="h-28 sm:h-32 w-full bg-slate-100 dark:bg-slate-800 relative">
                <img
                  src={comm.banner}
                  alt={comm.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-[10px] font-semibold text-white">
                  {comm.category}
                </span>
              </div>

              {/* Profile & Info */}
              <div className="p-5 pt-0 relative">
                <div className="flex items-end justify-between -mt-8 mb-3">
                  <img
                    src={comm.avatar}
                    alt={comm.name}
                    className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white dark:ring-slate-900 shadow-md"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleJoinCommunity(comm.id)}
                      className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        comm.isJoined
                          ? "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                          : "bg-emerald-500 hover:bg-emerald-600 text-white shadow-xs"
                      }`}
                    >
                      {comm.isJoined ? "Joined ✓" : "Join Circle"}
                    </button>
                    {comm.isJoined && (
                      <button
                        onClick={() => {
                          setActiveChatId("chat_1");
                          setActiveScreen("messages");
                        }}
                        className="p-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl hover:bg-emerald-500/20 transition-colors"
                        title="Open Telegram Chat"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span>{comm.name}</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-500 text-white" />
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                  {comm.membersCount} members • Active Community
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                  {comm.description}
                </p>
              </div>
            </div>

            {/* Shared Goal Box (if applicable) */}
            {comm.sharedGoal ? (
              <div className="m-4 mt-0 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 dark:text-slate-200 truncate">
                    🎯 {comm.sharedGoal.title}
                  </span>
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                    {comm.sharedGoal.percent}%
                  </span>
                </div>

                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all"
                    style={{ width: `${comm.sharedGoal.percent}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span>₹{comm.sharedGoal.raised.toLocaleString()} raised of ₹{comm.sharedGoal.target.toLocaleString()}</span>
                  <span>{comm.sharedGoal.supportersCount} supporters</span>
                </div>

                {/* Sponsor Match Multiplier Badge */}
                {comm.sharedGoal.sponsorMatch && (
                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-amber-700 dark:text-amber-400 font-semibold text-[11px]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{comm.sharedGoal.sponsorMatch.sponsorName} ({comm.sharedGoal.sponsorMatch.multiplier})</span>
                    </div>
                    <button
                      onClick={() => {
                        setDonateCampaignTarget({
                          id: "comm_target",
                          title: comm.sharedGoal.title,
                          targetAmount: comm.sharedGoal.target,
                          raisedAmount: comm.sharedGoal.raised
                        });
                        setIsDonateModalOpen(true);
                      }}
                      className="px-2.5 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold transition-all shadow-xs"
                    >
                      Contribute
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="m-4 mt-0 p-3 rounded-2xl bg-slate-50/60 dark:bg-slate-800/30 border border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <span>Direct group discussions & volunteering</span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">Open to public</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
