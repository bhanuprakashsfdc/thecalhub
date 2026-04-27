import { useState } from 'react';
import { Calculator } from 'lucide-react';

function ProbabilityCalc() {
  const [favorable, setFavorable] = useState(3);
  const [total, setTotal] = useState(6);
  
  const probability = total > 0 ? favorable / total : 0;
  const percentage = (probability * 100).toFixed(2);
  
  return (
    <div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
      <div className="flex items-center gap-2 text-primary-fixed mb-6"><Calculator className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Probability Calculator</span></div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Favorable Outcomes</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={favorable} onChange={(e) => setFavorable(Number(e.target.value))} /></div>
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Total Outcomes</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={total} onChange={(e) => setTotal(Number(e.target.value))} /></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-surface-container-highest p-6 rounded-xl"><p className="text-neutral-500 text-xs">Probability</p><p className="text-3xl font-bold text-white mono">{probability.toFixed(4)}</p></div>
        <div className="bg-surface-container-highest p-6 rounded-xl"><p className="text-neutral-500 text-xs">Percentage</p><p className="text-3xl font-bold text-white mono">{percentage}%</p></div>
      </div>
    </div>
  );
}
export default ProbabilityCalc;