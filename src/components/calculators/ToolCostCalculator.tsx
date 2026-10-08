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

export interface ToolCostInput {
  purchasePrice: number;
  rentalPerDay: number;
  daysNeeded: number;
}

export function computeToolCost(input: ToolCostInput) {
  const buy = Math.max(0, input.purchasePrice);
  const rentRate = Math.max(0, input.rentalPerDay);
  const days = Math.max(0, input.daysNeeded);

  const rent = rentRate * days;
  const cheaper = Math.min(buy, rent);
  const savings = Math.abs(buy - rent);
  const recommendation = buy <= rent ? 'Buy' : 'Rent';

  return { buy, rent, cheaper, savings, recommendation };
}

export function ToolCostCalculator() {
  const [purchasePrice, setPurchasePrice] = useState('400');
  const [rentalPerDay, setRentalPerDay] = useState('50');
  const [daysNeeded, setDaysNeeded] = useState('12');

  const result = computeToolCost({
    purchasePrice: Number(purchasePrice) || 0,
    rentalPerDay: Number(rentalPerDay) || 0,
    daysNeeded: Number(daysNeeded) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Purchase price ($)" value={purchasePrice} onChange={setPurchasePrice} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Rental per day ($)" value={rentalPerDay} onChange={setRentalPerDay} min={0} />
              <NumberField label="Days needed" value={daysNeeded} onChange={setDaysNeeded} min={0} />
            </div>
          </div>
          <Hint>
            Break-even happens when rental days × daily rate equals the purchase price. Past that point buying
            is cheaper, ignoring resale value and storage.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Lower cost option"
            value={`$${formatMoney(result.cheaper)}`}
            sub={`${result.recommendation} — saves $${formatMoney(result.savings)} versus the alternative`}
          />
          <ResultRows>
            <ResultRow label="Buy once" value={`$${formatMoney(result.buy)}`} />
            <ResultRow label="Rent total" value={`$${formatMoney(result.rent)}`} />
            <ResultRow label="Difference" value={`$${formatMoney(result.savings)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ToolCostCalculator;
