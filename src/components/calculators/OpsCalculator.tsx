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

export interface OPSInput {
  hits: number;
  atBats: number;
  walks: number;
  hitByPitch: number;
  sacrificeFlies: number;
  totalBases: number;
}

export function computeOPS(input: OPSInput) {
  const h = Math.max(0, input.hits);
  const ab = Math.max(0, input.atBats);
  const bb = Math.max(0, input.walks);
  const hbp = Math.max(0, input.hitByPitch);
  const sf = Math.max(0, input.sacrificeFlies);
  const tb = Math.max(0, input.totalBases);

  const denom = ab + bb + hbp + sf;
  const obp = denom > 0 ? (h + bb + hbp) / denom : 0;
  const slg = ab > 0 ? tb / ab : 0;
  const ops = obp + slg;

  return { obp, slg, ops, onBase: h + bb + hbp };
}

export function OpsCalculator() {
  const [hits, setHits] = useState('175');
  const [atBats, setAtBats] = useState('560');
  const [walks, setWalks] = useState('65');
  const [hitByPitch, setHitByPitch] = useState('6');
  const [sacrificeFlies, setSacrificeFlies] = useState('5');
  const [totalBases, setTotalBases] = useState('290');

  const result = computeOPS({
    hits: Number(hits) || 0,
    atBats: Number(atBats) || 0,
    walks: Number(walks) || 0,
    hitByPitch: Number(hitByPitch) || 0,
    sacrificeFlies: Number(sacrificeFlies) || 0,
    totalBases: Number(totalBases) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Hits" value={hits} onChange={setHits} min={0} />
              <NumberField label="At-bats" value={atBats} onChange={setAtBats} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Walks" value={walks} onChange={setWalks} min={0} />
              <NumberField label="Hit by pitch" value={hitByPitch} onChange={setHitByPitch} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Sacrifice flies" value={sacrificeFlies} onChange={setSacrificeFlies} min={0} />
              <NumberField label="Total bases" value={totalBases} onChange={setTotalBases} min={0} />
            </div>
          </div>
          <Hint>
            OPS adds on-base percentage to slugging percentage. Roughly .900 is All-Star level and .800 is very
            strong everyday production.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero label="OPS" value={formatMoney(result.ops)} sub="On-base percentage plus slugging" />
          <ResultRows>
            <ResultRow label="On-base percentage" value={formatMoney(result.obp)} />
            <ResultRow label="Slugging percentage" value={formatMoney(result.slg)} />
            <ResultRow label="Times on base" value={formatMoney(result.onBase)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default OpsCalculator;
