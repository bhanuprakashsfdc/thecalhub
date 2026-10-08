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

export interface BandwidthCostInput {
  egressGb: number;
  pricePerGb: number;
  freeAllowanceGb: number;
}

export function computeBandwidthCost(input: BandwidthCostInput) {
  const billableGb = Math.max(0, Math.max(0, input.egressGb) - Math.max(0, input.freeAllowanceGb));
  const monthly = billableGb * Math.max(0, input.pricePerGb);
  const annual = monthly * 12;

  return { billableGb, monthly, annual };
}

export function BandwidthCostCalculator() {
  const [egressGb, setEgressGb] = useState('5000');
  const [pricePerGb, setPricePerGb] = useState('0.08');
  const [freeAllowanceGb, setFreeAllowanceGb] = useState('1000');

  const result = computeBandwidthCost({
    egressGb: Number(egressGb) || 0,
    pricePerGb: Number(pricePerGb) || 0,
    freeAllowanceGb: Number(freeAllowanceGb) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Monthly egress (GB)" value={egressGb} onChange={setEgressGb} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Price per GB ($)" value={pricePerGb} onChange={setPricePerGb} min={0} step="0.001" />
              <NumberField label="Free allowance (GB)" value={freeAllowanceGb} onChange={setFreeAllowanceGb} min={0} />
            </div>
          </div>
          <Hint>
            Only outbound traffic is usually billed, and the free tier is applied before pricing — anything
            above the allowance is what lands on the invoice.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Monthly bandwidth cost"
            value={`$${formatMoney(result.monthly)}`}
            sub="Charged on egress above the free allowance"
          />
          <ResultRows>
            <ResultRow label="Billable data (GB)" value={formatMoney(result.billableGb)} />
            <ResultRow label="Annual bandwidth cost" value={`$${formatMoney(result.annual)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default BandwidthCostCalculator;
