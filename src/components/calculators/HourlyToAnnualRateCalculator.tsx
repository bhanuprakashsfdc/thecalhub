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

export interface HourlyInput {
  hourlyRate: number;
  hoursPerWeek: number;
  weeksPerYear: number;
}

export function computeHourlyToAnnual(input: HourlyInput) {
  const weeklyEarnings = input.hourlyRate * input.hoursPerWeek;
  const annualEarnings = weeklyEarnings * input.weeksPerYear;
  const monthlyEarnings = annualEarnings / 12;
  return { weeklyEarnings, annualEarnings, monthlyEarnings };
}

export function HourlyToAnnualRateCalculator() {
  const [hourlyRate, setHourlyRate] = useState('25');
  const [hoursPerWeek, setHoursPerWeek] = useState('40');
  const [weeksPerYear, setWeeksPerYear] = useState('52');

  const result = computeHourlyToAnnual({
    hourlyRate: Number(hourlyRate) || 0,
    hoursPerWeek: Number(hoursPerWeek) || 0,
    weeksPerYear: Number(weeksPerYear) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField
              label="Hourly Rate ($/hr)"
              value={hourlyRate}
              onChange={setHourlyRate}
              min={0}
              step="0.5"
              hint="Your pre-tax pay for every hour worked."
            />
            <NumberField
              label="Hours per Week"
              value={hoursPerWeek}
              onChange={setHoursPerWeek}
              min={0}
              max={168}
              step="0.5"
              hint="Regular working hours each week."
            />
            <NumberField
              label="Weeks per Year"
              value={weeksPerYear}
              onChange={setWeeksPerYear}
              min={0}
              max={52}
              step="1"
              hint="Use 52 for year-round work, fewer if you take unpaid leave."
            />
          </div>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Annual Earnings"
value={`$${formatMoney(result.annualEarnings)}/yr`}
              sub={`${formatMoney(result.weeklyEarnings)} per week`}
            />
            <ResultRows>
              <ResultRow label="Weekly Earnings" value={`$${formatMoney(result.weeklyEarnings)}/wk`} />
              <ResultRow label="Monthly Earnings" value={`$${formatMoney(result.monthlyEarnings)}/mo`} />
              <ResultRow label="Annual Earnings" value={`$${formatMoney(result.annualEarnings)}`} />
              <ResultRow label="Hourly Rate" value={`$${formatMoney(Number(hourlyRate))}/hr`} />
          </ResultRows>
          <Hint>
            Annual earnings equal the hourly rate multiplied by weekly hours and the
            number of working weeks. Monthly earnings are the annual total divided by 12.
          </Hint>
        </Panel>
      }
    />
  );
}

export default HourlyToAnnualRateCalculator;