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

export interface SluggingInput {
  atBats: number;
  singles: number;
  doubles: number;
  triples: number;
  homeRuns: number;
}

export function computeSlugging(input: SluggingInput) {
  const ab = Math.max(0, input.atBats);
  const s = Math.max(0, input.singles);
  const d = Math.max(0, input.doubles);
  const t = Math.max(0, input.triples);
  const hr = Math.max(0, input.homeRuns);

  const totalBases = s + 2 * d + 3 * t + 4 * hr;
  const slg = ab > 0 ? totalBases / ab : 0;
  const extraBaseHits = d + t + hr;

  return { totalBases, slg, extraBaseHits };
}

export function SluggingPercentageCalculator() {
  const [atBats, setAtBats] = useState('560');
  const [singles, setSingles] = useState('110');
  const [doubles, setDoubles] = useState('40');
  const [triples, setTriples] = useState('3');
  const [homeRuns, setHomeRuns] = useState('22');

  const result = computeSlugging({
    atBats: Number(atBats) || 0,
    singles: Number(singles) || 0,
    doubles: Number(doubles) || 0,
    triples: Number(triples) || 0,
    homeRuns: Number(homeRuns) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="At-bats" value={atBats} onChange={setAtBats} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Singles" value={singles} onChange={setSingles} min={0} />
              <NumberField label="Doubles" value={doubles} onChange={setDoubles} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Triples" value={triples} onChange={setTriples} min={0} />
              <NumberField label="Home runs" value={homeRuns} onChange={setHomeRuns} min={0} />
            </div>
          </div>
          <Hint>
            Slugging is total bases divided by at-bats: singles count once, doubles twice, triples three times
            and home runs four.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero label="Slugging percentage" value={formatMoney(result.slg)} sub="Total bases per at-bat" />
          <ResultRows>
            <ResultRow label="Total bases" value={formatMoney(result.totalBases)} />
            <ResultRow label="Extra-base hits" value={formatMoney(result.extraBaseHits)} />
            <ResultRow label="Slugging percent" value={`${formatMoney(result.slg * 100)}%`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default SluggingPercentageCalculator;
