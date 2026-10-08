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

export interface GibbsFreeEnergyInput {
  enthalpy: number;
  temperature: number;
  entropy: number;
}

export function computeGibbsFreeEnergy(input: GibbsFreeEnergyInput) {
  const entropyKj = input.entropy / 1000;
  const tDeltaS = input.temperature * entropyKj;
  const deltaG = input.enthalpy - tDeltaS;
  const equilibriumT = entropyKj !== 0 ? input.enthalpy / entropyKj : 0;
  const verdict = deltaG < 0 ? 'Spontaneous' : deltaG === 0 ? 'At equilibrium' : 'Non-spontaneous';
  return { entropyKj, tDeltaS, deltaG, equilibriumT, verdict };
}

export function GibbsFreeEnergyCalculator() {
  const [enthalpy, setEnthalpy] = useState('-80');
  const [temperature, setTemperature] = useState('298');
  const [entropy, setEntropy] = useState('-120');

  const result = computeGibbsFreeEnergy({
    enthalpy: Number(enthalpy) || 0,
    temperature: Number(temperature) || 0,
    entropy: Number(entropy) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField
              label="Enthalpy change ΔH (kJ/mol)"
              value={enthalpy}
              onChange={setEnthalpy}
              step="0.1"
            />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Temperature (K)" value={temperature} onChange={setTemperature} min={0} />
              <NumberField
                label="Entropy change ΔS (J/mol·K)"
                value={entropy}
                onChange={setEntropy}
                step="0.1"
              />
            </div>
          </div>
          <Hint>
            ΔG = ΔH − TΔS. Exothermic reactions with an entropy increase are spontaneous at every temperature;
            entropy decreases make them spontaneous only below the equilibrium temperature.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Gibbs free energy"
            value={`${formatMoney(result.deltaG)} kJ/mol`}
            sub={result.verdict}
          />
          <ResultRows>
            <ResultRow label="TΔS (kJ/mol)" value={formatMoney(result.tDeltaS)} />
            <ResultRow label="ΔS (kJ/mol·K)" value={formatMoney(result.entropyKj)} />
            <ResultRow label="Equilibrium temperature (K)" value={formatMoney(result.equilibriumT)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default GibbsFreeEnergyCalculator;
