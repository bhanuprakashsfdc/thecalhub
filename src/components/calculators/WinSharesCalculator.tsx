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

export interface WinSharesInput {
  teamWins: number;
  creditShare: number;
  games: number;
}

export function computeWinShares(input: WinSharesInput) {
  const wins = Math.max(0, input.teamWins);
  const share = Math.max(0, input.creditShare);
  const games = Math.max(0, input.games);

  const winShares = (wins * share) / 100;
  const perGame = games > 0 ? winShares / games : 0;
  const per82 = games > 0 ? (winShares / games) * 82 : 0;

  return { winShares, perGame, per82 };
}

export function WinSharesCalculator() {
  const [teamWins, setTeamWins] = useState('48');
  const [creditShare, setCreditShare] = useState('18');
  const [games, setGames] = useState('82');

  const result = computeWinShares({
    teamWins: Number(teamWins) || 0,
    creditShare: Number(creditShare) || 0,
    games: Number(games) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Team wins" value={teamWins} onChange={setTeamWins} min={0} />
            <NumberField label="Player credit share (%)" value={creditShare} onChange={setCreditShare} min={0} max={100} />
            <NumberField label="Games played" value={games} onChange={setGames} min={0} />
          </div>
          <Hint>
            Win shares split a team's wins between its players. Enter the club's total wins and the share you
            believe the player earns to estimate their season total.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Win shares"
            value={formatMoney(result.winShares)}
            sub={`${creditShare || 0}% of ${teamWins || 0} team wins`}
          />
          <ResultRows>
            <ResultRow label="Win shares per game" value={formatMoney(result.perGame)} />
            <ResultRow label="Pace over 82 games" value={formatMoney(result.per82)} />
            <ResultRow label="Wins credited" value={formatMoney(result.winShares)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default WinSharesCalculator;
