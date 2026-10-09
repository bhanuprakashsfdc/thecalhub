import { useState, useMemo } from 'react';
import { ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useI18n } from '../../lib/i18n';
import { CalcGrid, Panel, PanelEyebrow, NumberField, ResultHero, ResultRows, ResultRow, Hint, formatMoney } from '../calculators/kit';

export function FDRequiredCalculator() {
  const { getCurrencySymbol } = useI18n();
  const symbol = getCurrencySymbol();
  const [targetAmount, setTargetAmount] = useState(500000);
  const [rate, setRate] = useState(7);
  const [time, setTime] = useState(5);

  const calc = useMemo(() => {
    const r = rate / 100 / 4;
    const periods = 4 * time;
    const principal = targetAmount / Math.pow(1 + r, periods);
    const interest = targetAmount - principal;
    return { principal, interest, targetAmount };
  }, [targetAmount, rate, time]);

  const yearlyData = useMemo(() => {
    const data = [];
    const r = rate / 100 / 4;
    for (let i = 0; i <= time; i++) {
      const value = calc.principal * Math.pow(1 + r, 4 * i);
      data.push({ year: `Year ${i}`, value: Math.round(value) });
    }
    return data;
  }, [calc.principal, rate, time]);

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField
              label={`Target maturity amount (${symbol})`}
              value={String(targetAmount)}
              onChange={(v) => setTargetAmount(Number(v))}
              min={0}
            />
            <div className="grid grid-cols-2 gap-4">
              <NumberField
                label="Annual interest rate (%)"
                value={String(rate)}
                onChange={(v) => setRate(Number(v))}
                min={0}
                step="0.1"
              />
              <NumberField
                label="Tenure (years)"
                value={String(time)}
                onChange={(v) => setTime(Number(v))}
                min={0}
                step="1"
              />
            </div>
          </div>
          <Hint>
            Works backwards from the maturity amount you want. The required principal is the
            amount you must deposit today at the given rate and tenure to reach your target.
          </Hint>
        </Panel>
      }
      results={
        <div className="space-y-6">
          <Panel>
            <PanelEyebrow>Result</PanelEyebrow>
            <ResultHero
              label="FD required today"
              value={`${symbol}${formatMoney(calc.principal)}`}
              sub={`To receive ${symbol}${formatMoney(calc.targetAmount)} in ${time} years at ${rate}%`}
            />
            <ResultRows>
              <ResultRow label="Target maturity" value={`${symbol}${formatMoney(calc.targetAmount)}`} />
              <ResultRow label="Interest earned" value={`${symbol}${formatMoney(calc.interest)}`} />
              <ResultRow label="Effective return" value={`${((calc.interest / calc.principal) * 100).toFixed(2)}%`} />
            </ResultRows>
          </Panel>
          <Panel>
            <PanelEyebrow>Growth to Target</PanelEyebrow>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={yearlyData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <Bar dataKey="value" fill="#D6ED79" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        </div>
      }
    />
  );
}

export default FDRequiredCalculator;