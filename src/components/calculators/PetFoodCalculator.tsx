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
  safeDiv,
} from './kit';

export interface PetFoodInput {
  weightKg: number;
  activity: string;
  kcalPerCup: number;
  mealsPerDay: number;
}

export function computePetFood(input: PetFoodInput) {
  const weight = Math.max(0, input.weightKg);
  const multiplier = Number(input.activity) || 1;
  const kcalPerCup = Math.max(0, input.kcalPerCup);
  const meals = Math.max(1, Math.floor(input.mealsPerDay));

  const restingKcal = 70 * Math.pow(weight, 0.75);
  const dailyKcal = weight > 0 ? restingKcal * multiplier : 0;
  const cupsPerDay = safeDiv(dailyKcal, kcalPerCup);
  const cupsPerMeal = safeDiv(cupsPerDay, meals);

  return { restingKcal, dailyKcal, cupsPerDay, cupsPerMeal, meals };
}

export function PetFoodCalculator() {
  const [weightKg, setWeightKg] = useState('10');
  const [activity, setActivity] = useState('1.6');
  const [kcalPerCup, setKcalPerCup] = useState('380');
  const [mealsPerDay, setMealsPerDay] = useState('2');

  const result = computePetFood({
    weightKg: Number(weightKg) || 0,
    activity,
    kcalPerCup: Number(kcalPerCup) || 0,
    mealsPerDay: Number(mealsPerDay) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Body weight (kg)" value={weightKg} onChange={setWeightKg} min={0} step="0.1" />
            <SelectField
              label="Activity level"
              value={activity}
              onChange={setActivity}
              options={[
                { value: '1', label: 'Weight loss (1.0 × RER)' },
                { value: '1.6', label: 'Neutered adult (1.6 × RER)' },
                { value: '1.8', label: 'Intact adult (1.8 × RER)' },
                { value: '2', label: 'Active / working (2.0 × RER)' },
              ]}
            />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="kcal per cup" value={kcalPerCup} onChange={setKcalPerCup} min={1} />
              <NumberField label="Meals per day" value={mealsPerDay} onChange={setMealsPerDay} min={1} max={6} />
            </div>
          </div>
          <Hint>
            Resting energy requirement is 70 × body weight in kg raised to the 0.75 power. Activity multipliers
            follow standard veterinary feeding guidelines.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Cups of food per day"
            value={formatMoney(result.cupsPerDay)}
            sub={`${formatMoney(result.dailyKcal, 0)} kcal across ${result.meals} meal(s)`}
          />
          <ResultRows>
            <ResultRow label="Cups per meal" value={formatMoney(result.cupsPerMeal)} />
            <ResultRow label="Daily calories (kcal)" value={formatMoney(result.dailyKcal, 0)} />
            <ResultRow label="Resting energy (kcal)" value={formatMoney(result.restingKcal, 0)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default PetFoodCalculator;
