import { useState } from 'react';
import { Hammer } from 'lucide-react';

function VolumeCalc() {
  const [l, setL] = useState(10);
  const [w, setW] = useState(5);
  const [h, setH] = useState(3);
  
  const volume = l * w * h;
  
  return (
    <div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
      <div className="flex items-center gap-2 text-primary-fixed mb-6"><Hammer className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Volume Calculator</span></div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Length</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={l} onChange={(e) => setL(Number(e.target.value))} /></div>
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Width</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={w} onChange={(e) => setW(Number(e.target.value))} /></div>
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Height</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={h} onChange={(e) => setH(Number(e.target.value))} /></div>
      </div>
      <div className="bg-surface-container-highest p-6 rounded-xl"><p className="text-neutral-500 text-xs">Volume</p><p className="text-3xl font-bold text-white mono">{volume.toFixed(2)} cu units</p></div>
    </div>
  );
}
export default VolumeCalc;