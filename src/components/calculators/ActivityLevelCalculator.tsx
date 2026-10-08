import { useState } from 'react';
import {
  CalcGrid,
  Panel,
  PanelEyebrow,
  NumberField,
  SelectField,
  SegmentedControl,
  ResultHero,
  ResultRows,
  ResultRow,
  Hint,
  formatMoney,
} from './kit';

export interface ActivityLevelInput {
  sex: 'male' | 'female';
  age: number;
  weightKg: number;
  heightCm: number;
  factor: number;
}

export function computeActivityLevel(input: ActivityLevelInput) {
  const weight = Math.max(0, input.weightKg);
  const height = Math.max(0, input.heightCm);
  const age = Math.max(0, input.age);
  const offset = input.sex === 'male' ? 5 : -161;
  const bmr = 10 * weight + 6.25 * height - 5 * age + offset;
  const tdee = bmr * Math.max(0, input.factor);
  const deficit = Math.max(0, tdee - 500);

  return { bmr, tdee, deficit };
}

const ACTIVITY_OPTIONS = [
  { value: '1.2', label: 'Sedentary (1.2)' },
  { value: '1.375', label: 'Lightly active (1.375)' },
  { value: '1.55', label: 'Moderately active (1.55)' },
  { value: '1.725', label: 'Very active (1.725)' },
  { value: '1.9', label: 'Extra active (1.9)' },
];

export function ActivityLevelCalculator() {
  const [sex, setSex] = useState('male');
  const [age, setAge] = useState('30');
  const [weightKg, setWeightKg] = useState('75');
  const [heightCm, setHeightCm] = useState('178');
  const [factor, setFactor] = useState('1.55');

  const result = computeActivityLevel({
    sex: sex === 'female' ? 'female' : 'male',
    age: Number(age) || 0,
    weightKg: Number(weightKg) || 0,
    heightCm: Number(heightCm) || 0,
    factor: Number(factor) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <SegmentedControl
              label="Sex"
              value={sex}
              onChange={setSex}
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
              ]}
            />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Age" value={age} onChange={setAge} min={0} max={120} />
              <NumberField label="Weight (kg)" value={weightKg} onChange={setWeightKg} min={0} />
            </div>
            <NumberField label="Height (cm)" value={heightCm} onChange={setHeightCm} min={0} />
            <SelectField label="Activity level" value={factor} onChange={setFactor} options={ACTIVITY_OPTIONS} />
          </div>
          <Hint>
            Basal metabolic rate covers what your body burns at rest; the activity factor multiplies it for
            movement. Maintenance calories sit at TDEE, not BMR.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Maintenance calories"
            value={`${formatMoney(result.tdee)} kcal`}
            sub="Calories to maintain current weight"
          />
          <ResultRows>
            <ResultRow label="Basal metabolic rate" value={`${formatMoney(result.bmr)} kcal`} />
            <ResultRow label="Mild deficit (−500 kcal)" value={`${formatMoney(result.deficit)} kcal`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ActivityLevelCalculator;
