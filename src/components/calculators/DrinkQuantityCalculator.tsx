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

export interface DrinkQuantityInput {
  guests: number;
  partyHours: number;
  drinksPerHour: number;
  drinkSizeOz: number;
  pricePerDrink: number;
}

export function computeDrinkQuantity(input: DrinkQuantityInput) {
  const guests = Math.max(0, input.guests);
  const hours = Math.max(0, input.partyHours);
  const perHour = Math.max(0, input.drinksPerHour);
  const sizeOz = Math.max(0, input.drinkSizeOz);
  const price = Math.max(0, input.pricePerDrink);

  const totalDrinks = guests * hours * perHour;
  const gallons = (totalDrinks * sizeOz) / 128;
  const cost = totalDrinks * price;
  const perGuest = guests > 0 ? totalDrinks / guests : 0;

  return { totalDrinks, gallons, cost, perGuest };
}

export function DrinkQuantityCalculator() {
  const [guests, setGuests] = useState('50');
  const [partyHours, setPartyHours] = useState('4');
  const [drinksPerHour, setDrinksPerHour] = useState('1.25');
  const [drinkSizeOz, setDrinkSizeOz] = useState('12');
  const [pricePerDrink, setPricePerDrink] = useState('3.5');

  const result = computeDrinkQuantity({
    guests: Number(guests) || 0,
    partyHours: Number(partyHours) || 0,
    drinksPerHour: Number(drinksPerHour) || 0,
    drinkSizeOz: Number(drinkSizeOz) || 0,
    pricePerDrink: Number(pricePerDrink) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Guests" value={guests} onChange={setGuests} min={0} />
              <NumberField label="Party hours" value={partyHours} onChange={setPartyHours} min={0} step="0.5" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField
                label="Drinks per hour"
                value={drinksPerHour}
                onChange={setDrinksPerHour}
                min={0}
                step="0.25"
              />
              <NumberField label="Drink size (oz)" value={drinkSizeOz} onChange={setDrinkSizeOz} min={0} />
            </div>
            <NumberField label="Cost per drink ($)" value={pricePerDrink} onChange={setPricePerDrink} min={0} step="0.25" />
          </div>
          <Hint>
            Guests average one to two drinks in the first hour and one drink per hour after that. Multiply the
            rate by party length to size the bar.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Total drinks"
            value={whole(Math.round(result.totalDrinks))}
            sub={`${formatMoney(result.perGuest)} drinks per guest`}
          />
          <ResultRows>
            <ResultRow label="Liquid volume" value={`${formatMoney(result.gallons)} gal`} />
            <ResultRow label="Total cost" value={`$${formatMoney(result.cost)}`} />
            <ResultRow label="Drinks per guest" value={formatMoney(result.perGuest)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default DrinkQuantityCalculator;
