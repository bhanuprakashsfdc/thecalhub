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

const whole = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 0 });

export interface GuestCountInput {
  budget: number;
  costPerHead: number;
  venueCapacity: number;
  acceptanceRate: number;
}

export function computeGuestCount(input: GuestCountInput) {
  const budget = Math.max(0, input.budget);
  const costPerHead = Math.max(0.01, input.costPerHead);
  const venueCapacity = Math.max(0, input.venueCapacity);
  const acceptance = Math.min(100, Math.max(1, input.acceptanceRate));

  const budgetLimit = Math.floor(budget / costPerHead);
  const venueLimit = Math.max(0, Math.floor(venueCapacity));
  const maxGuests = Math.min(budgetLimit, venueLimit);
  const invitesNeeded = Math.ceil(maxGuests / (acceptance / 100));

  return { budgetLimit, venueLimit, maxGuests, invitesNeeded };
}

export function GuestCountCalculator() {
  const [budget, setBudget] = useState('6000');
  const [costPerHead, setCostPerHead] = useState('60');
  const [venueCapacity, setVenueCapacity] = useState('80');
  const [acceptanceRate, setAcceptanceRate] = useState('85');

  const result = computeGuestCount({
    budget: Number(budget) || 0,
    costPerHead: Number(costPerHead) || 0,
    venueCapacity: Number(venueCapacity) || 0,
    acceptanceRate: Number(acceptanceRate) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Budget ($)" value={budget} onChange={setBudget} min={0} />
              <NumberField label="Cost per head ($)" value={costPerHead} onChange={setCostPerHead} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Venue capacity" value={venueCapacity} onChange={setVenueCapacity} min={0} />
              <NumberField
                label="Expected acceptance (%)"
                value={acceptanceRate}
                onChange={setAcceptanceRate}
                min={1}
                max={100}
              />
            </div>
          </div>
          <Hint>
            The lower of your budget limit and the venue limit sets the guest count. Divide that by the expected
            acceptance rate to find how many invitations to send.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Guests you can host"
            value={whole(result.maxGuests)}
            sub={`${whole(result.invitesNeeded)} invitations to send at ${Number(acceptanceRate) || 0}% acceptance`}
          />
          <ResultRows>
            <ResultRow label="Budget allows" value={whole(result.budgetLimit)} />
            <ResultRow label="Venue allows" value={whole(result.venueLimit)} />
            <ResultRow label="Cost per head" value={`$${formatMoney(Number(costPerHead) || 0)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default GuestCountCalculator;
