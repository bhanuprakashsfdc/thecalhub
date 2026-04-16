import { useState } from 'react';
import { Calendar, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function DateCalculator() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [result, setResult] = useState<{ days: number; totalHours: number; totalMinutes: number } | null>(null);

  const calculate = () => {
    if (!startDate || !endDate) return;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setResult({
      days: diffDays,
      totalHours: Math.floor(diffTime / (1000 * 60 * 60)),
      totalMinutes: Math.floor(diffTime / (1000 * 60)),
    });
  };

  return (
    <div className="mt-14 p-6 md:p-10 flex-1 overflow-y-auto">
      <div className="mb-12">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Date & Time</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Date Calculator</h2>
        <p className="text-neutral-400 max-w-xl text-lg leading-relaxed">
          Calculate the difference between two dates in days, hours, and minutes.
        </p>
      </div>

      <div className="max-w-lg">
        <div className="bg-surface-container-low rounded-xl p-6 border border-white/5">
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-2">Start Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-surface-container-highest border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-primary-fixed/50 transition-colors"
                />
              </div>
            </div>

            <div className="flex justify-center">
              <ArrowRight className="w-6 h-6 text-neutral-600 rotate-90" />
            </div>

            <div>
              <label className="block text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-2">End Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-surface-container-highest border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-primary-fixed/50 transition-colors"
                />
              </div>
            </div>

            <button
              onClick={calculate}
              className="w-full bg-primary-fixed text-on-primary-fixed p-4 rounded-lg font-bold hover:shadow-[0_0_20px_rgba(214,237,121,0.3)] transition-all duration-200"
            >
              Calculate Difference
            </button>

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-6 bg-surface-container-highest rounded-xl border border-white/5"
              >
                <div className="flex items-center gap-2 text-primary-fixed mb-4">
                  <Calendar className="w-4 h-4" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">Time Difference</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-4xl font-extrabold text-white mb-1">{result.days}</div>
                    <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Days</div>
                  </div>
                  <div>
                    <div className="text-4xl font-extrabold text-white mb-1">{result.totalHours}</div>
                    <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Hours</div>
                  </div>
                  <div>
                    <div className="text-4xl font-extrabold text-white mb-1">{result.totalMinutes}</div>
                    <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Minutes</div>
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