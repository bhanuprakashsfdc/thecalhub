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

export interface FabricInput {
  pieceWidth: number;
  pieceLength: number;
  quantity: number;
  fabricWidth: number;
  wastePercent: number;
}

export function computeFabric(input: FabricInput) {
  const width = Math.max(0, input.pieceWidth);
  const length = Math.max(0, input.pieceLength);
  const quantity = Math.max(0, Math.floor(input.quantity));
  const fabricWidth = Math.max(1, input.fabricWidth);
  const waste = Math.max(0, input.wastePercent);

  const columns = width > 0 ? Math.max(1, Math.floor(fabricWidth / width)) : 1;
  const rows = quantity > 0 ? Math.ceil(quantity / columns) : 0;
  const lengthIn = rows * length * (1 + waste / 100);

  return {
    columns,
    rows,
    lengthIn,
    yards: lengthIn / 36,
    meters: lengthIn * 0.0254,
  };
}

export function FabricCalculator() {
  const [pieceWidth, setPieceWidth] = useState('12');
  const [pieceLength, setPieceLength] = useState('18');
  const [quantity, setQuantity] = useState('6');
  const [fabricWidth, setFabricWidth] = useState('44');
  const [wastePercent, setWastePercent] = useState('10');

  const result = computeFabric({
    pieceWidth: Number(pieceWidth) || 0,
    pieceLength: Number(pieceLength) || 0,
    quantity: Number(quantity) || 0,
    fabricWidth: Number(fabricWidth) || 0,
    wastePercent: Number(wastePercent) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Piece width (in)" value={pieceWidth} onChange={setPieceWidth} min={0} />
              <NumberField label="Piece length (in)" value={pieceLength} onChange={setPieceLength} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Number of pieces" value={quantity} onChange={setQuantity} min={0} />
              <NumberField label="Fabric width (in)" value={fabricWidth} onChange={setFabricWidth} min={1} />
            </div>
            <NumberField label="Waste allowance (%)" value={wastePercent} onChange={setWastePercent} min={0} />
          </div>
          <Hint>
            Pieces are laid side by side across the fabric width, then stacked down the length. Add 5–10 % waste
            for matching prints and cutting mistakes.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Fabric needed"
            value={`${formatMoney(result.yards)} yards`}
            sub={`${formatMoney(result.meters)} metres`}
          />
          <ResultRows>
            <ResultRow label="Cut length" value={`${formatMoney(result.lengthIn)} in`} />
            <ResultRow label="Pieces per row" value={`${result.columns}`} />
            <ResultRow label="Rows down the fabric" value={`${result.rows}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default FabricCalculator;
