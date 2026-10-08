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

export interface WithholdingInput {
  grossPay: number;
  periodsPerYear: number;
  pretaxDeductions: number;
  taxRate: number;
}

export function computeWithholding(input: WithholdingInput) {
  const gross = Math.max(0, input.grossPay);
  const pretax = Math.max(0, input.pretaxDeductions);
  const periods = Math.max(0, Math.floor(input.periodsPerYear));
  const taxablePay = Math.max(0, gross - pretax);
  const withholding = (taxablePay * Math.max(0, input.taxRate)) / 100;
  const netPay = gross - pretax - withholding;
  const annualWithholding = withholding * periods;
  const annualGross = gross * periods;
  return { taxablePay, withholding, netPay, annualWithholding, annualGross, periods };
}

export function WithholdingCalculator() {
  const [grossPay, setGrossPay] = useState('2500');
  const [periodsPerYear, setPeriodsPerYear] = useState('26');
  const [pretaxDeductions, setPretaxDeductions] = useState('200');
  const [taxRate, setTaxRate] = useState('12');

  const result = computeWithholding({
    grossPay: Number(grossPay) || 0,
    periodsPerYear: Number(periodsPerYear) || 0,
    pretaxDeductions: Number(pretaxDeductions) || 0,
    taxRate: Number(taxRate) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Gross pay per paycheck ($)" value={grossPay} onChange={setGrossPay} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Pay periods per year" value={periodsPerYear} onChange={setPeriodsPerYear} min={1} max={366} />
              <NumberField label="Tax rate (%)" value={taxRate} onChange={setTaxRate} step="0.5" min={0} max={100} />
            </div>
            <NumberField label="Pre-tax deductions ($)" value={pretaxDeductions} onChange={setPretaxDeductions} min={0} />
          </div>
          <Hint>
            Pre-tax deductions such as 401(k) and health premiums reduce the pay that tax is calculated on, so
            they lower withholding as well as your take-home pay.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Withholding per paycheck"
            value={`$${formatMoney(result.withholding)}`}
            sub={`${result.periods} pay period(s) per year`}
          />
          <ResultRows>
            <ResultRow label="Net pay per paycheck" value={`$${formatMoney(result.netPay)}`} />
            <ResultRow label="Annual withholding" value={`$${formatMoney(result.annualWithholding)}`} />
            <ResultRow label="Taxable pay per period" value={`$${formatMoney(result.taxablePay)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default WithholdingCalculator;
