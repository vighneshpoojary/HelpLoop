import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { X, Heart, Shield, EyeOff, CheckCircle2, Sparkles } from "lucide-react";

export default function DonateModal() {
  const {
    isDonateModalOpen,
    setIsDonateModalOpen,
    donateCampaignTarget,
    contributeToCampaign
  } = useApp();

  const [selectedAmount, setSelectedAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [hideAmount, setHideAmount] = useState(true);
  const [encouragement, setEncouragement] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  if (!isDonateModalOpen) return null;

  const target = donateCampaignTarget || {
    id: "camp_demo",
    title: "Community Cause",
    targetAmount: 50000,
    raisedAmount: 12000
  };

  const finalAmount = customAmount ? Number(customAmount) : selectedAmount;

  const handleDonate = (e) => {
    e.preventDefault();
    contributeToCampaign(target.id, finalAmount, isAnonymous);
    setIsComplete(true);
    setTimeout(() => {
      setIsComplete(false);
      setIsDonateModalOpen(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        {/* Modal Top */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Heart className="w-4 h-4 fill-emerald-500" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Contribute to Cause
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[200px]">
                {target.title}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsDonateModalOpen(false)}
            className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isComplete ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              Thank You for Your Support!
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Your contribution of <strong>₹{finalAmount}</strong> has been recorded to this verified campaign.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 text-xs font-bold border border-amber-300 dark:border-amber-800/40">
              <Sparkles className="w-3.5 h-3.5" />
              <span>+25 Goodness Points Earned!</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleDonate} className="p-5 space-y-4">
            {/* Amount Presets */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                Select Contribution Amount
              </label>
              <div className="grid grid-cols-4 gap-2 mb-2">
                {[200, 500, 1000, 2500].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(amt);
                      setCustomAmount("");
                    }}
                    className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                      selectedAmount === amt && !customAmount
                        ? "bg-emerald-500 text-white border-emerald-500 shadow-sm"
                        : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="Or enter custom amount (₹)"
                className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Encouragement note */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Words of Encouragement (Optional)
              </label>
              <input
                type="text"
                value={encouragement}
                onChange={(e) => setEncouragement(e.target.value)}
                placeholder="Wishing you strength and quick recovery!"
                className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Privacy Controls (Core HelpLoop Feature) */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/60 space-y-2 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded text-emerald-500 focus:ring-emerald-500"
                />
                <span className="text-slate-700 dark:text-slate-300 font-medium">
                  Contribute anonymously in public views
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hideAmount}
                  onChange={(e) => setHideAmount(e.target.checked)}
                  className="rounded text-emerald-500 focus:ring-emerald-500"
                />
                <span className="text-slate-700 dark:text-slate-300 font-medium">
                  Hide contribution amount on public feed (Default)
                </span>
              </label>
            </div>

            {/* Hackathon Simulated Payment Banner */}
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40 text-[11px] text-blue-800 dark:text-blue-300">
              <Shield className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <span>
                <strong>Hackathon Demo Transaction:</strong> No real bank cards or UPI funds will be charged.
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-sm shadow-md shadow-emerald-500/25 active:scale-98 transition-all flex items-center justify-center gap-1.5"
            >
              <span>Confirm Demo Contribution (₹{finalAmount})</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
