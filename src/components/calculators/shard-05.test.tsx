import type { ReactElement } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CalculatorPageLayout } from '../CalculatorPageLayout';
import { I18nProvider } from '../../lib/i18n';
import CookingTimeCalculator from './CookingTimeCalculator';
import ServingSizeCalculator from './ServingSizeCalculator';
import PortionCalculator from './PortionCalculator';
import RecipeScalerCalculator from './RecipeScalerCalculator';
import ValueOverReplacementCalculator from './ValueOverReplacementCalculator';
import WinSharesCalculator from './WinSharesCalculator';
import PlayerEfficiencyCalculator from './PlayerEfficiencyCalculator';
import ThreePointPercentageCalculator from './ThreePointPercentageCalculator';
import FreeThrowPercentageCalculator from './FreeThrowPercentageCalculator';
import FieldGoalPercentageCalculator from './FieldGoalPercentageCalculator';
import YardsPerCatchCalculator from './YardsPerCatchCalculator';
import YardsPerCarryCalculator from './YardsPerCarryCalculator';
import PasserRatingCalculator from './PasserRatingCalculator';
import QBRCalculator from './QBRCalculator';
import WhipCalculator from './WhipCalculator';
import EraCalculator from './EraCalculator';
import OpsCalculator from './OpsCalculator';
import OnBasePercentageCalculator from './OnBasePercentageCalculator';
import SluggingPercentageCalculator from './SluggingPercentageCalculator';
import BattingAverageCalculator from './BattingAverageCalculator';
import DpsBuildCalculator from './DpsBuildCalculator';
import CooldownCalculator from './CooldownCalculator';
import MagicResistanceCalculator from './MagicResistanceCalculator';
import ResistanceCalculator from './ResistanceCalculator';
import ArmorCalculator from './ArmorCalculator';
import ParryCalculator from './ParryCalculator';
import DodgeCalculator from './DodgeCalculator';
import CriticalHitCalculator from './CriticalHitCalculator';
import AttackSpeedCalculator from './AttackSpeedCalculator';
import DpsCalculator from './DpsCalculator';
import LevelUpCalculator from './LevelUpCalculator';
import ExpCalculator from './ExpCalculator';
import HealCalculator from './HealCalculator';
import DamageCalculator from './DamageCalculator';
import RpgStatCalculator from './RpgStatCalculator';
import AspectRatioCalculator from './AspectRatioCalculator';
import PrintSizeCalculator from './PrintSizeCalculator';
import ImageSizeCalculator from './ImageSizeCalculator';
import MegapixelCalculator from './MegapixelCalculator';
import CropFactorCalculator from './CropFactorCalculator';
import FocalLengthCalculator from './FocalLengthCalculator';
import AngleOfViewCalculator from './AngleOfViewCalculator';
import FieldOfViewCalculator from './FieldOfViewCalculator';
import HyperfocalDistanceCalculator from './HyperfocalDistanceCalculator';
import DepthOfFieldCalculator from './DepthOfFieldCalculator';
import ExposureCalculator from './ExposureCalculator';
import IsoCalculator from './IsoCalculator';
import ShutterSpeedCalculator from './ShutterSpeedCalculator';
import ApertureCalculator from './ApertureCalculator';
import DbCalculator from './DbCalculator';
import SoundLevelCalculator from './SoundLevelCalculator';
import DecibelCalculator from './DecibelCalculator';
import AudioVolumeCalculator from './AudioVolumeCalculator';
import ScaleCalculator from './ScaleCalculator';
import ChordCalculator from './ChordCalculator';
import IntervalCalculator from './IntervalCalculator';
import PitchCalculator from './PitchCalculator';
import NoteToFrequencyCalculator from './NoteToFrequencyCalculator';
import FrequencyToNoteCalculator from './FrequencyToNoteCalculator';
import MetronomeCalculator from './MetronomeCalculator';
import TempoCalculator from './TempoCalculator';
import TimeSignatureCalculator from './TimeSignatureCalculator';
import NoteLengthCalculator from './NoteLengthCalculator';
import BeatDurationCalculator from './BeatDurationCalculator';
import BpmCalculator from './BpmCalculator';
import StarTemperatureCalculator from './StarTemperatureCalculator';
import StarBrightnessCalculator from './StarBrightnessCalculator';
import StarDistanceCalculator from './StarDistanceCalculator';
import YearLengthOnOtherPlanetsCalculator from './YearLengthOnOtherPlanetsCalculator';
import DayLengthOnOtherPlanetsCalculator from './DayLengthOnOtherPlanetsCalculator';
import AgeOnOtherPlanetsCalculator from './AgeOnOtherPlanetsCalculator';
import WeightOnOtherPlanetsCalculator from './WeightOnOtherPlanetsCalculator';
import GravityOnOtherPlanetsCalculator from './GravityOnOtherPlanetsCalculator';
import OrbitalDistanceCalculator from './OrbitalDistanceCalculator';
import OrbitalPeriodCalculator from './OrbitalPeriodCalculator';
import EscapeVelocityCalculator from './EscapeVelocityCalculator';
import OrbitalVelocityCalculator from './OrbitalVelocityCalculator';

interface CalculatorPage {
  title: string;
  description: string;
  path: string;
  category?: string;
}

function renderCalculatorPage(component: ReactElement, page: CalculatorPage) {
  return render(
    <MemoryRouter initialEntries={[page.path]}>
      <HelmetProvider>
        <I18nProvider>
          <CalculatorPageLayout title={page.title} description={page.description} category={page.category}>
            {component}
          </CalculatorPageLayout>
        </I18nProvider>
      </HelmetProvider>
    </MemoryRouter>
  );
}

const num = (n: number) =>
  n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const hero = (container: HTMLElement) => container.querySelector('p.text-4xl')!.textContent;

describe('CookingTimeCalculator', () => {
  const page: CalculatorPage = {
    title: 'Cooking Time Calculator',
    description: 'Add prep, cooking and resting time across batches to get your total kitchen time.',
    path: '/cooking-time-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<CookingTimeCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Cooking Time Calculator' })).toBeDefined();
    expect(screen.getByText('Preparation time (min)')).toBeDefined();
    expect(screen.getByText('Total cooking time')).toBeDefined();
  });

  it('adds every stage across batches and reacts to cook time', () => {
    const { container } = renderCalculatorPage(<CookingTimeCalculator />, page);
    const total = (15 + 45 + 10) * 1;
    expect(hero(container)).toBe(`${num(total)} min`);
    expect(screen.getByText('Time per batch').nextElementSibling!.textContent).toBe(`${num(total)} min`);

    fireEvent.change(screen.getByLabelText('Cooking time (min)'), { target: { value: '90' } });
    expect(hero(container)).toBe(`${num((15 + 90 + 10) * 1)} min`);
  });
});

describe('ServingSizeCalculator', () => {
  const page: CalculatorPage = {
    title: 'Serving Size Calculator',
    description: 'Work out per-serving amounts and total quantities for the number of people you are feeding.',
    path: '/serving-size-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<ServingSizeCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Serving Size Calculator' })).toBeDefined();
    expect(screen.getByText('Total yield (grams)')).toBeDefined();
    expect(screen.getByText('Amount per serving')).toBeDefined();
  });

  it('splits the batch across desired servings and reacts to party size', () => {
    const { container } = renderCalculatorPage(<ServingSizeCalculator />, page);
    expect(hero(container)).toBe(`${num(1200 / 6)} g`);
    expect(screen.getByText('Original per serving').nextElementSibling!.textContent).toBe(`${num(1200 / 4)} g`);
    expect(screen.getByText('Total needed for desired servings').nextElementSibling!.textContent).toBe(
      `${num((1200 / 4) * 6)} g`
    );

    fireEvent.change(screen.getByLabelText('Desired servings'), { target: { value: '3' } });
    expect(hero(container)).toBe(`${num(1200 / 3)} g`);
  });
});

describe('PortionCalculator', () => {
  const page: CalculatorPage = {
    title: 'Portion Calculator',
    description: 'Split a batch into fixed portions and see exactly how many full portions you can plate.',
    path: '/portion-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<PortionCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Portion Calculator' })).toBeDefined();
    expect(screen.getByText('Total quantity (grams)')).toBeDefined();
    expect(screen.getByText('Full portions')).toBeDefined();
  });

  it('counts full portions and reacts to a bigger portion size', () => {
    const { container } = renderCalculatorPage(<PortionCalculator />, page);
    expect(hero(container)).toBe(String(Math.floor(2500 / 300)));
    expect(screen.getByText('Exact portions').nextElementSibling!.textContent).toBe(num(2500 / 300));
    expect(screen.getByText('Leftover quantity').nextElementSibling!.textContent).toBe(
      `${num(2500 - Math.floor(2500 / 300) * 300)} g`
    );

    fireEvent.change(screen.getByLabelText('Portion size (grams)'), { target: { value: '500' } });
    expect(hero(container)).toBe(String(Math.floor(2500 / 500)));
  });
});

describe('RecipeScalerCalculator', () => {
  const page: CalculatorPage = {
    title: 'Recipe Scaler Calculator',
    description: 'Scale any ingredient up or down by changing the number of servings a recipe yields.',
    path: '/recipe-scaler-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<RecipeScalerCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Recipe Scaler Calculator' })).toBeDefined();
    expect(screen.getByText('Original servings')).toBeDefined();
    expect(screen.getByText('Scale factor')).toBeDefined();
  });

  it('scales ingredients by the serving ratio and reacts to fewer servings', () => {
    const { container } = renderCalculatorPage(<RecipeScalerCalculator />, page);
    expect(hero(container)).toBe(`${num(10 / 4)}×`);
    expect(screen.getByText('Scaled ingredient amount').nextElementSibling!.textContent).toBe(
      `${num(250 * (10 / 4))} g`
    );

    fireEvent.change(screen.getByLabelText('Desired servings'), { target: { value: '8' } });
    expect(hero(container)).toBe(`${num(8 / 4)}×`);
  });
});

describe('ValueOverReplacementCalculator', () => {
  const page: CalculatorPage = {
    title: 'Value Over Replacement Calculator',
    description: 'Measure how far a fantasy player outscores the replacement-level option on your waiver wire.',
    path: '/value-over-replacement-calculator.html',
    category: 'fitness',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<ValueOverReplacementCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Value Over Replacement Calculator' })).toBeDefined();
    expect(screen.getByText('Player fantasy points')).toBeDefined();
    expect(screen.getByText('Value over replacement')).toBeDefined();
  });

  it('scores the gap above replacement and reacts to a stronger baseline', () => {
    const { container } = renderCalculatorPage(<ValueOverReplacementCalculator />, page);
    expect(hero(container)).toBe(num(320 - 180));
    expect(screen.getByText('VOR per game').nextElementSibling!.textContent).toBe(num((320 - 180) / 16));

    fireEvent.change(screen.getByLabelText('Replacement-level points'), { target: { value: '200' } });
    expect(hero(container)).toBe(num(320 - 200));
  });
});

