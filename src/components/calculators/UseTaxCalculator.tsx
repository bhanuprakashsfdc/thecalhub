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

export interface UseTaxInput {
  purchasePrice: number;
  sellerTaxRate: number;
  localTaxRate: number;
}

export function computeUseTax(input: UseTaxInput) {
  const price = Math.max(0, input.purchasePrice);
  const sellerRate = Math.max(0, input.sellerTaxRate);
  const localRate = Math.max(0, input.localTaxRate);
  const rateDifference = Math.max(0, localRate - sellerRate);
  const useTax = (price * rateDifference) / 100;
  const taxAtLocalRate = (price * localRate) / 100;
  return { rateDifference, useTax, taxAtLocalRate, totalPayable: price + useTax };
}

export function UseTaxCalculator() {
  const [purchasePrice, setPurchasePrice] = useState('1000');
  const [sellerTaxRate, setSellerTaxRate] = useState('0');
  const [localTaxRate, setLocalTaxRate] = useState('8.5');

  const result = computeUseTax({
    purchasePrice: Number(purchasePrice) || 0,
    sellerTaxRate: Number(sellerTaxRate) || 0,
    localTaxRate: Number(localTaxRate) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Purchase price ($)" value={purchasePrice} onChange={setPurchasePrice} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Seller tax rate (%)" value={sellerTaxRate} onChange={setSellerTaxRate} step="0.1" min={0} />
              <NumberField label="Your local rate (%)" value={localTaxRate} onChange={setLocalTaxRate} step="0.1" min={0} />
            </div>
          </div>
          <Hint>
            Use tax is owed on purchases from out-of-state sellers when your local rate is higher than what the
            seller charged — you report the difference yourself.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Use tax due"
            value={`$${formatMoney(result.useTax)}`}
            sub={`Rate difference ${formatMoney(result.rateDifference)}%`}
          />
          <ResultRows>
            <ResultRow label="Tax due at your local rate" value={`$${formatMoney(result.taxAtLocalRate)}`} />
            <ResultRow label="Rate difference" value={`${formatMoney(result.rateDifference)}%`} />
            <ResultRow label="Total payable" value={`$${formatMoney(result.totalPayable)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default UseTaxCalculator;
