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

export interface CharacterCountInput {
  text: string;
}

export function computeCharacterCount(input: CharacterCountInput) {
  const characters = input.text.length;
  const trimmed = input.text.trim();
  const words = trimmed === '' ? 0 : trimmed.split(/\s+/).length;
  const sentences =
    trimmed === '' ? 0 : trimmed.split(/[.!?]+/).filter((s) => s.trim() !== '').length;
  const spaces = (input.text.match(/ /g) || []).length;
  const readingSeconds = Math.ceil((words / 200) * 60);
  return { characters, words, sentences, spaces, readingSeconds };
}

export function CharacterCountCalculator() {
  const [text, setText] = useState('The quick brown fox');

  const result = computeCharacterCount({ text });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <TextField label="Text to analyse" value={text} onChange={setText} placeholder="Enter text" />
          </div>
          <Hint>
            Counts every character including spaces. Reading time
            assumes an average pace of 200 words per minute.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero label="Characters" value={String(result.characters)} sub="Including spaces" />
          <ResultRows>
            <ResultRow label="Words" value={String(result.words)} />
            <ResultRow label="Sentences" value={String(result.sentences)} />
            <ResultRow label="Spaces" value={String(result.spaces)} />
            <ResultRow label="Reading time (seconds)" value={String(result.readingSeconds)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default CharacterCountCalculator;
