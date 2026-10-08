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
} from './kit';

const whole = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 0 });

export interface GuestListInput {
  immediateFamily: number;
  extendedFamily: number;
  friends: number;
  colleagues: number;
  plusOnes: number;
  children: number;
  tableSize: number;
}

export function computeGuestList(input: GuestListInput) {
  const immediate = Math.max(0, input.immediateFamily);
  const extended = Math.max(0, input.extendedFamily);
  const friends = Math.max(0, input.friends);
  const colleagues = Math.max(0, input.colleagues);
  const plusOnes = Math.max(0, input.plusOnes);
  const children = Math.max(0, input.children);
  const tableSize = Math.max(1, input.tableSize);

  const total = immediate + extended + friends + colleagues + plusOnes + children;
  const adults = Math.max(0, total - children);
  const tables = Math.ceil(total / tableSize);

  return { total, adults, tables };
}

export function GuestListCalculator() {
  const [immediateFamily, setImmediateFamily] = useState('20');
  const [extendedFamily, setExtendedFamily] = useState('30');
  const [friends, setFriends] = useState('40');
  const [colleagues, setColleagues] = useState('15');
  const [plusOnes, setPlusOnes] = useState('10');
  const [children, setChildren] = useState('5');
  const [tableSize, setTableSize] = useState('8');

  const result = computeGuestList({
    immediateFamily: Number(immediateFamily) || 0,
    extendedFamily: Number(extendedFamily) || 0,
    friends: Number(friends) || 0,
    colleagues: Number(colleagues) || 0,
    plusOnes: Number(plusOnes) || 0,
    children: Number(children) || 0,
    tableSize: Number(tableSize) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Immediate family" value={immediateFamily} onChange={setImmediateFamily} min={0} />
              <NumberField label="Extended family" value={extendedFamily} onChange={setExtendedFamily} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Friends" value={friends} onChange={setFriends} min={0} />
              <NumberField label="Colleagues" value={colleagues} onChange={setColleagues} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Plus-ones" value={plusOnes} onChange={setPlusOnes} min={0} />
              <NumberField label="Children" value={children} onChange={setChildren} min={0} />
            </div>
            <NumberField label="Seats per table" value={tableSize} onChange={setTableSize} min={1} />
          </div>
          <Hint>
            Track plus-ones separately from the primary invitee so headcount stays accurate when a household
            replies with extra names.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Total guests"
            value={whole(result.total)}
            sub={`${result.tables} table(s) of ${Number(tableSize) || 0}`}
          />
          <ResultRows>
            <ResultRow label="Adults" value={whole(result.adults)} />
            <ResultRow label="Children" value={whole(Math.max(0, Number(children) || 0))} />
            <ResultRow label="Tables needed" value={whole(result.tables)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default GuestListCalculator;
