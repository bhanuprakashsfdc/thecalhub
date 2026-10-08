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

export interface ServingSizeInput {
  totalQuantity: number;
  originalServings: number;
  desiredServings: number;
}

export function computeServingSize(input: ServingSizeInput) {
  const total = Math.max(0, input.totalQuantity);
  const original = Math.max(0, input.originalServings);
  const desired = Math.max(0, input.desiredServings);

  const perServingOriginal = original > 0 ? total / original : 0;
  const perServingDesired = desired > 0 ? total / desired : 0;
  const totalNeeded = perServingOriginal * desired;
  const scale = original > 0 ? desired / original : 0;

  return { perServingOriginal, perServingDesired, totalNeeded, scale };
}

export function ServingSizeCalculator() {
  const [totalQuantity, setTotalQuantity] = useState('1200');
  const [originalServings, setOriginalServings] = useState('4');
  const [desiredServings, setDesiredServings] = useState('6');

  const result = computeServingSize({
    totalQuantity: Number(totalQuantity) || 0,
    originalServings: Number(originalServings) || 0,
    desiredServings: Number(desiredServings) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Total yield (grams)" value={totalQuantity} onChange={setTotalQuantity} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Original servings" value={originalServings} onChange={setOriginalServings} min={0} />
              <NumberField label="Desired servings" value={desiredServings} onChange={setDesiredServings} min={0} />
            </div>
          </div>
          <Hint>
            Split the finished batch across the number of people you actually need to feed — the per-serving
            amount shrinks as servings rise and the total required grows with the party size.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Amount per serving"
            value={`${formatMoney(result.perServingDesired)} g`}
            sub={`Across ${desiredServings || 0} desired servings`}
          />
          <ResultRows>
            <ResultRow label="Original per serving" value={`${formatMoney(result.perServingOriginal)} g`} />
            <ResultRow label="Total needed for desired servings" value={`${formatMoney(result.totalNeeded)} g`} />
            <ResultRow label="Scale factor" value={`${formatMoney(result.scale)}×`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ServingSizeCalculator;
