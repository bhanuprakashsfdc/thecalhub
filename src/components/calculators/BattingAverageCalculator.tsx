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

export interface BattingAverageInput {
  hits: number;
  atBats: number;
}

export function computeBattingAverage(input: BattingAverageInput) {
  const h = Math.max(0, input.hits);
  const ab = Math.max(0, input.atBats);

  const average = ab > 0 ? h / ab : 0;
  const hitless = Math.max(0, ab - h);
  const per100 = ab > 0 ? (h / ab) * 100 : 0;
  const for300 = ab * 0.3;

  return { average, hitless, per100, for300 };
}

export function BattingAverageCalculator() {
  const [hits, setHits] = useState('175');
  const [atBats, setAtBats] = useState('560');

  const result = computeBattingAverage({
    hits: Number(hits) || 0,
    atBats: Number(atBats) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Hits" value={hits} onChange={setHits} min={0} />
            <NumberField label="At-bats" value={atBats} onChange={setAtBats} min={0} />
          </div>
          <Hint>
            Batting average is hits divided by at-bats. Walks, hit-by-pitches and sacrifice flies are excluded
            from the denominator.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Batting average"
            value={formatMoney(result.average)}
            sub={`${hits || 0} hits in ${atBats || 0} at-bats`}
          />
          <ResultRows>
            <ResultRow label="Hitless at-bats" value={formatMoney(result.hitless)} />
            <ResultRow label="Hits per 100 at-bats" value={formatMoney(result.per100)} />
            <ResultRow label="Hits needed for .300" value={formatMoney(result.for300)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default BattingAverageCalculator;
