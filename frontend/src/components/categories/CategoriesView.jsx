import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  CATEGORIES
} from "../../context/HelpLoopData";
import {
  HeartPulse,
  GraduationCap,
  UtensilsCrossed,
  Trees,
  AlertTriangle,
  Banknote,
  Users,
  Search,
  ArrowRight,
  Filter
} from "lucide-react";
import PostCard from "../feed/PostCard";

const ICON_MAP = {
  HeartPulse,
  GraduationCap,
  UtensilsCrossed,
  Trees,
  AlertTriangle,
  Banknote,
  Users
};

export default function CategoriesView() {
  const {
    selectedCategory,
    setSelectedCategory,
    posts
  } = useApp();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = CATEGORIES.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter posts if a specific category is selected
  const categoryPosts = selectedCategory
    ? posts.filter(p => {
        const catObj = CATEGORIES.find(c => c.id === selectedCategory);
        return catObj && p.category.toLowerCase().includes(catObj.name.toLowerCase().split(" ")[0]);
      })
    : [];

  return (
    <div className="space-y-6">
      {/* Category Header & Search */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Explore Help Categories</span>
              {selectedCategory && (
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Filtered
                </span>
              )}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Find verified causes, campaigns, and volunteering opportunities tailored by community need.
            </p>
          </div>

          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline self-start"
            >
              Clear Filter (Show All Categories)
            </button>
          )}
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search categories (e.g. medical, books, food, cleanups)..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 text-sm rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Category Grid Cards */}
      {!selectedCategory ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCategories.map((cat) => {
            const Icon = ICON_MAP[cat.icon] || HeartPulse;
            return (
              <div
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 shadow-sm hover:shadow-md cursor-pointer transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105"
                      style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                      {cat.activeCount} active
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {cat.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <span>Browse Requests</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Filtered Category Feed */
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl border border-emerald-500/20 text-xs">
            <span className="font-medium text-slate-700 dark:text-slate-300">
              Showing results for: <strong className="text-emerald-600 dark:text-emerald-400 capitalize">{selectedCategory}</strong>
            </span>
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Back to Categories
            </button>
          </div>

          {categoryPosts.length > 0 ? (
            categoryPosts.map(post => <PostCard key={post.id} post={post} />)
          ) : (
            <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                No active requests found in this category right now.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
