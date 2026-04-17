import { useState, useMemo } from 'react';
import { Calendar, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function DateCalculator() {
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-12-31');

  const diff = useMemo(() => {
    if (!startDate || !endDate) return { days: 0, totalHours: 0, totalMinutes: 0, weeks: 0 };
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return {
      days: diffDays,
      totalHours: Math.floor(diffTime / (1000 * 60 * 60)),
      totalMinutes: Math.floor(diffTime / (1000 * 60)),
      weeks: Math.floor(diffDays / 7),
    };
  }, [startDate, endDate]);

  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Date & Time</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Date Calculator</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">
          Calculate the difference between two dates in days, weeks, hours, and minutes. Our free date calculator helps you plan events and deadlines.
        </p>
        <div className="flex gap-2 mt-4">
          <span className="text-xs px-2 py-1 bg-white/5 text-neutral-400 rounded">Date</span>
          <span className="text-xs px-2 py-1 bg-white/5 text-neutral-400 rounded">Days</span>
          <span className="text-xs px-2 py-1 bg-white/5 text-neutral-400 rounded">Duration</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Start Date</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none" />
              </div>

              <div className="flex justify-center">
                <ArrowRight className="w-6 h-6 text-neutral-600 rotate-90 lg:rotate-0" />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">End Date</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}
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
            <label className="block text-[10px] uppercase tracking-[0.2em] text-primary-fixed font-bold mb-4">Time Difference</label>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-5xl font-black text-white">{diff.days}</div>
                <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mt-2">Days</div>
              </div>
              <div>
                <div className="text-5xl font-black text-white">{diff.weeks}</div>
                <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mt-2">Weeks</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Hours</label>
                <p className="text-2xl font-bold text-white mono">{diff.totalHours.toLocaleString()}</p>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Minutes</label>
                <p className="text-2xl font-bold text-primary-fixed mono">{diff.totalMinutes.toLocaleString()}</p>
              </div>
            </div>
          </motion.div>

          <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
            <h3 className="text-lg font-bold text-white mb-4">About Date Calculator</h3>
            <p className="text-neutral-400 text-sm leading-relaxed mb-4">This calculator computes the exact time difference between two dates.</p>
            <p className="text-neutral-400 text-sm leading-relaxed"><strong>Use cases:</strong> Project timelines, event planning, age calculation, vacation tracking.</p>
          </div>
        </div>
      </div>
    </div>
  );
}