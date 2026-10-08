import { useState } from 'react';
import {
  CalcGrid,
  Panel,
  PanelEyebrow,
  NumberField,
  SelectField,
  ResultHero,
  ResultRows,
  ResultRow,
  Hint,
  formatMoney,
} from './kit';

export interface IVFlowInput {
  volume: number;
  time: number;
  unit: string;
}

export function computeIVFlowRate(input: IVFlowInput) {
  const minutes = input.unit === 'minutes' ? input.time : input.time * 60;
  const mLPerHour = minutes > 0 ? (input.volume / minutes) * 60 : 0;
  const mLPerMinute = minutes > 0 ? input.volume / minutes : 0;
  const secondsPerMl = input.volume > 0 ? minutes / input.volume : 0;
  return { minutes, mLPerHour, mLPerMinute, secondsPerMl };
}

export function IVFlowRateCalculator() {
  const [volume, setVolume] = useState('500');
  const [time, setTime] = useState('2');
  const [unit, setUnit] = useState('hours');

  const result = computeIVFlowRate({
    volume: Number(volume) || 0,
    time: Number(time) || 0,
    unit,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Volume (mL)" value={volume} onChange={setVolume} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Infusion time" value={time} onChange={setTime} min={0} step="0.5" />
              <SelectField
                label="Time unit"
                value={unit}
                onChange={setUnit}
                options={[
                  { value: 'hours', label: 'Hours' },
                  { value: 'minutes', label: 'Minutes' },
                ]}
              />
            </div>
          </div>
          <Hint>
            Pump rates are usually entered in mL/hour, while manual counting uses drops per minute — keep the
            units straight when transferring a prescription to the pump.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Flow rate"
            value={`${formatMoney(result.mLPerHour)} mL/hr`}
            sub={`${formatMoney(result.mLPerMinute)} mL/min`
            }
          />
          <ResultRows>
            <ResultRow label="Total infusion minutes" value={formatMoney(result.minutes)} />
            <ResultRow label="mL per minute" value={formatMoney(result.mLPerMinute)} />
            <ResultRow label="Seconds per mL" value={formatMoney(result.secondsPerMl)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default IVFlowRateCalculator;
