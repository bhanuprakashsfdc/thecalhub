import { useState } from 'react';
import {
  CalcGrid,
  Panel,
  PanelEyebrow,
  SelectField,
  ResultHero,
  ResultRows,
  ResultRow,
  Hint,
  formatMoney,
} from './kit';

const PLANETS: Record<string, { label: string; dayHours: number }> = {
  mercury: { label: 'Mercury', dayHours: 1407.6 },
  venus: { label: 'Venus', dayHours: 5832.5 },
  earth: { label: 'Earth', dayHours: 24 },
  mars: { label: 'Mars', dayHours: 24.6593 },
  jupiter: { label: 'Jupiter', dayHours: 9.925 },
  saturn: { label: 'Saturn', dayHours: 10.656 },
  uranus: { label: 'Uranus', dayHours: 17.24 },
  neptune: { label: 'Neptune', dayHours: 16.11 },
};

export interface DayLengthInput {
  planet: string;
}

export function computeDayLength(input: DayLengthInput) {
  const planet = PLANETS[input.planet] || PLANETS.mars;
  const hours = planet.dayHours;

  return {
    label: planet.label,
    hours,
    minutes: hours * 60,
    earthDays: hours / 24,
    solsPerDay: hours > 0 ? 24 / hours : 0,
  };
}

export function DayLengthOnOtherPlanetsCalculator() {
  const [planet, setPlanet] = useState('mars');

  const result = computeDayLength({ planet });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <SelectField
              label="Planet"
              value={planet}
              onChange={setPlanet}
              options={Object.entries(PLANETS).map(([value, p]) => ({ value, label: p.label }))}
            />
          </div>
          <Hint>
            A day is one spin. Jupiter turns in under ten hours, while Venus takes longer to rotate than it
            takes to orbit the Sun — and it spins backwards.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Day length"
            value={`${formatMoney(result.hours)} Earth hours`}
            sub={`One rotation of ${result.label}`}
          />
          <ResultRows>
            <ResultRow label="In Earth minutes" value={formatMoney(result.minutes)} />
            <ResultRow label="In Earth days" value={formatMoney(result.earthDays)} />
            <ResultRow label="Sols per Earth day" value={formatMoney(result.solsPerDay)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default DayLengthOnOtherPlanetsCalculator;
