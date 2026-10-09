import { useState, useMemo } from 'react';
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

export interface MenuPricingInput {
  foodCost: number;
  desiredMargin: number;
  covers: number;
  wastePercent: number;
}

export function computeMenuPricing(input: MenuPricingInput) {
  const effectiveFoodCost = input.foodCost * (1 + input.wastePercent / 100);
  const menuPrice = effectiveFoodCost / (1 - input.desiredMargin / 100);
  const perCover = menuPrice;
  const revenue = perCover * input.covers;
  const totalFoodCost = effectiveFoodCost * input.covers;
  const profit = revenue - totalFoodCost;
  return { effectiveFoodCost, menuPrice, perCover, revenue, totalFoodCost, profit };
}

export function MenuPricingCalculator() {
  const [foodCost, setFoodCost] = useState('4.50');
  const [desiredMargin, setDesiredMargin] = useState('70');
  const [covers, setCovers] = useState('50');
  const [wastePercent, setWastePercent] = useState('10');

  const result = useMemo(
    () =>
      computeMenuPricing({
        foodCost: Number(foodCost) || 0,
        desiredMargin: Number(desiredMargin) || 0,
        covers: Number(covers) || 0,
        wastePercent: Number(wastePercent) || 0,
      }),
    [foodCost, desiredMargin, covers, wastePercent]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Food cost per plate ($)" value={foodCost} onChange={setFoodCost} min={0} step="0.10" />
            <NumberField label="Desired margin (%)" value={desiredMargin} onChange={setDesiredMargin} min={0} max={100} step="1" />
            <NumberField label="Covers per service" value={covers} onChange={setCovers} min={0} step="1" />
            <NumberField label="Waste allowance (%)" value={wastePercent} onChange={setWastePercent} min={0} step="1" />
          </div>
          <Hint>
            Menu price = effective food cost ÷ (1 − desired margin). Effective food cost includes
            waste, so the final price covers labour, overhead and profit.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Menu price per cover"
            value={`${formatMoney(result.menuPrice)}`}
            sub={`Food cost ${formatMoney(result.effectiveFoodCost)}`}
          />
          <ResultRows>
            <ResultRow label="Effective food cost" value={formatMoney(result.effectiveFoodCost)} />
            <ResultRow label="Revenue" value={formatMoney(result.revenue)} />
            <ResultRow label="Total food cost" value={formatMoney(result.totalFoodCost)} />
            <ResultRow label="Gross profit" value={formatMoney(result.profit)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default MenuPricingCalculator;