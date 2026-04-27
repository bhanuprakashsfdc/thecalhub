import { useState } from 'react';
import { Clock } from 'lucide-react';

function LeapYearCalc() {
  const [year, setYear] = useState(2024);
  const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  
  return (
    <div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
      <div className="flex items-center gap-2 text-primary-fixed mb-6"><Clock className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Leap Year Checker</span></div>
      <div className="group mb-6"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Enter Year</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} /></div>
      <div className="bg-surface-container-highest p-6 rounded-xl"><p className="text-neutral-500 text-xs">Result</p><p className={`text-3xl font-bold ${isLeap ? 'text-green-400' : 'text-red-400'}`}>{isLeap ? 'Leap Year' : 'Not a Leap Year'}</p></div>
    </div>
  );
}
export default LeapYearCalc;