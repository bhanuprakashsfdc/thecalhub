import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import {
  CalcGrid,
  Panel,
  PanelEyebrow,
  NumberField,
  ResultHero,
  ResultRows,
  ResultRow,
  Hint,
  formatMoney,
} from './kit';

export interface RunwayInput {
  currentCash: number;
  monthlyBurn: number;
  monthlyAdditional: number;
  annualGrowthPercent: number;
  targetYears: number;
}

export function computeRunway(input: RunwayInput) {
  const cash = Math.max(0, input.currentCash);
  const burn = Math.max(0, input.monthlyBurn);
  const additional = Math.max(0, input.monthlyAdditional);
  const r = Math.max(0, input.annualGrowthPercent) / 100 / 12;
  const targetYears = Math.max(0, Math.floor(input.targetYears || 0));

  let months = 0;
  let balance = cash;

  if (burn === 0) {
    months = balance > 0 ? Infinity : 0;
  } else if (balance > 0) {
    const net = r * balance + additional - burn;
    if (net >= 0) {
      months = Infinity;
    } else {
      let safety = 0;
      while (balance > 0 && safety < 12000) {
        balance = balance * (1 + r) + additional - burn;
        months++;
        safety++;
      }
      if (balance <= 0) {
        const prev = balance + burn - additional;
        const growth = prev * r;
        const remaining = prev + growth + additional;
        if (remaining > 0 && burn > 0) {
          months -= 1;
          balance = remaining;
        }
      }
    }
  }

  const years = months === Infinity ? Infinity : Math.floor(months / 12);
  const remainingMonths = months === Infinity ? 0 : months % 12;
  const finalMonthBalance = months === Infinity ? Infinity : Math.max(0, balance);

  // Build the trajectory out to the target horizon.
  const trajectory = [];
  let running = cash;
  const targetMonths = targetYears * 12;
  for (let i = 0; i <= targetMonths; i++) {
    if (i === 0) {
      trajectory.push({ month: i, label: 'Month 0', balance: Math.round(running) });
    } else {
      running = running * (1 + r) + additional - burn;
      if (running < 0) running = 0;
      if (i % 6 === 0 || i === targetMonths) {
        trajectory.push({ month: i, label: `M${i}`, balance: Math.round(running) });
      }
    }
  }

  return {
    months,
    years,
    remainingMonths,
    finalMonthBalance,
    infinite: months === Infinity,
    targetYears,
    balanceAtTarget: trajectory[trajectory.length - 1]?.balance ?? cash,
    trajectory,
  };
}

export function RunwayCalculator() {
  const [currentCash, setCurrentCash] = useState('50000');
  const [monthlyBurn, setMonthlyBurn] = useState('8000');
  const [monthlyAdditional, setMonthlyAdditional] = useState('0');
  const [annualGrowthPercent, setAnnualGrowthPercent] = useState('4');
  const [targetYears, setTargetYears] = useState('2');

  const result = computeRunway({
    currentCash: Number(currentCash) || 0,
    monthlyBurn: Number(monthlyBurn) || 0,
    monthlyAdditional: Number(monthlyAdditional) || 0,
    annualGrowthPercent: Number(annualGrowthPercent) || 0,
    targetYears: Number(targetYears) || 0,
  });

  const heroValue = result.infinite
    ? 'Never runs out'
    : `${result.months} months`;

  const heroSub = result.infinite
    ? 'Your inflows cover the burn — the balance keeps growing'
    : `${result.years} years ${result.remainingMonths} months`;

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Current cash ($)" value={currentCash} onChange={setCurrentCash} min={0} />
            <NumberField label="Monthly burn ($)" value={monthlyBurn} onChange={setMonthlyBurn} min={0} />
            <NumberField
              label="Monthly additional funds ($)"
              value={monthlyAdditional}
              onChange={setMonthlyAdditional}
              min={0}
            />
            <NumberField
              label="Annual growth (%)"
              value={annualGrowthPercent}
              onChange={setAnnualGrowthPercent}
              min={0}
              step="0.1"
            />
            <NumberField
              label="Expected years"
              value={targetYears}
              onChange={setTargetYears}
              min={0}
              step="1"
            />
          </div>
          <Hint>
            Your cash earns growth each month, then additional funds are added and the burn is
            subtracted. If inflows (growth + additional) cover the burn, the runway is unlimited.
            The "Still Left" card projects your balance out to the expected years you specify.
          </Hint>
        </Panel>
      }
      results={
        <div className="space-y-6">
          <Panel>
            <PanelEyebrow>Result</PanelEyebrow>
            <ResultHero label="Runway" value={heroValue} sub={heroSub} />
            <ResultRows>
              <ResultRow label="Months remaining" value={result.infinite ? 'Unlimited' : result.months} />
              <ResultRow label="Years remaining" value={result.infinite ? 'Unlimited' : result.years} />
              <ResultRow
                label="Final month balance"
                value={result.infinite ? 'Grows indefinitely' : `$${formatMoney(result.finalMonthBalance)}`}
              />
            </ResultRows>
          </Panel>
          <Panel>
            <PanelEyebrow>Still Left</PanelEyebrow>
            <ResultHero
              label={`Balance after ${result.targetYears} year${result.targetYears === 1 ? '' : 's'}`}
              value={`$${formatMoney(result.balanceAtTarget)}`}
              sub={
                result.infinite
                  ? 'Inflows exceed burn — the balance grows every year'
                  : result.balanceAtTarget > 0
                  ? 'Projected balance at your expected horizon'
                  : 'Depleted before your expected horizon'
              }
            />
          </Panel>
          <Panel>
            <PanelEyebrow>Balance Trajectory</PanelEyebrow>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={result.trajectory} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                  <XAxis
                    dataKey="label"
                    tick={{ fill: '#6b7280', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: '#6b7280', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `$${formatMoney(v, 0)}`}
                  />
                  <Tooltip
                    formatter={(v) => [`$${formatMoney(Number(v))}`, 'Balance']}
                    labelStyle={{ color: '#9ca3af' }}
                    contentStyle={{ backgroundColor: '#1e1b2e', border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="balance"
                    stroke="#D6ED79"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 5, fill: '#D6ED79' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        </div>
      }
    />
  );
}

export default RunwayCalculator;