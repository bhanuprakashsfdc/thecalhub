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

export function AreaOnEarthCalculator() {
  const [lat1, setLat1] = useState('0');
  const [lon1, setLon1] = useState('0');
  const [lat2, setLat2] = useState('1');
  const [lon2, setLon2] = useState('1');

  const toRad = (d: number) => (d * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(Number(lat2)-Number(lat1));
  const dLon = toRad(Number(lon2)-Number(lon1));
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(Number(lat1))) * Math.cos(toRad(Number(lat2))) * Math.sin(dLon/2)**2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const dist = R * c;
  const area = dist*dist; // rough square

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Lat 1 (°)" value={lat1} onChange={setLat1} step="0.01" />
              <NumberField label="Lon 1 (°)" value={lon1} onChange={setLon1} step="0.01" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Lat 2 (°)" value={lat2} onChange={setLat2} step="0.01" />
              <NumberField label="Lon 2 (°)" value={lon2} onChange={setLon2} step="0.01" />
            </div>
          </div>
          <Hint>Haversine distance between points; area approximation shown.</Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero label="Distance" value={`${formatMoney(dist)} km`} />
          <ResultRows>
            <ResultRow label="Approx Area" value={`${formatMoney(area)} km²`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default AreaOnEarthCalculator;
