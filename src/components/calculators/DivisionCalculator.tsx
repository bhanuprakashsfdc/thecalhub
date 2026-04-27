import { useState } from 'react';
import { Divide } from 'lucide-react';

export function DivisionCalculator() {
  const [num1, setNum1] = useState(100);
  const [num2, setNum2] = useState(4);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl space-y-8">
          <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Dividend</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl outline-none" type="number" value={num1} onChange={(e) => setNum1(Number(e.target.value))} /></div>
          <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Divisor</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl outline-none" type="number" value={num2} onChange={(e) => setNum2(Number(e.target.value))} /></div>
        </div>
      </div>
      <div className="lg:col-span-7">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="flex items-center gap-2 text-primary-fixed mb-6"><Divide className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Result</span></div>
          <div className="bg-surface-container-highest p-8 rounded-xl"><p className="text-4xl font-bold text-white mono">{num2 !== 0 ? (num1 / num2).toFixed(2) : '∞'}</p></div>
          <div className="mt-6 bg-surface-container-highest p-6 rounded-xl"><p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Expression</p><p className="text-xl text-white mono">{num1} ÷ {num2} = {num2 !== 0 ? (num1 / num2).toFixed(2) : '∞'}</p></div>
        </div>
      </div>
    </div>
  );
}
export default DivisionCalculator;