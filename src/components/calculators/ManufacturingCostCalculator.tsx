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

export interface ManufacturingCostInput {
  material: number;
  labourHours: number;
  labourRate: number;
  overhead: number;
  quantity: number;
  wastePercent: number;
}

export function computeManufacturingCost(input: ManufacturingCostInput) {
  const baseMaterial = Math.max(0, input.material);
  const materialWithWaste = baseMaterial * (1 + Math.max(0, input.wastePercent) / 100);
  const labour = Math.max(0, input.labourHours) * Math.max(0, input.labourRate);
  const overhead = Math.max(0, input.overhead);
  const unitCost = materialWithWaste + labour + overhead;
  const quantity = Math.max(0, input.quantity);
  const batchCost = unitCost * quantity;
  const wasteAdded = materialWithWaste - baseMaterial;

  return { materialWithWaste, labour, unitCost, batchCost, wasteAdded };
}

export function ManufacturingCostCalculator() {
  const [material, setMaterial] = useState('12');
  const [labourHours, setLabourHours] = useState('0.5');
  const [labourRate, setLabourRate] = useState('25');
  const [overhead, setOverhead] = useState('4');
  const [quantity, setQuantity] = useState('1000');
  const [wastePercent, setWastePercent] = useState('3');

  const result = computeManufacturingCost({
    material: Number(material) || 0,
    labourHours: Number(labourHours) || 0,
    labourRate: Number(labourRate) || 0,
    overhead: Number(overhead) || 0,
    quantity: Number(quantity) || 0,
    wastePercent: Number(wastePercent) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Material cost per unit ($)" value={material} onChange={setMaterial} min={0} step="0.01" />
              <NumberField label="Waste (%)" value={wastePercent} onChange={setWastePercent} min={0} step="0.1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Labour hours per unit" value={labourHours} onChange={setLabourHours} min={0} step="0.1" />
              <NumberField label="Labour rate ($/hour)" value={labourRate} onChange={setLabourRate} min={0} step="0.5" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Overhead per unit ($)" value={overhead} onChange={setOverhead} min={0} step="0.01" />
              <NumberField label="Quantity" value={quantity} onChange={setQuantity} min={0} />
            </div>
          </div>
          <Hint>
            Fully loaded unit cost = material with scrap allowance + direct labour + overhead. Pricing from
            material alone is the classic way margins disappear on a production run.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Cost per unit"
            value={`$${formatMoney(result.unitCost)}`}
            sub={`For a batch of ${quantity} units`}
          />
          <ResultRows>
            <ResultRow label="Total batch cost" value={`$${formatMoney(result.batchCost)}`} />
            <ResultRow label="Material after waste" value={`$${formatMoney(result.materialWithWaste)}`} />
            <ResultRow label="Waste added per unit" value={`$${formatMoney(result.wasteAdded)}`} />
            <ResultRow label="Labour per unit" value={`$${formatMoney(result.labour)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ManufacturingCostCalculator;
