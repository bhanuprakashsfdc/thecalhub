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

export interface ThreePointInput {
  made: number;
  attempted: number;
}

export function computeThreePoint(input: ThreePointInput) {
  const made = Math.max(0, input.made);
  const attempted = Math.max(0, input.attempted);
  const pct = attempted > 0 ? (made / attempted) * 100 : 0;
  const missed = Math.max(0, attempted - made);
  const attemptsPerMake = made > 0 ? attempted / made : 0;

  return { pct, missed, attemptsPerMake };
}

export function ThreePointPercentageCalculator() {
  const [made, setMade] = useState('120');
  const [attempted, setAttempted] = useState('320');

  const result = computeThreePoint({
    made: Number(made) || 0,
    attempted: Number(attempted) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Three-pointers made" value={made} onChange={setMade} min={0} />
            <NumberField label="Three-pointers attempted" value={attempted} onChange={setAttempted} min={0} />
          </div>
          <Hint>
            Three-point percentage is made threes divided by attempted threes. Shooters are usually considered
            elite from deep at 40% or better.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Three-point percentage"
            value={`${formatMoney(result.pct)}%`}
            sub={`${made || 0} of ${attempted || 0} attempts`}
          />
          <ResultRows>
            <ResultRow label="Missed threes" value={formatMoney(result.missed)} />
            <ResultRow label="Attempts per make" value={formatMoney(result.attemptsPerMake)} />
            <ResultRow label="Makes per 100 attempts" value={formatMoney(result.pct)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ThreePointPercentageCalculator;
