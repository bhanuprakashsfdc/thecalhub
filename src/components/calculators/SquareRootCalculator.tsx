import { useState } from 'react';
import { Percent } from 'lucide-react';

export function SquareRootCalculator() {
  const [num, setNum] = useState(144);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5"><div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl space-y-8"><div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Number</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl outline-none" type="number" value={num} onChange={(e) => setNum(Number(e.target.value))} /></div></div></div>
      <div className="lg:col-span-7"><div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl"><div className="flex items-center gap-2 text-primary-fixed mb-6"><Percent className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Result</span></div><div className="bg-surface-container-highest p-8 rounded-xl"><p className="text-4xl font-bold text-white mono">√{num} = {Math.sqrt(num).toFixed(4)}</p></div></div></div>
    </div>
  );
}
export default SquareRootCalculator;