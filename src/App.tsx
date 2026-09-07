import React, { useState, useMemo } from 'react';
import { INITIAL_STOCKS } from './services/mockMarketData';
import { evaluateDrift } from './services/driftEngine';
import { StockBaseline, UserLastSeenState, DataFreshnessStatus } from './types/drift';
import { Navbar } from './components/Navbar';
import { HeroDigest } from './components/HeroDigest';
import { MarketContextBanner } from './components/MarketContextBanner';
import { SignalCard } from './components/SignalCard';
import { StockDetailModal } from './components/StockDetailModal';
import { ScenarioPresets } from './components/ScenarioPresets';
import { WatchlistSidebar } from './components/WatchlistSidebar';
import { Sparkles, Shield, AlertTriangle } from 'lucide-react';

export const App: React.FC = () => {
  const [stocksRaw, setStocksRaw] = useState<StockBaseline[]>(INITIAL_STOCKS);
  const [activePresetId, setActivePresetId] = useState<string>('HDFC_EARNINGS');
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [inspectedStock, setInspectedStock] = useState<StockBaseline | null>(null);
  const [forcedMarketReturn, setForcedMarketReturn] = useState<number | undefined>(undefined);
  const [freshnessStatus, setFreshnessStatus] = useState<DataFreshnessStatus>('LIVE');

  const [userLastSeen, setUserLastSeen] = useState<UserLastSeenState>({
    lastSeenTimestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    timeAgoLabel: '10 minutes ago',
    unseenChangeCount: 3
  });

  const { stocks: evaluatedStocks, marketState } = useMemo(() => {
    const res = evaluateDrift(stocksRaw, forcedMarketReturn);
    res.marketState.freshnessStatus = freshnessStatus;
    return res;
  }, [stocksRaw, forcedMarketReturn, freshnessStatus]);

  const handleSelectPreset = (presetId: string) => {
    setActivePresetId(presetId);
    let updated = INITIAL_STOCKS.map(s => ({ ...s }));

    if (presetId === 'HDFC_EARNINGS') {
      setForcedMarketReturn(0.60);
      updated = updated.map(s => {
        if (s.ticker === 'HDFCBANK') {
          return { ...s, todayReturnPct: 4.80, volumeMultiplier: 2.41 };
        }
        if (s.ticker === 'TCS') {
          return { ...s, todayReturnPct: -3.20, volumeMultiplier: 2.34 };
        }
        if (s.ticker === 'RELIANCE') {
          return { ...s, todayReturnPct: 1.70, volumeMultiplier: 1.18 };
        }
        return { ...s, todayReturnPct: Math.round((Math.random() * 0.8 - 0.4) * 100) / 100, volumeMultiplier: 0.95 };
      });
    } else if (presetId === 'MARKET_CRASH') {
      setForcedMarketReturn(-4.10);
      updated = updated.map(s => ({
        ...s,
        todayReturnPct: Number((-3.5 - Math.random() * 1.8).toFixed(2)),
        volumeMultiplier: Number((1.8 + Math.random() * 1.2).toFixed(2))
      }));
    } else if (presetId === 'TECH_SECTOR') {
      setForcedMarketReturn(-0.40);
      updated = updated.map(s => {
        if (s.ticker === 'TCS') return { ...s, todayReturnPct: -3.50, volumeMultiplier: 2.5 };
        if (s.ticker === 'INFY') return { ...s, todayReturnPct: -2.10, volumeMultiplier: 1.8 };
        return { ...s, todayReturnPct: 0.3, volumeMultiplier: 0.9 };
      });
    } else if (presetId === 'QUIET_DAY') {
      setForcedMarketReturn(0.15);
      updated = updated.map(s => ({
        ...s,
        todayReturnPct: Number(((Math.random() - 0.5) * s.typicalDailyMovePct * 0.8).toFixed(2)),
        volumeMultiplier: Number((0.85 + Math.random() * 0.25).toFixed(2))
      }));
    }

    setStocksRaw(updated);
  };

  const handleToggleFreshness = () => {
    if (freshnessStatus === 'LIVE') setFreshnessStatus('DELAYED');
    else if (freshnessStatus === 'DELAYED') setFreshnessStatus('STALE');
    else setFreshnessStatus('LIVE');
  };

  const displayedStocks = useMemo(() => {
    let result = evaluatedStocks;
    if (selectedFilter !== 'ALL') {
      result = result.filter(s => s.severity === selectedFilter);
    }
    const priority = { SIGNIFICANT: 0, WORTH_A_LOOK: 1, NORMAL: 2 };
    return [...result].sort((a, b) => priority[a.severity] - priority[b.severity]);
  }, [evaluatedStocks, selectedFilter]);

  const handleAddStock = (ticker: string, name: string, sector: string) => {
    const newStock: StockBaseline = {
      ticker,
      name,
      sector,
      currentPrice: 1000 + Math.round(Math.random() * 1500),
      previousClose: 1000,
      todayReturnPct: 3.20,
      historicalVolatility: 1.10,
      typicalDailyMovePct: 1.10,
      todayVolume: 5000000,
      avg30dVolume: 2000000,
      volumeMultiplier: 2.5,
      zScore: 2.91,
      volumeZScore: 2.5,
      severity: 'SIGNIFICANT',
      driftType: 'STOCK_SPECIFIC',
      marketCorrelation: 0.70,
      lastUpdated: 'Just now',
      priceHistory: [],
      dataQuality: {
        priceFreshness: 'FRESH',
        volumeFreshness: 'FRESH',
        historyCompleteness: 'COMPLETE_30D',
        confidence: 'HIGH'
      }
    };

    setStocksRaw([newStock, ...stocksRaw]);
  };

  const handleRemoveStock = (ticker: string) => {
    setStocksRaw(stocksRaw.filter(s => s.ticker !== ticker));
  };

  const handleResetData = () => {
    setStocksRaw(INITIAL_STOCKS);
    setActivePresetId('HDFC_EARNINGS');
    setForcedMarketReturn(0.60);
    setSelectedFilter('ALL');
    setFreshnessStatus('LIVE');
  };

  return (
    <div className="min-h-screen pb-16">
      <Navbar
        userLastSeen={userLastSeen}
        onSelectTimeAgo={(label) => setUserLastSeen({ ...userLastSeen, timeAgoLabel: label })}
        activePresetId={activePresetId}
        onResetData={handleResetData}
        freshnessStatus={freshnessStatus}
        onToggleFreshness={handleToggleFreshness}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {freshnessStatus !== 'LIVE' && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-950/60 border border-amber-500/40 text-amber-300 flex items-center justify-between text-xs animate-in fade-in">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <strong className="text-white text-sm block">
                  {freshnessStatus === 'DELAYED' ? 'Market Feed Delayed (14m old)' : 'Feed Offline: Showing Last Valid Snapshot'}
                </strong>
                Signals calculated from last valid snapshot.
              </div>
            </div>

            <button
              onClick={handleToggleFreshness}
              className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-white font-semibold shrink-0"
            >
              Restore Feed
            </button>
          </div>
        )}

        <ScenarioPresets
          activePresetId={activePresetId}
          onSelectPreset={handleSelectPreset}
        />

        <HeroDigest
          marketState={marketState}
          userLastSeen={userLastSeen}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
        />

        <MarketContextBanner marketState={marketState} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-extrabold text-white font-heading flex items-center gap-2">
                <span>Surfaced Signals</span>
                <span className="text-xs font-normal text-slate-400 font-mono">
                  ({displayedStocks.length})
                </span>
              </h2>

              <span className="text-xs text-slate-400">
                Sorted by |z-score|
              </span>
            </div>

            {displayedStocks.length === 0 ? (
              <div className="glass-panel p-8 text-center text-slate-400">
                <Shield className="w-8 h-8 text-emerald-400 mx-auto mb-2 opacity-60" />
                <p className="text-sm font-semibold text-white">No securities match this filter</p>
                <p className="text-xs mt-1">All monitored stocks are within normal baseline thresholds.</p>
                <button
                  onClick={() => setSelectedFilter('ALL')}
                  className="mt-4 text-xs font-semibold text-indigo-400 hover:underline"
                >
                  Clear filter
                </button>
              </div>
            ) : (
              displayedStocks.map(stock => (
                <SignalCard
                  key={stock.ticker}
                  stock={stock}
                  marketState={marketState}
                  onInspectDetail={setInspectedStock}
                />
              ))
            )}
          </div>

          <div className="space-y-6 lg:sticky lg:top-20 self-start">
            <WatchlistSidebar
              stocks={evaluatedStocks}
              onAddStock={handleAddStock}
              onRemoveStock={handleRemoveStock}
              onInspectDetail={setInspectedStock}
            />

            <div className="glass-panel p-5 border-violet-500/30 bg-violet-950/20">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-violet-400 mb-2">
                <Sparkles className="w-4 h-4" />
                <span>The Core Drift Insight</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                "Movement != Meaningful Change. DRIFT measures deviation relative to each stock's historical volatility baseline."
              </p>
            </div>
          </div>
        </div>
      </main>

      <StockDetailModal
        stock={inspectedStock}
        marketState={marketState}
        onClose={() => setInspectedStock(null)}
      />
    </div>
  );
};
