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

export interface TitleInsuranceInput {
  purchasePrice: number;
  downPayment: number;
  state: string;
}

const BASE_RATES: Record<string, number> = {
  CA: 0.0022, TX: 0.0021, FL: 0.002, NY: 0.0025, default: 0.0022,
};

export function computeTitleInsurance(input: TitleInsuranceInput) {
  const loan = input.purchasePrice - input.downPayment;
  const rate = BASE_RATES[input.state] ?? BASE_RATES.default;
  const premium = loan * rate;
  const ownerPolicy = premium;
  const lenderPolicy = premium * 0.6;
  const total = ownerPolicy + lenderPolicy;
  return { loan, rate, premium, ownerPolicy, lenderPolicy, total };
}

export function TitleInsuranceCalculator() {
  const [purchasePrice, setPurchasePrice] = useState('350000');
  const [downPayment, setDownPayment] = useState('70000');
  const [state, setState] = useState('CA');

  const result = useMemo(
    () =>
      computeTitleInsurance({
        purchasePrice: Number(purchasePrice) || 0,
        downPayment: Number(downPayment) || 0,
        state,
      }),
    [purchasePrice, downPayment, state]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Purchase price ($)" value={purchasePrice} onChange={setPurchasePrice} min={0} step="10000" />
            <NumberField label="Down payment ($)" value={downPayment} onChange={setDownPayment} min={0} step="10000" />
            <div className="block">
              <span className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">State</span>
              <input
                aria-label="State"
                className="w-full bg-surface-container-highest border border-white/5 rounded-lg p-4 text-white font-mono text-lg outline-none focus:border-primary-fixed/50"
                value={state}
                onChange={(e) => setState(e.target.value)}
                maxLength={2}
              />
            </div>
          </div>
          <Hint>
            Title insurance premiums are based on the loan amount and vary by state. The owner's
            policy protects the buyer; the lender's policy protects the mortgage holder.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Title insurance premium"
            value={`${formatMoney(result.ownerPolicy)}`}
            sub={`Total ${formatMoney(result.total)}`}
          />
          <ResultRows>
            <ResultRow label="Loan amount" value={formatMoney(result.loan)} />
            <ResultRow label="Owner policy" value={formatMoney(result.ownerPolicy)} />
            <ResultRow label="Lender policy" value={formatMoney(result.lenderPolicy)} />
            <ResultRow label="Total" value={formatMoney(result.total)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default TitleInsuranceCalculator;