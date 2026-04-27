import { useState } from 'react';
import { Calendar } from 'lucide-react';

export function OvulationCalculator() {
  const [cycleLength, setCycleLength] = useState(28);
  const [lmp, setLmp] = useState('2025-01-01');
  const ovulationDate = new Date(lmp);
  ovulationDate.setDate(ovulationDate.getDate() + cycleLength - 14);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5"><div className="bg-surface-container-low p-8 rounded-xl border border-white/5 space-y-6">
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Cycle Length (days)</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={cycleLength} onChange={(e) => setCycleLength(Number(e.target.value))} /></div>
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Last Period</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="date" value={lmp} onChange={(e) => setLmp(e.target.value)} /></div>
      </div></div>
      <div className="lg:col-span-7"><div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
        <div className="flex items-center gap-2 text-primary-fixed mb-6"><Calendar className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Ovulation Date</span></div>
        <div className="bg-surface-container-highest p-8 rounded-xl"><p className="text-4xl font-bold text-white mono">{ovulationDate.toLocaleDateString()}</p></div>
        <div className="mt-6 bg-surface-container-highest p-6 rounded-xl"><p className="text-neutral-500 text-xs">Fertile window: {ovulationDate.toLocaleDateString()} - {new Date(ovulationDate.getTime() + 5*86400000).toLocaleDateString()}</p></div>
      </div></div>
    </div>
  );
}
export default OvulationCalculator;