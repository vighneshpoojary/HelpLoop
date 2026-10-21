import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Search, Heart, Sparkles, UserPlus, Check, ArrowRight } from "lucide-react";

export default function RightSidebar() {
  const {
    chats,
    setActiveChatId,
    setActiveScreen,
    suggestedPeople,
    toggleFollowUser
  } = useApp();

  const [chatFilter, setChatFilter] = useState("all"); // 'all', 'communities', 'direct'
  const [chatSearch, setChatSearch] = useState("");

  const filteredChats = chats.filter(c => {
    if (chatFilter === "communities" && c.type !== "community") return false;
    if (chatFilter === "direct" && c.type !== "direct") return false;
    if (chatSearch.trim() && !c.title.toLowerCase().includes(chatSearch.toLowerCase())) return false;
    return true;
  });

  return (
    <aside className="hidden xl:flex flex-col w-80 h-screen sticky top-0 overflow-y-auto p-4 space-y-5 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] transition-colors no-scrollbar">
      {/* 1. Telegram-Style Chats Widget */}
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-3.5 border border-slate-200/80 dark:border-slate-700/60 shadow-sm">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-1.5">
            <span>Chats</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </h3>
          <button
            onClick={() => setActiveScreen("messages")}
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            Open All
          </button>
        </div>

        {/* Chat Search */}
        <div className="relative mb-2.5">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            value={chatSearch}
            onChange={(e) => setChatSearch(e.target.value)}
            placeholder="Search chats..."
            className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-slate-700/60 text-xs rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:border-emerald-500 text-slate-800 dark:text-slate-100 placeholder-slate-400"
          />
        </div>

        {/* Chat Filter Pills */}
        <div className="flex items-center gap-1.5 mb-2">
          {["all", "communities", "direct"].map((f) => (
            <button
              key={f}
              onClick={() => setChatFilter(f)}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-full capitalize transition-all ${
                chatFilter === f
                  ? "bg-emerald-500 text-white font-semibold shadow-xs"
                  : "bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200/60"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Chat Conversations List */}
        <div className="space-y-1">
          {filteredChats.map((c) => (
            <div
              key={c.id}
              onClick={() => {
                setActiveChatId(c.id);
                setActiveScreen("messages");
              }}
              className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-white dark:hover:bg-slate-700/70 cursor-pointer transition-all border border-transparent hover:border-slate-200/60 dark:hover:border-slate-600/60 group"
            >
              <div className="relative">
                <img
                  src={c.avatar}
                  alt={c.title}
                  className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                />
                {c.unread > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white dark:ring-slate-800">
                    {c.unread}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                    {c.title}
                  </p>
                  <span className="text-[10px] text-slate-400">{c.time}</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {c.messages?.[c.messages.length - 1]?.text || "No messages yet"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Suggested People to Follow */}
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-3.5 border border-slate-200/80 dark:border-slate-700/60 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm text-slate-800 dark:text-white">Suggested People</h3>
          <span className="text-[11px] font-medium text-slate-400">See All</span>
        </div>
        <div className="space-y-2.5">
          {suggestedPeople.map((person) => (
            <div key={person.id} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={person.avatar}
                  alt={person.name}
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                    {person.name}
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                    {person.cause}
                  </p>
                </div>
              </div>
              <button
                onClick={() => toggleFollowUser(person.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  person.isFollowing
                    ? "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200"
                    : "bg-emerald-500 hover:bg-emerald-600 text-white font-semibold shadow-xs"
                }`}
              >
                {person.isFollowing ? "Following" : "Follow"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Social Good Callout CTA */}
      <div className="bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-sky-500/10 dark:from-emerald-950/40 dark:to-slate-800 rounded-2xl p-4 border border-emerald-500/20 text-center relative overflow-hidden">
        <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-2.5">
          <Heart className="w-5 h-5 fill-emerald-500/30" />
        </div>
        <h4 className="font-bold text-sm text-slate-800 dark:text-white mb-1">
          You can make a difference
        </h4>
        <p className="text-xs text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
          Join a community, support a verified cause, or start your own fundraiser.
        </p>
        <button
          onClick={() => setActiveScreen("explore")}
          className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all"
        >
          <span>Explore Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
