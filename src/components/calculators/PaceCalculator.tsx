import { useState, useMemo } from 'react';
import { Sparkles, Activity, Timer } from 'lucide-react';
import { motion } from 'motion/react';

export default function PaceCalculator() {
  const [distance, setDistance] = useState(10);
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [unit, setUnit] = useState<'km' | 'miles'>('km');

  const pace = useMemo(() => {
    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    const dist = unit === 'km' ? distance : distance * 1.60934;
    const paceSeconds = totalSeconds / dist;
    const paceMin = Math.floor(paceSeconds / 60);
    const paceSec = Math.floor(paceSeconds % 60);
    return { min: paceMin, sec: paceSec, totalSeconds: paceSeconds };
  }, [distance, hours, minutes, seconds, unit]);

  const splitTimes = useMemo(() => {
    const dist = unit === 'km' ? distance : distance * 1.60934;
    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    const splitSeconds = totalSeconds / dist;
    return [
      { km: 1, time: formatTime(splitSeconds) },
      { km: 5, time: formatTime(splitSeconds * (unit === 'km' ? 5 : 5 * 1.60934)) },
      { km: 10, time: formatTime(splitSeconds * (unit === 'km' ? 10 : 10 * 1.60934)) },
      { km: 21.1, time: formatTime(splitSeconds * (unit === 'km' ? 21.1 : 21.1 * 1.60934)) },
      { km: dist, time: formatTime(totalSeconds) },
    ];
  }, [distance, hours, minutes, seconds, unit]);

  function formatTime(sec: number) {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = Math.floor(sec % 60);
    if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Fitness</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Pace Calculator</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">Calculate your running pace and split times for any distance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Distance</label>
                <div className="flex gap-2">
                  <input type="number" value={distance} onChange={(e) => setDistance(Number(e.target.value))}
                    className="flex-1 bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl outline-none" />
                  <button onClick={() => setUnit(unit === 'km' ? 'miles' : 'km')} className="px-4 py-2 bg-surface-container-highest text-neutral-400 rounded-lg font-bold">{unit}</button>
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Time</label>
                <div className="grid grid-cols-3 gap-2">
                  <div><input type="number" value={hours} onChange={(e) => setHours(Number(e.target.value))} placeholder="Hr" className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-2 text-white mono text-xl text-center" /></div>
                  <div><input type="number" value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} placeholder="Min" className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-2 text-white mono text-xl text-center" /></div>
                  <div><input type="number" value={seconds} onChange={(e) => setSeconds(Number(e.target.value))} placeholder="Sec" className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-2 text-white mono text-xl text-center" /></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-surface-container-high to-surface-container-low p-8 rounded-xl border border-white/5">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-primary-fixed font-bold mb-4">Your Pace</label>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-black text-white mono">{pace.min}:{pace.sec.toString().padStart(2, '0')}</span>
              <span className="text-neutral-400">per {unit}</span>
            </div>
          </motion.div>

          <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
            <h3 className="text-lg font-bold text-white mb-4">Split Times</h3>
            <div className="space-y-2">
              {splitTimes.map((s, i) => (
                <div key={i} className="flex justify-between p-3 bg-surface-container-highest rounded-lg">
                  <span className="text-neutral-400">{s.km}{unit}</span>
                  <span className="text-white mono font-bold">{s.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
