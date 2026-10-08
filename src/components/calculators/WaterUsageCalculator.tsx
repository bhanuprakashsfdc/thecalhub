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

export interface WaterUsageInput {
  showerMinutes: number;
  showerFlow: number;
  flushes: number;
  litresPerFlush: number;
  laundryLoads: number;
  litresPerLoad: number;
}

export function computeWaterUsage(input: WaterUsageInput) {
  const shower = input.showerMinutes * input.showerFlow;
  const toilet = input.flushes * input.litresPerFlush;
  const laundryWeekly = input.laundryLoads * input.litresPerLoad;
  const laundry = laundryWeekly / 7;
  const daily = shower + toilet + laundry;
  const monthly = daily * 30;
  const annual = daily * 365;
  return { shower, toilet, laundry, daily, monthly, annual };
}

export function WaterUsageCalculator() {
  const [showerMinutes, setShowerMinutes] = useState('8');
  const [showerFlow, setShowerFlow] = useState('9');
  const [flushes, setFlushes] = useState('6');
  const [litresPerFlush, setLitresPerFlush] = useState('6');
  const [laundryLoads, setLaundryLoads] = useState('4');
  const [litresPerLoad, setLitresPerLoad] = useState('50');

  const result = computeWaterUsage({
    showerMinutes: Number(showerMinutes) || 0,
    showerFlow: Number(showerFlow) || 0,
    flushes: Number(flushes) || 0,
    litresPerFlush: Number(litresPerFlush) || 0,
    laundryLoads: Number(laundryLoads) || 0,
    litresPerLoad: Number(litresPerLoad) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField
                label="Shower minutes per day"
                value={showerMinutes}
                onChange={setShowerMinutes}
                min={0}
              />
              <NumberField
                label="Shower flow (L/min)"
                value={showerFlow}
                onChange={setShowerFlow}
                min={0}
                step="0.5"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Toilet flushes per day" value={flushes} onChange={setFlushes} min={0} />
              <NumberField
                label="Litres per flush"
                value={litresPerFlush}
                onChange={setLitresPerFlush}
                min={0}
                step="0.5"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField
                label="Laundry loads per week"
                value={laundryLoads}
                onChange={setLaundryLoads}
                min={0}
              />
              <NumberField
                label="Litres per load"
                value={litresPerLoad}
                onChange={setLitresPerLoad}
                min={0}
              />
            </div>
          </div>
          <Hint>
            Household water use is dominated by showers, toilets and laundry; low-flow fixtures typically cut
            indoor consumption by 20–30 %.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Daily water use"
            value={`${formatMoney(result.daily)} L`}
            sub={`${formatMoney(result.annual)} litres per year`
            }
          />
          <ResultRows>
            <ResultRow label="Shower (L/day)" value={formatMoney(result.shower)} />
            <ResultRow label="Toilet (L/day)" value={formatMoney(result.toilet)} />
            <ResultRow label="Laundry (L/day)" value={formatMoney(result.laundry)} />
            <ResultRow label="Monthly (L)" value={formatMoney(result.monthly)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default WaterUsageCalculator;
