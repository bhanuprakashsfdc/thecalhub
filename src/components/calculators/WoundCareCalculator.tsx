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

export interface WoundCareInput {
  woundArea: number;
  healingRate: number;
  dressingChangeDays: number;
}

export function computeWoundCare(input: WoundCareInput) {
  const remaining = Math.max(0, input.woundArea * (1 - input.healingRate / 100));
  const areaHealed = input.woundArea - remaining;
  const daysToHeal = input.healingRate > 0 ? input.woundArea / input.healingRate : 0;
  const changesNeeded = Math.ceil(daysToHeal / input.dressingChangeDays);
  return { remaining, areaHealed, daysToHeal, changesNeeded };
}

export function WoundCareCalculator() {
  const [woundArea, setWoundArea] = useState('4');
  const [healingRate, setHealingRate] = useState('1');
  const [dressingChangeDays, setDressingChangeDays] = useState('2');

  const result = useMemo(
    () =>
      computeWoundCare({
        woundArea: Number(woundArea) || 0,
        healingRate: Number(healingRate) || 0,
        dressingChangeDays: Number(dressingChangeDays) || 0,
      }),
    [woundArea, healingRate, dressingChangeDays]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Wound area (cm²)" value={woundArea} onChange={setWoundArea} min={0} step="0.5" />
            <NumberField label="Healing rate (cm²/day)" value={healingRate} onChange={setHealingRate} min={0} step="0.1" />
            <NumberField label="Dressing change every (days)" value={dressingChangeDays} onChange={setDressingChangeDays} min={1} step="1" />
          </div>
          <Hint>
            Track wound closure linearly: each day the wound shrinks by the healing rate. The estimate
            tells you how many dressing changes are needed before the wound closes.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Estimated days to heal"
            value={`${formatMoney(result.daysToHeal)} days`}
            sub={`Healed area ${formatMoney(result.areaHealed)} cm²`}
          />
          <ResultRows>
            <ResultRow label="Dressing changes needed" value={`${result.changesNeeded}`} />
            <ResultRow label="Remaining area" value={`${formatMoney(result.remaining)} cm²`} />
            <ResultRow label="Area healed" value={`${formatMoney(result.areaHealed)} cm²`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default WoundCareCalculator;