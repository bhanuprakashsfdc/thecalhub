import { useState, useMemo, useRef, useEffect } from 'react';
import { Flame } from 'lucide-react';
import { motion } from 'motion/react';

export function CalorieCalculator() {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activityLevel, setActivityLevel] = useState(1.2);
  const resultRef = useRef<HTMLDivElement>(null);

  const bmr = useMemo(() => {
    if (gender === 'male') {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }
  }, [weight, height, age, gender]);

  const tdee = useMemo(() => Math.round(bmr * activityLevel), [bmr, activityLevel]);

  // Screen reader announcement
  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.textContent = `Your daily calorie needs: ${tdee} calories per day`;
    }
  }, [tdee]);

  const activityLevels = [
    { level: 'Sedentary', factor: 1.2, desc: 'Little or no exercise' },
    { level: 'Light', factor: 1.375, desc: 'Light exercise 1-3 days/week' },
    { level: 'Moderate', factor: 1.55, desc: 'Moderate exercise 3-5 days/week' },
    { level: 'Very Active', factor: 1.725, desc: 'Hard exercise 6-7 days/week' },
    { level: 'Extra Active', factor: 1.9, desc: 'Very hard exercise' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Gender</label>
                <div className="flex gap-2" role="radiogroup" aria-label="Gender selection">
                  <button onClick={() => setGender('male')} role="radio" aria-checked={gender === 'male'} className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${gender === 'male' ? 'bg-primary-fixed text-on-primary-fixed shadow-lg' : 'bg-surface-container-highest text-neutral-400 hover:text-white'}`}>Male</button>
                  <button onClick={() => setGender('female')} role="radio" aria-checked={gender === 'female'} className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${gender === 'female' ? 'bg-primary-fixed text-on-primary-fixed shadow-lg' : 'bg-surface-container-highest text-neutral-400 hover:text-white'}`}>Female</button>
                </div>
              </div>
              <div>
                <label htmlFor="calorie-age" className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Age</label>
                <input id="calorie-age" type="number" value={age} onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl outline-none focus:ring-1 focus:ring-primary-fixed transition-all" />
              </div>
            </div>
            <div>
              <label htmlFor="calorie-weight" className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Weight (kg)</label>
              <input id="calorie-weight" type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl outline-none focus:ring-1 focus:ring-primary-fixed transition-all" />
            </div>
            <div>
              <label htmlFor="calorie-height" className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Height (cm)</label>
              <input id="calorie-height" type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl outline-none focus:ring-1 focus:ring-primary-fixed transition-all" />
            </div>
            <div>
              <label htmlFor="calorie-activity" className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Activity Level</label>
              <select id="calorie-activity" value={activityLevel} onChange={(e) => setActivityLevel(Number(e.target.value))}
                className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-lg outline-none focus:ring-1 focus:ring-primary-fixed transition-all appearance-none cursor-pointer">
                {activityLevels.map(a => <option key={a.factor} value={a.factor}>{a.level} - {a.desc}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-surface-container-high to-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><Flame className="w-32 h-32 text-primary-fixed" /></div>
          <span className="block text-[10px] uppercase tracking-[0.2em] text-primary-fixed font-bold mb-4" id="calorie-result-label">Daily Calorie Needs</span>
          <div aria-live="polite" aria-atomic="true" className="sr-only" ref={resultRef}></div>
          <div className="flex items-baseline gap-2 mb-8" role="status" aria-live="polite">
            <span className="text-5xl font-black text-white mono" aria-labelledby="calorie-result-label">{tdee}</span>
            <span className="text-neutral-400 font-bold uppercase tracking-widest text-xs">calories/day</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-surface-container-highest/50 border border-white/5 rounded-xl text-center group-hover:bg-surface-container-highest transition-colors">
              <div className="text-[10px] text-neutral-500 font-black uppercase tracking-widest mb-1">Weight Loss</div>
              <div className="text-xl font-black text-white mono">{tdee - 500}</div>
            </div>
            <div className="p-4 bg-primary-fixed/10 border border-primary-fixed/20 rounded-xl text-center group-hover:bg-primary-fixed/20 transition-colors">
              <div className="text-[10px] text-primary-fixed font-black uppercase tracking-widest mb-1">Maintain</div>
              <div className="text-xl font-black text-white mono">{tdee}</div>
            </div>
            <div className="p-4 bg-surface-container-highest/50 border border-white/5 rounded-xl text-center group-hover:bg-surface-container-highest transition-colors">
              <div className="text-[10px] text-neutral-500 font-black uppercase tracking-widest mb-1">Weight Gain</div>
              <div className="text-xl font-black text-white mono">{tdee + 500}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default CalorieCalculator;
