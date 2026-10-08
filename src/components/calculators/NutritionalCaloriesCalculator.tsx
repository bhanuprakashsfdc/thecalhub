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

export interface NutritionalCaloriesInput {
  protein: number;
  carbs: number;
  fat: number;
}

export function computeNutritionalCalories(input: NutritionalCaloriesInput) {
  const protein = Math.max(0, input.protein);
  const carbs = Math.max(0, input.carbs);
  const fat = Math.max(0, input.fat);

  const proteinKcal = protein * 4;
  const carbKcal = carbs * 4;
  const fatKcal = fat * 9;
  const kcal = proteinKcal + carbKcal + fatKcal;
  const kj = kcal * 4.184;
  const proteinShare = kcal > 0 ? (proteinKcal / kcal) * 100 : 0;

  return { proteinKcal, carbKcal, fatKcal, kcal, kj, proteinShare };
}

export function NutritionalCaloriesCalculator() {
  const [protein, setProtein] = useState('50');
  const [carbs, setCarbs] = useState('200');
  const [fat, setFat] = useState('60');

  const result = computeNutritionalCalories({
    protein: Number(protein) || 0,
    carbs: Number(carbs) || 0,
    fat: Number(fat) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Protein (g)" value={protein} onChange={setProtein} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Carbohydrate (g)" value={carbs} onChange={setCarbs} min={0} />
              <NumberField label="Fat (g)" value={fat} onChange={setFat} min={0} />
            </div>
          </div>
          <Hint>
            Protein and carbohydrate carry 4 kcal per gram, fat carries 9, and alcohol carries 7. Multiplying
            each macro by its factor gives the energy on the nutrition label.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Energy from macros"
            value={`${formatMoney(result.kcal, 0)} kcal`}
            sub={`${formatMoney(result.kj, 0)} kJ`}
          />
          <ResultRows>
            <ResultRow label="From protein" value={`${formatMoney(result.proteinKcal, 0)} kcal`} />
            <ResultRow label="From carbs" value={`${formatMoney(result.carbKcal, 0)} kcal`} />
            <ResultRow label="From fat" value={`${formatMoney(result.fatKcal, 0)} kcal`} />
            <ResultRow label="Protein share" value={`${formatMoney(result.proteinShare, 0)}%`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default NutritionalCaloriesCalculator;
