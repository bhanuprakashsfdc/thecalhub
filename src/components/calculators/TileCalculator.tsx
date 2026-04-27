import { useState, useMemo } from 'react';
import { Grid3X3 } from 'lucide-react';
import { useI18n } from '../../lib/i18n';

export default function TileCalculator() {
  const { getCurrencySymbol } = useI18n();
  const symbol = getCurrencySymbol();
  const [roomLength, setRoomLength] = useState(12);
  const [roomWidth, setRoomWidth] = useState(10);
  const [tileSize, setTileSize] = useState(12);
  const [price, setPrice] = useState(3);

  const result = useMemo(() => {
    const sqft = roomLength * roomWidth;
    const tileSqIn = tileSize * tileSize;
    const tiles = Math.ceil((sqft * 144) / tileSqIn);
    const waste = Math.ceil(tiles * 1.1);
    const cost = (waste * price).toFixed(2);
    return { sqft: sqft.toString(), tiles: tiles.toString(), waste: waste.toString(), cost };
  }, [roomLength, roomWidth, tileSize, price]);

  const inputClass = "w-full bg-surface-container-highest border-none rounded-lg py-3 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-lg outline-none";
  const labelClass = "block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-2";

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Grid3X3 className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Construction</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Tile Calculator</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">Calculate tiles for flooring, bathrooms, kitchens.</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className={labelClass}>Room Length (feet)</label>
          <input type="number" value={roomLength} onChange={(e) => setRoomLength(Number(e.target.value))} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Room Width (feet)</label>
          <input type="number" value={roomWidth} onChange={(e) => setRoomWidth(Number(e.target.value))} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Tile Size (inches)</label>
          <input type="number" value={tileSize} onChange={(e) => setTileSize(Number(e.target.value))} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Price per tile ({symbol})</label>
          <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className={inputClass} />
        </div>

        <div className="bg-surface-container-low p-5 rounded-xl border border-white/5 mt-8">
          <h3 className="text-lg font-bold text-white mb-4">Results</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-neutral-400">Area</span>
              <span className="text-white font-mono">{result.sqft} sq ft</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Exact Tiles</span>
              <span className="text-white font-mono">{result.tiles} tiles</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">With 10% waste</span>
              <span className="text-white font-mono">{result.waste} tiles</span>
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