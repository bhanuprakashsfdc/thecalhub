import { useState } from 'react';
import {
  CalcGrid,
  Panel,
  PanelEyebrow,
  NumberField,
  SelectField,
  ResultHero,
  ResultRows,
  ResultRow,
  Hint,
  formatMoney,
} from './kit';

const whole = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 0 });

export interface SeatingCapacityInput {
  roomLengthFt: number;
  roomWidthFt: number;
  style: string;
  serviceAreaSqFt: number;
}

export function computeSeatingCapacity(input: SeatingCapacityInput) {
  const length = Math.max(0, input.roomLengthFt);
  const width = Math.max(0, input.roomWidthFt);
  const spacePerGuest = Math.max(1, Number(input.style) || 12);
  const serviceArea = Math.max(0, input.serviceAreaSqFt);

  const roomArea = length * width;
  const usable = Math.max(0, roomArea - serviceArea);
  const capacity = Math.floor(usable / spacePerGuest);

  return { roomArea, usable, capacity, spacePerGuest };
}

export function SeatingCapacityCalculator() {
  const [roomLengthFt, setRoomLengthFt] = useState('40');
  const [roomWidthFt, setRoomWidthFt] = useState('30');
  const [style, setStyle] = useState('12');
  const [serviceAreaSqFt, setServiceAreaSqFt] = useState('100');

  const result = computeSeatingCapacity({
    roomLengthFt: Number(roomLengthFt) || 0,
    roomWidthFt: Number(roomWidthFt) || 0,
    style,
    serviceAreaSqFt: Number(serviceAreaSqFt) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Room length (ft)" value={roomLengthFt} onChange={setRoomLengthFt} min={0} />
              <NumberField label="Room width (ft)" value={roomWidthFt} onChange={setRoomWidthFt} min={0} />
            </div>
            <SelectField
              label="Seating style"
              value={style}
              onChange={setStyle}
              options={[
                { value: '12', label: 'Banquet tables (12 sq ft/guest)' },
                { value: '15', label: 'Round tables (15 sq ft/guest)' },
                { value: '8', label: 'Theatre rows (8 sq ft/guest)' },
                { value: '5', label: 'Cocktail / standing (5 sq ft/guest)' },
                { value: '4.5', label: 'Dance floor only (4.5 sq ft/guest)' },
              ]}
            />
            <NumberField
              label="Stage, bar & buffet (sq ft)"
              value={serviceAreaSqFt}
              onChange={setServiceAreaSqFt}
              min={0}
            />
          </div>
          <Hint>
            Subtract the stage, bar and buffet before dividing by the space factor for your seating style — the
            remaining floor area is what guests actually occupy.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Guest capacity"
            value={whole(result.capacity)}
            sub={`${formatMoney(result.spacePerGuest)} sq ft allowed per guest`}
          />
          <ResultRows>
            <ResultRow label="Usable floor area" value={`${formatMoney(result.usable)} sq ft`} />
            <ResultRow label="Room area" value={`${formatMoney(result.roomArea)} sq ft`} />
            <ResultRow label="Reserved service area" value={`${Number(serviceAreaSqFt) || 0} sq ft`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default SeatingCapacityCalculator;
