import { useState, useMemo } from 'react';
import { Palette } from 'lucide-react';

export default function PaintCalculator() {
  const [wallLength, setWallLength] = useState(20);
  const [wallHeight, setWallHeight] = useState(8);
  const [numWalls, setNumWalls] = useState(4);
  const [doors, setDoors] = useState(1);
  const [windows, setWindows] = useState(2);
  const [coatCount, setCoatCount] = useState(2);
  const [price, setPrice] = useState(35);

  const result = useMemo(() => {
    const grossSqft = wallLength * wallHeight * numWalls;
    const doorSqft = doors * 20;
    const windowSqft = windows * 15;
    const netSqft = grossSqft - doorSqft - windowSqft;
    const gallons = Math.ceil((netSqft / 350) * coatCount);
    const cost = (gallons * price).toFixed(2);
    return { grossSqft: grossSqft.toString(), netSqft: netSqft.toString(), gallons: gallons.toString(), cost };
  }, [wallLength, wallHeight, numWalls, doors, windows, coatCount, price]);

  const inputClass = "w-full bg-surface-container-highest border-none rounded-lg py-3 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-lg outline-none";
  const labelClass = "block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-2";

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Palette className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Construction</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Paint Calculator</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">Calculate paint needed for walls and rooms.</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className={labelClass}>Wall Length (feet)</label>
          <input type="number" value={wallLength} onChange={(e) => setWallLength(Number(e.target.value))} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Wall Height (feet)</label>
          <input type="number" value={wallHeight} onChange={(e) => setWallHeight(Number(e.target.value))} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Number of Walls</label>
          <input type="number" value={numWalls} onChange={(e) => setNumWalls(Number(e.target.value))} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Doors (subtract)</label>
          <input type="number" value={doors} onChange={(e) => setDoors(Number(e.target.value))} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Windows (subtract)</label>
          <input type="number" value={windows} onChange={(e) => setWindows(Number(e.target.value))} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Coats</label>
          <input type="number" value={coatCount} onChange={(e) => setCoatCount(Number(e.target.value))} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Price per gallon ($)</label>
          <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className={inputClass} />
        </div>

        <div className="bg-surface-container-low p-5 rounded-xl border border-white/5 mt-8">
          <h3 className="text-lg font-bold text-white mb-4">Results</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-neutral-400">Gross Area</span>
              <span className="text-white font-mono">{result.grossSqft} sq ft</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Net Area</span>
              <span className="text-white font-mono">{result.netSqft} sq ft</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Gallons needed</span>
              <span className="text-white font-mono">{result.gallons} gal</span>
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