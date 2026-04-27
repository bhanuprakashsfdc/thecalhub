import { useState } from 'react';
import { Calculator } from 'lucide-react';

function PermutationCalc() {
  const [n, setN] = useState(5);
  const [r, setR] = useState(3);
  
  const factorial = (x: number): number => x <= 1 ? 1 : x * factorial(x - 1);
  const permutation = n >= r && r >= 0 ? factorial(n) / factorial(n - r) : 0;
  
  return (
    <div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
      <div className="flex items-center gap-2 text-primary-fixed mb-6"><Calculator className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Permutation: P(n,r) = n!/(n-r)!</span></div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">n (total items)</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={n} onChange={(e) => setN(Number(e.target.value))} /></div>
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">r (chosen items)</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={r} onChange={(e) => setR(Number(e.target.value))} /></div>
      </div>
      <div className="bg-surface-container-highest p-6 rounded-xl"><p className="text-neutral-500 text-xs">Permutations</p><p className="text-3xl font-bold text-white mono">{permutation.toFixed(0)}</p></div>
    </div>
  );
}
export default PermutationCalc;