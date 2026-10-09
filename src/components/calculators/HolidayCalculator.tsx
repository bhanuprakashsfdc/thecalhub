import { useState } from 'react';
import {
  CalcGrid,
  Panel,
  PanelEyebrow,
  TextField,
  ResultHero,
  ResultRows,
  ResultRow,
  Hint,
  formatMoney,
} from './kit';

export interface HolidayInput {
  startDate: string;
  holidayDate: string;
}

function parseDate(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

export function computeHoliday(input: HolidayInput) {
  const start = parseDate(input.startDate);
  const holiday = parseDate(input.holidayDate);
  if (!start || !holiday) {
    return { days: 0, weeks: 0, startDay: '—', holidayDay: '—' };
  }
  const days = Math.round((holiday.getTime() - start.getTime()) / 86400000);
  const weeks = days / 7;
  const weekday = (d: Date) =>
    d.toLocaleDateString('en-US', { weekday: 'long' });
  return { days, weeks, startDay: weekday(start), holidayDay: weekday(holiday) };
}

export function HolidayCalculator() {
  const [startDate, setStartDate] = useState('2026-10-09');
  const [holidayDate, setHolidayDate] = useState('2026-12-25');

  const result = computeHoliday({ startDate, holidayDate });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <TextField
              label="Start date"
              type="date"
              value={startDate}
              onChange={setStartDate}
            />
            <TextField
              label="Holiday date"
              type="date"
              value={holidayDate}
              onChange={setHolidayDate}
            />
          </div>
          <Hint>
            Counts whole days between two dates. Negative
            results mean the holiday has already passed.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Days until holiday"
            value={String(result.days)}
            sub="Calendar days"
          />
          <ResultRows>
            <ResultRow label="Weeks until holiday" value={formatMoney(result.weeks)} />
            <ResultRow label="Start day of week" value={result.startDay} />
            <ResultRow label="Holiday day of week" value={result.holidayDay} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default HolidayCalculator;
