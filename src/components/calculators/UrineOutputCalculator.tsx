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

export interface UrineOutputInput {
  volumeMl: number;
  weightKg: number;
  hours: number;
}

export function computeUrineOutput(input: UrineOutputInput) {
  const denominator = input.weightKg * Math.max(0.0001, input.hours);
  const rate = input.volumeMl / denominator;
  const hourly = input.volumeMl / Math.max(0.0001, input.hours);
  const expectedMinimum = 0.5 * input.weightKg * input.hours;
  const status = rate >= 0.5 ? 'Normal' : 'Low — monitor';
  return { rate, hourly, expectedMinimum, status };
}

export function UrineOutputCalculator() {
  const [volumeMl, setVolumeMl] = useState('600');
  const [weightKg, setWeightKg] = useState('70');
  const [hours, setHours] = useState('8');

  const result = computeUrineOutput({
    volumeMl: Number(volumeMl) || 0,
    weightKg: Number(weightKg) || 0,
    hours: Number(hours) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Urine volume (mL)" value={volumeMl} onChange={setVolumeMl} min={0} />
            <NumberField label="Patient weight (kg)" value={weightKg} onChange={setWeightKg} min={0} />
            <NumberField label="Collection time (hours)" value={hours} onChange={setHours} min={0} step="0.5" />
          </div>
          <Hint>
            Normal adult urine output is at least 0.5 mL/kg/hr. Values below that
            may signal dehydration or renal issues.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Urine output"
            value={`${formatMoney(result.rate)} mL/kg/hr`}
            sub="Weight-normalised rate"
          />
          <ResultRows>
            <ResultRow label="Hourly volume (mL/hr)" value={formatMoney(result.hourly)} />
            <ResultRow label="Expected minimum (mL)" value={formatMoney(result.expectedMinimum)} />
            <ResultRow label="Output status" value={result.status} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default UrineOutputCalculator;
