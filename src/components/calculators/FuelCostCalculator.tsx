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

export interface FuelCostInput {
  distanceKm: number;
  efficiencyKmPerL: number;
  pricePerL: number;
}

export function computeFuelCost(input: FuelCostInput) {
  const fuelNeeded =
    input.efficiencyKmPerL > 0 ? input.distanceKm / input.efficiencyKmPerL : 0;
  const cost = fuelNeeded * input.pricePerL;
  const costPer100Km =
    input.efficiencyKmPerL > 0 ? (100 / input.efficiencyKmPerL) * input.pricePerL : 0;
  const rangeOn50L = 50 * input.efficiencyKmPerL;
  return { fuelNeeded, cost, costPer100Km, rangeOn50L };
}

export function FuelCostCalculator() {
  const [distanceKm, setDistanceKm] = useState('450');
  const [efficiencyKmPerL, setEfficiencyKmPerL] = useState('15');
  const [pricePerL, setPricePerL] = useState('1.8');

  const result = computeFuelCost({
    distanceKm: Number(distanceKm) || 0,
    efficiencyKmPerL: Number(efficiencyKmPerL) || 0,
    pricePerL: Number(pricePerL) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Distance (km)" value={distanceKm} onChange={setDistanceKm} min={0} />
            <NumberField label="Fuel efficiency (km/L)" value={efficiencyKmPerL} onChange={setEfficiencyKmPerL} min={0} step="0.1" />
            <NumberField label="Fuel price ($/L)" value={pricePerL} onChange={setPricePerL} min={0} step="0.01" />
          </div>
          <Hint>
            Fuel needed = distance ÷ efficiency. Cost per 100 km is a
            handy figure for comparing vehicles.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Total fuel cost"
            value={`$${formatMoney(result.cost)}`}
            sub="For the trip"
          />
          <ResultRows>
            <ResultRow label="Fuel needed (L)" value={formatMoney(result.fuelNeeded)} />
            <ResultRow label="Cost per 100 km" value={`$${formatMoney(result.costPer100Km)}`} />
            <ResultRow label="Range on 50 L (km)" value={formatMoney(result.rangeOn50L)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default FuelCostCalculator;
