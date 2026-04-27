import { TrendingUp, Target } from 'lucide-react';

const tradingCalculators = [
  { name: 'Position Size Calculator', path: '/position-size-calculator.html', description: 'Calculate optimal position size' },
  { name: 'Risk/Reward Calculator', path: '/risk-reward-calculator.html', description: 'Calculate risk to reward ratio' },
  { name: 'P&L Calculator', path: '/pnl-calculator.html', description: 'Calculate profit and loss' },
  { name: 'Stop Loss Calculator', path: '/stop-loss-calculator.html', description: 'Calculate stop loss levels' },
  { name: 'Breakeven Calculator', path: '/breakeven-calculator.html', description: 'Calculate breakeven point' },
  { name: 'Kelly Criterion Calculator', path: '/kelly-criterion-calculator.html', description: 'Calculate optimal position using Kelly' },
  { name: 'Risk of Ruin Calculator', path: '/risk-of-ruin-calculator.html', description: 'Calculate probability of ruin' },
  { name: 'CAGR Calculator', path: '/cagr-calculator.html', description: 'Calculate compound annual growth rate' },
  { name: 'Liquidation Calculator', path: '/liquidation-calculator.html', description: 'Calculate liquidation price' },
  { name: 'DCA Calculator', path: '/dca-calculator.html', description: 'Dollar cost averaging' },
];

export default function TradingPage() {
  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Target className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Trading</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Trading Calculators</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">
          Professional trading tools for position sizing, risk management, and profit calculations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tradingCalculators.map((calc) => (
          <a
            key={calc.name}
            href={calc.path}
            className="bg-surface-container-low p-5 rounded-xl border border-white/5 hover:border-primary-fixed/50 transition-all flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-primary-fixed/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary-fixed" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">{calc.name}</h3>
              <p className="text-neutral-400 text-sm">{calc.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}