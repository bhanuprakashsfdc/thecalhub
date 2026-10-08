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

const ALLOCATIONS = [
  { key: 'venueCatering', label: 'Venue & catering', percent: 45 },
  { key: 'photo', label: 'Photography', percent: 12 },
  { key: 'attire', label: 'Attire', percent: 10 },
  { key: 'flowers', label: 'Flowers & décor', percent: 8 },
  { key: 'music', label: 'Music & entertainment', percent: 8 },
  { key: 'stationery', label: 'Stationery', percent: 4 },
  { key: 'favours', label: 'Favours', percent: 2 },
  { key: 'misc', label: 'Rings, transport & misc', percent: 11 },
] as const;

export interface WeddingBudgetInput {
  totalBudget: number;
  guests: number;
}

export function computeWeddingBudget(input: WeddingBudgetInput) {
  const budget = Math.max(0, input.totalBudget);
  const guests = Math.max(0, input.guests);

  const perPerson = guests > 0 ? budget / guests : 0;
  const buckets = ALLOCATIONS.map((item) => ({
    ...item,
    amount: (budget * item.percent) / 100,
  }));

  return { budget, guests, perPerson, buckets };
}

export function WeddingBudgetCalculator() {
  const [totalBudget, setTotalBudget] = useState('30000');
  const [guests, setGuests] = useState('100');

  const result = computeWeddingBudget({
    totalBudget: Number(totalBudget) || 0,
    guests: Number(guests) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Total budget ($)" value={totalBudget} onChange={setTotalBudget} min={0} />
            <NumberField label="Guests" value={guests} onChange={setGuests} min={0} />
          </div>
          <Hint>
            These percentages follow common wedding budgeting rules of thumb: venue and catering absorb about
            45 %, with photography the next largest line. Adjust each bucket once you have real quotes.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Budget per guest"
            value={`$${formatMoney(result.perPerson)}`}
            sub={`$${formatMoney(result.budget)} split across ${result.guests} guests`}
          />
          <ResultRows>
            {result.buckets.map((bucket) => (
              <ResultRow
                key={bucket.key}
                label={`${bucket.label} (${bucket.percent}%)`}
                value={`$${formatMoney(bucket.amount)}`}
              />
            ))}
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default WeddingBudgetCalculator;
