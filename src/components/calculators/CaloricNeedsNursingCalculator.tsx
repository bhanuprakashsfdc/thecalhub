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

export interface CaloricNeedsNursingInput {
  sex: string;
  age: number;
  weight: number;
  height: number;
  activity: string;
  stress: string;
}

export interface CaloricNeedsNursingResult {
  bmr: number;
  tdee: number;
  needs: number;
  kcalPerKg: number;
  stressExtra: number;
}

const ACTIVITY: Record<string, { label: string; factor: number }> = {
  bedrest: { label: 'Bed rest', factor: 1.2 },
  light: { label: 'Light activity', factor: 1.3 },
  moderate: { label: 'Moderate activity', factor: 1.5 },
};

const STRESS: Record<string, { label: string; factor: number }> = {
  none: { label: 'No added stress', factor: 1.0 },
  elective: { label: 'Elective surgery', factor: 1.1 },
  infection: { label: 'Infection or mild injury', factor: 1.3 },
  trauma: { label: 'Major surgery or trauma', factor: 1.5 },
  severe: { label: 'Severe burn or sepsis', factor: 1.75 },
};

const positive = (raw: number) => (Number.isFinite(raw) && raw > 0 ? raw : 0);

export function computeCaloricNeedsNursing(input: CaloricNeedsNursingInput): CaloricNeedsNursingResult {
  const age = positive(input.age);
  const weight = positive(input.weight);
  const height = positive(input.height);
  const activityFactor = ACTIVITY[input.activity]?.factor ?? 1;
  const stressFactor = STRESS[input.stress]?.factor ?? 1;

  const base = 10 * weight + 6.25 * height - 5 * age;
  const bmr = Math.max(0, input.sex === 'female' ? base - 161 : base + 5);
  const tdee = bmr * activityFactor;
  const needs = tdee * stressFactor;

  return {
    bmr,
    tdee,
    needs,
    kcalPerKg: safeDiv(needs, weight),
    stressExtra: needs - tdee,
  };
}

export function CaloricNeedsNursingCalculator() {
  const [sex, setSex] = useState('female');
  const [age, setAge] = useState('40');
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('165');
  const [activity, setActivity] = useState('light');
  const [stress, setStress] = useState('infection');

  const toNumber = (raw: string) => (raw.trim() === '' ? Number.NaN : Number(raw));

  const result = computeCaloricNeedsNursing({
    sex,
    age: toNumber(age),
    weight: toNumber(weight),
    height: toNumber(height),
    activity,
    stress,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-4">
            <SelectField
              label="Sex"
              value={sex}
              onChange={setSex}
              options={[
                { value: 'female', label: 'Female' },
                { value: 'male', label: 'Male' },
              ]}
            />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Age (years)" value={age} onChange={setAge} min={0} />
              <NumberField label="Weight (kg)" value={weight} onChange={setWeight} min={0} step="0.1" />
            </div>
            <NumberField label="Height (cm)" value={height} onChange={setHeight} min={0} step="0.1" />
            <SelectField
              label="Activity level"
              value={activity}
              onChange={setActivity}
              options={Object.entries(ACTIVITY).map(([value, item]) => ({ value, label: item.label }))}
            />
            <SelectField
              label="Clinical stress factor"
              value={stress}
              onChange={setStress}
              options={Object.entries(STRESS).map(([value, item]) => ({ value, label: item.label }))}
            />
          </div>
          <Hint>
            Basal needs use the Mifflin-St Jeor equation, then the activity multiplier and the clinical stress
            multiplier are applied on top of it.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Daily energy needs"
            value={`${formatMoney(result.needs, 0)} kcal`}
            sub="Stress-adjusted estimate for 24 hours"
          />
          <ResultRows>
            <ResultRow label="Basal metabolic rate" value={`${formatMoney(result.bmr, 0)} kcal`} />
            <ResultRow label="Activity-adjusted (TDEE)" value={`${formatMoney(result.tdee, 0)} kcal`} />
            <ResultRow label="Extra kcal from stress" value={`${formatMoney(result.stressExtra, 0)} kcal`} />
            <ResultRow label="Adjusted kcal per kg" value={`${formatMoney(result.kcalPerKg)} kcal/kg`} />
          </ResultRows>
          <Hint>
            Mifflin-St Jeor: 10 × weight + 6.25 × height − 5 × age, plus 5 for men and minus 161 for women.
            Empty fields are treated as zero, so the estimate never becomes NaN.
          </Hint>
        </Panel>
      }
    />
  );
}

export default CaloricNeedsNursingCalculator;
