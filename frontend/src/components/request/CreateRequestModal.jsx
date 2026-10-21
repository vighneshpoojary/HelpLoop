import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  X,
  FileText,
  Upload,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Image,
  Calendar,
  AlertCircle
} from "lucide-react";
import { CATEGORIES } from "../../context/HelpLoopData";

export default function CreateRequestModal() {
  const {
    isCreateModalOpen,
    setIsCreateModalOpen,
    createInitialTab,
    createHelpRequest,
    createNewPost
  } = useApp();

  const [activeTab, setActiveTab] = useState(createInitialTab || "request");
  const [step, setStep] = useState(1); // 1: Details, 2: Documents, 3: Review

  // Form Fields
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Educational Help");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [intendedUse, setIntendedUse] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([
    { name: "Primary_Evidence_Document.pdf", size: "1.4 MB", type: "Fee Statement / Hospital Estimate" }
  ]);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isCreateModalOpen) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFiles(prev => [
        ...prev,
        { name: file.name, size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`, type: "Uploaded Document" }
      ]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === "request") {
      createHelpRequest({
        title: title || "Community Assistance Request",
        category,
        description: description || "Support requested for emergency expenses.",
        amount: amount || "25000",
        intendedUse: intendedUse || "Direct institutional payment.",
        documents: uploadedFiles
      });
    } else {
      createNewPost({
        caption: description || "Sharing an inspiring community update!",
        category,
        type: "social"
      });
    }

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsCreateModalOpen(false);
      setStep(1);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col no-scrollbar">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm z-10">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              {activeTab === "request" ? "Request Help (Document Verification)" : "Create Community Post"}
            </h3>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-1.5 gap-1.5">
          <button
            onClick={() => setActiveTab("request")}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === "request"
                ? "bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            Request Financial Help
          </button>
          <button
            onClick={() => setActiveTab("post")}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === "post"
                ? "bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            Social / Impact Post
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4 my-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto ring-8 ring-emerald-50 dark:ring-emerald-950/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">
              Submitted Successfully!
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
              Your request and supporting documents have been routed to the <strong>Admin Verification Queue</strong>. Once initial evidence checks are validated, your campaign will be active for community contributions.
            </p>
          </div>
        ) : activeTab === "request" ? (
          <div>
            {/* Stepper Progress Indicator */}
            <div className="px-6 pt-5 pb-2">
              <div className="flex items-center justify-between relative">
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 dark:bg-slate-700 -z-0" />
                {[
                  { num: 1, label: "Details" },
                  { num: 2, label: "Documents" },
                  { num: 3, label: "Review" }
                ].map((s) => (
                  <div key={s.num} className="flex flex-col items-center relative z-10">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        step >= s.num
                          ? "bg-emerald-500 text-white ring-4 ring-emerald-100 dark:ring-emerald-950"
                          : "bg-slate-200 dark:bg-slate-700 text-slate-500"
                      }`}
                    >
                      {step > s.num ? "✓" : s.num}
                    </div>
                    <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 mt-1">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 1: Details */}
            {step === 1 && (
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Request Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. College Fee Assistance for 4th Year B.Tech"
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Help Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                    >
                      {CATEGORIES.map(c => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Requested Amount (₹) *
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="e.g. 40000"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Detailed Explanation of Need *
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Explain the background, why assistance is needed, and any urgency..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Intended Use of Funds *
                  </label>
                  <input
                    type="text"
                    value={intendedUse}
                    onChange={(e) => setIntendedUse(e.target.value)}
                    placeholder="e.g. Tuition fee demand paid directly to examination department"
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="flex justify-end pt-3">
                  <button
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-sm flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
                  >
                    <span>Next: Upload Documents</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Universal Document Upload */}
            {step === 2 && (
              <div className="p-6 space-y-4">
                <div className="bg-emerald-50/60 dark:bg-emerald-950/30 p-3.5 rounded-xl border border-emerald-500/20 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  <p className="font-bold text-emerald-700 dark:text-emerald-400 mb-1">
                    Universal Document Verification Policy
                  </p>
                  Every request that seeks monetary help must submit relevant evidence before public fundraising is enabled. Original records are kept confidential.
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Required Supporting Documents (Fee statement, Hospital bill, Supplier quotation)
                  </label>

                  <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 text-center hover:border-emerald-500 transition-colors bg-slate-50/50 dark:bg-slate-800/30">
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                      Upload Hospital Estimate / Fee Statement / Quote
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1">
                      PDF, JPG, PNG up to 10MB
                    </p>
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="doc-upload-input"
                    />
                    <label
                      htmlFor="doc-upload-input"
                      className="mt-3 inline-block px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs rounded-lg cursor-pointer transition-colors"
                    >
                      Browse File
                    </label>
                  </div>

                  {/* Uploaded Files List */}
                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Attached Documents ({uploadedFiles.length})
                      </p>
                      {uploadedFiles.map((file, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <FileText className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                                {file.name}
                              </p>
                              <p className="text-[10px] text-slate-500">{file.size} • {file.type}</p>
                            </div>
                          </div>
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                            Ready for Review
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Privacy Lock Banner */}
                <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300">
                  <Lock className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  <span>Your documents are encrypted and accessible only to authorized review officers.</span>
                </div>

                <div className="flex justify-between pt-3">
                  <button
                    onClick={() => setStep(1)}
                    className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl text-xs flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-sm flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
                  >
                    <span>Next: Final Review</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Final Review & Submit */}
            {step === 3 && (
              <div className="p-6 space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-3">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {title || "Untitled Help Request"}
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-500">Category:</span>{" "}
                      <strong className="text-slate-800 dark:text-slate-200">{category}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500">Target Amount:</span>{" "}
                      <strong className="text-slate-800 dark:text-slate-200">₹{amount || "25,000"}</strong>
                    </div>
                  </div>
                  <div className="text-xs">
                    <span className="text-slate-500">Intended Use:</span>{" "}
                    <span className="text-slate-700 dark:text-slate-300">{intendedUse || "Stated institutional expense"}</span>
                  </div>
                  <div className="text-xs">
                    <span className="text-slate-500">Evidence attached:</span>{" "}
                    <strong className="text-emerald-600 dark:text-emerald-400">{uploadedFiles.length} Document(s)</strong>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 text-xs text-amber-800 dark:text-amber-300">
                  <p className="font-semibold mb-0.5">Verification Confirmation</p>
                  By submitting, you confirm the provided documents are genuine. A reviewer will evaluate the evidence and activate fundraising.
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    onClick={() => setStep(2)}
                    className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl text-xs flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-xl text-sm shadow-md shadow-emerald-500/25 active:scale-98 transition-all"
                  >
                    Submit for Verification
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Regular Social / Impact Post Form */
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Share an Impact Story or Update
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What community activity did you participate in? (e.g. Food kits delivered, trees planted...)"
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold hover:bg-slate-200 transition-colors"
              >
                <Image className="w-4 h-4 text-emerald-500" />
                <span>Attach Photo</span>
              </button>
              <span className="text-xs text-slate-400">#Impact #Volunteering #Community</span>
            </div>

            <div className="flex justify-end pt-3">
              <button
                onClick={handleSubmit}
                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-sm shadow-md shadow-emerald-500/25"
              >
                Publish Post
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
