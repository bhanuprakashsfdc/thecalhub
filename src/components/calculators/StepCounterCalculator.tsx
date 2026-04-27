import { useState } from 'react';
import { Calculator } from 'lucide-react';

function StepCounterCalc() {
  const [steps, setSteps] = useState(10000);
  const [weight, setWeight] = useState(70);
  
  const caloriesPerStep = weight * 0.04 / 1000;
  const caloriesBurned = steps * caloriesPerStep;
  
  return (
    <div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
      <div className="flex items-center gap-2 text-primary-fixed mb-6"><Calculator className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Steps to Calories</span></div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Steps</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={steps} onChange={(e) => setSteps(Number(e.target.value))} /></div>
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Weight (kg)</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} /></div>
      </div>
      <div className="bg-surface-container-highest p-6 rounded-xl"><p className="text-neutral-500 text-xs">Calories Burned</p><p className="text-3xl font-bold text-white mono">{caloriesBurned.toFixed(2)} kcal</p></div>
    </div>
  );
}
export default StepCounterCalc;