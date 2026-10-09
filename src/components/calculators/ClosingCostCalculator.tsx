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

export interface ClosingCostInput {
  homePrice: number;
  downPayment: number;
  closingRate: number;
}

export function computeClosingCost(input: ClosingCostInput) {
  const loanAmount = Math.max(0, input.homePrice - input.downPayment);
  const closingCosts = loanAmount * (input.closingRate / 100);
  const origination = loanAmount * 0.01;
  const titleInsurance = loanAmount * 0.005;
  const cashToClose = input.downPayment + closingCosts;
  return { loanAmount, closingCosts, origination, titleInsurance, cashToClose };
}

export function ClosingCostCalculator() {
  const [homePrice, setHomePrice] = useState('400000');
  const [downPayment, setDownPayment] = useState('80000');
  const [closingRate, setClosingRate] = useState('3');

  const result = computeClosingCost({
    homePrice: Number(homePrice) || 0,
    downPayment: Number(downPayment) || 0,
    closingRate: Number(closingRate) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Home price ($)" value={homePrice} onChange={setHomePrice} min={0} />
            <NumberField label="Down payment ($)" value={downPayment} onChange={setDownPayment} min={0} />
            <NumberField label="Closing cost rate (%)" value={closingRate} onChange={setClosingRate} min={0} max={10} step="0.1" />
          </div>
          <Hint>
            Closing costs typically run 2–5% of the loan amount. The
            estimate includes origination (1%) and title insurance (0.5%).
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Estimated closing costs"
            value={`$${formatMoney(result.closingCosts)}`}
            sub="Due at closing"
          />
          <ResultRows>
            <ResultRow label="Loan amount" value={`$${formatMoney(result.loanAmount)}`} />
            <ResultRow label="Origination fee (1%)" value={`$${formatMoney(result.origination)}`} />
            <ResultRow label="Title insurance (0.5%)" value={`$${formatMoney(result.titleInsurance)}`} />
            <ResultRow label="Cash to close" value={`$${formatMoney(result.cashToClose)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ClosingCostCalculator;
