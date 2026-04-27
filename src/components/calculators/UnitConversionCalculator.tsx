import { useState, useMemo } from 'react';
import { ArrowLeftRight } from 'lucide-react';

type UnitCategory = 'length' | 'weight' | 'temperature' | 'volume' | 'area' | 'speed' | 'time' | 'digital';

interface Unit {
  name: string;
  toBase: (val: number) => number;
  fromBase: (val: number) => number;
}

const units: Record<UnitCategory, Record<string, Unit>> = {
  length: {
    meter: { name: 'Meter (m)', toBase: v => v, fromBase: v => v },
    kilometer: { name: 'Kilometer (km)', toBase: v => v * 1000, fromBase: v => v / 1000 },
    centimeter: { name: 'Centimeter (cm)', toBase: v => v / 100, fromBase: v => v * 100 },
    millimeter: { name: 'Millimeter (mm)', toBase: v => v / 1000, fromBase: v => v * 1000 },
    mile: { name: 'Mile (mi)', toBase: v => v * 1609.344, fromBase: v => v / 1609.344 },
    yard: { name: 'Yard (yd)', toBase: v => v * 0.9144, fromBase: v => v / 0.9144 },
    foot: { name: 'Foot (ft)', toBase: v => v * 0.3048, fromBase: v => v / 0.3048 },
    inch: { name: 'Inch (in)', toBase: v => v * 0.0254, fromBase: v => v / 0.0254 },
  },
  weight: {
    kilogram: { name: 'Kilogram (kg)', toBase: v => v, fromBase: v => v },
    gram: { name: 'Gram (g)', toBase: v => v / 1000, fromBase: v => v * 1000 },
    milligram: { name: 'Milligram (mg)', toBase: v => v / 1000000, fromBase: v => v * 1000000 },
    pound: { name: 'Pound (lb)', toBase: v => v * 0.453592, fromBase: v => v / 0.453592 },
    ounce: { name: 'Ounce (oz)', toBase: v => v * 0.0283495, fromBase: v => v / 0.0283495 },
    ton: { name: 'Metric Ton (t)', toBase: v => v * 1000, fromBase: v => v / 1000 },
  },
  temperature: {
    celsius: { name: 'Celsius (°C)', toBase: v => v, fromBase: v => v },
    fahrenheit: { name: 'Fahrenheit (°F)', toBase: v => (v - 32) * 5/9, fromBase: v => v * 9/5 + 32 },
    kelvin: { name: 'Kelvin (K)', toBase: v => v - 273.15, fromBase: v => v + 273.15 },
  },
  volume: {
    liter: { name: 'Liter (L)', toBase: v => v, fromBase: v => v },
    milliliter: { name: 'Milliliter (mL)', toBase: v => v / 1000, fromBase: v => v * 1000 },
    gallon: { name: 'Gallon (gal)', toBase: v => v * 3.78541, fromBase: v => v / 3.78541 },
    quart: { name: 'Quart (qt)', toBase: v => v * 0.946353, fromBase: v => v / 0.946353 },
    pint: { name: 'Pint (pt)', toBase: v => v * 0.473176, fromBase: v => v / 0.473176 },
    cup: { name: 'Cup', toBase: v => v * 0.236588, fromBase: v => v / 0.236588 },
  },
  area: {
    sqmeter: { name: 'Square Meter (m²)', toBase: v => v, fromBase: v => v },
    sqkilometer: { name: 'Square Kilometer (km²)', toBase: v => v * 1000000, fromBase: v => v / 1000000 },
    sqfoot: { name: 'Square Foot (ft²)', toBase: v => v * 0.092903, fromBase: v => v / 0.092903 },
    acre: { name: 'Acre', toBase: v => v * 4046.86, fromBase: v => v / 4046.86 },
    hectare: { name: 'Hectare (ha)', toBase: v => v * 10000, fromBase: v => v / 10000 },
  },
  speed: {
    'm/s': { name: 'Meter/second (m/s)', toBase: v => v, fromBase: v => v },
    'km/h': { name: 'Kilometer/hour (km/h)', toBase: v => v / 3.6, fromBase: v => v * 3.6 },
    'mph': { name: 'Mile/hour (mph)', toBase: v => v * 0.44704, fromBase: v => v / 0.44704 },
    'knot': { name: 'Knot (kn)', toBase: v => v * 0.514444, fromBase: v => v / 0.514444 },
  },
  time: {
    second: { name: 'Second (s)', toBase: v => v, fromBase: v => v },
    minute: { name: 'Minute (min)', toBase: v => v * 60, fromBase: v => v / 60 },
    hour: { name: 'Hour (h)', toBase: v => v * 3600, fromBase: v => v / 3600 },
    day: { name: 'Day', toBase: v => v * 86400, fromBase: v => v / 86400 },
    week: { name: 'Week', toBase: v => v * 604800, fromBase: v => v / 604800 },
  },
  digital: {
    byte: { name: 'Byte (B)', toBase: v => v, fromBase: v => v },
    kilobyte: { name: 'Kilobyte (KB)', toBase: v => v * 1024, fromBase: v => v / 1024 },
    megabyte: { name: 'Megabyte (MB)', toBase: v => v * 1048576, fromBase: v => v / 1048576 },
    gigabyte: { name: 'Gigabyte (GB)', toBase: v => v * 1073741824, fromBase: v => v / 1073741824 },
    terabyte: { name: 'Terabyte (TB)', toBase: v => v * 1099511627776, fromBase: v => v / 1099511627776 },
  },
};

