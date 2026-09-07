import React from 'react';
import { X, Activity, Cpu, Globe, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const steps = [
    {
      num: '01',
      title: 'Learn Baseline',
      icon: Activity,
      color: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10',
      description: 'Establishes a dynamic historical 30-day rolling daily volatility (σ) for each monitored stock. Stable stocks have small typical moves (e.g. ±0.7%), while volatile stocks have wider bands (e.g. ±1.8%).'
    },
    {
      num: '02',
      title: 'Detect Anomaly',
      icon: Cpu,
      color: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
      description: 'Calculates the current return z-score (z = (R - μ) / σ) and trading volume multiplier. Identifies statistically unusual movements beyond standard deviation thresholds.'
    },
    {
      num: '03',
      title: 'Contextualize Macro Drift',
      icon: Globe,
      color: 'text-violet-400 border-violet-500/30 bg-violet-500/10',
      description: 'Calculates the mean z-score across the entire watchlist. If the macro index moves heavily (e.g. NIFTY -4.1%), DRIFT flags Market-Wide Drift and filters out false individual alarms.'
    },
    {
      num: '04',
      title: 'Remember User State',
      icon: Clock,
      color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
      description: 'Compares the current market memory against your personal last visited timestamp ("Since You Were Last Here"). Personalizes change detection based on when YOU were away.'
    },
    {
      num: '05',
      title: 'Surface & Explain',
      icon: ShieldCheck,
      color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
      description: 'Categorizes into Normal, Worth a Look, and Significant. Generates conservative, data-backed explanations without buy/sell recommendations or hallucinated causes.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="glass-panel w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative border-indigo-500/30 shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-slate-900 border border-white/10 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Activity className="w-4 h-4" />
            <span>Architecture & Methodology</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white font-heading">
            How DRIFT Works
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Don't watch the market. Understand what changed. The 5-stage statistical pipeline.
          </p>
        </div>

        {/* 5 Steps Vertical Flow */}
        <div className="space-y-4 mb-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="p-4 rounded-xl bg-slate-900/60 border border-white/5 flex items-start space-x-4">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${step.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-slate-500">{step.num}</span>
                    <h3 className="text-sm font-bold text-white font-heading">{step.title}</h3>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Core Design Principles Box */}
        <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-slate-300 space-y-2">
          <div className="font-bold text-indigo-300 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Strict System Guardrails & Ethics:
          </div>
          <ul className="list-disc list-inside space-y-1 text-slate-300 pl-1 text-[11px]">
            <li><strong>No Buy/Sell/Hold Advice</strong>: DRIFT surfaces statistical anomalies; investment decisions remain 100% with the user.</li>
            <li><strong>Detect Confidently, Explain Conservatively</strong>: If public filing data is unavailable, DRIFT explicitly states cause is unverified rather than hallucinating events.</li>
            <li><strong>Shared Market Computation</strong>: Market state is computed once globally, then lightweight personalized views are rendered per user.</li>
          </ul>
        </div>

      </div>
    </div>
  );
};
