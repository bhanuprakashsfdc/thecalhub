import { useState } from 'react';
import { DollarSign } from 'lucide-react';

export function NPVCalculator() {
  const [rate, setRate] = useState(10);
  const [cashflows, setCashflows] = useState("-1000, 300, 400, 500, 600");
  
  const calculate = () => {
    const flows = cashflows.split(',').map(c => Number(c.trim()));
    let npv = 0;
    flows.forEach((cf, i) => { npv += cf / Math.pow(1 + rate/100, i + 1); });
    return npv.toFixed(2);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5"><div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl space-y-8">
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Discount Rate (%)</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl outline-none" type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} /></div>
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Cash Flows (comma separated)</label><textarea className="w-full h-24 bg-surface-container-highest border-none rounded-lg p-4 text-white mono text-lg outline-none resize-none" value={cashflows} onChange={(e) => setCashflows(e.target.value)} /><p className="text-neutral-500 text-xs mt-2">Year 0 is initial investment (negative)</p></div>
      </div></div>
      <div className="lg:col-span-7"><div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
        <div className="flex items-center gap-2 text-primary-fixed mb-6"><DollarSign className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Net Present Value</span></div>
        <div className="bg-surface-container-highest p-8 rounded-xl"><p className="text-4xl font-bold text-white mono">${calculate()}</p></div>
      </div></div>
    </div>
  );
}
export default NPVCalculator;