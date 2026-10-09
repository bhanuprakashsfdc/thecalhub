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

export interface ShipStabilityInput {
  kb: number;
  displacementVolume: number;
  waterplaneInertia: number;
  kg: number;
  radiusGyration: number;
  heelAngleDeg: number;
}

export interface ShipStabilityResult {
  bm: number;
  km: number;
  gm: number;
  gz: number;
  rollPeriod: number;
  lollAngleDeg: number;
}

const positive = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);
const G = 9.81;

export function computeShipStability(input: ShipStabilityInput): ShipStabilityResult {
  const kb = positive(input.kb);
  const displacementVolume = positive(input.displacementVolume);
  const waterplaneInertia = positive(input.waterplaneInertia);
  const kg = positive(input.kg);
  const radiusGyration = positive(input.radiusGyration);
  const heel = (Number.isFinite(input.heelAngleDeg) ? input.heelAngleDeg : 0) * (Math.PI / 180);

  const bm = safeDiv(waterplaneInertia, displacementVolume);
  const km = kb + bm;
  const gm = km - kg;
  const tan = Math.tan(heel);
  const gz = Math.sin(heel) * (gm + 0.5 * bm * tan * tan);
  const rollPeriod = gm > 0 && radiusGyration > 0 ? (2 * Math.PI * radiusGyration) / Math.sqrt(G * gm) : 0;
  let lollAngleDeg = 0;
  if (gm < 0 && bm > 0) {
    const t = Math.sqrt((-2 * gm) / bm);
    lollAngleDeg = (Math.atan(t) * 180) / Math.PI;
  }

  return { bm, km, gm, gz, rollPeriod, lollAngleDeg };
}

const toNumber = (raw: string) => {
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : 0;
};

export function ShipStabilityCalculator() {
  const [kb, setKb] = useState('4');
  const [volume, setVolume] = useState('8000');
  const [inertia, setInertia] = useState('12000');
  const [kg, setKg] = useState('4.2');
  const [gyration, setGyration] = useState('6');
  const [heel, setHeel] = useState('15');

  const result = computeShipStability({
    kb: toNumber(kb),
    displacementVolume: toNumber(volume),
    waterplaneInertia: toNumber(inertia),
    kg: toNumber(kg),
    radiusGyration: toNumber(gyration),
    heelAngleDeg: Number(heel) || 0,
  });

  const stabilityStatus =
    result.gm > 0.15 ? 'Stable' : result.gm > 0 ? 'Marginal' : result.gm < 0 ? 'Unstable — angle of loll' : 'Neutral';

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="KB — centre of buoyancy above keel (m)" value={kb} onChange={setKb} min={0} step="0.1" />
              <NumberField label="KG — centre of gravity above keel (m)" value={kg} onChange={setKg} min={0} step="0.1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField
                label="Displaced volume ∇ (m³)"
                value={volume}
                onChange={setVolume}
                min={0}
                hint="Volume of water displaced by the hull."
              />
              <NumberField
                label="Waterplane moment of inertia I (m⁴)"
                value={inertia}
                onChange={setInertia}
                min={0}
                hint="Second moment of the waterplane area about the centreline."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Radius of gyration k (m)" value={gyration} onChange={setGyration} min={0} step="0.1" />
              <NumberField label="Heel angle θ (°)" value={heel} onChange={setHeel} min={0} step="1" />
            </div>
          </div>
          <Hint>
            Metacentric radius BM = I/∇ and KM = KB + BM; metacentric height GM = KM − KG. A positive GM means
            the ship is upright-stable, and the roll period shortens as GM grows.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Metacentric height GM"
            value={`${formatMoney(result.gm)} m`}
            sub={stabilityStatus}
          />
          <ResultRows>
            <ResultRow label="Metacentric radius BM" value={`${formatMoney(result.bm)} m`} />
            <ResultRow label="Metacentre height KM" value={`${formatMoney(result.km)} m`} />
            <ResultRow label="Righting lever GZ at heel angle" value={`${formatMoney(result.gz)} m`} />
            <ResultRow label="Natural roll period" value={result.rollPeriod > 0 ? `${formatMoney(result.rollPeriod)} s` : '—'} />
            <ResultRow
              label="Angle of loll (GM < 0)"
              value={result.lollAngleDeg > 0 ? `${formatMoney(result.lollAngleDeg)}°` : '—'}
            />
          </ResultRows>
          <Hint>
            GZ uses the wall-sided formula GZ = sin θ (GM + ½·BM·tan²θ). When GM is negative the ship finds a
            rest angle, the angle of loll, from tan θ = √(−2·GM/BM).
          </Hint>
        </Panel>
      }
    />
  );
}

export default ShipStabilityCalculator;
