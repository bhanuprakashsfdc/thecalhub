import { useState } from 'react';
import {
  CalcGrid,
  Panel,
  PanelEyebrow,
  NumberField,
  SelectField,
  ResultHero,
  ResultRows,
  ResultRow,
  Hint,
  formatMoney,
} from './kit';

export interface CarbInput {
  dailyCalories: number;
  carbPct: number;
}

export function computeCarb(input: CarbInput) {
  const carbCalories = input.dailyCalories * (input.carbPct / 100);
  const carbGrams = carbCalories / 4;
  const proteinGrams = (input.dailyCalories * 0.25) / 4;
  const fatGrams = (input.dailyCalories * 0.25) / 9;
  return { carbCalories, carbGrams, proteinGrams, fatGrams };
}

const ACTIVITY_OPTIONS = [
  { value: '40', label: 'Sedentary (40% carbs)' },
  { value: '50', label: 'Moderately active (50% carbs)' },
  { value: '60', label: 'Very active (60% carbs)' },
];

export function CarbCalculator() {
  const [dailyCalories, setDailyCalories] = useState('2000');
  const [carbPct, setCarbPct] = useState('50');

  const result = computeCarb({
    dailyCalories: Number(dailyCalories) || 0,
    carbPct: Number(carbPct) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Daily calories" value={dailyCalories} onChange={setDailyCalories} min={0} step="1" />
            <SelectField
              label="Activity level"
              value={carbPct}
              onChange={setCarbPct}
              options={ACTIVITY_OPTIONS}
            />
          </div>
          <Hint>
            Carbs provide 4 kcal per gram. The remaining
            calories are split 25% protein / 25% fat for a balanced
            macro target.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Daily carbs"
            value={`${formatMoney(result.carbGrams)} g`}
            sub="Carbohydrate target"
          />
          <ResultRows>
            <ResultRow label="Calories from carbs" value={formatMoney(result.carbCalories)} />
            <ResultRow label="Protein target (g)" value={formatMoney(result.proteinGrams)} />
            <ResultRow label="Fat target (g)" value={formatMoney(result.fatGrams)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default CarbCalculator;
