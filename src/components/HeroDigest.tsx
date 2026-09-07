import React from 'react';
import { MarketState, UserLastSeenState } from '../types/drift';
import { AlertTriangle, CheckCircle2, Eye, ShieldAlert, Sparkles } from 'lucide-react';

interface HeroDigestProps {
  marketState: MarketState;
  userLastSeen: UserLastSeenState;
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

export const HeroDigest: React.FC<HeroDigestProps> = ({
  marketState,
  userLastSeen,
  selectedFilter,
  onFilterChange
}) => {
  const isCalmDay = marketState.significantCount === 0 && marketState.worthALookCount === 0;

  return (
    <div className="glass-panel p-6 sm:p-8 mb-8 relative overflow-hidden">
      {/* Background glow effects - Electric Violet brand atmospheric glow */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Primary Hero Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Left Column: Welcome & Last Seen Timestamp */}
        <div>
          <div className="flex items-center space-x-2 text-violet-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span>Personal Watchlist Intelligence</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F5F7FF] font-heading tracking-tight">
            Since you were last here
          </h1>

          <div className="flex items-center space-x-3 mt-2 text-[#94A3B8] text-sm">
            <span>Last checked:</span>
            <span className="font-semibold text-slate-200 px-2.5 py-0.5 rounded-md bg-[#141A2E] border border-[#252D45] font-mono text-xs">
              {userLastSeen.timeAgoLabel}
            </span>
            <span className="text-slate-600">•</span>
            <span>{marketState.totalStocksWatched} stocks watched</span>
          </div>
        </div>

        {/* Right Column: Status Summary Cards (Quiet Normal vs Loud Coral) */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 min-w-[320px] sm:min-w-[420px]">
          
          {/* Normal Button (Quiet & Muted) */}
          <button
            onClick={() => onFilterChange('NORMAL')}
            className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all ${
              selectedFilter === 'NORMAL'
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                : 'bg-[#0E1324] border-[#252D45] hover:border-emerald-500/30'
            }`}
          >
            <div className="flex items-center justify-between text-xs text-[#94A3B8] mb-1 font-medium">
              <span>Normal</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400/70" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400/90 font-mono">
              {marketState.normalCount}
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Within baseline</div>
          </button>

          {/* Worth a Look Button (Amber) */}
          <button
            onClick={() => onFilterChange('WORTH_A_LOOK')}
            className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all ${
              selectedFilter === 'WORTH_A_LOOK'
                ? 'bg-amber-500/15 border-amber-500/50 text-amber-300 shadow-lg shadow-amber-500/10'
                : 'bg-[#0E1324] border-[#252D45] hover:border-amber-500/30'
            }`}
          >
            <div className="flex items-center justify-between text-xs text-[#94A3B8] mb-1 font-medium">
              <span>Worth a look</span>
              <Eye className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">
              {marketState.worthALookCount}
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Mild deviation</div>
          </button>

          {/* Significant Button (Vibrant Coral Red when active) */}
          <button
            onClick={() => onFilterChange('SIGNIFICANT')}
            className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all relative overflow-hidden ${
              selectedFilter === 'SIGNIFICANT'
                ? 'bg-rose-500/20 border-rose-500/60 text-rose-300 shadow-lg shadow-rose-500/10'
                : 'bg-[#0E1324] border-[#252D45] hover:border-rose-500/30'
            }`}
          >
            {marketState.significantCount > 0 && (
              <span className="absolute top-0 right-0 w-3 h-3 bg-rose-500 rounded-full animate-ping opacity-75" />
            )}
            <div className="flex items-center justify-between text-xs text-[#94A3B8] mb-1 font-medium">
              <span>Significant</span>
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-rose-400 font-mono">
              {marketState.significantCount}
            </div>
            <div className="text-[10px] text-slate-500 mt-1">High anomaly</div>
          </button>

        </div>

      </div>

      {/* Proud "Nothing Significant Happened" Callout Banner (when calm day) */}
      {isCalmDay && (
        <div className="mt-6 p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-center space-x-3 text-emerald-300 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-xs">
            <strong className="text-white font-bold text-sm block">Nothing Significant Happened</strong>
            All {marketState.totalStocksWatched} watched securities traded within their historical daily volatility bands. 0 require your attention today.
          </div>
        </div>
      )}

      {/* Filter indicator */}
      {selectedFilter !== 'ALL' && (
        <div className="mt-4 pt-4 border-t border-[#252D45] flex items-center justify-between text-xs text-[#94A3B8]">
          <span>
            Filtering by: <strong className="text-white capitalize">{selectedFilter.replace(/_/g, ' ')}</strong>
          </span>
          <button
            onClick={() => onFilterChange('ALL')}
            className="text-violet-400 hover:text-violet-300 font-medium underline underline-offset-4"
          >
            Show all watched stocks ({marketState.totalStocksWatched})
          </button>
        </div>
      )}
    </div>
  );
};
