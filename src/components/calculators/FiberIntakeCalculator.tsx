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

export interface FiberIntakeInput {
  age: number;
  sex: string;
  fiberEaten: number;
}

export function computeFiberIntake(input: FiberIntakeInput) {
  const age = Math.max(0, input.age);
  const eaten = Math.max(0, input.fiberEaten);
  const older = age >= 50;

  const goal = input.sex === 'female' ? (older ? 21 : 25) : older ? 30 : 38;
  const needed = goal - eaten;
  const percent = goal > 0 ? (eaten / goal) * 100 : 0;

  return { goal, needed, percent, eaten };
}

export function FiberIntakeCalculator() {
  const [age, setAge] = useState('30');
  const [sex, setSex] = useState('female');
  const [fiberEaten, setFiberEaten] = useState('15');

  const result = computeFiberIntake({
    age: Number(age) || 0,
    sex,
    fiberEaten: Number(fiberEaten) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Age" value={age} onChange={setAge} min={0} max={120} />
              <SelectField
                label="Sex"
                value={sex}
                onChange={setSex}
                options={[
                  { value: 'female', label: 'Female' },
                  { value: 'male', label: 'Male' },
                ]}
              />
            </div>
            <NumberField label="Fiber eaten today (g)" value={fiberEaten} onChange={setFiberEaten} min={0} step="0.5" />
          </div>
          <Hint>
            Adequate intake is 25 g for women and 38 g for men under 50, dropping to 21 g and 30 g after 50.
            Beans, whole grains and berries are the densest sources.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Daily fiber goal"
            value={`${formatMoney(result.goal, 0)} g`}
            sub={`${formatMoney(result.percent, 0)}% of the goal reached today`}
          />
          <ResultRows>
            <ResultRow label="Fiber eaten" value={`${formatMoney(result.eaten)} g`} />
            <ResultRow
              label="Still needed"
              value={`${result.needed >= 0 ? '' : '-'}${formatMoney(Math.abs(result.needed))} g`}
            />
            <ResultRow label="Goal method" value="Adequate Intake" />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default FiberIntakeCalculator;