describe('WinSharesCalculator', () => {
  const page: CalculatorPage = {
    title: 'Win Shares Calculator',
    description: 'Estimate a player win shares total from team wins, credit share and games played.',
    path: '/win-shares-calculator.html',
    category: 'fitness',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<WinSharesCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Win Shares Calculator' })).toBeDefined();
    expect(screen.getByText('Team wins')).toBeDefined();
    expect(screen.getByText('Win shares')).toBeDefined();
  });

  it('awards the player share of team wins and reacts to a better season', () => {
    const { container } = renderCalculatorPage(<WinSharesCalculator />, page);
    const ws = (48 * 18) / 100;
    expect(hero(container)).toBe(num(ws));
    expect(screen.getByText('Win shares per game').nextElementSibling!.textContent).toBe(num(ws / 82));

    fireEvent.change(screen.getByLabelText('Team wins'), { target: { value: '60' } });
    expect(hero(container)).toBe(num((60 * 18) / 100));
  });
});

describe('PlayerEfficiencyCalculator', () => {
  const page: CalculatorPage = {
    title: 'Player Efficiency Calculator',
    description: 'Rate a player per-game efficiency from box-score positives minus turnovers and misses.',
    path: '/player-efficiency-calculator.html',
    category: 'fitness',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<PlayerEfficiencyCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Player Efficiency Calculator' })).toBeDefined();
    expect(screen.getByText('Points')).toBeDefined();
    expect(screen.getByText('Efficiency per game')).toBeDefined();
  });

  it('nets positives against mistakes and reacts to more games', () => {
    const { container } = renderCalculatorPage(<PlayerEfficiencyCalculator />, page);
    const positive = 25 + 6 + 5 + 1.5 + 0.5;
    const total = positive - (3 + 9);
    expect(hero(container)).toBe(num(total / 1));
    expect(screen.getByText('Positive contributions').nextElementSibling!.textContent).toBe(num(positive));

    fireEvent.change(screen.getByLabelText('Games'), { target: { value: '2' } });
    expect(hero(container)).toBe(num(total / 2));
  });
});

describe('ThreePointPercentageCalculator', () => {
  const page: CalculatorPage = {
    title: 'Three Point Percentage Calculator',
    description: 'Convert three-pointers made and attempted into a shooting percentage from deep.',
    path: '/three-point-percentage-calculator.html',
    category: 'fitness',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<ThreePointPercentageCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Three Point Percentage Calculator' })).toBeDefined();
    expect(screen.getByText('Three-pointers made')).toBeDefined();
    expect(screen.getByText('Three-point percentage')).toBeDefined();
  });

  it('converts makes over attempts and reacts to more makes', () => {
    const { container } = renderCalculatorPage(<ThreePointPercentageCalculator />, page);
    expect(hero(container)).toBe(`${num((120 / 320) * 100)}%`);
    expect(screen.getByText('Missed threes').nextElementSibling!.textContent).toBe(num(320 - 120));

    fireEvent.change(screen.getByLabelText('Three-pointers made'), { target: { value: '160' } });
    expect(hero(container)).toBe(`${num((160 / 320) * 100)}%`);
  });
});

describe('FreeThrowPercentageCalculator', () => {
  const page: CalculatorPage = {
    title: 'Free Throw Percentage Calculator',
    description: 'Turn free throws made and attempted into an accurate free-throw percentage.',
    path: '/free-throw-percentage-calculator.html',
    category: 'fitness',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<FreeThrowPercentageCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Free Throw Percentage Calculator' })).toBeDefined();
    expect(screen.getByText('Free throws made')).toBeDefined();
    expect(screen.getByText('Free-throw percentage')).toBeDefined();
  });

  it('converts stripe makes over attempts and reacts to a perfect night', () => {
    const { container } = renderCalculatorPage(<FreeThrowPercentageCalculator />, page);
    expect(hero(container)).toBe(`${num((180 / 215) * 100)}%`);
    expect(screen.getByText('Missed free throws').nextElementSibling!.textContent).toBe(num(215 - 180));

    fireEvent.change(screen.getByLabelText('Free throws made'), { target: { value: '215' } });
    expect(hero(container)).toBe(`${num((215 / 215) * 100)}%`);
  });
});

describe('FieldGoalPercentageCalculator', () => {
  const page: CalculatorPage = {
    title: 'Field Goal Percentage Calculator',
    description: 'Calculate field-goal percentage from makes and attempts across the whole floor.',
    path: '/field-goal-percentage-calculator.html',
    category: 'fitness',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<FieldGoalPercentageCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Field Goal Percentage Calculator' })).toBeDefined();
    expect(screen.getByText('Field goals made')).toBeDefined();
    expect(screen.getByText('Field-goal percentage')).toBeDefined();
  });

  it('converts field goals over attempts and reacts to more makes', () => {
    const { container } = renderCalculatorPage(<FieldGoalPercentageCalculator />, page);
    expect(hero(container)).toBe(`${num((450 / 980) * 100)}%`);
    expect(screen.getByText('Missed field goals').nextElementSibling!.textContent).toBe(num(980 - 450));

    fireEvent.change(screen.getByLabelText('Field goals made'), { target: { value: '490' } });
    expect(hero(container)).toBe(`${num((490 / 980) * 100)}%`);
  });
});

describe('YardsPerCatchCalculator', () => {
  const page: CalculatorPage = {
    title: 'Yards Per Catch Calculator',
    description: 'Check receiving efficiency with yards per catch and yards per game for any season line.',
    path: '/yards-per-catch-calculator.html',
    category: 'fitness',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<YardsPerCatchCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Yards Per Catch Calculator' })).toBeDefined();
    expect(screen.getByText('Receptions')).toBeDefined();
    expect(screen.getByText('Yards per catch')).toBeDefined();
  });

  it('divides receiving yards by catches and reacts to a bigger season', () => {
    const { container } = renderCalculatorPage(<YardsPerCatchCalculator />, page);
    expect(hero(container)).toBe(num(1125 / 75));
    expect(screen.getByText('Yards per game').nextElementSibling!.textContent).toBe(num(1125 / 17));

    fireEvent.change(screen.getByLabelText('Receiving yards'), { target: { value: '1500' } });
    expect(hero(container)).toBe(num(1500 / 75));
  });
});

describe('YardsPerCarryCalculator', () => {
  const page: CalculatorPage = {
    title: 'Yards Per Carry Calculator',
    description: 'Measure rushing efficiency with yards per carry, yards per game and workload splits.',
    path: '/yards-per-carry-calculator.html',
    category: 'fitness',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<YardsPerCarryCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Yards Per Carry Calculator' })).toBeDefined();
    expect(screen.getByText('Rushing attempts')).toBeDefined();
    expect(screen.getByText('Yards per carry')).toBeDefined();
  });

  it('divides rushing yards by carries and reacts to more work', () => {
    const { container } = renderCalculatorPage(<YardsPerCarryCalculator />, page);
    expect(hero(container)).toBe(num(1250 / 250));
    expect(screen.getByText('Yards per game').nextElementSibling!.textContent).toBe(num(1250 / 17));

    fireEvent.change(screen.getByLabelText('Rushing attempts'), { target: { value: '200' } });
    expect(hero(container)).toBe(num(1250 / 200));
  });
});

describe('PasserRatingCalculator', () => {
  const page: CalculatorPage = {
    title: 'Passer Rating Calculator',
    description: 'Compute the official NFL passer rating from attempts, completions, yards, TDs and picks.',
    path: '/passer-rating-calculator.html',
    category: 'fitness',
  };

  const clamp = (n: number) => Math.min(2.375, Math.max(0, n));
  const rating = (att: number, comp: number, yds: number, td: number, int: number) => {
    const a = clamp((comp / att - 0.3) * 5);
    const b = clamp((yds / att - 3) * 0.25);
    const c = clamp((td / att) * 20);
    const d = clamp(2.375 - (int / att) * 25);
    return ((a + b + c + d) / 6) * 100;
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<PasserRatingCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Passer Rating Calculator' })).toBeDefined();
    expect(screen.getByText('Pass attempts')).toBeDefined();
    expect(screen.getByText('Passer rating')).toBeDefined();
  });

  it('scores the four rating components and reacts to fewer touchdowns', () => {
    const { container } = renderCalculatorPage(<PasserRatingCalculator />, page);
    expect(hero(container)).toBe(num(rating(32, 22, 285, 3, 1)));
    expect(screen.getByText('Completion percentage').nextElementSibling!.textContent).toBe(
      `${num((22 / 32) * 100)}%`
    );

    fireEvent.change(screen.getByLabelText('Touchdowns'), { target: { value: '1' } });
    expect(hero(container)).toBe(num(rating(32, 22, 285, 1, 1)));
  });
});

describe('QBRCalculator', () => {
  const page: CalculatorPage = {
    title: 'QBR Calculator',
    description: 'Estimate a quarterback rating on the 0-100 QBR scale from expected points added and turnovers.',
    path: '/qbr-calculator.html',
    category: 'fitness',
  };

  const qbr = (epa: number, plays: number, turnovers: number) => {
    const perPlay = plays > 0 ? epa / plays : 0;
    return Math.min(100, Math.max(0, 50 + perPlay * 25 - Math.max(0, turnovers) * 3));
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<QBRCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'QBR Calculator' })).toBeDefined();
    expect(screen.getByText('Total expected points added')).toBeDefined();
    expect(screen.getByText('Estimated QBR')).toBeDefined();
  });

  it('scores efficiency from EPA and reacts to more turnovers', () => {
    const { container } = renderCalculatorPage(<QBRCalculator />, page);
    expect(hero(container)).toBe(num(qbr(12, 64, 1)));
    expect(screen.getByText('Expected points per play').nextElementSibling!.textContent).toBe(num(12 / 64));

    fireEvent.change(screen.getByLabelText('Turnovers'), { target: { value: '3' } });
    expect(hero(container)).toBe(num(qbr(12, 64, 3)));
  });
});

describe('WhipCalculator', () => {
  const page: CalculatorPage = {
    title: 'WHIP Calculator',
    description: 'Calculate WHIP from walks, hits and innings pitched to rate how many baserunners a pitcher allows.',
    path: '/whip-calculator.html',
    category: 'fitness',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<WhipCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'WHIP Calculator' })).toBeDefined();
    expect(screen.getByText('Walks allowed')).toBeDefined();
    expect(screen.getByText('WHIP')).toBeDefined();
  });

  it('counts baserunners per inning and reacts to fewer hits', () => {
    const { container } = renderCalculatorPage(<WhipCalculator />, page);
    expect(hero(container)).toBe(num((45 + 140) / 180));
    expect(screen.getByText('Total baserunners').nextElementSibling!.textContent).toBe(num(45 + 140));

    fireEvent.change(screen.getByLabelText('Hits allowed'), { target: { value: '150' } });
    expect(hero(container)).toBe(num((45 + 150) / 180));
  });
});

describe('EraCalculator', () => {
  const page: CalculatorPage = {
    title: 'ERA Calculator',
    description: 'Scale earned runs over nine innings to get a pitcher earned run average in seconds.',
    path: '/era-calculator.html',
    category: 'fitness',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<EraCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'ERA Calculator' })).toBeDefined();
    expect(screen.getByText('Earned runs')).toBeDefined();
    expect(screen.getByText('Earned run average')).toBeDefined();
  });

  it('scales earned runs to nine innings and reacts to a tighter outing', () => {
    const { container } = renderCalculatorPage(<EraCalculator />, page);
    expect(hero(container)).toBe(num((54 * 9) / 180));
    expect(screen.getByText('Outs recorded').nextElementSibling!.textContent).toBe(num(180 * 3));

    fireEvent.change(screen.getByLabelText('Earned runs'), { target: { value: '36' } });
    expect(hero(container)).toBe(num((36 * 9) / 180));
  });
});

