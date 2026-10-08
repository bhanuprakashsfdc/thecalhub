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

export interface OnBaseInput {
  hits: number;
  walks: number;
  hitByPitch: number;
  atBats: number;
  sacrificeFlies: number;
}

export function computeOnBase(input: OnBaseInput) {
  const h = Math.max(0, input.hits);
  const bb = Math.max(0, input.walks);
  const hbp = Math.max(0, input.hitByPitch);
  const ab = Math.max(0, input.atBats);
  const sf = Math.max(0, input.sacrificeFlies);

  const onBase = h + bb + hbp;
  const plateAppearances = ab + bb + hbp + sf;
  const obp = plateAppearances > 0 ? onBase / plateAppearances : 0;

  return { obp, onBase, plateAppearances, per100: plateAppearances > 0 ? (onBase / plateAppearances) * 100 : 0 };
}

export function OnBasePercentageCalculator() {
  const [hits, setHits] = useState('175');
  const [walks, setWalks] = useState('65');
  const [hitByPitch, setHitByPitch] = useState('6');
  const [atBats, setAtBats] = useState('560');
  const [sacrificeFlies, setSacrificeFlies] = useState('5');

  const result = computeOnBase({
    hits: Number(hits) || 0,
    walks: Number(walks) || 0,
    hitByPitch: Number(hitByPitch) || 0,
    atBats: Number(atBats) || 0,
    sacrificeFlies: Number(sacrificeFlies) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Hits" value={hits} onChange={setHits} min={0} />
              <NumberField label="Walks" value={walks} onChange={setWalks} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Hit by pitch" value={hitByPitch} onChange={setHitByPitch} min={0} />
              <NumberField label="At-bats" value={atBats} onChange={setAtBats} min={0} />
            </div>
            <NumberField label="Sacrifice flies" value={sacrificeFlies} onChange={setSacrificeFlies} min={0} />
          </div>
          <Hint>
            OBP is times on base divided by plate appearances. A .400 OBP is elite; walks and hit-by-pitches
            count exactly like singles.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="On-base percentage"
            value={formatMoney(result.obp)}
            sub={`${result.onBase} times on base in ${result.plateAppearances} plate appearances`}
          />
          <ResultRows>
            <ResultRow label="Times on base" value={formatMoney(result.onBase)} />
            <ResultRow label="Plate appearances" value={formatMoney(result.plateAppearances)} />
            <ResultRow label="On-base percent per 100 PA" value={`${formatMoney(result.per100)}%`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default OnBasePercentageCalculator;
