import React from "react";
import { useApp } from "../../context/AppContext";
import {
  Home,
  Compass,
  Users,
  MessageSquare,
  Bell,
  Calendar,
  HeartHandshake,
  User,
  ShieldCheck,
  Moon,
  Sun,
  PlusCircle,
  HelpCircle,
  LogOut,
  Layers
} from "lucide-react";

export default function Sidebar() {
  const {
    activeScreen,
    setActiveScreen,
    setSelectedCategory,
    notifications,
    chats,
    verificationQueue,
    isDarkMode,
    toggleDarkMode,
    currentUser,
    setIsCreateModalOpen,
    setCreateInitialTab
  } = useApp();

  const unreadNotifs = notifications.filter(n => n.unread).length;
  const unreadChats = chats.reduce((acc, c) => acc + (c.unread || 0), 0);
  const pendingVerifications = verificationQueue.filter(v => v.status === "Pending" || v.status === "Under Review").length;

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "explore", label: "Explore", icon: Compass },
    { id: "communities", label: "Communities", icon: Users },
    { id: "messages", label: "Messages", icon: MessageSquare, badge: unreadChats },
    { id: "notifications", label: "Notifications", icon: Bell, badge: unreadNotifs },
    { id: "events", label: "Events", icon: Calendar },
    { id: "impact", label: "My Impact", icon: HeartHandshake },
    { id: "profile", label: "Profile", icon: User },
  ];

  const quickAccessCategories = [
    { id: "medical", label: "Medical Help", color: "bg-red-500", border: "hover:border-red-500/40" },
    { id: "education", label: "Educational Help", color: "bg-sky-500", border: "hover:border-sky-500/40" },
    { id: "food", label: "Food & Essentials", color: "bg-amber-500", border: "hover:border-amber-500/40" },
    { id: "volunteering", label: "Camps & Volunteering", color: "bg-emerald-500", border: "hover:border-emerald-500/40" },
    { id: "financial", label: "Other Help", color: "bg-purple-500", border: "hover:border-purple-500/40" },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-[#0f172a] text-slate-300 h-screen sticky top-0 border-r border-slate-800 z-40 select-none justify-between">
      {/* Top Branding */}
      <div className="p-5 pb-3">
        <div 
          onClick={() => { setActiveScreen("home"); setSelectedCategory(null); }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-1.5">
              HelpLoop
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </h1>
            <p className="text-[11px] text-emerald-400 font-medium">Together We Heal</p>
          </div>
        </div>

        {/* Quick Action Button */}
        <button
          onClick={() => {
            setCreateInitialTab("request");
            setIsCreateModalOpen(true);
          }}
          className="mt-5 w-full py-2.5 px-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-900/30 transition-all hover:shadow-emerald-500/25 active:scale-98"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Request / Create</span>
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1 no-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveScreen(item.id);
                setSelectedCategory(null);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 font-semibold"
                  : "hover:bg-slate-800/60 hover:text-white text-slate-400"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${isActive ? "text-emerald-400" : "text-slate-400"}`} />
                <span>{item.label}</span>
              </div>
              {item.badge > 0 && (
                <span className="px-1.5 py-0.5 text-xs font-bold rounded-full bg-red-500 text-white min-w-[20px] text-center">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Admin Dashboard Entry */}
        <button
          onClick={() => {
            setActiveScreen("admin");
            setSelectedCategory(null);
          }}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
            activeScreen === "admin"
              ? "bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold"
              : "hover:bg-slate-800/60 text-slate-400 hover:text-purple-300"
          }`}
        >
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-purple-400" />
            <span>Admin Review</span>
          </div>
          {pendingVerifications > 0 && (
            <span className="px-1.5 py-0.5 text-xs font-bold rounded-full bg-purple-500/30 text-purple-300 border border-purple-400/40">
              {pendingVerifications}
            </span>
          )}
        </button>

        {/* Quick Access Categories */}
        <div className="pt-4 pb-1">
          <p className="px-3.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Quick Access
          </p>
          <div className="space-y-1">
            {quickAccessCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setActiveScreen("explore");
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-colors"
              >
                <span className={`w-2 h-2 rounded-full ${cat.color}`} />
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Branding & Profile Card */}
      <div className="p-3 border-t border-slate-800 space-y-3 bg-[#0a0f1d]/50">
        <div className="flex items-center justify-between px-2 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 text-emerald-400/90 font-medium text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            Small acts. Big changes.
          </div>
          <button
            onClick={toggleDarkMode}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
          </button>
        </div>

        {/* User Mini Profile */}
        <div 
          onClick={() => setActiveScreen("profile")}
          className="flex items-center gap-3 p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 cursor-pointer transition-colors border border-slate-700/40"
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-500/40"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate flex items-center gap-1">
              {currentUser.name}
              <span className="text-[10px] px-1 py-0.2 bg-emerald-500/20 text-emerald-400 rounded font-normal">
                Lv{currentUser.level}
              </span>
            </p>
            <p className="text-[11px] text-slate-400 truncate">{currentUser.handle}</p>
          </div>
          <div className="text-[11px] font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">
            {currentUser.goodnessPoints} pts
          </div>
        </div>
      </div>
    </aside>
  );
}
