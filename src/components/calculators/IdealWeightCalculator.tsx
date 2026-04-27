import { useState } from 'react';
import { Scale } from 'lucide-react';

export function IdealWeightCalculator() {
  const [height, setHeight] = useState(70);
  const [gender, setGender] = useState('male');

  const baseWeight = gender === 'male' ? 50 : 45.5;
  const ideal = baseWeight + 2.3 * ((height - 60) * 12 / 2.54 * 0.393701);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5"><div className="bg-surface-container-low p-8 rounded-xl border border-white/5 space-y-6">
        <div className="grid grid-cols-2 gap-2"><button onClick={() => setGender('male')} className={`py-3 rounded-lg font-medium ${gender === 'male' ? 'bg-primary-fixed' : 'bg-surface-container-highest'}`}>Male</button><button onClick={() => setGender('female')} className={`py-3 rounded-lg font-medium ${gender === 'female' ? 'bg-primary-fixed' : 'bg-surface-container-highest'}`}>Female</button></div>
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Height (inches)</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} /></div>
      </div></div>
      <div className="lg:col-span-7"><div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
        <div className="flex items-center gap-2 text-primary-fixed mb-6"><Scale className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Ideal Weight</span></div>
        <div className="bg-surface-container-highest p-8 rounded-xl"><p className="text-4xl font-bold text-white mono">{ideal.toFixed(1)} lbs</p></div>
      </div></div>
    </div>
  );
}
export default IdealWeightCalculator;