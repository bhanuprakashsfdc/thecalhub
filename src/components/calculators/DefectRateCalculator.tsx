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

export interface DefectRateInput {
  defects: number;
  unitsInspected: number;
  opportunitiesPerUnit: number;
}

export function computeDefectRate(input: DefectRateInput) {
  const units = Math.max(0, input.unitsInspected);
  const defects = Math.max(0, input.defects);
  const defectRate = units > 0 ? (defects / units) * 100 : 0;
  const opportunities = Math.max(0, input.opportunitiesPerUnit);
  const dpmo = units > 0 && opportunities > 0 ? (defects / (units * opportunities)) * 1000000 : 0;
  const yieldPercent = Math.max(0, 100 - defectRate);

  return { defectRate, dpmo, yieldPercent };
}

export function DefectRateCalculator() {
  const [defects, setDefects] = useState('12');
  const [unitsInspected, setUnitsInspected] = useState('1000');
  const [opportunitiesPerUnit, setOpportunitiesPerUnit] = useState('5');

  const result = computeDefectRate({
    defects: Number(defects) || 0,
    unitsInspected: Number(unitsInspected) || 0,
    opportunitiesPerUnit: Number(opportunitiesPerUnit) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Defects found" value={defects} onChange={setDefects} min={0} />
              <NumberField label="Units inspected" value={unitsInspected} onChange={setUnitsInspected} min={0} />
            </div>
            <NumberField
              label="Opportunities per unit"
              value={opportunitiesPerUnit}
              onChange={setOpportunitiesPerUnit}
              min={0}
            />
          </div>
          <Hint>
            Defect rate counts bad units; DPMO counts defect opportunities across every unit, which is the
            measure Six Sigma programmes track over time.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Defect rate"
            value={`${formatMoney(result.defectRate)}%`}
            sub={`${formatMoney(result.dpmo)} defects per million opportunities`}
          />
          <ResultRows>
            <ResultRow label="First-pass yield" value={`${formatMoney(result.yieldPercent)}%`} />
            <ResultRow label="DPMO" value={formatMoney(result.dpmo)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default DefectRateCalculator;
