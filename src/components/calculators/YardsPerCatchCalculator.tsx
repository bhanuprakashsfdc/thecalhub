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

export interface YardsPerCatchInput {
  receptions: number;
  yards: number;
  games: number;
}

export function computeYardsPerCatch(input: YardsPerCatchInput) {
  const catches = Math.max(0, input.receptions);
  const yards = Math.max(0, input.yards);
  const games = Math.max(0, input.games);

  const yardsPerCatch = catches > 0 ? yards / catches : 0;
  const yardsPerGame = games > 0 ? yards / games : 0;
  const catchesPerGame = games > 0 ? catches / games : 0;

  return { yardsPerCatch, yardsPerGame, catchesPerGame };
}

export function YardsPerCatchCalculator() {
  const [receptions, setReceptions] = useState('75');
  const [yards, setYards] = useState('1125');
  const [games, setGames] = useState('17');

  const result = computeYardsPerCatch({
    receptions: Number(receptions) || 0,
    yards: Number(yards) || 0,
    games: Number(games) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Receptions" value={receptions} onChange={setReceptions} min={0} />
            <NumberField label="Receiving yards" value={yards} onChange={setYards} min={0} />
            <NumberField label="Games played" value={games} onChange={setGames} min={0} />
          </div>
          <Hint>
            Yards per catch rewards downfield volume: a receiver with a high average is converting catches into
            chunk plays rather than short checkdowns.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Yards per catch"
            value={formatMoney(result.yardsPerCatch)}
            sub={`${receptions || 0} catches for ${yards || 0} yards`}
          />
          <ResultRows>
            <ResultRow label="Yards per game" value={formatMoney(result.yardsPerGame)} />
            <ResultRow label="Catches per game" value={formatMoney(result.catchesPerGame)} />
            <ResultRow label="Total receiving yards" value={formatMoney(Number(yards) || 0)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default YardsPerCatchCalculator;
