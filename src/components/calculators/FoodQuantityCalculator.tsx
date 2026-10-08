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

const whole = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 0 });

export interface FoodQuantityInput {
  guests: number;
  servingsPerPerson: number;
  servingSizeOz: number;
  pricePerServing: number;
}

export function computeFoodQuantity(input: FoodQuantityInput) {
  const guests = Math.max(0, input.guests);
  const servings = Math.max(0, input.servingsPerPerson);
  const sizeOz = Math.max(0, input.servingSizeOz);
  const price = Math.max(0, input.pricePerServing);

  const totalServings = guests * servings;
  const totalOz = totalServings * sizeOz;
  const totalLb = totalOz / 16;
  const cost = totalServings * price;

  return { totalServings, totalOz, totalLb, cost };
}

export function FoodQuantityCalculator() {
  const [guests, setGuests] = useState('60');
  const [servingsPerPerson, setServingsPerPerson] = useState('3');
  const [servingSizeOz, setServingSizeOz] = useState('4');
  const [pricePerServing, setPricePerServing] = useState('2.5');

  const result = computeFoodQuantity({
    guests: Number(guests) || 0,
    servingsPerPerson: Number(servingsPerPerson) || 0,
    servingSizeOz: Number(servingSizeOz) || 0,
    pricePerServing: Number(pricePerServing) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Guests" value={guests} onChange={setGuests} min={0} />
              <NumberField
                label="Servings per person"
                value={servingsPerPerson}
                onChange={setServingsPerPerson}
                min={0}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Serving size (oz)" value={servingSizeOz} onChange={setServingSizeOz} min={0} />
              <NumberField
                label="Cost per serving ($)"
                value={pricePerServing}
                onChange={setPricePerServing}
                min={0}
                step="0.25"
              />
            </div>
          </div>
          <Hint>
            Buffet planning usually assumes 1.5 lb of food per guest for a mixed spread; use servings per person
            when you are pricing a fixed menu instead.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Total food"
            value={`${formatMoney(result.totalLb)} lb`}
            sub={`${whole(result.totalServings)} servings across ${Number(guests) || 0} guests`}
          />
          <ResultRows>
            <ResultRow label="Total ounces" value={`${formatMoney(result.totalOz)} oz`} />
            <ResultRow label="Total cost" value={`$${formatMoney(result.cost)}`} />
            <ResultRow label="Servings" value={whole(result.totalServings)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default FoodQuantityCalculator;
