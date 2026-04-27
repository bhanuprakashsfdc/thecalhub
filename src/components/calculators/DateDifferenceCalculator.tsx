import { useState } from 'react';
import { Clock } from 'lucide-react';

function DateDifferenceCalc() {
  const [date1, setDate1] = useState('2024-01-01');
  const [date2, setDate2] = useState('2024-12-31');
  
  const diff = () => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    return { days: diffDays, weeks: diffWeeks };
  };
  
  const result = diff();
  
  return (
    <div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
      <div className="flex items-center gap-2 text-primary-fixed mb-6"><Clock className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Date Difference</span></div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Start Date</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white" type="date" value={date1} onChange={(e) => setDate1(e.target.value)} /></div>
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">End Date</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white" type="date" value={date2} onChange={(e) => setDate2(e.target.value)} /></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-surface-container-highest p-6 rounded-xl"><p className="text-neutral-500 text-xs">Days</p><p className="text-3xl font-bold text-white mono">{result.days}</p></div>
        <div className="bg-surface-container-highest p-6 rounded-xl"><p className="text-neutral-500 text-xs">Weeks</p><p className="text-3xl font-bold text-white mono">{result.weeks}</p></div>
      </div>
    </div>
  );
}
export default DateDifferenceCalc;