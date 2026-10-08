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

const SQ_PER_ACRE_HA = 2.471053814671653;

export interface CropYieldInput {
  areaHa: number;
  yieldPerHa: number;
  pricePerTonne: number;
}

export function computeCropYield(input: CropYieldInput) {
  const area = Math.max(0, input.areaHa);
  const yieldPerHa = Math.max(0, input.yieldPerHa);
  const price = Math.max(0, input.pricePerTonne);

  const totalTonnes = area * yieldPerHa;
  const totalKg = totalTonnes * 1000;
  const revenue = totalTonnes * price;
  const yieldPerAcre = yieldPerHa / SQ_PER_ACRE_HA;

  return { totalTonnes, totalKg, revenue, yieldPerAcre, area, price };
}

export function CropYieldCalculator() {
  const [areaHa, setAreaHa] = useState('12.5');
  const [yieldPerHa, setYieldPerHa] = useState('6.4');
  const [pricePerTonne, setPricePerTonne] = useState('240');

  const result = computeCropYield({
    areaHa: Number(areaHa) || 0,
    yieldPerHa: Number(yieldPerHa) || 0,
    pricePerTonne: Number(pricePerTonne) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Harvested area (ha)" value={areaHa} onChange={setAreaHa} min={0} step="0.1" />
              <NumberField label="Yield (t/ha)" value={yieldPerHa} onChange={setYieldPerHa} min={0} step="0.1" />
            </div>
            <NumberField label="Price per tonne" value={pricePerTonne} onChange={setPricePerTonne} min={0} />
          </div>
          <Hint>
            Multiply the harvested area by the yield per hectare to get the crop mass, then by the price to get
            gross revenue. One tonne per hectare is about 0.405 tonnes per acre.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Total harvest"
            value={`${formatMoney(result.totalTonnes)} t`}
            sub={`${formatMoney(result.revenue)} gross revenue`}
          />
          <ResultRows>
            <ResultRow label="Total kilograms" value={`${formatMoney(result.totalKg, 0)} kg`} />
            <ResultRow label="Yield per acre" value={`${formatMoney(result.yieldPerAcre)} t`} />
            <ResultRow label="Harvested area" value={`${formatMoney(result.area, 1)} ha`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default CropYieldCalculator;
