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

export interface PetCalorieInput {
  weightKg: number;
  stage: string;
  species: string;
}

export function computePetCalories(input: PetCalorieInput) {
  const weight = Math.max(0, input.weightKg);
  const factor = Number(input.stage) || 1;

  const restingKcal = 70 * Math.pow(weight, 0.75);
  const dailyKcal = weight > 0 ? restingKcal * factor : 0;
  const weeklyKcal = dailyKcal * 7;
  const kcalPerKg = safeKcalPerKg(dailyKcal, weight);
  const species = input.species === 'cat' ? 'Cat' : 'Dog';

  return { restingKcal, dailyKcal, weeklyKcal, kcalPerKg, factor, species };
}

function safeKcalPerKg(daily: number, weight: number) {
  return weight === 0 ? 0 : daily / weight;
}

export function PetCalorieCalculator() {
  const [weightKg, setWeightKg] = useState('20');
  const [stage, setStage] = useState('1.6');
  const [species, setSpecies] = useState('dog');

  const result = computePetCalories({
    weightKg: Number(weightKg) || 0,
    stage,
    species,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Body weight (kg)" value={weightKg} onChange={setWeightKg} min={0} step="0.1" />
            <SelectField
              label="Life stage"
              value={stage}
              onChange={setStage}
              options={[
                { value: '3', label: 'Puppy / kitten (3.0 × RER)' },
                { value: '1.8', label: 'Intact adult (1.8 × RER)' },
                { value: '1.6', label: 'Neutered adult (1.6 × RER)' },
                { value: '1.4', label: 'Senior (1.4 × RER)' },
                { value: '1', label: 'Weight loss (1.0 × RER)' },
              ]}
            />
            <SelectField
              label="Species"
              value={species}
              onChange={setSpecies}
              options={[
                { value: 'dog', label: 'Dog' },
                { value: 'cat', label: 'Cat' },
              ]}
            />
          </div>
          <Hint>
            Daily calories = 70 × (weight in kg)^0.75 × life-stage factor. Weigh pets monthly and adjust by 10 %
            if the body condition score drifts from the ideal 4–6 range.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Calories per day"
            value={`${formatMoney(result.dailyKcal, 0)} kcal`}
            sub={`${result.species} — life-stage factor ${result.factor} × resting energy`}
          />
          <ResultRows>
            <ResultRow label="Weekly calories" value={`${formatMoney(result.weeklyKcal, 0)} kcal`} />
            <ResultRow label="Resting energy (kcal)" value={formatMoney(result.restingKcal, 0)} />
            <ResultRow label="Calories per kg" value={formatMoney(result.kcalPerKg, 0)} />
            <ResultRow label="Species" value={result.species} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default PetCalorieCalculator;
