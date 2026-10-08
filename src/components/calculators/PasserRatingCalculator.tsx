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

export interface PasserRatingInput {
  attempts: number;
  completions: number;
  yards: number;
  touchdowns: number;
  interceptions: number;
}

const clamp = (n: number) => Math.min(2.375, Math.max(0, n));

export function computePasserRating(input: PasserRatingInput) {
  const att = Math.max(0, input.attempts);
  const comp = Math.max(0, input.completions);
  const yds = Math.max(0, input.yards);
  const td = Math.max(0, input.touchdowns);
  const int = Math.max(0, input.interceptions);

  if (att === 0) {
    return { a: 0, b: 0, c: 0, d: 0, rating: 0, compPct: 0, yardsPerAttempt: 0 };
  }

  const a = clamp(((comp / att) - 0.3) * 5);
  const b = clamp(((yds / att) - 3) * 0.25);
  const c = clamp((td / att) * 20);
  const d = clamp(2.375 - (int / att) * 25);
  const rating = ((a + b + c + d) / 6) * 100;

  return {
    a,
    b,
    c,
    d,
    rating,
    compPct: (comp / att) * 100,
    yardsPerAttempt: yds / att,
  };
}

export function PasserRatingCalculator() {
  const [attempts, setAttempts] = useState('32');
  const [completions, setCompletions] = useState('22');
  const [yards, setYards] = useState('285');
  const [touchdowns, setTouchdowns] = useState('3');
  const [interceptions, setInterceptions] = useState('1');

  const result = computePasserRating({
    attempts: Number(attempts) || 0,
    completions: Number(completions) || 0,
    yards: Number(yards) || 0,
    touchdowns: Number(touchdowns) || 0,
    interceptions: Number(interceptions) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Pass attempts" value={attempts} onChange={setAttempts} min={0} />
              <NumberField label="Completions" value={completions} onChange={setCompletions} min={0} />
            </div>
            <NumberField label="Passing yards" value={yards} onChange={setYards} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Touchdowns" value={touchdowns} onChange={setTouchdowns} min={0} />
              <NumberField label="Interceptions" value={interceptions} onChange={setInterceptions} min={0} />
            </div>
          </div>
          <Hint>
            The NFL passer rating scales four components — completion %, yards per attempt, touchdown rate and
            interception rate — each clamped between 0 and 2.375. A perfect game scores 158.3.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Passer rating"
            value={formatMoney(result.rating)}
            sub="Maximum possible rating is 158.3"
          />
          <ResultRows>
            <ResultRow label="Completion percentage" value={`${formatMoney(result.compPct)}%`} />
            <ResultRow label="Yards per attempt" value={formatMoney(result.yardsPerAttempt)} />
            <ResultRow label="Component score (0–2.375)" value={formatMoney(result.a + result.b + result.c + result.d)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default PasserRatingCalculator;
