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

export interface CulvertDesignInput {
  head: number;
  width: number;
  coefficient: number;
}

export function computeCulvertDesign(input: CulvertDesignInput) {
  const discharge = input.coefficient * input.width * Math.pow(Math.max(0, input.head), 1.5);
  const flowArea = input.width * Math.max(0, input.head);
  const unitDischarge = input.width > 0 ? discharge / input.width : 0;
  const velocity = flowArea > 0 ? discharge / flowArea : 0;
  return { discharge, flowArea, unitDischarge, velocity };
}

export function CulvertDesignCalculator() {
  const [head, setHead] = useState('1.2');
  const [width, setWidth] = useState('2');
  const [coefficient, setCoefficient] = useState('3');

  const result = computeCulvertDesign({
    head: Number(head) || 0,
    width: Number(width) || 0,
    coefficient: Number(coefficient) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField
              label="Headwater depth (m)"
              value={head}
              onChange={setHead}
              min={0}
              step="0.1"
            />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Culvert width (m)" value={width} onChange={setWidth} min={0} step="0.1" />
              <NumberField
                label="Discharge coefficient"
                value={coefficient}
                onChange={setCoefficient}
                min={0}
                step="0.1"
              />
            </div>
          </div>
          <Hint>
            Weir flow applies while the inlet unsubmerged: Q = C·L·H^1.5. Once headwater covers the opening the
            orifice equation takes over instead.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Culvert discharge"
            value={`${formatMoney(result.discharge)} m³/s`}
            sub="Weir flow at the inlet"
          />
          <ResultRows>
            <ResultRow label="Flow area (m²)" value={formatMoney(result.flowArea)} />
            <ResultRow label="Unit discharge (m²/s)" value={formatMoney(result.unitDischarge)} />
            <ResultRow label="Inlet velocity (m/s)" value={formatMoney(result.velocity)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default CulvertDesignCalculator;
