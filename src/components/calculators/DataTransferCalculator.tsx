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

export interface DataTransferInput {
  sizeGb: number;
  speedMbps: number;
}

export function computeDataTransfer(input: DataTransferInput) {
  const seconds =
    input.speedMbps > 0 ? (input.sizeGb * 8000) / input.speedMbps : 0;
  const minutes = seconds / 60;
  const mbPerSec = input.speedMbps / 8;
  const totalMb = input.sizeGb * 1000;
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const formatted = `${hours}h ${mins}m ${secs}s`;
  return { seconds, minutes, mbPerSec, totalMb, formatted };
}

export function DataTransferCalculator() {
  const [sizeGb, setSizeGb] = useState('5');
  const [speedMbps, setSpeedMbps] = useState('100');

  const result = computeDataTransfer({
    sizeGb: Number(sizeGb) || 0,
    speedMbps: Number(speedMbps) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="File size (GB)" value={sizeGb} onChange={setSizeGb} min={0} step="0.1" />
            <NumberField label="Transfer speed (Mbps)" value={speedMbps} onChange={setSpeedMbps} min={0} step="1" />
          </div>
          <Hint>
            Time = (GB × 8000) ÷ Mbps, using decimal gigabytes.
            Real-world throughput is usually lower than line rate.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Transfer time"
            value={`${formatMoney(result.seconds)} s`}
            sub="At line rate"
          />
          <ResultRows>
            <ResultRow label="Transfer time (minutes)" value={formatMoney(result.minutes)} />
            <ResultRow label="Effective speed (MB/s)" value={formatMoney(result.mbPerSec)} />
            <ResultRow label="Formatted duration" value={result.formatted} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default DataTransferCalculator;
