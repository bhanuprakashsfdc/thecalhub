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

export interface SentenceCountInput {
  text: string;
  wordsPerMinute: number;
}

export function computeSentenceCount(input: SentenceCountInput) {
  const trimmed = input.text.trim();
  const sentences = trimmed ? trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0) : [];
  const words = trimmed ? trimmed.split(/\s+/).filter((w) => w.length > 0) : [];
  const readingMinutes = input.wordsPerMinute > 0 ? words.length / input.wordsPerMinute : 0;
  const readingSeconds = readingMinutes * 60;
  return { sentenceCount: sentences.length, wordCount: words.length, readingMinutes, readingSeconds };
}

export function SentenceCountCalculator() {
  const [text, setText] = useState('The quick brown fox jumps over the lazy dog. It was a sunny day.');
  const [wordsPerMinute, setWordsPerMinute] = useState('200');

  const result = useMemo(
    () =>
      computeSentenceCount({
        text,
        wordsPerMinute: Number(wordsPerMinute) || 0,
      }),
    [text, wordsPerMinute]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="block">
              <span className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Text</span>
              <textarea
                aria-label="Text"
                className="w-full h-32 bg-surface-container-highest border border-white/5 rounded-lg p-4 text-white font-mono text-lg outline-none focus:border-primary-fixed/50 resize-none"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <NumberField label="Reading speed (wpm)" value={wordsPerMinute} onChange={setWordsPerMinute} min={1} step="10" />
          </div>
          <Hint>
            Count sentences, words and estimate reading time. Sentences are split on `.`, `!`, or
            `?`; words are whitespace-separated tokens.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Sentence count"
            value={`${result.sentenceCount}`}
            sub={`${result.wordCount} words`}
          />
          <ResultRows>
            <ResultRow label="Word count" value={`${result.wordCount}`} />
            <ResultRow label="Reading time" value={`${formatMoney(result.readingMinutes)} min`} />
            <ResultRow label="Reading seconds" value={formatMoney(result.readingSeconds)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default SentenceCountCalculator;