export function UnitConversionCalculator() {
  const [category, setCategory] = useState<UnitCategory>('length');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('kilometer');
  const [value, setValue] = useState(1);

  const result = useMemo(() => {
    const from = units[category][fromUnit];
    const to = units[category][toUnit];
    const base = from.toBase(value);
    return to.fromBase(base);
  }, [category, fromUnit, toUnit, value]);

  const categories: { value: UnitCategory; label: string }[] = [
    { value: 'length', label: 'Length' },
    { value: 'weight', label: 'Weight' },
    { value: 'temperature', label: 'Temp' },
    { value: 'volume', label: 'Volume' },
    { value: 'area', label: 'Area' },
    { value: 'speed', label: 'Speed' },
    { value: 'time', label: 'Time' },
    { value: 'digital', label: 'Digital' },
  ];

  const formatNumber = (num: number) => {
    if (Math.abs(num) < 0.0001 || Math.abs(num) > 10000000) {
      return num.toExponential(6);
    }
    return num.toFixed(6).replace(/\.?0+$/, '');
  };

  const swap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-8">
            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Category</label>
              <div className="grid grid-cols-4 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => { setCategory(cat.value); setFromUnit(Object.keys(units[cat.value])[0]); setToUnit(Object.keys(units[cat.value])[1] || Object.keys(units[cat.value])[0]); }}
                    className={`py-3 rounded-lg text-sm font-medium transition-colors ${
                      category === cat.value
                        ? "bg-primary-fixed text-on-primary-fixed font-bold"
                        : "bg-surface-container-highest hover:bg-neutral-700 text-neutral-300"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">From</label>
              <select
                className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
              >
                {Object.keys(units[category]).map((u) => (
                  <option key={u} value={u}>{units[category][u].name}</option>
                ))}
              </select>
              <input
                className="w-full mt-2 bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                type="number"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
              />
            </div>

            <button
              onClick={swap}
              className="w-full py-3 bg-surface-container-highest hover:bg-neutral-700 rounded-lg text-neutral-300 flex items-center justify-center gap-2"
            >
              <ArrowLeftRight className="w-4 h-4" /> Swap
            </button>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">To</label>
              <select
                className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
              >
                {Object.keys(units[category]).map((u) => (
                  <option key={u} value={u}>{units[category][u].name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="flex items-center gap-2 text-primary-fixed mb-6">
            <ArrowLeftRight className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Result</span>
          </div>

          <div className="bg-surface-container-highest p-8 rounded-xl mb-6">
            <p className="text-4xl font-bold text-white mono">{formatNumber(result)}</p>
            <p className="text-neutral-500 text-lg mt-2">{units[category][toUnit].name}</p>
          </div>

          <div className="bg-surface-container-highest p-6 rounded-xl">
            <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Conversion</p>
            <p className="text-xl text-white mono">
              {value} {units[category][fromUnit].name} = {formatNumber(result)} {units[category][toUnit].name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnitConversionCalculator;