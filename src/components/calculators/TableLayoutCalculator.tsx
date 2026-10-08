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

export interface TableLayoutInput {
  roomLengthFt: number;
  roomWidthFt: number;
  tableLengthFt: number;
  tableWidthFt: number;
  gapFt: number;
  seatsPerTable: number;
}

export function computeTableLayout(input: TableLayoutInput) {
  const roomLength = Math.max(1, input.roomLengthFt);
  const roomWidth = Math.max(1, input.roomWidthFt);
  const tableLength = Math.max(0.5, input.tableLengthFt);
  const tableWidth = Math.max(0.5, input.tableWidthFt);
  const gap = Math.max(0, input.gapFt);
  const seats = Math.max(1, input.seatsPerTable);

  const along = Math.floor((roomLength + gap) / (tableLength + gap));
  const across = Math.floor((roomWidth + gap) / (tableWidth + gap));
  const tables = Math.max(0, along * across);
  const capacity = tables * seats;

  const roomArea = roomLength * roomWidth;
  const tableArea = tables * tableLength * tableWidth;
  const percentUsed = roomArea > 0 ? (tableArea / roomArea) * 100 : 0;

  return { along, across, tables, capacity, roomArea, tableArea, percentUsed };
}

export function TableLayoutCalculator() {
  const [roomLengthFt, setRoomLengthFt] = useState('40');
  const [roomWidthFt, setRoomWidthFt] = useState('30');
  const [tableLengthFt, setTableLengthFt] = useState('6');
  const [tableWidthFt, setTableWidthFt] = useState('2.5');
  const [gapFt, setGapFt] = useState('2');
  const [seatsPerTable, setSeatsPerTable] = useState('8');

  const result = computeTableLayout({
    roomLengthFt: Number(roomLengthFt) || 0,
    roomWidthFt: Number(roomWidthFt) || 0,
    tableLengthFt: Number(tableLengthFt) || 0,
    tableWidthFt: Number(tableWidthFt) || 0,
    gapFt: Number(gapFt) || 0,
    seatsPerTable: Number(seatsPerTable) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Room length (ft)" value={roomLengthFt} onChange={setRoomLengthFt} min={1} />
              <NumberField label="Room width (ft)" value={roomWidthFt} onChange={setRoomWidthFt} min={1} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Table length (ft)" value={tableLengthFt} onChange={setTableLengthFt} min={0.5} />
              <NumberField label="Table width (ft)" value={tableWidthFt} onChange={setTableWidthFt} min={0.5} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Aisle gap (ft)" value={gapFt} onChange={setGapFt} min={0} />
              <NumberField label="Seats per table" value={seatsPerTable} onChange={setSeatsPerTable} min={1} />
            </div>
          </div>
          <Hint>
            Each table claims its own footprint plus the aisle gap on every side. Leave at least 3 ft behind
            seated guests for service routes.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Tables that fit"
            value={whole(result.tables)}
            sub={`${result.along} along × ${result.across} across the room`}
          />
          <ResultRows>
            <ResultRow label="Seating capacity" value={whole(result.capacity)} />
            <ResultRow label="Floor used by tables" value={`${formatMoney(result.tableArea)} sq ft`} />
            <ResultRow label="Table footprint" value={`${formatMoney(result.percentUsed)}% of the room`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default TableLayoutCalculator;