describe('OpsCalculator', () => {
  const page: CalculatorPage = {
    title: 'OPS Calculator',
    description: 'Combine on-base and slugging percentage into OPS from hits, walks, total bases and at-bats.',
    path: '/ops-calculator.html',
    category: 'fitness',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<OpsCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'OPS Calculator' })).toBeDefined();
    expect(screen.getByText('At-bats')).toBeDefined();
    expect(screen.getByText('OPS')).toBeDefined();
  });

  it('adds on-base and slugging and reacts to more total bases', () => {
    const { container } = renderCalculatorPage(<OpsCalculator />, page);
    const obp = (175 + 65 + 6) / (560 + 65 + 6 + 5);
    const slg = 290 / 560;
    expect(hero(container)).toBe(num(obp + slg));
    expect(screen.getByText('On-base percentage').nextElementSibling!.textContent).toBe(num(obp));

    fireEvent.change(screen.getByLabelText('Total bases'), { target: { value: '350' } });
    expect(hero(container)).toBe(num(obp + 350 / 560));
  });
});

describe('OnBasePercentageCalculator', () => {
  const page: CalculatorPage = {
    title: 'On-Base Percentage Calculator',
    description: 'Work out on-base percentage from hits, walks, hit-by-pitches and plate appearances.',
    path: '/on-base-percentage-calculator.html',
    category: 'fitness',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<OnBasePercentageCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'On-Base Percentage Calculator' })).toBeDefined();
    expect(screen.getByText('Sacrifice flies')).toBeDefined();
    expect(screen.getByText('On-base percentage')).toBeDefined();
  });

  it('counts times on base over plate appearances and reacts to more walks', () => {
    const { container } = renderCalculatorPage(<OnBasePercentageCalculator />, page);
    expect(hero(container)).toBe(num((175 + 65 + 6) / (560 + 65 + 6 + 5)));
    expect(screen.getByText('Plate appearances').nextElementSibling!.textContent).toBe(
      num(560 + 65 + 6 + 5)
    );

    fireEvent.change(screen.getByLabelText('Walks'), { target: { value: '100' } });
    expect(hero(container)).toBe(num((175 + 100 + 6) / (560 + 100 + 6 + 5)));
  });
});

describe('SluggingPercentageCalculator', () => {
  const page: CalculatorPage = {
    title: 'Slugging Percentage Calculator',
    description: 'Total the bases from singles, doubles, triples and homers to get slugging percentage.',
    path: '/slugging-percentage-calculator.html',
    category: 'fitness',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<SluggingPercentageCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Slugging Percentage Calculator' })).toBeDefined();
    expect(screen.getByText('Home runs')).toBeDefined();
    expect(screen.getByText('Slugging percentage')).toBeDefined();
  });

  it('weights extra-base hits and reacts to more home runs', () => {
    const { container } = renderCalculatorPage(<SluggingPercentageCalculator />, page);
    const tb = 110 + 2 * 40 + 3 * 3 + 4 * 22;
    expect(hero(container)).toBe(num(tb / 560));
    expect(screen.getByText('Total bases').nextElementSibling!.textContent).toBe(num(tb));

    fireEvent.change(screen.getByLabelText('Home runs'), { target: { value: '30' } });
    expect(hero(container)).toBe(num((110 + 2 * 40 + 3 * 3 + 4 * 30) / 560));
  });
});

describe('BattingAverageCalculator', () => {
  const page: CalculatorPage = {
    title: 'Batting Average Calculator',
    description: 'Divide hits by at-bats for batting average and see what you need to hit a target mark.',
    path: '/batting-average-calculator.html',
    category: 'fitness',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<BattingAverageCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Batting Average Calculator' })).toBeDefined();
    expect(screen.getByText('Hits')).toBeDefined();
    expect(screen.getByText('Batting average')).toBeDefined();
  });

  it('divides hits by at-bats and reacts to a hitting streak', () => {
    const { container } = renderCalculatorPage(<BattingAverageCalculator />, page);
    expect(hero(container)).toBe(num(175 / 560));
    expect(screen.getByText('Hitless at-bats').nextElementSibling!.textContent).toBe(num(560 - 175));

    fireEvent.change(screen.getByLabelText('Hits'), { target: { value: '200' } });
    expect(hero(container)).toBe(num(200 / 560));
  });
});

describe('DpsBuildCalculator', () => {
  const page: CalculatorPage = {
    title: 'DPS Build Calculator',
    description: 'Compare two damage builds side by side using damage, attack speed and crit stats.',
    path: '/dps-build-calculator.html',
    category: 'standard',
  };

  const dps = (d: number, s: number, c: number, m: number) => d * s * (1 + (c / 100) * (m / 100 - 1));

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<DpsBuildCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'DPS Build Calculator' })).toBeDefined();
    expect(screen.getByText('Damage per hit (A)')).toBeDefined();
    expect(screen.getByText('DPS gain of build B')).toBeDefined();
  });

  it('compares both loadouts and reacts to a stronger build B', () => {
    const { container } = renderCalculatorPage(<DpsBuildCalculator />, page);
    const a = dps(120, 1.5, 25, 150);
    const b = dps(100, 1.8, 40, 180);
    expect(hero(container)).toBe(`${num(((b - a) / a) * 100)}%`);
    expect(screen.getByText('Build A DPS').nextElementSibling!.textContent).toBe(num(a));

    fireEvent.change(screen.getByLabelText('Damage per hit (B)'), { target: { value: '200' } });
    const b2 = dps(200, 1.8, 40, 180);
    expect(hero(container)).toBe(`${num(((b2 - a) / a) * 100)}%`);
  });
});

describe('CooldownCalculator', () => {
  const page: CalculatorPage = {
    title: 'Cooldown Calculator',
    description: 'See how cooldown reduction shortens ability waits and how many casts fit in a rotation.',
    path: '/cooldown-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<CooldownCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Cooldown Calculator' })).toBeDefined();
    expect(screen.getByText('Base cooldown (seconds)')).toBeDefined();
    expect(screen.getByText('Effective cooldown')).toBeDefined();
  });

  it('applies cooldown reduction and reacts to a deeper reduction', () => {
    const { container } = renderCalculatorPage(<CooldownCalculator />, page);
    const effective = 45 * (1 - 20 / 100);
    expect(hero(container)).toBe(`${num(effective)} s`);
    expect(screen.getByText('Casts in rotation').nextElementSibling!.textContent).toBe(
      num(Math.floor(120 / effective) + 1)
    );

    fireEvent.change(screen.getByLabelText('Cooldown reduction (%)'), { target: { value: '50' } });
    expect(hero(container)).toBe(`${num(45 * (1 - 50 / 100))} s`);
  });
});

describe('MagicResistanceCalculator', () => {
  const page: CalculatorPage = {
    title: 'Magic Resistance Calculator',
    description: 'Translate magic resistance into damage taken, damage reduction and effective HP.',
    path: '/magic-resistance-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<MagicResistanceCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Magic Resistance Calculator' })).toBeDefined();
    expect(screen.getByText('Magic resistance (%)')).toBeDefined();
    expect(screen.getByText('Damage taken')).toBeDefined();
  });

  it('mitigates spell damage with diminishing returns and reacts to a bigger hit', () => {
    const { container } = renderCalculatorPage(<MagicResistanceCalculator />, page);
    const taken = (500 * 100) / (100 + 40);
    expect(hero(container)).toBe(num(taken));
    expect(screen.getByText('Damage reduction').nextElementSibling!.textContent).toBe(
      `${num(((500 - taken) / 500) * 100)}%`
    );

    fireEvent.change(screen.getByLabelText('Incoming magic damage'), { target: { value: '1000' } });
    expect(hero(container)).toBe(num((1000 * 100) / (100 + 40)));
  });
});

describe('ResistanceCalculator', () => {
  const page: CalculatorPage = {
    title: 'Resistance Calculator',
    description: 'Find the resistance needed for a target damage reduction and the damage that gets through.',
    path: '/resistance-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<ResistanceCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Resistance Calculator' })).toBeDefined();
    expect(screen.getByText('Target damage reduction (%)')).toBeDefined();
    expect(screen.getByText('Required resistance')).toBeDefined();
  });

  it('solves for the resistance behind a target reduction and reacts to a higher goal', () => {
    const { container } = renderCalculatorPage(<ResistanceCalculator />, page);
    expect(hero(container)).toBe(num(100 / (1 - 40 / 100) - 100));
    expect(screen.getByText('Damage after reduction').nextElementSibling!.textContent).toBe(
      num(800 * (1 - 40 / 100))
    );

    fireEvent.change(screen.getByLabelText('Target damage reduction (%)'), { target: { value: '50' } });
    expect(hero(container)).toBe(num(100 / (1 - 50 / 100) - 100));
  });
});

describe('ArmorCalculator', () => {
  const page: CalculatorPage = {
    title: 'Armor Calculator',
    description: 'Convert armor into physical damage reduction, damage taken and effective HP multiplier.',
    path: '/armor-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<ArmorCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Armor Calculator' })).toBeDefined();
    expect(screen.getByText('Armor')).toBeDefined();
    expect(screen.getByText('Damage after armor')).toBeDefined();
  });

  it('reduces physical hits by armor and reacts to thicker plating', () => {
    const { container } = renderCalculatorPage(<ArmorCalculator />, page);
    const taken = (1000 * 100) / (100 + 80);
    expect(hero(container)).toBe(num(taken));
    expect(screen.getByText('Damage reduction').nextElementSibling!.textContent).toBe(
      `${num((1 - 100 / (100 + 80)) * 100)}%`
    );

    fireEvent.change(screen.getByLabelText('Armor'), { target: { value: '100' } });
    expect(hero(container)).toBe(num((1000 * 100) / (100 + 100)));
  });
});

describe('ParryCalculator', () => {
  const page: CalculatorPage = {
    title: 'Parry Calculator',
    description: 'Estimate expected damage over a fight from parry chance, parry reduction and attack volume.',
    path: '/parry-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<ParryCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Parry Calculator' })).toBeDefined();
    expect(screen.getByText('Parry chance (%)')).toBeDefined();
    expect(screen.getByText('Expected damage taken')).toBeDefined();
  });

  it('blunts parried swings and reacts to a higher parry chance', () => {
    const { container } = renderCalculatorPage(<ParryCalculator />, page);
    const parried = 40 * (25 / 100);
    const taken = parried * 120 * (1 - 50 / 100) + (40 - parried) * 120;
    expect(hero(container)).toBe(num(taken));
    expect(screen.getByText('Expected parries').nextElementSibling!.textContent).toBe(num(parried));

    fireEvent.change(screen.getByLabelText('Parry chance (%)'), { target: { value: '50' } });
    const parried2 = 40 * (50 / 100);
    expect(hero(container)).toBe(num(parried2 * 120 * (1 - 50 / 100) + (40 - parried2) * 120));
  });
});

