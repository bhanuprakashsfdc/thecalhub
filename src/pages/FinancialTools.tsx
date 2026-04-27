
import { Sparkles, Banknote, TrendingUp, Lock, ShieldCheck, LineChart, ArrowRight, Rocket } from 'lucide-react';

import { Link } from 'react-router-dom';

const tools = [
  {
    id: 'emi',
    icon: Banknote,
    label: 'Active Tool',
    title: 'EMI Calculator',
    description: 'Calculate Equated Monthly Installments for home, car, or personal loans with amortization schedules.',
    version: 'v2.1.0',
    path: '/standard.html',
  },
  {
    id: 'sip',
    icon: TrendingUp,
    label: 'Investment',
    title: 'SIP Calculator',
    description: 'Forecast Systematic Investment Plan returns using historical benchmarks and compound interest models.',
    version: 'v1.4.2',
    path: '#',
  },
  {
    id: 'fd',
    icon: Lock,
    label: 'Savings',
    title: 'Fixed Deposit',
    description: 'Determine maturity amounts for FD accounts with monthly, quarterly, or annual interest compounding.',
    version: 'v1.0.8',
    path: '#',
  },
];

export default function FinancialTools() {
  return (
    <div className="mt-14 p-6 md:p-10 flex-1 overflow-y-auto">
      <div className="mb-12">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Category</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Financial Calculators</h2>
        <p className="text-neutral-400 max-w-xl text-lg leading-relaxed">
          High-precision instruments for wealth management, loan forecasting, and investment analysis. Crafted for the technical professional.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <div key={tool.id} className="group relative bg-surface-container-low rounded-xl p-6 border border-transparent hover:border-outline-variant/30 transition-all duration-300 flex flex-col h-full">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <tool.icon className="w-16 h-16 text-primary-fixed" />
            </div>
            <div className="mb-6 flex items-center justify-between">
              <div className="p-2 rounded bg-white/5 text-primary-fixed">
                <tool.icon className="w-5 h-5" />
              </div>
              <span className="font-mono text-[10px] text-neutral-600 uppercase tracking-widest">{tool.label}</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-fixed transition-colors">{tool.title}</h3>
            <p className="text-neutral-400 text-sm mb-8 leading-relaxed">{tool.description}</p>
            <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
              <span className="mono text-xs text-neutral-500">{tool.version}</span>
              <Link 
                to={tool.path}
                className="flex items-center gap-2 px-4 py-2 rounded bg-surface-container-highest text-on-surface text-xs font-bold hover:bg-primary-fixed hover:text-on-primary-fixed transition-all duration-150"
              >
                Open <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}

        <div className="group relative bg-surface-container-low rounded-xl p-6 border border-transparent hover:border-outline-variant/30 transition-all duration-300 flex flex-col h-full lg:col-span-2">
          <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden rounded-xl">
            <img 
              src="https://picsum.photos/seed/abstract/800/400" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="relative z-10">
            <div className="mb-6 flex items-center justify-between">
              <div className="p-2 rounded bg-white/5 text-primary-fixed">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="px-2 py-0.5 rounded-full bg-primary-fixed/10 text-primary-fixed font-mono text-[9px] uppercase tracking-widest font-bold">Recommended</span>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-black text-white mb-3 tracking-tight group-hover:text-primary-fixed transition-colors">Loan Eligibility</h3>
                <p className="text-neutral-400 text-sm mb-6 leading-relaxed">Advanced assessment of creditworthiness based on debt-to-income ratios, existing obligations, and credit scores.</p>
              </div>
              <div className="flex flex-col justify-end items-end">
                <ul className="text-[11px] font-mono text-neutral-500 space-y-2 mb-6 text-right">
                  <li>+ Multi-currency support</li>
                  <li>+ Tax implication models</li>
                  <li>+ Dynamic amortization</li>
                </ul>
                <button className="flex items-center gap-3 px-6 py-3 rounded bg-primary-fixed text-on-primary-fixed text-sm font-bold hover:shadow-[0_0_20px_rgba(214,237,121,0.3)] transition-all duration-200">
                  Launch Advanced Tool <Rocket className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="group relative bg-surface-container-low rounded-xl p-6 border border-transparent hover:border-outline-variant/30 transition-all duration-300 flex flex-col h-full">
          <div className="mb-6 flex items-center justify-between">
            <div className="p-2 rounded bg-white/5 text-primary-fixed">
              <LineChart className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-fixed transition-colors">ROI Calculator</h3>
          <p className="text-neutral-400 text-sm mb-8 leading-relaxed">Calculate absolute and annualized Return on Investment for any capital expenditure or asset purchase.</p>
          <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
            <span className="mono text-xs text-neutral-500">v3.0.1</span>
            <button className="flex items-center gap-2 px-4 py-2 rounded bg-surface-container-highest text-on-surface text-xs font-bold hover:bg-primary-fixed hover:text-on-primary-fixed transition-all duration-150">
              Open <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-20 flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-8 pb-12 gap-6">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest mb-1">Status</span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
              <span className="text-xs text-neutral-400 font-medium">All engines nominal</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest mb-1">Latency</span>
            <span className="text-xs text-neutral-400 font-mono">14ms</span>
          </div>
        </div>
      </div>
    </div>
  );
}
