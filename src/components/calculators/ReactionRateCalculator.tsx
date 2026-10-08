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

export interface ReactionRateInput {
  rateConstant: number;
  concentrationA: number;
  concentrationB: number;
  orderA: number;
  orderB: number;
}

export function computeReactionRate(input: ReactionRateInput) {
  const a = Math.max(0, input.concentrationA);
  const b = Math.max(0, input.concentrationB);
  const rate = input.rateConstant * Math.pow(a, input.orderA) * Math.pow(b, input.orderB);
  const overallOrder = input.orderA + input.orderB;
  const halfLife = input.rateConstant > 0 ? Math.LN2 / input.rateConstant : 0;
  return { rate, overallOrder, halfLife };
}

export function ReactionRateCalculator() {
  const [rateConstant, setRateConstant] = useState('2.5');
  const [concentrationA, setConcentrationA] = useState('3');
  const [concentrationB, setConcentrationB] = useState('2');
  const [orderA, setOrderA] = useState('1');
  const [orderB, setOrderB] = useState('1');

  const result = computeReactionRate({
    rateConstant: Number(rateConstant) || 0,
    concentrationA: Number(concentrationA) || 0,
    concentrationB: Number(concentrationB) || 0,
    orderA: Number(orderA) || 0,
    orderB: Number(orderB) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField
              label="Rate constant k"
              value={rateConstant}
              onChange={setRateConstant}
              min={0}
              step="0.01"
            />
            <div className="grid grid-cols-2 gap-4">
              <NumberField
                label="Concentration A (M)"
                value={concentrationA}
                onChange={setConcentrationA}
                min={0}
                step="0.1"
              />
              <NumberField
                label="Concentration B (M)"
                value={concentrationB}
                onChange={setConcentrationB}
                min={0}
                step="0.1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField
                label="Order with respect to A"
                value={orderA}
                onChange={setOrderA}
                min={0}
                step="0.5"
              />
              <NumberField
                label="Order with respect to B"
                value={orderB}
                onChange={setOrderB}
                min={0}
                step="0.5"
              />
            </div>
          </div>
          <Hint>
            The rate law is rate = k[A]ᵐ[B]ⁿ — orders come from experiment, not from the balanced equation.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Reaction rate"
            value={`${formatMoney(result.rate)} M/s`}
            sub={`Overall order ${formatMoney(result.overallOrder)}`
            }
          />
          <ResultRows>
            <ResultRow label="First-order half-life" value={formatMoney(result.halfLife)} />
            <ResultRow label="Overall reaction order" value={formatMoney(result.overallOrder)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ReactionRateCalculator;