describe('DodgeCalculator', () => {
  const page: CalculatorPage = {
    title: 'Dodge Calculator',
    description: 'Work out how much incoming damage dodge chance avoids across a stream of attacks.',
    path: '/dodge-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<DodgeCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Dodge Calculator' })).toBeDefined();
    expect(screen.getByText('Dodge chance (%)')).toBeDefined();
    expect(screen.getByText('Expected damage taken')).toBeDefined();
  });

  it('avoids hits on dodge and reacts to a higher dodge chance', () => {
    const { container } = renderCalculatorPage(<DodgeCalculator />, page);
    const dodged = 50 * (20 / 100);
    expect(hero(container)).toBe(num((50 - dodged) * 90));
    expect(screen.getByText('Attacks dodged').nextElementSibling!.textContent).toBe(num(dodged));

    fireEvent.change(screen.getByLabelText('Dodge chance (%)'), { target: { value: '50' } });
    const dodged2 = 50 * (50 / 100);
    expect(hero(container)).toBe(num((50 - dodged2) * 90));
  });
});

describe('CriticalHitCalculator', () => {
  const page: CalculatorPage = {
    title: 'Critical Hit Calculator',
    description: 'Average your damage output across crit chance and crit multiplier for steady-state DPS.',
    path: '/critical-hit-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<CriticalHitCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Critical Hit Calculator' })).toBeDefined();
    expect(screen.getByText('Base damage')).toBeDefined();
    expect(screen.getByText('Average damage per hit')).toBeDefined();
  });

  it('averages crits into normal hits and reacts to more crit chance', () => {
    const { container } = renderCalculatorPage(<CriticalHitCalculator />, page);
    const average = 100 + (25 / 100) * (100 * (200 / 100) - 100);
    expect(hero(container)).toBe(num(average));
    expect(screen.getByText('Critical hit damage').nextElementSibling!.textContent).toBe(
      num(100 * (200 / 100))
    );

    fireEvent.change(screen.getByLabelText('Crit chance (%)'), { target: { value: '50' } });
    expect(hero(container)).toBe(num(100 + (50 / 100) * (100 * (200 / 100) - 100)));
  });
});

describe('AttackSpeedCalculator', () => {
  const page: CalculatorPage = {
    title: 'Attack Speed Calculator',
    description: 'Convert base attack time and attack speed bonus into swings per second and per minute.',
    path: '/attack-speed-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<AttackSpeedCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Attack Speed Calculator' })).toBeDefined();
    expect(screen.getByText('Base attack time (seconds)')).toBeDefined();
    expect(screen.getByText('Attacks per second')).toBeDefined();
  });

  it('shortens the swing timer with haste and reacts to double speed', () => {
    const { container } = renderCalculatorPage(<AttackSpeedCalculator />, page);
    const interval = 1.8 / (1 + 35 / 100);
    expect(hero(container)).toBe(num(1 / interval));
    expect(screen.getByText('Attack interval').nextElementSibling!.textContent).toBe(`${num(interval)} s`);

    fireEvent.change(screen.getByLabelText('Attack speed bonus (%)'), { target: { value: '100' } });
    expect(hero(container)).toBe(num(1 / (1.8 / (1 + 100 / 100))));
  });
});

describe('DpsCalculator', () => {
  const page: CalculatorPage = {
    title: 'DPS Calculator',
    description: 'Multiply damage per hit by attacks per second for sustained DPS and per-minute output.',
    path: '/dps-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<DpsCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'DPS Calculator' })).toBeDefined();
    expect(screen.getByText('Damage per hit')).toBeDefined();
    expect(screen.getByText('Damage per second')).toBeDefined();
  });

  it('multiplies hit damage by attack rate and reacts to faster swings', () => {
    const { container } = renderCalculatorPage(<DpsCalculator />, page);
    expect(hero(container)).toBe(num(240 * 1.6));
    expect(screen.getByText('Damage per minute').nextElementSibling!.textContent).toBe(num(240 * 1.6 * 60));

    fireEvent.change(screen.getByLabelText('Attacks per second'), { target: { value: '2' } });
    expect(hero(container)).toBe(num(240 * 2));
  });
});

describe('LevelUpCalculator', () => {
  const page: CalculatorPage = {
    title: 'Level Up Calculator',
    description: 'Total the XP required between two levels when each level costs more than the last.',
    path: '/level-up-calculator.html',
    category: 'standard',
  };

  const totalTo = (base: number, growth: number, level: number) => {
    let total = 0;
    for (let i = 0; i < level - 1; i += 1) {
      total += base * Math.pow(1 + growth / 100, i);
    }
    return total;
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<LevelUpCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Level Up Calculator' })).toBeDefined();
    expect(screen.getByText('XP for level 2')).toBeDefined();
    expect(screen.getByText('XP needed')).toBeDefined();
  });

  it('sums an escalating XP curve and reacts to a nearer target', () => {
    const { container } = renderCalculatorPage(<LevelUpCalculator />, page);
    const remaining = totalTo(100, 15, 20) - totalTo(100, 15, 10);
    expect(hero(container)).toBe(num(remaining));
    expect(screen.getByText('XP for next level').nextElementSibling!.textContent).toBe(
      num(100 * Math.pow(1 + 15 / 100, 10 - 1))
    );

    fireEvent.change(screen.getByLabelText('Target level'), { target: { value: '15' } });
    expect(hero(container)).toBe(num(totalTo(100, 15, 15) - totalTo(100, 15, 10)));
  });
});

describe('ExpCalculator', () => {
  const page: CalculatorPage = {
    title: 'EXP Calculator',
    description: 'Turn your remaining experience and EXP per hour into hours and minutes until the next level.',
    path: '/exp-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<ExpCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'EXP Calculator' })).toBeDefined();
    expect(screen.getByText('EXP earned per hour')).toBeDefined();
    expect(screen.getByText('Time to level up')).toBeDefined();
  });

  it('divides remaining EXP by the farm rate and reacts to a faster route', () => {
    const { container } = renderCalculatorPage(<ExpCalculator />, page);
    expect(hero(container)).toBe(`${num((10000 - 4500) / 2500)} h`);
    expect(screen.getByText('EXP remaining').nextElementSibling!.textContent).toBe(num(10000 - 4500));

    fireEvent.change(screen.getByLabelText('EXP earned per hour'), { target: { value: '5000' } });
    expect(hero(container)).toBe(`${num((10000 - 4500) / 5000)} h`);
  });
});

describe('HealCalculator', () => {
  const page: CalculatorPage = {
    title: 'Heal Calculator',
    description: 'Average normal and critical heals, then divide by cast time for expected healing per second.',
    path: '/heal-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<HealCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Heal Calculator' })).toBeDefined();
    expect(screen.getByText('Base heal')).toBeDefined();
    expect(screen.getByText('Expected heal')).toBeDefined();
  });

  it('averages crit heals and reacts to a stronger spell', () => {
    const { container } = renderCalculatorPage(<HealCalculator />, page);
    const normal = 800 * (1 + 25 / 100);
    const crit = normal * (150 / 100);
    const expected = normal + (20 / 100) * (crit - normal);
    expect(hero(container)).toBe(num(expected));
    expect(screen.getByText('Heal on crit').nextElementSibling!.textContent).toBe(num(crit));

    fireEvent.change(screen.getByLabelText('Base heal'), { target: { value: '1000' } });
    const normal2 = 1000 * (1 + 25 / 100);
    expect(hero(container)).toBe(num(normal2 + (20 / 100) * (normal2 * (150 / 100) - normal2)));
  });
});

describe('DamageCalculator', () => {
  const page: CalculatorPage = {
    title: 'Damage Calculator',
    description: 'Combine base damage, scaling, bonus damage and enemy reduction into final hit damage.',
    path: '/damage-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<DamageCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Damage Calculator' })).toBeDefined();
    expect(screen.getByText('Attack power')).toBeDefined();
    expect(screen.getByText('Final damage')).toBeDefined();
  });

  it('scales then mitigates the hit and reacts to an unarmoured target', () => {
    const { container } = renderCalculatorPage(<DamageCalculator />, page);
    const raw = (150 + (200 * 60) / 100) * (1 + 10 / 100);
    expect(hero(container)).toBe(num(raw * (1 - 30 / 100)));
    expect(screen.getByText('Raw damage before mitigation').nextElementSibling!.textContent).toBe(num(raw));

    fireEvent.change(screen.getByLabelText('Enemy reduction (%)'), { target: { value: '0' } });
    expect(hero(container)).toBe(num(raw * (1 - 0 / 100)));
  });
});

describe('RpgStatCalculator', () => {
  const page: CalculatorPage = {
    title: 'RPG Stat Calculator',
    description: 'Project a character stat through per-level growth and invested stat points.',
    path: '/rpg-stat-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<RpgStatCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'RPG Stat Calculator' })).toBeDefined();
    expect(screen.getByText('Base stat')).toBeDefined();
    expect(screen.getByText('Effective stat')).toBeDefined();
  });

  it('grows the stat through levels and points and reacts to a fresh character', () => {
    const { container } = renderCalculatorPage(<RpgStatCalculator />, page);
    const leveled = 10 * Math.pow(1 + 4 / 100, 15);
    expect(hero(container)).toBe(num(leveled * (1 + 20 / 100)));
    expect(screen.getByText('Stat from levels').nextElementSibling!.textContent).toBe(num(leveled));

    fireEvent.change(screen.getByLabelText('Character level'), { target: { value: '0' } });
    expect(hero(container)).toBe(num(10 * (1 + 20 / 100)));
  });
});

describe('AspectRatioCalculator', () => {
  const page: CalculatorPage = {
    title: 'Aspect Ratio Calculator',
    description: 'Reduce pixel dimensions to a simple ratio such as 16:9 and scale a target frame to match.',
    path: '/aspect-ratio-calculator.html',
    category: 'standard',
  };

  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<AspectRatioCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Aspect Ratio Calculator' })).toBeDefined();
    expect(screen.getByText('Width (px)')).toBeDefined();
    expect(screen.getByText('Aspect ratio')).toBeDefined();
  });

  it('reduces dimensions with the gcd and reacts to a shorter frame', () => {
    const { container } = renderCalculatorPage(<AspectRatioCalculator />, page);
    const d = gcd(1920, 1080);
    expect(hero(container)).toBe(`${1920 / d}:${1080 / d}`);
    expect(screen.getByText('Ratio as decimal').nextElementSibling!.textContent).toBe(num(1920 / 1080));

    fireEvent.change(screen.getByLabelText('Height (px)'), { target: { value: '720' } });
    const d2 = gcd(1920, 720);
    expect(hero(container)).toBe(`${1920 / d2}:${720 / d2}`);
  });
});

