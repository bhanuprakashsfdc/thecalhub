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

export interface ValueOverReplacementInput {
  playerPoints: number;
  replacementPoints: number;
  games: number;
}

export function computeValueOverReplacement(input: ValueOverReplacementInput) {
  const points = input.playerPoints;
  const replacement = input.replacementPoints;
  const games = Math.max(0, input.games);

  const vor = points - replacement;
  const perGame = games > 0 ? vor / games : 0;
  const pctAbove = replacement !== 0 ? (vor / replacement) * 100 : 0;

  return { vor, perGame, pctAbove };
}

export function ValueOverReplacementCalculator() {
  const [playerPoints, setPlayerPoints] = useState('320');
  const [replacementPoints, setReplacementPoints] = useState('180');
  const [games, setGames] = useState('16');

  const result = computeValueOverReplacement({
    playerPoints: Number(playerPoints) || 0,
    replacementPoints: Number(replacementPoints) || 0,
    games: Number(games) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Player fantasy points" value={playerPoints} onChange={setPlayerPoints} />
            <NumberField label="Replacement-level points" value={replacementPoints} onChange={setReplacementPoints} />
            <NumberField label="Games played" value={games} onChange={setGames} min={0} />
          </div>
          <Hint>
            Replacement level is the production you could grab off the waiver wire. Anything above it is the
            value your drafted player actually adds to your roster.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Value over replacement"
            value={formatMoney(result.vor)}
            sub={`Across ${games || 0} games played`}
          />
          <ResultRows>
            <ResultRow label="VOR per game" value={formatMoney(result.perGame)} />
            <ResultRow label="Percent above replacement" value={`${formatMoney(result.pctAbove)}%`} />
            <ResultRow label="Total player points" value={formatMoney(Number(playerPoints) || 0)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ValueOverReplacementCalculator;
