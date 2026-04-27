import { useState } from 'react';
import { Calculator } from 'lucide-react';

function QuadraticCalc() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(-3);
  const [c, setC] = useState(2);
  
  const discriminant = b * b - 4 * a * c;
  const root1 = discriminant >= 0 ? (-b + Math.sqrt(discriminant)) / (2 * a) : null;
  const root2 = discriminant >= 0 ? (-b - Math.sqrt(discriminant)) / (2 * a) : null;
  
  return (
    <div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
      <div className="flex items-center gap-2 text-primary-fixed mb-6"><Calculator className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Quadratic Equation: ax² + bx + c = 0</span></div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">a (coefficient)</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={a} onChange={(e) => setA(Number(e.target.value))} /></div>
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">b (coefficient)</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={b} onChange={(e) => setB(Number(e.target.value))} /></div>
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">c (constant)</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={c} onChange={(e) => setC(Number(e.target.value))} /></div>
      </div>
      <div className="p-4 bg-surface-container-highest rounded-xl"><p className="text-neutral-500 text-xs mb-2">Discriminant (b² - 4ac)</p><p className="text-2xl font-bold text-white mono">{discriminant}</p></div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-surface-container-highest p-4 rounded-xl"><p className="text-neutral-500 text-xs">Root 1</p><p className="text-2xl font-bold text-white mono">{root1 !== null ? root1.toFixed(4) : 'Complex'}</p></div>
        <div className="bg-surface-container-highest p-4 rounded-xl"><p className="text-neutral-500 text-xs">Root 2</p><p className="text-2xl font-bold text-white mono">{root2 !== null ? root2.toFixed(4) : 'Complex'}</p></div>
      </div>
    </div>
  );
}
export default QuadraticCalc;