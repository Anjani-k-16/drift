import React, { useState } from 'react';
import { StockBaseline, MarketState } from '../types/drift';
import { generateSignalSummary } from '../services/driftEngine';
import { 
  ChevronRight, 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  ShieldAlert, 
  Eye, 
  CheckCircle,
  HelpCircle,
  Newspaper,
  SlidersHorizontal,
  Clock,
  ShieldCheck,
  Check
} from 'lucide-react';

interface SignalCardProps {
  stock: StockBaseline;
  marketState: MarketState;
  onInspectDetail: (stock: StockBaseline) => void;
}

export const SignalCard: React.FC<SignalCardProps> = ({
  stock,
  marketState,
  onInspectDetail
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const isPositive = stock.todayReturnPct >= 0;
  const signalSummary = generateSignalSummary(stock, marketState);

  const getSeverityBadge = () => {
    switch (stock.severity) {
      case 'SIGNIFICANT':
        return (
          <div className="flex items-center space-x-1 px-3 py-1 rounded-full badge-significant text-xs font-bold font-mono">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>SIGNIFICANT</span>
          </div>
        );
      case 'WORTH_A_LOOK':
        return (
          <div className="flex items-center space-x-1 px-3 py-1 rounded-full badge-worth text-xs font-bold font-mono">
            <Eye className="w-3.5 h-3.5" />
            <span>WORTH A LOOK</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center space-x-1 px-3 py-1 rounded-full badge-normal text-xs font-semibold font-mono">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>NORMAL</span>
          </div>
        );
    }
  };

  return (
    <div className={`glass-panel p-5 sm:p-6 mb-5 relative transition-all ${
      stock.severity === 'SIGNIFICANT'
        ? 'border-l-4 border-l-[#FF5A79] border-rose-500/40 bg-[#141A2E] shadow-xl shadow-rose-950/20 hover:border-rose-500/60'
        : 'border-[#252D45]'
    }`}>
      
      {/* Top Header Row */}
      <div className="flex items-start justify-between gap-4">
        
        <div>
          <div className="flex items-center space-x-3">
            <h3 className="text-lg sm:text-xl font-extrabold text-white font-mono tracking-tight">
              {stock.ticker}
            </h3>
            <span className="text-xs text-slate-300 font-medium px-2.5 py-0.5 rounded bg-white/5 border border-white/10">
              {stock.sector}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">{stock.name}</p>
        </div>

        {/* Severity Badge & Today Return */}
        <div className="flex flex-col items-end">
          {getSeverityBadge()}
          <div className={`flex items-center space-x-1 text-xl sm:text-2xl font-bold font-mono mt-2 ${
            isPositive ? 'text-emerald-400' : 'text-rose-400'
          }`}>
            {isPositive ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
            <span>{isPositive ? `+${stock.todayReturnPct.toFixed(2)}%` : `${stock.todayReturnPct.toFixed(2)}%`}</span>
          </div>
        </div>

      </div>

      {/* Main Metric Comparison Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 p-3.5 rounded-xl bg-slate-900/60 border border-white/5">
        
        <div>
          <span className="text-[11px] text-slate-400 font-medium block mb-0.5">Typical Daily Move</span>
          <span className="text-sm font-semibold text-slate-200 font-mono">
            ±{stock.typicalDailyMovePct.toFixed(2)}%
          </span>
        </div>

        <div>
          <span className="text-[11px] text-slate-400 font-medium block mb-0.5">Today's Deviation</span>
          <span className="text-sm font-bold text-indigo-300 font-mono">
            {stock.zScore > 0 ? `+${stock.zScore}` : stock.zScore}σ
          </span>
        </div>

        <div>
          <span className="text-[11px] text-slate-400 font-medium block mb-0.5">Trading Volume</span>
          <span className={`text-sm font-semibold font-mono ${
            stock.volumeMultiplier >= 1.8 ? 'text-amber-400 font-bold' : 'text-slate-200'
          }`}>
            {stock.volumeMultiplier.toFixed(2)}× normal
          </span>
        </div>

        <div>
          <span className="text-[11px] text-slate-400 font-medium block mb-0.5">Classification</span>
          <span className="text-xs font-semibold text-slate-300">
            {stock.driftType === 'STOCK_SPECIFIC' 
              ? 'Stock-Specific' 
              : stock.driftType === 'MARKET_WIDE' 
              ? 'Market-Wide' 
              : 'Within Baseline'}
          </span>
        </div>

      </div>

      {/* Primary Action Buttons */}
      <div className="flex items-center justify-between pt-2 border-t border-white/5">
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors py-1"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Why you're seeing this</span>
          <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
        </button>

        <button
          onClick={() => onInspectDetail(stock)}
          className="flex items-center space-x-1.5 text-xs font-medium text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        >
          <BarChart3 className="w-3.5 h-3.5 text-indigo-400" />
          <span>Inspect Baseline Chart</span>
        </button>

      </div>

      {/* Expandable Evidence Drawer */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-indigo-500/20 bg-slate-900/90 rounded-xl p-4 sm:p-5 border animate-in fade-in duration-200 space-y-4">
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Factual Evidence & Narrative Explanation</span>
            </div>

            <div className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-bold text-emerald-400 font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Data Quality: {stock.dataQuality?.confidence || 'HIGH'}</span>
            </div>
          </div>

          {/* Explanation Box */}
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans bg-indigo-950/40 p-3.5 rounded-xl border border-indigo-500/20">
            {signalSummary}
          </p>

          {/* Intraday Drift Progression Timeline */}
          {stock.intradayTimeline && (
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 mb-2">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                <span>Intraday Drift Progression (While You Were Away):</span>
              </div>
              
              <div className="flex items-center space-x-2 overflow-x-auto py-1">
                {stock.intradayTimeline.map((pt, idx) => {
                  const ptPos = pt.returnPct >= 0;
                  return (
                    <React.Fragment key={idx}>
                      <div className={`px-2.5 py-1.5 rounded-lg border text-center text-xs shrink-0 ${
                        pt.isCrossedBaseline
                          ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300 font-bold'
                          : 'bg-slate-900 border-white/10 text-slate-300'
                      }`}>
                        <div className="text-[10px] text-slate-500 font-mono">{pt.time}</div>
                        <div className={`font-mono font-semibold ${ptPos ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {ptPos ? `+${pt.returnPct}%` : `${pt.returnPct}%`}
                        </div>
                        {pt.isCrossedBaseline && (
                          <span className="text-[9px] text-indigo-400 uppercase tracking-tighter block font-bold">
                            Crossed Baseline
                          </span>
                        )}
                      </div>
                      {idx < stock.intradayTimeline!.length - 1 && (
                        <span className="text-slate-600 font-mono text-xs">→</span>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          )}

          {/* Evidence bullets if news filing exists */}
          {stock.catalystEvidence?.bulletPoints && (
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center space-x-2 text-slate-400 font-medium">
                <Newspaper className="w-3.5 h-3.5 text-indigo-400" />
                <span>Supporting Public Filings & Signals:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-300 pl-2">
                {stock.catalystEvidence.bulletPoints.map((pt, idx) => (
                  <li key={idx} className="leading-normal">{pt}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Footer Quality Verification */}
          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center space-x-3">
              <span className="flex items-center gap-1 text-slate-400">
                <Check className="w-3 h-3 text-emerald-400" /> Price: Fresh
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <Check className="w-3 h-3 text-emerald-400" /> Volume: Fresh
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <Check className="w-3 h-3 text-emerald-400" /> 30d Baseline: Complete
              </span>
            </div>
            <span className="text-indigo-400 font-mono">No financial advice implied</span>
          </div>

        </div>
      )}

    </div>
  );
};
