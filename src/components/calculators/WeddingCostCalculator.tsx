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

export interface WeddingCostInput {
  guests: number;
  venue: number;
  cateringPerPerson: number;
  photography: number;
  flowers: number;
  music: number;
  attire: number;
  other: number;
  contingencyPercent: number;
}

export function computeWeddingCost(input: WeddingCostInput) {
  const guests = Math.max(0, input.guests);
  const contingencyRate = Math.max(0, input.contingencyPercent);

  const catering = guests * Math.max(0, input.cateringPerPerson);
  const fixed =
    Math.max(0, input.venue) +
    Math.max(0, input.photography) +
    Math.max(0, input.flowers) +
    Math.max(0, input.music) +
    Math.max(0, input.attire) +
    Math.max(0, input.other);
  const subtotal = catering + fixed;
  const contingency = (subtotal * contingencyRate) / 100;
  const total = subtotal + contingency;
  const perGuest = guests > 0 ? total / guests : 0;

  return { catering, fixed, subtotal, contingency, total, perGuest };
}

export function WeddingCostCalculator() {
  const [guests, setGuests] = useState('100');
  const [venue, setVenue] = useState('8000');
  const [cateringPerPerson, setCateringPerPerson] = useState('70');
  const [photography, setPhotography] = useState('2500');
  const [flowers, setFlowers] = useState('1500');
  const [music, setMusic] = useState('1200');
  const [attire, setAttire] = useState('1000');
  const [other, setOther] = useState('1000');
  const [contingencyPercent, setContingencyPercent] = useState('10');

  const result = computeWeddingCost({
    guests: Number(guests) || 0,
    venue: Number(venue) || 0,
    cateringPerPerson: Number(cateringPerPerson) || 0,
    photography: Number(photography) || 0,
    flowers: Number(flowers) || 0,
    music: Number(music) || 0,
    attire: Number(attire) || 0,
    other: Number(other) || 0,
    contingencyPercent: Number(contingencyPercent) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Guests" value={guests} onChange={setGuests} min={0} />
              <NumberField label="Venue ($)" value={venue} onChange={setVenue} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField
                label="Catering per person ($)"
                value={cateringPerPerson}
                onChange={setCateringPerPerson}
                min={0}
              />
              <NumberField label="Photography ($)" value={photography} onChange={setPhotography} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Flowers ($)" value={flowers} onChange={setFlowers} min={0} />
              <NumberField label="Music ($)" value={music} onChange={setMusic} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Attire ($)" value={attire} onChange={setAttire} min={0} />
              <NumberField label="Other ($)" value={other} onChange={setOther} min={0} />
            </div>
            <NumberField
              label="Contingency (%)"
              value={contingencyPercent}
              onChange={setContingencyPercent}
              min={0}
            />
          </div>
          <Hint>
            Venue, catering and photography typically take about two thirds of the total. Hold a 10 % contingency
            for overtime, delivery charges and last-minute extras.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Estimated wedding cost"
            value={`$${formatMoney(result.total)}`}
            sub={`$${formatMoney(result.perGuest)} per guest`}
          />
          <ResultRows>
            <ResultRow label="Subtotal" value={`$${formatMoney(result.subtotal)}`} />
            <ResultRow label="Catering" value={`$${formatMoney(result.catering)}`} />
            <ResultRow label="Contingency" value={`$${formatMoney(result.contingency)}`} />
            <ResultRow label="Fixed bookings" value={`$${formatMoney(result.fixed)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default WeddingCostCalculator;
