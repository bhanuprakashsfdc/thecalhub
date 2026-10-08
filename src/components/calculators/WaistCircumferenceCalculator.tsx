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

export interface WaistCircumferenceInput {
  waistCm: number;
  heightCm: number;
}

export function computeWaistCircumference(input: WaistCircumferenceInput) {
  const waist = Math.max(0, input.waistCm);
  const height = Math.max(0, input.heightCm);
  const ratio = height > 0 ? waist / height : 0;
  const healthyLimit = height * 0.5;
  const excess = Math.max(0, waist - healthyLimit);
  const risk = ratio < 0.5 ? 'Low' : ratio < 0.6 ? 'Increased' : ratio < 0.7 ? 'High' : 'Very high';

  return { ratio, healthyLimit, excess, risk };
}

export function WaistCircumferenceCalculator() {
  const [waistCm, setWaistCm] = useState('85');
  const [heightCm, setHeightCm] = useState('175');

  const result = computeWaistCircumference({
    waistCm: Number(waistCm) || 0,
    heightCm: Number(heightCm) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Waist circumference (cm)" value={waistCm} onChange={setWaistCm} min={0} step="0.5" />
            <NumberField label="Height (cm)" value={heightCm} onChange={setHeightCm} min={0} step="0.5" />
          </div>
          <Hint>
            Waist-to-height ratio flags abdominal fat better than BMI alone: keeping your waist below half your
            height is a simple, unit-free target.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Waist-to-height ratio"
            value={formatMoney(result.ratio)}
            sub={`Risk category: ${result.risk}`}
          />
          <ResultRows>
            <ResultRow label="Healthy waist limit" value={`${formatMoney(result.healthyLimit)} cm`} />
            <ResultRow label="Above healthy limit" value={`${formatMoney(result.excess)} cm`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default WaistCircumferenceCalculator;
