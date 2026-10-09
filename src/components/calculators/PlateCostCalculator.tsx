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

export interface PlateCostInput {
  ingredientCost: number;
  servings: number;
  targetFoodCost: number;
}

export function computePlateCost(input: PlateCostInput) {
  const plateCost =
    input.servings > 0 ? input.ingredientCost / input.servings : 0;
  const suggestedPrice =
    input.targetFoodCost > 0 ? plateCost / (input.targetFoodCost / 100) : 0;
  const margin = suggestedPrice - plateCost;
  return { plateCost, suggestedPrice, margin };
}

export function PlateCostCalculator() {
  const [ingredientCost, setIngredientCost] = useState('120');
  const [servings, setServings] = useState('10');
  const [targetFoodCost, setTargetFoodCost] = useState('30');

  const result = computePlateCost({
    ingredientCost: Number(ingredientCost) || 0,
    servings: Number(servings) || 0,
    targetFoodCost: Number(targetFoodCost) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Total ingredient cost ($)" value={ingredientCost} onChange={setIngredientCost} min={0} />
            <NumberField label="Number of servings" value={servings} onChange={setServings} min={0} step="1" />
            <NumberField label="Target food cost (%)" value={targetFoodCost} onChange={setTargetFoodCost} min={0} max={100} step="1" />
          </div>
          <Hint>
            Plate cost = ingredient cost ÷ servings. Menu price = plate cost ÷
            target food cost percentage (restaurants often target 28–35%).
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Cost per plate"
            value={`$${formatMoney(result.plateCost)}`}
            sub="Ingredient cost"
          />
          <ResultRows>
            <ResultRow label="Suggested menu price" value={`$${formatMoney(result.suggestedPrice)}`} />
            <ResultRow label="Gross margin per plate" value={`$${formatMoney(result.margin)}`} />
            <ResultRow label="Food cost ratio" value={`${formatMoney(Number(targetFoodCost) || 0)}%`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default PlateCostCalculator;
