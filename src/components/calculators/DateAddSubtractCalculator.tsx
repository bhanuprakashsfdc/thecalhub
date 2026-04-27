import { useState } from 'react';
import { Clock } from 'lucide-react';

function DateAddSubtractCalc() {
  const [date, setDate] = useState('2024-01-01');
  const [days, setDays] = useState(30);
  const [operation, setOperation] = useState('add');
  
  const calcDate = () => {
    const d = new Date(date);
    d.setDate(d.getDate() + (operation === 'add' ? days : -days));
    return d.toISOString().split('T')[0];
  };
  
  return (
    <div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
      <div className="flex items-center gap-2 text-primary-fixed mb-6"><Clock className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Date Add/Subtract</span></div>
      <div className="group mb-4"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Start Date</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white" type="date" value={date} onChange={(e) => setDate(e.target.value)} /></div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Days</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={days} onChange={(e) => setDays(Number(e.target.value))} /></div>
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Operation</label><select className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white" value={operation} onChange={(e) => setOperation(e.target.value)}><option value="add">Add</option><option value="subtract">Subtract</option></select></div>
      </div>
      <div className="bg-surface-container-highest p-6 rounded-xl"><p className="text-neutral-500 text-xs">Result Date</p><p className="text-3xl font-bold text-white mono">{calcDate()}</p></div>
    </div>
  );
}
export default DateAddSubtractCalc;