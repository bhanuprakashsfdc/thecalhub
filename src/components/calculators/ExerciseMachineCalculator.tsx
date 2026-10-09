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

export interface ExerciseMachineInput {
  weightKg: number;
  minutes: number;
  met: number;
}

export function computeExerciseMachine(input: ExerciseMachineInput) {
  const calories = input.met * input.weightKg * (input.minutes / 60);
  const perMinute = calories / Math.max(1, input.minutes);
  const weekly = calories * 5;
  return { calories, perMinute, weekly };
}

const MACHINE_OPTIONS = [
  { value: '7', label: 'Treadmill (7 METs)' },
  { value: '5.5', label: 'Stationary bike (5.5 METs)' },
  { value: '6', label: 'Elliptical (6 METs)' },
  { value: '8', label: 'Rowing machine (8 METs)' },
  { value: '8.5', label: 'Stair climber (8.5 METs)' },
];

export function ExerciseMachineCalculator() {
  const [weightKg, setWeightKg] = useState('70');
  const [minutes, setMinutes] = useState('30');
  const [met, setMet] = useState('7');

  const result = computeExerciseMachine({
    weightKg: Number(weightKg) || 0,
    minutes: Number(minutes) || 0,
    met: Number(met) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <SelectField label="Machine" value={met} onChange={setMet} options={MACHINE_OPTIONS} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Weight (kg)" value={weightKg} onChange={setWeightKg} min={0} />
              <NumberField label="Duration (minutes)" value={minutes} onChange={setMinutes} min={0} />
            </div>
          </div>
          <Hint>
            Calories = MET × weight (kg) × hours. MET values are standard compendium estimates
            for moderate effort on each machine.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Calories burned"
            value={`${formatMoney(result.calories)} kcal`}
            sub="For the session"
          />
          <ResultRows>
            <ResultRow label="MET value" value={formatMoney(Number(met) || 0)} />
            <ResultRow label="Calories per minute" value={formatMoney(result.perMinute)} />
            <ResultRow label="Weekly total (5 sessions)" value={formatMoney(result.weekly)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ExerciseMachineCalculator;
