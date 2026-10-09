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

export type BsaFormula = 'mosteller' | 'dubois';

export interface BsaDosageInput {
  heightCm: number;
  weightKg: number;
  dosePerM2: number;
  formula: BsaFormula;
}

export interface BsaDosageResult {
  bsa: number;
  mosteller: number;
  dubois: number;
  doseMg: number;
  percentOfStandard: number;
  mgPerKg: number;
}

const positive = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);
const finite = (n: number) => (Number.isFinite(n) ? n : 0);

export function mostellerBsa(heightCm: number, weightKg: number) {
  return finite(Math.sqrt((heightCm * weightKg) / 3600));
}

export function duboisBsa(heightCm: number, weightKg: number) {
  return finite(0.007184 * Math.pow(heightCm, 0.725) * Math.pow(weightKg, 0.425));
}

export function computeBsaDosage(input: BsaDosageInput): BsaDosageResult {
  const heightCm = positive(input.heightCm);
  const weightKg = positive(input.weightKg);
  const dosePerM2 = positive(input.dosePerM2);

  const mosteller = mostellerBsa(heightCm, weightKg);
  const dubois = duboisBsa(heightCm, weightKg);
  const bsa = input.formula === 'dubois' ? dubois : mosteller;
  const doseMg = finite(bsa * dosePerM2);

  return {
    bsa,
    mosteller,
    dubois,
    doseMg,
    percentOfStandard: finite((bsa / 1.73) * 100),
    mgPerKg: weightKg > 0 ? finite(doseMg / weightKg) : 0,
  };
}

const toNumber = (raw: string) => {
  const n = Number(raw);
  return Number.isFinite(n) && n >= 0 ? n : 0;
};

export function BsaDosageCalculator() {
  const [height, setHeight] = useState('170');
  const [weight, setWeight] = useState('70');
  const [dosePerM2, setDosePerM2] = useState('75');
  const [formula, setFormula] = useState<BsaFormula>('mosteller');

  const weightKg = toNumber(weight);
  const result = computeBsaDosage({
    heightCm: toNumber(height),
    weightKg,
    dosePerM2: toNumber(dosePerM2),
    formula,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <SelectField
              label="BSA formula"
              value={formula}
              onChange={(v) => setFormula(v as BsaFormula)}
              options={[
                { value: 'mosteller', label: 'Mosteller — √(height × weight ÷ 3600)' },
                { value: 'dubois', label: 'DuBois — 0.007184 × h^0.725 × w^0.425' },
              ]}
            />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Height (cm)" value={height} onChange={setHeight} min={0} step="0.5" />
              <NumberField label="Weight (kg)" value={weight} onChange={setWeight} min={0} step="0.1" />
            </div>
            <NumberField
              label="Prescribed dose per m² (mg)"
              value={dosePerM2}
              onChange={setDosePerM2}
              min={0}
              step="0.5"
            />
          </div>
          <Hint>
            Mosteller's formula is the clinical default: √(height in cm × weight in kg ÷ 3600). The dose is
            surface area in m² multiplied by the prescribed mg per m², and 1.73 m² is the standard adult surface
            area used for comparison.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Body surface area"
            value={`${formatMoney(result.bsa, 3)} m²`}
            sub={`${formula === 'dubois' ? 'DuBois' : 'Mosteller'} formula for ${formatMoney(
              toNumber(height),
              0
            )} cm and ${formatMoney(weightKg)} kg`}
          />
          <ResultRows>
            <ResultRow label="Calculated dose" value={`${formatMoney(result.doseMg)} mg`} />
            <ResultRow label="Percent of 1.73 m² standard" value={`${formatMoney(result.percentOfStandard)}%`} />
            <ResultRow label="Mosteller BSA" value={`${formatMoney(result.mosteller, 3)} m²`} />
            <ResultRow label="DuBois BSA" value={`${formatMoney(result.dubois, 3)} m²`} />
          </ResultRows>
          <Hint>
            Dose per kg is shown as a cross-check only: BSA dosing and mg/kg dosing give different answers, so
            never mix the two for the same prescription.
          </Hint>
        </Panel>
      }
    />
  );
}

export default BsaDosageCalculator;
