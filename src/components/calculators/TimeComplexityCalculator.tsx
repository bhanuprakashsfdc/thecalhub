import { useState } from 'react';
import { Clock, Copy, Check } from 'lucide-react';

interface ComplexityResult {
  name: string;
  complexity: string;
  description: string;
}

const complexityAnalysis: ComplexityResult[] = [
  { name: 'O(1)', complexity: 'O(1)', description: 'Constant time - best case' },
  { name: 'O(log n)', complexity: 'O(log n)', description: 'Logarithmic - binary search' },
  { name: 'O(n)', complexity: 'O(n)', description: 'Linear - simple loop' },
  { name: 'O(n log n)', complexity: 'O(n log n)', description: 'Linearithmic - merge sort' },
  { name: 'O(n²)', complexity: 'O(n²)', description: 'Quadratic - nested loops' },
  { name: 'O(2ⁿ)', complexity: 'O(2ⁿ)', description: 'Exponential - recursive Fibonacci' },
  { name: 'O(n!)', complexity: 'O(n!)', description: 'Factorial - permutations' },
];

const commonPatterns: { pattern: string; complexity: string }[] = [
  { pattern: 'for(i=0; i<n; i++)', complexity: 'O(n)' },
  { pattern: 'for(i=0; i<n; i++) for(j=0; j<n; j++)', complexity: 'O(n²)' },
  { pattern: 'while(low<high) { mid=(low+high)/2; ... }', complexity: 'O(log n)' },
  { pattern: 'for(i=0; i<n; i++) for(j=0; j<n; j++) for(k=0; k<n; k++)', complexity: 'O(n³)' },
  { pattern: 'recursive(n-1) + recursive(n-2)', complexity: 'O(2ⁿ)' },
];

export function TimeComplexityCalculator() {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const copyResult = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-6">
            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Enter Code Snippet</label>
              <textarea
                className="w-full h-48 bg-surface-container-highest border-none rounded-lg p-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-lg outline-none resize-none font-mono"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="// Enter your loop or algorithm code here..."
              />
            </div>
          </div>
        </div>

        <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
          <p className="text-neutral-500 text-xs uppercase tracking-wider mb-3">Common Patterns</p>
          <div className="space-y-2">
            {commonPatterns.map((p) => (
              <div key={p.pattern} className="flex items-center justify-between bg-surface-container-highest p-3 rounded-lg">
                <code className="text-sm text-neutral-300 font-mono truncate flex-1">{p.pattern}</code>
                <button
                  onClick={() => copyResult(p.complexity)}
                  className="ml-2 px-2 py-1 bg-primary-fixed/20 text-primary-fixed text-xs rounded"
                >
                  {p.complexity}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="flex items-center gap-2 text-primary-fixed mb-6">
            <Clock className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Time Complexities</span>
          </div>

          <div className="space-y-3">
            {complexityAnalysis.map((c) => (
              <div
                key={c.name}
                className="flex items-center justify-between bg-surface-container-highest p-4 rounded-xl hover:border-primary-fixed/50 border border-transparent transition-colors"
              >
                <div>
                  <p className="text-xl font-bold text-primary-fixed">{c.complexity}</p>
                  <p className="text-sm text-neutral-500">{c.description}</p>
                </div>
                <button
                  onClick={() => copyResult(c.complexity)}
                  className="p-2 hover:bg-neutral-700 rounded-lg transition-colors"
                >
                  {copied === c.complexity ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-neutral-500" />
                  )}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-surface-container-highest p-6 rounded-xl">
            <p className="text-neutral-500 text-xs uppercase tracking-wider mb-3">Complexity Growth Rate</p>
            <div className="relative h-32 border-l border-b border-neutral-600">
              {[1, 10, 100, 1000].map((n, i) => (
                <div key={n} className="absolute bottom-0 text-xs text-neutral-500" style={{ left: `${i * 25}%` }}>
                  n={n}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeComplexityCalculator;