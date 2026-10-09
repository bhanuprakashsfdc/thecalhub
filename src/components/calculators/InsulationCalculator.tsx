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

export interface InsulationInput {
  areaM2: number;
  temperatureDiffC: number;
  rValue: number;
}

export function computeInsulation(input: InsulationInput) {
  const r = Math.max(0.001, input.rValue);
  const heatLoss = (input.areaM2 * input.temperatureDiffC) / r;
  const uValue = 1 / r;
  const dailyKwh = (heatLoss * 24) / 1000;
  const heatFlux = input.areaM2 > 0 ? heatLoss / input.areaM2 : 0;
  return { heatLoss, uValue, dailyKwh, heatFlux };
}

export function InsulationCalculator() {
  const [areaM2, setAreaM2] = useState('150');
  const [temperatureDiffC, setTemperatureDiffC] = useState('25');
  const [rValue, setRValue] = useState('3.5');

  const result = computeInsulation({
    areaM2: Number(areaM2) || 0,
    temperatureDiffC: Number(temperatureDiffC) || 0,
    rValue: Number(rValue) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Wall area (m²)" value={areaM2} onChange={setAreaM2} min={0} />
            <NumberField label="Temperature difference (°C)" value={temperatureDiffC} onChange={setTemperatureDiffC} min={0} step="0.5" />
            <NumberField label="R-value (m²·K/W)" value={rValue} onChange={setRValue} min={0} step="0.1" />
          </div>
          <Hint>
            Heat loss (W) = area × ΔT ÷ R-value. Higher R-value means
            better insulation; U-value is its reciprocal.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Heat loss"
            value={`${formatMoney(result.heatLoss)} W`}
            sub="Steady-state loss"
          />
          <ResultRows>
            <ResultRow label="U-value (W/m²·K)" value={formatMoney(result.uValue)} />
            <ResultRow label="Daily energy loss (kWh)" value={formatMoney(result.dailyKwh)} />
            <ResultRow label="Heat flux (W/m²)" value={formatMoney(result.heatFlux)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default InsulationCalculator;
