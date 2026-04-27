import { useState } from 'react';
import { TrendingDown } from 'lucide-react';
import { useI18n } from '../../lib/i18n';

export function InflationCalculator() {
  const { getCurrencySymbol } = useI18n();
  const symbol = getCurrencySymbol();
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(10);

  const futureValue = principal * Math.pow(1 + rate/100, years);
  const inflationLoss = principal - futureValue;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5"><div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl space-y-8">
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Current Amount ({symbol})</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl outline-none" type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} /></div>
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Inflation Rate (%)</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl outline-none" type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} /></div>
        <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Years</label><input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl outline-none" type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} /></div>
      </div></div>
      <div className="lg:col-span-7"><div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
        <div className="flex items-center gap-2 text-primary-fixed mb-6"><TrendingDown className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Results</span></div>
        <div className="bg-surface-container-highest p-8 rounded-xl"><p className="text-4xl font-bold text-white mono">{symbol}{Math.abs(inflationLoss).toFixed(2)}</p><p className="text-neutral-500 text-sm mt-2">Loss due to inflation</p></div>
        <div className="mt-6 bg-surface-container-highest p-6 rounded-xl"><p className="text-neutral-500 text-xs">Future Value in {years} years: {symbol}{futureValue.toFixed(2)}</p><p className="text-neutral-500 text-xs mt-2">Purchasing Power Lost: {symbol}{Math.abs(inflationLoss).toFixed(2)}</p></div>
      </div></div>
    </div>
  );
}
export default InflationCalculator;