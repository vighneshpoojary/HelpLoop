import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  Calendar,
  MapPin,
  Users,
  CheckCircle2,
  Clock,
  Plus,
  ArrowRight,
  ShieldCheck,
  Award
} from "lucide-react";

export default function EventsView() {
  const {
    events,
    toggleJoinEvent
  } = useApp();

  const [activeTab, setActiveTab] = useState("Upcoming"); // 'Upcoming', 'Past', 'Calendar'
  const [selectedEventModal, setSelectedEventModal] = useState(null);

  const filteredEvents = events.filter(e => {
    if (activeTab === "Upcoming") return e.type === "Upcoming";
    if (activeTab === "Past") return e.type === "Past";
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Events & Community Volunteering
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Earn Goodness Points
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Join hands in beach cleanups, plantation drives, and food distributions across your locality.
          </p>
        </div>

        {/* Tabs: Upcoming / Past / Calendar */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl self-start sm:self-auto">
          {["Upcoming", "Past", "Calendar"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === tab
                  ? "bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      {activeTab === "Calendar" ? (
        <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
          <Calendar className="w-12 h-12 text-emerald-500 mx-auto" />
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            Community Volunteering Calendar
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            April & May 2025 Schedule: 4 active drives planned in Malpe Beach, Mangalore City Park, and District Hospital.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col justify-between hover:border-emerald-500/40 transition-all group"
            >
              <div>
                {/* Cover Image */}
                <div className="w-full aspect-[16/9] relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={evt.cover}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-2.5 py-1 rounded-xl text-[11px] font-bold text-slate-900 dark:text-white shadow-sm flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{evt.date}</span>
                  </div>
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-xl text-[10px] font-semibold text-white">
                    {evt.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2.5">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{evt.time}</span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 dark:text-white line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {evt.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{evt.location}</span>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed pt-1">
                    {evt.description}
                  </p>
                </div>
              </div>

              {/* Bottom Join Action */}
              <div className="p-5 pt-0">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                    <Users className="w-4 h-4 text-emerald-500" />
                    <span><strong>{evt.joinedCount}</strong> / {evt.capacity} joined</span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    +50 Pts
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleJoinEvent(evt.id)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 ${
                      evt.isJoined
                        ? "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                        : "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20"
                    }`}
                  >
                    <span>{evt.isJoined ? "Registered ✓" : "Join Event"}</span>
                  </button>
                  <button
                    onClick={() => setSelectedEventModal(evt)}
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    title="View details"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Event Details Quick Modal */}
      {selectedEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              {selectedEventModal.title}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {selectedEventModal.description}
            </p>

            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <p><strong>Organizer:</strong> {selectedEventModal.organizer}</p>
              <p><strong>Date & Time:</strong> {selectedEventModal.date} ({selectedEventModal.time})</p>
              <p><strong>Meeting Point:</strong> {selectedEventModal.location}</p>
            </div>

            {selectedEventModal.whatToBring && (
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
                <p className="font-bold mb-1">What to Bring:</p>
                <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-0.5">
                  {selectedEventModal.whatToBring.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedEventModal(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400"
              >
                Close
              </button>
              <button
                onClick={() => {
                  toggleJoinEvent(selectedEventModal.id);
                  setSelectedEventModal(null);
                }}
                className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs"
              >
                {selectedEventModal.isJoined ? "Cancel Registration" : "Confirm Join"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
