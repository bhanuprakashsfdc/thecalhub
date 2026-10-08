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

export interface CateringInput {
  guests: number;
  pricePerPerson: number;
  serviceChargePercent: number;
  taxPercent: number;
}

export function computeCatering(input: CateringInput) {
  const guests = Math.max(0, input.guests);
  const price = Math.max(0, input.pricePerPerson);
  const serviceRate = Math.max(0, input.serviceChargePercent);
  const taxRate = Math.max(0, input.taxPercent);

  const food = guests * price;
  const service = (food * serviceRate) / 100;
  const afterService = food + service;
  const tax = (afterService * taxRate) / 100;
  const total = afterService + tax;
  const perPerson = guests > 0 ? total / guests : 0;

  return { food, service, tax, total, perPerson };
}

export function CateringCalculator() {
  const [guests, setGuests] = useState('80');
  const [pricePerPerson, setPricePerPerson] = useState('35');
  const [serviceChargePercent, setServiceChargePercent] = useState('18');
  const [taxPercent, setTaxPercent] = useState('8.5');

  const result = computeCatering({
    guests: Number(guests) || 0,
    pricePerPerson: Number(pricePerPerson) || 0,
    serviceChargePercent: Number(serviceChargePercent) || 0,
    taxPercent: Number(taxPercent) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Guests" value={guests} onChange={setGuests} min={0} />
              <NumberField label="Price per person ($)" value={pricePerPerson} onChange={setPricePerPerson} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField
                label="Service charge (%)"
                value={serviceChargePercent}
                onChange={setServiceChargePercent}
                min={0}
              />
              <NumberField label="Tax (%)" value={taxPercent} onChange={setTaxPercent} min={0} step="0.1" />
            </div>
          </div>
          <Hint>
            Service charge is usually applied before tax. Ask the venue whether staff tips come out of the
            service charge or are expected on top.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Total catering cost"
            value={`$${formatMoney(result.total)}`}
            sub={`$${formatMoney(result.perPerson)} per guest all-in`}
          />
          <ResultRows>
            <ResultRow label="Food" value={`$${formatMoney(result.food)}`} />
            <ResultRow label="Service charge" value={`$${formatMoney(result.service)}`} />
            <ResultRow label="Tax" value={`$${formatMoney(result.tax)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default CateringCalculator;
