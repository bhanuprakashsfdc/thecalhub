import { useState } from 'react';
import { FlaskConical } from 'lucide-react';

function ScientificNotationCalc() {
  const [num, setNum] = useState(1234000);
  
  const toSci = () => {
    return num.toExponential(4);
  };
  
  return (
    <div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
      <div className="flex items-center gap-2 text-primary-fixed mb-6"><FlaskConical className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Scientific Notation</span></div>
      <div className="group mb-6"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Enter Number</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={num} onChange={(e) => setNum(Number(e.target.value))} /></div>
      <div className="bg-surface-container-highest p-6 rounded-xl"><p className="text-neutral-500 text-xs">Scientific Notation</p><p className="text-3xl font-bold text-white mono">{toSci()}</p></div>
    </div>
  );
}
export default ScientificNotationCalc;