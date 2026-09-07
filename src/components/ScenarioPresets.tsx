import React from 'react';
import { Zap, TrendingDown, Layers, ShieldCheck } from 'lucide-react';
import { ScenarioPreset } from '../types/drift';

interface ScenarioPresetsProps {
  activePresetId: string;
  onSelectPreset: (presetId: string) => void;
}

export const PRESETS: ScenarioPreset[] = [
  {
    id: 'HDFC_EARNINGS',
    name: 'HDFC Earnings Anomaly',
    description: 'HDFC Bank +4.8% on 2.4x vol vs +0.6% broad market (Stock-specific outlier)',
    badge: 'Stock Drift',
    badgeColor: 'bg-rose-500/10 text-rose-300 border-rose-500/30'
  },
  {
    id: 'MARKET_CRASH',
    name: 'NIFTY 50 Macro Crash',
    description: 'Broad market drops -4.1%. DRIFT surfaces market-wide context banner.',
    badge: 'Market-Wide',
    badgeColor: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
  },
  {
    id: 'TECH_SECTOR',
    name: 'Tech Sector Spillover',
    description: 'TCS contract deferral (-3.5%) spills over into Infosys (-2.1%).',
    badge: 'Sector Drift',
    badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30'
  },
  {
    id: 'QUIET_DAY',
    name: 'Calm Baseline Day',
    description: 'All 8 stocks trade within expected daily volatility bands. No alerts.',
    badge: 'Normal Baseline',
    badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
  }
];

export const ScenarioPresets: React.FC<ScenarioPresetsProps> = ({
  activePresetId,
  onSelectPreset
}) => {
  return (
    <div className="glass-panel p-5 mb-8">
      
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-violet-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] font-heading">
            Interactive Scenario Presets
          </h3>
        </div>
        <span className="text-[11px] text-slate-500 hidden sm:inline">
          Click a scenario to trigger real-time anomaly re-evaluation
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {PRESETS.map((p) => {
          const isActive = activePresetId === p.id;
          return (
            <button
              key={p.id}
              onClick={() => onSelectPreset(p.id)}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                isActive
                  ? 'bg-[#141A2E] border-violet-500 shadow-lg shadow-violet-500/10'
                  : 'bg-[#0E1324] border-[#252D45] hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-white font-heading">{p.name}</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${p.badgeColor}`}>
                  {p.badge}
                </span>
              </div>
              <p className="text-[11px] text-[#94A3B8] leading-snug">{p.description}</p>
            </button>
          );
        })}
      </div>

    </div>
  );
};
