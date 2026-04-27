import { useState } from 'react';
import { Hammer } from 'lucide-react';

function AreaCalc() {
  const [shape, setShape] = useState('rectangle');
  const [a, setA] = useState(10);
  const [b, setB] = useState(5);
  
  const calcArea = () => {
    switch (shape) {
      case 'rectangle': return a * b;
      case 'circle': return Math.PI * a * a;
      case 'triangle': return 0.5 * a * b;
      default: return a * b;
    }
  };
  
  return (
    <div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
      <div className="flex items-center gap-2 text-primary-fixed mb-6"><Hammer className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Area Calculator</span></div>
      <div className="group mb-4"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Shape</label><select className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white" value={shape} onChange={(e) => setShape(e.target.value)}><option value="rectangle">Rectangle</option><option value="circle">Circle</option><option value="triangle">Triangle</option></select></div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Dimension A</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={a} onChange={(e) => setA(Number(e.target.value))} /></div>
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Dimension B</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={b} onChange={(e) => setB(Number(e.target.value))} /></div>
      </div>
      <div className="bg-surface-container-highest p-6 rounded-xl"><p className="text-neutral-500 text-xs">Area</p><p className="text-3xl font-bold text-white mono">{calcArea().toFixed(2)} sq units</p></div>
    </div>
  );
}
export default AreaCalc;