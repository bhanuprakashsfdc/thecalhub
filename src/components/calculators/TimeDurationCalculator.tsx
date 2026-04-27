import { useState } from 'react';
import { Clock } from 'lucide-react';

function TimeDurationCalc() {
  const [hours1, setHours1] = useState(10);
  const [mins1, setMins1] = useState(30);
  const [hours2, setHours2] = useState(14);
  const [mins2, setMins2] = useState(45);
  
  const totalMins1 = hours1 * 60 + mins1;
  const totalMins2 = hours2 * 60 + mins2;
  const diffMins = Math.abs(totalMins2 - totalMins1);
  const diffHours = Math.floor(diffMins / 60);
  const remainingMins = diffMins % 60;
  
  return (
    <div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
      <div className="flex items-center gap-2 text-primary-fixed mb-6"><Clock className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Time Duration</span></div>
      <div className="grid grid-cols-2 gap-8 mb-6">
        <div><p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Start Time</p><div className="grid grid-cols-2 gap-2"><input className="bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={hours1} onChange={(e) => setHours1(Number(e.target.value))} placeholder="HH" /><input className="bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={mins1} onChange={(e) => setMins1(Number(e.target.value))} placeholder="MM" /></div></div>
        <div><p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">End Time</p><div className="grid grid-cols-2 gap-2"><input className="bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={hours2} onChange={(e) => setHours2(Number(e.target.value))} placeholder="HH" /><input className="bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={mins2} onChange={(e) => setMins2(Number(e.target.value))} placeholder="MM" /></div></div>
      </div>
      <div className="bg-surface-container-highest p-6 rounded-xl"><p className="text-neutral-500 text-xs">Duration</p><p className="text-3xl font-bold text-white mono">{diffHours}h {remainingMins}m</p></div>
    </div>
  );
}
export default TimeDurationCalc;