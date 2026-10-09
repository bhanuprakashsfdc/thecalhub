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

export interface CarLeasingInput {
  msrp: number;
  residualRate: number;
  leaseYears: number;
  moneyFactor: number;
  salesTax: number;
}

export function computeCarLeasing(input: CarLeasingInput) {
  const residual = input.msrp * (input.residualRate / 100);
  const depreciation = input.msrp - residual;
  const months = input.leaseYears * 12 || 1;
  const depreciationPayment = depreciation / months;
  const financeCharge = (input.msrp + residual) * input.moneyFactor;
  const leasePayment = depreciationPayment + financeCharge;
  const totalCost = leasePayment * months;
  const totalCostWithTax = totalCost * (1 + input.salesTax / 100);
  return { residual, depreciation, depreciationPayment, financeCharge, leasePayment, totalCost, totalCostWithTax };
}

export function CarLeasingCalculator() {
  const [msrp, setMsrp] = useState('35000');
  const [residualRate, setResidualRate] = useState('60');
  const [leaseYears, setLeaseYears] = useState('3');
  const [moneyFactor, setMoneyFactor] = useState('0.003');
  const [salesTax, setSalesTax] = useState('8');

  const result = useMemo(
    () =>
      computeCarLeasing({
        msrp: Number(msrp) || 0,
        residualRate: Number(residualRate) || 0,
        leaseYears: Number(leaseYears) || 0,
        moneyFactor: Number(moneyFactor) || 0,
        salesTax: Number(salesTax) || 0,
      }),
    [msrp, residualRate, leaseYears, moneyFactor, salesTax]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="MSRP ($)" value={msrp} onChange={setMsrp} min={0} step="1000" />
            <NumberField label="Residual rate (%)" value={residualRate} onChange={setResidualRate} min={0} max={100} step="1" />
            <NumberField label="Lease term (years)" value={leaseYears} onChange={setLeaseYears} min={1} step="1" />
            <NumberField label="Money factor" value={moneyFactor} onChange={setMoneyFactor} min={0} step="0.0001" />
            <NumberField label="Sales tax (%)" value={salesTax} onChange={setSalesTax} min={0} step="0.1" />
          </div>
          <Hint>
            Lease payment = depreciation ÷ months + finance charge. Depreciation is MSRP minus the
            residual value at lease end; the finance charge is (MSRP + residual) × money factor.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Monthly lease payment"
            value={`${formatMoney(result.leasePayment)}`}
            sub={`Residual ${formatMoney(result.residual)}`}
          />
          <ResultRows>
            <ResultRow label="Depreciation/month" value={formatMoney(result.depreciationPayment)} />
            <ResultRow label="Finance charge/month" value={formatMoney(result.financeCharge)} />
            <ResultRow label="Total lease cost" value={formatMoney(result.totalCost)} />
            <ResultRow label="Total with tax" value={formatMoney(result.totalCostWithTax)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default CarLeasingCalculator;