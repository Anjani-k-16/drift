import React, { useState } from 'react';
import { StockBaseline } from '../types/drift';
import { Plus, SlidersHorizontal, Trash2, Search, Check, ShieldAlert, Eye } from 'lucide-react';

interface WatchlistSidebarProps {
  stocks: StockBaseline[];
  onAddStock: (ticker: string, name: string, sector: string) => void;
  onRemoveStock: (ticker: string) => void;
  onInspectDetail: (stock: StockBaseline) => void;
}

export const WatchlistSidebar: React.FC<WatchlistSidebarProps> = ({
  stocks,
  onAddStock,
  onRemoveStock,
  onInspectDetail
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTicker, setNewTicker] = useState('');
  const [newName, setNewName] = useState('');
  const [newSector, setNewSector] = useState('Banking & Financials');

  const filteredStocks = stocks.filter(
    s => s.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
         s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmitAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTicker.trim() && newName.trim()) {
      onAddStock(newTicker.toUpperCase().trim(), newName.trim(), newSector);
      setNewTicker('');
      setNewName('');
      setShowAddForm(false);
    }
  };

  return (
    <div className="glass-panel p-5">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-extrabold text-white font-heading">
            Watched Securities ({stocks.length})
          </h3>
          <p className="text-[11px] text-slate-400">Baseline Memory Active</p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center space-x-1 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Ticker</span>
        </button>
      </div>

      {/* Add Ticker Form */}
      {showAddForm && (
        <form onSubmit={handleSubmitAdd} className="mb-4 p-3 rounded-xl bg-slate-900 border border-indigo-500/30 space-y-2.5 animate-in fade-in">
          <div>
            <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Ticker Symbol</label>
            <input
              type="text"
              placeholder="e.g. AXISBANK"
              value={newTicker}
              onChange={e => setNewTicker(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
              required
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Company Name</label>
            <input
              type="text"
              placeholder="e.g. Axis Bank Ltd."
              value={newName}
              onChange={e => setNewName(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Sector</label>
            <select
              value={newSector}
              onChange={e => setNewSector(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="Banking & Financials">Banking & Financials</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Energy & Conglomerate">Energy & Conglomerate</option>
              <option value="Automotive">Automotive</option>
              <option value="Consumer Goods">Consumer Goods</option>
              <option value="Telecommunications">Telecommunications</option>
            </select>
          </div>

          <div className="flex items-center justify-end space-x-2 pt-1">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-2.5 py-1 rounded text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white"
            >
              Add to Baseline
            </button>
          </div>
        </form>
      )}

      {/* Search Input */}
      <div className="relative mb-3">
        <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
        <input
          type="text"
          placeholder="Filter watchlist..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Stock Ticker List */}
      <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
        {filteredStocks.map(stock => {
          const isPos = stock.todayReturnPct >= 0;
          return (
            <div
              key={stock.ticker}
              className="p-2.5 rounded-xl bg-slate-900/40 border border-white/5 hover:border-white/20 transition-all flex items-center justify-between group"
            >
              <div 
                onClick={() => onInspectDetail(stock)}
                className="flex-1 cursor-pointer"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-white font-mono">{stock.ticker}</span>
                  {stock.severity === 'SIGNIFICANT' && (
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  )}
                  {stock.severity === 'WORTH_A_LOOK' && (
                    <Eye className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  )}
                </div>
                <div className="text-[10px] text-slate-400 truncate max-w-[140px]">{stock.name}</div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="text-right font-mono">
                  <div className={`text-xs font-bold ${isPos ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {isPos ? `+${stock.todayReturnPct}%` : `${stock.todayReturnPct}%`}
                  </div>
                  <div className="text-[10px] text-slate-500">{stock.zScore}σ</div>
                </div>

                <button
                  onClick={() => onRemoveStock(stock.ticker)}
                  title="Remove from watchlist"
                  className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-rose-400 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
