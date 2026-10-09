import { useState, useMemo } from 'react';
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

export interface LuggageWeightInput {
  weight: number;
  allowance: number;
  overweightRate: number;
  pieces: number;
}

export function computeLuggageWeight(input: LuggageWeightInput) {
  const total = input.weight * input.pieces;
  const allowed = input.allowance * input.pieces;
  const overweight = Math.max(0, total - allowed);
  const fee = overweight * input.overweightRate;
  return { total, allowed, overweight, fee };
}

export function LuggageWeightCalculator() {
  const [weight, setWeight] = useState('15');
  const [allowance, setAllowance] = useState('23');
  const [overweightRate, setOverweightRate] = useState('5');
  const [pieces, setPieces] = useState('1');

  const result = useMemo(
    () =>
      computeLuggageWeight({
        weight: Number(weight) || 0,
        allowance: Number(allowance) || 0,
        overweightRate: Number(overweightRate) || 0,
        pieces: Number(pieces) || 0,
      }),
    [weight, allowance, overweightRate, pieces]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Weight per bag (kg)" value={weight} onChange={setWeight} min={0} step="0.5" />
            <NumberField label="Free allowance (kg)" value={allowance} onChange={setAllowance} min={0} step="1" />
            <NumberField label="Overweight fee per kg ($)" value={overweightRate} onChange={setOverweightRate} min={0} step="0.5" />
            <NumberField label="Number of bags" value={pieces} onChange={setPieces} min={1} step="1" />
          </div>
          <Hint>
            Airlines apply the allowance per bag, not per passenger. Multiply by the number of
            checked pieces and compare against the total weight to find any excess.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Overweight fee"
            value={`${formatMoney(result.fee)}`}
            sub={`Total ${formatMoney(result.total)} kg`}
          />
          <ResultRows>
            <ResultRow label="Total weight" value={`${formatMoney(result.total)} kg`} />
            <ResultRow label="Allowed weight" value={`${formatMoney(result.allowed)} kg`} />
            <ResultRow label="Overweight" value={`${formatMoney(result.overweight)} kg`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default LuggageWeightCalculator;