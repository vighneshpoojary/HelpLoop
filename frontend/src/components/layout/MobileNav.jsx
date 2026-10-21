import React from "react";
import { useApp } from "../../context/AppContext";
import { Home, Compass, Plus, Users, User, MessageSquare } from "lucide-react";

export default function MobileNav() {
  const {
    activeScreen,
    setActiveScreen,
    setIsCreateModalOpen,
    setCreateInitialTab,
    chats
  } = useApp();

  const unreadChats = chats.reduce((acc, c) => acc + (c.unread || 0), 0);

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-3 py-2 flex items-center justify-around shadow-lg transition-colors">
      <button
        onClick={() => setActiveScreen("home")}
        className={`flex flex-col items-center gap-0.5 text-xs font-medium transition-colors ${
          activeScreen === "home" ? "text-emerald-500 font-bold" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        }`}
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px]">Home</span>
      </button>

      <button
        onClick={() => setActiveScreen("explore")}
        className={`flex flex-col items-center gap-0.5 text-xs font-medium transition-colors ${
          activeScreen === "explore" ? "text-emerald-500 font-bold" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        }`}
      >
        <Compass className="w-5 h-5" />
        <span className="text-[10px]">Explore</span>
      </button>

      {/* Center Floating Plus Create Button */}
      <button
        onClick={() => {
          setCreateInitialTab("post");
          setIsCreateModalOpen(true);
        }}
        className="w-11 h-11 -mt-5 bg-gradient-to-tr from-emerald-500 to-teal-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30 active:scale-95 transition-transform"
        title="Create Post or Request"
      >
        <Plus className="w-6 h-6 stroke-[2.5]" />
      </button>

      <button
        onClick={() => setActiveScreen("communities")}
        className={`flex flex-col items-center gap-0.5 text-xs font-medium transition-colors ${
          activeScreen === "communities" ? "text-emerald-500 font-bold" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        }`}
      >
        <Users className="w-5 h-5" />
        <span className="text-[10px]">Circles</span>
      </button>

      <button
        onClick={() => setActiveScreen("messages")}
        className={`relative flex flex-col items-center gap-0.5 text-xs font-medium transition-colors ${
          activeScreen === "messages" ? "text-emerald-500 font-bold" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        }`}
      >
        <MessageSquare className="w-5 h-5" />
        <span className="text-[10px]">Messages</span>
        {unreadChats > 0 && (
          <span className="absolute -top-1 right-2 w-3.5 h-3.5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
            {unreadChats}
          </span>
        )}
      </button>

      <button
        onClick={() => setActiveScreen("profile")}
        className={`flex flex-col items-center gap-0.5 text-xs font-medium transition-colors ${
          activeScreen === "profile" ? "text-emerald-500 font-bold" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        }`}
      >
        <User className="w-5 h-5" />
        <span className="text-[10px]">Profile</span>
      </button>
    </nav>
  );
}
