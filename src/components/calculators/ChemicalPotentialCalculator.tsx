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

export interface ChemicalPotentialInput {
  dg0: number;
  temperature: number;
  q: number;
}

const R_KJ = 0.008314;

export function computeChemicalPotential(input: ChemicalPotentialInput) {
  const rt = R_KJ * input.temperature;
  const lnq = input.q > 0 ? Math.log(input.q) : 0;
  const correction = rt * lnq;
  const deltaG = input.dg0 + correction;
  const verdict = deltaG < 0 ? 'Spontaneous' : deltaG === 0 ? 'At equilibrium' : 'Non-spontaneous';
  return { rt, lnq, correction, deltaG, verdict };
}

export function ChemicalPotentialCalculator() {
  const [dg0, setDg0] = useState('-40');
  const [temperature, setTemperature] = useState('298');
  const [q, setQ] = useState('1');

  const result = computeChemicalPotential({
    dg0: Number(dg0) || 0,
    temperature: Number(temperature) || 0,
    q: Number(q) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField
              label="Standard free energy ΔG° (kJ/mol)"
              value={dg0}
              onChange={setDg0}
              step="0.1"
            />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Temperature (K)" value={temperature} onChange={setTemperature} min={0} />
              <NumberField label="Reaction quotient Q" value={q} onChange={setQ} min={0} step="0.01" />
            </div>
          </div>
          <Hint>
            Reaction quotient Q uses the same expression as K but with current concentrations — when Q equals K
            the driving force ΔG falls to zero.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Reaction free energy"
            value={`${formatMoney(result.deltaG)} kJ/mol`}
            sub={result.verdict}
          />
          <ResultRows>
            <ResultRow label="RT term (kJ/mol)" value={formatMoney(result.rt)} />
            <ResultRow label="ln(Q)" value={formatMoney(result.lnq)} />
            <ResultRow label="Correction term (kJ/mol)" value={formatMoney(result.correction)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ChemicalPotentialCalculator;
