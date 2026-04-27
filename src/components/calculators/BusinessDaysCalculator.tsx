import { useState } from 'react';
import { Clock } from 'lucide-react';

function BusinessDaysCalc() {
  const [start, setStart] = useState('2024-01-01');
  const [end, setEnd] = useState('2024-01-31');
  
  const countBusinessDays = () => {
    let count = 0;
    const d1 = new Date(start);
    const d2 = new Date(end);
    while (d1 <= d2) {
      const day = d1.getDay();
      if (day !== 0 && day !== 6) count++;
      d1.setDate(d1.getDate() + 1);
    }
    return count;
  };
  
  return (
    <div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
      <div className="flex items-center gap-2 text-primary-fixed mb-6"><Clock className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Business Days</span></div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Start Date</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white" type="date" value={start} onChange={(e) => setStart(e.target.value)} /></div>
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">End Date</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white" type="date" value={end} onChange={(e) => setEnd(e.target.value)} /></div>
      </div>
      <div className="bg-surface-container-highest p-6 rounded-xl"><p className="text-neutral-500 text-xs">Business Days</p><p className="text-3xl font-bold text-white mono">{countBusinessDays()}</p></div>
    </div>
  );
}
export default BusinessDaysCalc;