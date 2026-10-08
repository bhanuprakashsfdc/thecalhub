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

export interface SewingInput {
  seamLength: number;
  seamAllowance: number;
  stitchesPerInch: number;
  threadMultiplier: number;
}

export function computeSewing(input: SewingInput) {
  const seam = Math.max(0, input.seamLength);
  const allowance = Math.max(0, input.seamAllowance);
  const spi = Math.max(0, input.stitchesPerInch);
  const multiplier = Math.max(0, input.threadMultiplier);

  const cutLength = seam + allowance * 2;
  const threadIn = cutLength * multiplier;
  const stitches = cutLength * spi;

  return { cutLength, threadIn, threadYards: threadIn / 36, stitches };
}

export function SewingCalculator() {
  const [seamLength, setSeamLength] = useState('20');
  const [seamAllowance, setSeamAllowance] = useState('0.5');
  const [stitchesPerInch, setStitchesPerInch] = useState('12');
  const [threadMultiplier, setThreadMultiplier] = useState('2.5');

  const result = computeSewing({
    seamLength: Number(seamLength) || 0,
    seamAllowance: Number(seamAllowance) || 0,
    stitchesPerInch: Number(stitchesPerInch) || 0,
    threadMultiplier: Number(threadMultiplier) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Seam length (in)" value={seamLength} onChange={setSeamLength} min={0} step="0.25" />
            <div className="grid grid-cols-2 gap-4">
              <NumberField
                label="Seam allowance (in)"
                value={seamAllowance}
                onChange={setSeamAllowance}
                min={0}
                step="0.125"
              />
              <NumberField
                label="Stitches per inch"
                value={stitchesPerInch}
                onChange={setStitchesPerInch}
                min={0}
              />
            </div>
            <NumberField
              label="Thread multiplier"
              value={threadMultiplier}
              onChange={setThreadMultiplier}
              min={0}
              step="0.1"
              hint="Machine sewing typically uses 2.5× the seam length in thread"
            />
          </div>
          <Hint>
            Add seam allowance on both ends of the seam, then use the thread multiplier to estimate how much
            thread the machine will pull for that seam.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Thread needed"
            value={`${formatMoney(result.threadIn)} in`}
            sub={`${formatMoney(result.threadYards)} yards of thread`}
          />
          <ResultRows>
            <ResultRow label="Cut length" value={`${formatMoney(result.cutLength)} in`} />
            <ResultRow label="Stitches in seam" value={formatMoney(result.stitches, 0)} />
            <ResultRow label="Seam length" value={`${Number(seamLength) || 0} in`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default SewingCalculator;
