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

export interface EntropyInput {
  mass: number;
  specificHeat: number;
  startTemp: number;
  endTemp: number;
}

export function computeEntropy(input: EntropyInput) {
  const ratio = input.startTemp > 0 ? input.endTemp / input.startTemp : 1;
  const logTerm = Math.log(ratio);
  const deltaS = input.mass * input.specificHeat * logTerm;
  const heat = input.mass * input.specificHeat * (input.endTemp - input.startTemp);
  return { ratio, logTerm, deltaS, heat };
}

export function EntropyCalculator() {
  const [mass, setMass] = useState('2');
  const [specificHeat, setSpecificHeat] = useState('4186');
  const [startTemp, setStartTemp] = useState('300');
  const [endTemp, setEndTemp] = useState('350');

  const result = computeEntropy({
    mass: Number(mass) || 0,
    specificHeat: Number(specificHeat) || 0,
    startTemp: Number(startTemp) || 0,
    endTemp: Number(endTemp) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Mass (kg)" value={mass} onChange={setMass} min={0} step="0.1" />
              <NumberField
                label="Specific heat (J/kg·K)"
                value={specificHeat}
                onChange={setSpecificHeat}
                min={0}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Start temperature (K)" value={startTemp} onChange={setStartTemp} min={0} />
              <NumberField label="End temperature (K)" value={endTemp} onChange={setEndTemp} min={0} />
            </div>
          </div>
          <Hint>
            For a solid or liquid heated without phase change, ΔS = m·c·ln(T₂/T₁) — temperature ratios matter,
            not temperature differences.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Entropy change"
            value={`${formatMoney(result.deltaS)} J/K`}
            sub={`Temperature ratio ${formatMoney(result.ratio)}`
            }
          />
          <ResultRows>
            <ResultRow label="ln(T₂/T₁)" value={formatMoney(result.logTerm)} />
            <ResultRow label="Heat transferred (J)" value={formatMoney(result.heat)} />
            <ResultRow label="mc product (J/K)" value={formatMoney(Number(mass || 0) * Number(specificHeat || 0))} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default EntropyCalculator;
