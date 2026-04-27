import { useState } from 'react';
import { TrendingUp } from 'lucide-react';

function DrawdownCalc() {
  const [peak, setPeak] = useState(10000);
  const [trough, setTrough] = useState(7000);
  
  const drawdown = ((peak - trough) / peak) * 100;
  
  return (
    <div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
      <div className="flex items-center gap-2 text-primary-fixed mb-6"><TrendingUp className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Drawdown Calculator</span></div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Peak Value ($)</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={peak} onChange={(e) => setPeak(Number(e.target.value))} /></div>
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Trough Value ($)</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={trough} onChange={(e) => setTrough(Number(e.target.value))} /></div>
      </div>
      <div className="bg-surface-container-highest p-6 rounded-xl"><p className="text-neutral-500 text-xs">Drawdown</p><p className="text-3xl font-bold text-red-400 mono">{drawdown.toFixed(2)}%</p></div>
    </div>
  );
}
export default DrawdownCalc;