import { useState, useMemo } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('1990-01-01');

  const age = useMemo(() => {
    if (!birthDate) return { years: 0, months: 0, days: 0 };
    const birth = new Date(birthDate);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months, days };
  }, [birthDate]);

  const nextBirthday = useMemo(() => {
    if (!birthDate) return null;
    const birth = new Date(birthDate);
    const today = new Date();
    const next = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    
    if (next < today) {
      next.setFullYear(today.getFullYear() + 1);
    }
    
    const diff = next.getTime() - today.getTime();
    const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return daysLeft;
  }, [birthDate]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Birth Date</label>
              <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)}
                className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-surface-container-high to-surface-container-low p-8 rounded-xl border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Calendar className="w-32 h-32" />
          </div>
          <label className="block text-[10px] uppercase tracking-[0.2em] text-primary-fixed font-bold mb-4">Your Age</label>
          <div className="grid grid-cols-3 gap-4 text-center mb-6">
            <div>
              <div className="text-5xl font-black text-white">{age.years}</div>
              <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mt-2">Years</div>
            </div>
            <div>
              <div className="text-5xl font-black text-white">{age.months}</div>
              <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mt-2">Months</div>
            </div>
            <div>
              <div className="text-5xl font-black text-white">{age.days}</div>
              <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mt-2">Days</div>
            </div>
          </div>
        </motion.div>

        <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Days Until Birthday</label>
              <p className="text-2xl font-bold text-white mono">{nextBirthday} days</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary-fixed/20 flex items-center justify-center">
              <Clock className="w-6 h-6 text-primary-fixed" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgeCalculator;
