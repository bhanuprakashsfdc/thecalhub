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

export function StairClimberCalculator() {
  const [steps, setSteps] = useState('100');
  const [height, setHeight] = useState('0.2');
  const [weight, setWeight] = useState('70');
  const [floors, setFloors] = useState('1');

  const s = Number(steps) || 0;
  const h = Number(height) || 0;
  const w = Number(weight) || 0;
  const f = Number(floors) || 0;
  const vertical = s * h + f * 3.048; // meters approx (floor ~10ft)
  const kcal = w * vertical * 0.1; // rough estimate

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Steps" value={steps} onChange={setSteps} min={0} step="1" />
            <NumberField label="Step Height (m)" value={height} onChange={setHeight} min={0} step="0.01" />
            <NumberField label="Weight (kg)" value={weight} onChange={setWeight} min={0} step="0.1" />
            <NumberField label="Floors" value={floors} onChange={setFloors} min={0} step="1" />
          </div>
          <Hint>Estimate of energy expenditure; values are approximate.</Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero label="Calories" value={`${formatMoney(kcal)} kcal`} />
          <ResultRows>
            <ResultRow label="Vertical Distance (m)" value={formatMoney(vertical)} />
            <ResultRow label="Steps" value={steps} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default StairClimberCalculator;
