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

export interface ERAInput {
  earnedRuns: number;
  inningsPitched: number;
}

export function computeERA(input: ERAInput) {
  const er = Math.max(0, input.earnedRuns);
  const ip = Math.max(0, input.inningsPitched);

  const era = ip > 0 ? (er * 9) / ip : 0;
  const runsPerInning = ip > 0 ? er / ip : 0;
  const runsPerSeven = runsPerInning * 7;

  return { era, runsPerInning, runsPerSeven, outs: Math.round(ip * 3) };
}

export function EraCalculator() {
  const [earnedRuns, setEarnedRuns] = useState('54');
  const [inningsPitched, setInningsPitched] = useState('180');

  const result = computeERA({
    earnedRuns: Number(earnedRuns) || 0,
    inningsPitched: Number(inningsPitched) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Earned runs" value={earnedRuns} onChange={setEarnedRuns} min={0} />
            <NumberField label="Innings pitched" value={inningsPitched} onChange={setInningsPitched} min={0} step="0.1" />
          </div>
          <Hint>
            ERA scales earned runs to a full nine-inning game. Use total innings pitched (180, not 20) and
            remember 0.1 innings means one out recorded.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Earned run average"
            value={formatMoney(result.era)}
            sub={`${earnedRuns || 0} earned runs over ${inningsPitched || 0} innings`}
          />
          <ResultRows>
            <ResultRow label="Earned runs per inning" value={formatMoney(result.runsPerInning)} />
            <ResultRow label="Runs per 7 innings" value={formatMoney(result.runsPerSeven)} />
            <ResultRow label="Outs recorded" value={formatMoney(result.outs)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default EraCalculator;
