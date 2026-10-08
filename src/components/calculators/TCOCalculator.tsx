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

export interface TCOInput {
  upfront: number;
  software: number;
  hosting: number;
  support: number;
  maintenanceHours: number;
  hourlyRate: number;
  years: number;
}

export function computeTCO(input: TCOInput) {
  const labour = Math.max(0, input.maintenanceHours) * Math.max(0, input.hourlyRate);
  const annualRunRate =
    Math.max(0, input.software) + Math.max(0, input.hosting) + Math.max(0, input.support) + labour;
  const years = Math.max(0, input.years);
  const total = Math.max(0, input.upfront) + annualRunRate * years;
  const perYear = years > 0 ? total / years : 0;

  return { labour, annualRunRate, total, perYear };
}

export function TCOCalculator() {
  const [upfront, setUpfront] = useState('20000');
  const [software, setSoftware] = useState('5000');
  const [hosting, setHosting] = useState('3600');
  const [support, setSupport] = useState('2400');
  const [maintenanceHours, setMaintenanceHours] = useState('120');
  const [hourlyRate, setHourlyRate] = useState('80');
  const [years, setYears] = useState('3');

  const result = computeTCO({
    upfront: Number(upfront) || 0,
    software: Number(software) || 0,
    hosting: Number(hosting) || 0,
    support: Number(support) || 0,
    maintenanceHours: Number(maintenanceHours) || 0,
    hourlyRate: Number(hourlyRate) || 0,
    years: Number(years) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Upfront cost ($)" value={upfront} onChange={setUpfront} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Software per year ($)" value={software} onChange={setSoftware} min={0} />
              <NumberField label="Hosting per year ($)" value={hosting} onChange={setHosting} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Support per year ($)" value={support} onChange={setSupport} min={0} />
              <NumberField label="Horizon (years)" value={years} onChange={setYears} min={1} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Maintenance hours per year" value={maintenanceHours} onChange={setMaintenanceHours} min={0} />
              <NumberField label="Hourly rate ($)" value={hourlyRate} onChange={setHourlyRate} min={0} />
            </div>
          </div>
          <Hint>
            Licence and hosting invoices are only a slice of ownership — engineering time spent patching, scaling
            and operating the system usually dominates the total.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Total cost of ownership"
            value={`$${formatMoney(result.total)}`}
            sub={`Across ${years} year(s) of ownership`}
          />
          <ResultRows>
            <ResultRow label="Annual run rate" value={`$${formatMoney(result.annualRunRate)}`} />
            <ResultRow label="Staff time per year" value={`$${formatMoney(result.labour)}`} />
            <ResultRow label="Average cost per year" value={`$${formatMoney(result.perYear)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default TCOCalculator;
