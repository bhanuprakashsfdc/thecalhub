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

export interface ProductionRateInput {
  unitsProduced: number;
  hoursWorked: number;
  downtimeHours: number;
}

export function computeProductionRate(input: ProductionRateInput) {
  const hours = Math.max(0, input.hoursWorked);
  const downtime = Math.min(Math.max(0, input.downtimeHours), hours);
  const netHours = hours - downtime;
  const units = Math.max(0, input.unitsProduced);
  const unitsPerHour = netHours > 0 ? units / netHours : 0;
  const unitsPerShift = unitsPerHour * 8;
  const unitsPerDay = unitsPerHour * hours;

  return { netHours, unitsPerHour, unitsPerShift, unitsPerDay };
}

export function ProductionRateCalculator() {
  const [unitsProduced, setUnitsProduced] = useState('1200');
  const [hoursWorked, setHoursWorked] = useState('10');
  const [downtimeHours, setDowntimeHours] = useState('2');

  const result = computeProductionRate({
    unitsProduced: Number(unitsProduced) || 0,
    hoursWorked: Number(hoursWorked) || 0,
    downtimeHours: Number(downtimeHours) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Units produced" value={unitsProduced} onChange={setUnitsProduced} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Hours worked" value={hoursWorked} onChange={setHoursWorked} min={0} />
              <NumberField label="Downtime (hours)" value={downtimeHours} onChange={setDowntimeHours} min={0} />
            </div>
          </div>
          <Hint>
            Rate should be measured against net run time, not the shift length — including breakdowns understates
            the line’s real speed and hides changeover losses.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Units per hour"
            value={formatMoney(result.unitsPerHour)}
            sub={`${formatMoney(result.netHours)} net run hours`}
          />
          <ResultRows>
            <ResultRow label="Units per 8-hour shift" value={formatMoney(result.unitsPerShift)} />
            <ResultRow label="Units per working day" value={formatMoney(result.unitsPerDay)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ProductionRateCalculator;
