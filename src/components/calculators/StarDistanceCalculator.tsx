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

export interface StarDistanceInput {
  parallaxMas: number;
}

export function computeStarDistance(input: StarDistanceInput) {
  const parallax = Math.max(0.0001, input.parallaxMas);

  const parsecs = 1000 / parallax;
  const lightYears = parsecs * 3.261564;
  const au = parsecs * 206264.806;

  return { parsecs, lightYears, au };
}

export function StarDistanceCalculator() {
  const [parallaxMas, setParallaxMas] = useState('58.79');

  const result = computeStarDistance({ parallaxMas: Number(parallaxMas) || 0 });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Parallax (milliarcseconds)" value={parallaxMas} onChange={setParallaxMas} min={0.0001} step="0.01" />
          </div>
          <Hint>
            Stellar distance is the inverse of parallax: d = 1000 ÷ p when p is in milliarcseconds. Gaia
            measures parallaxes down to a few microarcseconds.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Distance"
            value={`${formatMoney(result.parsecs)} pc`}
            sub={`${formatMoney(result.lightYears)} light years away`}
          />
          <ResultRows>
            <ResultRow label="Distance in light years" value={formatMoney(result.lightYears)} />
            <ResultRow label="Distance in AU" value={formatMoney(result.au)} />
            <ResultRow label="Parallax used" value={`${formatMoney(Number(parallaxMas) || 0)} mas`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default StarDistanceCalculator;
