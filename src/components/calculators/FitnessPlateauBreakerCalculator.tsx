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

export interface FitnessPlateauBreakerInput {
  weeklySets: number;
  weeksStuck: number;
  deloadPercent: number;
  weeklyIncrease: number;
}

export function computeFitnessPlateauBreaker(input: FitnessPlateauBreakerInput) {
  const sets = Math.max(0, input.weeklySets);
  const deloadPercent = Math.min(100, Math.max(0, input.deloadPercent));
  const deloadSets = sets * (1 - deloadPercent / 100);
  const weeksStuck = Math.max(0, input.weeksStuck);
  const deloadWeeks = weeksStuck > 0 ? Math.max(1, Math.ceil(weeksStuck / 4)) : 0;
  const increase = Math.max(0, input.weeklyIncrease);
  const weeksToRecover = increase > 0 ? Math.ceil((sets - deloadSets) / increase) : 0;
  const totalWeeks = deloadWeeks + weeksToRecover;
  const volumeDrop = sets - deloadSets;

  return { deloadSets, deloadWeeks, weeksToRecover, totalWeeks, volumeDrop };
}

export function FitnessPlateauBreakerCalculator() {
  const [weeklySets, setWeeklySets] = useState('20');
  const [weeksStuck, setWeeksStuck] = useState('6');
  const [deloadPercent, setDeloadPercent] = useState('30');
  const [weeklyIncrease, setWeeklyIncrease] = useState('2');

  const result = computeFitnessPlateauBreaker({
    weeklySets: Number(weeklySets) || 0,
    weeksStuck: Number(weeksStuck) || 0,
    deloadPercent: Number(deloadPercent) || 0,
    weeklyIncrease: Number(weeklyIncrease) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Weekly sets now" value={weeklySets} onChange={setWeeklySets} min={0} />
              <NumberField label="Weeks stuck" value={weeksStuck} onChange={setWeeksStuck} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Deload reduction (%)" value={deloadPercent} onChange={setDeloadPercent} min={0} max={100} />
              <NumberField label="Weekly set increase" value={weeklyIncrease} onChange={setWeeklyIncrease} min={0} />
            </div>
          </div>
          <Hint>
            When progress stalls, pulling volume back for a week or two restores recovery capacity; climbing
            again in small weekly steps beats grinding the same load for months.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Deload weekly sets"
            value={formatMoney(result.deloadSets)}
            sub={`Down from ${weeklySets} sets for ${result.deloadWeeks} week(s)`}
          />
          <ResultRows>
            <ResultRow label="Volume reduction" value={formatMoney(result.volumeDrop)} />
            <ResultRow label="Weeks to recover volume" value={`${result.weeksToRecover}`} />
            <ResultRow label="Total plan length (weeks)" value={`${result.totalWeeks}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default FitnessPlateauBreakerCalculator;
