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

export interface FatInput {
  totalWeight: number;
  bodyFatPercent: number;
  leanMass: number;
}

export function computeFat(input: FatInput) {
  const fatMass = input.totalWeight * (input.bodyFatPercent / 100);
  const leanMass = input.totalWeight - fatMass;
  const fatCalories = fatMass * 9;
  const leanCalories = leanMass * 4;
  const totalCalories = fatCalories + leanCalories;
  return { fatMass, leanMass, fatCalories, leanCalories, totalCalories };
}

export function FatCalculator() {
  const [totalWeight, setTotalWeight] = useState('70');
  const [bodyFatPercent, setBodyFatPercent] = useState('20');
  const [leanMass, setLeanMass] = useState('0');

  const result = useMemo(
    () =>
      computeFat({
        totalWeight: Number(totalWeight) || 0,
        bodyFatPercent: Number(bodyFatPercent) || 0,
        leanMass: Number(leanMass) || 0,
      }),
    [totalWeight, bodyFatPercent, leanMass]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Total weight (kg)" value={totalWeight} onChange={setTotalWeight} min={0} step="1" />
            <NumberField label="Body fat (%)" value={bodyFatPercent} onChange={setBodyFatPercent} min={0} max={100} step="1" />
            <NumberField label="Lean mass (kg)" value={leanMass} onChange={setLeanMass} min={0} step="1" />
          </div>
          <Hint>
            Body fat mass = weight × body fat %. Fat provides 9 kcal/g, lean tissue 4 kcal/g. The
            calorie breakdown helps with diet planning and body recomposition targets.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Fat mass"
            value={`${formatMoney(result.fatMass)} kg`}
            sub={`Lean ${formatMoney(result.leanMass)} kg`}
          />
          <ResultRows>
            <ResultRow label="Lean mass" value={`${formatMoney(result.leanMass)} kg`} />
            <ResultRow label="Fat calories" value={formatMoney(result.fatCalories)} />
            <ResultRow label="Lean calories" value={formatMoney(result.leanCalories)} />
            <ResultRow label="Total calories" value={formatMoney(result.totalCalories)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default FatCalculator;