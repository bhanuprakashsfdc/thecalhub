import { useState } from 'react';
import {
  CalcGrid,
  Panel,
  PanelEyebrow,
  NumberField,
  SegmentedControl,
  ResultHero,
  ResultRows,
  ResultRow,
  Hint,
  formatMoney,
} from './kit';

export interface WaistToHipRatioInput {
  sex: 'male' | 'female';
  waistCm: number;
  hipCm: number;
}

export function computeWaistToHipRatio(input: WaistToHipRatioInput) {
  const ratio = input.hipCm > 0 ? input.waistCm / input.hipCm : 0;
  const guideline = input.sex === 'male' ? 0.9 : 0.8;
  const risk =
    ratio < guideline ? 'Low risk' : ratio < guideline + 0.1 ? 'Moderate risk' : 'High risk';
  const idealWaist = input.hipCm * guideline;
  const waistShare = ratio * 100;
  return { ratio, risk, idealWaist, waistShare };
}

export function WaistToHipRatioCalculator() {
  const [sex, setSex] = useState('male');
  const [waistCm, setWaistCm] = useState('85');
  const [hipCm, setHipCm] = useState('100');

  const result = computeWaistToHipRatio({
    sex: sex === 'female' ? 'female' : 'male',
    waistCm: Number(waistCm) || 0,
    hipCm: Number(hipCm) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <SegmentedControl
              label="Sex"
              value={sex}
              onChange={setSex}
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
              ]}
            />
            <NumberField label="Waist circumference (cm)" value={waistCm} onChange={setWaistCm} min={0} step="0.1" />
            <NumberField label="Hip circumference (cm)" value={hipCm} onChange={setHipCm} min={0} step="0.1" />
          </div>
          <Hint>
            Ratio = waist ÷ hip. Healthy thresholds are below
            0.90 for men and 0.80 for women.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Waist-to-hip ratio"
            value={formatMoney(result.ratio)}
            sub={result.risk}
          />
          <ResultRows>
            <ResultRow label="Risk category" value={result.risk} />
            <ResultRow label="Ideal waist for health (cm)" value={formatMoney(result.idealWaist)} />
            <ResultRow label="Waist as share of hip" value={`${formatMoney(result.waistShare)}%`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default WaistToHipRatioCalculator;
