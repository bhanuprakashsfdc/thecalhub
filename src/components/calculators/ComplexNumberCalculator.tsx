import { useState, useMemo } from 'react';
import { Binary } from 'lucide-react';

interface Complex {
  re: number;
  im: number;
}

export function ComplexNumberCalculator() {
  const [num1, setNum1] = useState<Complex>({ re: 3, im: 4 });
  const [num2, setNum2] = useState<Complex>({ re: 1, im: 2 });
  const [operation, setOperation] = useState('add');

  const result = useMemo(() => {
    switch (operation) {
      case 'add':
        return { re: num1.re + num2.re, im: num1.im + num2.im };
      case 'subtract':
        return { re: num1.re - num2.re, im: num1.im - num2.im };
      case 'multiply':
        return { 
          re: num1.re * num2.re - num1.im * num2.im, 
          im: num1.re * num2.im + num1.im * num2.re 
        };
      case 'divide':
        const denom = num2.re * num2.re + num2.im * num2.im;
        if (denom === 0) return null;
        return {
          re: (num1.re * num2.re + num1.im * num2.im) / denom,
          im: (num1.im * num2.re - num1.re * num2.im) / denom
        };
      case 'magnitude':
        return { re: Math.sqrt(num1.re * num1.re + num1.im * num1.im), im: 0 };
      case 'conjugate':
        return { re: num1.re, im: -num1.im };
      default:
        return { re: 0, im: 0 };
    }
  }, [num1, num2, operation]);

  const formatComplex = (c: Complex | null) => {
    if (!c) return 'Undefined';
    const re = c.re.toFixed(4).replace(/\.?0+$/, '');
    const im = c.im.toFixed(4).replace(/\.?0+$/, '');
    if (c.im >= 0) return `${re} + ${im}i`;
    return `${re} - ${Math.abs(c.im)}i`;
  };

  const operations = [
    { label: 'Add', value: 'add', symbol: '+' },
    { label: 'Subtract', value: 'subtract', symbol: '-' },
    { label: 'Multiply', value: 'multiply', symbol: '×' },
    { label: 'Divide', value: 'divide', symbol: '÷' },
    { label: '|z|', value: 'magnitude', symbol: '|z|' },
    { label: 'Conjugate', value: 'conjugate', symbol: 'z̄' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-8">
            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Complex Number 1 (a + bi)</label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  type="number"
                  placeholder="Real"
                  value={num1.re}
                  onChange={(e) => setNum1({ ...num1, re: Number(e.target.value) })}
                />
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  type="number"
                  placeholder="Imaginary"
                  value={num1.im}
                  onChange={(e) => setNum1({ ...num1, im: Number(e.target.value) })}
                />
              </div>
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
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Complex Number 2 (c + di)</label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  type="number"
                  placeholder="Real"
                  value={num2.re}
                  onChange={(e) => setNum2({ ...num2, re: Number(e.target.value) })}
                />
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  type="number"
                  placeholder="Imaginary"
                  value={num2.im}
                  onChange={(e) => setNum2({ ...num2, im: Number(e.target.value) })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="flex items-center gap-2 text-primary-fixed mb-6">
            <Binary className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Result</span>
          </div>

          <div className="bg-surface-container-highest p-8 rounded-xl mb-6">
            <p className="text-4xl font-bold text-white mono">
              {result ? formatComplex(result) : 'Error'}
            </p>
          </div>

          {result && (
            <div className="bg-surface-container-highest p-6 rounded-xl">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-4">Polar Form</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-neutral-400 text-xs">Magnitude (r)</p>
                  <p className="text-xl text-white mono">
                    {Math.sqrt(result.re * result.re + result.im * result.im).toFixed(4)}
                  </p>
                </div>
                <div>
                  <p className="text-neutral-400 text-xs">Angle (θ)</p>
                  <p className="text-xl text-white mono">
                    {(Math.atan2(result.im, result.re) * 180 / Math.PI).toFixed(2)}°
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ComplexNumberCalculator;