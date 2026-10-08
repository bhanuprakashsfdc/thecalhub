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

export interface ExerciseProgressionInput {
  currentOneRepMax: number;
  weeklyPercent: number;
  weeks: number;
}

export function computeExerciseProgression(input: ExerciseProgressionInput) {
  const current = Math.max(0, input.currentOneRepMax);
  const rate = Math.max(0, input.weeklyPercent) / 100;
  const weeks = Math.max(0, Math.floor(input.weeks));
  const projected = current * Math.pow(1 + rate, weeks);
  const weekOne = current * (1 + rate);
  const gain = projected - current;

  return { projected, weekOne, gain, weeks };
}

export function ExerciseProgressionCalculator() {
  const [currentOneRepMax, setCurrentOneRepMax] = useState('100');
  const [weeklyPercent, setWeeklyPercent] = useState('2');
  const [weeks, setWeeks] = useState('8');

  const result = computeExerciseProgression({
    currentOneRepMax: Number(currentOneRepMax) || 0,
    weeklyPercent: Number(weeklyPercent) || 0,
    weeks: Number(weeks) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Current 1RM (kg)" value={currentOneRepMax} onChange={setCurrentOneRepMax} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Weekly progression (%)" value={weeklyPercent} onChange={setWeeklyPercent} min={0} step="0.1" />
              <NumberField label="Weeks" value={weeks} onChange={setWeeks} min={1} />
            </div>
          </div>
          <Hint>
            Sustainable strength gains run 1–2% per week on a lift you train often, and slower on a lift you
            train twice a week — compounding beats occasional max attempts.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Projected 1RM"
            value={`${formatMoney(result.projected)} kg`}
            sub={`After ${weeks} week(s) of progression`}
          />
          <ResultRows>
            <ResultRow label="Week 1 target" value={`${formatMoney(result.weekOne)} kg`} />
            <ResultRow label="Total gain" value={`${formatMoney(result.gain)} kg`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ExerciseProgressionCalculator;
