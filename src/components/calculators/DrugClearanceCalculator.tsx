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

export interface DrugClearanceInput {
  dose: number;
  volumeOfDistribution: number;
  eliminationHalfLife: number;
}

export function computeDrugClearance(input: DrugClearanceInput) {
  const ke = Math.log(2) / (input.eliminationHalfLife || 1);
  const clearance = ke * input.volumeOfDistribution;
  const steadyState = input.dose / (input.volumeOfDistribution || 1);
  const timeToSteadyState = 4 * input.eliminationHalfLife;
  return { ke, clearance, steadyState, timeToSteadyState };
}

export function DrugClearanceCalculator() {
  const [dose, setDose] = useState('500');
  const [volumeOfDistribution, setVolumeOfDistribution] = useState('40');
  const [eliminationHalfLife, setEliminationHalfLife] = useState('6');

  const result = useMemo(
    () =>
      computeDrugClearance({
        dose: Number(dose) || 0,
        volumeOfDistribution: Number(volumeOfDistribution) || 0,
        eliminationHalfLife: Number(eliminationHalfLife) || 0,
      }),
    [dose, volumeOfDistribution, eliminationHalfLife]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Dose (mg)" value={dose} onChange={setDose} min={0} step="10" />
            <NumberField label="Volume of distribution (L)" value={volumeOfDistribution} onChange={setVolumeOfDistribution} min={0} step="1" />
            <NumberField label="Elimination half-life (h)" value={eliminationHalfLife} onChange={setEliminationHalfLife} min={0} step="0.5" />
          </div>
          <Hint>
            Clearance = kₑ × Vd, where kₑ = ln(2) / half-life. Steady state is reached after about four
            half-lives, and the steady-state concentration is dose ÷ Vd.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Drug clearance"
            value={`${formatMoney(result.clearance)} L/h`}
            sub={`kₑ ${formatMoney(result.ke)} /h`}
          />
          <ResultRows>
            <ResultRow label="Steady-state concentration" value={`${formatMoney(result.steadyState)} mg/L`} />
            <ResultRow label="Time to steady state" value={`${formatMoney(result.timeToSteadyState)} h`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default DrugClearanceCalculator;