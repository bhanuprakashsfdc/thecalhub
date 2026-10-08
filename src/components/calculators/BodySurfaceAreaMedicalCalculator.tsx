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

export interface BodySurfaceAreaInput {
  height: number;
  weight: number;
}

export function computeBodySurfaceArea(input: BodySurfaceAreaInput) {
  const mosteller = Math.sqrt((input.height * input.weight) / 3600);
  const dubois = 0.007184 * Math.pow(input.height, 0.725) * Math.pow(input.weight, 0.425);
  const bmi = input.height > 0 ? input.weight / Math.pow(input.height / 100, 2) : 0;
  const diff = mosteller - dubois;
  return { mosteller, dubois, bmi, diff };
}

export function BodySurfaceAreaMedicalCalculator() {
  const [height, setHeight] = useState('170');
  const [weight, setWeight] = useState('70');

  const result = computeBodySurfaceArea({
    height: Number(height) || 0,
    weight: Number(weight) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Height (cm)" value={height} onChange={setHeight} min={0} max={260} />
            <NumberField label="Weight (kg)" value={weight} onChange={setWeight} min={0} />
          </div>
          <Hint>
            Body surface area is widely used to index chemotherapy, cardiac output and renal measurements because
            it scales with metabolic size rather than weight alone.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Body surface area (Mosteller)"
            value={`${formatMoney(result.mosteller)} m²`}
            sub="sqrt(height × weight ÷ 3600)"
          />
          <ResultRows>
            <ResultRow label="DuBois BSA (m²)" value={formatMoney(result.dubois)} />
            <ResultRow label="Difference (m²)" value={formatMoney(result.diff)} />
            <ResultRow label="BMI (kg/m²)" value={formatMoney(result.bmi)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default BodySurfaceAreaMedicalCalculator;
