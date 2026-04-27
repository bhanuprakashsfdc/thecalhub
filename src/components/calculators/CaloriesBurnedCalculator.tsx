import { useState } from 'react';
import { Flame } from 'lucide-react';

export function CaloriesBurnedCalculator() {
  const [activity, setActivity] = useState('running');
  const [weight, setWeight] = useState(150);
  const [duration, setDuration] = useState(30);
  
  const rates: Record<string, number> = { running: 11.4, cycling: 7.5, swimming: 9.0, walking: 3.8, weights: 5.0 };
  const burned = (rates[activity] * weight * duration / 200);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5"><div className="bg-surface-container-low p-8 rounded-xl border border-white/5 space-y-6">
        <div className="grid grid-cols-2 gap-2">{Object.keys(rates).map(a => <button key={a} onClick={() => setActivity(a)} className={`py-3 rounded-lg capitalize ${activity === a ? 'bg-primary-fixed' : 'bg-surface-container-highest'}`}>{a}</button>)}</div>
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Weight (lbs)</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} /></div>
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Duration (min)</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} /></div>
      </div></div>
      <div className="lg:col-span-7"><div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
        <div className="flex items-center gap-2 text-primary-fixed mb-6"><Flame className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Calories Burned</span></div>
        <div className="bg-surface-container-highest p-8 rounded-xl"><p className="text-4xl font-bold text-white mono">{burned.toFixed(0)} cal</p></div>
      </div></div>
    </div>
  );
}
export default CaloriesBurnedCalculator;