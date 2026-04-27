import { useState } from 'react';
import { Activity } from 'lucide-react';

export function BodyFatCalculator() {
  const [gender, setGender] = useState('male');
  const [waist, setWaist] = useState(36);
  const [neck, setNeck] = useState(15);
  const [height, setHeight] = useState(70);
  const [hip, setHip] = useState(40);

  const calculate = () => {
    if (gender === 'male') {
      return (495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height))) - 450;
    } else {
      return (495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height))) - 450;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5"><div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl space-y-6">
        <div className="grid grid-cols-2 gap-2"><button onClick={() => setGender('male')} className={`py-3 rounded-lg font-medium ${gender === 'male' ? 'bg-primary-fixed' : 'bg-surface-container-highest'}`}>Male</button><button onClick={() => setGender('female')} className={`py-3 rounded-lg font-medium ${gender === 'female' ? 'bg-primary-fixed' : 'bg-surface-container-highest'}`}>Female</button></div>
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Waist (in)</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={waist} onChange={(e) => setWaist(Number(e.target.value))} /></div>
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Neck (in)</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={neck} onChange={(e) => setNeck(Number(e.target.value))} /></div>
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Height (in)</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} /></div>
        {gender === 'female' && <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Hip (in)</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl" type="number" value={hip} onChange={(e) => setHip(Number(e.target.value))} /></div>}
      </div></div>
      <div className="lg:col-span-7"><div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
        <div className="flex items-center gap-2 text-primary-fixed mb-6"><Activity className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Body Fat %</span></div>
        <div className="bg-surface-container-highest p-8 rounded-xl"><p className="text-4xl font-bold text-white mono">{calculate().toFixed(1)}%</p></div>
      </div></div>
    </div>
  );
}
export default BodyFatCalculator;