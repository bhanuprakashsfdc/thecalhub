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
  safeDiv,
} from './kit';

export type PediatricMethod = 'young' | 'clark' | 'weight';

export interface PediatricDosageInput {
  adultDoseMg: number;
  ageYears: number;
  weightKg: number;
  mgPerKg: number;
  concentrationMgMl: number;
  method: PediatricMethod;
}

export interface PediatricDosageResult {
  doseMg: number;
  percentOfAdult: number;
  actualMgPerKg: number;
  volumeMl: number;
  methodLabel: string;
}

const positive = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);
const finite = (n: number) => (Number.isFinite(n) ? n : 0);

const KG_TO_LB = 2.20462262185;
const CLARK_REFERENCE_LB = 150;

const METHOD_LABELS: Record<PediatricMethod, string> = {
  young: "Young's rule",
  clark: "Clark's rule",
  weight: 'Weight-based (mg/kg)',
};

export function computePediatricDosage(input: PediatricDosageInput): PediatricDosageResult {
  const adultDoseMg = positive(input.adultDoseMg);
  const ageYears = positive(input.ageYears);
  const weightKg = positive(input.weightKg);
  const mgPerKg = positive(input.mgPerKg);
  const concentrationMgMl = positive(input.concentrationMgMl);

  let doseMg = 0;
  if (input.method === 'young') {
    doseMg = adultDoseMg * safeDiv(ageYears, ageYears + 12);
  } else if (input.method === 'clark') {
    doseMg = adultDoseMg * safeDiv(weightKg * KG_TO_LB, CLARK_REFERENCE_LB);
  } else {
    doseMg = mgPerKg * weightKg;
  }
  doseMg = finite(doseMg);

  return {
    doseMg,
    percentOfAdult: adultDoseMg > 0 ? finite((doseMg / adultDoseMg) * 100) : 0,
    actualMgPerKg: weightKg > 0 ? finite(doseMg / weightKg) : 0,
    volumeMl: concentrationMgMl > 0 ? finite(doseMg / concentrationMgMl) : 0,
    methodLabel: METHOD_LABELS[input.method] ?? METHOD_LABELS.weight,
  };
}

const toNumber = (raw: string) => {
  const n = Number(raw);
  return Number.isFinite(n) && n >= 0 ? n : 0;
};

export function PediatricDosageCalculator() {
  const [method, setMethod] = useState<PediatricMethod>('young');
  const [adultDose, setAdultDose] = useState('500');
  const [age, setAge] = useState('6');
  const [weight, setWeight] = useState('20');
  const [mgPerKg, setMgPerKg] = useState('15');
  const [concentration, setConcentration] = useState('50');

  const weightKg = toNumber(weight);
  const result = computePediatricDosage({
    adultDoseMg: toNumber(adultDose),
    ageYears: toNumber(age),
    weightKg,
    mgPerKg: toNumber(mgPerKg),
    concentrationMgMl: toNumber(concentration),
    method,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <SelectField
              label="Dosing method"
              value={method}
              onChange={(v) => setMethod(v as PediatricMethod)}
              options={[
                { value: 'young', label: "Young's rule — by age" },
                { value: 'clark', label: "Clark's rule — by weight in pounds" },
                { value: 'weight', label: 'Weight-based — mg per kg' },
              ]}
            />
            <NumberField label="Adult dose (mg)" value={adultDose} onChange={setAdultDose} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Child age (years)" value={age} onChange={setAge} min={0} />
              <NumberField label="Child weight (kg)" value={weight} onChange={setWeight} min={0} step="0.1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="mg per kg dose" value={mgPerKg} onChange={setMgPerKg} min={0} step="0.1" />
              <NumberField label="Concentration (mg/mL)" value={concentration} onChange={setConcentration} min={0} />
            </div>
          </div>
          <Hint>
            Young's rule is adult dose × age ÷ (age + 12), Clark's rule is adult dose × weight in lb ÷ 150 and
            weight-based dosing is mg per kg × weight in kg. Always confirm the result against the drug's
            paediatric reference before administering.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Dose to give"
            value={`${formatMoney(result.doseMg)} mg`}
            sub={`${result.methodLabel} • ${formatMoney(weightKg)} kg child`}
          />
          <ResultRows>
            <ResultRow label="Percent of adult dose" value={`${formatMoney(result.percentOfAdult)}%`} />
            <ResultRow label="Actual mg per kg" value={`${formatMoney(result.actualMgPerKg)} mg/kg`} />
            <ResultRow label="Volume to give" value={`${formatMoney(result.volumeMl)} mL`} />
            <ResultRow label="Method applied" value={result.methodLabel} />
          </ResultRows>
          <Hint>
            The volume row divides the calculated dose by the stock concentration, so a 166.67 mg dose from a
            50 mg/mL suspension is 3.33 mL.
          </Hint>
        </Panel>
      }
    />
  );
}

export default PediatricDosageCalculator;
