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

export interface YardsPerCarryInput {
  carries: number;
  yards: number;
  games: number;
}

export function computeYardsPerCarry(input: YardsPerCarryInput) {
  const carries = Math.max(0, input.carries);
  const yards = Math.max(0, input.yards);
  const games = Math.max(0, input.games);

  const yardsPerCarry = carries > 0 ? yards / carries : 0;
  const yardsPerGame = games > 0 ? yards / games : 0;
  const carriesPerGame = games > 0 ? carries / games : 0;

  return { yardsPerCarry, yardsPerGame, carriesPerGame };
}

export function YardsPerCarryCalculator() {
  const [carries, setCarries] = useState('250');
  const [yards, setYards] = useState('1250');
  const [games, setGames] = useState('17');

  const result = computeYardsPerCarry({
    carries: Number(carries) || 0,
    yards: Number(yards) || 0,
    games: Number(games) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Rushing attempts" value={carries} onChange={setCarries} min={0} />
            <NumberField label="Rushing yards" value={yards} onChange={setYards} min={0} />
            <NumberField label="Games played" value={games} onChange={setGames} min={0} />
          </div>
          <Hint>
            Yards per carry measures rushing efficiency — four or more is strong, while a low average can point
            to negative runs or a heavy workload near the goal line.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Yards per carry"
            value={formatMoney(result.yardsPerCarry)}
            sub={`${carries || 0} carries for ${yards || 0} yards`}
          />
          <ResultRows>
            <ResultRow label="Yards per game" value={formatMoney(result.yardsPerGame)} />
            <ResultRow label="Carries per game" value={formatMoney(result.carriesPerGame)} />
            <ResultRow label="Total rushing yards" value={formatMoney(Number(yards) || 0)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default YardsPerCarryCalculator;
