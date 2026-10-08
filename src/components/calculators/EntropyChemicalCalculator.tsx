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

export interface EntropyChemicalInput {
  heat: number;
  temperature: number;
  moles: number;
}

export function computeEntropyChemical(input: EntropyChemicalInput) {
  const temperature = input.temperature > 0 ? input.temperature : 0;
  const deltaS = temperature > 0 ? input.heat / temperature : 0;
  const molar = input.moles > 0 ? safeDiv(deltaS, input.moles) : 0;
  const heatPerMole = input.moles > 0 ? safeDiv(input.heat, input.moles) : 0;
  return { deltaS, molar, heatPerMole, temperature };
}

export function EntropyChemicalCalculator() {
  const [heat, setHeat] = useState('5000');
  const [temperature, setTemperature] = useState('300');
  const [moles, setMoles] = useState('2');

  const result = computeEntropyChemical({
    heat: Number(heat) || 0,
    temperature: Number(temperature) || 0,
    moles: Number(moles) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField
              label="Reversible heat exchanged (J)"
              value={heat}
              onChange={setHeat}
              step="10"
            />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Temperature (K)" value={temperature} onChange={setTemperature} min={0} />
              <NumberField label="Amount of substance (mol)" value={moles} onChange={setMoles} min={0} />
            </div>
          </div>
          <Hint>
            Entropy change for a reversible process is q ÷ T; dividing by moles gives the molar value usually
            listed in thermodynamic tables.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Entropy change"
            value={`${formatMoney(result.deltaS)} J/K`}
            sub={`${formatMoney(result.molar)} J/mol·K per mole`
            }
          />
          <ResultRows>
            <ResultRow label="Molar entropy change (J/mol·K)" value={formatMoney(result.molar)} />
            <ResultRow label="Heat per mole (J/mol)" value={formatMoney(result.heatPerMole)} />
            <ResultRow label="Temperature (K)" value={formatMoney(result.temperature)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default EntropyChemicalCalculator;
