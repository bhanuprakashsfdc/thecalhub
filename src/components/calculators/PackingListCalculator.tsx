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

export interface PackingListInput {
  people: number;
  days: number;
  itemsPerPersonPerDay: number;
}

export function computePackingList(input: PackingListInput) {
  const totalItems = input.people * input.days * input.itemsPerPersonPerDay;
  const outfits = input.people * input.days;
  const weightKg = totalItems * 0.25;
  const itemsPerPerson = input.days * input.itemsPerPersonPerDay;
  return { totalItems, outfits, weightKg, itemsPerPerson };
}

export function PackingListCalculator() {
  const [people, setPeople] = useState('2');
  const [days, setDays] = useState('7');
  const [itemsPerPersonPerDay, setItemsPerPersonPerDay] = useState('3');

  const result = computePackingList({
    people: Number(people) || 0,
    days: Number(days) || 0,
    itemsPerPersonPerDay: Number(itemsPerPersonPerDay) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Number of people" value={people} onChange={setPeople} min={0} step="1" />
            <NumberField label="Days of travel" value={days} onChange={setDays} min={0} step="1" />
            <NumberField label="Items per person per day" value={itemsPerPersonPerDay} onChange={setItemsPerPersonPerDay} min={0} step="1" />
          </div>
          <Hint>
            Total items = people × days × items per person per day.
            Weight assumes ~0.25 kg per item.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Total items to pack"
            value={String(result.totalItems)}
            sub="Across the trip"
          />
          <ResultRows>
            <ResultRow label="Clothing outfits" value={String(result.outfits)} />
            <ResultRow label="Estimated bag weight (kg)" value={formatMoney(result.weightKg)} />
            <ResultRow label="Items per person" value={String(result.itemsPerPerson)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default PackingListCalculator;
