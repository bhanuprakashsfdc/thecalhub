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

export interface TurningRadiusInput {
  wheelbase: number;
  steeringAngle: number;
  width: number;
}

export function computeTurningRadius(input: TurningRadiusInput) {
  const radians = (input.steeringAngle * Math.PI) / 180;
  const tangent = Math.tan(radians);
  const centre = tangent !== 0 ? input.wheelbase / tangent : 0;
  const outer = centre + input.width / 2;
  const inner = centre - input.width / 2;
  const diameter = centre * 2;
  return { centre, outer, inner, diameter };
}

export function TurningRadiusCalculator() {
  const [wheelbase, setWheelbase] = useState('3');
  const [steeringAngle, setSteeringAngle] = useState('30');
  const [width, setWidth] = useState('1.8');

  const result = computeTurningRadius({
    wheelbase: Number(wheelbase) || 0,
    steeringAngle: Number(steeringAngle) || 0,
    width: Number(width) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Wheelbase (m)" value={wheelbase} onChange={setWheelbase} min={0} step="0.1" />
              <NumberField
                label="Steering angle (degrees)"
                value={steeringAngle}
                onChange={setSteeringAngle}
                min={0}
                max={60}
              />
            </div>
            <NumberField label="Vehicle width (m)" value={width} onChange={setWidth} min={0} step="0.1" />
          </div>
          <Hint>
            The turning circle follows R = L / tan(δ) about the rear axle centreline; add half the vehicle width
            for the outer front corner path.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Centreline radius"
            value={`${formatMoney(result.centre)} m`}
            sub={`${formatMoney(result.diameter)} m turning diameter`
            }
          />
          <ResultRows>
            <ResultRow label="Outer radius (m)" value={formatMoney(result.outer)} />
            <ResultRow label="Inner radius (m)" value={formatMoney(result.inner)} />
            <ResultRow label="Turning diameter (m)" value={formatMoney(result.diameter)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default TurningRadiusCalculator;
