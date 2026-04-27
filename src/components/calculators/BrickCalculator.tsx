import { useState } from 'react';
import { Hammer } from 'lucide-react';

function BrickCalc() {
  const [length, setLength] = useState(10);
  const [height, setHeight] = useState(8);
  const brickSize = 0.23 * 0.115;
  const mortar = 0.015;
  
  const area = length * height;
  const bricks = area / (brickSize + mortar);
  const cement = bricks * 0.05 / 50;
  const sand = bricks * 0.3 / 100;
  
  return (
    <div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
      <div className="flex items-center gap-2 text-primary-fixed mb-6"><Hammer className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Brick Wall Materials</span></div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Wall Length (m)</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={length} onChange={(e) => setLength(Number(e.target.value))} /></div>
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Wall Height (m)</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} /></div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-surface-container-highest p-4 rounded-xl"><p className="text-neutral-500 text-xs">Bricks</p><p className="text-2xl font-bold text-white mono">{bricks.toFixed(0)}</p></div>
        <div className="bg-surface-container-highest p-4 rounded-xl"><p className="text-neutral-500 text-xs">Cement (bags)</p><p className="text-2xl font-bold text-white mono">{cement.toFixed(1)}</p></div>
        <div className="bg-surface-container-highest p-4 rounded-xl"><p className="text-neutral-500 text-xs">Sand (cu m)</p><p className="text-2xl font-bold text-white mono">{sand.toFixed(2)}</p></div>
      </div>
    </div>
  );
}
export default BrickCalc;