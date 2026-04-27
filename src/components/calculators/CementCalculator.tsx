import { useState } from 'react';
import { Hammer } from 'lucide-react';

function CementCalc() {
  const [area, setArea] = useState(100);
  const [thickness, setThickness] = useState(0.15);
  
  const cementBags = (area * thickness * 7) / 0.035;
  const sand = area * thickness * 0.33;
  const aggregate = area * thickness * 0.55;
  
  return (
    <div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
      <div className="flex items-center gap-2 text-primary-fixed mb-6"><Hammer className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Concrete Materials</span></div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Area (sq m)</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={area} onChange={(e) => setArea(Number(e.target.value))} /></div>
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Thickness (m)</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={thickness} onChange={(e) => setThickness(Number(e.target.value))} step="0.01" /></div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-surface-container-highest p-4 rounded-xl"><p className="text-neutral-500 text-xs">Cement (bags)</p><p className="text-2xl font-bold text-white mono">{cementBags.toFixed(1)}</p></div>
        <div className="bg-surface-container-highest p-4 rounded-xl"><p className="text-neutral-500 text-xs">Sand (cu m)</p><p className="text-2xl font-bold text-white mono">{sand.toFixed(2)}</p></div>
        <div className="bg-surface-container-highest p-4 rounded-xl"><p className="text-neutral-500 text-xs">Aggregate (cu m)</p><p className="text-2xl font-bold text-white mono">{aggregate.toFixed(2)}</p></div>
      </div>
    </div>
  );
}
export default CementCalc;