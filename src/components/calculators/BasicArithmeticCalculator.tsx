import { useState, useMemo } from 'react';
import { Calculator, RotateCcw } from 'lucide-react';

export function BasicArithmeticCalculator() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operation, setOperation] = useState('add');

  const result = useMemo(() => {
    switch (operation) {
      case 'add': return num1 + num2;
      case 'subtract': return num1 - num2;
      case 'multiply': return num1 * num2;
      case 'divide': return num2 !== 0 ? num1 / num2 : 'Error';
      case 'modulo': return num2 !== 0 ? num1 % num2 : 'Error';
      case 'power': return Math.pow(num1, num2);
      default: return 0;
    }
  }, [num1, num2, operation]);

  const operations = [
    { label: 'Add', value: 'add', symbol: '+' },
    { label: 'Subtract', value: 'subtract', symbol: '-' },
    { label: 'Multiply', value: 'multiply', symbol: '×' },
    { label: 'Divide', value: 'divide', symbol: '÷' },
    { label: 'Modulo', value: 'modulo', symbol: '%' },
    { label: 'Power', value: 'power', symbol: '^' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-8">
            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">First Number</label>
              <input
                className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                type="number"
                value={num1}
                onChange={(e) => setNum1(Number(e.target.value))}
              />
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

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Second Number</label>
              <input
                className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                type="number"
                value={num2}
                onChange={(e) => setNum2(Number(e.target.value))}
              />
            </div>

            <button
              onClick={() => { setNum1(0); setNum2(0); setOperation('add'); }}
              className="w-full py-3 bg-surface-container-highest hover:bg-neutral-700 rounded-lg text-neutral-300 text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="flex items-center gap-2 text-primary-fixed mb-6">
            <Calculator className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Result</span>
          </div>

          <div className="bg-surface-container-highest p-8 rounded-xl mb-6">
            <p className="text-4xl font-bold text-white mono break-all">
              {typeof result === 'number' ? result.toLocaleString() : result}
            </p>
          </div>

          <div className="bg-surface-container-highest p-6 rounded-xl">
            <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Expression</p>
            <p className="text-xl text-white mono">
              {num1} {operations.find(o => o.value === operation)?.symbol} {num2} = {typeof result === 'number' ? result.toLocaleString() : result}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicArithmeticCalculator;