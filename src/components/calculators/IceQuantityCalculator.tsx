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

export interface IceQuantityInput {
  guests: number;
  drinksPerGuest: number;
  icePerDrink: number;
  coolerIcePerGuest: number;
  bagSizeLb: number;
}

export function computeIceQuantity(input: IceQuantityInput) {
  const guests = Math.max(0, input.guests);
  const drinks = Math.max(0, input.drinksPerGuest);
  const icePerDrink = Math.max(0, input.icePerDrink);
  const coolerIce = Math.max(0, input.coolerIcePerGuest);
  const bagSize = Math.max(1, input.bagSizeLb);

  const drinkIce = guests * drinks * icePerDrink;
  const coolerTotal = guests * coolerIce;
  const totalLb = drinkIce + coolerTotal;
  const bags = Math.ceil(totalLb / bagSize);

  return { drinkIce, coolerTotal, totalLb, bags };
}

export function IceQuantityCalculator() {
  const [guests, setGuests] = useState('50');
  const [drinksPerGuest, setDrinksPerGuest] = useState('3');
  const [icePerDrink, setIcePerDrink] = useState('0.5');
  const [coolerIcePerGuest, setCoolerIcePerGuest] = useState('0.5');
  const [bagSizeLb, setBagSizeLb] = useState('10');

  const result = computeIceQuantity({
    guests: Number(guests) || 0,
    drinksPerGuest: Number(drinksPerGuest) || 0,
    icePerDrink: Number(icePerDrink) || 0,
    coolerIcePerGuest: Number(coolerIcePerGuest) || 0,
    bagSizeLb: Number(bagSizeLb) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Guests" value={guests} onChange={setGuests} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Drinks per guest" value={drinksPerGuest} onChange={setDrinksPerGuest} min={0} />
              <NumberField label="Ice per drink (lb)" value={icePerDrink} onChange={setIcePerDrink} min={0} step="0.1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField
                label="Cooler ice per guest (lb)"
                value={coolerIcePerGuest}
                onChange={setCoolerIcePerGuest}
                min={0}
                step="0.1"
              />
              <NumberField label="Ice per bag (lb)" value={bagSizeLb} onChange={setBagSizeLb} min={1} />
            </div>
          </div>
          <Hint>
            Allow about 1.5 lb of ice per guest for drinks plus cooling, and half a pound per guest sitting in
            the coolers that keep bottles cold.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Ice needed"
            value={`${formatMoney(result.totalLb)} lb`}
            sub={`${result.bags} bag(s) of ${Number(bagSizeLb) || 0} lb`}
          />
          <ResultRows>
            <ResultRow label="Ice for drinks" value={`${formatMoney(result.drinkIce)} lb`} />
            <ResultRow label="Ice for coolers" value={`${formatMoney(result.coolerTotal)} lb`} />
            <ResultRow label="In kilograms" value={`${formatMoney(result.totalLb * 0.453592)} kg`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default IceQuantityCalculator;
