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

export interface TaskDurationInput {
  estimatedHours: number;
  complexity: 'low' | 'medium' | 'high';
  interruptions: number;
}

const COMPLEXITY_FACTOR: Record<TaskDurationInput['complexity'], number> = {
  low: 1.2,
  medium: 1.5,
  high: 2.0,
};

export function computeTaskDuration(input: TaskDurationInput) {
  const adjusted = input.estimatedHours * COMPLEXITY_FACTOR[input.complexity];
  const buffer = adjusted * 0.25;
  const total = adjusted + buffer + input.interruptions * 0.25;
  const days = total / 8;
  return { adjusted, buffer, total, days };
}

export function TaskDurationCalculator() {
  const [estimatedHours, setEstimatedHours] = useState('8');
  const [complexity, setComplexity] = useState<TaskDurationInput['complexity']>('medium');
  const [interruptions, setInterruptions] = useState('2');

  const result = useMemo(
    () =>
      computeTaskDuration({
        estimatedHours: Number(estimatedHours) || 0,
        complexity,
        interruptions: Number(interruptions) || 0,
      }),
    [estimatedHours, complexity, interruptions]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Estimated hours" value={estimatedHours} onChange={setEstimatedHours} min={0} step="0.5" />
            <div className="block">
              <span className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Complexity</span>
              <div className="flex flex-wrap gap-2">
                {(['low', 'medium', 'high'] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    role="radio"
                    aria-checked={complexity === opt}
                    onClick={() => setComplexity(opt)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      complexity === opt
                        ? 'bg-primary-fixed text-on-primary-fixed'
                        : 'bg-surface-container-highest text-neutral-400 hover:text-white'
                    }`}
                  >
                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <NumberField label="Expected interruptions" value={interruptions} onChange={setInterruptions} min={0} step="1" />
          </div>
          <Hint>
            Real task time = base estimate × complexity factor + 25% buffer + 15 minutes per
            interruption. Convert to working days assuming an 8-hour day.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Total task duration"
            value={`${formatMoney(result.total)} hours`}
            sub={`${formatMoney(result.days)} working days`}
          />
          <ResultRows>
            <ResultRow label="Complexity-adjusted" value={`${formatMoney(result.adjusted)} h`} />
            <ResultRow label="Buffer (25%)" value={`${formatMoney(result.buffer)} h`} />
            <ResultRow label="Interruption cost" value={`${formatMoney(result.total - result.adjusted - result.buffer)} h`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default TaskDurationCalculator;