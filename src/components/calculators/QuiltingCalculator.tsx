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

export interface QuiltingInput {
  blockSize: number;
  blocksAcross: number;
  blocksDown: number;
  sashingWidth: number;
  borderWidth: number;
}

export function computeQuilting(input: QuiltingInput) {
  const block = Math.max(0, input.blockSize);
  const across = Math.max(0, Math.floor(input.blocksAcross));
  const down = Math.max(0, Math.floor(input.blocksDown));
  const sashing = Math.max(0, input.sashingWidth);
  const border = Math.max(0, input.borderWidth);

  const width = across * block + Math.max(0, across - 1) * sashing + border * 2;
  const length = down * block + Math.max(0, down - 1) * sashing + border * 2;
  const areaSqFt = (width * length) / 144;
  const battingSqFt = ((width + 8) * (length + 8)) / 144;

  return { width, length, areaSqFt, battingSqFt };
}

export function QuiltingCalculator() {
  const [blockSize, setBlockSize] = useState('10');
  const [blocksAcross, setBlocksAcross] = useState('4');
  const [blocksDown, setBlocksDown] = useState('5');
  const [sashingWidth, setSashingWidth] = useState('2');
  const [borderWidth, setBorderWidth] = useState('4');

  const result = computeQuilting({
    blockSize: Number(blockSize) || 0,
    blocksAcross: Number(blocksAcross) || 0,
    blocksDown: Number(blocksDown) || 0,
    sashingWidth: Number(sashingWidth) || 0,
    borderWidth: Number(borderWidth) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Finished block size (in)" value={blockSize} onChange={setBlockSize} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Blocks across" value={blocksAcross} onChange={setBlocksAcross} min={1} />
              <NumberField label="Blocks down" value={blocksDown} onChange={setBlocksDown} min={1} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Sashing width (in)" value={sashingWidth} onChange={setSashingWidth} min={0} />
              <NumberField label="Border width (in)" value={borderWidth} onChange={setBorderWidth} min={0} />
            </div>
          </div>
          <Hint>
            Batting and backing are cut with 4 inches of overhang on every side, so the calculator adds 8 inches
            to each finished dimension before converting to square feet.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Finished quilt width"
            value={`${formatMoney(result.width)} in`}
            sub={`${formatMoney(result.length)} in long`}
          />
          <ResultRows>
            <ResultRow label="Quilt area" value={`${formatMoney(result.areaSqFt)} sq ft`} />
            <ResultRow label="Batting needed" value={`${formatMoney(result.battingSqFt)} sq ft`} />
            <ResultRow label="Blocks" value={`${Number(blocksAcross) || 0} × ${Number(blocksDown) || 0}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default QuiltingCalculator;
