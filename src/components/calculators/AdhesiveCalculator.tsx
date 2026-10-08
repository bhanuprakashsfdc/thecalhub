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

export interface AdhesiveInput {
  areaSqFt: number;
  spreadRate: number;
  wastePercent: number;
  pricePerContainer: number;
}

export function computeAdhesive(input: AdhesiveInput) {
  const area = Math.max(0, input.areaSqFt);
  const spreadRate = Math.max(0.1, input.spreadRate);
  const waste = Math.max(0, input.wastePercent);
  const price = Math.max(0, input.pricePerContainer);

  const coverage = area * (1 + waste / 100);
  const containers = Math.ceil(coverage / spreadRate);
  const cost = containers * price;

  return { coverage, containers, cost };
}

export function AdhesiveCalculator() {
  const [areaSqFt, setAreaSqFt] = useState('200');
  const [spreadRate, setSpreadRate] = useState('50');
  const [wastePercent, setWastePercent] = useState('10');
  const [pricePerContainer, setPricePerContainer] = useState('12');

  const result = computeAdhesive({
    areaSqFt: Number(areaSqFt) || 0,
    spreadRate: Number(spreadRate) || 0,
    wastePercent: Number(wastePercent) || 0,
    pricePerContainer: Number(pricePerContainer) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Surface area (sq ft)" value={areaSqFt} onChange={setAreaSqFt} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField
                label="Spread rate (sq ft per tub)"
                value={spreadRate}
                onChange={setSpreadRate}
                min={0.1}
              />
              <NumberField label="Waste (%)" value={wastePercent} onChange={setWastePercent} min={0} />
            </div>
            <NumberField
              label="Price per container ($)"
              value={pricePerContainer}
              onChange={setPricePerContainer}
              min={0}
              step="0.5"
            />
          </div>
          <Hint>
            Spread rate is printed on the tub and changes with substrate — combed notches on a floor use far more
            adhesive than a thin bed on a wall.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Containers needed"
            value={whole(result.containers)}
            sub={`$${formatMoney(result.cost)} total at the price you entered`}
          />
          <ResultRows>
            <ResultRow label="Coverage with waste" value={`${formatMoney(result.coverage)} sq ft`} />
            <ResultRow label="Surface area" value={`${Number(areaSqFt) || 0} sq ft`} />
            <ResultRow label="Spread rate" value={`${Number(spreadRate) || 0} sq ft/tub`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default AdhesiveCalculator;
