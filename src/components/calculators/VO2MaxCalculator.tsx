import { useState } from 'react';
import {
  CalcGrid,
  Panel,
  PanelEyebrow,
  NumberField,
  SegmentedControl,
  ResultHero,
  ResultRows,
  ResultRow,
  Hint,
  formatMoney,
} from './kit';

export interface Vo2MaxInput {
  sex: 'male' | 'female';
  age: number;
  weightKg: number;
  walkTimeMinutes: number;
  heartRate: number;
}

export function computeVo2Max(input: Vo2MaxInput) {
  const weightLbs = input.weightKg * 2.20462;
  const gender = input.sex === 'male' ? 1 : 0;
  const vo2 =
    132.853 -
    0.0769 * weightLbs -
    0.3877 * input.age +
    6.315 * gender -
    3.2649 * input.walkTimeMinutes -
    0.1565 * input.heartRate;
  const category =
    vo2 >= 45 ? 'Excellent' : vo2 >= 35 ? 'Good' : vo2 >= 25 ? 'Fair' : 'Poor';
  const walkSeconds = input.walkTimeMinutes * 60;
  return { vo2, weightLbs, category, walkSeconds };
}

export function Vo2MaxCalculator() {
  const [sex, setSex] = useState('male');
  const [age, setAge] = useState('30');
  const [weightKg, setWeightKg] = useState('70');
  const [walkTimeMinutes, setWalkTimeMinutes] = useState('15');
  const [heartRate, setHeartRate] = useState('120');

  const result = computeVo2Max({
    sex: sex === 'female' ? 'female' : 'male',
    age: Number(age) || 0,
    weightKg: Number(weightKg) || 0,
    walkTimeMinutes: Number(walkTimeMinutes) || 0,
    heartRate: Number(heartRate) || 0,
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
              <NumberField label="Age" value={age} onChange={setAge} min={0} step="1" />
              <NumberField label="Weight (kg)" value={weightKg} onChange={setWeightKg} min={0} step="0.1" />
            </div>
            <NumberField label="1-mile walk time (minutes)" value={walkTimeMinutes} onChange={setWalkTimeMinutes} min={0} step="0.1" />
            <NumberField label="Heart rate at finish (bpm)" value={heartRate} onChange={setHeartRate} min={0} step="1" />
          </div>
          <Hint>
            Rockport 1-mile walk test: VO₂max = 132.853 −
            0.0769×weight(lbs) − 0.3877×age + 6.315×sex − 3.2649×time −
            0.1565×HR.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="VO2 max"
            value={`${formatMoney(result.vo2)} mL/kg/min`}
            sub={result.category}
          />
          <ResultRows>
            <ResultRow label="Weight (lbs)" value={formatMoney(result.weightLbs)} />
            <ResultRow label="Fitness category" value={result.category} />
            <ResultRow label="Walk time (seconds)" value={formatMoney(result.walkSeconds)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default Vo2MaxCalculator;
