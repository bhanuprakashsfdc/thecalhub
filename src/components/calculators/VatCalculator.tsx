import { useState } from 'react';
import {
  CalcGrid,
  Panel,
  PanelEyebrow,
  NumberField,
  SegmentedControl,
  ResultHero,
  ResultRows,
  ResultRow,
  Hint,
  formatMoney,
} from './kit';

export interface VatInput {
  amount: number;
  vatRate: number;
  operation: 'add' | 'remove';
}

export function computeVat(input: VatInput) {
  const rate = input.vatRate / 100;
  const net =
    input.operation === 'add' ? input.amount : input.amount / (1 + rate);
  const vat = net * rate;
  const gross = net + vat;
  return { net, vat, gross };
}

export function VatCalculator() {
  const [operation, setOperation] = useState('add');
  const [amount, setAmount] = useState('100');
  const [vatRate, setVatRate] = useState('20');

  const result = computeVat({
    amount: Number(amount) || 0,
    vatRate: Number(vatRate) || 0,
    operation: operation === 'remove' ? 'remove' : 'add',
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <SegmentedControl
              label="Operation"
              value={operation}
              onChange={setOperation}
              options={[
                { value: 'add', label: 'Add VAT' },
                { value: 'remove', label: 'Remove VAT' },
              ]}
            />
            <NumberField label="Amount ($)" value={amount} onChange={setAmount} min={0} step="any" />
            <NumberField label="VAT rate (%)" value={vatRate} onChange={setVatRate} min={0} max={100} step="0.1" />
          </div>
          <Hint>
            Add VAT: gross = net × (1 + rate). Remove VAT:
            net = gross ÷ (1 + rate).
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Total amount"
            value={`$${formatMoney(result.gross)}`}
            sub={operation === 'add' ? 'Net plus VAT' : 'Gross amount'}
          />
          <ResultRows>
            <ResultRow label="Net amount" value={`$${formatMoney(result.net)}`} />
            <ResultRow label="VAT amount" value={`$${formatMoney(result.vat)}`} />
            <ResultRow label="Effective rate" value={`${formatMoney(Number(vatRate) || 0)}%`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default VatCalculator;
