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

export interface DecibelInput {
  referencePower: number;
  level: number;
}

export function computeDecibel(input: DecibelInput) {
  const reference = Math.max(0, input.referencePower);
  const level = input.level;

  const powerRatio = Math.pow(10, level / 10);
  const voltageRatio = Math.pow(10, level / 20);
  const targetPower = reference * powerRatio;

  return { powerRatio, voltageRatio, targetPower };
}

export function DecibelCalculator() {
  const [referencePower, setReferencePower] = useState('100');
  const [level, setLevel] = useState('3');

  const result = computeDecibel({
    referencePower: Number(referencePower) || 0,
    level: Number(level) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Reference power (W)" value={referencePower} onChange={setReferencePower} min={0} step="1" />
            <NumberField label="Level difference (dB)" value={level} onChange={setLevel} step="0.5" />
          </div>
          <Hint>
            Power ratios use 10^(dB÷10) while voltage or pressure ratios use 10^(dB÷20). Power doubles at
            3 dB and rises tenfold at 10 dB.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Target power"
            value={`${formatMoney(result.targetPower)} W`}
            sub={`${formatMoney(result.powerRatio)}× the reference power`}
          />
          <ResultRows>
            <ResultRow label="Power ratio" value={formatMoney(result.powerRatio)} />
            <ResultRow label="Voltage ratio" value={formatMoney(result.voltageRatio)} />
            <ResultRow label="Reference power" value={`${formatMoney(Number(referencePower) || 0)} W`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default DecibelCalculator;
