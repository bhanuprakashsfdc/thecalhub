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

export interface LicenseCostInput {
  pricePerSeat: number;
  seats: number;
  maintenancePercent: number;
  years: number;
}

export function computeLicenseCost(input: LicenseCostInput) {
  const seats = Math.max(0, input.seats);
  const licenceTotal = Math.max(0, input.pricePerSeat) * seats;
  const annualMaintenance = licenceTotal * (Math.max(0, input.maintenancePercent) / 100);
  const years = Math.max(0, input.years);
  const maintenanceTotal = annualMaintenance * years;
  const grandTotal = licenceTotal + maintenanceTotal;

  return { licenceTotal, annualMaintenance, maintenanceTotal, grandTotal };
}

export function LicenseCostCalculator() {
  const [pricePerSeat, setPricePerSeat] = useState('500');
  const [seats, setSeats] = useState('10');
  const [maintenancePercent, setMaintenancePercent] = useState('20');
  const [years, setYears] = useState('3');

  const result = computeLicenseCost({
    pricePerSeat: Number(pricePerSeat) || 0,
    seats: Number(seats) || 0,
    maintenancePercent: Number(maintenancePercent) || 0,
    years: Number(years) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Licence price per seat ($)" value={pricePerSeat} onChange={setPricePerSeat} min={0} />
              <NumberField label="Number of seats" value={seats} onChange={setSeats} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Annual maintenance (%)" value={maintenancePercent} onChange={setMaintenancePercent} min={0} step="0.1" />
              <NumberField label="Years" value={years} onChange={setYears} min={1} />
            </div>
          </div>
          <Hint>
            Perpetual licences are rarely perpetual: vendors charge 18–25% of the licence price each year for
            patches and support, which is where the real multi-year cost hides.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Multi-year licence cost"
            value={`$${formatMoney(result.grandTotal)}`}
            sub={`Licence plus ${years} year(s) of maintenance`}
          />
          <ResultRows>
            <ResultRow label="Licence cost" value={`$${formatMoney(result.licenceTotal)}`} />
            <ResultRow label="Annual maintenance" value={`$${formatMoney(result.annualMaintenance)}`} />
            <ResultRow label="Maintenance total" value={`$${formatMoney(result.maintenanceTotal)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default LicenseCostCalculator;
