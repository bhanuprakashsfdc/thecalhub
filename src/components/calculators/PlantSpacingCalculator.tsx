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

export interface PlantSpacingInput {
  rowSpacingCm: number;
  plantSpacingCm: number;
  areaSqM: number;
}

export function computePlantSpacing(input: PlantSpacingInput) {
  const row = Math.max(1, input.rowSpacingCm);
  const plant = Math.max(1, input.plantSpacingCm);
  const area = Math.max(0, input.areaSqM);

  const plantsPerSqM = 10000 / (row * plant);
  const totalPlants = plantsPerSqM * area;
  const plantsPerHa = plantsPerSqM * 10000;

  return { plantsPerSqM, totalPlants, plantsPerHa, row, plant, area };
}

export function PlantSpacingCalculator() {
  const [rowSpacingCm, setRowSpacingCm] = useState('50');
  const [plantSpacingCm, setPlantSpacingCm] = useState('25');
  const [areaSqM, setAreaSqM] = useState('400');

  const result = computePlantSpacing({
    rowSpacingCm: Number(rowSpacingCm) || 0,
    plantSpacingCm: Number(plantSpacingCm) || 0,
    areaSqM: Number(areaSqM) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Row spacing (cm)" value={rowSpacingCm} onChange={setRowSpacingCm} min={1} />
              <NumberField label="Plant spacing (cm)" value={plantSpacingCm} onChange={setPlantSpacingCm} min={1} />
            </div>
            <NumberField label="Field area (m²)" value={areaSqM} onChange={setAreaSqM} min={0} />
          </div>
          <Hint>
            One hectare is 10,000 m², so row spacing × plant spacing in square centimetres divides 10,000 to
            give plants per square metre. Standard vegetable rows sit 45–75 cm apart.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Plant density"
            value={`${formatMoney(result.plantsPerSqM)} /m²`}
            sub={`${formatMoney(result.totalPlants, 0)} plants in the field`}
          />
          <ResultRows>
            <ResultRow label="Plants per hectare" value={formatMoney(result.plantsPerHa, 0)} />
            <ResultRow label="Row spacing" value={`${formatMoney(result.row, 0)} cm`} />
            <ResultRow label="Plant spacing" value={`${formatMoney(result.plant, 0)} cm`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default PlantSpacingCalculator;
