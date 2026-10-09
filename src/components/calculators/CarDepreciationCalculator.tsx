import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useI18n } from '../../lib/i18n';
import { CalcGrid, Panel, PanelEyebrow, NumberField, ResultHero, ResultRows, ResultRow, Hint, formatMoney } from '../calculators/kit';

export function CarDepreciationCalculator() {
  const { getCurrencySymbol } = useI18n();
  const symbol = getCurrencySymbol();
  const [purchasePrice, setPurchasePrice] = useState('3000000');
  const [depreciationRate, setDepreciationRate] = useState('15');
  const [years, setYears] = useState('5');

  const calc = useMemo(() => {
    const price = Number(purchasePrice) || 0;
    const rate = Math.max(0, Number(depreciationRate)) / 100;
    const y = Math.max(0, Math.floor(Number(years) || 0));
    const r = 1 - rate;
    const values = [];
    let current = price;
    for (let i = 0; i <= y; i++) {
      values.push({ year: `Year ${i}`, value: Math.round(current) });
      current = current * r;
    }
    const finalValue = values[values.length - 1].value;
    const totalDepreciation = price - finalValue;
    const percentRemaining = price > 0 ? (finalValue / price) * 100 : 0;
    return { values, finalValue, totalDepreciation, percentRemaining, years: y };
  }, [purchasePrice, depreciationRate, years]);

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label={`Purchase price (${symbol})`} value={purchasePrice} onChange={setPurchasePrice} min={0} />
            <NumberField label="Annual depreciation rate (%)" value={depreciationRate} onChange={setDepreciationRate} min={0} max={100} step="0.5" />
            <NumberField label="Age of car (years)" value={years} onChange={setYears} min={0} step="1" />
          </div>
          <Hint>
            Cars lose value every year. This calculator models straight-line depreciation so you can
            see the actual resale value of a car after any number of years.
          </Hint>
        </Panel>
      }
      results={
        <div className="space-y-6">
          <Panel>
            <PanelEyebrow>Result</PanelEyebrow>
            <ResultHero
              label="Actual value today"
              value={`${symbol}${formatMoney(calc.finalValue)}`}
              sub={`Lost ${symbol}${formatMoney(calc.totalDepreciation)} (${(100 - calc.percentRemaining).toFixed(1)}% of purchase price)`}
            />
            <ResultRows>
              <ResultRow label="Purchase price" value={`${symbol}${formatMoney(Number(purchasePrice) || 0)}`} />
              <ResultRow label="Total depreciation" value={`${symbol}${formatMoney(calc.totalDepreciation)}`} />
              <ResultRow label="Value remaining" value={`${calc.percentRemaining.toFixed(1)}%`} />
            </ResultRows>
          </Panel>
          <Panel>
            <PanelEyebrow>Depreciation Curve</PanelEyebrow>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={calc.values} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                  <XAxis dataKey="year" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${symbol}${formatMoney(v, 0)}`} />
                  <Tooltip formatter={(v) => [`${symbol}${formatMoney(Number(v))}`, 'Value']} contentStyle={{ backgroundColor: '#1e1b2e', border: '1px solid rgba(255,255,255,0.1)' }} />
                  <Line type="monotone" dataKey="value" stroke="#F59E0B" strokeWidth={2} dot={false} activeDot={{ r: 5, fill: '#F59E0B' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        </div>
      }
    />
  );
}

export default CarDepreciationCalculator;