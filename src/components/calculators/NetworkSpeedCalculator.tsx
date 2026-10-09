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

export interface NetworkSpeedInput {
  bytes: number;
  seconds: number;
  overhead: number;
}

export function computeNetworkSpeed(input: NetworkSpeedInput) {
  const effectiveBytes = input.bytes * (1 - input.overhead / 100);
  const bps = effectiveBytes * 8 / (input.seconds || 1);
  const kbps = bps / 1000;
  const mbps = bps / 1000000;
  const gbps = bps / 1000000000;
  const timeFor1GB = (1073741824 / (effectiveBytes / (input.seconds || 1))) || 0;
  return { bps, kbps, mbps, gbps, timeFor1GB };
}

export function NetworkSpeedCalculator() {
  const [bytes, setBytes] = useState('125000000');
  const [seconds, setSeconds] = useState('10');
  const [overhead, setOverhead] = useState('2');

  const result = useMemo(
    () =>
      computeNetworkSpeed({
        bytes: Number(bytes) || 0,
        seconds: Number(seconds) || 0,
        overhead: Number(overhead) || 0,
      }),
    [bytes, seconds, overhead]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Bytes transferred" value={bytes} onChange={setBytes} min={0} step="1000000" />
            <NumberField label="Time (seconds)" value={seconds} onChange={setSeconds} min={0} step="1" />
            <NumberField label="Protocol overhead (%)" value={overhead} onChange={setOverhead} min={0} max={100} step="0.1" />
          </div>
          <Hint>
            Network speeds are measured in bits per second, so multiply bytes by 8 and divide by
            seconds. Protocol overhead (TCP/IP headers, framing) reduces the effective payload.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Transfer speed"
            value={`${formatMoney(result.mbps)} Mbps`}
            sub={`${formatMoney(result.gbps)} Gbps`}
          />
          <ResultRows>
            <ResultRow label="Kilobits/sec" value={formatMoney(result.kbps)} />
            <ResultRow label="Megabits/sec" value={formatMoney(result.mbps)} />
            <ResultRow label="Gigabits/sec" value={formatMoney(result.gbps)} />
            <ResultRow label="Time to transfer 1 GB" value={`${formatMoney(result.timeFor1GB)} s`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default NetworkSpeedCalculator;