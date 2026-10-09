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

export interface KnotsInput {
  knots: number;
}

export function computeKnots(input: KnotsInput) {
  const knots = input.knots;
  const kmh = knots * 1.852;
  const mph = knots * 1.150779448;
  const ms = knots * 0.514444444;
  const ftm = knots * 101.268591426;
  return { kmh, mph, ms, ftm };
}

export function KnotsCalculator() {
  const [knots, setKnots] = useState('10');

  const result = computeKnots({ knots: Number(knots) || 0 });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Speed (knots)" value={knots} onChange={setKnots} min={0} step="0.1" />
          </div>
          <Hint>
            One knot is one nautical mile per hour, exactly 1.852 km/h. Used for marine and
            aviation speeds.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Speed in km/h"
            value={`${formatMoney(result.kmh)} km/h`}
            sub="Kilometres per hour"
          />
          <ResultRows>
            <ResultRow label="Miles per hour (mph)" value={formatMoney(result.mph)} />
            <ResultRow label="Meters per second (m/s)" value={formatMoney(result.ms)} />
            <ResultRow label="Feet per minute (ft/min)" value={formatMoney(result.ftm)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default KnotsCalculator;
