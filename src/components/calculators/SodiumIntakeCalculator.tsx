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

export interface SodiumIntakeInput {
  sodiumEaten: number;
  sodiumLimit: number;
}

export function computeSodiumIntake(input: SodiumIntakeInput) {
  const eaten = Math.max(0, input.sodiumEaten);
  const limit = Math.max(1, input.sodiumLimit);

  const remaining = limit - eaten;
  const saltEquivalent = eaten * 2.5;
  const percent = (eaten / limit) * 100;

  return { remaining, saltEquivalent, percent, eaten, limit };
}

export function SodiumIntakeCalculator() {
  const [sodiumEaten, setSodiumEaten] = useState('3000');
  const [sodiumLimit, setSodiumLimit] = useState('2300');

  const result = computeSodiumIntake({
    sodiumEaten: Number(sodiumEaten) || 0,
    sodiumLimit: Number(sodiumLimit) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Sodium eaten (mg)" value={sodiumEaten} onChange={setSodiumEaten} min={0} />
            <NumberField
              label="Daily limit (mg)"
              value={sodiumLimit}
              onChange={setSodiumLimit}
              min={1}
              hint="Most guidelines cap sodium at 2,300 mg a day"
            />
          </div>
          <Hint>
            Sodium and salt are not the same number: table salt is about 2.5 times the weight of the sodium it
            contains, so 2,300 mg of sodium equals roughly 5.8 g of salt.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Sodium remaining"
            value={`${formatMoney(result.remaining)} mg`}
            sub={`${formatMoney(result.percent, 0)}% of the daily limit used`}
          />
          <ResultRows>
            <ResultRow label="Sodium eaten" value={`${formatMoney(result.eaten)} mg`} />
            <ResultRow label="Salt equivalent" value={`${formatMoney(result.saltEquivalent)} mg`} />
            <ResultRow label="Daily limit" value={`${formatMoney(result.limit)} mg`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default SodiumIntakeCalculator;
