import { useState, useMemo } from 'react';
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

export interface PoHInput {
  ph: number;
}

export function computePoH(input: PoHInput) {
  const poh = 14 - input.ph;
  const oh = Math.pow(10, -poh);
  const h = Math.pow(10, -input.ph);
  return { poh, oh, h };
}

export function PoHCalculator() {
  const [ph, setPh] = useState('7');

  const result = useMemo(
    () =>
      computePoH({
        ph: Number(ph) || 0,
      }),
    [ph]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="pH" value={ph} onChange={setPh} min={0} max={14} step="0.1" />
          </div>
          <Hint>
            pOH = 14 − pH at 25 °C. The hydroxide ion concentration is 10^(−pOH) mol/L, and the
            relationship between pH and pOH follows the water autoprotolysis constant Kw = 10^(−14).
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="pOH"
            value={`${formatMoney(result.poh)}`}
          />
          <ResultRows>
            <ResultRow label="[OH⁻] mol/L" value={formatMoney(result.oh)} />
            <ResultRow label="[H⁺] mol/L" value={formatMoney(result.h)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default PoHCalculator;