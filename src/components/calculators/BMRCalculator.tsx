import { useState, useMemo } from 'react';
import { Sparkles, Activity, Scale } from 'lucide-react';
import { motion } from 'motion/react';

export default function BMRCalculator() {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState<'male' | 'female'>('male');

  const bmr = useMemo(() => {
    if (gender === 'male') {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }
  }, [weight, height, age, gender]);

  const activityMultipliers = [
    { level: 'Sedentary', factor: 1.2, desc: 'Little or no exercise' },
    { level: 'Light', factor: 1.375, desc: 'Light exercise 1-3 days/week' },
    { level: 'Moderate', factor: 1.55, desc: 'Moderate exercise 3-5 days/week' },
    { level: 'Active', factor: 1.725, desc: 'Hard exercise 6-7 days/week' },
  ];

  const [activityLevel, setActivityLevel] = useState(1.2);

  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Health</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">BMR Calculator</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">
          Calculate your Basal Metabolic Rate - the number of calories your body burns at rest.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Gender</label>
                  <div className="flex gap-2">
                    <button onClick={() => setGender('male')} className={`flex-1 py-3 rounded-lg text-sm font-bold ${gender === 'male' ? 'bg-primary-fixed text-on-primary-fixed' : 'bg-surface-container-highest text-neutral-400'}`}>Male</button>
                    <button onClick={() => setGender('female')} className={`flex-1 py-3 rounded-lg text-sm font-bold ${gender === 'female' ? 'bg-primary-fixed text-on-primary-fixed' : 'bg-surface-container-highest text-neutral-400'}`}>Female</button>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Age</label>
                  <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed text-xl outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Weight (kg)</label>
                <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed text-xl outline-none" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Height (cm)</label>
                <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed text-xl outline-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-surface-container-high to-surface-container-low p-8 rounded-xl border border-white/5">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-primary-fixed font-bold mb-4">Your BMR</label>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-black text-white mono">{Math.round(bmr)}</span>
              <span className="text-neutral-400">calories/day</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Sedentary</label>
                <p className="text-2xl font-bold text-white mono">{Math.round(bmr * 1.2)} cal</p>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Moderate</label>
                <p className="text-2xl font-bold text-primary-fixed mono">{Math.round(bmr * 1.55)} cal</p>
              </div>
            </div>
          </motion.div>

          <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
            <h3 className="text-lg font-bold text-white mb-4">About BMR</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">BMR is the number of calories your body needs to perform basic functions while at rest. This calculator uses the Mifflin-St Jeor equation.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
