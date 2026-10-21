import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  ShieldCheck,
  AlertTriangle,
  Clock,
  CheckCircle2,
  FileText,
  Eye,
  Lock,
  Search,
  Check,
  X,
  MessageCircle,
  HelpCircle
} from "lucide-react";

export default function AdminDashboardView() {
  const {
    verificationQueue,
    updateVerificationStatus,
    setIsReviewModalOpen,
    setActiveReviewItem,
    events,
    posts
  } = useApp();

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeReviewReq, setActiveReviewReq] = useState(null);
  const [reviewerNotes, setReviewerNotes] = useState("");

  const pendingCount = verificationQueue.filter(v => v.status === "Pending" || v.status === "Under Review").length;
  const verifiedCount = verificationQueue.filter(v => v.status === "Verified").length;
  const moreInfoCount = verificationQueue.filter(v => v.status === "More Info Required").length;

  const filteredQueue = verificationQueue.filter(v => {
    if (filter === "pending" && v.status !== "Pending" && v.status !== "Under Review") return false;
    if (filter === "verified" && v.status !== "Verified") return false;
    if (filter === "moreInfo" && v.status !== "More Info Required") return false;
    if (searchTerm.trim() && !v.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const handleOpenReview = (item) => {
    setActiveReviewReq(item);
    setReviewerNotes(item.notes || "");
  };

  const handleDecision = (newStatus) => {
    if (!activeReviewReq) return;
    updateVerificationStatus(activeReviewReq.id, newStatus, reviewerNotes);
    setActiveReviewReq(null);
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Top Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-6 h-6 text-purple-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Admin Verification & Trust Control
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Authorized portal for verifying supporting evidence, hospital invoices, fee receipts, and community safety.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-bold px-3 py-1.5 rounded-full border border-purple-300 dark:border-purple-800/40">
          <Lock className="w-3.5 h-3.5" />
          <span>Role: Review Officer</span>
        </div>
      </div>

      {/* 4 KPI Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold uppercase tracking-wider">Pending Review</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-amber-500">{pendingCount}</p>
          <span className="text-[11px] text-slate-400 font-medium">Awaiting evaluation</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold uppercase tracking-wider">Verified Requests</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-emerald-500">{verifiedCount}</p>
          <span className="text-[11px] text-slate-400 font-medium">Active for fundraising</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold uppercase tracking-wider">Needs More Info</span>
            <HelpCircle className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-2xl font-black text-purple-500">{moreInfoCount}</p>
          <span className="text-[11px] text-slate-400 font-medium">Clarification queried</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold uppercase tracking-wider">Safety Reports</span>
            <AlertTriangle className="w-4 h-4 text-red-500" />
          </div>
          <p className="text-2xl font-black text-red-500">2</p>
          <span className="text-[11px] text-slate-400 font-medium">Resolved within 24h</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          {[
            { id: "all", label: "All Submissions" },
            { id: "pending", label: "Pending / Under Review" },
            { id: "verified", label: "Verified" },
            { id: "moreInfo", label: "More Info Required" }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filter === f.id
                  ? "bg-purple-600 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search request or author..."
            className="w-full sm:w-60 pl-8 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 text-xs rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* Verification Queue Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4">Help Request</th>
                <th className="p-4">Category</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Evidence Docs</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredQueue.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                      {req.title}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      By {req.author} • {req.submittedDate}
                    </p>
                  </td>

                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {req.category}
                    </span>
                  </td>

                  <td className="p-4 font-bold text-slate-900 dark:text-white">
                    ₹{req.requestedAmount?.toLocaleString()}
                  </td>

                  <td className="p-4">
                    <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300 font-medium">
                      <FileText className="w-3.5 h-3.5 text-purple-500" />
                      {req.documents?.length || 1} file(s)
                    </span>
                  </td>

                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      req.status === "Verified"
                        ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                        : req.status === "Under Review"
                        ? "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                        : req.status === "Pending"
                        ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                        : "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border border-purple-500/20"
                    }`}>
                      {req.status}
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleOpenReview(req)}
                      className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Review</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confidential Review Drawer / Modal */}
      {activeReviewReq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-purple-500" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Confidential Evidence Inspection
                </h3>
              </div>
              <button
                onClick={() => setActiveReviewReq(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-1">
              <h4 className="font-bold text-base text-slate-900 dark:text-white">
                {activeReviewReq.title}
              </h4>
              <p className="text-xs text-slate-500">
                Author: {activeReviewReq.author} • Category: {activeReviewReq.category} • Target: ₹{activeReviewReq.requestedAmount?.toLocaleString()}
              </p>
            </div>

            {/* Document List */}
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Submitted Confidential Evidence Files:
              </p>
              {activeReviewReq.documents?.map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-700/60 border border-slate-200/80 dark:border-slate-600 text-xs">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-purple-500" />
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">{doc.name}</p>
                      <p className="text-[10px] text-slate-400">{doc.size}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                    Integrity Verified
                  </span>
                </div>
              ))}
            </div>

            {/* Reviewer Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Reviewer Evaluation Notes:
              </label>
              <textarea
                rows={3}
                value={reviewerNotes}
                onChange={(e) => setReviewerNotes(e.target.value)}
                placeholder="Record verified check: e.g. Contacted hospital billing office, fee demand matched syllabus..."
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Decision Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                onClick={() => handleDecision("Verified")}
                className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Check className="w-4 h-4" />
                <span>Approve & Mark Verified</span>
              </button>

              <button
                onClick={() => handleDecision("More Info Required")}
                className="py-2.5 px-3 bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 hover:bg-purple-200 rounded-xl text-xs font-bold"
              >
                Request Clarification
              </button>

              <button
                onClick={() => handleDecision("Rejected")}
                className="py-2.5 px-3 bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300 hover:bg-red-200 rounded-xl text-xs font-bold"
              >
                Reject Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
