import { TrendingUp, FlaskConical } from 'lucide-react';

const scientificCalculators = [
  { name: 'Scientific Calculator', path: '/scientific-calculator.html', description: 'Advanced calculations' },
  { name: 'Basic Arithmetic Calculator', path: '/basic-arithmetic-calculator.html', description: 'Basic arithmetic operations' },
  { name: 'Trigonometric Calculator', path: '/trigonometric-calculator.html', description: 'Trigonometric calculations' },
  { name: 'Logarithmic Calculator', path: '/logarithmic-calculator.html', description: 'Log and exponential calculations' },
  { name: 'Complex Number Calculator', path: '/complex-number-calculator.html', description: 'Complex number operations' },
  { name: 'Matrix Calculator', path: '/matrix-calculator.html', description: 'Matrix operations' },
  { name: 'Statistical Calculator', path: '/statistical-calculator.html', description: 'Statistical analysis' },
  { name: 'Unit Conversion Calculator', path: '/unit-conversion-calculator.html', description: 'Convert between units' },
  { name: 'Equation Solver', path: '/equation-solver.html', description: 'Solve equations' },
  { name: 'Graphing Calculator', path: '/graphing-calculator.html', description: 'Graph functions' },
  { name: 'Scientific Constants', path: '/scientific-constants.html', description: 'Physical constants' },
];

export default function ScientificPage() {
  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <FlaskConical className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Scientific</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Scientific Calculators</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">
          Advanced scientific calculators for math, science, and engineering.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {scientificCalculators.map((calc) => (
          <a
            key={calc.name}
            href={calc.path}
            className="bg-surface-container-low p-5 rounded-xl border border-white/5 hover:border-primary-fixed/50 transition-all flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-primary-fixed/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary-fixed" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">{calc.name}</h3>
              <p className="text-neutral-400 text-sm">{calc.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}