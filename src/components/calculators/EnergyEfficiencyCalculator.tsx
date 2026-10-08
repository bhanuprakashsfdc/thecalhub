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
  safeDiv,
} from './kit';

export interface EnergyEfficiencyInput {
  useful: number;
  input: number;
  price: number;
}

export function computeEnergyEfficiency(input: EnergyEfficiencyInput) {
  const efficiency = safeDiv(input.useful, input.input) * 100;
  const losses = input.input - input.useful;
  const wasteCost = losses * input.price;
  const saveable = losses * 0.3;
  return { efficiency, losses, wasteCost, saveable, saveCost: saveable * input.price };
}

export function EnergyEfficiencyCalculator() {
  const [useful, setUseful] = useState('800');
  const [inputEnergy, setInputEnergy] = useState('1000');
  const [price, setPrice] = useState('0.15');

  const result = computeEnergyEfficiency({
    useful: Number(useful) || 0,
    input: Number(inputEnergy) || 0,
    price: Number(price) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Useful energy out (kWh)" value={useful} onChange={setUseful} min={0} />
              <NumberField label="Total energy in (kWh)" value={inputEnergy} onChange={setInputEnergy} min={0} />
            </div>
            <NumberField
              label="Energy price ($/kWh)"
              value={price}
              onChange={setPrice}
              min={0}
              step="0.01"
            />
          </div>
          <Hint>
            Efficiency is useful energy divided by total energy input; anything above 100 % would violate
            conservation of energy, so check the meter readings.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Energy efficiency"
            value={`${formatMoney(result.efficiency)} %`}
            sub={`${formatMoney(result.losses)} kWh lost as waste heat`
            }
          />
          <ResultRows>
            <ResultRow label="Energy losses (kWh)" value={formatMoney(result.losses)} />
            <ResultRow label="Cost of waste ($)" value={formatMoney(result.wasteCost)} />
            <ResultRow label="Recoverable energy (kWh)" value={formatMoney(result.saveable)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default EnergyEfficiencyCalculator;
