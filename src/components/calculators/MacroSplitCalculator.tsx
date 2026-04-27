import { useState } from 'react';
import { Activity } from 'lucide-react';

function MacroSplitCalc() {
  const [calories, setCalories] = useState(2000);
  const [ratio, setRatio] = useState('40-30-30');
  
  const getMacros = () => {
    const [p, c, f] = ratio.split('-').map(Number);
    return {
      protein: Math.round(calories * p / 100 / 4),
      carbs: Math.round(calories * c / 100 / 4),
      fat: Math.round(calories * f / 100 / 9),
    };
  };
  
  const macros = getMacros();
  
  return (
    <div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
      <div className="flex items-center gap-2 text-primary-fixed mb-6"><Activity className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Macro Split Calculator</span></div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Daily Calories</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={calories} onChange={(e) => setCalories(Number(e.target.value))} /></div>
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Ratio (P-C-F)</label><select className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white" value={ratio} onChange={(e) => setRatio(e.target.value)}><option value="40-30-30">40-30-30</option><option value="30-40-30">30-40-30</option><option value="50-20-30">50-20-30</option><option value="30-30-40">30-30-40</option></select></div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-surface-container-highest p-4 rounded-xl"><p className="text-neutral-500 text-xs">Protein (g)</p><p className="text-2xl font-bold text-white mono">{macros.protein}</p></div>
        <div className="bg-surface-container-highest p-4 rounded-xl"><p className="text-neutral-500 text-xs">Carbs (g)</p><p className="text-2xl font-bold text-white mono">{macros.carbs}</p></div>
        <div className="bg-surface-container-highest p-4 rounded-xl"><p className="text-neutral-500 text-xs">Fat (g)</p><p className="text-2xl font-bold text-white mono">{macros.fat}</p></div>
      </div>
    </div>
  );
}
export default MacroSplitCalc;