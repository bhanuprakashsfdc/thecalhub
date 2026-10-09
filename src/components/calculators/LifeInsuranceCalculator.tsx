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

export interface LifeInsuranceInput {
  annualIncome: number;
  yearsToReplace: number;
  debts: number;
  educationFund: number;
  existingSavings: number;
}

export function computeLifeInsurance(input: LifeInsuranceInput) {
  const incomeReplacement = input.annualIncome * input.yearsToReplace;
  const need =
    incomeReplacement + input.debts + input.educationFund - input.existingSavings;
  const annualPremium = Math.max(0, need) / 1000 / 3.5;
  const monthlyPremium = annualPremium / 12;
  return { incomeReplacement, need, annualPremium, monthlyPremium };
}

export function LifeInsuranceCalculator() {
  const [annualIncome, setAnnualIncome] = useState('75000');
  const [yearsToReplace, setYearsToReplace] = useState('10');
  const [debts, setDebts] = useState('50000');
  const [educationFund, setEducationFund] = useState('60000');
  const [existingSavings, setExistingSavings] = useState('80000');

  const result = computeLifeInsurance({
    annualIncome: Number(annualIncome) || 0,
    yearsToReplace: Number(yearsToReplace) || 0,
    debts: Number(debts) || 0,
    educationFund: Number(educationFund) || 0,
    existingSavings: Number(existingSavings) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Annual income ($)" value={annualIncome} onChange={setAnnualIncome} min={0} />
            <NumberField label="Years to replace income" value={yearsToReplace} onChange={setYearsToReplace} min={0} step="1" />
            <NumberField label="Outstanding debts ($)" value={debts} onChange={setDebts} min={0} />
            <NumberField label="Education fund ($)" value={educationFund} onChange={setEducationFund} min={0} />
            <NumberField label="Existing savings ($)" value={existingSavings} onChange={setExistingSavings} min={0} />
          </div>
          <Hint>
            Coverage = income replacement + debts + education −
            existing savings. Premium assumes ~$3.50 per $1,000 of 20-year term cover.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Coverage needed"
            value={`$${formatMoney(Math.max(0, result.need))}`}
            sub="Death benefit"
          />
          <ResultRows>
            <ResultRow label="Income replacement total" value={`$${formatMoney(result.incomeReplacement)}`} />
            <ResultRow label="Estimated annual premium" value={`$${formatMoney(result.annualPremium)}`} />
            <ResultRow label="Estimated monthly premium" value={`$${formatMoney(result.monthlyPremium)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default LifeInsuranceCalculator;
