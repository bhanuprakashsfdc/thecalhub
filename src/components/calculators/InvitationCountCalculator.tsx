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

export interface InvitationCountInput {
  guests: number;
  perHousehold: number;
  wastePercent: number;
  extraCopies: number;
  pricePerInvite: number;
}

export function computeInvitationCount(input: InvitationCountInput) {
  const guests = Math.max(0, input.guests);
  const perHousehold = Math.max(1, input.perHousehold);
  const waste = Math.max(0, input.wastePercent);
  const extra = Math.max(0, Math.floor(input.extraCopies));
  const price = Math.max(0, input.pricePerInvite);

  const households = Math.ceil(guests / perHousehold);
  const withWaste = Math.ceil((households * (100 + waste)) / 100);
  const toPrint = withWaste + extra;
  const cost = toPrint * price;

  return { households, withWaste, toPrint, cost };
}

export function InvitationCountCalculator() {
  const [guests, setGuests] = useState('150');
  const [perHousehold, setPerHousehold] = useState('2.5');
  const [wastePercent, setWastePercent] = useState('10');
  const [extraCopies, setExtraCopies] = useState('5');
  const [pricePerInvite, setPricePerInvite] = useState('1.5');

  const result = computeInvitationCount({
    guests: Number(guests) || 0,
    perHousehold: Number(perHousehold) || 0,
    wastePercent: Number(wastePercent) || 0,
    extraCopies: Number(extraCopies) || 0,
    pricePerInvite: Number(pricePerInvite) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Guests" value={guests} onChange={setGuests} min={0} />
              <NumberField
                label="People per household"
                value={perHousehold}
                onChange={setPerHousehold}
                min={1}
                step="0.1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Print waste (%)" value={wastePercent} onChange={setWastePercent} min={0} />
              <NumberField label="Extra copies" value={extraCopies} onChange={setExtraCopies} min={0} />
            </div>
            <NumberField
              label="Price per invitation ($)"
              value={pricePerInvite}
              onChange={setPricePerInvite}
              min={0}
              step="0.1"
            />
          </div>
          <Hint>
            One invitation covers a household, not a person. Keep a few spare sets for late additions and
            printing mistakes.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Invitations to print"
            value={whole(result.toPrint)}
            sub={`${result.households} household(s) before waste`}
          />
          <ResultRows>
            <ResultRow label="Printing cost" value={`$${formatMoney(result.cost)}`} />
            <ResultRow label="Households" value={whole(result.households)} />
            <ResultRow label="With waste" value={whole(result.withWaste)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default InvitationCountCalculator;
