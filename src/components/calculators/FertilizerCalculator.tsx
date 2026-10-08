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

export interface FertilizerInput {
  nutrientRequiredKg: number;
  nutrientContentPct: number;
  bagSizeKg: number;
  pricePerBag: number;
}

export function computeFertilizer(input: FertilizerInput) {
  const required = Math.max(0, input.nutrientRequiredKg);
  const content = Math.min(100, Math.max(0.1, input.nutrientContentPct));
  const bagSize = Math.max(1, input.bagSizeKg);
  const price = Math.max(0, input.pricePerBag);

  const productKg = required / (content / 100);
  const bags = productKg / bagSize;
  const cost = bags * price;
  const costPerKgNutrient = required > 0 ? cost / required : 0;

  return { productKg, bags, cost, costPerKgNutrient, required, content };
}

export function FertilizerCalculator() {
  const [nutrientRequiredKg, setNutrientRequiredKg] = useState('120');
  const [nutrientContentPct, setNutrientContentPct] = useState('30');
  const [bagSizeKg, setBagSizeKg] = useState('50');
  const [pricePerBag, setPricePerBag] = useState('35');

  const result = computeFertilizer({
    nutrientRequiredKg: Number(nutrientRequiredKg) || 0,
    nutrientContentPct: Number(nutrientContentPct) || 0,
    bagSizeKg: Number(bagSizeKg) || 0,
    pricePerBag: Number(pricePerBag) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField
                label="Nutrient required (kg)"
                value={nutrientRequiredKg}
                onChange={setNutrientRequiredKg}
                min={0}
              />
              <NumberField
                label="Nutrient content (%)"
                value={nutrientContentPct}
                onChange={setNutrientContentPct}
                min={0.1}
                max={100}
                step="0.5"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Bag size (kg)" value={bagSizeKg} onChange={setBagSizeKg} min={1} />
              <NumberField label="Price per bag" value={pricePerBag} onChange={setPricePerBag} min={0} />
            </div>
          </div>
          <Hint>
            Fertiliser labels show the N-P-K analysis as percentages by mass. Divide the nutrient you need by
            that percentage to get the product weight, then size it into the bags you can actually buy.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Fertilizer product"
            value={`${formatMoney(result.productKg)} kg`}
            sub={`${formatMoney(result.bags, 1)} bags to buy`}
          />
          <ResultRows>
            <ResultRow label="Nutrient supplied" value={`${formatMoney(result.required)} kg`} />
            <ResultRow label="Total cost" value={formatMoney(result.cost)} />
            <ResultRow label="Cost per kg of nutrient" value={formatMoney(result.costPerKgNutrient)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default FertilizerCalculator;
