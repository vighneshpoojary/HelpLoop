import React from "react";
import { useApp } from "../../context/AppContext";
import { Image, HeartHandshake, Calendar, FileText, Send } from "lucide-react";

export default function CreateBar() {
  const {
    currentUser,
    setIsCreateModalOpen,
    setCreateInitialTab
  } = useApp();

  const handleOpen = (tab) => {
    setCreateInitialTab(tab);
    setIsCreateModalOpen(true);
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900/90 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors mb-5">
      <div className="flex items-center gap-3">
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/30 flex-shrink-0"
        />
        <div
          onClick={() => handleOpen("post")}
          className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 rounded-full cursor-pointer text-sm text-slate-500 dark:text-slate-400 flex items-center justify-between transition-colors"
        >
          <span>Share something... (post, donate, or help)</span>
          <Send className="w-4 h-4 text-emerald-500" />
        </div>
      </div>

      {/* Action Pills */}
      <div className="flex items-center justify-around sm:justify-start sm:gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
        <button
          onClick={() => handleOpen("post")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 transition-colors"
        >
          <Image className="w-4 h-4 text-emerald-500" />
          <span>Photo</span>
        </button>

        <button
          onClick={() => handleOpen("donate")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 transition-colors"
        >
          <HeartHandshake className="w-4 h-4 text-blue-500" />
          <span>Donate</span>
        </button>

        <button
          onClick={() => handleOpen("event")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 transition-colors"
        >
          <Calendar className="w-4 h-4 text-amber-500" />
          <span>Event</span>
        </button>

        <button
          onClick={() => handleOpen("request")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 transition-colors"
        >
          <FileText className="w-4 h-4 text-red-500" />
          <span>Request</span>
        </button>
      </div>
    </div>
  );
}
