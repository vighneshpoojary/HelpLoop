import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import StoriesBar from "./StoriesBar";
import CreateBar from "./CreateBar";
import PostCard from "./PostCard";
import { Users, Calendar, ArrowRight, CheckCircle2 } from "lucide-react";

export default function HomeFeedView() {
  const {
    posts,
    communities,
    events,
    setActiveScreen,
    toggleJoinCommunity,
    toggleJoinEvent
  } = useApp();

  const [feedFilter, setFeedFilter] = useState("forYou"); // 'forYou', 'following', 'latest'

  const recommendedComms = communities.slice(0, 5);
  const trendingEvents = events.slice(0, 3);

  return (
    <div className="space-y-4">
      {/* 1. Horizontal Stories Carousel */}
      <StoriesBar />

      {/* 2. Main Center Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Sub-Column (Recommended Communities & Trending Events) */}
        <div className="hidden lg:block lg:col-span-4 space-y-4 sticky top-20">
          {/* Recommended Communities */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-white flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-emerald-500" />
                <span>Recommended Communities</span>
              </h3>
              <button
                onClick={() => setActiveScreen("communities")}
                className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                See All
              </button>
            </div>

            <div className="space-y-2">
              {recommendedComms.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between p-2 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                        {c.name}
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                        {c.membersCount} members
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleJoinCommunity(c.id)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                      c.isJoined
                        ? "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                        : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white"
                    }`}
                  >
                    {c.isJoined ? "Joined" : "Join"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Events */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-white flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-500" />
                <span>Trending Events</span>
              </h3>
              <button
                onClick={() => setActiveScreen("events")}
                className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                See All
              </button>
            </div>

            <div className="space-y-2.5">
              {trendingEvents.map((evt) => (
                <div
                  key={evt.id}
                  onClick={() => setActiveScreen("events")}
                  className="flex items-center gap-2.5 p-2 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors group"
                >
                  <img
                    src={evt.cover}
                    alt={evt.title}
                    className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                      {evt.title}
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                      {evt.date} • {evt.location.split(",")[0]}
                    </p>
                    <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                      🌱 {evt.joinedCount} joined
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Feed Column */}
        <div className="col-span-1 lg:col-span-8 space-y-4">
          {/* Quick Create Bar */}
          <CreateBar />

          {/* Feed Filter Tabs */}
          <div className="flex items-center gap-2 pb-1">
            {[
              { id: "forYou", label: "For You" },
              { id: "following", label: "Following" },
              { id: "latest", label: "Latest" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFeedFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  feedFilter === tab.id
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Posts Stream */}
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
