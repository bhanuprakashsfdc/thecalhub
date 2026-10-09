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

export interface ChildHeightPredictorInput {
  fatherHeightCm: number;
  motherHeightCm: number;
  sex: 'boy' | 'girl';
}

export function computeChildHeightPredictor(input: ChildHeightPredictorInput) {
  const midParental = (input.fatherHeightCm + input.motherHeightCm) / 2;
  const adjustment = input.sex === 'boy' ? 13 : -13;
  const height = (input.fatherHeightCm + input.motherHeightCm + adjustment) / 2;
  const lower = height - 8.5;
  const upper = height + 8.5;
  return { height, lower, upper, midParental };
}

export function ChildHeightPredictorCalculator() {
  const [sex, setSex] = useState('boy');
  const [fatherHeightCm, setFatherHeightCm] = useState('175');
  const [motherHeightCm, setMotherHeightCm] = useState('163');

  const result = computeChildHeightPredictor({
    fatherHeightCm: Number(fatherHeightCm) || 0,
    motherHeightCm: Number(motherHeightCm) || 0,
    sex: sex === 'girl' ? 'girl' : 'boy',
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <SegmentedControl
              label="Child sex"
              value={sex}
              onChange={setSex}
              options={[
                { value: 'boy', label: 'Boy' },
                { value: 'girl', label: 'Girl' },
              ]}
            />
            <NumberField label="Father height (cm)" value={fatherHeightCm} onChange={setFatherHeightCm} min={0} step="0.1" />
            <NumberField label="Mother height (cm)" value={motherHeightCm} onChange={setMotherHeightCm} min={0} step="0.1" />
          </div>
          <Hint>
            Mid-parental height method: boys add 13 cm to the
            parents' average, girls subtract 13 cm, then halve the sum. The
            ±8.5 cm band covers about 95% of outcomes.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Predicted adult height"
            value={`${formatMoney(result.height)} cm`}
            sub="Genetic estimate"
          />
          <ResultRows>
            <ResultRow label="Lower estimate" value={`${formatMoney(result.lower)} cm`} />
            <ResultRow label="Upper estimate" value={`${formatMoney(result.upper)} cm`} />
            <ResultRow label="Mid-parental height" value={`${formatMoney(result.midParental)} cm`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ChildHeightPredictorCalculator;
