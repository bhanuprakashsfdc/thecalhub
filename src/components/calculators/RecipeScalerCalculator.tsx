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

export interface RecipeScalerInput {
  originalServings: number;
  desiredServings: number;
  ingredientAmount: number;
}

export function computeRecipeScaler(input: RecipeScalerInput) {
  const original = Math.max(0, input.originalServings);
  const desired = Math.max(0, input.desiredServings);
  const amount = Math.max(0, input.ingredientAmount);

  const factor = original > 0 ? desired / original : 0;
  const scaled = amount * factor;
  const difference = scaled - amount;
  const perServing = desired > 0 ? scaled / desired : 0;

  return { factor, scaled, difference, perServing };
}

export function RecipeScalerCalculator() {
  const [originalServings, setOriginalServings] = useState('4');
  const [desiredServings, setDesiredServings] = useState('10');
  const [ingredientAmount, setIngredientAmount] = useState('250');

  const result = computeRecipeScaler({
    originalServings: Number(originalServings) || 0,
    desiredServings: Number(desiredServings) || 0,
    ingredientAmount: Number(ingredientAmount) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Original servings" value={originalServings} onChange={setOriginalServings} min={0} />
              <NumberField label="Desired servings" value={desiredServings} onChange={setDesiredServings} min={0} />
            </div>
            <NumberField
              label="Ingredient amount (grams)"
              value={ingredientAmount}
              onChange={setIngredientAmount}
              min={0}
            />
          </div>
          <Hint>
            Scaling is linear: multiply every ingredient by desired ÷ original servings. Seasonings, chilli and
            salt rarely scale perfectly — taste as you go.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Scale factor"
            value={`${formatMoney(result.factor)}×`}
            sub={`${desiredServings || 0} servings from ${originalServings || 0}`}
          />
          <ResultRows>
            <ResultRow label="Scaled ingredient amount" value={`${formatMoney(result.scaled)} g`} />
            <ResultRow label="Amount to add" value={`${formatMoney(result.difference)} g`} />
            <ResultRow label="Per serving" value={`${formatMoney(result.perServing)} g`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default RecipeScalerCalculator;
