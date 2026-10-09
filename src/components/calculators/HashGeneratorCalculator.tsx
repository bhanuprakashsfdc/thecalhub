import { useState } from 'react';
import {
  CalcGrid,
  Panel,
  PanelEyebrow,
  TextField,
  SelectField,
  ResultHero,
  ResultRows,
  ResultRow,
  Hint,
} from './kit';

export interface HashGeneratorInput {
  text: string;
  algorithm: 'fnv1a' | 'djb2' | 'sdbm';
}

export function fnv1a(text: string): number {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function djb2(text: string): number {
  let hash = 5381;
  for (let i = 0; i < text.length; i++) {
    hash = Math.imul(hash, 33) + text.charCodeAt(i);
  }
  return hash >>> 0;
}

export function sdbm(text: string): number {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const c = text.charCodeAt(i);
    hash = c + Math.imul(hash, 64) + Math.imul(hash, 65536) - hash;
  }
  return hash >>> 0;
}

export function computeHash(input: HashGeneratorInput) {
  const value =
    input.algorithm === 'djb2'
      ? djb2(input.text)
      : input.algorithm === 'sdbm'
        ? sdbm(input.text)
        : fnv1a(input.text);
  const hex = value.toString(16).padStart(8, '0');
  return { value, hex };
}

const ALGORITHM_OPTIONS = [
  { value: 'fnv1a', label: 'FNV-1a 32-bit' },
  { value: 'djb2', label: 'DJB2' },
  { value: 'sdbm', label: 'SDBM' },
];

export function HashGeneratorCalculator() {
  const [text, setText] = useState('thecalhub');
  const [algorithm, setAlgorithm] = useState('fnv1a');

  const result = computeHash({
    text,
    algorithm: algorithm === 'djb2' ? 'djb2' : algorithm === 'sdbm' ? 'sdbm' : 'fnv1a',
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <TextField label="Text to hash" value={text} onChange={setText} placeholder="Enter text" />
            <SelectField
              label="Algorithm"
              value={algorithm}
              onChange={setAlgorithm}
              options={ALGORITHM_OPTIONS}
            />
          </div>
          <Hint>
            Fast non-cryptographic 32-bit string hashes, useful for checksums, hash
            tables and content fingerprinting. Not secure for passwords.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero label="Hash value" value={result.hex} sub="32-bit hexadecimal" />
          <ResultRows>
            <ResultRow label="Hash (decimal)" value={String(result.value)} />
            <ResultRow label="Character count" value={String(text.length)} />
            <ResultRow
              label="Algorithm"
              value={
                algorithm === 'djb2' ? 'DJB2' : algorithm === 'sdbm' ? 'SDBM' : 'FNV-1a 32-bit'
              }
            />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default HashGeneratorCalculator;
