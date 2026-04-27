import { useState } from 'react';
import { Calculator } from 'lucide-react';

export function TrigonometryCalculator() {
  const [angle, setAngle] = useState(45);
  const [unit, setUnit] = useState('degrees');
  const rad = unit === 'degrees' ? angle * Math.PI / 180 : angle;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5"><div className="bg-surface-container-low p-8 rounded-xl border border-white/5 space-y-6">
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Angle</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={angle} onChange={(e) => setAngle(Number(e.target.value))} /></div>
        <div className="grid grid-cols-2 gap-2"><button onClick={() => setUnit('degrees')} className={`py-3 rounded-lg ${unit === 'degrees' ? 'bg-primary-fixed' : 'bg-surface-container-highest'}`}>Degrees</button><button onClick={() => setUnit('radians')} className={`py-3 rounded-lg ${unit === 'radians' ? 'bg-primary-fixed' : 'bg-surface-container-highest'}`}>Radians</button></div>
      </div></div>
      <div className="lg:col-span-7"><div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
        <div className="flex items-center gap-2 text-primary-fixed mb-6"><Calculator className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Results</span></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface-container-highest p-4 rounded-xl"><p className="text-neutral-500 text-xs">sin</p><p className="text-2xl font-bold text-white mono">{Math.sin(rad).toFixed(4)}</p></div>
          <div className="bg-surface-container-highest p-4 rounded-xl"><p className="text-neutral-500 text-xs">cos</p><p className="text-2xl font-bold text-white mono">{Math.cos(rad).toFixed(4)}</p></div>
          <div className="bg-surface-container-highest p-4 rounded-xl"><p className="text-neutral-500 text-xs">tan</p><p className="text-2xl font-bold text-white mono">{Math.tan(rad).toFixed(4)}</p></div>
          <div className="bg-surface-container-highest p-4 rounded-xl"><p className="text-neutral-500 text-xs">cot</p><p className="text-2xl font-bold text-white mono">{Math.tan(rad) !== 0 ? (1/Math.tan(rad)).toFixed(4) : '∞'}</p></div>
        </div>
      </div></div>
    </div>
  );
}
export default TrigonometryCalculator;