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

export interface SedentaryToActiveInput {
  currentSteps: number;
  targetSteps: number;
  caloriesPerStep: number;
  weeks: number;
}

export function computeSedentaryToActive(input: SedentaryToActiveInput) {
  const current = Math.max(0, input.currentSteps);
  const target = Math.max(0, input.targetSteps);
  const extraSteps = Math.max(0, target - current);
  const extraCalories = extraSteps * Math.max(0, input.caloriesPerStep);
  const weeks = Math.max(0, input.weeks);
  const weeklyIncrease = weeks > 0 ? extraSteps / weeks : 0;
  const weeklyCalories = extraCalories * 7;

  return { extraSteps, extraCalories, weeklyIncrease, weeklyCalories };
}

export function SedentaryToActiveCalculator() {
  const [currentSteps, setCurrentSteps] = useState('3000');
  const [targetSteps, setTargetSteps] = useState('10000');
  const [caloriesPerStep, setCaloriesPerStep] = useState('0.04');
  const [weeks, setWeeks] = useState('8');

  const result = computeSedentaryToActive({
    currentSteps: Number(currentSteps) || 0,
    targetSteps: Number(targetSteps) || 0,
    caloriesPerStep: Number(caloriesPerStep) || 0,
    weeks: Number(weeks) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Current daily steps" value={currentSteps} onChange={setCurrentSteps} min={0} />
              <NumberField label="Target daily steps" value={targetSteps} onChange={setTargetSteps} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Calories per step" value={caloriesPerStep} onChange={setCaloriesPerStep} min={0} step="0.01" />
              <NumberField label="Weeks to reach goal" value={weeks} onChange={setWeeks} min={1} />
            </div>
          </div>
          <Hint>
            A step burns roughly 0.04 kcal for an average adult, so the difference between 3,000 and 10,000
            steps is a meaningful daily burn — but only if the habit sticks.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Extra calories per day"
            value={formatMoney(result.extraCalories)}
            sub={`From ${formatMoney(result.extraSteps)} extra steps`}
          />
          <ResultRows>
            <ResultRow label="Steps to add each week" value={formatMoney(result.weeklyIncrease)} />
            <ResultRow label="Extra calories per week" value={formatMoney(result.weeklyCalories)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default SedentaryToActiveCalculator;
