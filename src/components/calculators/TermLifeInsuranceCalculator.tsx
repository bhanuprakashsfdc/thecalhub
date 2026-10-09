import { useState, useMemo } from 'react';
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

export interface TermLifeInsuranceInput {
  annualIncome: number;
  yearsDependents: number;
  mortgage: number;
  otherDebts: number;
  existingAssets: number;
}

export function computeTermLifeInsurance(input: TermLifeInsuranceInput) {
  const incomeReplacement = input.annualIncome * input.yearsDependents;
  const totalNeeds = incomeReplacement + input.mortgage + input.otherDebts;
  const coverage = Math.max(0, totalNeeds - input.existingAssets);
  return { incomeReplacement, totalNeeds, coverage };
}

export function TermLifeInsuranceCalculator() {
  const [annualIncome, setAnnualIncome] = useState('60000');
  const [yearsDependents, setYearsDependents] = useState('10');
  const [mortgage, setMortgage] = useState('200000');
  const [otherDebts, setOtherDebts] = useState('30000');
  const [existingAssets, setExistingAssets] = useState('50000');

  const result = useMemo(
    () =>
      computeTermLifeInsurance({
        annualIncome: Number(annualIncome) || 0,
        yearsDependents: Number(yearsDependents) || 0,
        mortgage: Number(mortgage) || 0,
        otherDebts: Number(otherDebts) || 0,
        existingAssets: Number(existingAssets) || 0,
      }),
    [annualIncome, yearsDependents, mortgage, otherDebts, existingAssets]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Annual income ($)" value={annualIncome} onChange={setAnnualIncome} min={0} step="1000" />
            <NumberField label="Years dependents" value={yearsDependents} onChange={setYearsDependents} min={1} step="1" />
            <NumberField label="Mortgage balance ($)" value={mortgage} onChange={setMortgage} min={0} step="10000" />
            <NumberField label="Other debts ($)" value={otherDebts} onChange={setOtherDebts} min={0} step="1000" />
            <NumberField label="Existing assets ($)" value={existingAssets} onChange={setExistingAssets} min={0} step="1000" />
          </div>
          <Hint>
            Term life should cover income replacement for your dependents plus outstanding debts,
            minus assets that can absorb those obligations. A clean needs-based approach.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Term cover needed"
            value={`${formatMoney(result.coverage)}`}
            sub={`Total needs ${formatMoney(result.totalNeeds)}`}
          />
          <ResultRows>
            <ResultRow label="Income replacement" value={formatMoney(result.incomeReplacement)} />
            <ResultRow label="Total needs" value={formatMoney(result.totalNeeds)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default TermLifeInsuranceCalculator;