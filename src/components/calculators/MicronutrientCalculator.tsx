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

export interface MicronutrientInput {
  servingG: number;
  targetMg: string;
  per100g: number;
}

export function computeMicronutrient(input: MicronutrientInput) {
  const serving = Math.max(0, input.servingG);
  const target = Math.max(1, Number(input.targetMg) || 1);
  const per100 = Math.max(0, input.per100g);

  const amount = (serving * per100) / 100;
  const percent = (amount / target) * 100;

  return { amount, percent, target, serving, per100 };
}

export function MicronutrientCalculator() {
  const [servingG, setServingG] = useState('150');
  const [targetMg, setTargetMg] = useState('90');
  const [per100g, setPer100g] = useState('60');

  const result = computeMicronutrient({
    servingG: Number(servingG) || 0,
    targetMg,
    per100g: Number(per100g) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <SelectField
              label="Daily target nutrient"
              value={targetMg}
              onChange={setTargetMg}
              options={[
                { value: '90', label: 'Vitamin C — 90 mg' },
                { value: '8', label: 'Iron — 8 mg' },
                { value: '1000', label: 'Calcium — 1000 mg' },
                { value: '420', label: 'Magnesium — 420 mg' },
                { value: '3400', label: 'Potassium — 3400 mg' },
              ]}
            />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Serving size (g)" value={servingG} onChange={setServingG} min={0} />
              <NumberField label="Nutrient per 100 g" value={per100g} onChange={setPer100g} min={0} step="0.1" />
            </div>
          </div>
          <Hint>
            Nutrient panels list amounts per 100 g. Scale that figure by your serving size, then compare it with
            the daily reference intake you selected.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Micronutrient in serving"
            value={`${formatMoney(result.amount)} mg`}
            sub={`${formatMoney(result.percent, 0)}% of the daily target`}
          />
          <ResultRows>
            <ResultRow label="Daily target" value={`${formatMoney(result.target, 0)} mg`} />
            <ResultRow label="Per 100 g" value={`${formatMoney(result.per100)} mg`} />
            <ResultRow label="Serving size" value={`${formatMoney(result.serving, 0)} g`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default MicronutrientCalculator;
