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

export interface LifeInsuranceNeedInput {
  annualIncome: number;
  yearsToReplace: number;
  debts: number;
  education: number;
  savings: number;
  existingCover: number;
}

export function computeLifeInsuranceNeed(input: LifeInsuranceNeedInput) {
  const incomeReplacement = Math.max(0, input.annualIncome) * Math.max(0, input.yearsToReplace);
  const obligations = incomeReplacement + Math.max(0, input.debts) + Math.max(0, input.education);
  const assets = Math.max(0, input.savings) + Math.max(0, input.existingCover);
  const coverNeeded = Math.max(0, obligations - assets);

  return { incomeReplacement, obligations, assets, coverNeeded };
}

export function LifeInsuranceNeedCalculator() {
  const [annualIncome, setAnnualIncome] = useState('75000');
  const [yearsToReplace, setYearsToReplace] = useState('10');
  const [debts, setDebts] = useState('20000');
  const [education, setEducation] = useState('50000');
  const [savings, setSavings] = useState('100000');
  const [existingCover, setExistingCover] = useState('50000');

  const result = computeLifeInsuranceNeed({
    annualIncome: Number(annualIncome) || 0,
    yearsToReplace: Number(yearsToReplace) || 0,
    debts: Number(debts) || 0,
    education: Number(education) || 0,
    savings: Number(savings) || 0,
    existingCover: Number(existingCover) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Annual income ($)" value={annualIncome} onChange={setAnnualIncome} min={0} />
              <NumberField label="Years to replace income" value={yearsToReplace} onChange={setYearsToReplace} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Outstanding debts ($)" value={debts} onChange={setDebts} min={0} />
              <NumberField label="Education costs ($)" value={education} onChange={setEducation} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Savings & investments ($)" value={savings} onChange={setSavings} min={0} />
              <NumberField label="Existing life cover ($)" value={existingCover} onChange={setExistingCover} min={0} />
            </div>
          </div>
          <Hint>
            The common “10× income” rule ignores debts and education. Subtracting savings and existing cover keeps
            you from buying cover your family will never need.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Life cover needed"
            value={`$${formatMoney(result.coverNeeded)}`}
            sub="After applying savings and existing policies"
          />
          <ResultRows>
            <ResultRow label="Income replacement goal" value={`$${formatMoney(result.incomeReplacement)}`} />
            <ResultRow label="Total obligations" value={`$${formatMoney(result.obligations)}`} />
            <ResultRow label="Assets counted" value={`$${formatMoney(result.assets)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default LifeInsuranceNeedCalculator;
