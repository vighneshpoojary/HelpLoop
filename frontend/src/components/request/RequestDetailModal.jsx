import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Lock,
  AlertCircle,
  Share2,
  Bookmark,
  Heart,
  ChevronDown,
  ChevronUp,
  Flag,
  Users
} from "lucide-react";

export default function RequestDetailModal() {
  const {
    isRequestDetailOpen,
    setIsRequestDetailOpen,
    activeRequestDetail,
    setIsDonateModalOpen,
    setDonateCampaignTarget
  } = useApp();

  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isReported, setIsReported] = useState(false);

  if (!isRequestDetailOpen || !activeRequestDetail) return null;

  const camp = activeRequestDetail.campaignData || {
    title: activeRequestDetail.caption,
    raisedAmount: 0,
    targetAmount: 50000,
    percent: 0,
    supportersCount: 1,
    daysLeft: 30,
    evidenceSummary: ["Initial documentation provided"],
    intendedUse: "Stated emergency support"
  };

  const handleSupportClick = () => {
    setDonateCampaignTarget(camp);
    setIsDonateModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800 shadow-2xl no-scrollbar flex flex-col">
        {/* Modal Top Bar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Help Request (Donor View)
            </span>
          </div>
          <button
            onClick={() => setIsRequestDetailOpen(false)}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          {/* Cover Image */}
          {activeRequestDetail.media && (
            <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src={activeRequestDetail.media}
                alt={camp.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Title & Author Meta */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800/40">
                {activeRequestDetail.category}
              </span>
              {camp.verified && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40">
                  <CheckCircle2 className="w-3.5 h-3.5 fill-emerald-500 text-white" />
                  Verified Request
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
              {camp.title}
            </h2>
            <div className="flex items-center gap-2 mt-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {activeRequestDetail.author}
              </span>
              <span>•</span>
              <span>{activeRequestDetail.timeAgo}</span>
              <span>•</span>
              <span>{activeRequestDetail.location || "Mangalore, KA"}</span>
            </div>
          </div>

          {/* Fundraising Progress Card */}
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60">
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                ₹{camp.raisedAmount?.toLocaleString() || 0}
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                raised of ₹{camp.targetAmount?.toLocaleString()} goal
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-3 rounded-full overflow-hidden mb-3">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${camp.percent || 0}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 font-medium mb-4">
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4 text-emerald-500" />
                {camp.supportersCount || 0} supporters
              </span>
              <span>{camp.percent || 0}% funded</span>
              <span>{camp.daysLeft || 14} days left</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleSupportClick}
                className="flex-1 py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-sm shadow-md shadow-emerald-500/25 active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Support This Cause</span>
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => alert("Link copied to clipboard!")}
                  className="p-3 bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl text-sm font-semibold border border-slate-200 dark:border-slate-600 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Share</span>
                </button>
                <button
                  onClick={() => alert("Saved to Bookmarks!")}
                  className="p-3 bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl text-sm font-semibold border border-slate-200 dark:border-slate-600 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Bookmark className="w-4 h-4" />
                  <span className="hidden sm:inline">Save</span>
                </button>
              </div>
            </div>
          </div>

          {/* 🌟 KEY DIFFERENTIATOR: Verification & Transparency Section */}
          <div className="bg-emerald-50/60 dark:bg-emerald-950/20 p-5 rounded-2xl border border-emerald-500/20 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Verification & Transparency
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500 text-white">
                {camp.verified ? "Verified ✓" : "Pending"}
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              Last verified: <strong className="text-slate-800 dark:text-slate-100">{camp.verifiedDate || "Apr 20, 2025"}</strong>
            </p>

            {/* Evidence Checklist */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Evidence reviewed:
              </p>
              {camp.evidenceSummary ? (
                camp.evidenceSummary.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))
              ) : (
                <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Submitted evidence checked against stated purpose</span>
                </div>
              )}
            </div>

            {/* "What this means?" Accordion */}
            <div className="border-t border-emerald-500/10 pt-2">
              <button
                onClick={() => setIsAccordionOpen(prev => !prev)}
                className="flex items-center justify-between w-full text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline py-1"
              >
                <span>What does this verification status mean?</span>
                {isAccordionOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
              {isAccordionOpen && (
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-2 leading-relaxed bg-white/60 dark:bg-slate-900/40 p-3 rounded-xl border border-emerald-500/10">
                  Verification means authorized reviewers examined the submitted bills, fee statements, or institutional documents to ensure the stated need and requested amount are consistent. It protects the community from fabricated claims.
                </p>
              )}
            </div>

            {/* Privacy Shield Notice */}
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300">
              <Lock className="w-4 h-4 text-slate-500 dark:text-slate-400 flex-shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed">
                <strong>Privacy Notice:</strong> Original supporting documents (medical receipts, private fee records, identity credentials) are kept private and confidential for reviewer eyes only. Donors see verified summaries.
              </p>
            </div>

            {/* Report Request Link */}
            <div className="flex justify-end pt-1">
              <button
                onClick={() => {
                  setIsReported(true);
                  setTimeout(() => alert("Thank you. The report has been flagged to the Trust & Safety team for review."), 200);
                }}
                className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-red-500 transition-colors"
              >
                <Flag className="w-3 h-3" />
                <span>{isReported ? "Reported to Reviewers" : "Report this request"}</span>
              </button>
            </div>
          </div>

          {/* About this request */}
          <div className="space-y-2">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              About this request
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {activeRequestDetail.caption}
            </p>
          </div>

          {/* Intended Use of Funds */}
          {camp.intendedUse && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/60">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Intended Use of Funds
              </h4>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                {camp.intendedUse}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
