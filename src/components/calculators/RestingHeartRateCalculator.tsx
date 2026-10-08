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

export interface RestingHeartRateInput {
  restingHeartRate: number;
  age: number;
  intensityPercent: number;
}

export function computeRestingHeartRate(input: RestingHeartRateInput) {
  const resting = Math.max(0, input.restingHeartRate);
  const maxHeartRate = 220 - Math.max(0, input.age);
  const reserve = Math.max(0, maxHeartRate - resting);
  const target = resting + reserve * (Math.max(0, input.intensityPercent) / 100);
  const target70 = resting + reserve * (70 / 100);

  return { maxHeartRate, reserve, target, target70 };
}

export function RestingHeartRateCalculator() {
  const [restingHeartRate, setRestingHeartRate] = useState('60');
  const [age, setAge] = useState('35');
  const [intensityPercent, setIntensityPercent] = useState('60');

  const result = computeRestingHeartRate({
    restingHeartRate: Number(restingHeartRate) || 0,
    age: Number(age) || 0,
    intensityPercent: Number(intensityPercent) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Resting heart rate (bpm)" value={restingHeartRate} onChange={setRestingHeartRate} min={0} max={220} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Age" value={age} onChange={setAge} min={0} max={120} />
              <NumberField label="Target intensity (%)" value={intensityPercent} onChange={setIntensityPercent} min={0} max={100} />
            </div>
          </div>
          <Hint>
            The Karvonen method builds intensity on heart rate reserve — the gap between resting and maximum
            heart rate — which is more personal than a flat percentage of max.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Target heart rate"
            value={formatMoney(result.target)}
            sub={`At ${intensityPercent}% of your heart rate reserve`}
          />
          <ResultRows>
            <ResultRow label="Maximum heart rate" value={formatMoney(result.maxHeartRate)} />
            <ResultRow label="Heart rate reserve" value={formatMoney(result.reserve)} />
            <ResultRow label="Target at 70%" value={formatMoney(result.target70)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default RestingHeartRateCalculator;
