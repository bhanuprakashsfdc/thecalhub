import { useState } from 'react';
import { Percent } from 'lucide-react';

export function IRRCalculator() {
  const [cashflows, setCashflows] = useState("-1000, 300, 400, 500, 600");
  
  const calculate = () => {
    const flows = cashflows.split(',').map(c => Number(c.trim()));
    let rate = 0.1;
    for (let i = 0; i < 100; i++) {
      let npv = 0;
      flows.forEach((cf, j) => { npv += cf / Math.pow(1 + rate, j + 1); });
      if (Math.abs(npv) < 0.01) break;
      rate += npv > 0 ? 0.001 : -0.001;
    }
    return (rate * 100).toFixed(2);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5"><div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl space-y-8">
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Cash Flows (comma separated)</label><textarea className="w-full h-24 bg-surface-container-highest border-none rounded-lg p-4 text-white mono text-lg outline-none resize-none" value={cashflows} onChange={(e) => setCashflows(e.target.value)} /></div>
      </div></div>
      <div className="lg:col-span-7"><div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
        <div className="flex items-center gap-2 text-primary-fixed mb-6"><Percent className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Internal Rate of Return</span></div>
        <div className="bg-surface-container-highest p-8 rounded-xl"><p className="text-4xl font-bold text-white mono">{calculate()}%</p></div>
      </div></div>
    </div>
  );
}
export default IRRCalculator;