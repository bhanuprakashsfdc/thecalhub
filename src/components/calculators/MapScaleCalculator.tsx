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
  safeDiv,
} from './kit';

export interface MapScaleInput {
  denominator: number;
  mapDistanceCm: number;
  unit: 'm' | 'km' | 'ft' | 'mi';
}

export interface MapScaleResult {
  metres: number;
  kilometres: number;
  feet: number;
  miles: number;
  selected: number;
  metresPerCm: number;
  cmPerKilometre: number;
  scaleFactor: number;
}

const positive = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);

export function computeMapScale(input: MapScaleInput): MapScaleResult {
  const denominator = positive(input.denominator);
  const mapCm = positive(input.mapDistanceCm);

  const metres = (mapCm * denominator) / 100;
  const kilometres = metres / 1000;
  const feet = metres * 3.280839895;
  const miles = metres / 1609.344;

  const selected =
    input.unit === 'm' ? metres : input.unit === 'km' ? kilometres : input.unit === 'ft' ? feet : miles;

  return {
    metres,
    kilometres,
    feet,
    miles,
    selected,
    metresPerCm: denominator / 100,
    cmPerKilometre: safeDiv(100000, denominator),
    scaleFactor: safeDiv(1, denominator),
  };
}

const toNumber = (raw: string) => {
  const n = Number(raw);
  return Number.isFinite(n) ? n : 0;
};

const UNIT_OPTIONS = [
  { value: 'm', label: 'Metres' },
  { value: 'km', label: 'Kilometres' },
  { value: 'ft', label: 'Feet' },
  { value: 'mi', label: 'Miles' },
];

const UNIT_SUFFIX: Record<string, string> = { m: 'm', km: 'km', ft: 'ft', mi: 'mi' };

export function MapScaleCalculator() {
  const [denominator, setDenominator] = useState('50000');
  const [mapCm, setMapCm] = useState('10');
  const [unit, setUnit] = useState('km');

  const activeUnit: 'm' | 'km' | 'ft' | 'mi' =
    unit === 'm' || unit === 'km' || unit === 'ft' || unit === 'mi' ? unit : 'km';

  const result = computeMapScale({
    denominator: toNumber(denominator),
    mapDistanceCm: toNumber(mapCm),
    unit: activeUnit,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField
              label="Scale denominator (1:N)"
              value={denominator}
              onChange={setDenominator}
              min={1}
              hint="The N in a 1:N scale: 50000 means 1 cm on the map equals 50000 cm on the ground."
            />
            <NumberField label="Map distance (cm)" value={mapCm} onChange={setMapCm} min={0} step="0.1" />
            <SelectField label="Ground distance unit" value={unit} onChange={setUnit} options={UNIT_OPTIONS} />
          </div>
          <Hint>
            Real distance is map distance multiplied by the scale denominator, then converted from centimetres
            into the unit you picked. A 10 cm line at 1:50,000 spans 5 km on the ground.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Ground distance"
            value={`${formatMoney(result.selected)} ${UNIT_SUFFIX[activeUnit]}`}
            sub={`${formatMoney(toNumber(mapCm), 1)} cm on the map at a 1:${formatMoney(toNumber(denominator), 0)} scale`}
          />
          <ResultRows>
            <ResultRow label="Ground distance in metres" value={`${formatMoney(result.metres)} m`} />
            <ResultRow label="Ground distance in kilometres" value={`${formatMoney(result.kilometres)} km`} />
            <ResultRow label="Ground distance per map cm" value={`${formatMoney(result.metresPerCm)} m`} />
            <ResultRow label="Map cm per kilometre" value={`${formatMoney(result.cmPerKilometre)} cm`} />
            <ResultRow label="Scale ratio" value={`1:${formatMoney(toNumber(denominator), 0)}`} />
          </ResultRows>
          <Hint>
            The per centimetre row is simply the denominator divided by 100, and the centimetres per kilometre
            row is the inverse: 100000 cm divided by the denominator.
          </Hint>
        </Panel>
      }
    />
  );
}

export default MapScaleCalculator;
