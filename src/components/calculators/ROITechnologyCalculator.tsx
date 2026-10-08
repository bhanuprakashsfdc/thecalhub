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

export interface ROITechnologyInput {
  investment: number;
  annualBenefit: number;
  years: number;
}

export function computeROITechnology(input: ROITechnologyInput) {
  const investment = Math.max(0, input.investment);
  const years = Math.max(0, input.years);
  const totalBenefit = Math.max(0, input.annualBenefit) * years;
  const netGain = totalBenefit - investment;
  const roi = investment > 0 ? (netGain / investment) * 100 : 0;
  const base = investment > 0 ? 1 + netGain / investment : 0;
  const annualized = years > 0 && base > 0 ? (Math.pow(base, 1 / years) - 1) * 100 : 0;

  return { totalBenefit, netGain, roi, annualized };
}

export function ROITechnologyCalculator() {
  const [investment, setInvestment] = useState('50000');
  const [annualBenefit, setAnnualBenefit] = useState('30000');
  const [years, setYears] = useState('3');

  const result = computeROITechnology({
    investment: Number(investment) || 0,
    annualBenefit: Number(annualBenefit) || 0,
    years: Number(years) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Total investment ($)" value={investment} onChange={setInvestment} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Annual benefit ($)" value={annualBenefit} onChange={setAnnualBenefit} min={0} />
              <NumberField label="Years" value={years} onChange={setYears} min={1} />
            </div>
          </div>
          <Hint>
            Count hard savings and added revenue, but keep benefits realistic: a technology ROI that assumes full
            benefit from day one almost always overstates the return.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Return on investment"
            value={`${formatMoney(result.roi)}%`}
            sub={`Over ${years} year(s) of benefits`}
          />
          <ResultRows>
            <ResultRow label="Total benefits" value={`$${formatMoney(result.totalBenefit)}`} />
            <ResultRow label="Net gain" value={`$${formatMoney(result.netGain)}`} />
            <ResultRow label="Annualised return" value={`${formatMoney(result.annualized)}%`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ROITechnologyCalculator;
