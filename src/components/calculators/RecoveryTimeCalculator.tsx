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

export interface RecoveryTimeInput {
  durationMinutes: number;
  rpe: number;
  sleepHours: number;
}

export function computeRecoveryTime(input: RecoveryTimeInput) {
  const hours = Math.max(0, input.durationMinutes) / 60;
  const intensityFactor = Math.max(0, input.rpe) / 5;
  const sleep = Math.max(0, input.sleepHours);
  const sleepFactor = sleep >= 8 ? 0.9 : sleep >= 7 ? 1 : sleep >= 6 ? 1.15 : 1.3;
  const recoveryHours = hours * intensityFactor * sleepFactor;
  const recoveryMinutes = recoveryHours * 60;

  return { hours, intensityFactor, sleepFactor, recoveryHours, recoveryMinutes };
}

export function RecoveryTimeCalculator() {
  const [durationMinutes, setDurationMinutes] = useState('60');
  const [rpe, setRpe] = useState('7');
  const [sleepHours, setSleepHours] = useState('7');

  const result = computeRecoveryTime({
    durationMinutes: Number(durationMinutes) || 0,
    rpe: Number(rpe) || 0,
    sleepHours: Number(sleepHours) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Workout duration (minutes)" value={durationMinutes} onChange={setDurationMinutes} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Perceived intensity (RPE)" value={rpe} onChange={setRpe} min={1} max={10} />
              <NumberField label="Sleep last night (hours)" value={sleepHours} onChange={setSleepHours} min={0} max={24} step="0.5" />
            </div>
          </div>
          <Hint>
            Harder sessions and poor sleep both extend recovery. Treat the estimate as a floor — add a easy day
            if you are still sore or your resting heart rate is elevated.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Recovery time"
            value={`${formatMoney(result.recoveryHours)} hours`}
            sub={`Sleep adjustment factor of ${formatMoney(result.sleepFactor)}`}
          />
          <ResultRows>
            <ResultRow label="Recovery minutes" value={formatMoney(result.recoveryMinutes)} />
            <ResultRow label="Intensity multiplier" value={formatMoney(result.intensityFactor)} />
            <ResultRow label="Session length in hours" value={formatMoney(result.hours)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default RecoveryTimeCalculator;
