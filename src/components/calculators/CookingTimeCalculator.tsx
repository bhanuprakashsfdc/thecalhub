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

export interface CookingTimeInput {
  prepMinutes: number;
  cookMinutes: number;
  restMinutes: number;
  batches: number;
}

export function computeCookingTime(input: CookingTimeInput) {
  const prep = Math.max(0, input.prepMinutes);
  const cook = Math.max(0, input.cookMinutes);
  const rest = Math.max(0, input.restMinutes);
  const batches = Math.max(0, Math.floor(input.batches));
  const perBatch = prep + cook + rest;
  const totalMinutes = perBatch * batches;

  return {
    prepTotal: prep * batches,
    cookTotal: cook * batches,
    restTotal: rest * batches,
    perBatch,
    totalMinutes,
    hours: Math.floor(totalMinutes / 60),
    minutes: Math.round(totalMinutes % 60),
  };
}

export function CookingTimeCalculator() {
  const [prepMinutes, setPrepMinutes] = useState('15');
  const [cookMinutes, setCookMinutes] = useState('45');
  const [restMinutes, setRestMinutes] = useState('10');
  const [batches, setBatches] = useState('1');

  const result = computeCookingTime({
    prepMinutes: Number(prepMinutes) || 0,
    cookMinutes: Number(cookMinutes) || 0,
    restMinutes: Number(restMinutes) || 0,
    batches: Number(batches) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Preparation time (min)" value={prepMinutes} onChange={setPrepMinutes} min={0} />
            <NumberField label="Cooking time (min)" value={cookMinutes} onChange={setCookMinutes} min={0} />
            <NumberField label="Resting time (min)" value={restMinutes} onChange={setRestMinutes} min={0} />
            <NumberField label="Number of batches" value={batches} onChange={setBatches} min={1} />
          </div>
          <Hint>
            Add every stage that keeps you in the kitchen — chopping, searing, simmering and resting — then
            multiply by batches if you are cooking in rounds.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Total cooking time"
            value={`${formatMoney(result.totalMinutes)} min`}
            sub={`${result.hours}h ${result.minutes}m overall`}
          />
          <ResultRows>
            <ResultRow label="Time per batch" value={`${formatMoney(result.perBatch)} min`} />
            <ResultRow label="Prep total" value={`${formatMoney(result.prepTotal)} min`} />
            <ResultRow label="Cooking total" value={`${formatMoney(result.cookTotal)} min`} />
            <ResultRow label="Resting total" value={`${formatMoney(result.restTotal)} min`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default CookingTimeCalculator;
