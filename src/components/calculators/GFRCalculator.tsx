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
import { ckdStage } from './KidneyFunctionCalculator';

export interface GfrInput {
  creatinine: number;
  age: number;
  sex: string;
}

export function computeGfr(input: GfrInput) {
  const kappa = input.sex === 'female' ? 0.7 : 0.9;
  const alpha = input.sex === 'female' ? -0.241 : -0.302;
  const ratio = input.creatinine / kappa;
  const gfr =
    142 *
    Math.pow(Math.min(ratio, 1), alpha) *
    Math.pow(Math.max(ratio, 1), -1.2) *
    Math.pow(0.9938, input.age) *
    (input.sex === 'female' ? 1.012 : 1);
  const stage = ckdStage(gfr);
  return { kappa, alpha, ratio, gfr, stage };
}

const STAGE_LABELS = [
  'Normal or high',
  'Mildly decreased',
  'Mild to moderate decrease',
  'Moderately to severely decreased',
  'Severely decreased or failure',
];

export function GFRCalculator() {
  const [creatinine, setCreatinine] = useState('1');
  const [age, setAge] = useState('50');
  const [sex, setSex] = useState('male');

  const result = computeGfr({
    creatinine: Number(creatinine) || 0,
    age: Number(age) || 0,
    sex,
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
          </div>
          <Hint>
            CKD-EPI 2021 is race-free and uses creatinine, age and sex only — it is the equation recommended for
            reporting eGFR in most laboratories.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="eGFR (CKD-EPI)"
            value={`${formatMoney(result.gfr)} mL/min`}
            sub={`CKD stage ${result.stage} — ${STAGE_LABELS[result.stage - 1]}`}
          />
          <ResultRows>
            <ResultRow label="Age factor (0.9938^age)" value={formatMoney(Math.pow(0.9938, Number(age) || 0))} />
            <ResultRow label="Creatinine / kappa" value={formatMoney(result.ratio)} />
            <ResultRow label="kappa (mg/dL)" value={formatMoney(result.kappa)} />
            <ResultRow label="CKD stage (1-5)" value={formatMoney(result.stage)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default GFRCalculator;
