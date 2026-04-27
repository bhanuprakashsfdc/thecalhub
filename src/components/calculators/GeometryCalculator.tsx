import { useState } from 'react';
import { Calculator } from 'lucide-react';

function GeometryCalc() {
  const [shape, setShape] = useState('circle');
  const [radius, setRadius] = useState(5);
  const [base, setBase] = useState(10);
  const [height, setHeight] = useState(8);
  const [side, setSide] = useState(6);
  
  const getArea = () => {
    switch (shape) {
      case 'circle': return Math.PI * radius * radius;
      case 'triangle': return 0.5 * base * height;
      case 'rectangle': return base * height;
      case 'square': return side * side;
      case 'trapezoid': return 0.5 * (base + height) * side;
      default: return 0;
    }
  };
  
  const getPerimeter = () => {
    switch (shape) {
      case 'circle': return 2 * Math.PI * radius;
      case 'triangle': return base + 2 * side;
      case 'rectangle': return 2 * (base + height);
      case 'square': return 4 * side;
      case 'trapezoid': return base + height + 2 * side;
      default: return 0;
    }
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5"><div className="bg-surface-container-low p-8 rounded-xl border border-white/5 space-y-6">
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Shape</label>
          <select className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white" value={shape} onChange={(e) => setShape(e.target.value)}>
            <option value="circle">Circle</option>
            <option value="triangle">Triangle</option>
            <option value="rectangle">Rectangle</option>
            <option value="square">Square</option>
            <option value="trapezoid">Trapezoid</option>
          </select>
        </div>
        {shape === 'circle' && <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Radius</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={radius} onChange={(e) => setRadius(Number(e.target.value))} /></div>}
        {(shape === 'triangle' || shape === 'rectangle') && <><div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Base</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={base} onChange={(e) => setBase(Number(e.target.value))} /></div><div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Height</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} /></div></>}
        {shape === 'square' && <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Side</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={side} onChange={(e) => setSide(Number(e.target.value))} /></div>}
        {shape === 'trapezoid' && <><div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Base 1</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={base} onChange={(e) => setBase(Number(e.target.value))} /></div><div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Base 2</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} /></div><div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Height (legs)</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={side} onChange={(e) => setSide(Number(e.target.value))} /></div></>}
      </div></div>
      <div className="lg:col-span-7"><div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
        <div className="flex items-center gap-2 text-primary-fixed mb-6"><Calculator className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Results</span></div>
        <div className="bg-surface-container-highest p-6 rounded-xl mb-4"><p className="text-neutral-500 text-xs">Area</p><p className="text-3xl font-bold text-white mono">{getArea().toFixed(4)}</p></div>
        <div className="bg-surface-container-highest p-6 rounded-xl"><p className="text-neutral-500 text-xs">Perimeter / Circumference</p><p className="text-3xl font-bold text-white mono">{getPerimeter().toFixed(4)}</p></div>
      </div></div>
    </div>
  );
}
export default GeometryCalc;