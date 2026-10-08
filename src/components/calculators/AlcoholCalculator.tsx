import { useState } from 'react';
import {
  CalcGrid,
  Panel,
  PanelEyebrow,
  NumberField,
  SelectField,
  ResultHero,
  ResultRows,
  ResultRow,
  Hint,
  formatMoney,
} from './kit';

export interface AlcoholInput {
  drinks: number;
  drinkSizeOz: number;
  abvPercent: number;
  weightKg: number;
  bodyWater: string;
  hoursSince: number;
}

export function computeAlcohol(input: AlcoholInput) {
  const drinks = Math.max(0, input.drinks);
  const sizeOz = Math.max(0, input.drinkSizeOz);
  const abv = Math.max(0, input.abvPercent);
  const weight = Math.max(1, input.weightKg);
  const r = Math.max(0.1, Number(input.bodyWater) || 0.68);
  const hours = Math.max(0, input.hoursSince);

  const perDrinkGrams = sizeOz * 29.5735 * (abv / 100) * 0.789;
  const alcoholGrams = perDrinkGrams * drinks;
  const standardDrinks = alcoholGrams / 14;
  const bacRaw = (alcoholGrams / (weight * r)) * 100 - 0.015 * hours;
  const bac = Math.max(0, bacRaw);
  const hoursToSober = bac > 0 ? bac / 0.015 : 0;

  return { alcoholGrams, standardDrinks, bac, hoursToSober };
}

export function AlcoholCalculator() {
  const [drinks, setDrinks] = useState('2');
  const [drinkSizeOz, setDrinkSizeOz] = useState('12');
  const [abvPercent, setAbvPercent] = useState('5');
  const [weightKg, setWeightKg] = useState('70');
  const [bodyWater, setBodyWater] = useState('0.68');
  const [hoursSince, setHoursSince] = useState('0');

  const result = computeAlcohol({
    drinks: Number(drinks) || 0,
    drinkSizeOz: Number(drinkSizeOz) || 0,
    abvPercent: Number(abvPercent) || 0,
    weightKg: Number(weightKg) || 0,
    bodyWater,
    hoursSince: Number(hoursSince) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Drinks consumed" value={drinks} onChange={setDrinks} min={0} />
              <NumberField label="Drink size (oz)" value={drinkSizeOz} onChange={setDrinkSizeOz} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Alcohol by volume (%)" value={abvPercent} onChange={setAbvPercent} min={0} step="0.5" />
              <NumberField label="Body weight (kg)" value={weightKg} onChange={setWeightKg} min={1} />
            </div>
            <SelectField
              label="Body water factor"
              value={bodyWater}
              onChange={setBodyWater}
              options={[
                { value: '0.68', label: 'Male (0.68)' },
                { value: '0.55', label: 'Female (0.55)' },
              ]}
            />
            <NumberField label="Hours since last drink" value={hoursSince} onChange={setHoursSince} min={0} step="0.5" />
          </div>
          <Hint>
            A US standard drink contains 14 g of pure alcohol. The BAC estimate uses the Widmark formula and
            removes 0.015 per hour, the average rate the liver clears alcohol.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Standard drinks"
            value={formatMoney(result.standardDrinks)}
            sub="One standard drink = 14 g of pure alcohol"
          />
          <ResultRows>
            <ResultRow label="Pure alcohol" value={`${formatMoney(result.alcoholGrams)} g`} />
            <ResultRow label="Estimated BAC" value={formatMoney(result.bac, 3)} />
            <ResultRow label="Hours to sober up" value={formatMoney(result.hoursToSober, 1)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default AlcoholCalculator;
