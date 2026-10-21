import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Search, SlidersHorizontal, Bell, Plus, ShieldCheck, Heart } from "lucide-react";

export default function TopHeader() {
  const {
    currentUser,
    setActiveScreen,
    notifications,
    setIsCreateModalOpen,
    setCreateInitialTab,
    selectedCategory,
    setSelectedCategory
  } = useApp();

  const [searchTerm, setSearchTerm] = useState("");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 lg:px-6 py-3 transition-colors">
      <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
        {/* Mobile Logo Brand */}
        <div 
          onClick={() => setActiveScreen("home")}
          className="flex lg:hidden items-center gap-2 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
            <Heart className="w-4 h-4 fill-white" />
          </div>
          <span className="font-bold text-lg text-slate-800 dark:text-white">HelpLoop</span>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-2xl relative">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for people, communities, causes, or events..."
              className="w-full pl-10 pr-10 py-2 bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 placeholder-slate-400 rounded-full text-sm border border-transparent focus:border-emerald-500 dark:focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none transition-all"
            />
            <button
              onClick={() => setShowFilterDropdown(prev => !prev)}
              className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              title="Filters"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Filter Dropdown */}
          {showFilterDropdown && (
            <div className="absolute top-12 right-0 w-64 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-3 z-50 animate-in fade-in slide-in-from-top-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Quick Filters
              </p>
              <div className="space-y-1 text-sm">
                <button
                  onClick={() => { setSelectedCategory(null); setShowFilterDropdown(false); }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium ${!selectedCategory ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-semibold" : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"}`}
                >
                  All Causes & Posts
                </button>
                <button
                  onClick={() => { setSelectedCategory("medical"); setShowFilterDropdown(false); setActiveScreen("explore"); }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                >
                  🏥 Medical Help Only
                </button>
                <button
                  onClick={() => { setSelectedCategory("education"); setShowFilterDropdown(false); setActiveScreen("explore"); }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                >
                  🎓 Educational Help Only
                </button>
                <button
                  onClick={() => { setSelectedCategory("volunteering"); setShowFilterDropdown(false); setActiveScreen("events"); }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                >
                  🌱 Volunteering & Events
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Header Icons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Create Button */}
          <button
            onClick={() => {
              setCreateInitialTab("post");
              setIsCreateModalOpen(true);
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full text-xs font-semibold shadow-sm transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Create</span>
          </button>

          {/* Notifications Bell */}
          <button
            onClick={() => setActiveScreen("notifications")}
            className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white dark:ring-slate-900">
                {unreadCount}
              </span>
            )}
          </button>

          {/* User Profile Chip */}
          <button
            onClick={() => setActiveScreen("profile")}
            className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-7 h-7 rounded-full object-cover ring-1 ring-emerald-500"
            />
            <span className="hidden md:inline-block text-xs font-semibold text-slate-800 dark:text-slate-200">
              {currentUser.name}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
