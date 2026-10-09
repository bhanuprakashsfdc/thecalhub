import { useState } from 'react';
import {
  CalcGrid,
  Panel,
  PanelEyebrow,
  NumberField,
  SegmentedControl,
  ResultHero,
  ResultRows,
  ResultRow,
  Hint,
  formatMoney,
} from './kit';

export interface BusinessInsuranceInput {
  revenue: number;
  coverage: number;
  riskFactor: number;
}

export function computeBusinessInsurance(input: BusinessInsuranceInput) {
  const premium =
    (input.revenue / 1000) * 1.5 * input.riskFactor +
    (input.coverage / 1000) * 0.2;
  const monthly = premium / 12;
  const shareOfRevenue = input.revenue > 0 ? (premium / input.revenue) * 100 : 0;
  const costPerThousand = input.coverage > 0 ? premium / (input.coverage / 1000) : 0;
  return { premium, monthly, shareOfRevenue, costPerThousand };
}

const RISK_OPTIONS = [
  { value: '0.7', label: 'Low' },
  { value: '1', label: 'Medium' },
  { value: '1.6', label: 'High' },
];

export function BusinessInsuranceCalculator() {
  const [revenue, setRevenue] = useState('500000');
  const [coverage, setCoverage] = useState('1000000');
  const [risk, setRisk] = useState('1');

  const result = computeBusinessInsurance({
    revenue: Number(revenue) || 0,
    coverage: Number(coverage) || 0,
    riskFactor: Number(risk) || 1,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <SegmentedControl
              label="Risk level"
              value={risk}
              onChange={setRisk}
              options={RISK_OPTIONS}
            />
            <NumberField label="Annual revenue ($)" value={revenue} onChange={setRevenue} min={0} />
            <NumberField label="Coverage amount ($)" value={coverage} onChange={setCoverage} min={0} />
          </div>
          <Hint>
            Premium estimate = (revenue ÷ 1000) × $1.50 × risk factor +
            (coverage ÷ 1000) × $0.20. Actual quotes vary by industry and claims history.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Annual premium"
            value={`$${formatMoney(result.premium)}`}
            sub="Estimated"
          />
          <ResultRows>
            <ResultRow label="Monthly premium" value={`$${formatMoney(result.monthly)}`} />
            <ResultRow label="Premium as share of revenue" value={`${formatMoney(result.shareOfRevenue)}%`} />
            <ResultRow label="Cost per $1,000 of cover" value={`$${formatMoney(result.costPerThousand)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default BusinessInsuranceCalculator;
