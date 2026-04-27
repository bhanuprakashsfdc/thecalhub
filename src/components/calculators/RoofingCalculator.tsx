import { useState } from 'react';
import { Hammer } from 'lucide-react';

function RoofingCalc() {
  const [length, setLength] = useState(10);
  const [width, setWidth] = useState(8);
  
  const area = length * width * 1.1;
  const sheets = Math.ceil(area / 4);
  
  return (
    <div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
      <div className="flex items-center gap-2 text-primary-fixed mb-6"><Hammer className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Roofing Calculator</span></div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Length (m)</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={length} onChange={(e) => setLength(Number(e.target.value))} /></div>
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Width (m)</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} /></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-surface-container-highest p-4 rounded-xl"><p className="text-neutral-500 text-xs">Total Area</p><p className="text-2xl font-bold text-white mono">{area.toFixed(2)} sq m</p></div>
        <div className="bg-surface-container-highest p-4 rounded-xl"><p className="text-neutral-500 text-xs">Sheets (4 sq m)</p><p className="text-2xl font-bold text-white mono">{sheets}</p></div>
      </div>
    </div>
  );
}
export default RoofingCalc;