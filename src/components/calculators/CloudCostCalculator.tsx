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

export interface CloudCostInput {
  instances: number;
  hourlyRate: number;
  hoursPerInstance: number;
  storageGb: number;
  storagePrice: number;
  egressGb: number;
  egressPrice: number;
}

export function computeCloudCost(input: CloudCostInput) {
  const compute = Math.max(0, input.instances) * Math.max(0, input.hourlyRate) * Math.max(0, input.hoursPerInstance);
  const storage = Math.max(0, input.storageGb) * Math.max(0, input.storagePrice);
  const egress = Math.max(0, input.egressGb) * Math.max(0, input.egressPrice);
  const monthly = compute + storage + egress;
  const annual = monthly * 12;

  return { compute, storage, egress, monthly, annual };
}

export function CloudCostCalculator() {
  const [instances, setInstances] = useState('4');
  const [hourlyRate, setHourlyRate] = useState('0.12');
  const [hoursPerInstance, setHoursPerInstance] = useState('730');
  const [storageGb, setStorageGb] = useState('500');
  const [storagePrice, setStoragePrice] = useState('0.10');
  const [egressGb, setEgressGb] = useState('1000');
  const [egressPrice, setEgressPrice] = useState('0.09');

  const result = computeCloudCost({
    instances: Number(instances) || 0,
    hourlyRate: Number(hourlyRate) || 0,
    hoursPerInstance: Number(hoursPerInstance) || 0,
    storageGb: Number(storageGb) || 0,
    storagePrice: Number(storagePrice) || 0,
    egressGb: Number(egressGb) || 0,
    egressPrice: Number(egressPrice) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Instances" value={instances} onChange={setInstances} min={0} />
              <NumberField label="Hourly rate ($)" value={hourlyRate} onChange={setHourlyRate} min={0} step="0.01" />
            </div>
            <NumberField label="Hours per instance per month" value={hoursPerInstance} onChange={setHoursPerInstance} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Storage (GB)" value={storageGb} onChange={setStorageGb} min={0} />
              <NumberField label="Storage price ($/GB-month)" value={storagePrice} onChange={setStoragePrice} min={0} step="0.01" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Egress (GB)" value={egressGb} onChange={setEgressGb} min={0} />
              <NumberField label="Egress price ($/GB)" value={egressPrice} onChange={setEgressPrice} min={0} step="0.01" />
            </div>
          </div>
          <Hint>
            Compute is usually the visible line item, but egress and storage scale with success — watch them as
            usage grows rather than at renewal time.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Monthly cloud cost"
            value={`$${formatMoney(result.monthly)}`}
            sub="Compute plus storage plus egress"
          />
          <ResultRows>
            <ResultRow label="Compute cost" value={`$${formatMoney(result.compute)}`} />
            <ResultRow label="Storage cost" value={`$${formatMoney(result.storage)}`} />
            <ResultRow label="Egress cost" value={`$${formatMoney(result.egress)}`} />
            <ResultRow label="Annual cloud cost" value={`$${formatMoney(result.annual)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default CloudCostCalculator;
