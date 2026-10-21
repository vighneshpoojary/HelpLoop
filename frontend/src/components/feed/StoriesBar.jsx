import React from "react";
import { useApp } from "../../context/AppContext";
import { Plus, CheckCircle2 } from "lucide-react";

export default function StoriesBar() {
  const {
    stories,
    setIsCreateModalOpen,
    setCreateInitialTab,
    setSelectedCategory,
    setActiveScreen
  } = useApp();

  const handleStoryClick = (story) => {
    if (story.isUser) {
      setCreateInitialTab("post");
      setIsCreateModalOpen(true);
    } else if (story.isOfficial) {
      setActiveScreen("home");
    } else {
      // Find matching category
      const catKey = story.title.toLowerCase();
      setSelectedCategory(catKey);
      setActiveScreen("explore");
    }
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900/90 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors mb-5 overflow-hidden">
      <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-1">
        {/* + Create Post Story Button */}
        <div
          onClick={() => {
            setCreateInitialTab("post");
            setIsCreateModalOpen(true);
          }}
          className="flex flex-col items-center gap-1.5 cursor-pointer flex-shrink-0 group"
        >
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-emerald-500/80 flex items-center justify-center bg-emerald-50/50 dark:bg-emerald-950/20 group-hover:bg-emerald-100/60 dark:group-hover:bg-emerald-900/40 transition-all">
            <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
              <Plus className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 group-hover:text-emerald-500 transition-colors">
            Create Post
          </span>
        </div>

        {/* Stories List */}
        {stories.map((story) => (
          <div
            key={story.id}
            onClick={() => handleStoryClick(story)}
            className="flex flex-col items-center gap-1.5 cursor-pointer flex-shrink-0 group"
          >
            <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-400 to-sky-500 group-hover:scale-105 transition-transform">
              <div className="p-0.5 bg-white dark:bg-slate-900 rounded-full">
                <img
                  src={story.avatar}
                  alt={story.title}
                  className="w-14 h-14 rounded-full object-cover"
                />
              </div>
              {story.isOfficial && (
                <div className="absolute -bottom-0.5 right-0 bg-white dark:bg-slate-900 rounded-full p-0.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-white dark:fill-slate-900" />
                </div>
              )}
            </div>
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300 max-w-[70px] truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              {story.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
