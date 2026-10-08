import { useState } from 'react';
import {
  CalcGrid,
  Panel,
  PanelEyebrow,
  NumberField,
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

export interface PlanetAgeInput {
  earthYears: number;
  planet: string;
}

export function computePlanetAge(input: PlanetAgeInput) {
  const planet = PLANETS[input.planet] || PLANETS.mars;
  const years = Math.max(0, input.earthYears);

  const planetYears = (years * 365.256) / planet.yearDays;
  const earthDays = years * 365.256;

  return { label: planet.label, planetYears, earthDays, nextBirthday: Math.floor(planetYears) + 1 };
}

export function AgeOnOtherPlanetsCalculator() {
  const [earthYears, setEarthYears] = useState('30');
  const [planet, setPlanet] = useState('mars');

  const result = computePlanetAge({ earthYears: Number(earthYears) || 0, planet });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Age on Earth (years)" value={earthYears} onChange={setEarthYears} min={0} step="0.5" />
            <SelectField
              label="Planet"
              value={planet}
              onChange={setPlanet}
              options={Object.entries(PLANETS).map(([value, p]) => ({ value, label: p.label }))}
            />
          </div>
          <Hint>
            Your age in local years = Earth years × 365.256 ÷ the planet's orbital period. On Jupiter a
            30-year-old Earthling is barely three local years old.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Age on this planet"
            value={`${formatMoney(result.planetYears)} years`}
            sub={`On ${result.label}`}
          />
          <ResultRows>
            <ResultRow label="Earth days lived" value={formatMoney(result.earthDays)} />
            <ResultRow label="Next planet birthday (Earth years)" value={formatMoney(result.nextBirthday)} />
            <ResultRow label="Local year length" value={`${formatMoney((PLANETS[planet] || PLANETS.mars).yearDays)} days`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default AgeOnOtherPlanetsCalculator;
