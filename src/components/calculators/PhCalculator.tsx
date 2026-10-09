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

export interface PhInput {
  hydrogenConcentration: number;
}

export function computePh(input: PhInput) {
  const c = Math.max(1e-15, input.hydrogenConcentration);
  const ph = -Math.log10(c);
  const poh = 14 - ph;
  const ohConcentration = Math.pow(10, -poh);
  const type = ph < 7 ? 'Acidic' : ph > 7 ? 'Basic' : 'Neutral';
  return { ph, poh, ohConcentration, type };
}

export function PhCalculator() {
  const [hydrogenConcentration, setHydrogenConcentration] = useState('0.0001');

  const result = computePh({
    hydrogenConcentration: Number(hydrogenConcentration) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField
              label="Hydrogen ion concentration (mol/L)"
              value={hydrogenConcentration}
              onChange={setHydrogenConcentration}
              min={0}
              step="any"
              placeholder="e.g. 0.0001"
            />
          </div>
          <Hint>
            pH = −log₁₀[H⁺]. Pure water at 25 °C has [H⁺] = 1×10⁻⁷ mol/L and
            pH 7. Type values below 1 as decimals (0.0001 = 1×10⁻⁴).
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="pH level"
            value={formatMoney(result.ph)}
            sub={result.type}
          />
          <ResultRows>
            <ResultRow label="pOH" value={formatMoney(result.poh)} />
            <ResultRow
              label="Hydroxide concentration (mol/L)"
              value={result.ohConcentration.toExponential(2)}
            />
            <ResultRow label="Solution type" value={result.type} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default PhCalculator;
