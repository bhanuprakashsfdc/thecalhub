import { useState } from 'react';
import { Clock } from 'lucide-react';

function TimeZoneCalc() {
  const [time, setTime] = useState('12:00');
  const [from, setFrom] = useState('UTC');
  const [to, setTo] = useState('IST');
  
  const offsets: Record<string, number> = { UTC: 0, IST: 5.5, EST: -5, PST: -8, GMT: 0, JST: 9, AEST: 10 };
  
  const convert = () => {
    const [hours, mins] = time.split(':').map(Number);
    let totalMins = hours * 60 + mins + (offsets[to] - offsets[from]) * 60;
    if (totalMins < 0) totalMins += 24 * 60;
    if (totalMins >= 24 * 60) totalMins -= 24 * 60;
    const newHours = Math.floor(totalMins / 60);
    const newMins = totalMins % 60;
    return `${newHours.toString().padStart(2, '0')}:${newMins.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
      <div className="flex items-center gap-2 text-primary-fixed mb-6"><Clock className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Time Zone Converter</span></div>
      <div className="group mb-4"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Time</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="time" value={time} onChange={(e) => setTime(e.target.value)} /></div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">From</label><select className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white" value={from} onChange={(e) => setFrom(e.target.value)}>{Object.keys(offsets).map(z => <option key={z} value={z}>{z}</option>)}</select></div>
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">To</label><select className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white" value={to} onChange={(e) => setTo(e.target.value)}>{Object.keys(offsets).map(z => <option key={z} value={z}>{z}</option>)}</select></div>
      </div>
      <div className="bg-surface-container-highest p-6 rounded-xl"><p className="text-neutral-500 text-xs">Converted Time</p><p className="text-3xl font-bold text-white mono">{convert()}</p></div>
    </div>
  );
}
export default TimeZoneCalc;