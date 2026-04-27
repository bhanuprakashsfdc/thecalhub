import { useState } from 'react';
import { Calculator } from 'lucide-react';

function SequenceCalc() {
  const [first, setFirst] = useState(2);
  const [diff, setDiff] = useState(3);
  const [terms, setTerms] = useState(10);
  
  const generateAP = () => {
    const arr: number[] = [];
    for (let i = 0; i < terms; i++) {
      arr.push(first + i * diff);
    }
    return arr;
  };
  
  const ap = generateAP();
  const sum = (terms / 2) * (2 * first + (terms - 1) * diff);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5"><div className="bg-surface-container-low p-8 rounded-xl border border-white/5 space-y-6">
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">First Term (a₁)</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={first} onChange={(e) => setFirst(Number(e.target.value))} /></div>
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Common Difference (d)</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={diff} onChange={(e) => setDiff(Number(e.target.value))} /></div>
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Number of Terms</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={terms} onChange={(e) => setTerms(Number(e.target.value))} /></div>
      </div></div>
      <div className="lg:col-span-7"><div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
        <div className="flex items-center gap-2 text-primary-fixed mb-6"><Calculator className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Arithmetic Sequence</span></div>
        <div className="bg-surface-container-highest p-4 rounded-xl mb-4"><p className="text-neutral-500 text-xs">Sum (Sₙ)</p><p className="text-2xl font-bold text-white mono">{sum.toLocaleString()}</p></div>
        <div className="bg-surface-container-highest p-4 rounded-xl"><p className="text-neutral-500 text-xs mb-2">Terms</p><p className="text-lg font-bold text-white mono break-all">{ap.join(', ')}</p></div>
      </div></div>
    </div>
  );
}
export default SequenceCalc;