import { useState } from 'react';
import { Calculator } from 'lucide-react';

function LeanMassCalc() {
  const [weight, setWeight] = useState(80);
  const [bodyFat, setBodyFat] = useState(20);
  
  const leanMass = weight * (1 - bodyFat / 100);
  const fatMass = weight * (bodyFat / 100);
  
  return (
    <div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
      <div className="flex items-center gap-2 text-primary-fixed mb-6"><Calculator className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Lean Body Mass</span></div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Weight (kg)</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} /></div>
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Body Fat (%)</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={bodyFat} onChange={(e) => setBodyFat(Number(e.target.value))} /></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-surface-container-highest p-6 rounded-xl"><p className="text-neutral-500 text-xs">Lean Mass</p><p className="text-3xl font-bold text-white mono">{leanMass.toFixed(2)} kg</p></div>
        <div className="bg-surface-container-highest p-6 rounded-xl"><p className="text-neutral-500 text-xs">Fat Mass</p><p className="text-3xl font-bold text-white mono">{fatMass.toFixed(2)} kg</p></div>
      </div>
    </div>
  );
}
export default LeanMassCalc;