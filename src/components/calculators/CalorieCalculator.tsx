import { useState, useMemo } from 'react';
import { Sparkles, Activity, Flame } from 'lucide-react';
import { motion } from 'motion/react';

export default function CalorieCalculator() {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activityLevel, setActivityLevel] = useState(1.2);

  const bmr = useMemo(() => {
    if (gender === 'male') {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }
  }, [weight, height, age, gender]);

  const tdee = useMemo(() => Math.round(bmr * activityLevel), [bmr, activityLevel]);

  const activityLevels = [
    { level: 'Sedentary', factor: 1.2, desc: 'Little or no exercise' },
    { level: 'Light', factor: 1.375, desc: 'Light exercise 1-3 days/week' },
    { level: 'Moderate', factor: 1.55, desc: 'Moderate exercise 3-5 days/week' },
    { level: 'Very Active', factor: 1.725, desc: 'Hard exercise 6-7 days/week' },
    { level: 'Extra Active', factor: 1.9, desc: 'Very hard exercise' },
  ];

  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Health</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Calorie Calculator</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">
          Calculate your daily calorie needs based on your BMR and activity level.
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
                    className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Weight (kg)</label>
                <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl outline-none" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Height (cm)</label>
                <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl outline-none" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Activity Level</label>
                <select value={activityLevel} onChange={(e) => setActivityLevel(Number(e.target.value))}
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl outline-none">
                  {activityLevels.map(a => <option key={a.factor} value={a.factor}>{a.level} - {a.desc}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-surface-container-high to-surface-container-low p-8 rounded-xl border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><Flame className="w-32 h-32" /></div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-primary-fixed font-bold mb-4">Daily Calorie Needs</label>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-black text-white mono">{tdee}</span>
              <span className="text-neutral-400">calories/day</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-surface-container-highest rounded-lg">
                <div className="text-[10px] text-neutral-500 uppercase">Weight Loss</div>
                <div className="text-xl font-bold text-white mono">{tdee - 500}</div>
              </div>
              <div className="p-4 bg-surface-container-highest rounded-lg">
                <div className="text-[10px] text-neutral-500 uppercase">Maintain</div>
                <div className="text-xl font-bold text-white mono">{tdee}</div>
              </div>
              <div className="p-4 bg-surface-container-highest rounded-lg">
                <div className="text-[10px] text-neutral-500 uppercase">Gain</div>
                <div className="text-xl font-bold text-primary-fixed mono">{tdee + 500}</div>
              </div>
            </div>
          </motion.div>

          <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
            <h3 className="text-lg font-bold text-white mb-4">About Calorie Calculator</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">TDEE (Total Daily Energy Expenditure) is the total calories you burn per day based on your BMR and activity level.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
