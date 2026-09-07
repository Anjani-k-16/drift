import React from 'react';
import { StockBaseline, MarketState } from '../types/drift';
import { X, TrendingUp, TrendingDown, Activity, Info, BarChart2 } from 'lucide-react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  ReferenceLine 
} from 'recharts';

interface StockDetailModalProps {
  stock: StockBaseline | null;
  marketState: MarketState;
  onClose: () => void;
}

export const StockDetailModal: React.FC<StockDetailModalProps> = ({
  stock,
  marketState,
  onClose
}) => {
  if (!stock) return null;

  const isPositive = stock.todayReturnPct >= 0;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      
      <div className="glass-panel w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative border-indigo-500/30 shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-slate-900 border border-white/10 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-black text-white font-mono">{stock.ticker}</span>
              <span className="text-xs text-indigo-300 font-semibold px-2.5 py-0.5 rounded bg-indigo-500/20 border border-indigo-500/30">
                {stock.sector}
              </span>
            </div>
            <p className="text-sm text-slate-400 mt-0.5">{stock.name}</p>
          </div>

          <div className="flex items-center space-x-4">
            <div>
              <span className="text-xs text-slate-500 block">Current Price</span>
              <span className="text-lg font-bold text-white font-mono">₹{stock.currentPrice.toLocaleString('en-IN')}</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Today Return</span>
              <span className={`text-lg font-bold font-mono ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                {isPositive ? `+${stock.todayReturnPct}%` : `${stock.todayReturnPct}%`}
              </span>
            </div>
          </div>
        </div>

        {/* Statistical Summary Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5">
            <span className="text-xs text-slate-400 block mb-1">Statistical Z-Score</span>
            <span className="text-xl font-extrabold text-indigo-400 font-mono">{stock.zScore}σ</span>
            <span className="text-[10px] text-slate-500 block mt-1">Std Deviation from mean</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5">
            <span className="text-xs text-slate-400 block mb-1">30-Day Volatility</span>
            <span className="text-xl font-extrabold text-slate-200 font-mono">±{stock.typicalDailyMovePct}%</span>
            <span className="text-[10px] text-slate-500 block mt-1">Normal daily baseline</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5">
            <span className="text-xs text-slate-400 block mb-1">Volume Ratio</span>
            <span className="text-xl font-extrabold text-amber-400 font-mono">{stock.volumeMultiplier}×</span>
            <span className="text-[10px] text-slate-500 block mt-1">vs 30d avg volume</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5">
            <span className="text-xs text-slate-400 block mb-1">NIFTY 50 Correlation</span>
            <span className="text-xl font-extrabold text-slate-200 font-mono">{(stock.marketCorrelation * 100).toFixed(0)}%</span>
            <span className="text-[10px] text-slate-500 block mt-1">Index tracking factor</span>
          </div>
        </div>

        {/* Recharts Chart View: 30-Day Price & Volatility Bands */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-white font-heading flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-400" />
              30-Day Price Path vs Expected Normal Variance Band (±1.5σ)
            </h4>
            <span className="text-xs text-slate-400 font-mono">Simulated Tick History</span>
          </div>

          <div className="h-64 w-full bg-slate-950/60 p-4 rounded-2xl border border-white/10">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={stock.priceHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={11} />
                <YAxis domain={['auto', 'auto']} stroke="#64748b" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="price" stroke="#818cf8" strokeWidth={2.5} dot={false} name="Stock Price (₹)" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Volume Histogram Chart */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-white font-heading flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-amber-400" />
              Volume Spike Analysis (Current Volume vs 30-Day Normal Baseline)
            </h4>
          </div>

          <div className="h-44 w-full bg-slate-950/60 p-4 rounded-2xl border border-white/10">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={stock.priceHistory.slice(-14)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="volume" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Actual Volume" />
                <Line type="monotone" dataKey="normalVolume" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth={2} name="30d Avg Volume" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Footer info note */}
        <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-slate-300 flex items-start space-x-3">
          <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white block mb-0.5">DRIFT Anomaly Principles:</strong>
            DRIFT does not rely on absolute fixed percentage thresholds (e.g. static 2%). Instead, each stock's volatility profile forms a dynamic statistical boundary. High volatility stocks (like Tata Motors ±1.8%) require larger moves to trigger an alert than steady stocks (like HDFC Bank ±0.7%).
          </div>
        </div>

      </div>

    </div>
  );
};
