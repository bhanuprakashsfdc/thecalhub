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

export interface LaborCostInput {
  hourlyRate: number;
  hours: number;
  workers: number;
  overheadPercent: number;
  profitPercent: number;
}

export function computeLaborCost(input: LaborCostInput) {
  const rate = Math.max(0, input.hourlyRate);
  const hours = Math.max(0, input.hours);
  const workers = Math.max(0, input.workers);
  const overhead = Math.max(0, input.overheadPercent);
  const profit = Math.max(0, input.profitPercent);

  const base = rate * hours * workers;
  const overheadCost = (base * overhead) / 100;
  const afterOverhead = base + overheadCost;
  const profitCost = (afterOverhead * profit) / 100;
  const total = afterOverhead + profitCost;

  return { base, overheadCost, profitCost, total, perWorker: workers > 0 ? total / workers : 0 };
}

export function LaborCostCalculator() {
  const [hourlyRate, setHourlyRate] = useState('45');
  const [hours, setHours] = useState('8');
  const [workers, setWorkers] = useState('2');
  const [overheadPercent, setOverheadPercent] = useState('15');
  const [profitPercent, setProfitPercent] = useState('10');

  const result = computeLaborCost({
    hourlyRate: Number(hourlyRate) || 0,
    hours: Number(hours) || 0,
    workers: Number(workers) || 0,
    overheadPercent: Number(overheadPercent) || 0,
    profitPercent: Number(profitPercent) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Hourly rate ($)" value={hourlyRate} onChange={setHourlyRate} min={0} />
              <NumberField label="Hours worked" value={hours} onChange={setHours} min={0} step="0.5" />
            </div>
            <NumberField label="Workers" value={workers} onChange={setWorkers} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Overhead (%)" value={overheadPercent} onChange={setOverheadPercent} min={0} />
              <NumberField label="Profit (%)" value={profitPercent} onChange={setProfitPercent} min={0} />
            </div>
          </div>
          <Hint>
            Overhead covers insurance, tools and travel; profit is added on top of the loaded labour cost so the
            quote stays healthy.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Total labour cost"
            value={`$${formatMoney(result.total)}`}
            sub={`$${formatMoney(result.perWorker)} per worker`}
          />
          <ResultRows>
            <ResultRow label="Base wages" value={`$${formatMoney(result.base)}`} />
            <ResultRow label="Overhead" value={`$${formatMoney(result.overheadCost)}`} />
            <ResultRow label="Profit" value={`$${formatMoney(result.profitCost)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default LaborCostCalculator;
