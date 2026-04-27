import { useState } from 'react';
import { FlaskConical } from 'lucide-react';

function LogarithmCalc() {
  const [num, setNum] = useState(100);
  const [base, setBase] = useState(10);
  
  const result = Math.log(num) / Math.log(base);
  
  return (
    <div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
      <div className="flex items-center gap-2 text-primary-fixed mb-6"><FlaskConical className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Logarithm Calculator</span></div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Number</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={num} onChange={(e) => setNum(Number(e.target.value))} /></div>
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Base</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={base} onChange={(e) => setBase(Number(e.target.value))} /></div>
      </div>
      <div className="bg-surface-container-highest p-6 rounded-xl"><p className="text-neutral-500 text-xs">log<sub>{base}</sub>({num})</p><p className="text-3xl font-bold text-white mono">{result.toFixed(4)}</p></div>
    </div>
  );
}
export default LogarithmCalc;