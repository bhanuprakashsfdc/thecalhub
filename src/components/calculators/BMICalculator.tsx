import { useState, useMemo, useRef, useEffect } from 'react';
import { Scale } from 'lucide-react';
import { motion } from 'motion/react';

export function BMICalculator() {
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(170);
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const resultRef = useRef<HTMLDivElement>(null);

  const bmi = useMemo(() => {
    const w = weight;
    const h = height;
    if (w <= 0 || h <= 0) return { value: 0, category: 'Normal', color: '#22c55e' };

    let bmiValue: number;
    if (unit === 'metric') {
      bmiValue = w / ((h / 100) * (h / 100));
    } else {
      bmiValue = (w * 703) / (h * h);
    }

    let category: string;
    let color: string;
    if (bmiValue < 18.5) { category = 'Underweight'; color = '#3b82f6'; }
    else if (bmiValue < 25) { category = 'Normal'; color = '#22c55e'; }
    else if (bmiValue < 30) { category = 'Overweight'; color = '#f59e0b'; }
    else { category = 'Obese'; color = '#ef4444'; }

    return { value: bmiValue, category, color };
  }, [weight, height, unit]);

  // Screen reader announcement
  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.textContent = `Your BMI is ${bmi.value.toFixed(1)}, category: ${bmi.category}`;
    }
  }, [bmi]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-surface-container-low p-8 rounded-2xl border border-white/5 shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary-fixed/10 flex items-center justify-center">
              <Scale className="w-5 h-5 text-primary-fixed" />
            </div>
            <h2 className="text-xl font-bold text-white">Body Metrics</h2>
          </div>

          <div className="space-y-8">
            <div className="flex p-1 bg-surface-container-highest rounded-xl w-fit">
              <button
                onClick={() => setUnit('metric')}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${unit === 'metric' ? 'bg-primary-fixed text-on-primary-fixed shadow-lg' : 'text-neutral-500 hover:text-white'}`}
              >
                Metric
              </button>
              <button
                onClick={() => setUnit('imperial')}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${unit === 'imperial' ? 'bg-primary-fixed text-on-primary-fixed shadow-lg' : 'text-neutral-500 hover:text-white'}`}
              >
                Imperial
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold">Weight ({unit === 'metric' ? 'kg' : 'lbs'})</label>
                  <span className="text-white font-bold mono">{weight} {unit === 'metric' ? 'kg' : 'lbs'}</span>
                </div>
                <input
                  type="range"
                  min={unit === 'metric' ? "30" : "60"}
                  max={unit === 'metric' ? "200" : "450"}
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full h-1.5 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary-fixed"
                />
              </div>

              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold">Height ({unit === 'metric' ? 'cm' : 'in'})</label>
                  <span className="text-white font-bold mono">{height} {unit === 'metric' ? 'cm' : 'in'}</span>
                </div>
                <input
                  type="range"
                  min={unit === 'metric' ? "100" : "40"}
                  max={unit === 'metric' ? "250" : "100"}
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full h-1.5 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary-fixed"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-low p-8 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 transition-colors" style={{ backgroundColor: bmi.color }}></div>
          
          <div className="mb-6 relative">
            <div className="w-40 h-40 rounded-full border-8 border-white/5 flex flex-col items-center justify-center relative z-10">
              <span className="text-5xl font-black text-white mono mb-1">{bmi.value.toFixed(1)}</span>
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">BMI Index</span>
            </div>
            <motion.div 
              animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 rounded-full blur-3xl -z-0"
              style={{ backgroundColor: bmi.color }}
            />
          </div>

          <div 
            ref={resultRef}
            className="px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest mb-4 shadow-lg transition-all"
            style={{ backgroundColor: `${bmi.color}20`, color: bmi.color, border: `1px solid ${bmi.color}40` }}
          >
            {bmi.category}
          </div>

          <p className="text-neutral-400 text-sm max-w-[240px] leading-relaxed">
            {bmi.category === 'Normal' ? 'Great job! You are in the healthy weight range.' : 
             bmi.category === 'Underweight' ? 'Consider consulting a nutritionist for a balanced weight gain plan.' :
             'Maintaining a healthy diet and regular exercise can help optimize your BMI.'}
          </p>
        </div>
      </div>
    </div>
  );
}
export default BMICalculator;
