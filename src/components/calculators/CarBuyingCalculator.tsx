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

export interface CarBuyingInput {
  carPrice: number;
  downPayment: number;
  tradeIn: number;
  salesTaxPct: number;
  registrationFee: number;
  interestRatePct: number;
  termYears: number;
}

export function computeCarBuying(input: CarBuyingInput) {
  const tax = input.carPrice * (input.salesTaxPct / 100);
  const financed = Math.max(
    0,
    input.carPrice + tax + input.registrationFee - input.tradeIn - input.downPayment
  );
  const r = input.interestRatePct / 100 / 12;
  const n = input.termYears * 12;
  const monthly =
    r > 0
      ? (financed * r) / (1 - Math.pow(1 + r, -n))
      : n > 0
        ? financed / n
        : 0;
  const totalInterest = monthly * n - financed;
  const totalCost = input.carPrice + tax + input.registrationFee - input.tradeIn;
  return { tax, financed, monthly, totalInterest, totalCost };
}

export function CarBuyingCalculator() {
  const [carPrice, setCarPrice] = useState('30000');
  const [downPayment, setDownPayment] = useState('5000');
  const [tradeIn, setTradeIn] = useState('4000');
  const [salesTaxPct, setSalesTaxPct] = useState('7');
  const [registrationFee, setRegistrationFee] = useState('300');
  const [interestRatePct, setInterestRatePct] = useState('6.5');
  const [termYears, setTermYears] = useState('5');

  const result = computeCarBuying({
    carPrice: Number(carPrice) || 0,
    downPayment: Number(downPayment) || 0,
    tradeIn: Number(tradeIn) || 0,
    salesTaxPct: Number(salesTaxPct) || 0,
    registrationFee: Number(registrationFee) || 0,
    interestRatePct: Number(interestRatePct) || 0,
    termYears: Number(termYears) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Car price ($)" value={carPrice} onChange={setCarPrice} min={0} />
            <NumberField label="Down payment ($)" value={downPayment} onChange={setDownPayment} min={0} />
            <NumberField label="Trade-in value ($)" value={tradeIn} onChange={setTradeIn} min={0} />
            <NumberField label="Sales tax (%)" value={salesTaxPct} onChange={setSalesTaxPct} min={0} step="0.1" />
            <NumberField label="Registration fee ($)" value={registrationFee} onChange={setRegistrationFee} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Interest rate (%)" value={interestRatePct} onChange={setInterestRatePct} min={0} step="0.1" />
              <NumberField label="Loan term (years)" value={termYears} onChange={setTermYears} min={0} step="1" />
            </div>
          </div>
          <Hint>
            Monthly payment amortises price + tax + registration −
            trade-in − down payment over the loan term.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Monthly payment"
            value={`$${formatMoney(result.monthly)}`}
            sub={`${formatMoney(Number(termYears) || 0 * 12)} months`}
          />
          <ResultRows>
            <ResultRow label="Amount financed" value={`$${formatMoney(result.financed)}`} />
            <ResultRow label="Total interest" value={`$${formatMoney(result.totalInterest)}`} />
            <ResultRow label="Total cost of car" value={`$${formatMoney(result.totalCost)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default CarBuyingCalculator;
