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

export interface StorageCostInput {
  dataGb: number;
  pricePerGb: number;
  replication: number;
  growthPercent: number;
  months: number;
}

export function computeStorageCost(input: StorageCostInput) {
  const effectiveGb = Math.max(0, input.dataGb) * Math.max(0, input.replication);
  const firstMonth = effectiveGb * Math.max(0, input.pricePerGb);
  const months = Math.max(0, Math.floor(input.months));
  const g = Math.max(0, input.growthPercent) / 100;
  const growthFactor = g > 0 ? (Math.pow(1 + g, months) - 1) / g : months;
  const total = firstMonth * growthFactor;
  const lastMonth = months > 0 ? firstMonth * Math.pow(1 + g, months - 1) : 0;

  return { effectiveGb, firstMonth, lastMonth, total };
}

export function StorageCostCalculator() {
  const [dataGb, setDataGb] = useState('2000');
  const [pricePerGb, setPricePerGb] = useState('0.023');
  const [replication, setReplication] = useState('3');
  const [growthPercent, setGrowthPercent] = useState('5');
  const [months, setMonths] = useState('12');

  const result = computeStorageCost({
    dataGb: Number(dataGb) || 0,
    pricePerGb: Number(pricePerGb) || 0,
    replication: Number(replication) || 0,
    growthPercent: Number(growthPercent) || 0,
    months: Number(months) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Stored data (GB)" value={dataGb} onChange={setDataGb} min={0} />
              <NumberField label="Price per GB per month ($)" value={pricePerGb} onChange={setPricePerGb} min={0} step="0.001" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Replication factor" value={replication} onChange={setReplication} min={1} />
              <NumberField label="Monthly growth (%)" value={growthPercent} onChange={setGrowthPercent} step="0.1" />
            </div>
            <NumberField label="Storage months" value={months} onChange={setMonths} min={1} />
          </div>
          <Hint>
            Replicas multiply every gigabyte you pay for, and object stores rarely shrink — model growth so the
            bill in month twelve does not surprise you.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Total storage cost"
            value={`$${formatMoney(result.total)}`}
            sub={`Over ${months} month(s)`}
          />
          <ResultRows>
            <ResultRow label="First month cost" value={`$${formatMoney(result.firstMonth)}`} />
            <ResultRow label="Last month cost" value={`$${formatMoney(result.lastMonth)}`} />
            <ResultRow label="Effective stored data (GB)" value={formatMoney(result.effectiveGb)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default StorageCostCalculator;
