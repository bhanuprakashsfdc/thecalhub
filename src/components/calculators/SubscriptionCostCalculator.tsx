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

export interface SubscriptionCostInput {
  pricePerUser: number;
  users: number;
  months: number;
  discountPercent: number;
}

export function computeSubscriptionCost(input: SubscriptionCostInput) {
  const users = Math.max(0, input.users);
  const months = Math.max(0, input.months);
  const monthlyCost = Math.max(0, input.pricePerUser) * users;
  const gross = monthlyCost * months;
  const discount = gross * (Math.min(100, Math.max(0, input.discountPercent)) / 100);
  const total = gross - discount;
  const perUserPerMonth = months > 0 && users > 0 ? total / months / users : 0;

  return { monthlyCost, gross, discount, total, perUserPerMonth };
}

export function SubscriptionCostCalculator() {
  const [pricePerUser, setPricePerUser] = useState('12');
  const [users, setUsers] = useState('25');
  const [months, setMonths] = useState('12');
  const [discountPercent, setDiscountPercent] = useState('10');

  const result = computeSubscriptionCost({
    pricePerUser: Number(pricePerUser) || 0,
    users: Number(users) || 0,
    months: Number(months) || 0,
    discountPercent: Number(discountPercent) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Price per user ($/month)" value={pricePerUser} onChange={setPricePerUser} min={0} step="0.01" />
              <NumberField label="Number of users" value={users} onChange={setUsers} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Contract length (months)" value={months} onChange={setMonths} min={1} />
              <NumberField label="Billing discount (%)" value={discountPercent} onChange={setDiscountPercent} min={0} max={100} step="0.1" />
            </div>
          </div>
          <Hint>
            Annual billing and volume tiers routinely cut 10–20% off list price, but seat counts drift upward —
            model the seats you will actually have, not the ones you have today.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Total contract cost"
            value={`$${formatMoney(result.total)}`}
            sub={`Over ${months} month(s)`}
          />
          <ResultRows>
            <ResultRow label="Monthly cost" value={`$${formatMoney(result.monthlyCost)}`} />
            <ResultRow label="Gross before discount" value={`$${formatMoney(result.gross)}`} />
            <ResultRow label="Discount saved" value={`$${formatMoney(result.discount)}`} />
            <ResultRow label="Effective per user / month" value={`$${formatMoney(result.perUserPerMonth)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default SubscriptionCostCalculator;
