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

export interface GroutInput {
  tileLengthIn: number;
  tileWidthIn: number;
  jointWidthIn: number;
  areaSqFt: number;
  depthIn: number;
  densityLbPerFt3: number;
  bagWeightLb: number;
}

export function computeGrout(input: GroutInput) {
  const length = Math.max(0.1, input.tileLengthIn);
  const width = Math.max(0.1, input.tileWidthIn);
  const joint = Math.max(0, input.jointWidthIn);
  const area = Math.max(0, input.areaSqFt);
  const depth = Math.max(0, input.depthIn);
  const density = Math.max(0, input.densityLbPerFt3);
  const bagWeight = Math.max(1, input.bagWeightLb);

  const groutAreaPerSqFt = 144 * (1 - (length * width) / ((length + joint) * (width + joint)));
  const volumePerSqFt = groutAreaPerSqFt * depth;
  const volumeIn3 = area * volumePerSqFt;
  const pounds = (volumeIn3 / 1728) * density;
  const bags = Math.ceil(pounds / bagWeight);

  return { volumePerSqFt, volumeIn3, pounds, bags };
}

export function GroutCalculator() {
  const [tileLengthIn, setTileLengthIn] = useState('12');
  const [tileWidthIn, setTileWidthIn] = useState('12');
  const [jointWidthIn, setJointWidthIn] = useState('0.25');
  const [areaSqFt, setAreaSqFt] = useState('100');
  const [depthIn, setDepthIn] = useState('0.25');
  const [densityLbPerFt3, setDensityLbPerFt3] = useState('100');
  const [bagWeightLb, setBagWeightLb] = useState('10');

  const result = computeGrout({
    tileLengthIn: Number(tileLengthIn) || 0,
    tileWidthIn: Number(tileWidthIn) || 0,
    jointWidthIn: Number(jointWidthIn) || 0,
    areaSqFt: Number(areaSqFt) || 0,
    depthIn: Number(depthIn) || 0,
    densityLbPerFt3: Number(densityLbPerFt3) || 0,
    bagWeightLb: Number(bagWeightLb) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Tile length (in)" value={tileLengthIn} onChange={setTileLengthIn} min={0.1} />
              <NumberField label="Tile width (in)" value={tileWidthIn} onChange={setTileWidthIn} min={0.1} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Joint width (in)" value={jointWidthIn} onChange={setJointWidthIn} min={0} step="0.0625" />
              <NumberField label="Grout depth (in)" value={depthIn} onChange={setDepthIn} min={0} step="0.0625" />
            </div>
            <NumberField label="Floor area (sq ft)" value={areaSqFt} onChange={setAreaSqFt} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField
                label="Grout density (lb/ft³)"
                value={densityLbPerFt3}
                onChange={setDensityLbPerFt3}
                min={0}
              />
              <NumberField label="Bag weight (lb)" value={bagWeightLb} onChange={setBagWeightLb} min={1} />
            </div>
          </div>
          <Hint>
            Grout volume is the joint area per square foot (144 in² minus the tile footprint) times the joint
            depth. Buy an extra bag for colour matching on large floors.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Grout needed"
            value={`${formatMoney(result.pounds)} lb`}
            sub={`${result.bags} bag(s) of ${Number(bagWeightLb) || 0} lb`}
          />
          <ResultRows>
            <ResultRow label="Grout volume" value={`${formatMoney(result.volumeIn3)} in³`} />
            <ResultRow label="Volume per sq ft" value={`${formatMoney(result.volumePerSqFt)} in³`} />
            <ResultRow label="Floor area" value={`${Number(areaSqFt) || 0} sq ft`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default GroutCalculator;
