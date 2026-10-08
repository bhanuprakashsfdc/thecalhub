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

export interface StormWaterInput {
  coefficient: number;
  intensity: number;
  area: number;
}

export function computeStormWater(input: StormWaterInput) {
  const peak = (input.coefficient * input.intensity * input.area) / 360;
  const litresPerSecond = peak * 1000;
  const cubicMetresPerHour = peak * 3600;
  const effectiveIntensity = input.coefficient * input.intensity;
  return { peak, litresPerSecond, cubicMetresPerHour, effectiveIntensity };
}

export function StormWaterCalculator() {
  const [coefficient, setCoefficient] = useState('0.6');
  const [intensity, setIntensity] = useState('50');
  const [area, setArea] = useState('4');

  const result = computeStormWater({
    coefficient: Number(coefficient) || 0,
    intensity: Number(intensity) || 0,
    area: Number(area) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField
              label="Runoff coefficient C"
              value={coefficient}
              onChange={setCoefficient}
              min={0}
              max={1}
              step="0.05"
            />
            <div className="grid grid-cols-2 gap-4">
              <NumberField
                label="Rainfall intensity (mm/hr)"
                value={intensity}
                onChange={setIntensity}
                min={0}
              />
              <NumberField label="Catchment area (ha)" value={area} onChange={setArea} min={0} step="0.1" />
            </div>
          </div>
          <Hint>
            The rational method Q = CiA/360 gives peak discharge in m³/s with intensity in mm/hr and area in
            hectares — valid for catchments under about 80 ha.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Peak runoff"
            value={`${formatMoney(result.peak)} m³/s`}
            sub="Rational method peak discharge"
          />
          <ResultRows>
            <ResultRow label="Flow rate (L/s)" value={formatMoney(result.litresPerSecond)} />
            <ResultRow label="Volume per hour (m³)" value={formatMoney(result.cubicMetresPerHour)} />
            <ResultRow label="Effective intensity (mm/hr)" value={formatMoney(result.effectiveIntensity)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default StormWaterCalculator;
