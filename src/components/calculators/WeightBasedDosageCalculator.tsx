import { useState } from 'react';
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

export interface WeightBasedDosageInput {
  weightKg: number;
  mgPerKg: number;
  dosesPerDay: number;
  maxDailyMg: number;
}

export interface WeightBasedDosageResult {
  singleDoseMg: number;
  plannedDailyMg: number;
  dailyDoseMg: number;
  adjustedSingleMg: number;
  mgPerKgPerDay: number;
  percentOfMax: number;
  capped: boolean;
}

const positive = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);
const finite = (n: number) => (Number.isFinite(n) ? n : 0);

export function computeWeightBasedDosage(input: WeightBasedDosageInput): WeightBasedDosageResult {
  const weightKg = positive(input.weightKg);
  const mgPerKg = positive(input.mgPerKg);
  const dosesPerDay = positive(input.dosesPerDay);
  const maxDailyMg = positive(input.maxDailyMg);

  const singleDoseMg = finite(weightKg * mgPerKg);
  const plannedDailyMg = finite(singleDoseMg * dosesPerDay);
  const capped = maxDailyMg > 0 && plannedDailyMg > maxDailyMg;
  const dailyDoseMg = capped ? maxDailyMg : plannedDailyMg;
  const adjustedSingleMg = dosesPerDay > 0 ? finite(dailyDoseMg / dosesPerDay) : 0;

  return {
    singleDoseMg,
    plannedDailyMg,
    dailyDoseMg,
    adjustedSingleMg,
    mgPerKgPerDay: weightKg > 0 ? finite(dailyDoseMg / weightKg) : 0,
    percentOfMax: maxDailyMg > 0 ? finite((dailyDoseMg / maxDailyMg) * 100) : 0,
    capped,
  };
}

const toNumber = (raw: string) => {
  const n = Number(raw);
  return Number.isFinite(n) && n >= 0 ? n : 0;
};

export function WeightBasedDosageCalculator() {
  const [weight, setWeight] = useState('70');
  const [mgPerKg, setMgPerKg] = useState('10');
  const [dosesPerDay, setDosesPerDay] = useState('3');
  const [maxDaily, setMaxDaily] = useState('1500');

  const weightKg = toNumber(weight);
  const maxDailyMg = toNumber(maxDaily);
  const result = computeWeightBasedDosage({
    weightKg,
    mgPerKg: toNumber(mgPerKg),
    dosesPerDay: toNumber(dosesPerDay),
    maxDailyMg,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Body weight (kg)" value={weight} onChange={setWeight} min={0} step="0.1" />
            <NumberField label="Dose (mg per kg)" value={mgPerKg} onChange={setMgPerKg} min={0} step="0.1" />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Doses per day" value={dosesPerDay} onChange={setDosesPerDay} min={0} step="1" />
              <NumberField
                label="Maximum daily dose (mg)"
                value={maxDaily}
                onChange={setMaxDaily}
                min={0}
                hint="0 disables the cap."
              />
            </div>
          </div>
          <Hint>
            Single dose = weight × mg per kg, and the daily total is that single dose times the number of doses
            per day. When the total would exceed the maximum daily dose, both the daily total and each single
            dose are scaled back so the cap is never crossed.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Total daily dose"
            value={`${formatMoney(result.dailyDoseMg)} mg`}
            sub={`${result.capped ? 'Capped by the maximum daily dose' : 'Within the daily limit'} • ${formatMoney(
              weightKg
            )} kg at ${formatMoney(toNumber(mgPerKg))} mg/kg`}
          />
          <ResultRows>
            <ResultRow label="Single dose (planned)" value={`${formatMoney(result.singleDoseMg)} mg`} />
            <ResultRow label="Single dose (after cap)" value={`${formatMoney(result.adjustedSingleMg)} mg`} />
            <ResultRow label="Daily mg per kg" value={`${formatMoney(result.mgPerKgPerDay)} mg/kg`} />
            <ResultRow
              label="Percent of maximum"
              value={maxDailyMg > 0 ? `${formatMoney(result.percentOfMax)}%` : 'No cap set'}
            />
          </ResultRows>
          <Hint>
            Set the maximum daily dose to the ceiling published for the drug: a 70 kg patient at 10 mg/kg three
            times a day plans 2,100 mg but is held to 1,500 mg, which is 500 mg per dose and 21.43 mg/kg a day.
          </Hint>
        </Panel>
      }
    />
  );
}

export default WeightBasedDosageCalculator;
