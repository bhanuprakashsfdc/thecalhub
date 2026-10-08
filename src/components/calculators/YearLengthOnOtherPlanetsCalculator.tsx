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

const PLANETS: Record<string, { label: string; yearDays: number }> = {
  mercury: { label: 'Mercury', yearDays: 87.969 },
  venus: { label: 'Venus', yearDays: 224.701 },
  earth: { label: 'Earth', yearDays: 365.256 },
  mars: { label: 'Mars', yearDays: 686.98 },
  jupiter: { label: 'Jupiter', yearDays: 4332.59 },
  saturn: { label: 'Saturn', yearDays: 10759.22 },
  uranus: { label: 'Uranus', yearDays: 30688.5 },
  neptune: { label: 'Neptune', yearDays: 60182 },
};

export interface YearLengthInput {
  planet: string;
}

export function computeYearLength(input: YearLengthInput) {
  const planet = PLANETS[input.planet] || PLANETS.mars;
  const days = planet.yearDays;

  return {
    label: planet.label,
    days,
    hours: days * 24,
    earthYears: days / 365.256,
    minutes: days * 24 * 60,
  };
}

export function YearLengthOnOtherPlanetsCalculator() {
  const [planet, setPlanet] = useState('mars');

  const result = computeYearLength({ planet });

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
            A planetary year is one full orbit. Mercury laps the Sun in under three Earth months, while
            Neptune needs more than 165 Earth years.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Year length"
            value={`${formatMoney(result.days)} Earth days`}
            sub={`One orbit of ${result.label}`}
          />
          <ResultRows>
            <ResultRow label="In Earth hours" value={formatMoney(result.hours)} />
            <ResultRow label="In Earth minutes" value={formatMoney(result.minutes)} />
            <ResultRow label="In Earth years" value={formatMoney(result.earthYears)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default YearLengthOnOtherPlanetsCalculator;
