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

export interface SealantInput {
  jointLengthFt: number;
  beadWidthIn: number;
  beadDepthIn: number;
  tubeMl: number;
}

export function computeSealant(input: SealantInput) {
  const cmLength = Math.max(0, input.jointLengthFt) * 30.48;
  const cmWidth = Math.max(0, input.beadWidthIn) * 2.54;
  const cmDepth = Math.max(0, input.beadDepthIn) * 2.54;
  const tubeMl = Math.max(1, input.tubeMl);

  const volumeMl = cmLength * cmWidth * cmDepth;
  const tubes = Math.ceil(volumeMl / tubeMl);

  return { volumeMl, tubes, volumeFlOz: volumeMl / 29.5735, perTubeMl: tubeMl };
}

export function SealantCalculator() {
  const [jointLengthFt, setJointLengthFt] = useState('50');
  const [beadWidthIn, setBeadWidthIn] = useState('0.5');
  const [beadDepthIn, setBeadDepthIn] = useState('0.25');
  const [tubeMl, setTubeMl] = useState('300');

  const result = computeSealant({
    jointLengthFt: Number(jointLengthFt) || 0,
    beadWidthIn: Number(beadWidthIn) || 0,
    beadDepthIn: Number(beadDepthIn) || 0,
    tubeMl: Number(tubeMl) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Joint length (ft)" value={jointLengthFt} onChange={setJointLengthFt} min={0} step="0.5" />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Bead width (in)" value={beadWidthIn} onChange={setBeadWidthIn} min={0} step="0.0625" />
              <NumberField label="Bead depth (in)" value={beadDepthIn} onChange={setBeadDepthIn} min={0} step="0.0625" />
            </div>
            <NumberField label="Sealant per tube (ml)" value={tubeMl} onChange={setTubeMl} min={1} />
          </div>
          <Hint>
            Cartridge sizes are usually 280–330 ml. Tool the bead after applying so the sealant wets both sides
            of the joint rather than sitting on the surface.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Tubes required"
            value={whole(result.tubes)}
            sub={`${formatMoney(result.volumeMl)} ml of sealant needed`}
          />
          <ResultRows>
            <ResultRow label="Volume (fl oz)" value={`${formatMoney(result.volumeFlOz)} fl oz`} />
            <ResultRow label="Tube size" value={`${Number(tubeMl) || 0} ml`} />
            <ResultRow label="Joint length" value={`${Number(jointLengthFt) || 0} ft`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default SealantCalculator;
