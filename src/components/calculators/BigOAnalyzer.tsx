import { useState } from 'react';
import { Infinity, Check } from 'lucide-react';

interface NotationInfo {
  notation: string;
  name: string;
  example: string;
  efficiency: 'best' | 'good' | 'fair' | 'poor' | 'worst';
}

const notations: NotationInfo[] = [
  { notation: 'O(1)', name: 'Constant', example: 'Hash table lookup', efficiency: 'best' },
  { notation: 'O(log n)', name: 'Logarithmic', example: 'Binary search', efficiency: 'best' },
  { notation: 'O(n)', name: 'Linear', example: 'Simple search', efficiency: 'good' },
  { notation: 'O(n log n)', name: 'Linearithmic', example: 'Merge sort', efficiency: 'fair' },
  { notation: 'O(n²)', name: 'Quadratic', example: 'Bubble sort', efficiency: 'poor' },
  { notation: 'O(2ⁿ)', name: 'Exponential', example: 'Recursive Fibonacci', efficiency: 'worst' },
  { notation: 'O(n!)', name: 'Factorial', example: 'Permutations', efficiency: 'worst' },
];

const algorithms: { name: string; complexity: string }[] = [
  { name: 'Array Access', complexity: 'O(1)' },
  { name: 'Hash Table', complexity: 'O(1)' },
  { name: 'Binary Search', complexity: 'O(log n)' },
  { name: 'Linear Search', complexity: 'O(n)' },
  { name: 'Merge Sort', complexity: 'O(n log n)' },
  { name: 'Quick Sort', complexity: 'O(n²)' },
  { name: 'BFS/DFS', complexity: 'O(V + E)' },
  { name: 'Dijkstra', complexity: 'O(E log V)' },
  { name: 'DP Fibonacci', complexity: 'O(n)' },
  { name: 'Recursive Fibonacci', complexity: 'O(2ⁿ)' },
];

export function BigOAnalyzer() {
  const [selected, setSelected] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const getEfficiencyColor = (eff: string) => {
    switch (eff) {
      case 'best': return 'text-green-400 bg-green-500/10';
      case 'good': return 'text-blue-400 bg-blue-500/10';
      case 'fair': return 'text-yellow-400 bg-yellow-500/10';
      case 'poor': return 'text-orange-400 bg-orange-500/10';
      case 'worst': return 'text-red-400 bg-red-500/10';
      default: return 'text-neutral-400';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="flex items-center gap-2 text-primary-fixed mb-6">
            <Infinity className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Big-O Notations</span>
          </div>

          <div className="space-y-3">
            {notations.map((n) => (
              <button
                key={n.notation}
                onClick={() => setSelected(n.notation)}
                className={`w-full flex items-center justify-between p-4 rounded-xl transition-colors ${
                  selected === n.notation
                    ? 'bg-primary-fixed/20 border border-primary-fixed/50'
                    : 'bg-surface-container-highest hover:bg-neutral-700'
                }`}
              >
                <div className="text-left">
                  <p className="text-xl font-bold text-primary-fixed">{n.notation}</p>
                  <p className="text-sm text-neutral-500">{n.name}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEfficiencyColor(n.efficiency)}`}>
                  {n.efficiency}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="flex items-center gap-2 text-primary-fixed mb-6">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Common Algorithms</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {algorithms.map((a) => (
              <div
                key={a.name}
                className="flex items-center justify-between bg-surface-container-highest p-4 rounded-xl"
              >
                <span className="text-neutral-300">{a.name}</span>
                <button
                  onClick={() => { navigator.clipboard.writeText(a.complexity); setCopied(a.complexity); setTimeout(() => setCopied(null), 2000); }}
                  className="text-primary-fixed font-mono"
                >
                  {copied === a.complexity ? <Check className="w-4 h-4" /> : a.complexity}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-surface-container-highest p-6 rounded-xl">
            <p className="text-neutral-500 text-xs uppercase tracking-wider mb-3">Quick Reference</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-neutral-400">n = input size</p>
                <p className="text-neutral-400">V = vertices</p>
                <p className="text-neutral-400">E = edges</p>
              </div>
              <div>
                <p className="text-green-400">Best: O(1), O(log n)</p>
                <p className="text-yellow-400">Fair: O(n), O(n log n)</p>
                <p className="text-red-400">Avoid: O(n²), O(2ⁿ), O(n!)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BigOAnalyzer;