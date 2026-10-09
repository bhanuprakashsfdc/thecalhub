import { useState } from 'react';
import {
  CalcGrid,
  Panel,
  PanelEyebrow,
  TextField,
  NumberField,
  ResultHero,
  ResultRows,
  ResultRow,
  Hint,
  formatMoney,
} from './kit';

export interface FutureDateInput {
  startDate: string;
  daysToAdd: number;
}

function parseDate(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

function formatDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function computeFutureDate(input: FutureDateInput) {
  const start = parseDate(input.startDate);
  if (!start) {
    return { futureDate: '—', dayOfWeek: '—', weeksAdded: 0, daysRemainingInYear: 0 };
  }
  const future = new Date(start);
  future.setDate(future.getDate() + input.daysToAdd);
  const dayOfWeek = future.toLocaleDateString('en-US', { weekday: 'long' });
  const weeksAdded = input.daysToAdd / 7;
  const endOfYear = new Date(future.getFullYear(), 11, 31);
  const daysRemainingInYear = Math.round(
    (endOfYear.getTime() - future.getTime()) / 86400000
  );
  return {
    futureDate: formatDate(future),
    dayOfWeek,
    weeksAdded,
    daysRemainingInYear,
  };
}

export function FutureDateCalculator() {
  const [startDate, setStartDate] = useState('2026-10-09');
  const [daysToAdd, setDaysToAdd] = useState('45');

  const result = computeFutureDate({
    startDate,
    daysToAdd: Number(daysToAdd) || 0,
  });

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
            <NumberField label="Days to add" value={daysToAdd} onChange={setDaysToAdd} step="1" />
          </div>
          <Hint>
            Adds a number of days (positive or negative) to a
            start date and reports the resulting weekday.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero label="Future date" value={result.futureDate} sub="Start + days" />
          <ResultRows>
            <ResultRow label="Day of week" value={result.dayOfWeek} />
            <ResultRow label="Weeks added" value={formatMoney(result.weeksAdded)} />
            <ResultRow label="Days remaining in year" value={String(result.daysRemainingInYear)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default FutureDateCalculator;
