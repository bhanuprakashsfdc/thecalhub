import { useState } from 'react';
import { FlaskConical } from 'lucide-react';

function VectorCalc() {
  const [x1, setX1] = useState(3);
  const [y1, setY1] = useState(4);
  const [x2, setX2] = useState(6);
  const [y2, setY2] = useState(8);
  
  const magnitude = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
  
  return (
    <div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
      <div className="flex items-center gap-2 text-primary-fixed mb-6"><FlaskConical className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Vector Calculator (2D)</span></div>
      <div className="grid grid-cols-2 gap-8 mb-6">
        <div><p className="text-neutral-500 text-xs mb-3">Point A (x, y)</p><div className="grid grid-cols-2 gap-2"><input className="bg-surface-container-highest border-none rounded-lg py-3 px-3 text-white mono" type="number" value={x1} onChange={(e) => setX1(Number(e.target.value))} /><input className="bg-surface-container-highest border-none rounded-lg py-3 px-3 text-white mono" type="number" value={y1} onChange={(e) => setY1(Number(e.target.value))} /></div></div>
        <div><p className="text-neutral-500 text-xs mb-3">Point B (x, y)</p><div className="grid grid-cols-2 gap-2"><input className="bg-surface-container-highest border-none rounded-lg py-3 px-3 text-white mono" type="number" value={x2} onChange={(e) => setX2(Number(e.target.value))} /><input className="bg-surface-container-highest border-none rounded-lg py-3 px-3 text-white mono" type="number" value={y2} onChange={(e) => setY2(Number(e.target.value))} /></div></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-surface-container-highest p-4 rounded-xl"><p className="text-neutral-500 text-xs">Magnitude</p><p className="text-2xl font-bold text-white mono">{magnitude.toFixed(4)}</p></div>
        <div className="bg-surface-container-highest p-4 rounded-xl"><p className="text-neutral-500 text-xs">Angle (°)</p><p className="text-2xl font-bold text-white mono">{angle.toFixed(2)}°</p></div>
      </div>
    </div>
  );
}
export default VectorCalc;