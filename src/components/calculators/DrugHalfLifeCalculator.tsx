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

export interface DrugHalfLifeInput {
  doseMg: number;
  halfLifeHours: number;
  elapsedHours: number;
}

export function computeDrugHalfLife(input: DrugHalfLifeInput) {
  const halfLives = input.halfLifeHours > 0 ? input.elapsedHours / input.halfLifeHours : 0;
  const remaining = input.doseMg * Math.pow(0.5, halfLives);
  const eliminated = input.doseMg - remaining;
  const timeToEliminate = input.halfLifeHours * 5;
  return { halfLives, remaining, eliminated, timeToEliminate };
}

export function DrugHalfLifeCalculator() {
  const [doseMg, setDoseMg] = useState('500');
  const [halfLifeHours, setHalfLifeHours] = useState('6');
  const [elapsedHours, setElapsedHours] = useState('18');

  const result = computeDrugHalfLife({
    doseMg: Number(doseMg) || 0,
    halfLifeHours: Number(halfLifeHours) || 0,
    elapsedHours: Number(elapsedHours) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Initial dose (mg)" value={doseMg} onChange={setDoseMg} min={0} />
            <NumberField label="Half-life (hours)" value={halfLifeHours} onChange={setHalfLifeHours} min={0} step="0.1" />
            <NumberField label="Time elapsed (hours)" value={elapsedHours} onChange={setElapsedHours} min={0} step="0.5" />
          </div>
          <Hint>
            Remaining drug = dose × 0.5^(elapsed ÷ half-life). About 97% of a drug is
            cleared after five half-lives.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Remaining drug"
            value={`${formatMoney(result.remaining)} mg`}
            sub="Still in the body"
          />
          <ResultRows>
            <ResultRow label="Half-lives elapsed" value={formatMoney(result.halfLives)} />
            <ResultRow label="Drug eliminated (mg)" value={formatMoney(result.eliminated)} />
            <ResultRow label="Time to 97% elimination (hours)" value={formatMoney(result.timeToEliminate)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default DrugHalfLifeCalculator;
