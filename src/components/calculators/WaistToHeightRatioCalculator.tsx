import { useState, useMemo } from 'react';
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

export interface WaistToHeightRatioInput {
  waist: number;
  height: number;
}

export function computeWaistToHeightRatio(input: WaistToHeightRatioInput) {
  const ratio = input.height > 0 ? input.waist / input.height : 0;
  const healthyLimit = input.height > 0 ? 0.5 * input.height : 0;
  const risk = ratio < 0.5 ? 'Low' : ratio < 0.6 ? 'Moderate' : 'High';
  return { ratio, healthyLimit, risk };
}

export function WaistToHeightRatioCalculator() {
  const [waist, setWaist] = useState('85');
  const [height, setHeight] = useState('175');

  const result = useMemo(
    () =>
      computeWaistToHeightRatio({
        waist: Number(waist) || 0,
        height: Number(height) || 0,
      }),
    [waist, height]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Waist circumference (cm)" value={waist} onChange={setWaist} min={0} step="1" />
            <NumberField label="Height (cm)" value={height} onChange={setHeight} min={0} step="1" />
          </div>
          <Hint>
            Waist-to-height ratio (WtHR) is waist divided by height. A ratio under 0.5 is
            considered low risk; 0.5–0.6 moderate; above 0.6 high risk for metabolic disease.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Waist-to-height ratio"
            value={formatMoney(result.ratio)}
            sub={`Risk: ${result.risk}`}
          />
          <ResultRows>
            <ResultRow label="Healthy waist limit" value={`${formatMoney(result.healthyLimit)} cm`} />
            <ResultRow label="Risk category" value={result.risk} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default WaistToHeightRatioCalculator;