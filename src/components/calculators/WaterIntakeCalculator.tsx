import { useState } from 'react';
import { Droplets } from 'lucide-react';

export function WaterIntakeCalculator() {
  const [weight, setWeight] = useState(150);
  const [activity, setActivity] = useState(30);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5"><div className="bg-surface-container-low p-8 rounded-xl border border-white/5 space-y-6">
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Body Weight (lbs)</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} /></div>
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Daily Activity (minutes)</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={activity} onChange={(e) => setActivity(Number(e.target.value))} /></div>
      </div></div>
      <div className="lg:col-span-7"><div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
        <div className="flex items-center gap-2 text-primary-fixed mb-6"><Droplets className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Daily Water Intake</span></div>
        <div className="bg-surface-container-highest p-8 rounded-xl"><p className="text-4xl font-bold text-white mono">{((weight / 2.2) * 35 + activity * 0.5) / 1000} L</p></div>
      </div></div>
    </div>
  );
}
export default WaterIntakeCalculator;