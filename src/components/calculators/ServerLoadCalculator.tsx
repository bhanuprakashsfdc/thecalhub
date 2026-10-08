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

export interface ServerLoadInput {
  requestsPerSecond: number;
  processingMs: number;
  servers: number;
}

export function computeServerLoad(input: ServerLoadInput) {
  const rps = Math.max(0, input.requestsPerSecond);
  const ms = Math.max(0, input.processingMs);
  const servers = Math.max(0, input.servers);
  const concurrent = (rps * ms) / 1000;
  const utilisation = servers > 0 ? (concurrent / servers) * 100 : 0;
  const capacityAt80 = ms > 0 ? servers * (1000 / ms) * 0.8 : 0;
  const headroom = Math.max(0, capacityAt80 - rps);
  const recommended = ms > 0 ? Math.ceil(concurrent / 0.8) : 0;

  return { concurrent, utilisation, capacityAt80, headroom, recommended };
}

export function ServerLoadCalculator() {
  const [requestsPerSecond, setRequestsPerSecond] = useState('300');
  const [processingMs, setProcessingMs] = useState('20');
  const [servers, setServers] = useState('8');

  const result = computeServerLoad({
    requestsPerSecond: Number(requestsPerSecond) || 0,
    processingMs: Number(processingMs) || 0,
    servers: Number(servers) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Requests per second" value={requestsPerSecond} onChange={setRequestsPerSecond} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Average processing time (ms)" value={processingMs} onChange={setProcessingMs} min={0} step="0.1" />
              <NumberField label="Servers" value={servers} onChange={setServers} min={0} />
            </div>
          </div>
          <Hint>
            Utilisation is offered work divided by capacity: requests per second × processing time gives the
            server-seconds needed each second. Above ~80% queues grow sharply.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Server utilisation"
            value={`${formatMoney(result.utilisation)}%`}
            sub={`Based on ${servers} server(s) at ${processingMs} ms per request`}
          />
          <ResultRows>
            <ResultRow label="Concurrent work (server-seconds)" value={formatMoney(result.concurrent)} />
            <ResultRow label="Capacity at 80% (req/s)" value={formatMoney(result.capacityAt80)} />
            <ResultRow label="Headroom (req/s)" value={formatMoney(result.headroom)} />
            <ResultRow label="Recommended servers" value={`${result.recommended}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ServerLoadCalculator;
