import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Bell, CheckCircle2, MessageSquare, HeartHandshake, Calendar, Users, Sparkles } from "lucide-react";

export default function NotificationsView() {
  const { notifications, setActiveScreen, setActiveChatId } = useApp();
  const [filter, setFilter] = useState("all");

  const filteredNotifs = notifications.filter(n => {
    if (filter === "messages" && n.type !== "message") return false;
    if (filter === "campaigns" && n.type !== "verification") return false;
    if (filter === "events" && n.type !== "event") return false;
    if (filter === "communities" && n.type !== "community") return false;
    return true;
  });

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-emerald-500" />
            <span>Activity & Notifications</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Updates on your help requests, volunteer events, and HelpCircle milestones.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {["all", "messages", "campaigns", "events", "communities"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 text-xs font-semibold rounded-full capitalize transition-all ${
                filter === f
                  ? "bg-emerald-500 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {filteredNotifs.map((n) => (
          <div
            key={n.id}
            onClick={() => {
              if (n.type === "message") {
                setActiveChatId("chat_5");
                setActiveScreen("messages");
              } else if (n.type === "event") {
                setActiveScreen("events");
              } else if (n.type === "community") {
                setActiveScreen("communities");
              }
            }}
            className={`p-4 flex items-start gap-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer rounded-2xl transition-colors ${
              n.unread ? "bg-emerald-50/30 dark:bg-emerald-950/20" : ""
            }`}
          >
            <div className="relative flex-shrink-0">
              <img
                src={n.avatar}
                alt={n.title}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800"
              />
              <div className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-white dark:bg-slate-900">
                {n.type === "message" ? (
                  <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
                ) : n.type === "verification" ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                ) : n.type === "event" ? (
                  <Calendar className="w-3.5 h-3.5 text-amber-500" />
                ) : (
                  <Users className="w-3.5 h-3.5 text-purple-500" />
                )}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                  {n.title}
                </p>
                <span className="text-[10px] text-slate-400 flex-shrink-0">{n.time}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {n.subtitle}
              </p>
            </div>

            {n.unread && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
