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

export interface PortionInput {
  totalQuantity: number;
  portionSize: number;
}

export function computePortion(input: PortionInput) {
  const total = Math.max(0, input.totalQuantity);
  const size = input.portionSize;
  const exact = size > 0 ? total / size : 0;
  const whole = size > 0 ? Math.floor(total / size) : 0;
  const leftover = total - whole * (size > 0 ? size : 0);

  return { exact, whole, leftover };
}

export function PortionCalculator() {
  const [totalQuantity, setTotalQuantity] = useState('2500');
  const [portionSize, setPortionSize] = useState('300');

  const result = computePortion({
    totalQuantity: Number(totalQuantity) || 0,
    portionSize: Number(portionSize) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Total quantity (grams)" value={totalQuantity} onChange={setTotalQuantity} min={0} />
            <NumberField label="Portion size (grams)" value={portionSize} onChange={setPortionSize} min={0} />
          </div>
          <Hint>
            Catering portions are usually cut to a fixed weight. Enter the batch weight and the target portion
            to see how many full portions you can plate and what will be left over.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Full portions"
            value={`${result.whole}`}
            sub={`${formatMoney(result.exact)} exact portions from this batch`}
          />
          <ResultRows>
            <ResultRow label="Exact portions" value={formatMoney(result.exact)} />
            <ResultRow label="Leftover quantity" value={`${formatMoney(result.leftover)} g`} />
            <ResultRow label="Yield per 100 portions" value={`${formatMoney(result.exact * 100)} g`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default PortionCalculator;
