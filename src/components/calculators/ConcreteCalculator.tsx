import { useState, useMemo } from 'react';
import { Layers } from 'lucide-react';

export default function ConcreteCalculator() {
  const [length, setLength] = useState(10);
  const [width, setWidth] = useState(10);
  const [depth, setDepth] = useState(4);
  const [price, setPrice] = useState(150);

  const result = useMemo(() => {
    const cubicFeet = (length * width * depth) / 12;
    const bags60lb = Math.ceil(cubicFeet / 0.45);
    const bags80lb = Math.ceil(cubicFeet / 0.6);
    const cost = (cubicFeet * price).toFixed(2);
    return { cubicFeet: cubicFeet.toFixed(2), bags60lb, bags80lb, cost };
  }, [length, width, depth, price]);

  const inputClass = "w-full bg-surface-container-highest border-none rounded-lg py-3 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-lg outline-none";
  const labelClass = "block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-2";

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Layers className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Construction</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Concrete Calculator</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">Calculate concrete needed for slabs, footings, columns.</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className={labelClass}>Length (feet)</label>
          <input type="number" value={length} onChange={(e) => setLength(Number(e.target.value))} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Width (feet)</label>
          <input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Depth (inches)</label>
          <input type="number" value={depth} onChange={(e) => setDepth(Number(e.target.value))} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Price per cubic yard ($)</label>
          <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className={inputClass} />
        </div>

        <div className="bg-surface-container-low p-5 rounded-xl border border-white/5 mt-8">
          <h3 className="text-lg font-bold text-white mb-4">Results</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-neutral-400">Cubic Feet</span>
              <span className="text-white font-mono">{result.cubicFeet} cu ft</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">60 lb bags</span>
              <span className="text-white font-mono">{result.bags60lb} bags</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">80 lb bags</span>
              <span className="text-white font-mono">{result.bags80lb} bags</span>
            </div>
            <div className="border-t border-white/10 pt-3 mt-3 flex justify-between">
              <span className="text-neutral-400">Estimated Cost</span>
              <span className="text-primary-fixed font-mono text-xl">${result.cost}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}