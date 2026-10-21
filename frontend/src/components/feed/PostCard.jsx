import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  CheckCircle2,
  MapPin,
  Calendar,
  ShieldCheck,
  ArrowRight,
  Send,
  Users
} from "lucide-react";

export default function PostCard({ post }) {
  const {
    toggleLikePost,
    toggleSavePost,
    addComment,
    toggleJoinEvent,
    setIsDonateModalOpen,
    setDonateCampaignTarget,
    setIsRequestDetailOpen,
    setActiveRequestDetail
  } = useApp();

  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [localCommentsList, setLocalCommentsList] = useState([
    { id: 1, user: "Rohan K.", text: "Praying for a speedy recovery! Contributed ₹500 🙏", time: "1h ago" },
    { id: 2, user: "Priya S.", text: "Great initiative! Shared in our college group.", time: "30m ago" }
  ]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    setLocalCommentsList(prev => [
      ...prev,
      { id: Date.now(), user: "You", text: commentInput, time: "Just now" }
    ]);
    addComment(post.id, commentInput);
    setCommentInput("");
  };

  const handleOpenCampaignDetail = () => {
    setActiveRequestDetail(post);
    setIsRequestDetailOpen(true);
  };

  const handleOpenDonate = () => {
    setDonateCampaignTarget(post.campaignData);
    setIsDonateModalOpen(true);
  };

  return (
    <article className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors mb-5 overflow-hidden">
      {/* 1. Header (Author, Category, Verification Badge, Location, Timestamp) */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={post.authorAvatar}
            alt={post.author}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800"
          />
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-bold text-sm text-slate-900 dark:text-white">
                {post.author}
              </span>
              {post.verified && (
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold border border-emerald-500/20">
                  <CheckCircle2 className="w-3 h-3 fill-emerald-500 text-white" />
                  Verified
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              <span>{post.timeAgo}</span>
              <span>•</span>
              <span className="font-medium text-emerald-600 dark:text-emerald-400">{post.category}</span>
              {post.location && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-0.5">
                    <MapPin className="w-3 h-3" />
                    {post.location}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Post Type Badge */}
        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
          post.type === "campaign"
            ? "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/40"
            : post.type === "event"
            ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40"
            : "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40"
        }`}>
          {post.type === "campaign" ? "Help Request" : post.type === "event" ? "Community Event" : "Impact Update"}
        </span>
      </div>

      {/* 2. Caption */}
      <div className="px-4 pb-3">
        <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
          {post.caption}
        </p>
      </div>

      {/* 3. Media Image */}
      {post.media && (
        <div className="relative w-full aspect-[16/10] bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <img
            src={post.media}
            alt={post.caption}
            className="w-full h-full object-cover hover:scale-101 transition-transform duration-300"
          />
        </div>
      )}

      {/* 4. Specialized Action Card Embed (Campaign / Event / Impact) */}
      {post.type === "campaign" && post.campaignData && (
        <div className="p-4 bg-slate-50/80 dark:bg-slate-800/40 border-t border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {post.campaignData.title}
              </span>
              {post.campaignData.verified && (
                <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  <ShieldCheck className="w-3 h-3" />
                  Verified
                </span>
              )}
            </div>
            <button
              onClick={handleOpenCampaignDetail}
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5"
            >
              <span>Details</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden mb-2">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${post.campaignData.percent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-slate-900 dark:text-white">
                ₹{post.campaignData.raisedAmount.toLocaleString()}
              </span>
              <span className="text-slate-500 dark:text-slate-400 ml-1">
                raised of ₹{post.campaignData.targetAmount.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-3 font-semibold">
              <span className="text-emerald-600 dark:text-emerald-400">
                {post.campaignData.percent}%
              </span>
              <button
                onClick={handleOpenDonate}
                className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold shadow-xs active:scale-95 transition-all"
              >
                Support
              </button>
            </div>
          </div>
        </div>
      )}

      {post.type === "event" && post.eventData && (
        <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 border-t border-b border-emerald-100 dark:border-emerald-900/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs flex-col border border-emerald-500/20">
              <Calendar className="w-4 h-4 mb-0.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                {post.eventData.title}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {post.eventData.date} • {post.eventData.location}
              </p>
            </div>
          </div>
          <button
            onClick={() => toggleJoinEvent(post.eventData.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              post.eventData.isJoined
                ? "bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200"
                : "bg-emerald-500 hover:bg-emerald-600 text-white shadow-xs"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>{post.eventData.isJoined ? "Registered ✓" : `Join Event (${post.eventData.joinedCount})`}</span>
          </button>
        </div>
      )}

      {/* 5. Social Action Icons (Like, Comment, Share, Bookmark) */}
      <div className="p-4 pt-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Like */}
          <button
            onClick={() => toggleLikePost(post.id)}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-red-500 transition-colors group"
          >
            <Heart
              className={`w-5 h-5 transition-transform group-active:scale-125 ${
                post.isLiked ? "fill-red-500 text-red-500" : "text-slate-500 dark:text-slate-400"
              }`}
            />
            <span>{post.likes}</span>
          </button>

          {/* Comment */}
          <button
            onClick={() => setShowComments(prev => !prev)}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-500 transition-colors"
          >
            <MessageCircle className="w-5 h-5 text-slate-500 dark:text-slate-400" />
            <span>{post.comments}</span>
          </button>

          {/* Share */}
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: post.caption, url: window.location.href });
              } else {
                alert("Link copied to clipboard!");
              }
            }}
            className="text-slate-500 dark:text-slate-400 hover:text-emerald-500 transition-colors"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Bookmark */}
        <button
          onClick={() => toggleSavePost(post.id)}
          className="text-slate-500 dark:text-slate-400 hover:text-amber-500 transition-colors"
        >
          <Bookmark className={`w-5 h-5 ${post.isSaved ? "fill-amber-500 text-amber-500" : ""}`} />
        </button>
      </div>

      {/* Liked By Social Proof */}
      {post.likedBy && (
        <div className="px-4 pb-3 -mt-2">
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            {post.likedBy}
          </p>
        </div>
      )}

      {/* Comment Section Expandable */}
      {showComments && (
        <div className="px-4 pb-4 pt-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
          <div className="space-y-2 mb-3 max-h-40 overflow-y-auto no-scrollbar">
            {localCommentsList.map(c => (
              <div key={c.id} className="text-xs">
                <span className="font-bold text-slate-900 dark:text-white mr-1.5">{c.user}</span>
                <span className="text-slate-600 dark:text-slate-300">{c.text}</span>
                <span className="text-[10px] text-slate-400 ml-2">{c.time}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleCommentSubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Add an encouraging comment..."
              className="flex-1 px-3 py-1.5 bg-white dark:bg-slate-700 text-xs rounded-full border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="p-1.5 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </article>
  );
}
