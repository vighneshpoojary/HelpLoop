import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  Award,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Users,
  Heart,
  TrendingUp,
  Share2
} from "lucide-react";

export default function ImpactProfileView() {
  const { currentUser, posts } = useApp();
  const [activeTab, setActiveTab] = useState("Activity"); // 'Activity', 'Badges', 'Posts'

  const userPosts = posts.filter(p => p.author === currentUser.name);

  return (
    <div className="space-y-6">
      {/* 1. Impact Profile Hero Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm relative overflow-hidden transition-colors">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10 text-center sm:text-left">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover ring-4 ring-emerald-500/30 shadow-xl"
            />
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-tr from-amber-400 to-amber-500 text-slate-950 font-black text-xs px-2.5 py-1 rounded-xl shadow-md border-2 border-white dark:border-slate-900">
              Lv {currentUser.level}
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                {currentUser.name}
              </h2>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Verified Citizen Volunteer
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {currentUser.handle} • {currentUser.bio}
            </p>

            {/* Goodness Points Counter Badge */}
            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-500/15 via-emerald-500/15 to-teal-500/15 border border-amber-500/30">
                <Sparkles className="w-5 h-5 text-amber-500 fill-amber-500" />
                <div>
                  <span className="text-lg font-black text-slate-900 dark:text-white">
                    {currentUser.goodnessPoints}
                  </span>
                  <span className="text-xs text-amber-700 dark:text-amber-400 font-bold ml-1.5">
                    Goodness Points
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Impact Stat Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl text-center border border-slate-200/60 dark:border-slate-700/60">
            <p className="text-lg font-extrabold text-slate-900 dark:text-white">
              {currentUser.stats.posts}
            </p>
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Posts</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl text-center border border-slate-200/60 dark:border-slate-700/60">
            <p className="text-lg font-extrabold text-slate-900 dark:text-white">
              {currentUser.stats.events}
            </p>
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Events Joined</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl text-center border border-slate-200/60 dark:border-slate-700/60">
            <p className="text-lg font-extrabold text-slate-900 dark:text-white">
              {currentUser.stats.communities}
            </p>
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">HelpCircles</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl text-center border border-slate-200/60 dark:border-slate-700/60">
            <p className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">
              {currentUser.stats.impact}
            </p>
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Impact Acts</p>
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        {["Activity", "Badges", "Posts"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab
                ? "bg-emerald-500 text-white shadow-xs"
                : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab 1: Recent Activity Timeline */}
      {activeTab === "Activity" && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Recent Activity & Verified Deeds
            </h3>
            <span className="text-[11px] text-slate-400 font-medium">Non-monetary recognition</span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 space-y-3 pt-1">
            {currentUser.recentActivities.map((act) => (
              <div key={act.id} className="pt-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs flex-shrink-0 border border-emerald-500/20">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                      {act.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {act.category} • {act.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-xl border border-emerald-500/20">
                  <span>+{act.points}</span>
                  <span className="text-[10px] font-semibold text-emerald-500">pts</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Verified Badges */}
      {activeTab === "Badges" && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {currentUser.badges.map((b) => (
            <div
              key={b.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center space-y-2 hover:border-emerald-500/40 transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-xs">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                {b.title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {b.desc}
              </p>
              <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Earned ✓
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: User's Instagram-style Photo Grid */}
      {activeTab === "Posts" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {posts.map((p) => (
            <div key={p.id} className="aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 relative group cursor-pointer">
              <img
                src={p.media || p.authorAvatar}
                alt={p.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 text-white text-xs font-bold">
                <span className="flex items-center gap-1">
                  <Heart className="w-4 h-4 fill-white" />
                  {p.likes}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