describe('PrintSizeCalculator', () => {
  const page: CalculatorPage = {
    title: 'Print Size Calculator',
    description: 'Convert pixel dimensions and DPI into the physical size of a print in inches and centimetres.',
    path: '/print-size-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<PrintSizeCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Print Size Calculator' })).toBeDefined();
    expect(screen.getByText('Print resolution (DPI)')).toBeDefined();
    expect(screen.getByText('Print width')).toBeDefined();
  });

  it('divides pixels by DPI and reacts to a coarser resolution', () => {
    const { container } = renderCalculatorPage(<PrintSizeCalculator />, page);
    expect(hero(container)).toBe(`${num(3000 / 300)} in`);
    expect(screen.getByText('Print height').nextElementSibling!.textContent).toBe(`${num(2000 / 300)} in`);

    fireEvent.change(screen.getByLabelText('Print resolution (DPI)'), { target: { value: '150' } });
    expect(hero(container)).toBe(`${num(3000 / 150)} in`);
  });
});

describe('ImageSizeCalculator', () => {
  const page: CalculatorPage = {
    title: 'Image Size Calculator',
    description: 'Estimate uncompressed image file size from width, height and bits per pixel.',
    path: '/image-size-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<ImageSizeCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Image Size Calculator' })).toBeDefined();
    expect(screen.getByText('Bits per pixel')).toBeDefined();
    expect(screen.getByText('Uncompressed file size')).toBeDefined();
  });

  it('multiplies pixels by bit depth and reacts to greyscale', () => {
    const { container } = renderCalculatorPage(<ImageSizeCalculator />, page);
    const bytes = (4000 * 3000 * 24) / 8;
    expect(hero(container)).toBe(`${num(bytes / (1024 * 1024))} MB`);
    expect(screen.getByText('Total pixels').nextElementSibling!.textContent).toBe(num(4000 * 3000));

    fireEvent.change(screen.getByLabelText('Bits per pixel'), { target: { value: '8' } });
    expect(hero(container)).toBe(`${num((4000 * 3000 * 8) / 8 / (1024 * 1024))} MB`);
  });
});

describe('MegapixelCalculator', () => {
  const page: CalculatorPage = {
    title: 'Megapixel Calculator',
    description: 'Turn width and height in pixels into megapixels, total pixels and printable width.',
    path: '/megapixel-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<MegapixelCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Megapixel Calculator' })).toBeDefined();
    expect(screen.getByText('Width (px)')).toBeDefined();
    expect(screen.getByText('Resolution')).toBeDefined();
  });

  it('divides pixels by a million and reacts to a wider sensor', () => {
    const { container } = renderCalculatorPage(<MegapixelCalculator />, page);
    expect(hero(container)).toBe(`${num((4000 * 3000) / 1_000_000)} MP`);
    expect(screen.getByText('Print width at 300 DPI').nextElementSibling!.textContent).toBe(
      `${num(4000 / 300)} in`
    );

    fireEvent.change(screen.getByLabelText('Width (px)'), { target: { value: '6000' } });
    expect(hero(container)).toBe(`${num((6000 * 3000) / 1_000_000)} MP`);
  });
});

describe('CropFactorCalculator', () => {
  const page: CalculatorPage = {
    title: 'Crop Factor Calculator',
    description: 'Find a sensor crop factor and the 35mm-equivalent focal length of any lens.',
    path: '/crop-factor-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<CropFactorCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Crop Factor Calculator' })).toBeDefined();
    expect(screen.getByText('Sensor width (mm)')).toBeDefined();
    expect(screen.getByText('Crop factor')).toBeDefined();
  });

  it('compares the sensor against full frame and reacts to a full-frame body', () => {
    const { container } = renderCalculatorPage(<CropFactorCalculator />, page);
    expect(hero(container)).toBe(`${num(36 / 23.5)}×`);
    expect(screen.getByText('35mm equivalent focal length').nextElementSibling!.textContent).toBe(
      `${num(50 * (36 / 23.5))} mm`
    );

    fireEvent.change(screen.getByLabelText('Sensor width (mm)'), { target: { value: '36' } });
    expect(hero(container)).toBe(`${num(36 / 36)}×`);
  });
});

describe('FocalLengthCalculator', () => {
  const page: CalculatorPage = {
    title: 'Focal Length Calculator',
    description: 'Solve for the focal length needed for a chosen angle of view on a given sensor size.',
    path: '/focal-length-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<FocalLengthCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Focal Length Calculator' })).toBeDefined();
    expect(screen.getByText('Angle of view (degrees)')).toBeDefined();
    expect(screen.getByText('Focal length')).toBeDefined();
  });

  it('solves from sensor and angle and reacts to a wider lens', () => {
    const { container } = renderCalculatorPage(<FocalLengthCalculator />, page);
    const focal = 36 / (2 * Math.tan((20 * Math.PI) / 180));
    expect(hero(container)).toBe(`${num(focal)} mm`);
    expect(screen.getByText('Width covered at focus distance').nextElementSibling!.textContent).toBe(
      `${num((36 * 5 * 1000) / focal)} mm`
    );

    fireEvent.change(screen.getByLabelText('Angle of view (degrees)'), { target: { value: '60' } });
    expect(hero(container)).toBe(`${num(36 / (2 * Math.tan((30 * Math.PI) / 180)))} mm`);
  });
});

describe('AngleOfViewCalculator', () => {
  const page: CalculatorPage = {
    title: 'Angle of View Calculator',
    description: 'Calculate the angle of view from focal length and sensor size, plus coverage at a distance.',
    path: '/angle-of-view-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<AngleOfViewCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Angle of View Calculator' })).toBeDefined();
    expect(screen.getByText('Focal length (mm)')).toBeDefined();
    expect(screen.getByText('Angle of view')).toBeDefined();
  });

  it('opens the angle as the lens widens and reacts to a shorter focal length', () => {
    const { container } = renderCalculatorPage(<AngleOfViewCalculator />, page);
    const angle = 2 * Math.atan(36 / (2 * 50)) * (180 / Math.PI);
    expect(hero(container)).toBe(`${num(angle)}°`);
    expect(screen.getByText('Coverage at subject distance').nextElementSibling!.textContent).toBe(
      `${num((36 * 5 * 1000) / 50)} mm`
    );

    fireEvent.change(screen.getByLabelText('Focal length (mm)'), { target: { value: '24' } });
    expect(hero(container)).toBe(`${num(2 * Math.atan(36 / (2 * 24)) * (180 / Math.PI))}°`);
  });
});

describe('FieldOfViewCalculator', () => {
  const page: CalculatorPage = {
    title: 'Field of View Calculator',
    description: 'Work out how wide a scene your lens captures at a chosen distance from the subject.',
    path: '/field-of-view-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<FieldOfViewCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Field of View Calculator' })).toBeDefined();
    expect(screen.getByText('Distance to subject (m)')).toBeDefined();
    expect(screen.getByText('Field of view width')).toBeDefined();
  });

  it('scales coverage with distance and reacts to stepping closer', () => {
    const { container } = renderCalculatorPage(<FieldOfViewCalculator />, page);
    expect(hero(container)).toBe(`${num((36 * 10) / 35)} m`);
    expect(screen.getByText('Angle of view').nextElementSibling!.textContent).toBe(
      `${num(2 * Math.atan(36 / (2 * 35)) * (180 / Math.PI))}°`
    );

    fireEvent.change(screen.getByLabelText('Distance to subject (m)'), { target: { value: '5' } });
    expect(hero(container)).toBe(`${num((36 * 5) / 35)} m`);
  });
});

describe('HyperfocalDistanceCalculator', () => {
  const page: CalculatorPage = {
    title: 'Hyperfocal Distance Calculator',
    description: 'Find the focus distance that keeps everything from half that distance to infinity sharp.',
    path: '/hyperfocal-distance-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<HyperfocalDistanceCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Hyperfocal Distance Calculator' })).toBeDefined();
    expect(screen.getByText('Aperture (f/)')).toBeDefined();
    expect(screen.getByText('Hyperfocal distance')).toBeDefined();
  });

  it('solves the hyperfocal formula and reacts to stopping down', () => {
    const { container } = renderCalculatorPage(<HyperfocalDistanceCalculator />, page);
    const mm = (50 * 50) / (8 * 0.03) + 50;
    expect(hero(container)).toBe(`${num(mm / 1000)} m`);
    expect(screen.getByText('Near sharp limit').nextElementSibling!.textContent).toBe(`${num(mm / 2000)} m`);

    fireEvent.change(screen.getByLabelText('Aperture (f/)'), { target: { value: '16' } });
    expect(hero(container)).toBe(`${num(((50 * 50) / (16 * 0.03) + 50) / 1000)} m`);
  });
});

describe('DepthOfFieldCalculator', () => {
  const page: CalculatorPage = {
    title: 'Depth of Field Calculator',
    description: 'Get near and far sharpness limits from focal length, aperture, focus distance and CoC.',
    path: '/depth-of-field-calculator.html',
    category: 'standard',
  };

  const limits = (f: number, n: number, s: number, c: number) => {
    const f2 = f * f;
    const spread = n * c * (s - f);
    const near = (s * f2) / (f2 + spread);
    const far = (s * f2) / (f2 - spread);
    return { near, far, total: far - near };
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<DepthOfFieldCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Depth of Field Calculator' })).toBeDefined();
    expect(screen.getByText('Focus distance (mm)')).toBeDefined();
    expect(screen.getByText('Total depth of field')).toBeDefined();
  });

  it('spans near and far limits and reacts to focusing closer', () => {
    const { container } = renderCalculatorPage(<DepthOfFieldCalculator />, page);
    const before = limits(50, 8, 5000, 0.03);
    expect(hero(container)).toBe(`${num(before.total / 1000)} m`);
    expect(screen.getByText('Near limit').nextElementSibling!.textContent).toBe(`${num(before.near / 1000)} m`);

    fireEvent.change(screen.getByLabelText('Focus distance (mm)'), { target: { value: '2000' } });
    const after = limits(50, 8, 2000, 0.03);
    expect(hero(container)).toBe(`${num(after.total / 1000)} m`);
  });
});

describe('ExposureCalculator', () => {
  const page: CalculatorPage = {
    title: 'Exposure Calculator',
    description: 'Compute exposure value from aperture, shutter speed and ISO on the standard EV scale.',
    path: '/exposure-calculator.html',
    category: 'standard',
  };

  const ev = (n: number, t: number, iso: number) => Math.log2((n * n) / t) - Math.log2(iso / 100);

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<ExposureCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Exposure Calculator' })).toBeDefined();
    expect(screen.getByText('Shutter speed (seconds)')).toBeDefined();
    expect(screen.getByText('Exposure value')).toBeDefined();
  });

  it('scores the combination on the EV scale and reacts to a faster ISO', () => {
    const { container } = renderCalculatorPage(<ExposureCalculator />, page);
    expect(hero(container)).toBe(num(ev(8, 0.008, 100)));
    expect(screen.getByText('EV at ISO 100').nextElementSibling!.textContent).toBe(num(Math.log2((8 * 8) / 0.008)));

    fireEvent.change(screen.getByLabelText('ISO'), { target: { value: '200' } });
    expect(hero(container)).toBe(num(ev(8, 0.008, 200)));
  });
});

