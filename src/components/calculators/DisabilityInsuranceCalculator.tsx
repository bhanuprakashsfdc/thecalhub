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

export interface DisabilityInsuranceInput {
  monthlyIncome: number;
  coveragePercent: number;
  eliminationDays: number;
  benefitMonths: number;
}

export function computeDisabilityInsurance(input: DisabilityInsuranceInput) {
  const monthlyBenefit = Math.max(0, input.monthlyIncome) * (Math.max(0, input.coveragePercent) / 100);
  const waitingCost = (monthlyBenefit / 30) * Math.max(0, input.eliminationDays);
  const annualBenefit = monthlyBenefit * 12;
  const totalBenefit = monthlyBenefit * Math.max(0, input.benefitMonths);

  return { monthlyBenefit, waitingCost, annualBenefit, totalBenefit };
}

export function DisabilityInsuranceCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState('6000');
  const [coveragePercent, setCoveragePercent] = useState('60');
  const [eliminationDays, setEliminationDays] = useState('90');
  const [benefitMonths, setBenefitMonths] = useState('24');

  const result = computeDisabilityInsurance({
    monthlyIncome: Number(monthlyIncome) || 0,
    coveragePercent: Number(coveragePercent) || 0,
    eliminationDays: Number(eliminationDays) || 0,
    benefitMonths: Number(benefitMonths) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Monthly income ($)" value={monthlyIncome} onChange={setMonthlyIncome} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField
                label="Coverage of income (%)"
                value={coveragePercent}
                onChange={setCoveragePercent}
                min={0}
                max={100}
              />
              <NumberField label="Elimination period (days)" value={eliminationDays} onChange={setEliminationDays} min={0} />
            </div>
            <NumberField label="Benefit period (months)" value={benefitMonths} onChange={setBenefitMonths} min={1} />
          </div>
          <Hint>
            Most policies replace 60–70% of pre-tax income and start paying after an elimination period, so the
            waiting gap is money you cover from savings.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Monthly benefit"
            value={`$${formatMoney(result.monthlyBenefit)}`}
            sub={`Pays $${formatMoney(result.annualBenefit)} per year while disabled`}
          />
          <ResultRows>
            <ResultRow label="Cost during elimination period" value={`$${formatMoney(result.waitingCost)}`} />
            <ResultRow label={`Total benefits over ${benefitMonths} months`} value={`$${formatMoney(result.totalBenefit)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default DisabilityInsuranceCalculator;
