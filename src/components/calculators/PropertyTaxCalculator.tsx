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

export interface PropertyTaxInput {
  propertyValue: number;
  assessmentRate: number;
  taxRate: number;
}

export function computePropertyTax(input: PropertyTaxInput) {
  const assessed = input.propertyValue * (input.assessmentRate / 100);
  const annual = assessed * (input.taxRate / 100);
  const monthly = annual / 12;
  const effective = input.propertyValue > 0 ? (annual / input.propertyValue) * 100 : 0;
  return { assessed, annual, monthly, effective };
}

export function PropertyTaxCalculator() {
  const [propertyValue, setPropertyValue] = useState('350000');
  const [assessmentRate, setAssessmentRate] = useState('80');
  const [taxRate, setTaxRate] = useState('1.2');

  const result = computePropertyTax({
    propertyValue: Number(propertyValue) || 0,
    assessmentRate: Number(assessmentRate) || 0,
    taxRate: Number(taxRate) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Property value ($)" value={propertyValue} onChange={setPropertyValue} min={0} />
            <NumberField label="Assessment rate (%)" value={assessmentRate} onChange={setAssessmentRate} min={0} max={100} step="0.1" />
            <NumberField label="Tax rate (%)" value={taxRate} onChange={setTaxRate} min={0} step="0.01" />
          </div>
          <Hint>
            Annual tax = (property value × assessment rate) × tax rate. Assessment rates
            vary by jurisdiction — many cap them below 100% of market value.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Annual property tax"
            value={`$${formatMoney(result.annual)}`}
            sub="Per year"
          />
          <ResultRows>
            <ResultRow label="Assessed value" value={`$${formatMoney(result.assessed)}`} />
            <ResultRow label="Monthly payment" value={`$${formatMoney(result.monthly)}`} />
            <ResultRow label="Effective rate on market value" value={`${formatMoney(result.effective)}%`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default PropertyTaxCalculator;
