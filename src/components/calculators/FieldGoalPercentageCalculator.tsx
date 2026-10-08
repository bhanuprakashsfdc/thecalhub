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

export interface FieldGoalInput {
  made: number;
  attempted: number;
}

export function computeFieldGoal(input: FieldGoalInput) {
  const made = Math.max(0, input.made);
  const attempted = Math.max(0, input.attempted);
  const pct = attempted > 0 ? (made / attempted) * 100 : 0;
  const missed = Math.max(0, attempted - made);
  const attemptsPerMake = made > 0 ? attempted / made : 0;

  return { pct, missed, attemptsPerMake };
}

export function FieldGoalPercentageCalculator() {
  const [made, setMade] = useState('450');
  const [attempted, setAttempted] = useState('980');

  const result = computeFieldGoal({
    made: Number(made) || 0,
    attempted: Number(attempted) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Field goals made" value={made} onChange={setMade} min={0} />
            <NumberField label="Field goals attempted" value={attempted} onChange={setAttempted} min={0} />
          </div>
          <Hint>
            Field-goal percentage counts makes over all two- and three-point attempts, including the ones you
            missed at the rim.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Field-goal percentage"
            value={`${formatMoney(result.pct)}%`}
            sub={`${made || 0} of ${attempted || 0} attempts`}
          />
          <ResultRows>
            <ResultRow label="Missed field goals" value={formatMoney(result.missed)} />
            <ResultRow label="Attempts per make" value={formatMoney(result.attemptsPerMake)} />
            <ResultRow label="Makes per 100 attempts" value={formatMoney(result.pct)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default FieldGoalPercentageCalculator;
