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

export interface CreatinineClearanceInput {
  age: number;
  weight: number;
  sex: string;
  creatinine: number;
}

export function computeCreatinineClearance(input: CreatinineClearanceInput) {
  const raw = ((140 - input.age) * input.weight) / (72 * input.creatinine);
  const sexFactor = input.sex === 'female' ? 0.85 : 1;
  const crCl = raw * sexFactor;
  const fractionOfNormal = crCl / 60;
  const category =
    crCl >= 90 ? 'Normal' : crCl >= 60 ? 'Mild reduction' : crCl >= 30 ? 'Moderate reduction' : 'Severe reduction';
  return { raw, sexFactor, crCl, fractionOfNormal, category };
}

export function CreatinineClearanceCalculator() {
  const [age, setAge] = useState('60');
  const [weight, setWeight] = useState('70');
  const [sex, setSex] = useState('male');
  const [creatinine, setCreatinine] = useState('1.2');

  const result = computeCreatinineClearance({
    age: Number(age) || 0,
    weight: Number(weight) || 0,
    sex,
    creatinine: Number(creatinine) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Age" value={age} onChange={setAge} min={1} max={120} />
              <NumberField label="Weight (kg)" value={weight} onChange={setWeight} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <SelectField
                label="Sex"
                value={sex}
                onChange={setSex}
                options={[
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' },
                ]}
              />
              <NumberField
                label="Serum creatinine (mg/dL)"
                value={creatinine}
                onChange={setCreatinine}
                min={0}
                step="0.1"
              />
            </div>
          </div>
          <Hint>
            Cockcroft-Gault estimates creatinine clearance for drug dosing. Values below 60 mL/min usually trigger
            renal dose adjustments for renally cleared medicines.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Creatinine clearance"
            value={`${formatMoney(result.crCl)} mL/min`}
            sub={result.category}
          />
          <ResultRows>
            <ResultRow label="Pre-sex-adjusted value" value={formatMoney(result.raw)} />
            <ResultRow label="Sex adjustment factor" value={formatMoney(result.sexFactor)} />
            <ResultRow label="Fraction of 60 mL/min" value={formatMoney(result.fractionOfNormal)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default CreatinineClearanceCalculator;