describe('IsoCalculator', () => {
  const page: CalculatorPage = {
    title: 'ISO Calculator',
    description: 'Adjust ISO by exposure stops for brighter or darker scenes while holding the same exposure.',
    path: '/iso-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<IsoCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'ISO Calculator' })).toBeDefined();
    expect(screen.getByText('Metered ISO')).toBeDefined();
    expect(screen.getByText('Recommended ISO')).toBeDefined();
  });

  it('divides ISO for a brighter scene and reacts to a darker one', () => {
    const { container } = renderCalculatorPage(<IsoCalculator />, page);
    expect(hero(container)).toBe(num(Math.round(400 * Math.pow(2, -2))));
    expect(screen.getByText('ISO change factor').nextElementSibling!.textContent).toBe(num(Math.pow(2, -2)));

    fireEvent.change(screen.getByLabelText('Scene stops brighter'), { target: { value: '-2' } });
    expect(hero(container)).toBe(num(Math.round(400 * Math.pow(2, 2))));
  });
});

describe('ShutterSpeedCalculator', () => {
  const page: CalculatorPage = {
    title: 'Shutter Speed Calculator',
    description: 'Apply the reciprocal rule to find a sharp handheld shutter speed for your lens and crop factor.',
    path: '/shutter-speed-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<ShutterSpeedCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Shutter Speed Calculator' })).toBeDefined();
    expect(screen.getByText('Crop factor')).toBeDefined();
    expect(screen.getByText('Minimum shutter speed')).toBeDefined();
  });

  it('applies the reciprocal rule and reacts to a longer lens', () => {
    const { container } = renderCalculatorPage(<ShutterSpeedCalculator />, page);
    const equivalent = 50 * 1.5;
    expect(hero(container)).toBe(`1/${Math.round(equivalent)} s`);
    expect(screen.getByText('Shutter time (seconds)').nextElementSibling!.textContent).toBe(num(1 / equivalent));

    fireEvent.change(screen.getByLabelText('Focal length (mm)'), { target: { value: '200' } });
    expect(hero(container)).toBe(`1/${Math.round(200 * 1.5)} s`);
  });
});

describe('ApertureCalculator', () => {
  const page: CalculatorPage = {
    title: 'Aperture Calculator',
    description: 'Derive the f-number from focal length and entrance pupil, with area and relative light.',
    path: '/aperture-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<ApertureCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Aperture Calculator' })).toBeDefined();
    expect(screen.getByText('Entrance pupil (mm)')).toBeDefined();
    expect(screen.getByText('Aperture')).toBeDefined();
  });

  it('divides focal length by pupil diameter and reacts to a smaller opening', () => {
    const { container } = renderCalculatorPage(<ApertureCalculator />, page);
    expect(hero(container)).toBe(`f/${num(50 / 25)}`);
    expect(screen.getByText('Entrance pupil area').nextElementSibling!.textContent).toBe(
      `${num(Math.PI * Math.pow(25 / 2, 2))} mm²`
    );

    fireEvent.change(screen.getByLabelText('Entrance pupil (mm)'), { target: { value: '12.5' } });
    expect(hero(container)).toBe(`f/${num(50 / 12.5)}`);
  });
});

describe('DbCalculator', () => {
  const page: CalculatorPage = {
    title: 'dB Calculator',
    description: 'Add levels and gain in decibels and convert the result into amplitude and power ratios.',
    path: '/db-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<DbCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'dB Calculator' })).toBeDefined();
    expect(screen.getByText('Gain (dB)')).toBeDefined();
    expect(screen.getByText('Output level')).toBeDefined();
  });

  it('adds level and gain and reacts to removing the boost', () => {
    const { container } = renderCalculatorPage(<DbCalculator />, page);
    expect(hero(container)).toBe(`${num(-6 + 10)} dB`);
    expect(screen.getByText('Power ratio').nextElementSibling!.textContent).toBe(num(Math.pow(10, 4 / 10)));

    fireEvent.change(screen.getByLabelText('Gain (dB)'), { target: { value: '0' } });
    expect(hero(container)).toBe(`${num(-6 + 0)} dB`);
  });
});

describe('SoundLevelCalculator', () => {
  const page: CalculatorPage = {
    title: 'Sound Level Calculator',
    description: 'Combine two sound sources in decibels to see the total level they produce together.',
    path: '/sound-level-calculator.html',
    category: 'standard',
  };

  const combine = (a: number, b: number) => 10 * Math.log10(Math.pow(10, a / 10) + Math.pow(10, b / 10));

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<SoundLevelCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Sound Level Calculator' })).toBeDefined();
    expect(screen.getByText('Source A level (dB)')).toBeDefined();
    expect(screen.getByText('Combined sound level')).toBeDefined();
  });

  it('adds sources logarithmically and reacts to a quieter second source', () => {
    const { container } = renderCalculatorPage(<SoundLevelCalculator />, page);
    expect(hero(container)).toBe(`${num(combine(60, 70))} dB`);
    expect(screen.getByText('Level difference').nextElementSibling!.textContent).toBe(`${num(10)} dB`);

    fireEvent.change(screen.getByLabelText('Source B level (dB)'), { target: { value: '60' } });
    expect(hero(container)).toBe(`${num(combine(60, 60))} dB`);
  });
});

describe('DecibelCalculator', () => {
  const page: CalculatorPage = {
    title: 'Decibel Calculator',
    description: 'Convert a decibel difference into power and voltage ratios against a reference wattage.',
    path: '/decibel-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<DecibelCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Decibel Calculator' })).toBeDefined();
    expect(screen.getByText('Reference power (W)')).toBeDefined();
    expect(screen.getByText('Target power')).toBeDefined();
  });

  it('scales power by the dB difference and reacts to a bigger jump', () => {
    const { container } = renderCalculatorPage(<DecibelCalculator />, page);
    expect(hero(container)).toBe(`${num(100 * Math.pow(10, 3 / 10))} W`);
    expect(screen.getByText('Power ratio').nextElementSibling!.textContent).toBe(num(Math.pow(10, 3 / 10)));

    fireEvent.change(screen.getByLabelText('Level difference (dB)'), { target: { value: '10' } });
    expect(hero(container)).toBe(`${num(100 * Math.pow(10, 10 / 10))} W`);
  });
});

describe('AudioVolumeCalculator', () => {
  const page: CalculatorPage = {
    title: 'Audio Volume Calculator',
    description: 'Predict listening-position loudness from amplifier power, speaker sensitivity and distance.',
    path: '/audio-volume-calculator.html',
    category: 'standard',
  };

  const spl = (watts: number, sensitivity: number, distance: number) =>
    sensitivity + 10 * Math.log10(watts) - 20 * Math.log10(distance);

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<AudioVolumeCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Audio Volume Calculator' })).toBeDefined();
    expect(screen.getByText('Speaker sensitivity (dB @ 1W/1m)')).toBeDefined();
    expect(screen.getByText('Sound pressure level')).toBeDefined();
  });

  it('reaches the listening position and reacts to stepping back', () => {
    const { container } = renderCalculatorPage(<AudioVolumeCalculator />, page);
    expect(hero(container)).toBe(`${num(spl(50, 87, 3))} dB SPL`);
    expect(screen.getByText('Level at 1 m').nextElementSibling!.textContent).toBe(
      `${num(87 + 10 * Math.log10(50))} dB`
    );

    fireEvent.change(screen.getByLabelText('Listening distance (m)'), { target: { value: '6' } });
    expect(hero(container)).toBe(`${num(spl(50, 87, 6))} dB SPL`);
  });
});

describe('ScaleCalculator', () => {
  const page: CalculatorPage = {
    title: 'Scale Calculator',
    description: 'Build major, minor or chromatic scale frequencies from a root note in hertz.',
    path: '/scale-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<ScaleCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Scale Calculator' })).toBeDefined();
    expect(screen.getByText('Scale type')).toBeDefined();
    expect(screen.getByText('Tonic frequency')).toBeDefined();
  });

  it('stacks scale ratios on the root and reacts to a minor scale', () => {
    const { container } = renderCalculatorPage(<ScaleCalculator />, page);
    expect(hero(container)).toBe(`${num(261.63)} Hz`);
    expect(screen.getByText('Third degree').nextElementSibling!.textContent).toBe(
      `${num(261.63 * (5 / 4))} Hz`
    );
    expect(screen.getByText('Fifth degree').nextElementSibling!.textContent).toBe(
      `${num(261.63 * (3 / 2))} Hz`
    );

    fireEvent.change(screen.getByLabelText('Scale type'), { target: { value: 'minor' } });
    expect(screen.getByText('Third degree').nextElementSibling!.textContent).toBe(
      `${num(261.63 * (6 / 5))} Hz`
    );
  });
});

describe('ChordCalculator', () => {
  const page: CalculatorPage = {
    title: 'Chord Calculator',
    description: 'Stack the third and fifth on a root frequency for major, minor, diminished or augmented chords.',
    path: '/chord-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<ChordCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Chord Calculator' })).toBeDefined();
    expect(screen.getByText('Chord type')).toBeDefined();
    expect(screen.getByText('Root frequency')).toBeDefined();
  });

  it('builds the triad and reacts to a minor chord', () => {
    const { container } = renderCalculatorPage(<ChordCalculator />, page);
    expect(hero(container)).toBe(`${num(261.63)} Hz`);
    expect(screen.getByText('Third').nextElementSibling!.textContent).toBe(`${num(261.63 * (5 / 4))} Hz`);

    fireEvent.change(screen.getByLabelText('Chord type'), { target: { value: 'minor' } });
    expect(screen.getByText('Third').nextElementSibling!.textContent).toBe(`${num(261.63 * (6 / 5))} Hz`);
  });
});

describe('IntervalCalculator', () => {
  const page: CalculatorPage = {
    title: 'Interval Calculator',
    description: 'Measure the musical interval between two frequencies in semitones, cents and octaves.',
    path: '/interval-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<IntervalCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Interval Calculator' })).toBeDefined();
    expect(screen.getByText('Lower frequency (Hz)')).toBeDefined();
    expect(screen.getByText('Interval (semitones)')).toBeDefined();
  });

  it('measures a perfect fifth and reacts to a full octave', () => {
    const { container } = renderCalculatorPage(<IntervalCalculator />, page);
    expect(hero(container)).toBe(num(12 * Math.log2(392.445 / 261.63)));
    expect(screen.getByText('Frequency ratio').nextElementSibling!.textContent).toBe(
      num(392.445 / 261.63)
    );

    fireEvent.change(screen.getByLabelText('Higher frequency (Hz)'), { target: { value: '523.26' } });
    expect(hero(container)).toBe(num(12 * Math.log2(523.26 / 261.63)));
  });
});

describe('PitchCalculator', () => {
  const page: CalculatorPage = {
    title: 'Pitch Calculator',
    description: 'Shift a reference pitch by semitones to find the resulting frequency and MIDI note.',
    path: '/pitch-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<PitchCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Pitch Calculator' })).toBeDefined();
    expect(screen.getByText('Semitones from reference')).toBeDefined();
    expect(screen.getByText('Frequency')).toBeDefined();
  });

  it('holds the reference at zero and reacts to an octave up', () => {
    const { container } = renderCalculatorPage(<PitchCalculator />, page);
    expect(hero(container)).toBe(`${num(440 * Math.pow(2, 0 / 12))} Hz`);
    expect(screen.getByText('MIDI note').nextElementSibling!.textContent).toBe(num(69 + 0));

    fireEvent.change(screen.getByLabelText('Semitones from reference'), { target: { value: '12' } });
    expect(hero(container)).toBe(`${num(440 * Math.pow(2, 12 / 12))} Hz`);
  });
});

