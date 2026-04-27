import { useState } from 'react';
import { Activity } from 'lucide-react';

export function VO2MaxCalculator() {
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState(30);
  const [restingHR, setRestingHR] = useState(60);
  const [hrAfterRun, setHrAfterRun] = useState(160);
  const vo2 = gender === 'male' ? 15.3 * (hrAfterRun - restingHR) / (age + 5) : 15.3 * (hrAfterRun - restingHR) / (age + 5) - 5;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5"><div className="bg-surface-container-low p-8 rounded-xl border border-white/5 space-y-6">
        <div className="grid grid-cols-2 gap-2"><button onClick={() => setGender('male')} className={`py-3 rounded-lg ${gender === 'male' ? 'bg-primary-fixed' : 'bg-surface-container-highest'}`}>Male</button><button onClick={() => setGender('female')} className={`py-3 rounded-lg ${gender === 'female' ? 'bg-primary-fixed' : 'bg-surface-container-highest'}`}>Female</button></div>
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Age</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} /></div>
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Resting HR</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={restingHR} onChange={(e) => setRestingHR(Number(e.target.value))} /></div>
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">HR After Run</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={hrAfterRun} onChange={(e) => setHrAfterRun(Number(e.target.value))} /></div>
      </div></div>
      <div className="lg:col-span-7"><div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
        <div className="flex items-center gap-2 text-primary-fixed mb-6"><Activity className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">VO2 Max</span></div>
        <div className="bg-surface-container-highest p-8 rounded-xl"><p className="text-4xl font-bold text-white mono">{vo2.toFixed(1)} ml/kg/min</p></div>
      </div></div>
    </div>
  );
}
export default VO2MaxCalculator;