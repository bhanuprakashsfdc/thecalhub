import { useState } from 'react';
import { Calculator } from 'lucide-react';

function FactorialCalc() {
  const [num, setNum] = useState(5);
  
  const factorial = (n: number): number => n <= 1 ? 1 : n * factorial(n - 1);
  const result = num >= 0 && num <= 170 ? factorial(num) : 'Overflow';
  
  return (
    <div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
      <div className="flex items-center gap-2 text-primary-fixed mb-6"><Calculator className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Factorial: n!</span></div>
      <div className="group mb-6"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Enter Number (0-170)</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={num} onChange={(e) => setNum(Number(e.target.value))} /></div>
      <div className="bg-surface-container-highest p-6 rounded-xl"><p className="text-neutral-500 text-xs">Factorial</p><p className="text-2xl font-bold text-white mono break-all">{typeof result === 'number' ? result.toLocaleString() : result}</p></div>
    </div>
  );
}
export default FactorialCalc;