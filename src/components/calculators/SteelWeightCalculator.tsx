import { useState } from 'react';
import { Hammer } from 'lucide-react';

function SteelWeightCalc() {
  const [length, setLength] = useState(1000);
  const [dia, setDia] = useState(12);
  
  const weight = (dia * dia * length) / 162;
  
  return (
    <div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
      <div className="flex items-center gap-2 text-primary-fixed mb-6"><Hammer className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Steel Weight (kg)</span></div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Length (mm)</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={length} onChange={(e) => setLength(Number(e.target.value))} /></div>
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Diameter (mm)</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={dia} onChange={(e) => setDia(Number(e.target.value))} /></div>
      </div>
      <div className="bg-surface-container-highest p-6 rounded-xl"><p className="text-neutral-500 text-xs">Weight</p><p className="text-3xl font-bold text-white mono">{weight.toFixed(2)} kg</p></div>
    </div>
  );
}
export default SteelWeightCalc;