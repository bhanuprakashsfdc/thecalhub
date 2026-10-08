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

export interface QualityControlInput {
  unitsProduced: number;
  unitsInspected: number;
  unitsRejected: number;
  costPerRejected: number;
}

export function computeQualityControl(input: QualityControlInput) {
  const inspected = Math.max(0, input.unitsInspected);
  const rejected = Math.max(0, input.unitsRejected);
  const produced = Math.max(0, input.unitsProduced);
  const yieldPercent = inspected > 0 ? ((inspected - Math.min(rejected, inspected)) / inspected) * 100 : 0;
  const rejectRate = inspected > 0 ? (rejected / inspected) * 100 : 0;
  const qualityCost = rejected * Math.max(0, input.costPerRejected);
  const producedYield = produced > 0 ? ((produced - Math.min(rejected, produced)) / produced) * 100 : 0;

  return { yieldPercent, rejectRate, qualityCost, producedYield };
}

export function QualityControlCalculator() {
  const [unitsProduced, setUnitsProduced] = useState('5000');
  const [unitsInspected, setUnitsInspected] = useState('5000');
  const [unitsRejected, setUnitsRejected] = useState('40');
  const [costPerRejected, setCostPerRejected] = useState('12');

  const result = computeQualityControl({
    unitsProduced: Number(unitsProduced) || 0,
    unitsInspected: Number(unitsInspected) || 0,
    unitsRejected: Number(unitsRejected) || 0,
    costPerRejected: Number(costPerRejected) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Units produced" value={unitsProduced} onChange={setUnitsProduced} min={0} />
              <NumberField label="Units inspected" value={unitsInspected} onChange={setUnitsInspected} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Units rejected" value={unitsRejected} onChange={setUnitsRejected} min={0} />
              <NumberField label="Cost per rejected unit ($)" value={costPerRejected} onChange={setCostPerRejected} min={0} />
            </div>
          </div>
          <Hint>
            First-pass yield measures units accepted without rework. Rejected units cost scrap plus inspection
            time, so the reject count is a direct profit leak.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="First-pass yield"
            value={`${formatMoney(result.yieldPercent)}%`}
            sub={`Reject rate of ${formatMoney(result.rejectRate)}%`}
          />
          <ResultRows>
            <ResultRow label="Yield vs units produced" value={`${formatMoney(result.producedYield)}%`} />
            <ResultRow label="Cost of rejects" value={`$${formatMoney(result.qualityCost)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default QualityControlCalculator;
