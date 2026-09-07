import React, { useState } from 'react';
import { Activity, Clock, RotateCcw, HelpCircle, AlertTriangle, WifiOff } from 'lucide-react';
import { UserLastSeenState, DataFreshnessStatus } from '../types/drift';
import { HowItWorksModal } from './HowItWorksModal';

interface NavbarProps {
  userLastSeen: UserLastSeenState;
  onSelectTimeAgo: (label: string) => void;
  activePresetId: string;
  onResetData: () => void;
  freshnessStatus: DataFreshnessStatus;
  onToggleFreshness: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  userLastSeen,
  onSelectTimeAgo,
  activePresetId,
  onResetData,
  freshnessStatus,
  onToggleFreshness
}) => {
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const timeAgoOptions = [
    { label: '10 minutes ago', sub: 'Today · 8:20 PM' },
    { label: 'Yesterday · 6:42 PM', sub: '26 hours ago' },
    { label: '3 days ago', sub: 'Sep 3 · 9:15 AM' },
    { label: '1 week ago', sub: 'Aug 30 · 4:00 PM' }
  ];

  return (
    <>
      <header className="w-full border-b border-[#252D45] bg-[#070A14]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          
          {/* Brand Logo & Slogan */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-600/25">
              <Activity className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-[#F5F7FF] font-heading">DRIFT</span>
              </div>
              <p className="text-xs text-[#94A3B8] font-medium hidden sm:block">
                Don’t watch the market. Understand what changed.
              </p>
            </div>
          </div>

          {/* Dynamic User Last-Seen Selector & Actions */}
          <div className="flex items-center space-x-3">
            
            {/* How DRIFT Works Button */}
            <button
              onClick={() => setShowHowItWorks(true)}
              className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#141A2E] border border-[#252D45] hover:border-violet-500/40 text-xs font-semibold text-violet-300 transition-all"
            >
              <HelpCircle className="w-4 h-4 text-violet-400" />
              <span>How DRIFT Works</span>
            </button>

            {/* Live Data Quality & Freshness Indicator Pill */}
            <button
              onClick={onToggleFreshness}
              title="Click to toggle simulated market feed freshness status"
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                freshnessStatus === 'LIVE'
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                  : freshnessStatus === 'DELAYED'
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
              }`}
            >
              {freshnessStatus === 'LIVE' ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="hidden sm:inline text-slate-300">Live Feed · 12s ago</span>
                  <span className="sm:hidden">Live</span>
                </>
              ) : freshnessStatus === 'DELAYED' ? (
                <>
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Feed Delayed · 14m old</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-rose-400" />
                  <span>Feed Offline</span>
                </>
              )}
            </button>

            {/* Time Machine Selector */}
            <div className="relative group">
              <button className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#0E1324] border border-[#252D45] hover:border-violet-500/40 text-xs font-medium text-[#F5F7FF] transition-all">
                <Clock className="w-4 h-4 text-violet-400" />
                <span className="text-[#94A3B8] hidden xs:inline">Last checked:</span>
                <span className="text-white font-semibold">{userLastSeen.timeAgoLabel}</span>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-64 rounded-xl bg-[#0E1324] border border-[#252D45] shadow-2xl p-2 hidden group-hover:block z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-1.5 border-b border-[#252D45] mb-1">
                  <p className="text-[11px] font-bold text-violet-400 uppercase tracking-wider">
                    Personal State Simulator
                  </p>
                  <p className="text-[10px] text-[#94A3B8]">
                    Select when you last checked your watchlist
                  </p>
                </div>
                {timeAgoOptions.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => onSelectTimeAgo(opt.label)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center justify-between ${
                      userLastSeen.timeAgoLabel === opt.label
                        ? 'bg-violet-600/20 text-violet-300 font-semibold border border-violet-500/30'
                        : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <span>{opt.label}</span>
                    <span className="text-[10px] text-slate-500">{opt.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Reset button */}
            <button
              onClick={onResetData}
              title="Reset to default benchmark"
              className="p-2 rounded-xl bg-[#0E1324] border border-[#252D45] hover:bg-white/5 text-[#94A3B8] hover:text-white transition-all"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* How it Works Modal */}
      <HowItWorksModal isOpen={showHowItWorks} onClose={() => setShowHowItWorks(false)} />
    </>
  );
};
