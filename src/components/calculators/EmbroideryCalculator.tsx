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

const whole = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 0 });

export interface EmbroideryInput {
  widthIn: number;
  heightIn: number;
  density: number;
  hoopWidth: number;
  hoopHeight: number;
}

export function computeEmbroidery(input: EmbroideryInput) {
  const width = Math.max(0, input.widthIn);
  const height = Math.max(0, input.heightIn);
  const density = Math.max(0, input.density);
  const hoopW = Math.max(0, input.hoopWidth);
  const hoopH = Math.max(0, input.hoopHeight);

  const area = width * height;
  const stitches = Math.round(area * density);
  const fits = width <= hoopW && height <= hoopH;
  const rowsOfStitches = height > 0 ? Math.round(height * Math.sqrt(density)) : 0;

  return { area, stitches, fits, rowsOfStitches };
}

export function EmbroideryCalculator() {
  const [widthIn, setWidthIn] = useState('4');
  const [heightIn, setHeightIn] = useState('6');
  const [density, setDensity] = useState('800');
  const [hoopWidth, setHoopWidth] = useState('5');
  const [hoopHeight, setHoopHeight] = useState('7');

  const result = computeEmbroidery({
    widthIn: Number(widthIn) || 0,
    heightIn: Number(heightIn) || 0,
    density: Number(density) || 0,
    hoopWidth: Number(hoopWidth) || 0,
    hoopHeight: Number(hoopHeight) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Design width (in)" value={widthIn} onChange={setWidthIn} min={0} step="0.25" />
              <NumberField label="Design height (in)" value={heightIn} onChange={setHeightIn} min={0} step="0.25" />
            </div>
            <NumberField
              label="Stitch density (per sq in)"
              value={density}
              onChange={setDensity}
              min={0}
              hint="Typical fill stitches run 600–1000 per square inch"
            />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Hoop width (in)" value={hoopWidth} onChange={setHoopWidth} min={0} />
              <NumberField label="Hoop height (in)" value={hoopHeight} onChange={setHoopHeight} min={0} />
            </div>
          </div>
          <Hint>
            Multiply the design area by the stitch density of your digitised file, then check both hoop
            dimensions — the design must fit inside the hoop in each direction.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Estimated stitch count"
            value={whole(result.stitches)}
            sub={`${whole(result.rowsOfStitches)} stitch rows at this density`}
          />
          <ResultRows>
            <ResultRow label="Design area" value={`${formatMoney(result.area)} sq in`} />
            <ResultRow label="Fits hoop" value={result.fits ? 'Yes' : 'No'} />
            <ResultRow label="Hoop size" value={`${Number(hoopWidth) || 0} × ${Number(hoopHeight) || 0} in`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default EmbroideryCalculator;
