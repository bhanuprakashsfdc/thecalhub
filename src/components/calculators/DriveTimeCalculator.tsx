import { useState, useMemo } from 'react';
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

export interface DriveTimeInput {
  distance: number;
  speed: number;
  breakMinutes: number;
}

export function computeDriveTime(input: DriveTimeInput) {
  const drivingHours = input.distance / (input.speed || 1);
  const drivingMinutes = drivingHours * 60;
  const totalMinutes = drivingMinutes + input.breakMinutes;
  const totalHours = totalMinutes / 60;
  return { drivingMinutes, totalMinutes, totalHours };
}

export function DriveTimeCalculator() {
  const [distance, setDistance] = useState('300');
  const [speed, setSpeed] = useState('60');
  const [breakMinutes, setBreakMinutes] = useState('15');

  const result = useMemo(
    () =>
      computeDriveTime({
        distance: Number(distance) || 0,
        speed: Number(speed) || 0,
        breakMinutes: Number(breakMinutes) || 0,
      }),
    [distance, speed, breakMinutes]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Distance (km)" value={distance} onChange={setDistance} min={0} step="10" />
            <NumberField label="Average speed (km/h)" value={speed} onChange={setSpeed} min={0} step="5" />
            <NumberField label="Break (minutes)" value={breakMinutes} onChange={setBreakMinutes} min={0} step="5" />
          </div>
          <Hint>
            Door-to-door time = distance ÷ speed plus any planned stops. Add traffic or rest
            padding before committing to a departure time.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Total drive time"
            value={`${formatMoney(result.totalHours)} h`}
            sub={`${formatMoney(result.drivingMinutes)} min driving`}
          />
          <ResultRows>
            <ResultRow label="Driving time" value={`${formatMoney(result.drivingMinutes)} min`} />
            <ResultRow label="Break time" value={`${Number(breakMinutes) || 0} min`} />
            <ResultRow label="Total time" value={`${formatMoney(result.totalMinutes)} min`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default DriveTimeCalculator;