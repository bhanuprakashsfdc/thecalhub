import { useState, useMemo } from 'react';
import { Sparkles, Scale, Activity } from 'lucide-react';
import { motion } from 'motion/react';

export default function BMICalculator() {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');

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

  const categories = [
    { range: 'Below 18.5', label: 'Underweight', color: '#3b82f6', min: 0, max: 18.5 },
    { range: '18.5 - 24.9', label: 'Normal', color: '#22c55e', min: 18.5, max: 25 },
    { range: '25 - 29.9', label: 'Overweight', color: '#f59e0b', min: 25, max: 30 },
    { range: '30 and above', label: 'Obese', color: '#ef4444', min: 30, max: 100 },
  ];

  const getCategoryPosition = (bmiValue: number) => {
    if (bmiValue < 18.5) return 12;
    if (bmiValue < 25) return 37;
    if (bmiValue < 30) return 62;
    return 87;
  };

  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Health</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">BMI Calculator</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">
          Calculate your Body Mass Index to determine your weight category. Our free BMI calculator helps you understand your body weight status.
        </p>
        <div className="flex gap-2 mt-4">
          <span className="text-xs px-2 py-1 bg-white/5 text-neutral-400 rounded">BMI</span>
          <span className="text-xs px-2 py-1 bg-white/5 text-neutral-400 rounded">Weight</span>
          <span className="text-xs px-2 py-1 bg-white/5 text-neutral-400 rounded">Health</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
            <div className="space-y-6">
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setUnit('metric')}
                  className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${
                    unit === 'metric' ? 'bg-primary-fixed text-on-primary-fixed' : 'bg-surface-container-highest text-neutral-400 hover:text-white'
                  }`}
                >
                  Metric (kg/cm)
                </button>
                <button
                  onClick={() => setUnit('imperial')}
                  className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${
                    unit === 'imperial' ? 'bg-primary-fixed text-on-primary-fixed' : 'bg-surface-container-highest text-neutral-400 hover:text-white'
                  }`}
                >
                  Imperial (lbs/in)
                </button>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">
                  Weight ({unit === 'metric' ? 'kg' : 'lbs'})
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">
                  Height ({unit === 'metric' ? 'cm' : 'inches'})
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-surface-container-high to-surface-container-low p-8 rounded-xl border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Scale className="w-32 h-32" />
            </div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-primary-fixed font-bold mb-4">Your BMI</label>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-black text-white mono">{bmi.value.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-3">
              <span
                className="inline-block px-4 py-2 rounded-full text-lg font-bold"
                style={{ backgroundColor: `${bmi.color}20`, color: bmi.color }}
              >
                {bmi.category}
              </span>
            </div>
          </motion.div>

          <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-4">BMI Scale</label>
            <div className="relative h-8 rounded-full overflow-hidden bg-surface-container-highest">
              <div className="absolute inset-0 flex">
                {categories.map((cat, i) => (
                  <div key={i} className="flex-1 flex items-center justify-center text-[10px] font-bold text-white/70" style={{ backgroundColor: cat.color }}>
                    {cat.label}
                  </div>
                ))}
              </div>
              <div 
                className="absolute top-0 w-2 h-full bg-white transition-all duration-300"
                style={{ left: `${getCategoryPosition(bmi.value)}%`, transform: 'translateX(-50%)' }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-neutral-500">
              <span>0</span>
              <span>18.5</span>
              <span>25</span>
              <span>30</span>
              <span>40+</span>
            </div>
          </div>

          <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
            <h3 className="text-lg font-bold text-white mb-4">About BMI Calculator</h3>
            <p className="text-neutral-400 text-sm leading-relaxed mb-4">Body Mass Index (BMI) is a measure of body fat based on height and weight that applies to adult men and women.</p>
            <p className="text-neutral-400 text-sm leading-relaxed"><strong>Formula:</strong> BMI = weight(kg) / height(m)² or BMI = (weight(lbs) / height(in)²) × 703</p>
            <p className="text-neutral-400 text-sm leading-relaxed mt-4"><strong>Note:</strong> BMI is a general indicator and doesn't account for muscle mass, bone density, or overall body composition.</p>
          </div>
        </div>
      </div>
    </div>
  );
}