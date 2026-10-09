import { useState, useMemo } from 'react';
import {
  CalcGrid,
  Panel,
  PanelEyebrow,
  NumberField,
  ResultHero,
  Hint,
} from './kit';

export interface PastDateInput {
  startDate: string;
  daysBack: number;
}

export function computePastDate(input: PastDateInput) {
  const start = new Date(input.startDate);
  const past = new Date(start);
  past.setDate(past.getDate() - input.daysBack);
  return { past: past.toISOString().slice(0, 10) };
}

export function PastDateCalculator() {
  const [startDate, setStartDate] = useState('2026-10-09');
  const [daysBack, setDaysBack] = useState('30');

  const result = useMemo(
    () =>
      computePastDate({
        startDate,
        daysBack: Number(daysBack) || 0,
      }),
    [startDate, daysBack]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="block">
              <span className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Start date</span>
              <input
                aria-label="Start date"
                type="date"
                className="w-full bg-surface-container-highest border border-white/5 rounded-lg p-4 text-white font-mono text-lg outline-none focus:border-primary-fixed/50"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <NumberField label="Days back" value={daysBack} onChange={setDaysBack} min={0} step="1" />
          </div>
          <Hint>
            Subtract days from a start date to find a past date. Useful for record searches,
            warranty start dates, or counting elapsed time.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Past date"
            value={result.past}
          />
        </Panel>
      }
    />
  );
}

export default PastDateCalculator;