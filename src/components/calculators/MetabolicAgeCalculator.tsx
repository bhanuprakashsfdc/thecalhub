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

export interface MetabolicAgeInput {
  chronologicalAge: number;
  restingHeartRate: number;
  vo2Max: number;
  activityLevel: 'sedentary' | 'active' | 'athlete';
}

const ACTIVITY_BONUS: Record<MetabolicAgeInput['activityLevel'], number> = {
  sedentary: 0,
  active: -5,
  athlete: -10,
};

export function computeMetabolicAge(input: MetabolicAgeInput) {
  const vo2Adjust = (input.vo2Max - 30) * 0.5;
  const hrAdjust = (70 - input.restingHeartRate) * 0.3;
  const activityAdjust = ACTIVITY_BONUS[input.activityLevel];
  const metabolicAge = input.chronologicalAge + vo2Adjust + hrAdjust + activityAdjust;
  return { metabolicAge, vo2Adjust, hrAdjust, activityAdjust };
}

export function MetabolicAgeCalculator() {
  const [chronologicalAge, setChronologicalAge] = useState('40');
  const [restingHeartRate, setRestingHeartRate] = useState('60');
  const [vo2Max, setVo2Max] = useState('40');
  const [activityLevel, setActivityLevel] = useState<MetabolicAgeInput['activityLevel']>('active');

  const result = useMemo(
    () =>
      computeMetabolicAge({
        chronologicalAge: Number(chronologicalAge) || 0,
        restingHeartRate: Number(restingHeartRate) || 0,
        vo2Max: Number(vo2Max) || 0,
        activityLevel,
      }),
    [chronologicalAge, restingHeartRate, vo2Max, activityLevel]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Chronological age" value={chronologicalAge} onChange={setChronologicalAge} min={1} step="1" />
            <NumberField label="Resting heart rate (bpm)" value={restingHeartRate} onChange={setRestingHeartRate} min={1} step="1" />
            <NumberField label="VO₂ max (ml/kg/min)" value={vo2Max} onChange={setVo2Max} min={1} step="1" />
            <div className="block">
              <span className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Activity level</span>
              <div className="flex flex-wrap gap-2">
                {(['sedentary', 'active', 'athlete'] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    role="radio"
                    aria-checked={activityLevel === opt}
                    onClick={() => setActivityLevel(opt)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      activityLevel === opt
                        ? 'bg-primary-fixed text-on-primary-fixed'
                        : 'bg-surface-container-highest text-neutral-400 hover:text-white'
                    }`}
                  >
                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <Hint>
            Metabolic age estimates how your body is aging based on fitness markers. Higher VO₂
            max and lower resting heart rate pull the estimate down; an active lifestyle adds a
            bonus.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Metabolic age"
            value={formatMoney(result.metabolicAge)}
            sub={`Chronological ${formatMoney(Number(chronologicalAge))}`}
          />
          <ResultRows>
            <ResultRow label="VO₂ adjustment" value={formatMoney(result.vo2Adjust)} />
            <ResultRow label="Heart rate adjustment" value={formatMoney(result.hrAdjust)} />
            <ResultRow label="Activity bonus" value={formatMoney(result.activityAdjust)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default MetabolicAgeCalculator;