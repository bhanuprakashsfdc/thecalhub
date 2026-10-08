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

export interface RecyclingInput {
  waste: number;
  rate: number;
}

export function computeRecycling(input: RecyclingInput) {
  const clamped = Math.min(100, Math.max(0, input.rate));
  const recycled = input.waste * (clamped / 100);
  const landfill = input.waste - recycled;
  const co2Avoided = recycled * 1.5;
  const trees = co2Avoided / 21;
  return { recycled, landfill, co2Avoided, trees, clamped };
}

export function RecyclingCalculator() {
  const [waste, setWaste] = useState('500');
  const [rate, setRate] = useState('45');

  const result = computeRecycling({
    waste: Number(waste) || 0,
    rate: Number(rate) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Total waste (kg)" value={waste} onChange={setWaste} min={0} />
            <NumberField label="Recycling rate (%)" value={rate} onChange={setRate} min={0} max={100} />
          </div>
          <Hint>
            Recycling one tonne of mixed paper saves around 1.5 kg of CO₂ per kilogram recycled and keeps
            material out of landfill, where it would break down into methane.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Recyclable material"
            value={`${formatMoney(result.recycled)} kg`}
            sub={`${formatMoney(result.clamped)}% of ${formatMoney(Number(waste) || 0)} kg diverted`
            }
          />
          <ResultRows>
            <ResultRow label="Sent to landfill (kg)" value={formatMoney(result.landfill)} />
            <ResultRow label="CO₂ avoided (kg)" value={formatMoney(result.co2Avoided)} />
            <ResultRow label="Tree-months equivalent" value={formatMoney(result.trees)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default RecyclingCalculator;
