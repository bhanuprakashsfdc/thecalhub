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

export function GeriatricDosageCalculator() {
  const [weight, setWeight] = useState('70');
  const [adult, setAdult] = useState('100');
  const dose = Number(weight) * 0.5 + (Number(adult) * 0.3); // rough example
  const adjusted = dose;

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Weight (kg)" value={weight} onChange={setWeight} min={0} step="0.1" />
            <NumberField label="Adult Dose (mg)" value={adult} onChange={setAdult} min={0} step="0.1" />
          </div>
          <Hint>Adjusted dose for geriatric patients (illustrative).</Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero label="Adjusted Dose" value={`${formatMoney(adjusted)} mg`} />
          <ResultRows>
            <ResultRow label="Adult Dose" value={`${formatMoney(Number(adult)||0)} mg`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default GeriatricDosageCalculator;
