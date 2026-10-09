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
  safeDiv,
} from './kit';

export interface CoordinateDistanceInput {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface CoordinateDistanceResult {
  distance: number;
  dx: number;
  dy: number;
  manhattan: number;
  midX: number;
  midY: number;
  angleDeg: number;
  slope: number;
}

const finite = (n: number) => (Number.isFinite(n) ? n : 0);

export function computeCoordinateDistance(input: CoordinateDistanceInput): CoordinateDistanceResult {
  const x1 = finite(input.x1);
  const y1 = finite(input.y1);
  const x2 = finite(input.x2);
  const y2 = finite(input.y2);

  const dx = x2 - x1;
  const dy = y2 - y1;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

  return {
    distance,
    dx,
    dy,
    manhattan: Math.abs(dx) + Math.abs(dy),
    midX: (x1 + x2) / 2,
    midY: (y1 + y2) / 2,
    angleDeg: ((angle % 360) + 360) % 360,
    slope: safeDiv(dy, dx),
  };
}

const toNumber = (raw: string) => {
  const n = Number(raw);
  return Number.isFinite(n) ? n : 0;
};

export function CoordinateDistanceCalculator() {
  const [x1, setX1] = useState('0');
  const [y1, setY1] = useState('0');
  const [x2, setX2] = useState('3');
  const [y2, setY2] = useState('4');

  const result = computeCoordinateDistance({
    x1: toNumber(x1),
    y1: toNumber(y1),
    x2: toNumber(x2),
    y2: toNumber(y2),
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="X of point A" value={x1} onChange={setX1} step="0.1" />
              <NumberField label="Y of point A" value={y1} onChange={setY1} step="0.1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="X of point B" value={x2} onChange={setX2} step="0.1" />
              <NumberField label="Y of point B" value={y2} onChange={setY2} step="0.1" />
            </div>
          </div>
          <Hint>
            The straight-line distance uses the Pythagorean form sqrt((x₂ − x₁)² + (y₂ − y₁)²), so points at
            (0, 0) and (3, 4) are exactly 5 units apart.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Straight-line distance"
            value={formatMoney(result.distance)}
            sub={`From (${formatMoney(toNumber(x1))}, ${formatMoney(toNumber(y1))}) to (${formatMoney(toNumber(x2))}, ${formatMoney(toNumber(y2))})`}
          />
          <ResultRows>
            <ResultRow label="Difference in x" value={formatMoney(result.dx)} />
            <ResultRow label="Difference in y" value={formatMoney(result.dy)} />
            <ResultRow
              label="Midpoint"
              value={`(${formatMoney(result.midX)}, ${formatMoney(result.midY)})`}
            />
            <ResultRow label="Manhattan distance" value={formatMoney(result.manhattan)} />
            <ResultRow label="Angle from point A" value={`${formatMoney(result.angleDeg, 1)}°`} />
            <ResultRow label="Slope of the line" value={formatMoney(result.slope, 4)} />
          </ResultRows>
          <Hint>
            Manhattan distance adds the two axis gaps instead of cutting the corner, and the angle is measured
            counter-clockwise from the positive x axis and normalised into a full turn.
          </Hint>
        </Panel>
      }
    />
  );
}

export default CoordinateDistanceCalculator;
