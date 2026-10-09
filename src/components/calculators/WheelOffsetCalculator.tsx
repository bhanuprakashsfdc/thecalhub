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

export interface WheelOffsetInput {
  wheelDiameter: number;
  stockOffset: number;
  newOffset: number;
  stockWidth: number;
  newWidth: number;
}

export function computeWheelOffset(input: WheelOffsetInput) {
  const stockOuter = (input.wheelDiameter / 2) + input.stockWidth;
  const newOuter = (input.wheelDiameter / 2) + input.newWidth;
  const stockBackspace = (input.stockWidth / 2) + input.stockOffset;
  const newBackspace = (input.newWidth / 2) + input.newOffset;
  const scrubRadiusChange = newOuter - stockOuter;
  const offsetChange = newBackspace - stockBackspace;
  return { stockOuter, newOuter, stockBackspace, newBackspace, scrubRadiusChange, offsetChange };
}

export function WheelOffsetCalculator() {
  const [wheelDiameter, setWheelDiameter] = useState('17');
  const [stockOffset, setStockOffset] = useState('45');
  const [newOffset, setNewOffset] = useState('35');
  const [stockWidth, setStockWidth] = useState('8');
  const [newWidth, setNewWidth] = useState('9.5');

  const result = useMemo(
    () =>
      computeWheelOffset({
        wheelDiameter: Number(wheelDiameter) || 0,
        stockOffset: Number(stockOffset) || 0,
        newOffset: Number(newOffset) || 0,
        stockWidth: Number(stockWidth) || 0,
        newWidth: Number(newWidth) || 0,
      }),
    [wheelDiameter, stockOffset, newOffset, stockWidth, newWidth]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Wheel diameter (in)" value={wheelDiameter} onChange={setWheelDiameter} min={0} step="0.5" />
            <NumberField label="Stock offset (mm)" value={stockOffset} onChange={setStockOffset} step="1" />
            <NumberField label="New offset (mm)" value={newOffset} onChange={setNewOffset} step="1" />
            <NumberField label="Stock wheel width (in)" value={stockWidth} onChange={setStockWidth} min={0} step="0.5" />
            <NumberField label="New wheel width (in)" value={newWidth} onChange={setNewWidth} min={0} step="0.5" />
          </div>
          <Hint>
            Offset and width together determine how far the wheel sits in the well. A smaller
            offset pushes the wheel outward; a wider wheel also extends outward. Check fender
            clearance before ordering.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Offset change"
            value={`${formatMoney(result.offsetChange)} mm`}
            sub={`Scrub radius change ${formatMoney(result.scrubRadiusChange)} in`}
          />
          <ResultRows>
            <ResultRow label="Stock backspace" value={`${formatMoney(result.stockBackspace)} mm`} />
            <ResultRow label="New backspace" value={`${formatMoney(result.newBackspace)} mm`} />
            <ResultRow label="Scrub radius change" value={`${formatMoney(result.scrubRadiusChange)} in`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default WheelOffsetCalculator;