import React from 'react';
import { MarketState } from '../types/drift';
import { Globe, TrendingDown, TrendingUp, Info } from 'lucide-react';

interface MarketContextBannerProps {
  marketState: MarketState;
}

export const MarketContextBanner: React.FC<MarketContextBannerProps> = ({ marketState }) => {
  if (!marketState.isMarketWideDrift) {
    return (
      <div className="mb-6 px-4 py-3 rounded-xl bg-[#0E1324] border border-[#252D45] flex items-center justify-between text-xs text-[#94A3B8]">
        <div className="flex items-center space-x-2">
          <Info className="w-4 h-4 text-violet-400 shrink-0" />
          <span>
            <strong className="text-slate-200">Broader Market Baseline:</strong> {marketState.indexName} shifted{' '}
            <span className={`font-mono font-bold ${marketState.indexReturnPct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {marketState.indexReturnPct >= 0 ? `+${marketState.indexReturnPct}%` : `${marketState.indexReturnPct}%`}
            </span>{' '}
            today. Individual stock signals below reflect relative stock-specific deviations.
          </span>
        </div>
        <span className="hidden sm:inline-block text-[11px] text-slate-500 font-mono">
          Macro Z: {marketState.indexZScore}σ
        </span>
      </div>
    );
  }

  const isUp = marketState.marketDriftDirection === 'UP';

  return (
    <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 backdrop-blur-md relative overflow-hidden">
      <div className="flex items-start space-x-4">
        
        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
          <Globe className="w-5 h-5 text-cyan-400" />
        </div>

        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Macro Context Active
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
              Market-Wide Movement Detected
            </span>
          </div>

          <h3 className="text-base font-bold text-white mt-1 font-heading flex items-center gap-2">
            Broad market shift ({marketState.indexReturnPct >= 0 ? `+${marketState.indexReturnPct}%` : `${marketState.indexReturnPct}%`})
            {isUp ? (
              <TrendingUp className="w-4 h-4 text-emerald-400 inline" />
            ) : (
              <TrendingDown className="w-4 h-4 text-rose-400 inline" />
            )}
          </h3>

          <p className="text-xs text-slate-300 mt-1 leading-relaxed max-w-3xl">
            Most stocks in your watchlist moved unusually in the same direction today. DRIFT has adjusted individual anomaly thresholds so you only see signals where a stock deviated significantly further than the broader tide.
          </p>
        </div>

        <div className="hidden lg:block text-right font-mono shrink-0">
          <div className="text-xs text-slate-400">Index Mean Z-Score</div>
          <div className="text-lg font-bold text-cyan-300">{marketState.indexZScore}σ</div>
        </div>

      </div>
    </div>
  );
};