describe('NoteToFrequencyCalculator', () => {
  const page: CalculatorPage = {
    title: 'Note to Frequency Calculator',
    description: 'Turn note names such as A4 or F#3 into exact frequencies in hertz and MIDI numbers.',
    path: '/note-to-frequency-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<NoteToFrequencyCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Note to Frequency Calculator' })).toBeDefined();
    expect(screen.getByText('Note name')).toBeDefined();
    expect(screen.getByText('Frequency')).toBeDefined();
  });

  it('resolves A4 to 440 Hz and reacts to C5', () => {
    const { container } = renderCalculatorPage(<NoteToFrequencyCalculator />, page);
    expect(hero(container)).toBe(`${num(440 * Math.pow(2, (69 - 69) / 12))} Hz`);
    expect(screen.getByText('MIDI note number').nextElementSibling!.textContent).toBe(num(69));

    fireEvent.change(screen.getByLabelText('Note name'), { target: { value: 'C5' } });
    expect(hero(container)).toBe(`${num(440 * Math.pow(2, (72 - 69) / 12))} Hz`);
  });
});

describe('FrequencyToNoteCalculator', () => {
  const page: CalculatorPage = {
    title: 'Frequency to Note Calculator',
    description: 'Find the nearest musical note for any frequency, with the offset measured in cents.',
    path: '/frequency-to-note-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<FrequencyToNoteCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Frequency to Note Calculator' })).toBeDefined();
    expect(screen.getByText('Frequency (Hz)')).toBeDefined();
    expect(screen.getByText('Nearest note')).toBeDefined();
  });

  it('maps 440 Hz to A4 and reacts to a semitone up', () => {
    const { container } = renderCalculatorPage(<FrequencyToNoteCalculator />, page);
    expect(hero(container)).toBe('A4');
    expect(screen.getByText('Exact note frequency').nextElementSibling!.textContent).toBe(
      `${num(440)} Hz`
    );

    fireEvent.change(screen.getByLabelText('Frequency (Hz)'), {
      target: { value: String(440 * Math.pow(2, 1 / 12)) },
    });
    expect(hero(container)).toBe('A#4');
  });
});

describe('MetronomeCalculator', () => {
  const page: CalculatorPage = {
    title: 'Metronome Calculator',
    description: 'Time practice phrases from tempo, beats per measure and the number of measures.',
    path: '/metronome-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<MetronomeCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Metronome Calculator' })).toBeDefined();
    expect(screen.getByText('Beats per measure')).toBeDefined();
    expect(screen.getByText('Total duration')).toBeDefined();
  });

  it('times the phrase and reacts to a slower tempo', () => {
    const { container } = renderCalculatorPage(<MetronomeCalculator />, page);
    expect(hero(container)).toBe(`${num(4 * 4 * (60 / 120))} s`);
    expect(screen.getByText('Seconds per measure').nextElementSibling!.textContent).toBe(
      num(4 * (60 / 120))
    );

    fireEvent.change(screen.getByLabelText('Tempo (BPM)'), { target: { value: '60' } });
    expect(hero(container)).toBe(`${num(4 * 4 * (60 / 60))} s`);
  });
});

describe('TempoCalculator', () => {
  const page: CalculatorPage = {
    title: 'Tempo Calculator',
    description: 'Rescale a track tempo by a percentage and see how its duration changes with it.',
    path: '/tempo-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<TempoCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Tempo Calculator' })).toBeDefined();
    expect(screen.getByText('Tempo change (%)')).toBeDefined();
    expect(screen.getByText('New tempo')).toBeDefined();
  });

  it('raises the tempo and shortens the track and reacts to no change', () => {
    const { container } = renderCalculatorPage(<TempoCalculator />, page);
    expect(hero(container)).toBe(`${num(120 * 1.1)} BPM`);
    expect(screen.getByText('New duration').nextElementSibling!.textContent).toBe(
      `${num((180 * 120) / (120 * 1.1))} s`
    );

    fireEvent.change(screen.getByLabelText('Tempo change (%)'), { target: { value: '0' } });
    expect(hero(container)).toBe(`${num(120)} BPM`);
  });
});

describe('TimeSignatureCalculator', () => {
  const page: CalculatorPage = {
    title: 'Time Signature Calculator',
    description: 'Convert any time signature and tempo into seconds per bar and bars per minute.',
    path: '/time-signature-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<TimeSignatureCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Time Signature Calculator' })).toBeDefined();
    expect(screen.getByText('Note value')).toBeDefined();
    expect(screen.getByText('Seconds per measure')).toBeDefined();
  });

  it('lengthens bars with more beats and reacts to a 6-beat bar', () => {
    const { container } = renderCalculatorPage(<TimeSignatureCalculator />, page);
    expect(hero(container)).toBe(`${num(4 * (4 / 4) * (60 / 120))} s`);
    expect(screen.getByText('Note duration').nextElementSibling!.textContent).toBe(
      `${num((4 / 4) * (60 / 120))} s`
    );

    fireEvent.change(screen.getByLabelText('Beats per measure'), { target: { value: '6' } });
    expect(hero(container)).toBe(`${num(6 * (4 / 4) * (60 / 120))} s`);
  });
});

describe('NoteLengthCalculator', () => {
  const page: CalculatorPage = {
    title: 'Note Length Calculator',
    description: 'Work out how long a run of notes lasts in seconds from tempo and beats per note.',
    path: '/note-length-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<NoteLengthCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Note Length Calculator' })).toBeDefined();
    expect(screen.getByText('Beats per note')).toBeDefined();
    expect(screen.getByText('Total duration')).toBeDefined();
  });

  it('adds note lengths together and reacts to a longer phrase', () => {
    const { container } = renderCalculatorPage(<NoteLengthCalculator />, page);
    const perNote = 2 * (60 / 90);
    expect(hero(container)).toBe(`${num(4 * perNote)} s`);
    expect(screen.getByText('Seconds per note').nextElementSibling!.textContent).toBe(`${num(perNote)} s`);

    fireEvent.change(screen.getByLabelText('Number of notes'), { target: { value: '8' } });
    expect(hero(container)).toBe(`${num(8 * perNote)} s`);
  });
});

describe('BeatDurationCalculator', () => {
  const page: CalculatorPage = {
    title: 'Beat Duration Calculator',
    description: 'Convert a tempo into milliseconds and seconds per beat for beatmatching and production.',
    path: '/beat-duration-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<BeatDurationCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Beat Duration Calculator' })).toBeDefined();
    expect(screen.getByText('Tempo (BPM)')).toBeDefined();
    expect(screen.getByText('Seconds per beat')).toBeDefined();
  });

  it('divides a minute into beats and reacts to half time', () => {
    const { container } = renderCalculatorPage(<BeatDurationCalculator />, page);
    expect(hero(container)).toBe(num(60 / 128));
    expect(screen.getByText('Milliseconds per beat').nextElementSibling!.textContent).toBe(
      num((60 / 128) * 1000)
    );

    fireEvent.change(screen.getByLabelText('Tempo (BPM)'), { target: { value: '60' } });
    expect(hero(container)).toBe(num(60 / 60));
  });
});

describe('BpmCalculator', () => {
  const page: CalculatorPage = {
    title: 'BPM Calculator',
    description: 'Derive beats per minute from a counted number of beats over a known duration.',
    path: '/bpm-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<BpmCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'BPM Calculator' })).toBeDefined();
    expect(screen.getByText('Beats counted')).toBeDefined();
    expect(screen.getByText('Tempo')).toBeDefined();
  });

  it('counts beats over time and reacts to a longer window', () => {
    const { container } = renderCalculatorPage(<BpmCalculator />, page);
    expect(hero(container)).toBe(`${num((40 * 60) / 18.75)} BPM`);
    expect(screen.getByText('Seconds per beat').nextElementSibling!.textContent).toBe(num(18.75 / 40));

    fireEvent.change(screen.getByLabelText('Duration (seconds)'), { target: { value: '30' } });
    expect(hero(container)).toBe(`${num((40 * 60) / 30)} BPM`);
  });
});

describe('StarTemperatureCalculator', () => {
  const page: CalculatorPage = {
    title: 'Star Temperature Calculator',
    description: 'Apply Wiens law to a stars peak wavelength and get its surface temperature in kelvin.',
    path: '/star-temperature-calculator.html',
    category: 'scientific',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<StarTemperatureCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Star Temperature Calculator' })).toBeDefined();
    expect(screen.getByText('Peak wavelength (nm)')).toBeDefined();
    expect(screen.getByText('Surface temperature')).toBeDefined();
  });

  it('applies Wiens law and reacts to a bluer wavelength', () => {
    const { container } = renderCalculatorPage(<StarTemperatureCalculator />, page);
    const kelvin = 2897771.955 / 500;
    expect(hero(container)).toBe(`${num(kelvin)} K`);
    expect(screen.getByText('Celsius').nextElementSibling!.textContent).toBe(`${num(kelvin - 273.15)} °C`);

    fireEvent.change(screen.getByLabelText('Peak wavelength (nm)'), { target: { value: '450' } });
    expect(hero(container)).toBe(`${num(2897771.955 / 450)} K`);
  });
});

describe('StarBrightnessCalculator', () => {
  const page: CalculatorPage = {
    title: 'Star Brightness Calculator',
    description: 'Use apparent and absolute magnitude to find a stars distance with the distance modulus.',
    path: '/star-brightness-calculator.html',
    category: 'scientific',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<StarBrightnessCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Star Brightness Calculator' })).toBeDefined();
    expect(screen.getByText('Apparent magnitude')).toBeDefined();
    expect(screen.getByText('Distance')).toBeDefined();
  });

  it('converts magnitudes into parsecs and reacts to a brighter star', () => {
    const { container } = renderCalculatorPage(<StarBrightnessCalculator />, page);
    expect(hero(container)).toBe(`${num(Math.pow(10, (6 - 4.8 + 5) / 5))} pc`);
    expect(screen.getByText('Brightness ratio').nextElementSibling!.textContent).toBe(
      num(Math.pow(10, 0.4 * (6 - 4.8))),
    );

    fireEvent.change(screen.getByLabelText('Apparent magnitude'), { target: { value: '1' } });
    expect(hero(container)).toBe(`${num(Math.pow(10, (1 - 4.8 + 5) / 5))} pc`);
  });
});

describe('StarDistanceCalculator', () => {
  const page: CalculatorPage = {
    title: 'Star Distance Calculator',
    description: 'Convert a parallax measurement in milliarcseconds into parsecs, light years and AU.',
    path: '/star-distance-calculator.html',
    category: 'scientific',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<StarDistanceCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Star Distance Calculator' })).toBeDefined();
    expect(screen.getByText('Parallax (milliarcseconds)')).toBeDefined();
    expect(screen.getByText('Distance')).toBeDefined();
  });

  it('inverts parallax into parsecs and reacts to a wider parallax', () => {
    const { container } = renderCalculatorPage(<StarDistanceCalculator />, page);
    expect(hero(container)).toBe(`${num(1000 / 58.79)} pc`);
    expect(screen.getByText('Distance in AU').nextElementSibling!.textContent).toBe(
      num((1000 / 58.79) * 206264.806),
    );

    fireEvent.change(screen.getByLabelText('Parallax (milliarcseconds)'), { target: { value: '100' } });
    expect(hero(container)).toBe(`${num(10)} pc`);
  });
});

