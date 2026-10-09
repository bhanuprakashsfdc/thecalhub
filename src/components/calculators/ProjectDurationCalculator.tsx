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

export interface ProjectDurationInput {
  taskHours: number;
  members: number;
  hoursPerDay: number;
  efficiency: number;
}

export function computeProjectDuration(input: ProjectDurationInput) {
  const dailyCapacity =
    input.members * input.hoursPerDay * (input.efficiency / 100);
  const days = dailyCapacity > 0 ? input.taskHours / dailyCapacity : 0;
  const personDays = input.hoursPerDay > 0 ? input.taskHours / input.hoursPerDay : 0;
  const weeks = days / 5;
  return { dailyCapacity, days, personDays, weeks };
}

export function ProjectDurationCalculator() {
  const [taskHours, setTaskHours] = useState('480');
  const [members, setMembers] = useState('4');
  const [hoursPerDay, setHoursPerDay] = useState('8');
  const [efficiency, setEfficiency] = useState('90');

  const result = computeProjectDuration({
    taskHours: Number(taskHours) || 0,
    members: Number(members) || 0,
    hoursPerDay: Number(hoursPerDay) || 0,
    efficiency: Number(efficiency) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Total task hours" value={taskHours} onChange={setTaskHours} min={0} />
            <NumberField label="Team members" value={members} onChange={setMembers} min={0} step="1" />
            <NumberField label="Hours per day" value={hoursPerDay} onChange={setHoursPerDay} min={0} step="0.5" />
            <NumberField label="Efficiency (%)" value={efficiency} onChange={setEfficiency} min={0} max={100} step="1" />
          </div>
          <Hint>
            Duration = task hours ÷ (members × hours/day × efficiency).
            Calendar weeks assume a five-day working week.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Project duration"
            value={`${formatMoney(result.days)} days`}
            sub="Working days"
          />
          <ResultRows>
            <ResultRow label="Daily capacity (hours)" value={formatMoney(result.dailyCapacity)} />
            <ResultRow label="Person-days of work" value={formatMoney(result.personDays)} />
            <ResultRow label="Calendar weeks (5-day week)" value={formatMoney(result.weeks)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ProjectDurationCalculator;
