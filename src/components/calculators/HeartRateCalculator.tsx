import { useState } from 'react';
import { Heart } from 'lucide-react';

export function HeartRateCalculator() {
  const [age, setAge] = useState(30);
  const maxHR = 220 - age;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5"><div className="bg-surface-container-low p-8 rounded-xl border border-white/5 space-y-6"><div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Age</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} /></div></div></div>
      <div className="lg:col-span-7"><div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
        <div className="flex items-center gap-2 text-primary-fixed mb-6"><Heart className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Target Heart Rate Zones</span></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface-container-highest p-4 rounded-xl"><p className="text-neutral-500 text-xs">Maximum</p><p className="text-2xl font-bold text-white mono">{maxHR} bpm</p></div>
          <div className="bg-surface-container-highest p-4 rounded-xl"><p className="text-neutral-500 text-xs">Moderate (50-70%)</p><p className="text-2xl font-bold text-white mono">{Math.round(maxHR*0.5)}-{Math.round(maxHR*0.7)}</p></div>
          <div className="bg-surface-container-highest p-4 rounded-xl"><p className="text-neutral-500 text-xs">Vigorous (70-85%)</p><p className="text-2xl font-bold text-white mono">{Math.round(maxHR*0.7)}-{Math.round(maxHR*0.85)}</p></div>
          <div className="bg-surface-container-highest p-4 rounded-xl"><p className="text-neutral-500 text-xs">Maximum (85-100%)</p><p className="text-2xl font-bold text-white mono">{Math.round(maxHR*0.85)}-{maxHR}</p></div>
        </div>
      </div></div>
    </div>
  );
}
export default HeartRateCalculator;