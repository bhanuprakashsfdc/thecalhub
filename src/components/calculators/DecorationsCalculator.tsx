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

export interface DecorationsInput {
  roomLength: number;
  roomWidth: number;
  ceilingHeight: number;
  balloonDensity: number;
  priceEach: number;
}

export function computeDecorations(input: DecorationsInput) {
  const length = Math.max(0, input.roomLength);
  const width = Math.max(0, input.roomWidth);
  const height = Math.max(0, input.ceilingHeight);
  const density = Math.max(0, input.balloonDensity);
  const price = Math.max(0, input.priceEach);

  const volume = length * width * height;
  const balloons = Math.ceil((volume / 100) * density);
  const cost = balloons * price;

  return { volume, balloons, cost };
}

export function DecorationsCalculator() {
  const [roomLength, setRoomLength] = useState('20');
  const [roomWidth, setRoomWidth] = useState('15');
  const [ceilingHeight, setCeilingHeight] = useState('8');
  const [balloonDensity, setBalloonDensity] = useState('10');
  const [priceEach, setPriceEach] = useState('0.5');

  const result = computeDecorations({
    roomLength: Number(roomLength) || 0,
    roomWidth: Number(roomWidth) || 0,
    ceilingHeight: Number(ceilingHeight) || 0,
    balloonDensity: Number(balloonDensity) || 0,
    priceEach: Number(priceEach) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Room length (ft)" value={roomLength} onChange={setRoomLength} min={0} />
              <NumberField label="Room width (ft)" value={roomWidth} onChange={setRoomWidth} min={0} />
            </div>
            <NumberField label="Ceiling height (ft)" value={ceilingHeight} onChange={setCeilingHeight} min={0} />
            <NumberField
              label="Balloons per 100 cu ft"
              value={balloonDensity}
              onChange={setBalloonDensity}
              min={0}
              hint="10 balloons per 100 cu ft gives a light, airy look"
            />
            <NumberField label="Cost per balloon ($)" value={priceEach} onChange={setPriceEach} min={0} step="0.05" />
          </div>
          <Hint>
            Balloon density is quoted per 100 cubic feet of room volume. Ceiling drapes and table centrepieces are
            usually costed separately from balloon décor.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Balloons needed"
            value={whole(result.balloons)}
            sub={`$${formatMoney(result.cost)} at your unit price`}
          />
          <ResultRows>
            <ResultRow label="Room volume" value={`${formatMoney(result.volume)} cu ft`} />
            <ResultRow label="Cost" value={`$${formatMoney(result.cost)}`} />
            <ResultRow label="Room size" value={`${Number(roomLength) || 0} × ${Number(roomWidth) || 0} ft`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default DecorationsCalculator;
