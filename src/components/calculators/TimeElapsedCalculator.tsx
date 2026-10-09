import { useState, useMemo } from 'react';
import {
  CalcGrid,
  Panel,
  PanelEyebrow,
  ResultHero,
  ResultRows,
  ResultRow,
  Hint,
  formatMoney,
} from './kit';

export interface TimeElapsedInput {
  start: string;
  end: string;
}

export function computeTimeElapsed(input: TimeElapsedInput) {
  const startDate = new Date(input.start);
  const endDate = new Date(input.end);
  const diffMs = endDate.getTime() - startDate.getTime();
  const totalSeconds = Math.max(0, Math.floor((Number.isFinite(diffMs) ? diffMs : 0) / 1000));
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;
  const minutes = totalMinutes % 60;
  const seconds = totalSeconds % 60;
  return { totalSeconds, totalMinutes, totalHours, days, hours, minutes, seconds };
}

export function TimeElapsedCalculator() {
  const [start, setStart] = useState('2026-01-01T00:00');
  const [end, setEnd] = useState('2026-10-09T09:17');

  const result = useMemo(
    () =>
      computeTimeElapsed({
        start,
        end,
      }),
    [start, end]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="block">
              <span className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Start</span>
              <input
                aria-label="Start"
                type="datetime-local"
                className="w-full bg-surface-container-highest border border-white/5 rounded-lg p-4 text-white font-mono text-lg outline-none focus:border-primary-fixed/50"
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
            </div>
            <div className="block">
              <span className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">End</span>
              <input
                aria-label="End"
                type="datetime-local"
                className="w-full bg-surface-container-highest border border-white/5 rounded-lg p-4 text-white font-mono text-lg outline-none focus:border-primary-fixed/50"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
              />
            </div>
          </div>
          <Hint>
            Compute elapsed wall-clock time between two timestamps. The result is broken into
            days, hours, minutes and seconds for easy reading.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Time elapsed"
            value={`${result.days}d ${result.hours}h ${result.minutes}m ${result.seconds}s`}
          />
          <ResultRows>
            <ResultRow label="Days" value={`${result.days}`} />
            <ResultRow label="Hours" value={`${result.hours}`} />
            <ResultRow label="Minutes" value={`${result.minutes}`} />
            <ResultRow label="Total hours" value={formatMoney(result.totalHours)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default TimeElapsedCalculator;