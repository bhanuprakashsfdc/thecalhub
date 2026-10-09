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

export interface ProportionInput {
  part: number;
  whole: number;
  targetPart: number;
}

export function computeProportion(input: ProportionInput) {
  const percent = input.whole > 0 ? (input.part / input.whole) * 100 : 0;
  const ratio = input.part > 0 ? input.whole / input.part : 0;
  const scaledWhole = input.part > 0 ? (input.targetPart / input.part) * input.whole : 0;
  return { percent, ratio, scaledWhole };
}

export function ProportionCalculator() {
  const [part, setPart] = useState('25');
  const [whole, setWhole] = useState('100');
  const [targetPart, setTargetPart] = useState('50');

  const result = useMemo(
    () =>
      computeProportion({
        part: Number(part) || 0,
        whole: Number(whole) || 0,
        targetPart: Number(targetPart) || 0,
      }),
    [part, whole, targetPart]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Part" value={part} onChange={setPart} min={0} step="1" />
            <NumberField label="Whole" value={whole} onChange={setWhole} min={0} step="1" />
            <NumberField label="Target part" value={targetPart} onChange={setTargetPart} min={0} step="1" />
          </div>
          <Hint>
            Proportions: part ÷ whole gives the share, and scaling the part by the same factor
            scales the whole. Useful for recipes, mixtures and percentage calculations.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Percentage"
            value={`${formatMoney(result.percent)}%`}
            sub={`Ratio 1:${formatMoney(result.ratio)}`}
          />
          <ResultRows>
            <ResultRow label="Ratio" value={`1:${formatMoney(result.ratio)}`} />
            <ResultRow label="Scaled whole" value={formatMoney(result.scaledWhole)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ProportionCalculator;