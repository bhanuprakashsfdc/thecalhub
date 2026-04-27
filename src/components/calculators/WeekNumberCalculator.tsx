import { useState } from 'react';
import { Clock } from 'lucide-react';

function WeekNumberCalc() {
  const [date, setDate] = useState('2024-06-15');
  
  const getWeekNumber = () => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return weekNo;
  };
  
  return (
    <div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
      <div className="flex items-center gap-2 text-primary-fixed mb-6"><Clock className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Week Number</span></div>
      <div className="group mb-6"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Enter Date</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white" type="date" value={date} onChange={(e) => setDate(e.target.value)} /></div>
      <div className="bg-surface-container-highest p-6 rounded-xl"><p className="text-neutral-500 text-xs">Week Number</p><p className="text-3xl font-bold text-white mono">{getWeekNumber()}</p></div>
    </div>
  );
}
export default WeekNumberCalc;