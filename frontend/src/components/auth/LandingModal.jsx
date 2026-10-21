import React from "react";
import { useApp } from "../../context/AppContext";
import {
  Heart,
  Users,
  Trees,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  X
} from "lucide-react";

export default function LandingModal({ isOpen, onClose }) {
  const { setActiveScreen } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in overflow-y-auto no-scrollbar">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-auto">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Heart className="w-4 h-4 fill-white" />
            </div>
            <span className="font-extrabold text-lg text-slate-900 dark:text-white">HelpLoop</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-800 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Section */}
        <div className="p-6 sm:p-10 text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Social Impact Network</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Real People. Real Help. <br />
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              A Stronger Tomorrow.
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            HelpLoop is a social platform where people support each other through evidence-verified fundraising, active volunteering, and community action.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                setActiveScreen("home");
                onClose();
              }}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl text-sm shadow-lg shadow-emerald-500/25 active:scale-98 transition-all flex items-center gap-2"
            >
              <span>Explore Platform</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Feature Pillars Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-500 flex items-center justify-center mx-auto">
              <Heart className="w-5 h-5 fill-red-500/20" />
            </div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">Support</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">People in need with verified transparency.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-500 flex items-center justify-center mx-auto">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">Build</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Cause-driven HelpCircles & communities.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-500 flex items-center justify-center mx-auto">
              <Trees className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">Volunteer</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">& create real on-ground change.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-500 flex items-center justify-center mx-auto">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">Track</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Impact updates & Goodness Points.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
