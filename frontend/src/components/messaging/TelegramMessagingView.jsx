import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  Search,
  Pin,
  Paperclip,
  Smile,
  Send,
  Calendar,
  FileText,
  Users,
  Info,
  Check,
  CheckCheck,
  Shield,
  ArrowLeft
} from "lucide-react";

export default function TelegramMessagingView() {
  const {
    chats,
    activeChatId,
    setActiveChatId,
    sendChatMessage,
    currentUser,
    toggleJoinEvent
  } = useApp();

  const [messageText, setMessageText] = useState("");
  const [chatFilter, setChatFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showInfoDrawer, setShowInfoDrawer] = useState(false);

  const activeChat = chats.find(c => c.id === activeChatId) || chats[0];

  const filteredChats = chats.filter(c => {
    if (chatFilter === "communities" && c.type !== "community") return false;
    if (chatFilter === "direct" && c.type !== "direct") return false;
    if (searchTerm.trim() && !c.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const handleSend = (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    sendChatMessage(activeChat.id, messageText);
    setMessageText("");
  };

  return (
    <div className="h-[calc(100vh-5rem)] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex overflow-hidden transition-colors">
      {/* 1. Left Conversation List Column */}
      <div className={`w-full md:w-80 border-r border-slate-200 dark:border-slate-800 flex flex-col ${activeChatId ? "hidden md:flex" : "flex"}`}>
        {/* Search Header */}
        <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 space-y-2.5">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search chats or channels..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-xs rounded-xl border border-transparent focus:border-emerald-500 text-slate-800 dark:text-white focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5">
            {["all", "communities", "direct"].map((f) => (
              <button
                key={f}
                onClick={() => setChatFilter(f)}
                className={`px-3 py-1 text-[11px] font-semibold rounded-full capitalize transition-all ${
                  chatFilter === f
                    ? "bg-emerald-500 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60 no-scrollbar">
          {filteredChats.map((c) => {
            const isSelected = c.id === activeChat.id;
            return (
              <div
                key={c.id}
                onClick={() => setActiveChatId(c.id)}
                className={`flex items-center gap-3 p-3 cursor-pointer transition-colors ${
                  isSelected
                    ? "bg-emerald-500/10 dark:bg-emerald-950/30 border-l-4 border-emerald-500"
                    : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                }`}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={c.avatar}
                    alt={c.title}
                    className="w-11 h-11 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                  />
                  {c.unread > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white dark:ring-slate-900">
                      {c.unread}
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {c.title}
                    </p>
                    <span className="text-[10px] text-slate-400 flex-shrink-0">
                      {c.time}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {c.messages?.[c.messages.length - 1]?.text || c.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Main Chat Panel */}
      <div className={`flex-1 flex flex-col h-full bg-slate-50/50 dark:bg-[#0b0f19] ${!activeChatId ? "hidden md:flex" : "flex"}`}>
        {/* Chat Top Bar */}
        <div className="p-3.5 px-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setActiveChatId(null)}
              className="md:hidden p-1 text-slate-500 hover:text-slate-800 dark:hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <img
              src={activeChat.avatar}
              alt={activeChat.title}
              className="w-9 h-9 rounded-full object-cover ring-1 ring-emerald-500/40"
            />
            <div className="min-w-0">
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                {activeChat.title}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {activeChat.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowInfoDrawer(prev => !prev)}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Community Info"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>

        {/* Pinned Message Banner (Telegram Feature) */}
        {activeChat.pinned && (
          <div className="px-4 py-2 bg-emerald-50/90 dark:bg-emerald-950/40 border-b border-emerald-500/20 flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-300">
            <Pin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <div className="flex-1 truncate">
              <strong>Pinned:</strong> {activeChat.pinned}
            </div>
          </div>
        )}

        {/* Messages Feed Viewport */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar">
          {activeChat.messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-2.5 max-w-lg ${m.isMe ? "ml-auto flex-row-reverse" : "mr-auto"}`}
            >
              {!m.isMe && (
                <img
                  src={m.senderAvatar}
                  alt={m.sender}
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700 flex-shrink-0 self-end mb-1"
                />
              )}

              <div
                className={`rounded-2xl p-3 text-xs shadow-xs space-y-2 ${
                  m.isMe
                    ? "bg-emerald-500 text-white rounded-br-xs"
                    : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-xs border border-slate-200/80 dark:border-slate-700"
                }`}
              >
                {!m.isMe && (
                  <p className="font-bold text-[11px] text-emerald-600 dark:text-emerald-400">
                    {m.sender}
                  </p>
                )}

                <p className="leading-relaxed">{m.text}</p>

                {/* Attachment File Card */}
                {m.attachment && (
                  <div className={`flex items-center gap-2 p-2 rounded-xl text-xs ${
                    m.isMe ? "bg-emerald-600 text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200"
                  }`}>
                    <FileText className="w-4 h-4 text-emerald-300" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{m.attachment.name}</p>
                      <p className="text-[10px] opacity-80">{m.attachment.size}</p>
                    </div>
                  </div>
                )}

                {/* Inline Action Card (Event RSVP) */}
                {m.card && m.card.type === "event" && (
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl border border-emerald-500/30 text-slate-900 dark:text-slate-100 space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-emerald-500" />
                      <span className="font-bold text-xs">{m.card.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {m.card.date} • {m.card.location}
                    </p>
                    <button
                      onClick={() => toggleJoinEvent("evt_1")}
                      className="w-full py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg text-xs transition-colors"
                    >
                      {m.card.buttonText || "Register Now"}
                    </button>
                  </div>
                )}

                <div className={`flex items-center justify-end gap-1 text-[10px] ${m.isMe ? "text-emerald-100" : "text-slate-400"}`}>
                  <span>{m.time}</span>
                  {m.isMe && <CheckCheck className="w-3.5 h-3.5" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <button
            type="button"
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type a message or share volunteer updates..."
            className="flex-1 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-xs rounded-full border border-transparent focus:border-emerald-500 text-slate-800 dark:text-white focus:outline-none"
          />

          <button
            type="button"
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Smile className="w-4 h-4" />
          </button>

          <button
            type="submit"
            className="p-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-sm active:scale-95 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* 3. Right Information Drawer */}
      {showInfoDrawer && (
        <div className="hidden lg:flex flex-col w-72 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-4 overflow-y-auto no-scrollbar">
          <div className="text-center">
            <img
              src={activeChat.avatar}
              alt={activeChat.title}
              className="w-16 h-16 rounded-2xl mx-auto object-cover ring-2 ring-emerald-500/30 mb-2 shadow-sm"
            />
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              {activeChat.title}
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">{activeChat.subtitle}</p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            <p className="font-bold text-slate-800 dark:text-white mb-1">About Channel</p>
            Community group coordinated to support school supplies, tutoring, and college fee verification.
          </div>

          <div className="space-y-2 text-xs">
            <p className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
              Community Rules
            </p>
            <div className="space-y-1 text-slate-600 dark:text-slate-300">
              <p>• Respect all members and beneficiaries</p>
              <p>• Only post verified event updates</p>
              <p>• Zero spam or unauthorized solicitations</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
