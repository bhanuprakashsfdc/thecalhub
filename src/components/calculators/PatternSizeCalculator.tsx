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

export interface PatternSizeInput {
  measurement: number;
  easePercent: number;
  seamAllowance: number;
  scalePercent: number;
}

export function computePatternSize(input: PatternSizeInput) {
  const measurement = Math.max(0, input.measurement);
  const ease = Math.max(-50, input.easePercent);
  const allowance = Math.max(0, input.seamAllowance);
  const scale = Math.max(0, input.scalePercent);

  const withEase = measurement * (1 + ease / 100);
  const cutSize = withEase + allowance * 2;
  const graded = (cutSize * scale) / 100;

  return { withEase, cutSize, graded };
}

export function PatternSizeCalculator() {
  const [measurement, setMeasurement] = useState('40');
  const [easePercent, setEasePercent] = useState('5');
  const [seamAllowance, setSeamAllowance] = useState('0.5');
  const [scalePercent, setScalePercent] = useState('100');

  const result = computePatternSize({
    measurement: Number(measurement) || 0,
    easePercent: Number(easePercent) || 0,
    seamAllowance: Number(seamAllowance) || 0,
    scalePercent: Number(scalePercent) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField
              label="Finished measurement (in)"
              value={measurement}
              onChange={setMeasurement}
              min={0}
              step="0.25"
            />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Ease (%)" value={easePercent} onChange={setEasePercent} step="0.5" />
              <NumberField
                label="Seam allowance (in)"
                value={seamAllowance}
                onChange={setSeamAllowance}
                min={0}
                step="0.125"
              />
            </div>
            <NumberField
              label="Grading scale (%)"
              value={scalePercent}
              onChange={setScalePercent}
              min={1}
              max={300}
              hint="100% keeps the pattern at its original size"
            />
          </div>
          <Hint>
            Ease is the difference between the body measurement and the finished garment. Add seam allowance
            after ease, then grade the whole piece up or down with the scale.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Graded cut size"
            value={`${formatMoney(result.graded)} in`}
            sub={`Scaled to ${Number(scalePercent) || 0}% of the cut pattern`}
          />
          <ResultRows>
            <ResultRow label="Cut size with allowance" value={`${formatMoney(result.cutSize)} in`} />
            <ResultRow label="With ease only" value={`${formatMoney(result.withEase)} in`} />
            <ResultRow label="Body measurement" value={`${Number(measurement) || 0} in`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default PatternSizeCalculator;
