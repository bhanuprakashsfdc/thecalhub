import { useState } from 'react';
import { Sparkles, Scale, Activity } from 'lucide-react';
import { motion } from 'motion/react';

export default function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [result, setResult] = useState<{ bmi: number; category: string; color: string } | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) return;

    let bmi: number;
    if (unit === 'metric') {
      bmi = w / ((h / 100) * (h / 100));
    } else {
      bmi = (w * 703) / (h * h);
    }

    let category: string;
    let color: string;
    if (bmi < 18.5) { category = 'Underweight'; color = '#3b82f6'; }
    else if (bmi < 25) { category = 'Normal'; color = '#22c55e'; }
    else if (bmi < 30) { category = 'Overweight'; color = '#f59e0b'; }
    else { category = 'Obese'; color = '#ef4444'; }

    setResult({ bmi, category, color });
  };

  const tipAmounts = ['10', '15', '18', '20', '25'];

  return (
    <div className="mt-14 p-6 md:p-10 flex-1 overflow-y-auto">
      <div className="mb-12">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Health</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">BMI Calculator</h2>
        <p className="text-neutral-400 max-w-xl text-lg leading-relaxed">
          Calculate your Body Mass Index to determine your weight category.
        </p>
      </div>

      <div className="max-w-lg">
        <div className="bg-surface-container-low rounded-xl p-6 border border-white/5">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setUnit('metric')}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                unit === 'metric' ? 'bg-primary-fixed text-on-primary-fixed' : 'bg-surface-container-highest text-neutral-400 hover:text-white'
              }`}
            >
              Metric (kg/cm)
            </button>
            <button
              onClick={() => setUnit('imperial')}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                unit === 'imperial' ? 'bg-primary-fixed text-on-primary-fixed' : 'bg-surface-container-highest text-neutral-400 hover:text-white'
              }`}
            >
              Imperial (lbs/in)
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-2">
                Weight ({unit === 'metric' ? 'kg' : 'lbs'})
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="0"
                className="w-full bg-surface-container-highest border border-white/10 rounded-lg p-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-primary-fixed/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-2">
                Height ({unit === 'metric' ? 'cm' : 'inches'})
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="0"
                className="w-full bg-surface-container-highest border border-white/10 rounded-lg p-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-primary-fixed/50 transition-colors"
              />
            </div>

            <button
              onClick={calculate}
              className="w-full bg-primary-fixed text-on-primary-fixed p-4 rounded-lg font-bold hover:shadow-[0_0_20px_rgba(214,237,121,0.3)] transition-all duration-200"
            >
              Calculate BMI
            </button>

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-6 bg-surface-container-highest rounded-xl border border-white/5"
              >
                <div className="flex items-center gap-2 text-primary-fixed mb-4">
                  <Scale className="w-4 h-4" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">Your BMI</span>
                </div>
                <div className="text-center space-y-3">
                  <div className="text-5xl font-extrabold text-white">{result.bmi.toFixed(1)}</div>
                  <div
                    className="inline-block px-4 py-1 rounded-full text-sm font-bold"
                    style={{ backgroundColor: `${result.color}20`, color: result.color }}
                  >
                    {result.category}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}