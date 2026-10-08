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

export interface WhipInput {
  walks: number;
  hits: number;
  inningsPitched: number;
}

export function computeWHIP(input: WhipInput) {
  const walks = Math.max(0, input.walks);
  const hits = Math.max(0, input.hits);
  const ip = Math.max(0, input.inningsPitched);

  const whip = ip > 0 ? (walks + hits) / ip : 0;
  const hitsPerInning = ip > 0 ? hits / ip : 0;
  const walksPerInning = ip > 0 ? walks / ip : 0;

  return { whip, hitsPerInning, walksPerInning, baserunners: walks + hits };
}

export function WhipCalculator() {
  const [walks, setWalks] = useState('45');
  const [hits, setHits] = useState('140');
  const [inningsPitched, setInningsPitched] = useState('180');

  const result = computeWHIP({
    walks: Number(walks) || 0,
    hits: Number(hits) || 0,
    inningsPitched: Number(inningsPitched) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Walks allowed" value={walks} onChange={setWalks} min={0} />
            <NumberField label="Hits allowed" value={hits} onChange={setHits} min={0} />
            <NumberField label="Innings pitched" value={inningsPitched} onChange={setInningsPitched} min={0} step="0.1" />
          </div>
          <Hint>
            WHIP counts baserunners per inning: walks plus hits divided by innings pitched. Elite starters sit
            near 1.00, and anything under 1.20 is very good.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero label="WHIP" value={formatMoney(result.whip)} sub={`${result.baserunners} baserunners allowed`} />
          <ResultRows>
            <ResultRow label="Hits per inning" value={formatMoney(result.hitsPerInning)} />
            <ResultRow label="Walks per inning" value={formatMoney(result.walksPerInning)} />
            <ResultRow label="Total baserunners" value={formatMoney(result.baserunners)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default WhipCalculator;
