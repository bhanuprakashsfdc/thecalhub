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

export interface CarbonFootprintInput {
  carKm: number;
  carFactor: number;
  electricity: number;
  gridFactor: number;
  flights: number;
  kgPerFlight: number;
}

export function computeCarbonFootprint(input: CarbonFootprintInput) {
  const carKg = input.carKm * input.carFactor;
  const homeKg = input.electricity * input.gridFactor;
  const flightKg = input.flights * input.kgPerFlight;
  const totalKg = carKg + homeKg + flightKg;
  const tonnes = totalKg / 1000;
  const perPersonMonth = tonnes / 12;
  return { carKg, homeKg, flightKg, totalKg, tonnes, perPersonMonth };
}

export function CarbonFootprintCalculator() {
  const [carKm, setCarKm] = useState('8000');
  const [carFactor, setCarFactor] = useState('0.17');
  const [electricity, setElectricity] = useState('3000');
  const [gridFactor, setGridFactor] = useState('0.4');
  const [flights, setFlights] = useState('2');
  const [kgPerFlight, setKgPerFlight] = useState('500');

  const result = computeCarbonFootprint({
    carKm: Number(carKm) || 0,
    carFactor: Number(carFactor) || 0,
    electricity: Number(electricity) || 0,
    gridFactor: Number(gridFactor) || 0,
    flights: Number(flights) || 0,
    kgPerFlight: Number(kgPerFlight) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Car travel (km/year)" value={carKm} onChange={setCarKm} min={0} />
              <NumberField
                label="Car factor (kg/km)"
                value={carFactor}
                onChange={setCarFactor}
                min={0}
                step="0.01"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField
                label="Home electricity (kWh/year)"
                value={electricity}
                onChange={setElectricity}
                min={0}
              />
              <NumberField
                label="Grid factor (kg/kWh)"
                value={gridFactor}
                onChange={setGridFactor}
                min={0}
                step="0.01"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Flights per year" value={flights} onChange={setFlights} min={0} />
              <NumberField
                label="kg CO₂ per flight"
                value={kgPerFlight}
                onChange={setKgPerFlight}
                min={0}
              />
            </div>
          </div>
          <Hint>
            A single long-haul return flight can outweigh a year of efficient driving — enter the per-flight
            figure that matches your typical route.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Annual carbon footprint"
            value={`${formatMoney(result.tonnes)} t CO₂e`}
            sub={`${formatMoney(result.perPersonMonth)} tonnes per month`
            }
          />
          <ResultRows>
            <ResultRow label="Driving (kg)" value={formatMoney(result.carKg)} />
            <ResultRow label="Home energy (kg)" value={formatMoney(result.homeKg)} />
            <ResultRow label="Flights (kg)" value={formatMoney(result.flightKg)} />
            <ResultRow label="Total (kg)" value={formatMoney(result.totalKg)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default CarbonFootprintCalculator;
