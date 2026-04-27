import { useState } from 'react';
import { FlaskConical } from 'lucide-react';

function ExponentialCalc() {
  const [base, setBase] = useState(2);
  const [exponent, setExponent] = useState(8);
  
  const result = Math.pow(base, exponent);
  
  return (
    <div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
      <div className="flex items-center gap-2 text-primary-fixed mb-6"><FlaskConical className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Exponential Calculator</span></div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Base</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={base} onChange={(e) => setBase(Number(e.target.value))} /></div>
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Exponent</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={exponent} onChange={(e) => setExponent(Number(e.target.value))} /></div>
      </div>
      <div className="bg-surface-container-highest p-6 rounded-xl"><p className="text-neutral-500 text-xs">{base}^{exponent}</p><p className="text-3xl font-bold text-white mono">{result.toLocaleString()}</p></div>
    </div>
  );
}
export default ExponentialCalc;