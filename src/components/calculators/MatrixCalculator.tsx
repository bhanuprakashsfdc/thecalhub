import { useState, useMemo } from 'react';
import { Grid3X3 } from 'lucide-react';

export function MatrixCalculator() {
  const [size, setSize] = useState(2);
  const [matrixA, setMatrixA] = useState<number[][]>([[1, 2], [3, 4]]);
  const [matrixB, setMatrixB] = useState<number[][]>([[5, 6], [7, 8]]);
  const [operation, setOperation] = useState('add');

  const initMatrix = (s: number) => 
    Array(s).fill(null).map(() => Array(s).fill(0));

  useMemo(() => {
    if (matrixA.length !== size) setMatrixA(initMatrix(size));
    if (matrixB.length !== size) setMatrixB(initMatrix(size));
  }, [size]);

  const result = useMemo(() => {
    const a = matrixA;
    const b = matrixB;
    
    switch (operation) {
      case 'add':
        return a.map((row, i) => row.map((val, j) => val + b[i][j]));
      case 'subtract':
        return a.map((row, i) => row.map((val, j) => val - b[i][j]));
      case 'multiply': {
        const res = initMatrix(size);
        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
            for (let k = 0; k < size; k++) {
              res[i][j] += a[i][k] * b[k][j];
            }
          }
        }
        return res;
      }
      case 'determinant': {
        if (size === 2) {
          return a[0][0] * a[1][1] - a[0][1] * a[1][0];
        }
        if (size === 3) {
          return a[0][0] * (a[1][1] * a[2][2] - a[1][2] * a[2][1])
            - a[0][1] * (a[1][0] * a[2][2] - a[1][2] * a[2][0])
            + a[0][2] * (a[1][0] * a[2][1] - a[1][1] * a[2][0]);
        }
        return null;
      }
      case 'transpose':
        return a[0].map((_, i) => a.map(row => row[i]));
      case 'inverse': {
        const det = size === 2 
          ? a[0][0] * a[1][1] - a[0][1] * a[1][0]
          : a[0][0] * (a[1][1] * a[2][2] - a[1][2] * a[2][1])
            - a[0][1] * (a[1][0] * a[2][2] - a[1][2] * a[2][0])
            + a[0][2] * (a[1][0] * a[2][1] - a[1][1] * a[2][0]);
        if (det === 0) return null;
        
        if (size === 2) {
          return [[a[1][1] / det, -a[0][1] / det], [-a[1][0] / det, a[0][0] / det]];
        }
        return null;
      }
      default:
        return null;
    }
  }, [matrixA, matrixB, operation, size]);

  const updateMatrix = (m: 'A' | 'B', i: number, j: number, val: number) => {
    if (m === 'A') {
      const newA = [...matrixA];
      newA[i] = [...newA[i]];
      newA[i][j] = val;
      setMatrixA(newA);
    } else {
      const newB = [...matrixB];
      newB[i] = [...newB[i]];
      newB[i][j] = val;
      setMatrixB(newB);
    }
  };

  const operations = [
    { label: 'Add', value: 'add' },
    { label: 'Sub', value: 'subtract' },
    { label: 'Mult', value: 'multiply' },
    { label: 'Det', value: 'determinant' },
    { label: 'Trans', value: 'transpose' },
    { label: 'Inv', value: 'inverse' },
  ];

  const renderMatrix = (matrix: number[][] | number | null, label: string) => (
    <div className="bg-surface-container-highest p-4 rounded-xl">
      <p className="text-neutral-500 text-xs uppercase tracking-wider mb-3">{label}</p>
      {typeof matrix === 'number' ? (
        <p className="text-2xl font-bold text-white mono">{matrix.toFixed(2)}</p>
      ) : matrix ? (
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
          {matrix.map((row, i) => 
            row.map((val, j) => (
              <input
                key={`${i}-${j}`}
                className="w-16 h-12 bg-surface-container-low border-none rounded-lg text-center text-white mono text-lg focus:ring-1 focus:ring-primary-fixed outline-none"
                type="number"
                value={val}
                readOnly
              />
            ))
          )}
        </div>
      ) : (
        <p className="text-red-400">Error: Matrix is singular</p>
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-8">
            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Matrix Size</label>
              <div className="grid grid-cols-3 gap-2">
                {[2, 3].map((s) => (
                  <button
                    key={s}
                    onClick={() => { setSize(s); setMatrixA(initMatrix(s)); setMatrixB(initMatrix(s)); }}
                    className={`py-3 rounded-lg text-sm font-medium transition-colors ${
                      size === s
                        ? "bg-primary-fixed text-on-primary-fixed font-bold"
                        : "bg-surface-container-highest hover:bg-neutral-700 text-neutral-300"
                    }`}
                  >
                    {s}x{s}
                  </button>
                ))}
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
                    {op.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Matrix A</label>
              <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
                {matrixA.map((row, i) => 
                  row.map((val, j) => (
                    <input
                      key={`a-${i}-${j}`}
                      className="w-full h-12 bg-surface-container-highest border-none rounded-lg text-center text-white mono text-lg focus:ring-1 focus:ring-primary-fixed outline-none"
                      type="number"
                      value={val}
                      onChange={(e) => updateMatrix('A', i, j, Number(e.target.value))}
                    />
                  ))
                )}
              </div>
            </div>

            {(operation === 'add' || operation === 'subtract' || operation === 'multiply') && (
              <div className="group">
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Matrix B</label>
                <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
                  {matrixB.map((row, i) => 
                    row.map((val, j) => (
                      <input
                        key={`b-${i}-${j}`}
                        className="w-full h-12 bg-surface-container-highest border-none rounded-lg text-center text-white mono text-lg focus:ring-1 focus:ring-primary-fixed outline-none"
                        type="number"
                        value={val}
                        onChange={(e) => updateMatrix('B', i, j, Number(e.target.value))}
                      />
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="flex items-center gap-2 text-primary-fixed mb-6">
            <Grid3X3 className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Result</span>
          </div>
          {renderMatrix(result, 'Result')}
        </div>
      </div>
    </div>
  );
}

export default MatrixCalculator;