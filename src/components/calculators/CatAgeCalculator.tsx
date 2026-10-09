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

export interface CatAgeInput {
  age: number;
  unit: 'years' | 'months';
  method: 'classic' | 'modern';
}

export interface CatAgeResult {
  catYears: number;
  catMonths: number;
  catDays: number;
  humanYears: number;
  stage: string;
}

const nonNegative = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);

const lifeStage = (years: number) => {
  if (years < 1) return 'Kitten';
  if (years < 3) return 'Young adult';
  if (years < 11) return 'Adult';
  if (years < 15) return 'Senior';
  return 'Geriatric';
};

export function computeCatAge(input: CatAgeInput): CatAgeResult {
  const raw = nonNegative(input.age);
  const catYears = input.unit === 'months' ? raw / 12 : raw;

  const humanYears =
    input.method === 'classic'
      ? catYears <= 1
        ? catYears * 15
        : catYears <= 2
          ? 15 + (catYears - 1) * 9
          : 24 + (catYears - 2) * 4
      : catYears > 0
        ? 15 + 16 * Math.log(catYears)
        : 0;

  return {
    catYears,
    catMonths: catYears * 12,
    catDays: catYears * 365.25,
    humanYears,
    stage: lifeStage(catYears),
  };
}

const toNumber = (raw: string) => {
  const n = Number(raw);
  return Number.isFinite(n) ? n : 0;
};

const UNIT_OPTIONS = [
  { value: 'years', label: 'Years' },
  { value: 'months', label: 'Months' },
];

const METHOD_OPTIONS = [
  { value: 'classic', label: 'Classic veterinary rule' },
  { value: 'modern', label: 'Modern logarithmic formula' },
];

export function CatAgeCalculator() {
  const [age, setAge] = useState('3');
  const [unit, setUnit] = useState('years');
  const [method, setMethod] = useState('classic');

  const activeUnit = unit === 'months' ? 'months' : 'years';
  const activeMethod = method === 'modern' ? 'modern' : 'classic';

  const result = computeCatAge({
    age: toNumber(age),
    unit: activeUnit,
    method: activeMethod,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Cat age" value={age} onChange={setAge} min={0} step="0.5" />
            <SelectField label="Age unit" value={unit} onChange={setUnit} options={UNIT_OPTIONS} />
            <SelectField label="Aging method" value={method} onChange={setMethod} options={METHOD_OPTIONS} />
          </div>
          <Hint>
            The classic rule counts the first year as 15 human years, the second as 9 more and every year after
            that as 4. The modern formula uses 15 + 16 × ln(age) for a smoother curve.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Human age equivalent"
            value={`${formatMoney(result.humanYears, 1)} years`}
            sub={`${formatMoney(result.catMonths, 0)} months old • ${result.stage}`}
          />
          <ResultRows>
            <ResultRow label="Human age (rounded)" value={`${Math.round(result.humanYears)} years`} />
            <ResultRow label="Age in months" value={`${formatMoney(result.catMonths, 1)} months`} />
            <ResultRow label="Age in days" value={`${formatMoney(result.catDays, 0)} days`} />
            <ResultRow label="Life stage" value={result.stage} />
          </ResultRows>
          <Hint>
            A three year old cat maps to 28 human years on the classic rule and about 32.6 years on the modern
            logarithmic curve; both flatten after the first two feline years.
          </Hint>
        </Panel>
      }
    />
  );
}

export default CatAgeCalculator;
