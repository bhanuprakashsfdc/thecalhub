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

export interface PlayerEfficiencyInput {
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  missedShots: number;
  games: number;
}

export function computePlayerEfficiency(input: PlayerEfficiencyInput) {
  const positive =
    input.points + input.rebounds + input.assists + input.steals + input.blocks;
  const negative = input.turnovers + input.missedShots;
  const total = positive - negative;
  const games = Math.max(0, input.games);
  const perGame = games > 0 ? total / games : 0;
  const pointsPerGame = games > 0 ? input.points / games : 0;

  return { positive, negative, total, perGame, pointsPerGame };
}

export function PlayerEfficiencyCalculator() {
  const [points, setPoints] = useState('25');
  const [rebounds, setRebounds] = useState('6');
  const [assists, setAssists] = useState('5');
  const [steals, setSteals] = useState('1.5');
  const [blocks, setBlocks] = useState('0.5');
  const [turnovers, setTurnovers] = useState('3');
  const [missedShots, setMissedShots] = useState('9');
  const [games, setGames] = useState('1');

  const result = computePlayerEfficiency({
    points: Number(points) || 0,
    rebounds: Number(rebounds) || 0,
    assists: Number(assists) || 0,
    steals: Number(steals) || 0,
    blocks: Number(blocks) || 0,
    turnovers: Number(turnovers) || 0,
    missedShots: Number(missedShots) || 0,
    games: Number(games) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Points" value={points} onChange={setPoints} />
              <NumberField label="Rebounds" value={rebounds} onChange={setRebounds} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Assists" value={assists} onChange={setAssists} />
              <NumberField label="Steals" value={steals} onChange={setSteals} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Blocks" value={blocks} onChange={setBlocks} />
              <NumberField label="Turnovers" value={turnovers} onChange={setTurnovers} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Missed shots" value={missedShots} onChange={setMissedShots} min={0} />
              <NumberField label="Games" value={games} onChange={setGames} min={0} />
            </div>
          </div>
          <Hint>
            A simplified efficiency rating: add the box-score positives, subtract turnovers and missed shots,
            then divide by games played.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Efficiency per game"
            value={formatMoney(result.perGame)}
            sub={`From ${formatMoney(result.total)} raw points over ${games || 0} game(s)`}
          />
          <ResultRows>
            <ResultRow label="Positive contributions" value={formatMoney(result.positive)} />
            <ResultRow label="Negative plays" value={formatMoney(result.negative)} />
            <ResultRow label="Points per game" value={formatMoney(result.pointsPerGame)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default PlayerEfficiencyCalculator;
