import { useState } from 'react';
import { Sparkles, Divide } from 'lucide-react';
import { motion } from 'motion/react';

export default function FractionCalculator() {
  const [num1, setNum1] = useState('');
  const [den1, setDen1] = useState('');
  const [num2, setNum2] = useState('');
  const [den2, setDen2] = useState('');
  const [operation, setOperation] = useState('+');
  const [result, setResult] = useState<{ fraction: string; decimal: number } | null>(null);

  const gcd = (a: number, b: number): number => b === 0 ? Math.abs(a) : gcd(b, a % b);

  const simplify = (n: number, d: number): { num: number; den: number } => {
    if (d === 0) return { num: 0, den: 0 };
    const sign = (n < 0) !== (d < 0) ? -1 : 1;
    const absGcd = gcd(n, d);
    return { num: sign * Math.abs(n) / absGcd, den: Math.abs(d) / absGcd };
  };

  const calculate = () => {
    const n1 = parseInt(num1) || 0;
    const d1 = parseInt(den1) || 1;
    const n2 = parseInt(num2) || 0;
    const d2 = parseInt(den2) || 1;

    if (d1 === 0 || d2 === 0) return;

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
        if (n2 === 0) return;
        numResult = n1 * d2;
        denResult = d1 * n2;
        break;
      default:
        return;
    }

    const simplified = simplify(numResult, denResult);
    const decimal = numResult / denResult;
    setResult({ fraction: `${simplified.num}/${simplified.den}`, decimal });
  };

  const operations = [
    { symbol: '+', label: 'Add' },
    { symbol: '-', label: 'Subtract' },
    { symbol: '*', label: 'Multiply' },
    { symbol: '/', label: 'Divide' },
  ];

  return (
    <div className="mt-14 p-6 md:p-10 flex-1 overflow-y-auto">
      <div className="mb-12">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Math</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Fraction Calculator</h2>
        <p className="text-neutral-400 max-w-xl text-lg leading-relaxed">
          Perform arithmetic operations on fractions with step-by-step simplification.
        </p>
      </div>

      <div className="max-w-lg">
        <div className="bg-surface-container-low rounded-xl p-6 border border-white/5">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <input
                type="number"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
                placeholder="Num"
                className="w-20 bg-surface-container-highest border border-white/10 rounded-lg p-3 text-center text-white placeholder:text-neutral-600 focus:outline-none focus:border-primary-fixed/50 transition-colors"
              />
              <span className="text-2xl text-white font-bold">/</span>
              <input
                type="number"
                value={den1}
                onChange={(e) => setDen1(e.target.value)}
                placeholder="Den"
                className="w-20 bg-surface-container-highest border border-white/10 rounded-lg p-3 text-center text-white placeholder:text-neutral-600 focus:outline-none focus:border-primary-fixed/50 transition-colors"
              />
            </div>

            <div className="flex justify-center gap-2">
              {operations.map((op) => (
                <button
                  key={op.symbol}
                  onClick={() => setOperation(op.symbol)}
                  className={`w-12 h-12 rounded-lg font-bold text-lg transition-all ${
                    operation === op.symbol
                      ? 'bg-primary-fixed text-on-primary-fixed'
                      : 'bg-surface-container-highest text-neutral-400 hover:bg-surface-container-highest/80'
                  }`}
                >
                  {op.symbol}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <input
                type="number"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
                placeholder="Num"
                className="w-20 bg-surface-container-highest border border-white/10 rounded-lg p-3 text-center text-white placeholder:text-neutral-600 focus:outline-none focus:border-primary-fixed/50 transition-colors"
              />
              <span className="text-2xl text-white font-bold">/</span>
              <input
                type="number"
                value={den2}
                onChange={(e) => setDen2(e.target.value)}
                placeholder="Den"
                className="w-20 bg-surface-container-highest border border-white/10 rounded-lg p-3 text-center text-white placeholder:text-neutral-600 focus:outline-none focus:border-primary-fixed/50 transition-colors"
              />
            </div>

            <button
              onClick={calculate}
              className="w-full bg-primary-fixed text-on-primary-fixed p-4 rounded-lg font-bold hover:shadow-[0_0_20px_rgba(214,237,121,0.3)] transition-all duration-200"
            >
              Calculate
            </button>

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-6 bg-surface-container-highest rounded-xl border border-white/5"
              >
                <div className="flex items-center gap-2 text-primary-fixed mb-4">
                  <Divide className="w-4 h-4" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">Result</span>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-extrabold text-white">{result.fraction}</div>
                  <div className="text-lg text-neutral-400">= {result.decimal.toFixed(6)}</div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}