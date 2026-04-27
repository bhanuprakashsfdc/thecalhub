import { useState } from 'react';
import { GitBranch, RotateCcw } from 'lucide-react';

export function EquationSolver() {
  const [equation, setEquation] = useState("x^2 + 5*x + 6 = 0");
  const [result, setResult] = useState<{ roots: (number | string)[]; type: string } | null>(null);

  const solveQuadratic = (a: number, b: number, c: number) => {
    const discriminant = b * b - 4 * a * c;
    
    if (discriminant > 0) {
      const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      return { roots: [x1, x2], type: 'Two Real Roots' };
    } else if (discriminant === 0) {
      const x = -b / (2 * a);
      return { roots: [x], type: 'One Real Root' };
    } else {
      const real = -b / (2 * a);
      const imag = Math.sqrt(-discriminant) / (2 * a);
      return { roots: [`${real} + ${imag}i`, `${real} - ${imag}i`], type: 'Complex Roots' };
    }
  };

  const solveLinear = (b: number, c: number) => {
    if (b === 0) {
      return c === 0 ? { roots: ['all'], type: 'Infinite Solutions' } : { roots: [], type: 'No Solution' };
    }
    return { roots: [-c / b], type: 'One Solution' };
  };

  const parseAndSolve = () => {
    try {
      const eq = equation.replace(/\s/g, '').toLowerCase();
      
      const parseQuadratic = eq.match(/(-?\d*\.?\d*)x\^2\s*([+-]?\d*\.?\d*)x\s*([+-]?\d*\.?\d*)=0/);
      if (parseQuadratic) {
        const a = parseQuadratic[1] === '' || parseQuadratic[1] === '+' ? 1 : parseQuadratic[1] === '-' ? -1 : parseFloat(parseQuadratic[1]);
        const b = parseQuadratic[2] === '' || parseQuadratic[2] === '+' ? 1 : parseQuadratic[2] === '-' ? -1 : parseFloat(parseQuadratic[2]);
        const c = parseFloat(parseQuadratic[3]) || 0;
        setResult(solveQuadratic(a, b, c));
        return;
      }
      
      const parseLinear = eq.match(/([+-]?\d*\.?\d*)x\s*([+-]?\d*\.?\d*)=0/);
      if (parseLinear) {
        const b = parseLinear[1] === '' || parseLinear[1] === '+' ? 1 : parseLinear[1] === '-' ? -1 : parseFloat(parseLinear[1]);
        const c = parseFloat(parseLinear[2]) || 0;
        setResult(solveLinear(b, c));
        return;
      }
      
      setResult({ roots: [], type: 'Unable to parse' });
    } catch {
      setResult({ roots: [], type: 'Error' });
    }
  };

  const formatRoot = (root: number | string) => {
    if (typeof root === 'string') return root;
    return root.toFixed(6).replace(/\.?0+$/, '');
  };

  const presetEquations = [
    "x^2 + 5*x + 6 = 0",
    "x^2 - 4 = 0",
    "2*x + 3 = 0",
    "x^2 + 1 = 0",
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-8">
            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Equation (ax² + bx + c = 0)</label>
              <input
                className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                type="text"
                value={equation}
                onChange={(e) => setEquation(e.target.value)}
                placeholder="x^2 + 5*x + 6 = 0"
              />
            </div>

            <div className="group">
              <p className="text-neutral-500 text-xs mb-2">Quick Equations</p>
              <div className="flex flex-wrap gap-2">
                {presetEquations.map((eq) => (
                  <button
                    key={eq}
                    onClick={() => setEquation(eq)}
                    className="px-3 py-2 bg-surface-container-highest hover:bg-neutral-700 rounded-lg text-xs text-neutral-300"
                  >
                    {eq}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={parseAndSolve}
              className="w-full py-4 bg-primary-fixed text-on-primary-fixed font-bold rounded-lg text-lg"
            >
              Solve Equation
            </button>

            <button
              onClick={() => { setEquation("x^2 + 5*x + 6 = 0"); setResult(null); }}
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
            <GitBranch className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Solution</span>
          </div>

          {result ? (
            <>
              <div className="bg-surface-container-highest p-6 rounded-xl mb-6">
                <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Type</p>
                <p className="text-2xl font-bold text-white">{result.type}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {result.roots.map((root, i) => (
                  <div key={i} className="bg-surface-container-highest p-6 rounded-xl">
                    <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">
                      x{i + 1}
                    </p>
                    <p className="text-2xl font-bold text-white mono">{formatRoot(root)}</p>
                  </div>
                ))}
              </div>

              {result.roots.length === 0 && (
                <div className="bg-red-500/10 p-6 rounded-xl mt-4">
                  <p className="text-red-400">No real solutions exist</p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 text-neutral-500">
              Enter an equation and click Solve
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EquationSolver;