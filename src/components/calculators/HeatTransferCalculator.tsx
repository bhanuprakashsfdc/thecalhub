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

export interface HeatTransferInput {
  overallCoefficient: number;
  area: number;
  deltaT: number;
}

export function computeHeatTransfer(input: HeatTransferInput) {
  const rate = input.overallCoefficient * input.area * input.deltaT;
  const flux = input.overallCoefficient * input.deltaT;
  const perHour = rate * 3.6;
  const conductance = input.overallCoefficient * input.area;
  return { rate, flux, perHour, conductance };
}

export function HeatTransferCalculator() {
  const [overallCoefficient, setOverallCoefficient] = useState('15');
  const [area, setArea] = useState('10');
  const [deltaT, setDeltaT] = useState('30');

  const result = computeHeatTransfer({
    overallCoefficient: Number(overallCoefficient) || 0,
    area: Number(area) || 0,
    deltaT: Number(deltaT) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField
              label="Overall heat transfer U (W/m²·K)"
              value={overallCoefficient}
              onChange={setOverallCoefficient}
              min={0}
              step="0.5"
            />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Surface area (m²)" value={area} onChange={setArea} min={0} step="0.5" />
              <NumberField label="Temperature difference (K)" value={deltaT} onChange={setDeltaT} min={0} />
            </div>
          </div>
          <Hint>
            Q = U·A·ΔT describes steady convection plus conduction through a wall or exchanger — raising either
            area or temperature difference scales the transfer linearly.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Heat transfer rate"
            value={`${formatMoney(result.rate)} W`}
            sub={`${formatMoney(result.perHour)} kJ per hour`
            }
          />
          <ResultRows>
            <ResultRow label="Heat flux (W/m²)" value={formatMoney(result.flux)} />
            <ResultRow label="Per hour (kJ/hr)" value={formatMoney(result.perHour)} />
            <ResultRow label="UA conductance (W/K)" value={formatMoney(result.conductance)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default HeatTransferCalculator;
