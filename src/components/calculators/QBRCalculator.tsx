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

export interface QBRInput {
  totalEpa: number;
  plays: number;
  turnovers: number;
}

export function computeQBR(input: QBRInput) {
  const plays = Math.max(0, input.plays);
  const epaPerPlay = plays > 0 ? input.totalEpa / plays : 0;
  const raw = 50 + epaPerPlay * 25 - Math.max(0, input.turnovers) * 3;
  const qbr = Math.min(100, Math.max(0, raw));

  return { epaPerPlay, qbr, adjustment: qbr - 50 };
}

export function QBRCalculator() {
  const [totalEpa, setTotalEpa] = useState('12');
  const [plays, setPlays] = useState('64');
  const [turnovers, setTurnovers] = useState('1');

  const result = computeQBR({
    totalEpa: Number(totalEpa) || 0,
    plays: Number(plays) || 0,
    turnovers: Number(turnovers) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Total expected points added" value={totalEpa} onChange={setTotalEpa} step="0.1" />
            <NumberField label="Offensive plays" value={plays} onChange={setPlays} min={0} />
            <NumberField label="Turnovers" value={turnovers} onChange={setTurnovers} min={0} />
          </div>
          <Hint>
            ESPN's Total QBR is proprietary; this estimate starts from a league-average 50 and adjusts by
            expected points per play with a penalty for turnovers, scaled to 0–100.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero label="Estimated QBR" value={formatMoney(result.qbr)} sub="0–100 scale, 50 is average" />
          <ResultRows>
            <ResultRow label="Expected points per play" value={formatMoney(result.epaPerPlay)} />
            <ResultRow label="Adjustment from average" value={formatMoney(result.adjustment)} />
            <ResultRow label="Plays included" value={formatMoney(Math.max(0, Number(plays) || 0))} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default QBRCalculator;
