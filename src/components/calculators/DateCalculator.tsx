import { useState, useMemo } from 'react';
import { Calendar } from 'lucide-react';
import { motion } from 'motion/react';

export function DateCalculator() {
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Start Date</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none" />
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
          className="bg-gradient-to-br from-surface-container-high to-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Calendar className="w-32 h-32 text-primary-fixed" />
          </div>
          <label className="block text-[10px] uppercase tracking-[0.2em] text-primary-fixed font-bold mb-4">Duration</label>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-5xl font-black text-white mono">{diff.days}</div>
              <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mt-2">Days</div>
            </div>
            <div>
              <div className="text-5xl font-black text-white mono">{diff.weeks}</div>
              <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mt-2">Weeks</div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
            <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-2">Total Hours</div>
            <div className="text-2xl font-black text-white mono">{diff.totalHours.toLocaleString()}</div>
          </div>
          <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
            <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-2">Total Minutes</div>
            <div className="text-2xl font-black text-white mono">{diff.totalMinutes.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DateCalculator;
