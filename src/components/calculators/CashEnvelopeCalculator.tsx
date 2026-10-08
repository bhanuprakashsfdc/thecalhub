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

export interface CashEnvelopeInput {
  monthlyCashBudget: number;
  envelopes: number;
  refillDays: number;
  daysInMonth: number;
}

export function computeCashEnvelope(input: CashEnvelopeInput) {
  const budget = Math.max(0, input.monthlyCashBudget);
  const envelopes = Math.max(1, Math.floor(input.envelopes));
  const days = Math.max(1, Math.floor(input.daysInMonth));
  const refill = Math.max(0, input.refillDays);
  const perEnvelope = budget / envelopes;
  const perDay = budget / days;
  const perRefill = perDay * refill;

  return { perEnvelope, perDay, perRefill, envelopes };
}

export function CashEnvelopeCalculator() {
  const [monthlyCashBudget, setMonthlyCashBudget] = useState('600');
  const [envelopes, setEnvelopes] = useState('6');
  const [refillDays, setRefillDays] = useState('7');
  const [daysInMonth, setDaysInMonth] = useState('30');

  const result = computeCashEnvelope({
    monthlyCashBudget: Number(monthlyCashBudget) || 0,
    envelopes: Number(envelopes) || 0,
    refillDays: Number(refillDays) || 0,
    daysInMonth: Number(daysInMonth) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Monthly cash budget ($)" value={monthlyCashBudget} onChange={setMonthlyCashBudget} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Number of envelopes" value={envelopes} onChange={setEnvelopes} min={1} />
              <NumberField label="Days in month" value={daysInMonth} onChange={setDaysInMonth} min={1} />
            </div>
            <NumberField label="Refill period (days)" value={refillDays} onChange={setRefillDays} min={0} />
          </div>
          <Hint>
            Cash envelopes make spending physical: when the envelope is empty, the category is done for the
            cycle — no card, no top-up, no silent overspend.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Cash per envelope"
            value={`$${formatMoney(result.perEnvelope)}`}
            sub={`Split across ${result.envelopes} envelope(s)`}
          />
          <ResultRows>
            <ResultRow label="Daily cash allowance" value={`$${formatMoney(result.perDay)}`} />
            <ResultRow label="Cash per refill" value={`$${formatMoney(result.perRefill)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default CashEnvelopeCalculator;
