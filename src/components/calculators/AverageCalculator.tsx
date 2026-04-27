import { useState } from 'react';
import { BarChart3 } from 'lucide-react';

export function AverageCalculator() {
  const [numbers, setNumbers] = useState("10, 20, 30, 40, 50");
  const nums = numbers.split(/[,,\s]+/).filter(n => n.trim()).map(Number).filter(n => !isNaN(n));
  const avg = nums.length > 0 ? nums.reduce((a, b) => a + b, 0) / nums.length : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5"><div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl space-y-8"><div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Numbers (comma or space separated)</label><textarea className="w-full h-32 bg-surface-container-highest border-none rounded-lg p-4 text-white mono text-lg outline-none resize-none" value={numbers} onChange={(e) => setNumbers(e.target.value)} /></div></div></div>
      <div className="lg:col-span-7"><div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl"><div className="flex items-center gap-2 text-primary-fixed mb-6"><BarChart3 className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Result</span></div><div className="bg-surface-container-highest p-8 rounded-xl"><p className="text-4xl font-bold text-white mono">{avg.toFixed(4)}</p></div><div className="mt-6 bg-surface-container-highest p-6 rounded-xl"><p className="text-neutral-500 text-xs">Count: {nums.length} | Sum: {nums.reduce((a,b)=>a+b,0)}</p></div></div></div>
    </div>
  );
}
export default AverageCalculator;