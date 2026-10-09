import { useState } from 'react';
import {
  CalcGrid,
  Panel,
  PanelEyebrow,
  TextField,
  ResultHero,
  ResultRows,
  ResultRow,
  Hint,
} from './kit';

export interface UnicodeInput {
  text: string;
}

export function computeUnicode(input: UnicodeInput) {
  const codePoints = Array.from(input.text);
  const first = codePoints[0];
  const last = codePoints[codePoints.length - 1];
  const toHex = (ch: string | undefined) =>
    ch ? `U+${ch.codePointAt(0)!.toString(16).toUpperCase().padStart(4, '0')}` : '—';
  const utf8Bytes = new TextEncoder().encode(input.text).length;
  return {
    count: codePoints.length,
    utf8Bytes,
    utf16Units: input.text.length,
    firstCodePoint: toHex(first),
    lastCodePoint: toHex(last),
  };
}

export function UnicodeCalculator() {
  const [text, setText] = useState('Hello!');

  const result = computeUnicode({ text });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <TextField label="Text to inspect" value={text} onChange={setText} placeholder="Enter text" />
          </div>
          <Hint>
            Counts Unicode code points (not UTF-16 units), so emoji and
            accented characters are measured correctly.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero label="Code points" value={String(result.count)} sub="Unicode characters" />
          <ResultRows>
            <ResultRow label="UTF-8 bytes" value={String(result.utf8Bytes)} />
            <ResultRow label="UTF-16 units" value={String(result.utf16Units)} />
            <ResultRow label="First code point" value={result.firstCodePoint} />
            <ResultRow label="Last code point" value={result.lastCodePoint} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default UnicodeCalculator;
