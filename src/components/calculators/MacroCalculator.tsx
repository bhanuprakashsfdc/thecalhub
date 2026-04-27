import { useState, useMemo } from 'react';
import { PieChart } from 'lucide-react';

export function MacroCalculator() {
  const [calories, setCalories] = useState(2000);
  const [goal, setGoal] = useState('maintain');

  const macros = useMemo(() => {
    const p = goal === 'lose' ? 0.40 : goal === 'gain' ? 0.30 : 0.30;
    const c = goal === 'lose' ? 0.35 : goal === 'gain' ? 0.45 : 0.40;
    const f = goal === 'lose' ? 0.25 : goal === 'gain' ? 0.25 : 0.30;
    return { protein: (calories * p / 4).toFixed(0), carbs: (calories * c / 4).toFixed(0), fat: (calories * f / 9).toFixed(0) };
  }, [calories, goal]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5"><div className="bg-surface-container-low p-8 rounded-xl border border-white/5 space-y-6">
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Daily Calories</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={calories} onChange={(e) => setCalories(Number(e.target.value))} /></div>
        <div className="grid grid-cols-3 gap-2"><button onClick={() => setGoal('lose')} className={`py-2 rounded-lg ${goal === 'lose' ? 'bg-primary-fixed' : 'bg-surface-container-highest'}`}>Lose</button><button onClick={() => setGoal('maintain')} className={`py-2 rounded-lg ${goal === 'maintain' ? 'bg-primary-fixed' : 'bg-surface-container-highest'}`}>Maintain</button><button onClick={() => setGoal('gain')} className={`py-2 rounded-lg ${goal === 'gain' ? 'bg-primary-fixed' : 'bg-surface-container-highest'}`}>Gain</button></div>
      </div></div>
      <div className="lg:col-span-7"><div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
        <div className="flex items-center gap-2 text-primary-fixed mb-6"><PieChart className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Macro Split</span></div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-500/20 p-4 rounded-xl text-center"><p className="text-blue-400 text-xs">Protein</p><p className="text-2xl font-bold text-white mono">{macros.protein}g</p></div>
          <div className="bg-green-500/20 p-4 rounded-xl text-center"><p className="text-green-400 text-xs">Carbs</p><p className="text-2xl font-bold text-white mono">{macros.carbs}g</p></div>
          <div className="bg-yellow-500/20 p-4 rounded-xl text-center"><p className="text-yellow-400 text-xs">Fat</p><p className="text-2xl font-bold text-white mono">{macros.fat}g</p></div>
        </div>
      </div></div>
    </div>
  );
}
export default MacroCalculator;