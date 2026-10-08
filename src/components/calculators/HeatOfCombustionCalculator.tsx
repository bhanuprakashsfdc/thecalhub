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
  safeDiv,
} from './kit';

export interface HeatOfCombustionInput {
  energy: number;
  mass: number;
  molarMass: number;
}

export function computeHeatOfCombustion(input: HeatOfCombustionInput) {
  const moles = input.molarMass > 0 ? input.mass / input.molarMass : 0;
  const perMole = moles > 0 ? -safeDiv(input.energy, moles) : 0;
  const perGram = safeDiv(input.energy, input.mass);
  return { moles, perMole, perGram };
}

export function HeatOfCombustionCalculator() {
  const [energy, setEnergy] = useState('2400');
  const [mass, setMass] = useState('64');
  const [molarMass, setMolarMass] = useState('32');

  const result = computeHeatOfCombustion({
    energy: Number(energy) || 0,
    mass: Number(mass) || 0,
    molarMass: Number(molarMass) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Energy released (kJ)" value={energy} onChange={setEnergy} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Mass burned (g)" value={mass} onChange={setMass} min={0} />
              <NumberField label="Molar mass (g/mol)" value={molarMass} onChange={setMolarMass} min={0} />
            </div>
          </div>
          <Hint>
            Heat of combustion is reported as a negative value because energy leaves the system — the larger the
            magnitude, the more energetic the fuel.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Heat of combustion"
            value={`${formatMoney(result.perMole)} kJ/mol`}
            sub={`${formatMoney(result.perGram)} kJ per gram burned`
            }
          />
          <ResultRows>
            <ResultRow label="Moles burned" value={formatMoney(result.moles)} />
            <ResultRow label="Energy per gram (kJ/g)" value={formatMoney(result.perGram)} />
            <ResultRow label="Energy per mole (kJ/mol)" value={formatMoney(-result.perMole)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default HeatOfCombustionCalculator;
