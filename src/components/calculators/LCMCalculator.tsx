import { useState } from 'react';
import { Calculator } from 'lucide-react';

function LCMCalculator() {
  const [nums, setNums] = useState('12, 15, 20');
  
  const calculateLCM = () => {
    const arr = nums.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n) && n > 0);
    if (arr.length === 0) return 0;
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const lcm = (a: number, b: number) => (a * b) / gcd(a, b);
    return arr.reduce(lcm);
  };
  
  const result = calculateLCM();
  
  return (
    <div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
      <div className="flex items-center gap-2 text-primary-fixed mb-6"><Calculator className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Least Common Multiple</span></div>
      <div className="group mb-6"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Numbers (comma separated)</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="text" value={nums} onChange={(e) => setNums(e.target.value)} placeholder="12, 15, 20" /></div>
      <div className="bg-surface-container-highest p-6 rounded-xl"><p className="text-neutral-500 text-xs">LCM</p><p className="text-3xl font-bold text-white mono">{result}</p></div>
    </div>
  );
}
export default LCMCalculator;