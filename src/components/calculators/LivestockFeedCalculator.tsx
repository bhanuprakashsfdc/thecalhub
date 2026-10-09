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
  safeDiv,
} from './kit';

export interface LivestockFeedInput {
  bodyWeightKg: number;
  intakePct: number;
  animals: number;
  days: number;
  pricePerKg: number;
  wastePct: number;
}

export interface LivestockFeedResult {
  feedPerAnimalDay: number;
  groupPerDay: number;
  requiredKg: number;
  purchasedKg: number;
  totalCost: number;
  costPerAnimal: number;
}

const positive = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);
const share = (n: number) => (Number.isFinite(n) && n >= 0 ? n : 0);

export function computeLivestockFeed(input: LivestockFeedInput): LivestockFeedResult {
  const weight = positive(input.bodyWeightKg);
  const intake = share(input.intakePct);
  const animals = positive(input.animals);
  const days = positive(input.days);
  const price = share(input.pricePerKg);
  const waste = share(input.wastePct);

  const feedPerAnimalDay = weight * (intake / 100);
  const groupPerDay = feedPerAnimalDay * animals;
  const requiredKg = groupPerDay * days;
  const purchasedKg = requiredKg * (1 + waste / 100);
  const totalCost = purchasedKg * price;

  return {
    feedPerAnimalDay,
    groupPerDay,
    requiredKg,
    purchasedKg,
    totalCost,
    costPerAnimal: safeDiv(totalCost, animals),
  };
}

const toNumber = (raw: string) => {
  const n = Number(raw);
  return Number.isFinite(n) ? n : 0;
};

const WASTE_OPTIONS = [
  { value: '0', label: 'None (0%)' },
  { value: '5', label: 'Low (5%)' },
  { value: '10', label: 'Moderate (10%)' },
  { value: '15', label: 'High (15%)' },
];

export function LivestockFeedCalculator() {
  const [weight, setWeight] = useState('450');
  const [intake, setIntake] = useState('2.5');
  const [animals, setAnimals] = useState('10');
  const [days, setDays] = useState('30');
  const [price, setPrice] = useState('0.35');
  const [waste, setWaste] = useState('10');

  const result = computeLivestockFeed({
    bodyWeightKg: toNumber(weight),
    intakePct: toNumber(intake),
    animals: toNumber(animals),
    days: toNumber(days),
    pricePerKg: toNumber(price),
    wastePct: toNumber(waste),
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Body weight (kg)" value={weight} onChange={setWeight} min={0} />
              <NumberField label="Feed intake (% of body weight)" value={intake} onChange={setIntake} min={0} step="0.1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Animals in group" value={animals} onChange={setAnimals} min={0} />
              <NumberField label="Feeding period (days)" value={days} onChange={setDays} min={0} />
            </div>
            <NumberField label="Feed price (per kg)" value={price} onChange={setPrice} min={0} step="0.01" />
            <SelectField label="Feed waste allowance" value={waste} onChange={setWaste} options={WASTE_OPTIONS} />
          </div>
          <Hint>
            Intake is entered as a percentage of body weight, the usual way rations are scoped: a 450 kg animal
            eating 2.5% of its weight needs 11.25 kg of feed each day before any wastage is added.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Total feed cost"
            value={`$${formatMoney(result.totalCost)}`}
            sub={`${formatMoney(result.purchasedKg, 0)} kg purchased over ${formatMoney(toNumber(days), 0)} days`}
          />
          <ResultRows>
            <ResultRow label="Feed per animal per day" value={`${formatMoney(result.feedPerAnimalDay)} kg`} />
            <ResultRow label="Group feed per day" value={`${formatMoney(result.groupPerDay)} kg`} />
            <ResultRow label="Feed required (clean)" value={`${formatMoney(result.requiredKg, 0)} kg`} />
            <ResultRow label="Feed to purchase" value={`${formatMoney(result.purchasedKg, 0)} kg`} />
            <ResultRow label="Cost per animal" value={`$${formatMoney(result.costPerAnimal)}`} />
          </ResultRows>
          <Hint>
            Clean requirement is intake times animals times days; the purchase figure adds the selected waste
            allowance so spilled or spoiled feed is budgeted for.
          </Hint>
        </Panel>
      }
    />
  );
}

export default LivestockFeedCalculator;
