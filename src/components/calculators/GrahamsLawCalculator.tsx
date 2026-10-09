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

export interface GrahamsLawInput {
  molarMass1: number;
  molarMass2: number;
}

export function computeGrahamsLaw(input: GrahamsLawInput) {
  const ratio = Math.sqrt(input.molarMass2 / Math.max(0.0001, input.molarMass1));
  const rate1 = 1 / Math.sqrt(Math.max(0.0001, input.molarMass1));
  const rate2 = 1 / Math.sqrt(Math.max(0.0001, input.molarMass2));
  const slowerBy = (ratio - 1) * 100;
  return { ratio, rate1, rate2, slowerBy };
}

export function GrahamsLawCalculator() {
  const [molarMass1, setMolarMass1] = useState('4');
  const [molarMass2, setMolarMass2] = useState('32');

  const result = computeGrahamsLaw({
    molarMass1: Number(molarMass1) || 0,
    molarMass2: Number(molarMass2) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Molar mass of gas 1 (g/mol)" value={molarMass1} onChange={setMolarMass1} min={0} step="0.01" />
            <NumberField label="Molar mass of gas 2 (g/mol)" value={molarMass2} onChange={setMolarMass2} min={0} step="0.01" />
          </div>
          <Hint>
            Graham's law: Rate₁ ÷ Rate₂ = √(M₂ ÷ M₁). Lighter gases effuse
            faster. Helium (4 g/mol) vs oxygen (32 g/mol) gives a ratio of √8.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Rate ratio (gas 1 ÷ gas 2)"
            value={formatMoney(result.ratio)}
            sub="Effusion rate multiplier"
          />
          <ResultRows>
            <ResultRow label="Gas 1 relative rate" value={formatMoney(result.rate1)} />
            <ResultRow label="Gas 2 relative rate" value={formatMoney(result.rate2)} />
            <ResultRow label="Gas 2 slower by (%)" value={`${formatMoney(result.slowerBy)}%`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default GrahamsLawCalculator;
