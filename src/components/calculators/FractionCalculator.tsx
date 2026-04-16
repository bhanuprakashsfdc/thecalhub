import { useState, useMemo } from 'react';
import { Sparkles, Divide } from 'lucide-react';
import { motion } from 'motion/react';

export default function FractionCalculator() {
  const [num1, setNum1] = useState(1);
  const [den1, setDen1] = useState(2);
  const [num2, setNum2] = useState(1);
  const [den2, setDen2] = useState(3);
  const [operation, setOperation] = useState('+');

  const gcd = (a: number, b: number): number => b === 0 ? Math.abs(a) : gcd(b, a % b);

  const simplify = (n: number, d: number): { num: number; den: number } => {
    if (d === 0) return { num: 0, den: 0 };
    const sign = (n < 0) !== (d < 0) ? -1 : 1;
    const absGcd = gcd(n, d);
    return { num: sign * Math.abs(n) / absGcd, den: Math.abs(d) / absGcd };
  };

  const result = useMemo(() => {
    const n1 = num1 || 0;
    const d1 = den1 || 1;
    const n2 = num2 || 0;
    const d2 = den2 || 1;

    if (d1 === 0 || d2 === 0) return { fraction: '0/1', decimal: 0 };

    let numResult: number, denResult: number;

    switch (operation) {
      case '+':
        numResult = n1 * d2 + n2 * d1;
        denResult = d1 * d2;
        break;
      case '-':
        numResult = n1 * d2 - n2 * d1;
        denResult = d1 * d2;
        break;
      case '*':
        numResult = n1 * n2;
        denResult = d1 * d2;
        break;
      case '/':
        if (n2 === 0) return { fraction: 'undefined', decimal: 0 };
        numResult = n1 * d2;
        denResult = d1 * n2;
        break;
      default:
        return { fraction: '0/1', decimal: 0 };
    }

    const simplified = simplify(numResult, denResult);
    const decimal = numResult / denResult;
    return { fraction: `${simplified.num}/${simplified.den}`, decimal };
  }, [num1, den1, num2, den2, operation]);

  const operations = [
    { symbol: '+', label: 'Add' },
    { symbol: '-', label: 'Subtract' },
    { symbol: '*', label: 'Multiply' },
    { symbol: '/', label: 'Divide' },
  ];

  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Math</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Fraction Calculator</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">
          Perform arithmetic operations on fractions with automatic simplification. Our free calculator helps you add, subtract, multiply, and divide fractions.
        </p>
        <div className="flex gap-2 mt-4">
          <span className="text-xs px-2 py-1 bg-white/5 text-neutral-400 rounded">Fractions</span>
          <span className="text-xs px-2 py-1 bg-white/5 text-neutral-400 rounded">Math</span>
          <span className="text-xs px-2 py-1 bg-white/5 text-neutral-400 rounded">Calculator</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Fraction 1</label>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    value={num1}
                    onChange={(e) => setNum1(Number(e.target.value))}
                    className="w-24 bg-surface-container-highest border-none rounded-lg py-4 px-2 text-center text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  />
                  <span className="text-3xl text-white font-bold">/</span>
                  <input
                    type="number"
                    value={den1}
                    onChange={(e) => setDen1(Number(e.target.value))}
                    className="w-24 bg-surface-container-highest border-none rounded-lg py-4 px-2 text-center text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Operation</label>
                <div className="flex gap-2">
                  {operations.map((op) => (
                    <button
                      key={op.symbol}
                      onClick={() => setOperation(op.symbol)}
                      className={`flex-1 py-3 rounded-lg font-bold text-lg transition-all ${
                        operation === op.symbol
                          ? 'bg-primary-fixed text-on-primary-fixed'
                          : 'bg-surface-container-highest text-neutral-400 hover:text-white'
                      }`}
                    >
                      {op.symbol}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Fraction 2</label>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    value={num2}
                    onChange={(e) => setNum2(Number(e.target.value))}
                    className="w-24 bg-surface-container-highest border-none rounded-lg py-4 px-2 text-center text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  />
                  <span className="text-3xl text-white font-bold">/</span>
                  <input
                    type="number"
                    value={den2}
                    onChange={(e) => setDen2(Number(e.target.value))}
                    className="w-24 bg-surface-container-highest border-none rounded-lg py-4 px-2 text-center text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-surface-container-high to-surface-container-low p-8 rounded-xl border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Divide className="w-32 h-32" />
            </div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-primary-fixed font-bold mb-4">Result</label>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-black text-white mono">{result.fraction}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Decimal</label>
                <p className="text-2xl font-bold text-white mono">{result.decimal.toFixed(6)}</p>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Simplified</label>
                <p className="text-2xl font-bold text-primary-fixed mono">{result.fraction}</p>
              </div>
            </div>
          </motion.div>

          <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
            <h3 className="text-lg font-bold text-white mb-4">About Fraction Calculator</h3>
            <p className="text-neutral-400 text-sm leading-relaxed mb-4">This calculator performs arithmetic operations on fractions and automatically simplifies the result.</p>
            <p className="text-neutral-400 text-sm leading-relaxed"><strong>Formula:</strong> For addition: a/b + c/d = (ad + bc) / bd</p>
          </div>
        </div>
      </div>
    </div>
  );
}