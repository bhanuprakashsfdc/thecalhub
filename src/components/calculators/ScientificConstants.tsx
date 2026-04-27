import { useState } from 'react';
import { Atom, Copy, Check } from 'lucide-react';

interface Constant {
  symbol: string;
  name: string;
  value: string;
  unit: string;
  category: string;
}

const constants: Constant[] = [
  { symbol: 'c', name: 'Speed of light', value: '299792458', unit: 'm/s', category: 'Electromagnetism' },
  { symbol: 'μ₀', name: 'Vacuum permeability', value: '1.2566370614e-6', unit: 'N/A²', category: 'Electromagnetism' },
  { symbol: 'ε₀', name: 'Vacuum permittivity', value: '8.8541878128e-12', unit: 'F/m', category: 'Electromagnetism' },
  { symbol: 'h', name: 'Planck constant', value: '6.62607015e-34', unit: 'J⋅s', category: 'Quantum' },
  { symbol: 'ħ', name: 'Reduced Planck constant', value: '1.054571817e-34', unit: 'J⋅s', category: 'Quantum' },
  { symbol: 'e', name: 'Elementary charge', value: '1.602176634e-19', unit: 'C', category: 'Quantum' },
  { symbol: 'me', name: 'Electron mass', value: '9.1093837015e-31', unit: 'kg', category: 'Particle' },
  { symbol: 'mp', name: 'Proton mass', value: '1.67262192369e-27', unit: 'kg', category: 'Particle' },
  { symbol: 'mn', name: 'Neutron mass', value: '1.67492749804e-27', unit: 'kg', category: 'Particle' },
  { symbol: 'G', name: 'Gravitational constant', value: '6.67430e-11', unit: 'm³/(kg⋅s²)', category: 'Gravity' },
  { symbol: 'g', name: 'Standard gravity', value: '9.80665', unit: 'm/s²', category: 'Gravity' },
  { symbol: 'NA', name: 'Avogadro constant', value: '6.02214076e23', unit: 'mol⁻¹', category: 'Chemistry' },
  { symbol: 'R', name: 'Gas constant', value: '8.314462618', unit: 'J/(mol⋅K)', category: 'Chemistry' },
  { symbol: 'kB', name: 'Boltzmann constant', value: '1.380649e-23', unit: 'J/K', category: 'Quantum' },
  { symbol: 'σ', name: 'Stefan-Boltzmann constant', value: '5.670374419e-8', unit: 'W/(m²⋅K⁴)', category: 'Thermodynamics' },
  { symbol: 'atm', name: 'Standard atmosphere', value: '101325', unit: 'Pa', category: 'Pressure' },
  { symbol: 'ae', name: 'Astronomical unit', value: '1.495978707e11', unit: 'm', category: 'Astronomy' },
  { symbol: 'pc', name: 'Parsec', value: '3.085677581e16', unit: 'm', category: 'Astronomy' },
  { symbol: 'ly', name: 'Light year', value: '9.460730e15', unit: 'm', category: 'Astronomy' },
  { symbol: 'π', name: 'Pi', value: '3.141592653589793', unit: '', category: 'Math' },
  { symbol: 'e', name: 'Euler number', value: '2.718281828459045', unit: '', category: 'Math' },
  { symbol: 'φ', name: 'Golden ratio', value: '1.618033988749895', unit: '', category: 'Math' },
];

const categories = [...new Set(constants.map(c => c.category))];

export function ScientificConstants() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = selectedCategory 
    ? constants.filter(c => c.category === selectedCategory)
    : constants;

  const copyValue = (value: string, symbol: string) => {
    navigator.clipboard.writeText(value);
    setCopied(symbol);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
        <div className="flex items-center gap-2 text-primary-fixed mb-6">
          <Atom className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Scientific Constants</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              !selectedCategory
                ? "bg-primary-fixed text-on-primary-fixed"
                : "bg-surface-container-highest hover:bg-neutral-700 text-neutral-300"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-primary-fixed text-on-primary-fixed"
                  : "bg-surface-container-highest hover:bg-neutral-700 text-neutral-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((constant) => (
            <div
              key={constant.symbol}
              className="bg-surface-container-highest p-4 rounded-xl hover:border-primary-fixed/50 border border-transparent transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <p className="text-xl font-bold text-primary-fixed">{constant.symbol}</p>
                    <p className="text-sm text-neutral-400">= {constant.value}</p>
                  </div>
                  <p className="text-sm text-neutral-500 mt-1">{constant.name}</p>
                  {constant.unit && (
                    <p className="text-xs text-neutral-600 mt-1">Unit: {constant.unit}</p>
                  )}
                </div>
                <button
                  onClick={() => copyValue(constant.value, constant.symbol)}
                  className="p-2 hover:bg-neutral-700 rounded-lg transition-colors"
                >
                  {copied === constant.symbol ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-neutral-500" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ScientificConstants;