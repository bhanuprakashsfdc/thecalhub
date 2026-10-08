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

export interface SugarIntakeInput {
  dailyCalories: number;
  sugarEaten: number;
}

export function computeSugarIntake(input: SugarIntakeInput) {
  const calories = Math.max(0, input.dailyCalories);
  const eaten = Math.max(0, input.sugarEaten);

  const limit = (calories * 10) / 100 / 4;
  const overBy = eaten - limit;
  const teaspoons = eaten / 4;
  const percent = limit > 0 ? (eaten / limit) * 100 : 0;

  return { limit, overBy, teaspoons, percent, eaten };
}

export function SugarIntakeCalculator() {
  const [dailyCalories, setDailyCalories] = useState('2000');
  const [sugarEaten, setSugarEaten] = useState('60');

  const result = computeSugarIntake({
    dailyCalories: Number(dailyCalories) || 0,
    sugarEaten: Number(sugarEaten) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Daily calories" value={dailyCalories} onChange={setDailyCalories} min={0} />
            <NumberField label="Added sugar eaten (g)" value={sugarEaten} onChange={setSugarEaten} min={0} step="0.5" />
          </div>
          <Hint>
            The WHO advises keeping added sugars under 10 % of daily energy — 50 g on a 2,000 calorie diet, or
            about 12 teaspoons. One teaspoon of sugar weighs roughly 4 g.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Added sugar limit"
            value={`${formatMoney(result.limit)} g`}
            sub={`${formatMoney(result.percent, 0)}% of the limit used`}
          />
          <ResultRows>
            <ResultRow label="Sugar eaten" value={`${formatMoney(result.eaten)} g`} />
            <ResultRow
              label="Over / under"
              value={`${result.overBy >= 0 ? '+' : '-'}${formatMoney(Math.abs(result.overBy))} g`}
            />
            <ResultRow label="Teaspoons eaten" value={formatMoney(result.teaspoons, 1)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default SugarIntakeCalculator;
