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

export interface IntersectionDesignInput {
  lanes: number;
  saturationFlow: number;
  volume: number;
}

const LOS_LIMITS = [0.35, 0.55, 0.75, 0.9, 1];

export function computeIntersectionDesign(input: IntersectionDesignInput) {
  const capacity = Math.max(0, input.lanes) * input.saturationFlow;
  const vc = safeDiv(input.volume, capacity);
  const losIndex = LOS_LIMITS.findIndex((limit) => vc <= limit) + 1;
  const los = losIndex > 0 ? losIndex : 6;
  const greenShare = vc * 100;
  return { capacity, vc, los, greenShare };
}

export function IntersectionDesignCalculator() {
  const [lanes, setLanes] = useState('2');
  const [saturationFlow, setSaturationFlow] = useState('1900');
  const [volume, setVolume] = useState('900');

  const result = computeIntersectionDesign({
    lanes: Number(lanes) || 0,
    saturationFlow: Number(saturationFlow) || 0,
    volume: Number(volume) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Approach lanes" value={lanes} onChange={setLanes} min={0} />
              <NumberField
                label="Saturation flow (pc/h/ln)"
                value={saturationFlow}
                onChange={setSaturationFlow}
                min={0}
              />
            </div>
            <NumberField
              label="Peak hour volume (veh/h)"
              value={volume}
              onChange={setVolume}
              min={0}
            />
          </div>
          <Hint>
            Level of service grades the volume-to-capacity ratio: A below 0.35 through F above 1.0, where the
            approach is oversaturated.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Volume to capacity"
            value={formatMoney(result.vc)}
            sub={`Level of service ${result.los === 6 ? 'F' : String.fromCharCode(64 + result.los)}`
            }
          />
          <ResultRows>
            <ResultRow label="Approach capacity (veh/h)" value={formatMoney(result.capacity)} />
            <ResultRow label="Level of service (1-6)" value={formatMoney(result.los)} />
            <ResultRow label="Capacity used (%)" value={formatMoney(result.greenShare)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default IntersectionDesignCalculator;
