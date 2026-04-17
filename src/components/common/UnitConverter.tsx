import { useState } from 'react';
import { Sparkles, ArrowRightLeft, Ruler, Scale } from 'lucide-react';
import CopyButton from './CopyButton';
import ResetButton from './ResetButton';

type UnitCategory = 'length' | 'weight' | 'temperature';

interface UnitDef {
  name: string;
  symbol: string;
  toBase: (v: number) => number;
  fromBase: (v: number) => number;
}

const lengthUnits: Record<string, UnitDef> = {
  meter: { name: 'Meter', symbol: 'm', toBase: (v) => v, fromBase: (v) => v },
  kilometer: { name: 'Kilometer', symbol: 'km', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  centimeter: { name: 'Centimeter', symbol: 'cm', toBase: (v) => v / 100, fromBase: (v) => v * 100 },
  millimeter: { name: 'Millimeter', symbol: 'mm', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
  mile: { name: 'Mile', symbol: 'mi', toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
  yard: { name: 'Yard', symbol: 'yd', toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
  foot: { name: 'Foot', symbol: 'ft', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
  inch: { name: 'Inch', symbol: 'in', toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
};

const weightUnits: Record<string, UnitDef> = {
  kilogram: { name: 'Kilogram', symbol: 'kg', toBase: (v) => v, fromBase: (v) => v },
  gram: { name: 'Gram', symbol: 'g', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
  milligram: { name: 'Milligram', symbol: 'mg', toBase: (v) => v / 1000000, fromBase: (v) => v * 1000000 },
  pound: { name: 'Pound', symbol: 'lb', toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
  ounce: { name: 'Ounce', symbol: 'oz', toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
  ton: { name: 'Metric Ton', symbol: 't', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
};

const temperatureUnits: Record<string, UnitDef> = {
  celsius: { name: 'Celsius', symbol: '°C', toBase: (v) => v, fromBase: (v) => v },
  fahrenheit: { name: 'Fahrenheit', symbol: '°F', toBase: (v) => (v - 32) * 5 / 9, fromBase: (v) => v * 9 / 5 + 32 },
  kelvin: { name: 'Kelvin', symbol: 'K', toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
};

const allUnits: Record<UnitCategory, Record<string, UnitDef>> = {
  length: lengthUnits,
  weight: weightUnits,
  temperature: temperatureUnits,
};

export default function UnitConverter() {
  const [category, setCategory] = useState<UnitCategory>('length');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('foot');
  const [inputValue, setInputValue] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const units = allUnits[category];
  const unitKeys = Object.keys(units);

  const convert = (value: number, from: string, to: string): number => {
    const fromDef = units[from];
    const toDef = units[to];
    if (!fromDef || !toDef) return 0;
    const baseValue = fromDef.toBase(value);
    return toDef.fromBase(baseValue);
  };

  const handleInputChange = (value: number) => {
    setError(null);
    if (value < 0) {
      setError('Value must be positive');
      return;
    }
    setInputValue(value);
  };

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const handleReset = () => {
    setInputValue(1);
    setError(null);
  };

  const result = convert(inputValue, fromUnit, toUnit);
  const fromDef = units[fromUnit];
  const toDef = units[toUnit];

  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Utility</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Unit Converter</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">
          Convert between different units of length, weight, and temperature instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Category</label>
                <div className="flex gap-2">
                  {(['length', 'weight', 'temperature'] as UnitCategory[]).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setCategory(cat);
                        const defaultFrom = Object.keys(allUnits[cat])[0];
                        const defaultTo = Object.keys(allUnits[cat])[1] || Object.keys(allUnits[cat])[0];
                        setFromUnit(defaultFrom);
                        setToUnit(defaultTo);
                      }}
                      className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                        category === cat ? 'bg-primary-fixed text-on-primary-fixed font-bold' : 'bg-surface-container-highest hover:bg-neutral-700 text-neutral-400'
                      }`}
                    >
                      {cat === 'length' && <Ruler className="w-4 h-4" />}
                      {cat === 'weight' && <Scale className="w-4 h-4" />}
                      {cat === 'temperature' && <span className="text-lg">°</span>}
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">From</label>
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white font-medium focus:ring-1 focus:ring-primary-fixed outline-none"
                >
                  {unitKeys.map((key) => (
                    <option key={key} value={key}>{units[key].name} ({units[key].symbol})</option>
                  ))}
                </select>
                <div className="mt-3">
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => handleInputChange(Number(e.target.value))}
                    className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl focus:ring-1 focus:ring-primary-fixed outline-none"
                    aria-label={`Value in ${fromDef?.name}`}
                  />
                  {error && (
                    <div className="text-red-400 text-xs mt-1 flex items-center gap-1">
                      <span>!</span> {error}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleSwap}
                  className="p-3 rounded-full bg-surface-container-highest hover:bg-primary-fixed/20 text-neutral-400 hover:text-primary-fixed transition-all"
                  aria-label="Swap units"
                >
                  <ArrowRightLeft className="w-5 h-5" />
                </button>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">To</label>
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white font-medium focus:ring-1 focus:ring-primary-fixed outline-none"
                >
                  {unitKeys.map((key) => (
                    <option key={key} value={key}>{units[key].name} ({units[key].symbol})</option>
                  ))}
                </select>
                <div className="mt-3 p-4 bg-surface-container-highest rounded-lg">
                  <p className="text-3xl font-bold text-white mono">
                    {result.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                    <span className="text-lg text-neutral-400 ml-2">{toDef?.symbol}</span>
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <ResetButton onReset={handleReset} className="flex-1" />
                <CopyButton text={`${inputValue} ${fromDef?.symbol} = ${result.toLocaleString(undefined, { maximumFractionDigits: 6 })} ${toDef?.symbol}`} className="flex-1" />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="bg-gradient-to-br from-surface-container-high to-surface-container-low p-8 rounded-xl border border-white/5">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-primary-fixed font-bold mb-4">Result</label>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-5xl font-black text-white mono">
                {result.toLocaleString(undefined, { maximumFractionDigits: 6 })}
              </span>
              <span className="text-2xl text-neutral-400">{toDef?.symbol}</span>
            </div>
            <p className="text-neutral-400">
              {inputValue} {fromDef?.name} ({fromDef?.symbol}) = {result.toLocaleString(undefined, { maximumFractionDigits: 6 })} {toDef?.name} ({toDef?.symbol})
            </p>
          </div>

          <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
            <h3 className="text-lg font-bold text-white mb-4">About Unit Converter</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              This converter supports length (meters, feet, inches, miles, etc.), weight (kilograms, pounds, ounces, etc.), and temperature (Celsius, Fahrenheit, Kelvin) conversions.
            </p>
          </div>

          <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
            <h3 className="text-lg font-bold text-white mb-4">Quick Reference</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-surface-container-highest p-3 rounded-lg">
                <p className="text-neutral-500">Length</p>
                <p className="text-white">1 inch = 2.54 cm</p>
                <p className="text-white">1 foot = 30.48 cm</p>
                <p className="text-white">1 mile = 1.609 km</p>
              </div>
              <div className="bg-surface-container-highest p-3 rounded-lg">
                <p className="text-neutral-500">Weight</p>
                <p className="text-white">1 kg = 2.205 lb</p>
                <p className="text-white">1 lb = 453.6 g</p>
                <p className="text-white">1 oz = 28.35 g</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}