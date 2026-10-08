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

export interface GrowthDegreeDaysInput {
  tmax: number;
  tmin: number;
  baseTemp: number;
  targetGdd: number;
}

export function computeGrowthDegreeDays(input: GrowthDegreeDaysInput) {
  const tmax = input.tmax;
  const tmin = input.tmin;
  const base = input.baseTemp;
  const target = Math.max(0, input.targetGdd);

  const mean = (tmax + tmin) / 2;
  const gdd = Math.max(0, mean - base);
  const days = gdd > 0 ? target / gdd : 0;

  return { mean, gdd, days, target };
}

export function GrowthDegreeDaysCalculator() {
  const [tmax, setTmax] = useState('28');
  const [tmin, setTmin] = useState('18');
  const [baseTemp, setBaseTemp] = useState('10');
  const [targetGdd, setTargetGdd] = useState('1300');

  const result = computeGrowthDegreeDays({
    tmax: Number(tmax) || 0,
    tmin: Number(tmin) || 0,
    baseTemp: Number(baseTemp) || 0,
    targetGdd: Number(targetGdd) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="High temperature (°C)" value={tmax} onChange={setTmax} />
              <NumberField label="Low temperature (°C)" value={tmin} onChange={setTmin} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Base temperature (°C)" value={baseTemp} onChange={setBaseTemp} step="0.5" />
              <NumberField label="Target degree days" value={targetGdd} onChange={setTargetGdd} min={0} />
            </div>
          </div>
          <Hint>
            The simple single-triangle method is (daily high + daily low) ÷ 2 minus the crop base temperature.
            Corn uses a 10 °C base and needs roughly 1,250–1,350 degree days to mature.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Growing degree days"
            value={`${formatMoney(result.gdd, 1)} °C·day`}
            sub={`${formatMoney(result.days, 0)} days to reach the target`}
          />
          <ResultRows>
            <ResultRow label="Mean temperature" value={`${formatMoney(result.mean, 1)} °C`} />
            <ResultRow label="Days to target" value={formatMoney(result.days, 0)} />
            <ResultRow label="Heat above base" value={`${formatMoney(result.gdd, 1)} °C·day`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default GrowthDegreeDaysCalculator;
