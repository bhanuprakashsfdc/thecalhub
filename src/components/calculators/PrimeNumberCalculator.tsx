import { useState } from 'react';
import { Calculator } from 'lucide-react';

function PrimeCalc() {
  const [num, setNum] = useState(17);
  
  const isPrime = (n: number): boolean => {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  };
  
  const prime = isPrime(num);
  
  return (
    <div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
      <div className="flex items-center gap-2 text-primary-fixed mb-6"><Calculator className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Prime Number Checker</span></div>
      <div className="group mb-6"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Enter Number</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={num} onChange={(e) => setNum(Number(e.target.value))} /></div>
      <div className="bg-surface-container-highest p-6 rounded-xl"><p className="text-neutral-500 text-xs">Result</p><p className={`text-3xl font-bold ${prime ? 'text-green-400' : 'text-red-400'}`}>{prime ? 'Prime Number' : 'Not Prime'}</p></div>
    </div>
  );
}
export default PrimeCalc;