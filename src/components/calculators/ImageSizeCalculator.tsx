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

export interface ImageSizeInput {
  width: number;
  height: number;
  bitsPerPixel: number;
}

export function computeImageSize(input: ImageSizeInput) {
  const w = Math.max(0, input.width);
  const h = Math.max(0, input.height);
  const bpp = Math.max(0, input.bitsPerPixel);

  const pixels = w * h;
  const bytes = (pixels * bpp) / 8;
  const megabytes = bytes / (1024 * 1024);
  const kilobytes = bytes / 1024;
  const megapixels = pixels / 1_000_000;

  return { pixels, bytes, megabytes, kilobytes, megapixels };
}

export function ImageSizeCalculator() {
  const [width, setWidth] = useState('4000');
  const [height, setHeight] = useState('3000');
  const [bitsPerPixel, setBitsPerPixel] = useState('24');

  const result = computeImageSize({
    width: Number(width) || 0,
    height: Number(height) || 0,
    bitsPerPixel: Number(bitsPerPixel) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Width (px)" value={width} onChange={setWidth} min={0} />
              <NumberField label="Height (px)" value={height} onChange={setHeight} min={0} />
            </div>
            <NumberField
              label="Bits per pixel"
              value={bitsPerPixel}
              onChange={setBitsPerPixel}
              min={0}
              hint="24 for RGB, 32 for RGBA, 8 for greyscale"
            />
          </div>
          <Hint>
            Uncompressed size = pixels × bits per pixel ÷ 8. Compressed formats such as JPEG and PNG will land
            well below this figure.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Uncompressed file size"
            value={`${formatMoney(result.megabytes)} MB`}
            sub={`${formatMoney(result.kilobytes)} KB before compression`}
          />
          <ResultRows>
            <ResultRow label="Megapixels" value={`${formatMoney(result.megapixels)} MP`} />
            <ResultRow label="Total pixels" value={formatMoney(result.pixels)} />
            <ResultRow label="Raw byte count" value={formatMoney(result.bytes)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ImageSizeCalculator;
