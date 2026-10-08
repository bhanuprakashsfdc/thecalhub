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

export interface FocalLengthInput {
  sensorSize: number;
  angleOfView: number;
  focusDistance: number;
}

export function computeFocalLength(input: FocalLengthInput) {
  const sensor = Math.max(0, input.sensorSize);
  const angle = Math.min(179, Math.max(1, input.angleOfView));
  const distance = Math.max(0, input.focusDistance);

  const halfRad = ((angle / 2) * Math.PI) / 180;
  const focal = sensor / (2 * Math.tan(halfRad));
  const widthCovered = focal > 0 ? (sensor * distance * 1000) / focal : 0;

  return { focal, halfAngle: angle / 2, widthCovered };
}

export function FocalLengthCalculator() {
  const [sensorSize, setSensorSize] = useState('36');
  const [angleOfView, setAngleOfView] = useState('40');
  const [focusDistance, setFocusDistance] = useState('5');

  const result = computeFocalLength({
    sensorSize: Number(sensorSize) || 0,
    angleOfView: Number(angleOfView) || 0,
    focusDistance: Number(focusDistance) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Sensor size (mm)" value={sensorSize} onChange={setSensorSize} min={0} step="0.1" />
            <NumberField label="Angle of view (degrees)" value={angleOfView} onChange={setAngleOfView} min={1} max={179} step="0.1" />
            <NumberField label="Focus distance (m)" value={focusDistance} onChange={setFocusDistance} min={0} step="0.1" />
          </div>
          <Hint>
            Focal length = sensor size ÷ (2 × tan(angle ÷ 2)). Longer focal lengths narrow the angle of view and
            magnify distant subjects.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Focal length"
            value={`${formatMoney(result.focal)} mm`}
            sub={`For a ${angleOfView || 0}° field of view`}
          />
          <ResultRows>
            <ResultRow label="Half angle of view" value={`${formatMoney(result.halfAngle)}°`} />
            <ResultRow label="Width covered at focus distance" value={`${formatMoney(result.widthCovered)} mm`} />
            <ResultRow label="Sensor size used" value={`${formatMoney(Number(sensorSize) || 0)} mm`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default FocalLengthCalculator;
