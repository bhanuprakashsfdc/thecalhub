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

export interface CarpetInput {
  roomArea: number;
  carpetWidth: number;
  carpetLength: number;
  carpetPrice: number;
  wastePercent: number;
}

export function computeCarpet(input: CarpetInput) {
  const usablePerRoll = input.carpetWidth * input.carpetLength;
  const neededRolls = Math.ceil(input.roomArea / usablePerRoll);
  const areaWithWaste = input.roomArea * (1 + input.wastePercent / 100);
  const neededRollsWaste = Math.ceil(areaWithWaste / usablePerRoll);
  const cost = neededRollsWaste * input.carpetPrice;
  const extraArea = neededRollsWaste * usablePerRoll - input.roomArea;
  return { usablePerRoll, neededRolls, neededRollsWaste, cost, extraArea };
}

export function CarpetCalculator() {
  const [roomArea, setRoomArea] = useState('20');
  const [carpetWidth, setCarpetWidth] = useState('4');
  const [carpetLength, setCarpetLength] = useState('30');
  const [carpetPrice, setCarpetPrice] = useState('150');
  const [wastePercent, setWastePercent] = useState('10');

  const result = useMemo(
    () =>
      computeCarpet({
        roomArea: Number(roomArea) || 0,
        carpetWidth: Number(carpetWidth) || 0,
        carpetLength: Number(carpetLength) || 0,
        carpetPrice: Number(carpetPrice) || 0,
        wastePercent: Number(wastePercent) || 0,
      }),
    [roomArea, carpetWidth, carpetLength, carpetPrice, wastePercent]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Room area (m²)" value={roomArea} onChange={setRoomArea} min={0} step="1" />
            <NumberField label="Carpet roll width (m)" value={carpetWidth} onChange={setCarpetWidth} min={0} step="0.5" />
            <NumberField label="Carpet roll length (m)" value={carpetLength} onChange={setCarpetLength} min={0} step="1" />
            <NumberField label="Price per roll ($)" value={carpetPrice} onChange={setCarpetPrice} min={0} step="10" />
            <NumberField label="Waste allowance (%)" value={wastePercent} onChange={setWastePercent} min={0} step="1" />
          </div>
          <Hint>
            Carpet is sold by the roll. Each roll covers width × length. Add a waste allowance for
            cuts and pattern matching, then round up to the nearest whole roll.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Carpet cost"
            value={`${formatMoney(result.cost)}`}
            sub={`${result.neededRollsWaste} rolls`}
          />
          <ResultRows>
            <ResultRow label="Usable area per roll" value={`${formatMoney(result.usablePerRoll)} m²`} />
            <ResultRow label="Rolls needed (no waste)" value={`${result.neededRolls}`} />
            <ResultRow label="Rolls needed (with waste)" value={`${result.neededRollsWaste}`} />
            <ResultRow label="Extra area" value={`${formatMoney(result.extraArea)} m²`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default CarpetCalculator;