import { useState, useRef, useEffect } from 'react';
import { LineChart } from 'lucide-react';

export function GraphingCalculator() {
  const [equation, setEquation] = useState("y = x^2");
  const [xMin, setXMin] = useState(-10);
  const [xMax, setXMax] = useState(10);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const functions: { label: string; eq: string }[] = [
    { label: 'Linear', eq: 'y = x' },
    { label: 'Quadratic', eq: 'y = x^2' },
    { label: 'Cubic', eq: 'y = x^3' },
    { label: 'Sine', eq: 'y = Math.sin(x)' },
    { label: 'Cosine', eq: 'y = Math.cos(x)' },
    { label: 'Exponential', eq: 'y = Math.exp(x)' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const scaleX = width / (xMax - xMin);
    const scaleY = height / 20;
    const centerY = height / 2;
    const centerX = width / 2;

    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    for (let x = 0; x <= width; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y <= height; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    ctx.strokeStyle = '#666';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();

    try {
      const expr = equation.replace(/y\s*=\s*/i, '').replace(/sin/g, 'Math.sin').replace(/cos/g, 'Math.cos').replace(/tan/g, 'Math.tan').replace(/exp/g, 'Math.exp').replace(/sqrt/g, 'Math.sqrt').replace(/abs/g, 'Math.abs').replace(/log/g, 'Math.log').replace(/pi/g, 'Math.PI').replace(/\^/g, '**');
      
      ctx.strokeStyle = '#D6ED79';
      ctx.lineWidth = 3;
      ctx.beginPath();

      let started = false;
      for (let px = 0; px < width; px++) {
        const xVal = xMin + px / scaleX;
        try {
          const yVal = eval(expr.replace(/x/g, `(${xVal})`));
          if (Number.isFinite(yVal)) {
            const py = centerY - yVal * scaleY;
            if (!started) {
              ctx.moveTo(px, py);
              started = true;
            } else {
              ctx.lineTo(px, py);
            }
          }
        } catch {}
      }
      ctx.stroke();
    } catch {
      ctx.fillStyle = 'white';
      ctx.font = '16px monospace';
      ctx.fillText('Invalid equation', 10, 30);
    }

    ctx.fillStyle = 'white';
    ctx.font = '12px monospace';
    ctx.fillText(`x: ${xMin} to ${xMax}`, 10, height - 10);
  }, [equation, xMin, xMax]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-8">
            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Function f(x)</label>
              <input
                className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                type="text"
                value={equation}
                onChange={(e) => setEquation(e.target.value)}
                placeholder="y = x^2"
              />
            </div>

            <div className="group">
              <p className="text-neutral-500 text-xs mb-2">Quick Functions</p>
              <div className="flex flex-wrap gap-2">
                {functions.map((f) => (
                  <button
                    key={f.label}
                    onClick={() => setEquation(f.eq)}
                    className="px-3 py-2 bg-surface-container-highest hover:bg-neutral-700 rounded-lg text-xs text-neutral-300"
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">X Range</label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  type="number"
                  value={xMin}
                  onChange={(e) => setXMin(Number(e.target.value))}
                />
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  type="number"
                  value={xMax}
                  onChange={(e) => setXMax(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="flex items-center gap-2 text-primary-fixed mb-6">
            <LineChart className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Graph</span>
          </div>

          <div className="bg-surface-container-highest p-4 rounded-xl">
            <canvas
              ref={canvasRef}
              width={600}
              height={300}
              className="w-full h-auto rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GraphingCalculator;