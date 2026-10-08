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

export interface IrrigationInput {
  flowRateLpm: number;
  areaSqM: number;
  depthMm: number;
}

export function computeIrrigation(input: IrrigationInput) {
  const flow = Math.max(0, input.flowRateLpm);
  const area = Math.max(0, input.areaSqM);
  const depth = Math.max(0, input.depthMm);

  const volumeL = depth * area;
  const runtimeMin = flow > 0 ? volumeL / flow : 0;
  const gallons = volumeL / 3.78541;

  return { volumeL, runtimeMin, gallons, flow, depth };
}

export function IrrigationCalculator() {
  const [flowRateLpm, setFlowRateLpm] = useState('100');
  const [areaSqM, setAreaSqM] = useState('200');
  const [depthMm, setDepthMm] = useState('10');

  const result = computeIrrigation({
    flowRateLpm: Number(flowRateLpm) || 0,
    areaSqM: Number(areaSqM) || 0,
    depthMm: Number(depthMm) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Flow rate (L/min)" value={flowRateLpm} onChange={setFlowRateLpm} min={0} />
              <NumberField label="Field area (m²)" value={areaSqM} onChange={setAreaSqM} min={0} />
            </div>
            <NumberField label="Target depth (mm)" value={depthMm} onChange={setDepthMm} min={0} step="0.5" />
          </div>
          <Hint>
            One millimetre of water over one square metre is one litre, so depth × area gives the volume.
            Divide by the flow rate to get the runtime for a single pass.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Water to apply"
            value={`${formatMoney(result.volumeL)} L`}
            sub={`${formatMoney(result.runtimeMin, 1)} minutes of runtime`}
          />
          <ResultRows>
            <ResultRow label="Runtime" value={`${formatMoney(result.runtimeMin, 1)} min`} />
            <ResultRow label="Gallons" value={formatMoney(result.gallons)} />
            <ResultRow label="Flow rate" value={`${formatMoney(result.flow, 0)} L/min`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default IrrigationCalculator;