describe('YearLengthOnOtherPlanetsCalculator', () => {
  const page: CalculatorPage = {
    title: 'Year Length on Other Planets Calculator',
    description: 'Compare how long a year lasts on every planet in the solar system, in Earth time.',
    path: '/year-length-on-other-planets-calculator.html',
    category: 'scientific',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<YearLengthOnOtherPlanetsCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Year Length on Other Planets Calculator' })).toBeDefined();
    expect(screen.getByText('Planet')).toBeDefined();
    expect(screen.getByText('Year length')).toBeDefined();
  });

  it('reports the Martian year and reacts to Jupiter', () => {
    const { container } = renderCalculatorPage(<YearLengthOnOtherPlanetsCalculator />, page);
    expect(hero(container)).toBe(`${num(686.98)} Earth days`);
    expect(screen.getByText('In Earth hours').nextElementSibling!.textContent).toBe(num(686.98 * 24));

    fireEvent.change(screen.getByLabelText('Planet'), { target: { value: 'jupiter' } });
    expect(hero(container)).toBe(`${num(4332.59)} Earth days`);
  });
});

describe('DayLengthOnOtherPlanetsCalculator', () => {
  const page: CalculatorPage = {
    title: 'Day Length on Other Planets Calculator',
    description: 'See how long one planetary day lasts in Earth hours for each world in the solar system.',
    path: '/day-length-on-other-planets-calculator.html',
    category: 'scientific',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<DayLengthOnOtherPlanetsCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Day Length on Other Planets Calculator' })).toBeDefined();
    expect(screen.getByText('Planet')).toBeDefined();
    expect(screen.getByText('Day length')).toBeDefined();
  });

  it('reports the Martian sol and reacts to Jupiter', () => {
    const { container } = renderCalculatorPage(<DayLengthOnOtherPlanetsCalculator />, page);
    expect(hero(container)).toBe(`${num(24.6593)} Earth hours`);
    expect(screen.getByText('In Earth minutes').nextElementSibling!.textContent).toBe(num(24.6593 * 60));

    fireEvent.change(screen.getByLabelText('Planet'), { target: { value: 'jupiter' } });
    expect(hero(container)).toBe(`${num(9.925)} Earth hours`);
  });
});

describe('AgeOnOtherPlanetsCalculator', () => {
  const page: CalculatorPage = {
    title: 'Age on Other Planets Calculator',
    description: 'Convert your Earth age into years on Mars, Jupiter or any other planet in the solar system.',
    path: '/age-on-other-planets-calculator.html',
    category: 'scientific',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<AgeOnOtherPlanetsCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Age on Other Planets Calculator' })).toBeDefined();
    expect(screen.getByText('Age on Earth (years)')).toBeDefined();
    expect(screen.getByText('Age on this planet')).toBeDefined();
  });

  it('converts Earth years into Martian years and reacts to Jupiter', () => {
    const { container } = renderCalculatorPage(<AgeOnOtherPlanetsCalculator />, page);
    expect(hero(container)).toBe(`${num((30 * 365.256) / 686.98)} years`);
    expect(screen.getByText('Earth days lived').nextElementSibling!.textContent).toBe(num(30 * 365.256));

    fireEvent.change(screen.getByLabelText('Planet'), { target: { value: 'jupiter' } });
    expect(hero(container)).toBe(`${num((30 * 365.256) / 4332.59)} years`);
  });
});

describe('WeightOnOtherPlanetsCalculator', () => {
  const page: CalculatorPage = {
    title: 'Weight on Other Planets Calculator',
    description: 'Convert your mass into newtons of weight using the surface gravity of any planet.',
    path: '/weight-on-other-planets-calculator.html',
    category: 'scientific',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<WeightOnOtherPlanetsCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Weight on Other Planets Calculator' })).toBeDefined();
    expect(screen.getByText('Mass (kg)')).toBeDefined();
    expect(screen.getByText('Weight on this planet')).toBeDefined();
  });

  it('multiplies mass by Martian gravity and reacts to Jupiter', () => {
    const { container } = renderCalculatorPage(<WeightOnOtherPlanetsCalculator />, page);
    expect(hero(container)).toBe(`${num(70 * 3.721)} N`);
    expect(screen.getByText('Relative to Earth').nextElementSibling!.textContent).toBe(`${num(3.721 / 9.80665)}×`);

    fireEvent.change(screen.getByLabelText('Planet'), { target: { value: 'jupiter' } });
    expect(hero(container)).toBe(`${num(70 * 24.79)} N`);
  });
});

describe('GravityOnOtherPlanetsCalculator', () => {
  const page: CalculatorPage = {
    title: 'Gravity on Other Planets Calculator',
    description: 'Derive surface gravity from planetary mass and radius with Newtons law of gravitation.',
    path: '/gravity-on-other-planets-calculator.html',
    category: 'scientific',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<GravityOnOtherPlanetsCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Gravity on Other Planets Calculator' })).toBeDefined();
    expect(screen.getByText('Mass (×10²⁴ kg)')).toBeDefined();
    expect(screen.getByText('Surface gravity')).toBeDefined();
  });

  it('derives gravity from mass and radius and reacts to Earth values', () => {
    const { container } = renderCalculatorPage(<GravityOnOtherPlanetsCalculator />, page);
    const marsGravity = (6.674e-11 * (0.64171 * 1e24)) / (3389.5 * 1000 * (3389.5 * 1000));
    expect(hero(container)).toBe(`${num(marsGravity)} m/s²`);
    expect(screen.getByText('Relative to Earth').nextElementSibling!.textContent).toBe(`${num(marsGravity / 9.80665)}×`);

    fireEvent.change(screen.getByLabelText('Mass (×10²⁴ kg)'), { target: { value: '5.9724' } });
    fireEvent.change(screen.getByLabelText('Mean radius (km)'), { target: { value: '6371' } });
    const earthGravity = (6.674e-11 * (5.9724 * 1e24)) / (6371 * 1000 * (6371 * 1000));
    expect(hero(container)).toBe(`${num(earthGravity)} m/s²`);
  });
});

describe('OrbitalDistanceCalculator', () => {
  const page: CalculatorPage = {
    title: 'Orbital Distance Calculator',
    description: 'Turn an orbital period in years into the semi-major axis in AU, million km and light time.',
    path: '/orbital-distance-calculator.html',
    category: 'scientific',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<OrbitalDistanceCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Orbital Distance Calculator' })).toBeDefined();
    expect(screen.getByText('Orbital period (years)')).toBeDefined();
    expect(screen.getByText('Orbital distance')).toBeDefined();
  });

  it('raises the period to the two thirds power and reacts to a one year orbit', () => {
    const { container } = renderCalculatorPage(<OrbitalDistanceCalculator />, page);
    expect(hero(container)).toBe(`${num(Math.pow(1.881, 2 / 3))} AU`);
    expect(screen.getByText('Distance (million km)').nextElementSibling!.textContent).toBe(
      num(Math.pow(1.881, 2 / 3) * 149.597871),
    );

    fireEvent.change(screen.getByLabelText('Orbital period (years)'), { target: { value: '1' } });
    expect(hero(container)).toBe(`${num(1)} AU`);
  });
});

describe('OrbitalPeriodCalculator', () => {
  const page: CalculatorPage = {
    title: 'Orbital Period Calculator',
    description: 'Work out how long an orbit takes from its semi-major axis using Keplers third law.',
    path: '/orbital-period-calculator.html',
    category: 'scientific',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<OrbitalPeriodCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Orbital Period Calculator' })).toBeDefined();
    expect(screen.getByText('Semi-major axis (AU)')).toBeDefined();
    expect(screen.getByText('Orbital period')).toBeDefined();
  });

  it('cubes the axis into a period and reacts to one AU', () => {
    const { container } = renderCalculatorPage(<OrbitalPeriodCalculator />, page);
    expect(hero(container)).toBe(`${num(Math.pow(5.203, 1.5))} years`);
    expect(screen.getByText('Period in days').nextElementSibling!.textContent).toBe(
      num(Math.pow(5.203, 1.5) * 365.256),
    );

    fireEvent.change(screen.getByLabelText('Semi-major axis (AU)'), { target: { value: '1' } });
    expect(hero(container)).toBe(`${num(1)} years`);
  });
});

describe('EscapeVelocityCalculator', () => {
  const page: CalculatorPage = {
    title: 'Escape Velocity Calculator',
    description: 'Find the speed needed to escape a body from its mass and mean radius.',
    path: '/escape-velocity-calculator.html',
    category: 'scientific',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<EscapeVelocityCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Escape Velocity Calculator' })).toBeDefined();
    expect(screen.getByText('Mass (×10²⁴ kg)')).toBeDefined();
    expect(screen.getByText('Escape velocity')).toBeDefined();
  });

  it('computes Earth escape speed and reacts to Mars values', () => {
    const { container } = renderCalculatorPage(<EscapeVelocityCalculator />, page);
    const earth = Math.sqrt((2 * 6.674e-11 * (5.9724 * 1e24)) / (6371 * 1000));
    expect(hero(container)).toBe(`${num(earth / 1000)} km/s`);
    expect(screen.getByText('Speed (m/s)').nextElementSibling!.textContent).toBe(num(earth));

    fireEvent.change(screen.getByLabelText('Mass (×10²⁴ kg)'), { target: { value: '0.64171' } });
    fireEvent.change(screen.getByLabelText('Mean radius (km)'), { target: { value: '3389.5' } });
    const mars = Math.sqrt((2 * 6.674e-11 * (0.64171 * 1e24)) / (3389.5 * 1000));
    expect(hero(container)).toBe(`${num(mars / 1000)} km/s`);
  });
});

describe('OrbitalVelocityCalculator', () => {
  const page: CalculatorPage = {
    title: 'Orbital Velocity Calculator',
    description: 'Calculate circular orbital speed around the Sun from the orbit radius in AU.',
    path: '/orbital-velocity-calculator.html',
    category: 'scientific',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<OrbitalVelocityCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Orbital Velocity Calculator' })).toBeDefined();
    expect(screen.getByText('Orbital radius (AU)')).toBeDefined();
    expect(screen.getByText('Orbital velocity')).toBeDefined();
  });

  it('derives circular speed at one AU and reacts to a wider orbit', () => {
    const { container } = renderCalculatorPage(<OrbitalVelocityCalculator />, page);
    const speed = Math.sqrt(1.32712440018e20 / (1 * 149597870.7 * 1000));
    expect(hero(container)).toBe(`${num(speed / 1000)} km/s`);
    expect(screen.getByText('Orbital period').nextElementSibling!.textContent).toBe(`${num(1)} years`);

    fireEvent.change(screen.getByLabelText('Orbital radius (AU)'), { target: { value: '5.203' } });
    const jupiter = Math.sqrt(1.32712440018e20 / (5.203 * 149597870.7 * 1000));
    expect(hero(container)).toBe(`${num(jupiter / 1000)} km/s`);
  });
});
