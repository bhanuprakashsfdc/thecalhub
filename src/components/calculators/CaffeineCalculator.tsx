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

export interface CaffeineInput {
  weightKg: number;
  limitPerKg: number;
  cups: number;
  mgPerCup: number;
}

export function computeCaffeine(input: CaffeineInput) {
  const weight = Math.max(0, input.weightKg);
  const perKg = Math.max(0, input.limitPerKg);
  const cups = Math.max(0, input.cups);
  const mgPerCup = Math.max(0, input.mgPerCup);

  const limit = weight * perKg;
  const total = cups * mgPerCup;
  const remaining = limit - total;
  const percent = limit > 0 ? (total / limit) * 100 : 0;

  return { limit, total, remaining, percent };
}

export function CaffeineCalculator() {
  const [weightKg, setWeightKg] = useState('70');
  const [limitPerKg, setLimitPerKg] = useState('4');
  const [cups, setCups] = useState('2');
  const [mgPerCup, setMgPerCup] = useState('95');

  const result = computeCaffeine({
    weightKg: Number(weightKg) || 0,
    limitPerKg: Number(limitPerKg) || 0,
    cups: Number(cups) || 0,
    mgPerCup: Number(mgPerCup) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Body weight (kg)" value={weightKg} onChange={setWeightKg} min={0} />
              <NumberField label="Limit (mg per kg)" value={limitPerKg} onChange={setLimitPerKg} min={0} step="0.5" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Drinks today" value={cups} onChange={setCups} min={0} />
              <NumberField label="Caffeine per drink (mg)" value={mgPerCup} onChange={setMgPerCup} min={0} />
            </div>
          </div>
          <Hint>
            Healthy adults are advised to keep under about 400 mg a day; pregnancy guidance is closer to 200 mg.
            Espresso (63 mg), drip coffee (95 mg) and black tea (47 mg) differ widely by brew strength.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Caffeine consumed"
            value={`${formatMoney(result.total, 0)} mg`}
            sub={`${formatMoney(result.percent)}% of your daily limit`}
          />
          <ResultRows>
            <ResultRow label="Daily limit" value={`${formatMoney(result.limit, 0)} mg`} />
            <ResultRow
              label="Remaining allowance"
              value={`${result.remaining >= 0 ? '' : '-'}${formatMoney(Math.abs(result.remaining), 0)} mg`}
            />
            <ResultRow label="Drinks logged" value={`${Number(cups) || 0}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default CaffeineCalculator;
