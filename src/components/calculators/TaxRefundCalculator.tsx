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

export interface TaxRefundInput {
  taxLiability: number;
  federalWithheld: number;
  otherCredits: number;
}

export function computeTaxRefund(input: TaxRefundInput) {
  const liability = Math.max(0, input.taxLiability);
  const payments = Math.max(0, input.federalWithheld) + Math.max(0, input.otherCredits);
  const refund = payments - liability;
  return { liability, payments, refund, owed: refund < 0 };
}

export function TaxRefundCalculator() {
  const [taxLiability, setTaxLiability] = useState('15000');
  const [federalWithheld, setFederalWithheld] = useState('18000');
  const [otherCredits, setOtherCredits] = useState('500');

  const result = computeTaxRefund({
    taxLiability: Number(taxLiability) || 0,
    federalWithheld: Number(federalWithheld) || 0,
    otherCredits: Number(otherCredits) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Total tax liability ($)" value={taxLiability} onChange={setTaxLiability} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Federal tax withheld ($)" value={federalWithheld} onChange={setFederalWithheld} min={0} />
              <NumberField label="Other credits ($)" value={otherCredits} onChange={setOtherCredits} min={0} />
            </div>
          </div>
          <Hint>
            Withholding is a prepayment, not a payment of the final bill — a refund simply means you prepaid more
            than the liability turned out to be.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label={result.owed ? 'Additional tax owed' : 'Estimated refund'}
            value={`$${formatMoney(Math.abs(result.refund))}`}
            sub={`Payments ${formatMoney(result.payments)} against ${formatMoney(result.liability)} owed`}
          />
          <ResultRows>
            <ResultRow label="Total payments" value={`$${formatMoney(result.payments)}`} />
            <ResultRow label="Tax liability" value={`$${formatMoney(result.liability)}`} />
            <ResultRow label="Net position" value={result.owed ? 'Owes tax' : 'Refund'} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default TaxRefundCalculator;
