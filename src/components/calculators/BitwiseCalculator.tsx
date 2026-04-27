import { useState, useMemo } from 'react';
import { Wifi } from 'lucide-react';

export function BitwiseCalculator() {
  const [num1, setNum1] = useState(5);
  const [num2, setNum2] = useState(3);
  const [operation, setOperation] = useState('AND');

  const operations = [
    { label: 'AND', value: 'AND', symbol: '&' },
    { label: 'OR', value: 'OR', symbol: '|' },
    { label: 'XOR', value: 'XOR', symbol: '^' },
    { label: 'NOT', value: 'NOT', symbol: '~' },
    { label: 'Left Shift', value: 'LSHIFT', symbol: '<<' },
    { label: 'Right Shift', value: 'RSHIFT', symbol: '>>' },
  ];

  const result = useMemo(() => {
    switch (operation) {
      case 'AND': return num1 & num2;
      case 'OR': return num1 | num2;
      case 'XOR': return num1 ^ num2;
      case 'NOT': return ~num1;
      case 'LSHIFT': return num1 << num2;
      case 'RSHIFT': return num1 >> num2;
      default: return 0;
    }
  }, [num1, num2, operation]);

  const binary = (n: number) => {
    return n.toString(2).padStart(8, '0');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-8">
            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Number 1</label>
              <input
                className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                type="number"
                value={num1}
                onChange={(e) => setNum1(Number(e.target.value))}
              />
              <p className="text-sm text-neutral-500 mono mt-2">{binary(num1)}</p>
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Operation</label>
              <div className="grid grid-cols-3 gap-2">
                {operations.map((op) => (
                  <button
                    key={op.value}
                    onClick={() => setOperation(op.value)}
                    className={`py-3 rounded-lg text-sm font-medium transition-colors ${
                      operation === op.value
                        ? "bg-primary-fixed text-on-primary-fixed font-bold"
                        : "bg-surface-container-highest hover:bg-neutral-700 text-neutral-300"
                    }`}
                  >
                    {op.symbol}
                  </button>
                ))}
              </div>
            </div>

            {operation !== 'NOT' && (
              <div className="group">
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Number 2</label>
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  type="number"
                  value={num2}
                  onChange={(e) => setNum2(Number(e.target.value))}
                />
                <p className="text-sm text-neutral-500 mono mt-2">{binary(num2)}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="flex items-center gap-2 text-primary-fixed mb-6">
            <Wifi className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Result</span>
          </div>

          <div className="bg-surface-container-highest p-8 rounded-xl mb-6">
            <p className="text-4xl font-bold text-white mono">{result}</p>
            <p className="text-xl text-neutral-500 mono mt-2">{binary(result)}</p>
          </div>

          <div className="bg-surface-container-highest p-6 rounded-xl">
            <p className="text-neutral-500 text-xs uppercase tracking-wider mb-3">Bitwise Truth Table</p>
            <div className="grid grid-cols-4 gap-2 text-center text-sm">
              <div className="p-2 bg-neutral-800 rounded">A</div>
              <div className="p-2 bg-neutral-800 rounded">B</div>
              <div className="p-2 bg-neutral-800 rounded">A & B</div>
              <div className="p-2 bg-neutral-800 rounded">A | B</div>
              <div className="p-2 bg-neutral-800 rounded">0</div>
              <div className="p-2 bg-neutral-800 rounded">0</div>
              <div className="p-2 bg-neutral-800 rounded">0</div>
              <div className="p-2 bg-neutral-800 rounded">0</div>
              <div className="p-2 bg-neutral-800 rounded">0</div>
              <div className="p-2 bg-neutral-800 rounded">1</div>
              <div className="p-2 bg-neutral-800 rounded">0</div>
              <div className="p-2 bg-neutral-800 rounded">1</div>
              <div className="p-2 bg-neutral-800 rounded">1</div>
              <div className="p-2 bg-neutral-800 rounded">0</div>
              <div className="p-2 bg-neutral-800 rounded">0</div>
              <div className="p-2 bg-neutral-800 rounded">1</div>
              <div className="p-2 bg-neutral-800 rounded">1</div>
              <div className="p-2 bg-neutral-800 rounded">1</div>
              <div className="p-2 bg-neutral-800 rounded">0</div>
              <div className="p-2 bg-neutral-800 rounded">1</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BitwiseCalculator;