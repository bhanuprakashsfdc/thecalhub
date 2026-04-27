import { useState, useMemo } from 'react';
import { Mountain } from 'lucide-react';
import { useI18n } from '../../lib/i18n';

export default function GravelCalculator() {
  const { getCurrencySymbol } = useI18n();
  const symbol = getCurrencySymbol();
  const [length, setLength] = useState(50);
  const [width, setWidth] = useState(10);
  const [depth, setDepth] = useState(3);
  const [price, setPrice] = useState(40);

  const result = useMemo(() => {
    const sqft = length * width;
    const cubicFeet = (sqft * depth) / 12;
    const cubicYards = (cubicFeet / 27).toFixed(2);
    const tons = ((cubicFeet * 1.4) / 2000).toFixed(2);
    const cost = (Number(cubicYards) * price).toFixed(2);
    return { sqft: sqft.toString(), cubicFeet: cubicFeet.toFixed(2), cubicYards, tons, cost };
  }, [length, width, depth, price]);

  const inputClass = "w-full bg-surface-container-highest border-none rounded-lg py-3 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-lg outline-none";
  const labelClass = "block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-2";

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Mountain className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Construction</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Gravel Calculator</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">Calculate gravel for driveways and landscaping.</p>
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
          <label className={labelClass}>Price per cubic yard ({symbol})</label>
          <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className={inputClass} />
        </div>

        <div className="bg-surface-container-low p-5 rounded-xl border border-white/5 mt-8">
          <h3 className="text-lg font-bold text-white mb-4">Results</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-neutral-400">Square Footage</span>
              <span className="text-white font-mono">{result.sqft} sq ft</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Cubic Feet</span>
              <span className="text-white font-mono">{result.cubicFeet} cu ft</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Cubic Yards</span>
              <span className="text-white font-mono">{result.cubicYards} cu yd</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Weight (tons)</span>
              <span className="text-white font-mono">{result.tons} tons</span>
            </div>
            <div className="border-t border-white/10 pt-3 mt-3 flex justify-between">
              <span className="text-neutral-400">Estimated Cost</span>
              <span className="text-primary-fixed font-mono text-xl">{symbol}{result.cost}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}