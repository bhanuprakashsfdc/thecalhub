import { useState, useMemo } from 'react';
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

export interface HVACInput {
  volume: number;
  tempDiff: number;
  airChanges: number;
  efficiency: number;
}

export function computeHVAC(input: HVACInput) {
  const cfm = input.volume * input.airChanges;
  const btuPerHour = input.volume * input.tempDiff * 1.2 * input.airChanges;
  const tons = btuPerHour / 12000;
  const kw = btuPerHour * 0.00029307107;
  return { cfm, btuPerHour, tons, kw };
}

export function HVACCalculator() {
  const [volume, setVolume] = useState('200');
  const [tempDiff, setTempDiff] = useState('10');
  const [airChanges, setAirChanges] = useState('10');
  const [efficiency, setEfficiency] = useState('0.85');

  const result = useMemo(
    () =>
      computeHVAC({
        volume: Number(volume) || 0,
        tempDiff: Number(tempDiff) || 0,
        airChanges: Number(airChanges) || 0,
        efficiency: Number(efficiency) || 0,
      }),
    [volume, tempDiff, airChanges, efficiency]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Room volume (m³)" value={volume} onChange={setVolume} min={0} step="10" />
            <NumberField label="Temperature difference (°C)" value={tempDiff} onChange={setTempDiff} min={0} step="1" />
            <NumberField label="Air changes per hour" value={airChanges} onChange={setAirChanges} min={0} step="1" />
            <NumberField label="System efficiency" value={efficiency} onChange={setEfficiency} min={0} max={1} step="0.01" />
          </div>
          <Hint>
            HVAC load is roughly proportional to volume, temperature lift and air change rate. The
            result is given in BTU/h, tons of refrigeration and kW for easy comparison with equipment
            nameplates.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Cooling load"
            value={`${formatMoney(result.btuPerHour)} BTU/h`}
            sub={`${formatMoney(result.tons)} tons`}
          />
          <ResultRows>
            <ResultRow label="Tons of refrigeration" value={formatMoney(result.tons)} />
            <ResultRow label="Power draw" value={`${formatMoney(result.kw)} kW`} />
            <ResultRow label="Airflow required" value={`${formatMoney(result.cfm)} m³/h`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default HVACCalculator;