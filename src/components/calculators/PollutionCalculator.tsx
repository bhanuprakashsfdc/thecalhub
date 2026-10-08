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

export interface PollutionInput {
  hours: number;
  factor: number;
  days: number;
  efficiency: number;
}

export function computePollution(input: PollutionInput) {
  const days = Math.max(0, input.days);
  const gross = input.hours * input.factor * days;
  const control = Math.min(100, Math.max(0, input.efficiency)) / 100;
  const controlled = gross * (1 - control);
  const avoided = gross - controlled;
  const perDay = days > 0 ? controlled / days : 0;
  return { gross, controlled, avoided, perDay };
}

export function PollutionCalculator() {
  const [hours, setHours] = useState('8');
  const [factor, setFactor] = useState('2.5');
  const [days, setDays] = useState('30');
  const [efficiency, setEfficiency] = useState('60');

  const result = computePollution({
    hours: Number(hours) || 0,
    factor: Number(factor) || 0,
    days: Number(days) || 0,
    efficiency: Number(efficiency) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Operating hours per day" value={hours} onChange={setHours} min={0} step="0.5" />
              <NumberField
                label="Emission factor (kg/hour)"
                value={factor}
                onChange={setFactor}
                min={0}
                step="0.1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Days of operation" value={days} onChange={setDays} min={0} />
              <NumberField
                label="Control efficiency (%)"
                value={efficiency}
                onChange={setEfficiency}
                min={0}
                max={100}
              />
            </div>
          </div>
          <Hint>
            Control efficiency is the share of pollutants captured by scrubbers, filters or catalytic converters
            before the exhaust leaves the stack.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Net pollutant released"
            value={`${formatMoney(result.controlled)} kg`}
            sub={`${formatMoney(result.perDay)} kg per day after controls`
            }
          />
          <ResultRows>
            <ResultRow label="Gross emissions (kg)" value={formatMoney(result.gross)} />
            <ResultRow label="Captured by controls (kg)" value={formatMoney(result.avoided)} />
            <ResultRow label="Daily average (kg)" value={formatMoney(result.perDay)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default PollutionCalculator;
