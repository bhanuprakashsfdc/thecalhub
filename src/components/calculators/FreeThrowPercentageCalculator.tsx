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

export interface FreeThrowInput {
  made: number;
  attempted: number;
}

export function computeFreeThrow(input: FreeThrowInput) {
  const made = Math.max(0, input.made);
  const attempted = Math.max(0, input.attempted);
  const pct = attempted > 0 ? (made / attempted) * 100 : 0;
  const missed = Math.max(0, attempted - made);
  const attemptsPerMake = made > 0 ? attempted / made : 0;

  return { pct, missed, attemptsPerMake };
}

export function FreeThrowPercentageCalculator() {
  const [made, setMade] = useState('180');
  const [attempted, setAttempted] = useState('215');

  const result = computeFreeThrow({
    made: Number(made) || 0,
    attempted: Number(attempted) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Free throws made" value={made} onChange={setMade} min={0} />
            <NumberField label="Free throws attempted" value={attempted} onChange={setAttempted} min={0} />
          </div>
          <Hint>
            Free-throw percentage is makes divided by attempts from the stripe. It stabilises quickly because
            every attempt comes from the same distance.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Free-throw percentage"
            value={`${formatMoney(result.pct)}%`}
            sub={`${made || 0} of ${attempted || 0} attempts`}
          />
          <ResultRows>
            <ResultRow label="Missed free throws" value={formatMoney(result.missed)} />
            <ResultRow label="Attempts per make" value={formatMoney(result.attemptsPerMake)} />
            <ResultRow label="Makes per 100 attempts" value={formatMoney(result.pct)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default FreeThrowPercentageCalculator;
