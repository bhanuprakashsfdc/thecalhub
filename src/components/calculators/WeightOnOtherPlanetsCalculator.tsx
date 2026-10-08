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

const PLANETS: Record<string, { label: string; gravity: number }> = {
  mercury: { label: 'Mercury', gravity: 3.7 },
  venus: { label: 'Venus', gravity: 8.87 },
  earth: { label: 'Earth', gravity: 9.807 },
  mars: { label: 'Mars', gravity: 3.721 },
  jupiter: { label: 'Jupiter', gravity: 24.79 },
  saturn: { label: 'Saturn', gravity: 10.44 },
  uranus: { label: 'Uranus', gravity: 8.87 },
  neptune: { label: 'Neptune', gravity: 11.15 },
};

export interface PlanetWeightInput {
  mass: number;
  planet: string;
}

export function computePlanetWeight(input: PlanetWeightInput) {
  const planet = PLANETS[input.planet] || PLANETS.mars;
  const mass = Math.max(0, input.mass);

  const weightNewtons = mass * planet.gravity;
  const relative = planet.gravity / 9.80665;
  const earthWeight = mass * 9.80665;

  return { gravity: planet.gravity, label: planet.label, weightNewtons, relative, earthWeight };
}

export function WeightOnOtherPlanetsCalculator() {
  const [mass, setMass] = useState('70');
  const [planet, setPlanet] = useState('mars');

  const result = computePlanetWeight({ mass: Number(mass) || 0, planet });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Mass (kg)" value={mass} onChange={setMass} min={0} step="0.5" />
            <SelectField
              label="Planet"
              value={planet}
              onChange={setPlanet}
              options={Object.entries(PLANETS).map(([value, p]) => ({ value, label: p.label }))}
            />
          </div>
          <Hint>
            Mass never changes — only weight does. Weight = mass × surface gravity, so you would weigh about
            a third as much on Mars as on Earth.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Weight on this planet"
            value={`${formatMoney(result.weightNewtons)} N`}
            sub={`${result.label} surface gravity ${formatMoney(result.gravity)} m/s²`}
          />
          <ResultRows>
            <ResultRow label="Relative to Earth" value={`${formatMoney(result.relative)}×`} />
            <ResultRow label="Weight on Earth" value={`${formatMoney(result.earthWeight)} N`} />
            <ResultRow label="Mass" value={`${formatMoney(Number(mass) || 0)} kg`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default WeightOnOtherPlanetsCalculator;
