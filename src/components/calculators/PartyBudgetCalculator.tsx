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

export interface PartyBudgetInput {
  budget: number;
  guests: number;
  foodPerPerson: number;
  drinksPerPerson: number;
  venueFixed: number;
  otherFixed: number;
}

export function computePartyBudget(input: PartyBudgetInput) {
  const budget = Math.max(0, input.budget);
  const guests = Math.max(0, input.guests);
  const food = Math.max(0, input.foodPerPerson);
  const drinks = Math.max(0, input.drinksPerPerson);
  const venue = Math.max(0, input.venueFixed);
  const other = Math.max(0, input.otherFixed);

  const perHead = food + drinks;
  const guestCost = guests * perHead;
  const spent = guestCost + venue + other;
  const remaining = budget - spent;
  const perGuest = guests > 0 ? spent / guests : 0;
  const percentUsed = budget > 0 ? (spent / budget) * 100 : 0;

  return { spent, remaining, perGuest, percentUsed };
}

export function PartyBudgetCalculator() {
  const [budget, setBudget] = useState('5000');
  const [guests, setGuests] = useState('50');
  const [foodPerPerson, setFoodPerPerson] = useState('20');
  const [drinksPerPerson, setDrinksPerPerson] = useState('10');
  const [venueFixed, setVenueFixed] = useState('800');
  const [otherFixed, setOtherFixed] = useState('200');

  const result = computePartyBudget({
    budget: Number(budget) || 0,
    guests: Number(guests) || 0,
    foodPerPerson: Number(foodPerPerson) || 0,
    drinksPerPerson: Number(drinksPerPerson) || 0,
    venueFixed: Number(venueFixed) || 0,
    otherFixed: Number(otherFixed) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Total budget ($)" value={budget} onChange={setBudget} min={0} />
              <NumberField label="Guests" value={guests} onChange={setGuests} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Food per person ($)" value={foodPerPerson} onChange={setFoodPerPerson} min={0} />
              <NumberField label="Drinks per person ($)" value={drinksPerPerson} onChange={setDrinksPerPerson} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Venue ($)" value={venueFixed} onChange={setVenueFixed} min={0} />
              <NumberField label="Other costs ($)" value={otherFixed} onChange={setOtherFixed} min={0} />
            </div>
          </div>
          <Hint>
            Keep about 10 % of the budget unallocated for last-minute extras such as transport, extra ice or a
            vendor overage.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Budget remaining"
            value={`$${formatMoney(result.remaining)}`}
            sub={`${formatMoney(result.percentUsed)}% of the budget used`}
          />
          <ResultRows>
            <ResultRow label="Planned spend" value={`$${formatMoney(result.spent)}`} />
            <ResultRow label="Cost per guest" value={`$${formatMoney(result.perGuest)}`} />
            <ResultRow label="Guest count" value={`${Number(guests) || 0}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default PartyBudgetCalculator;
