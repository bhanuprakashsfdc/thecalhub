import { useState, useMemo } from 'react';
import { Activity } from 'lucide-react';
import { motion } from 'motion/react';

export function BMRCalculator() {
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

  const activityMultipliers = [
    { level: 'Sedentary', factor: 1.2, desc: 'Little or no exercise' },
    { level: 'Light', factor: 1.375, desc: 'Light exercise 1-3 days/week' },
    { level: 'Moderate', factor: 1.55, desc: 'Moderate exercise 3-5 days/week' },
    { level: 'Active', factor: 1.725, desc: 'Hard exercise 6-7 days/week' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Gender</label>
                <div className="flex gap-2">
                  <button onClick={() => setGender('male')} className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${gender === 'male' ? 'bg-primary-fixed text-on-primary-fixed shadow-lg' : 'bg-surface-container-highest text-neutral-400 hover:text-white'}`}>Male</button>
                  <button onClick={() => setGender('female')} className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${gender === 'female' ? 'bg-primary-fixed text-on-primary-fixed shadow-lg' : 'bg-surface-container-highest text-neutral-400 hover:text-white'}`}>Female</button>
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Age</label>
                <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed text-xl outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3"> Weight (kg)</label>
              <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed text-xl outline-none" />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3"> Height (cm)</label>
              <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed text-xl outline-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-surface-container-high to-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Activity className="w-32 h-32 text-primary-fixed" />
          </div>
          <label className="block text-[10px] uppercase tracking-[0.2em] text-primary-fixed font-bold mb-4">Your BMR</label>
          <div className="flex items-baseline gap-2 mb-8">
            <span className="text-5xl font-black text-white mono">{Math.round(bmr)}</span>
            <span className="text-neutral-400 font-bold uppercase tracking-widest text-xs">calories/day</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-surface-container-highest/50 border border-white/5 rounded-xl text-center group-hover:bg-surface-container-highest transition-colors">
              <div className="text-[10px] text-neutral-500 font-black uppercase tracking-widest mb-1">BMR</div>
              <div className="text-xl font-bold text-white mono">{Math.round(bmr)}</div>
            </div>
            <div className="p-4 bg-primary-fixed/10 border border-primary-fixed/20 rounded-xl text-center group-hover:bg-primary-fixed/20 transition-colors">
              <div className="text-[10px] text-primary-fixed font-black uppercase tracking-widest mb-1">TDEE</div>
              <div className="text-xl font-bold text-white mono">{Math.round(bmr * activityLevel)}</div>
            </div>
          </div>
        </motion.div>

        <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
          <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-4">Activity Multipliers</label>
          <div className="grid grid-cols-2 gap-2">
            {activityMultipliers.map(a => (
              <button key={a.factor} onClick={() => setActivityLevel(a.factor)}
                className={`p-3 rounded-lg text-sm font-medium transition-all ${activityLevel === a.factor ? 'bg-primary-fixed text-on-primary-fixed shadow-lg' : 'bg-surface-container-highest text-neutral-400 hover:text-white'}`}>
                {a.level}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BMRCalculator;
