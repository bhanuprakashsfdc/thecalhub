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

export interface KidneyFunctionInput {
  creatinine: number;
  age: number;
  sex: string;
  bsa: number;
}

export function ckdStage(gfr: number) {
  if (gfr >= 90) return 1;
  if (gfr >= 60) return 2;
  if (gfr >= 45) return 3;
  if (gfr >= 30) return 4;
  return 5;
}

const CKD_STAGES = [
  'Normal or high',
  'Mildly decreased',
  'Mild to moderate decrease',
  'Moderately to severely decreased',
  'Severely decreased or failure',
];

export function computeKidneyFunction(input: KidneyFunctionInput) {
  const base = 175 * Math.pow(input.creatinine, -1.154) * Math.pow(input.age, -0.203);
  const sexFactor = input.sex === 'female' ? 0.742 : 1;
  const indexed = base * sexFactor;
  const absolute = indexed * (input.bsa / 1.73);
  const stage = ckdStage(indexed);
  return { base, sexFactor, indexed, absolute, stage, stageLabel: CKD_STAGES[stage - 1] };
}

export function KidneyFunctionCalculator() {
  const [creatinine, setCreatinine] = useState('1');
  const [age, setAge] = useState('50');
  const [sex, setSex] = useState('male');
  const [bsa, setBsa] = useState('1.73');

  const result = computeKidneyFunction({
    creatinine: Number(creatinine) || 0,
    age: Number(age) || 0,
    sex,
    bsa: Number(bsa) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField
              label="Serum creatinine (mg/dL)"
              value={creatinine}
              onChange={setCreatinine}
              min={0}
              step="0.1"
            />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Age" value={age} onChange={setAge} min={1} max={120} />
              <SelectField
                label="Sex"
                value={sex}
                onChange={setSex}
                options={[
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' },
                ]}
              />
            </div>
            <NumberField
              label="Body surface area (m²)"
              value={bsa}
              onChange={setBsa}
              min={0.5}
              step="0.01"
            />
          </div>
          <Hint>
            The four-variable MDRD equation estimates indexed eGFR; multiply by body surface area ÷ 1.73 for the
            absolute filtration rate in mL/min.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Estimated GFR"
            value={`${formatMoney(result.indexed)} mL/min`}
            sub={`CKD stage ${result.stage} — ${result.stageLabel}`}
          />
          <ResultRows>
            <ResultRow label="Absolute GFR (mL/min)" value={formatMoney(result.absolute)} />
            <ResultRow label="Sex adjustment factor" value={formatMoney(result.sexFactor)} />
            <ResultRow label="Creatinine term" value={formatMoney(result.base)} />
            <ResultRow label="CKD stage (1-5)" value={formatMoney(result.stage)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default KidneyFunctionCalculator;
