import type { ReactElement } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CalculatorPageLayout } from '../CalculatorPageLayout';
import { I18nProvider } from '../../lib/i18n';
import PetAgeCalculator from './PetAgeCalculator';
import PetWeightCalculator from './PetWeightCalculator';
import PetFoodCalculator from './PetFoodCalculator';
import PetCalorieCalculator from './PetCalorieCalculator';
import SewingCalculator from './SewingCalculator';
import KnittingCalculator from './KnittingCalculator';
import CrochetCalculator from './CrochetCalculator';
import QuiltingCalculator from './QuiltingCalculator';
import EmbroideryCalculator from './EmbroideryCalculator';
import PatternSizeCalculator from './PatternSizeCalculator';
import FabricCalculator from './FabricCalculator';
import YarnCalculator from './YarnCalculator';
import LaborCostCalculator from './LaborCostCalculator';
import ToolCostCalculator from './ToolCostCalculator';
import FastenerCalculator from './FastenerCalculator';
import SealantCalculator from './SealantCalculator';
import AdhesiveCalculator from './AdhesiveCalculator';
import GroutCalculator from './GroutCalculator';
import CaulkCalculator from './CaulkCalculator';
import PrimerCalculator from './PrimerCalculator';
import DecorationsCalculator from './DecorationsCalculator';
import IceQuantityCalculator from './IceQuantityCalculator';
import DrinkQuantityCalculator from './DrinkQuantityCalculator';
import FoodQuantityCalculator from './FoodQuantityCalculator';
import RsvpCalculator from './RsvpCalculator';
import InvitationCountCalculator from './InvitationCountCalculator';
import GuestListCalculator from './GuestListCalculator';
import PartyBudgetCalculator from './PartyBudgetCalculator';
import DressSizeCalculator from './DressSizeCalculator';
import CakeSizeCalculator from './CakeSizeCalculator';
import CateringCalculator from './CateringCalculator';
import TableLayoutCalculator from './TableLayoutCalculator';
import SeatingCapacityCalculator from './SeatingCapacityCalculator';
import GuestCountCalculator from './GuestCountCalculator';
import WeddingCostCalculator from './WeddingCostCalculator';
import WeddingBudgetCalculator from './WeddingBudgetCalculator';
import AlcoholCalculator from './AlcoholCalculator';
import CaffeineCalculator from './CaffeineCalculator';
import FiberIntakeCalculator from './FiberIntakeCalculator';
import SugarIntakeCalculator from './SugarIntakeCalculator';
import SodiumIntakeCalculator from './SodiumIntakeCalculator';
import MineralCalculator from './MineralCalculator';
import VitaminCalculator from './VitaminCalculator';
import MicronutrientCalculator from './MicronutrientCalculator';
import MacroCalculator from './MacroCalculator';
import NutritionalCaloriesCalculator from './NutritionalCaloriesCalculator';
import EvapotranspirationCalculator from './EvapotranspirationCalculator';
import GrowthDegreeDaysCalculator from './GrowthDegreeDaysCalculator';
import DateAddSubtractCalculator from './DateAddSubtractCalculator';
import SeedingRateCalculator from './SeedingRateCalculator';
import PlantSpacingCalculator from './PlantSpacingCalculator';
import IrrigationCalculator from './IrrigationCalculator';
import FertilizerCalculator from './FertilizerCalculator';
import CropYieldCalculator from './CropYieldCalculator';

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

const fmt = (n: number, digits = 2) =>
  n.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });
const money = (n: number) => `$${fmt(n)}`;
const headline = (container: HTMLElement) => container.querySelector('p.text-4xl')!.textContent;

describe('PetAgeCalculator', () => {
  const page: CalculatorPage = {
    title: 'Pet Age Calculator',
    description: 'Convert pet age to human years.',
    path: '/pet-age-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<PetAgeCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Pet Age Calculator' })).toBeDefined();
    expect(screen.getByText('Pet age (years)')).toBeDefined();
    expect(screen.getByText('Human-equivalent age')).toBeDefined();
  });

  it('maps five dog years onto the 15 + 9 + 5 schedule', () => {
    const { container } = renderCalculatorPage(<PetAgeCalculator />, page);
    const humanYears = 24 + 5 * (5 - 2);
    expect(headline(container)).toBe(`${fmt(humanYears)} years`);
    expect(screen.getByText('Life stage').nextElementSibling!.textContent).toBe('Adult');
  });

  it('recalculates when the species changes to cat', () => {
    const { container } = renderCalculatorPage(<PetAgeCalculator />, page);
    fireEvent.change(screen.getByLabelText('Species'), { target: { value: 'cat' } });
    const catYears = 24 + 4 * (5 - 2);
    expect(headline(container)).toBe(`${fmt(catYears)} years`);
  });
});

describe('PetWeightCalculator', () => {
  const page: CalculatorPage = {
    title: 'Pet Weight Calculator',
    description: 'Find the ideal weight for a pet.',
    path: '/pet-weight-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<PetWeightCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Pet Weight Calculator' })).toBeDefined();
    expect(screen.getByText('Current weight (kg)')).toBeDefined();
    expect(screen.getByText('Target weight')).toBeDefined();
  });

  it('keeps an ideal body condition score at the current weight', () => {
    const { container } = renderCalculatorPage(<PetWeightCalculator />, page);
    const target = 10 * 1;
    expect(headline(container)).toBe(`${fmt(target)} kg`);
    expect(screen.getByText('Weight to gain/lose').nextElementSibling!.textContent).toBe(`${fmt(0)} kg`);
  });

  it('lowers the target when the score shows obesity', () => {
    const { container } = renderCalculatorPage(<PetWeightCalculator />, page);
    fireEvent.change(screen.getByLabelText('Body condition score (1-9)'), { target: { value: '8' } });
    const target = 10 * 0.75;
    expect(headline(container)).toBe(`${fmt(target)} kg`);
  });
});

describe('PetFoodCalculator', () => {
  const page: CalculatorPage = {
    title: 'Pet Food Calculator',
    description: 'Work out daily pet food portions.',
    path: '/pet-food-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<PetFoodCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Pet Food Calculator' })).toBeDefined();
    expect(screen.getByText('Body weight (kg)')).toBeDefined();
    expect(screen.getByText('Cups of food per day')).toBeDefined();
  });

  it('derives cups from resting energy times the activity factor', () => {
    const { container } = renderCalculatorPage(<PetFoodCalculator />, page);
    const rer = 70 * Math.pow(10, 0.75);
    const dailyKcal = rer * 1.6;
    const cups = dailyKcal / 380;
    expect(headline(container)).toBe(fmt(cups));
    expect(screen.getByText('Cups per meal').nextElementSibling!.textContent).toBe(fmt(cups / 2));
  });

  it('divides fewer calories per cup into more cups a day', () => {
    const { container } = renderCalculatorPage(<PetFoodCalculator />, page);
    fireEvent.change(screen.getByLabelText('kcal per cup'), { target: { value: '500' } });
    const cups = (70 * Math.pow(10, 0.75) * 1.6) / 500;
    expect(headline(container)).toBe(fmt(cups));
  });
});

describe('PetCalorieCalculator', () => {
  const page: CalculatorPage = {
    title: 'Pet Calorie Calculator',
    description: 'Estimate pet calorie needs.',
    path: '/pet-calorie-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<PetCalorieCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Pet Calorie Calculator' })).toBeDefined();
    expect(screen.getByText('Life stage')).toBeDefined();
    expect(screen.getByText('Calories per day')).toBeDefined();
  });

  it('multiplies resting energy by the neutered adult factor', () => {
    const { container } = renderCalculatorPage(<PetCalorieCalculator />, page);
    const rer = 70 * Math.pow(20, 0.75);
    const daily = rer * 1.6;
    expect(headline(container)).toBe(`${fmt(daily, 0)} kcal`);
    expect(screen.getByText('Resting energy (kcal)').nextElementSibling!.textContent).toBe(fmt(rer, 0));
  });

  it('raises calories for the puppy life stage', () => {
    const { container } = renderCalculatorPage(<PetCalorieCalculator />, page);
    fireEvent.change(screen.getByLabelText('Life stage'), { target: { value: '3' } });
    const daily = 70 * Math.pow(20, 0.75) * 3;
    expect(headline(container)).toBe(`${fmt(daily, 0)} kcal`);
  });
});

describe('SewingCalculator', () => {
  const page: CalculatorPage = {
    title: 'Sewing Calculator',
    description: 'Estimate thread and stitches.',
    path: '/sewing-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<SewingCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Sewing Calculator' })).toBeDefined();
    expect(screen.getByText('Seam length (in)')).toBeDefined();
    expect(screen.getByText('Thread needed')).toBeDefined();
  });

  it('adds allowance on both ends before scaling the thread', () => {
    const { container } = renderCalculatorPage(<SewingCalculator />, page);
    const cutLength = 20 + 0.5 * 2;
    const thread = cutLength * 2.5;
    expect(headline(container)).toBe(`${fmt(thread)} in`);
    expect(screen.getByText('Cut length').nextElementSibling!.textContent).toBe(`${fmt(cutLength)} in`);
    expect(screen.getByText('Stitches in seam').nextElementSibling!.textContent).toBe(fmt(cutLength * 12, 0));
  });

  it('recalculates thread when the seam gets longer', () => {
    const { container } = renderCalculatorPage(<SewingCalculator />, page);
    fireEvent.change(screen.getByLabelText('Seam length (in)'), { target: { value: '30' } });
    const thread = (30 + 0.5 * 2) * 2.5;
    expect(headline(container)).toBe(`${fmt(thread)} in`);
  });
});

describe('KnittingCalculator', () => {
  const page: CalculatorPage = {
    title: 'Knitting Calculator',
    description: 'Plan cast on and yarn.',
    path: '/knitting-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<KnittingCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Knitting Calculator' })).toBeDefined();
    expect(screen.getByText('Stitches per 4 in')).toBeDefined();
    expect(screen.getByText('Cast on')).toBeDefined();
  });

  it('scales the stitch gauge across the finished width', () => {
    const { container } = renderCalculatorPage(<KnittingCalculator />, page);
    const castOn = Math.round((20 * 20) / 4);
    const rows = Math.round((24 * 28) / 4);
    expect(headline(container)).toBe(`${castOn.toLocaleString('en-US')} stitches`);
    expect(screen.getByText('Total stitches').nextElementSibling!.textContent).toBe(
      (castOn * rows).toLocaleString('en-US')
    );
    expect(screen.getByText('Yarn needed').nextElementSibling!.textContent).toBe(`${fmt(castOn * rows * 0.04)} yards`);
  });

  it('increases the cast on when the width grows', () => {
    const { container } = renderCalculatorPage(<KnittingCalculator />, page);
    fireEvent.change(screen.getByLabelText('Width (in)'), { target: { value: '24' } });
    const castOn = Math.round((24 * 20) / 4);
    expect(headline(container)).toBe(`${castOn.toLocaleString('en-US')} stitches`);
  });
});

describe('CrochetCalculator', () => {
  const page: CalculatorPage = {
    title: 'Crochet Calculator',
    description: 'Plan starting chains and yarn.',
    path: '/crochet-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<CrochetCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Crochet Calculator' })).toBeDefined();
    expect(screen.getByText('Chains per inch')).toBeDefined();
    expect(screen.getByText('Starting chains')).toBeDefined();
  });

  it('multiplies chain gauge by the finished width', () => {
    const { container } = renderCalculatorPage(<CrochetCalculator />, page);
    const chains = Math.round(18 * 4);
    const rows = Math.round(20 * 3);
    expect(headline(container)).toBe(`${chains.toLocaleString('en-US')} chains`);
    expect(screen.getByText('Total stitches').nextElementSibling!.textContent).toBe(
      (chains * rows).toLocaleString('en-US')
    );
  });

  it('recalculates chains for a wider panel', () => {
    const { container } = renderCalculatorPage(<CrochetCalculator />, page);
    fireEvent.change(screen.getByLabelText('Width (in)'), { target: { value: '24' } });
    expect(headline(container)).toBe(`${Math.round(24 * 4).toLocaleString('en-US')} chains`);
  });
});

describe('QuiltingCalculator', () => {
  const page: CalculatorPage = {
    title: 'Quilting Calculator',
    description: 'Size a quilt from its blocks.',
    path: '/quilting-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<QuiltingCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Quilting Calculator' })).toBeDefined();
    expect(screen.getByText('Finished block size (in)')).toBeDefined();
    expect(screen.getByText('Finished quilt width')).toBeDefined();
  });

  it('adds sashing between blocks and border on both edges', () => {
    const { container } = renderCalculatorPage(<QuiltingCalculator />, page);
    const width = 4 * 10 + 3 * 2 + 4 * 2;
    const length = 5 * 10 + 4 * 2 + 4 * 2;
    expect(headline(container)).toBe(`${fmt(width)} in`);
    expect(screen.getByText('Quilt area').nextElementSibling!.textContent).toBe(`${fmt((width * length) / 144)} sq ft`);
    expect(screen.getByText('Batting needed').nextElementSibling!.textContent).toBe(
      `${fmt(((width + 8) * (length + 8)) / 144)} sq ft`
    );
  });

  it('widens the quilt when the border grows', () => {
    const { container } = renderCalculatorPage(<QuiltingCalculator />, page);
    fireEvent.change(screen.getByLabelText('Border width (in)'), { target: { value: '6' } });
    const width = 4 * 10 + 3 * 2 + 6 * 2;
    expect(headline(container)).toBe(`${fmt(width)} in`);
  });
});

describe('EmbroideryCalculator', () => {
  const page: CalculatorPage = {
    title: 'Embroidery Calculator',
    description: 'Estimate embroidery stitches.',
    path: '/embroidery-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<EmbroideryCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Embroidery Calculator' })).toBeDefined();
    expect(screen.getByText('Design width (in)')).toBeDefined();
    expect(screen.getByText('Estimated stitch count')).toBeDefined();
  });

  it('multiplies design area by stitch density', () => {
    const { container } = renderCalculatorPage(<EmbroideryCalculator />, page);
    const stitches = Math.round((4 * 6) * 800);
    expect(headline(container)).toBe(stitches.toLocaleString('en-US'));
    expect(screen.getByText('Design area').nextElementSibling!.textContent).toBe(`${fmt(4 * 6)} sq in`);
    expect(screen.getByText('Fits hoop').nextElementSibling!.textContent).toBe('Yes');
  });

  it('raises the stitch count with a denser fill', () => {
    const { container } = renderCalculatorPage(<EmbroideryCalculator />, page);
    fireEvent.change(screen.getByLabelText('Stitch density (per sq in)'), { target: { value: '1000' } });
    expect(headline(container)).toBe(((4 * 6) * 1000).toLocaleString('en-US'));
  });
});

describe('PatternSizeCalculator', () => {
  const page: CalculatorPage = {
    title: 'Pattern Size Calculator',
    description: 'Grade a pattern measurement.',
    path: '/pattern-size-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<PatternSizeCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Pattern Size Calculator' })).toBeDefined();
    expect(screen.getByText('Finished measurement (in)')).toBeDefined();
    expect(screen.getByText('Graded cut size')).toBeDefined();
  });

  it('applies ease then seam allowance then the grading scale', () => {
    const { container } = renderCalculatorPage(<PatternSizeCalculator />, page);
    const withEase = 40 * (1 + 5 / 100);
    const cut = withEase + 0.5 * 2;
    const graded = (cut * 100) / 100;
    expect(headline(container)).toBe(`${fmt(graded)} in`);
    expect(screen.getByText('Cut size with allowance').nextElementSibling!.textContent).toBe(`${fmt(cut)} in`);
  });

  it('grades the pattern down to 90 percent', () => {
    const { container } = renderCalculatorPage(<PatternSizeCalculator />, page);
    fireEvent.change(screen.getByLabelText('Grading scale (%)'), { target: { value: '90' } });
    const withEase = 40 * (1 + 5 / 100);
    const graded = ((withEase + 0.5 * 2) * 90) / 100;
    expect(headline(container)).toBe(`${fmt(graded)} in`);
  });
});

describe('FabricCalculator', () => {
  const page: CalculatorPage = {
    title: 'Fabric Calculator',
    description: 'Yardage for your pieces.',
    path: '/fabric-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<FabricCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Fabric Calculator' })).toBeDefined();
    expect(screen.getByText('Piece width (in)')).toBeDefined();
    expect(screen.getByText('Fabric needed')).toBeDefined();
  });

  it('lays pieces across the bolt then stacks them down the length', () => {
    const { container } = renderCalculatorPage(<FabricCalculator />, page);
    const columns = Math.floor(44 / 12);
    const rows = Math.ceil(6 / columns);
    const lengthIn = rows * 18 * (1 + 10 / 100);
    expect(headline(container)).toBe(`${fmt(lengthIn / 36)} yards`);
    expect(screen.getByText('Pieces per row').nextElementSibling!.textContent).toBe(`${columns}`);
    expect(screen.getByText('Rows down the fabric').nextElementSibling!.textContent).toBe(`${rows}`);
  });

  it('halves the yardage when only three pieces are needed', () => {
    const { container } = renderCalculatorPage(<FabricCalculator />, page);
    fireEvent.change(screen.getByLabelText('Number of pieces'), { target: { value: '3' } });
    const columns = Math.floor(44 / 12);
    const rows = Math.ceil(3 / columns);
    const lengthIn = rows * 18 * (1 + 10 / 100);
    expect(headline(container)).toBe(`${fmt(lengthIn / 36)} yards`);
  });
});

describe('YarnCalculator', () => {
  const page: CalculatorPage = {
    title: 'Yarn Calculator',
    description: 'Balls of yarn for a project.',
    path: '/yarn-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<YarnCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Yarn Calculator' })).toBeDefined();
    expect(screen.getByText('Project yarn weight (g)')).toBeDefined();
    expect(screen.getByText('Balls to buy')).toBeDefined();
  });

  it('converts grams to yards and rounds balls up', () => {
    const { container } = renderCalculatorPage(<YarnCalculator />, page);
    const yards = (250 * 400) / 100;
    const balls = Math.ceil(250 / 100);
    expect(headline(container)).toBe(`${balls.toLocaleString('en-US')}`);
    expect(screen.getByText('Total yards').nextElementSibling!.textContent).toBe(`${fmt(yards)} yd`);
    expect(screen.getByText('Estimated cost').nextElementSibling!.textContent).toBe(money(balls * 8));
  });

  it('updates the cost when the ball price changes', () => {
    renderCalculatorPage(<YarnCalculator />, page);
    fireEvent.change(screen.getByLabelText('Price per ball ($)'), { target: { value: '10' } });
    const balls = Math.ceil(250 / 100);
    expect(screen.getByText('Estimated cost').nextElementSibling!.textContent).toBe(money(balls * 10));
  });
});

describe('LaborCostCalculator', () => {
  const page: CalculatorPage = {
    title: 'Labor Cost Calculator',
    description: 'Labour cost with overhead.',
    path: '/labor-cost-calculator.html',
    category: 'construction',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<LaborCostCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Labor Cost Calculator' })).toBeDefined();
    expect(screen.getByText('Hourly rate ($)')).toBeDefined();
    expect(screen.getByText('Total labour cost')).toBeDefined();
  });

  it('loads wages with overhead then adds profit', () => {
    const { container } = renderCalculatorPage(<LaborCostCalculator />, page);
    const base = 45 * 8 * 2;
    const overheadCost = (base * 15) / 100;
    const profitCost = ((base + overheadCost) * 10) / 100;
    const total = base + overheadCost + profitCost;
    expect(headline(container)).toBe(money(total));
    expect(screen.getByText('Base wages').nextElementSibling!.textContent).toBe(money(base));
    expect(screen.getByText('Overhead').nextElementSibling!.textContent).toBe(money(overheadCost));
  });

  it('recalculates when more hours are worked', () => {
    const { container } = renderCalculatorPage(<LaborCostCalculator />, page);
    fireEvent.change(screen.getByLabelText('Hours worked'), { target: { value: '10' } });
    const base = 45 * 10 * 2;
    const overheadCost = (base * 15) / 100;
    const profitCost = ((base + overheadCost) * 10) / 100;
    expect(headline(container)).toBe(money(base + overheadCost + profitCost));
  });
});

describe('ToolCostCalculator', () => {
  const page: CalculatorPage = {
    title: 'Tool Cost Calculator',
    description: 'Buy or rent a tool.',
    path: '/tool-cost-calculator.html',
    category: 'construction',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<ToolCostCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Tool Cost Calculator' })).toBeDefined();
    expect(screen.getByText('Purchase price ($)')).toBeDefined();
    expect(screen.getByText('Lower cost option')).toBeDefined();
  });

  it('picks buying when the rental days pass the purchase price', () => {
    const { container } = renderCalculatorPage(<ToolCostCalculator />, page);
    const rent = 50 * 12;
    const buy = 400;
    expect(headline(container)).toBe(money(Math.min(buy, rent)));
    expect(screen.getByText('Rent total').nextElementSibling!.textContent).toBe(money(rent));
    expect(screen.getByText('Buy — saves $200.00 versus the alternative')).toBeDefined();
  });

  it('switches the recommendation when fewer days are needed', () => {
    const { container } = renderCalculatorPage(<ToolCostCalculator />, page);
    fireEvent.change(screen.getByLabelText('Days needed'), { target: { value: '4' } });
    const rent = 50 * 4;
    expect(headline(container)).toBe(money(rent));
    expect(screen.getByText('Buy once').nextElementSibling!.textContent).toBe(money(400));
    expect(screen.getByText('Rent total').nextElementSibling!.textContent).toBe(money(rent));
  });
});

describe('FastenerCalculator', () => {
  const page: CalculatorPage = {
    title: 'Fastener Calculator',
    description: 'Nails or screws needed.',
    path: '/fastener-calculator.html',
    category: 'construction',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<FastenerCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Fastener Calculator' })).toBeDefined();
    expect(screen.getByText('Run length (ft)')).toBeDefined();
    expect(screen.getByText('Fasteners needed')).toBeDefined();
  });

  it('counts a fastener every spacing inches plus the start', () => {
    const { container } = renderCalculatorPage(<FastenerCalculator />, page);
    const base = Math.floor((10 * 12) / 16) + 1;
    const withWaste = Math.ceil(base * (1 + 10 / 100));
    expect(headline(container)).toBe(`${withWaste}`);
    expect(screen.getByText('Before waste').nextElementSibling!.textContent).toBe(`${base}`);
    expect(screen.getByText(`${Math.ceil(withWaste / 100)} pack(s) at 100 per pack`)).toBeDefined();
  });

  it('doubles the count when spacing halves', () => {
    const { container } = renderCalculatorPage(<FastenerCalculator />, page);
    fireEvent.change(screen.getByLabelText('Spacing (in)'), { target: { value: '8' } });
    const base = Math.floor((10 * 12) / 8) + 1;
    const withWaste = Math.ceil(base * (1 + 10 / 100));
    expect(headline(container)).toBe(`${withWaste}`);
  });
});

describe('SealantCalculator', () => {
  const page: CalculatorPage = {
    title: 'Sealant Calculator',
    description: 'Tubes of sealant needed.',
    path: '/sealant-calculator.html',
    category: 'construction',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<SealantCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Sealant Calculator' })).toBeDefined();
    expect(screen.getByText('Joint length (ft)')).toBeDefined();
    expect(screen.getByText('Tubes required')).toBeDefined();
  });

  it('converts the bead to millilitres and rounds tubes up', () => {
    const { container } = renderCalculatorPage(<SealantCalculator />, page);
    const cmLength = 50 * 30.48;
    const cmWidth = 0.5 * 2.54;
    const cmDepth = 0.25 * 2.54;
    const ml = cmLength * cmWidth * cmDepth;
    const tubes = Math.ceil(ml / 300);
    expect(headline(container)).toBe(`${tubes}`);
    expect(screen.getByText('Volume (fl oz)').nextElementSibling!.textContent).toBe(`${fmt(ml / 29.5735)} fl oz`);
  });

  it('needs one fewer tube for a shorter joint', () => {
    const { container } = renderCalculatorPage(<SealantCalculator />, page);
    fireEvent.change(screen.getByLabelText('Joint length (ft)'), { target: { value: '40' } });
    const ml = (40 * 30.48) * (0.5 * 2.54) * (0.25 * 2.54);
    expect(headline(container)).toBe(`${Math.ceil(ml / 300)}`);
  });
});

describe('AdhesiveCalculator', () => {
  const page: CalculatorPage = {
    title: 'Adhesive Calculator',
    description: 'Containers of adhesive.',
    path: '/adhesive-calculator.html',
    category: 'construction',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<AdhesiveCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Adhesive Calculator' })).toBeDefined();
    expect(screen.getByText('Surface area (sq ft)')).toBeDefined();
    expect(screen.getByText('Containers needed')).toBeDefined();
  });

  it('adds waste before dividing by the spread rate', () => {
    const { container } = renderCalculatorPage(<AdhesiveCalculator />, page);
    const coverage = 200 * (1 + 10 / 100);
    const containers = Math.ceil(coverage / 50);
    expect(headline(container)).toBe(`${containers}`);
    expect(screen.getByText('Coverage with waste').nextElementSibling!.textContent).toBe(`${fmt(coverage)} sq ft`);
    expect(screen.getByText(`${money(containers * 12)} total at the price you entered`)).toBeDefined();
  });

  it('buys fewer tubs when the spread rate doubles', () => {
    const { container } = renderCalculatorPage(<AdhesiveCalculator />, page);
    fireEvent.change(screen.getByLabelText('Spread rate (sq ft per tub)'), { target: { value: '100' } });
    const coverage = 200 * (1 + 10 / 100);
    expect(headline(container)).toBe(`${Math.ceil(coverage / 100)}`);
  });
});

describe('GroutCalculator', () => {
  const page: CalculatorPage = {
    title: 'Grout Calculator',
    description: 'Grout weight for tile joints.',
    path: '/grout-calculator.html',
    category: 'construction',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<GroutCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Grout Calculator' })).toBeDefined();
    expect(screen.getByText('Joint width (in)')).toBeDefined();
    expect(screen.getByText('Grout needed')).toBeDefined();
  });

  it('fills the joint volume left by the tiles over the floor', () => {
    const { container } = renderCalculatorPage(<GroutCalculator />, page);
    const groutArea = 144 * (1 - (12 * 12) / ((12 + 0.25) * (12 + 0.25)));
    const volumePerSqFt = groutArea * 0.25;
    const volumeIn3 = 100 * volumePerSqFt;
    const pounds = (volumeIn3 / 1728) * 100;
    expect(headline(container)).toBe(`${fmt(pounds)} lb`);
    expect(screen.getByText('Grout volume').nextElementSibling!.textContent).toBe(`${fmt(volumeIn3)} in³`);
  });

  it('doubles the grout for a deeper joint', () => {
    const { container } = renderCalculatorPage(<GroutCalculator />, page);
    fireEvent.change(screen.getByLabelText('Grout depth (in)'), { target: { value: '0.5' } });
    const groutArea = 144 * (1 - (12 * 12) / ((12 + 0.25) * (12 + 0.25)));
    const pounds = (100 * (groutArea * 0.5)) / 1728 * 100;
    expect(headline(container)).toBe(`${fmt(pounds)} lb`);
  });
});

describe('CaulkCalculator', () => {
  const page: CalculatorPage = {
    title: 'Caulk Calculator',
    description: 'Caulk tubes for a gap.',
    path: '/caulk-calculator.html',
    category: 'construction',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<CaulkCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Caulk Calculator' })).toBeDefined();
    expect(screen.getByText('Gap length (ft)')).toBeDefined();
    expect(screen.getByText('Tubes required')).toBeDefined();
  });

  it('treats the gap as a box and divides by the tube volume', () => {
    const { container } = renderCalculatorPage(<CaulkCalculator />, page);
    const volume = 40 * 12 * 0.25 * 0.25;
    const tubeIn3 = 10.5 * 1.80467;
    expect(headline(container)).toBe(`${Math.ceil(volume / tubeIn3)}`);
    expect(screen.getByText('Gap volume').nextElementSibling!.textContent).toBe(`${fmt(volume)} in³`);
    expect(screen.getByText('Coverage per tube').nextElementSibling!.textContent).toBe(
      `${fmt(tubeIn3 / (0.25 * 0.25) / 12)} ft`
    );
  });

  it('needs a single tube for a shorter gap', () => {
    const { container } = renderCalculatorPage(<CaulkCalculator />, page);
    fireEvent.change(screen.getByLabelText('Gap length (ft)'), { target: { value: '20' } });
    const volume = 20 * 12 * 0.25 * 0.25;
    expect(headline(container)).toBe(`${Math.ceil(volume / (10.5 * 1.80467))}`);
  });
});

describe('PrimerCalculator', () => {
  const page: CalculatorPage = {
    title: 'Primer Calculator',
    description: 'Primer gallons for walls.',
    path: '/primer-calculator.html',
    category: 'construction',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<PrimerCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Primer Calculator' })).toBeDefined();
    expect(screen.getByText('Wall length (ft)')).toBeDefined();
    expect(screen.getByText('Primer needed')).toBeDefined();
  });

  it('subtracts openings, adds waste and divides by coverage', () => {
    const { container } = renderCalculatorPage(<PrimerCalculator />, page);
    const area = 40 * 8 * 4 - 100;
    const covered = area * 1 * (1 + 10 / 100);
    const gallons = covered / 300;
    expect(headline(container)).toBe(`${fmt(gallons)} gal`);
    expect(screen.getByText('Wall area').nextElementSibling!.textContent).toBe(`${fmt(area)} sq ft`);
    expect(screen.getByText('Cost').nextElementSibling!.textContent).toBe(money(gallons * 28));
  });

  it('uses less primer when the coverage improves', () => {
    const { container } = renderCalculatorPage(<PrimerCalculator />, page);
    fireEvent.change(screen.getByLabelText('Coverage (sq ft/gal)'), { target: { value: '400' } });
    const covered = (40 * 8 * 4 - 100) * 1 * (1 + 10 / 100);
    expect(headline(container)).toBe(`${fmt(covered / 400)} gal`);
  });
});

describe('DecorationsCalculator', () => {
  const page: CalculatorPage = {
    title: 'Decorations Calculator',
    description: 'Balloons from room volume.',
    path: '/decorations-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<DecorationsCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Decorations Calculator' })).toBeDefined();
    expect(screen.getByText('Room length (ft)')).toBeDefined();
    expect(screen.getByText('Balloons needed')).toBeDefined();
  });

  it('scales balloon density by the room volume', () => {
    const { container } = renderCalculatorPage(<DecorationsCalculator />, page);
    const volume = 20 * 15 * 8;
    const balloons = Math.ceil((volume / 100) * 10);
    expect(headline(container)).toBe(`${balloons}`);
    expect(screen.getByText('Room volume').nextElementSibling!.textContent).toBe(`${fmt(volume)} cu ft`);
    expect(screen.getByText('Cost').nextElementSibling!.textContent).toBe(money(balloons * 0.5));
  });

  it('doubles the balloons when the density doubles', () => {
    const { container } = renderCalculatorPage(<DecorationsCalculator />, page);
    fireEvent.change(screen.getByLabelText('Balloons per 100 cu ft'), { target: { value: '20' } });
    const volume = 20 * 15 * 8;
    expect(headline(container)).toBe(`${Math.ceil((volume / 100) * 20)}`);
  });
});

describe('IceQuantityCalculator', () => {
  const page: CalculatorPage = {
    title: 'Ice Quantity Calculator',
    description: 'Ice for a party.',
    path: '/ice-quantity-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<IceQuantityCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Ice Quantity Calculator' })).toBeDefined();
    expect(screen.getByText('Guests')).toBeDefined();
    expect(screen.getByText('Ice needed')).toBeDefined();
  });

  it('adds drink ice and cooler ice together', () => {
    const { container } = renderCalculatorPage(<IceQuantityCalculator />, page);
    const drinkIce = 50 * 3 * 0.5;
    const coolerIce = 50 * 0.5;
    const total = drinkIce + coolerIce;
    expect(headline(container)).toBe(`${fmt(total)} lb`);
    expect(screen.getByText('Ice for drinks').nextElementSibling!.textContent).toBe(`${fmt(drinkIce)} lb`);
    expect(screen.getByText('Ice for coolers').nextElementSibling!.textContent).toBe(`${fmt(coolerIce)} lb`);
  });

  it('grows the order when guests drink more', () => {
    const { container } = renderCalculatorPage(<IceQuantityCalculator />, page);
    fireEvent.change(screen.getByLabelText('Drinks per guest'), { target: { value: '4' } });
    const total = 50 * 4 * 0.5 + 50 * 0.5;
    expect(headline(container)).toBe(`${fmt(total)} lb`);
  });
});

describe('DrinkQuantityCalculator', () => {
  const page: CalculatorPage = {
    title: 'Drink Quantity Calculator',
    description: 'Drinks for a party.',
    path: '/drink-quantity-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<DrinkQuantityCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Drink Quantity Calculator' })).toBeDefined();
    expect(screen.getByText('Party hours')).toBeDefined();
    expect(screen.getByText('Total drinks')).toBeDefined();
  });

  it('multiplies guests, hours and the hourly drink rate', () => {
    const { container } = renderCalculatorPage(<DrinkQuantityCalculator />, page);
    const totalDrinks = 50 * 4 * 1.25;
    const gallons = (totalDrinks * 12) / 128;
    expect(headline(container)).toBe(`${Math.round(totalDrinks)}`);
    expect(screen.getByText('Liquid volume').nextElementSibling!.textContent).toBe(`${fmt(gallons)} gal`);
    expect(screen.getByText('Total cost').nextElementSibling!.textContent).toBe(money(totalDrinks * 3.5));
  });

  it('drops the total when guests sip slowly', () => {
    const { container } = renderCalculatorPage(<DrinkQuantityCalculator />, page);
    fireEvent.change(screen.getByLabelText('Drinks per hour'), { target: { value: '1' } });
    expect(headline(container)).toBe(`${Math.round(50 * 4 * 1)}`);
  });
});

describe('FoodQuantityCalculator', () => {
  const page: CalculatorPage = {
    title: 'Food Quantity Calculator',
    description: 'Food for a guest count.',
    path: '/food-quantity-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<FoodQuantityCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Food Quantity Calculator' })).toBeDefined();
    expect(screen.getByText('Servings per person')).toBeDefined();
    expect(screen.getByText('Total food')).toBeDefined();
  });

  it('turns servings into ounces, pounds and cost', () => {
    const { container } = renderCalculatorPage(<FoodQuantityCalculator />, page);
    const servings = 60 * 3;
    const totalOz = servings * 4;
    expect(headline(container)).toBe(`${fmt(totalOz / 16)} lb`);
    expect(screen.getByText('Total ounces').nextElementSibling!.textContent).toBe(`${fmt(totalOz)} oz`);
    expect(screen.getByText('Total cost').nextElementSibling!.textContent).toBe(money(servings * 2.5));
  });

  it('adds more food when servings per person rise', () => {
    const { container } = renderCalculatorPage(<FoodQuantityCalculator />, page);
    fireEvent.change(screen.getByLabelText('Servings per person'), { target: { value: '4' } });
    const totalOz = 60 * 4 * 4;
    expect(headline(container)).toBe(`${fmt(totalOz / 16)} lb`);
  });
});

describe('RsvpCalculator', () => {
  const page: CalculatorPage = {
    title: 'RSVP Calculator',
    description: 'Expected attendees from RSVPs.',
    path: '/rsvp-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<RsvpCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'RSVP Calculator' })).toBeDefined();
    expect(screen.getByText('Invitations sent')).toBeDefined();
    expect(screen.getByText('Expected attendees')).toBeDefined();
  });

  it('applies response then decline rates to the invitations', () => {
    const { container } = renderCalculatorPage(<RsvpCalculator />, page);
    const responses = (100 * 80) / 100;
    const declined = (responses * 20) / 100;
    const accepted = responses - declined;
    const attending = accepted * 1.6;
    expect(headline(container)).toBe(`${Math.round(attending)}`);
    expect(screen.getByText('Responses received').nextElementSibling!.textContent).toBe(
      `${Math.round(responses)}`
    );
    expect(screen.getByText('Declined').nextElementSibling!.textContent).toBe(`${Math.round(declined)}`);
  });

  it('raises the headcount when everyone replies', () => {
    const { container } = renderCalculatorPage(<RsvpCalculator />, page);
    fireEvent.change(screen.getByLabelText('Response rate (%)'), { target: { value: '100' } });
    const responses = (100 * 100) / 100;
    const declined = (responses * 20) / 100;
    const attending = (responses - declined) * 1.6;
    expect(headline(container)).toBe(`${Math.round(attending)}`);
  });
});

describe('InvitationCountCalculator', () => {
  const page: CalculatorPage = {
    title: 'Invitation Count Calculator',
    description: 'How many invitations to print.',
    path: '/invitation-count-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<InvitationCountCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Invitation Count Calculator' })).toBeDefined();
    expect(screen.getByText('People per household')).toBeDefined();
    expect(screen.getByText('Invitations to print')).toBeDefined();
  });

  it('covers every household once, plus waste and spares', () => {
    const { container } = renderCalculatorPage(<InvitationCountCalculator />, page);
    const households = Math.ceil(150 / 2.5);
    const withWaste = Math.ceil((households * (100 + 10)) / 100);
    const toPrint = withWaste + 5;
    expect(headline(container)).toBe(`${toPrint}`);
    expect(screen.getByText(`${households} household(s) before waste`)).toBeDefined();
    expect(screen.getByText('Printing cost').nextElementSibling!.textContent).toBe(money(toPrint * 1.5));
  });

  it('prints more copies as the waste allowance grows', () => {
    const { container } = renderCalculatorPage(<InvitationCountCalculator />, page);
    fireEvent.change(screen.getByLabelText('Print waste (%)'), { target: { value: '20' } });
    const households = Math.ceil(150 / 2.5);
    const toPrint = Math.ceil((households * (100 + 20)) / 100) + 5;
    expect(headline(container)).toBe(`${toPrint}`);
  });
});

describe('GuestListCalculator', () => {
  const page: CalculatorPage = {
    title: 'Guest List Calculator',
    description: 'Total guests from invite groups.',
    path: '/guest-list-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<GuestListCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Guest List Calculator' })).toBeDefined();
    expect(screen.getByText('Immediate family')).toBeDefined();
    expect(screen.getByText('Total guests')).toBeDefined();
  });

  it('adds every group and rounds tables up', () => {
    const { container } = renderCalculatorPage(<GuestListCalculator />, page);
    const total = 20 + 30 + 40 + 15 + 10 + 5;
    expect(headline(container)).toBe(`${total}`);
    expect(screen.getByText('Adults').nextElementSibling!.textContent).toBe(`${total - 5}`);
    expect(screen.getByText('Tables needed').nextElementSibling!.textContent).toBe(`${Math.ceil(total / 8)}`);
  });

  it('adds the extra friends to the headcount', () => {
    const { container } = renderCalculatorPage(<GuestListCalculator />, page);
    fireEvent.change(screen.getByLabelText('Friends'), { target: { value: '50' } });
    const total = 20 + 30 + 50 + 15 + 10 + 5;
    expect(headline(container)).toBe(`${total}`);
    expect(screen.getByText('Tables needed').nextElementSibling!.textContent).toBe(`${Math.ceil(total / 8)}`);
  });
});

describe('PartyBudgetCalculator', () => {
  const page: CalculatorPage = {
    title: 'Party Budget Calculator',
    description: 'Track party spend.',
    path: '/party-budget-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<PartyBudgetCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Party Budget Calculator' })).toBeDefined();
    expect(screen.getByText('Total budget ($)')).toBeDefined();
    expect(screen.getByText('Budget remaining')).toBeDefined();
  });

  it('subtracts per-head and fixed costs from the budget', () => {
    const { container } = renderCalculatorPage(<PartyBudgetCalculator />, page);
    const perHead = 20 + 10;
    const guestCost = 50 * perHead;
    const spent = guestCost + 800 + 200;
    const remaining = 5000 - spent;
    expect(headline(container)).toBe(money(remaining));
    expect(screen.getByText('Planned spend').nextElementSibling!.textContent).toBe(money(spent));
    expect(screen.getByText('Cost per guest').nextElementSibling!.textContent).toBe(money(spent / 50));
  });

  it('reduces what is left when food gets pricier', () => {
    const { container } = renderCalculatorPage(<PartyBudgetCalculator />, page);
    fireEvent.change(screen.getByLabelText('Food per person ($)'), { target: { value: '30' } });
    const spent = 50 * (30 + 10) + 800 + 200;
    expect(headline(container)).toBe(money(5000 - spent));
  });
});

describe('DressSizeCalculator', () => {
  const page: CalculatorPage = {
    title: 'Dress Size Calculator',
    description: 'Dress size from measurements.',
    path: '/dress-size-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<DressSizeCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Dress Size Calculator' })).toBeDefined();
    expect(screen.getByText('Bust (in)')).toBeDefined();
    expect(screen.getByText('US dress size')).toBeDefined();
  });

  it('reads a US 8 from matching bust, waist and hips', () => {
    const { container } = renderCalculatorPage(<DressSizeCalculator />, page);
    const girth = 35.5 + 27.5 + 37.5;
    expect(headline(container)).toBe('US 8');
    expect(screen.getByText('Total girth').nextElementSibling!.textContent).toBe(`${fmt(girth)} in`);
    expect(screen.getByText('Waist size').nextElementSibling!.textContent).toBe('US 8');
  });

  it('drops to a US 2 when the bust measurement shrinks', () => {
    const { container } = renderCalculatorPage(<DressSizeCalculator />, page);
    fireEvent.change(screen.getByLabelText('Bust (in)'), { target: { value: '32.5' } });
    expect(headline(container)).toBe('US 2');
  });
});

describe('CakeSizeCalculator', () => {
  const page: CalculatorPage = {
    title: 'Cake Size Calculator',
    description: 'Servings from a tiered cake.',
    path: '/cake-size-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<CakeSizeCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Cake Size Calculator' })).toBeDefined();
    expect(screen.getByText('Tier 1 (in)')).toBeDefined();
    expect(screen.getByText('Servings')).toBeDefined();
  });

  it('divides each round tier into slices of the given footprint', () => {
    const { container } = renderCalculatorPage(<CakeSizeCalculator />, page);
    const sliceArea = 1.5 * 2;
    const servings =
      Math.floor((Math.PI * Math.pow(8 / 2, 2)) / sliceArea) +
      Math.floor((Math.PI * Math.pow(6 / 2, 2)) / sliceArea) +
      Math.floor((Math.PI * Math.pow(4 / 2, 2)) / sliceArea);
    const area = Math.PI * Math.pow(8 / 2, 2) + Math.PI * Math.pow(6 / 2, 2) + Math.PI * Math.pow(4 / 2, 2);
    expect(headline(container)).toBe(`${servings}`);
    expect(screen.getByText('Cake surface').nextElementSibling!.textContent).toBe(`${fmt(area)} sq in`);
    expect(screen.getByText(`${Math.ceil(50 / servings)} cake set(s) to serve 50 guests`)).toBeDefined();
  });

  it('drops servings when a tier is removed', () => {
    const { container } = renderCalculatorPage(<CakeSizeCalculator />, page);
    fireEvent.change(screen.getByLabelText('Tier 2 (in)'), { target: { value: '0' } });
    const sliceArea = 1.5 * 2;
    const servings =
      Math.floor((Math.PI * Math.pow(8 / 2, 2)) / sliceArea) + Math.floor((Math.PI * Math.pow(4 / 2, 2)) / sliceArea);
    expect(headline(container)).toBe(`${servings}`);
    expect(screen.getByText(`${Math.ceil(50 / servings)} cake set(s) to serve 50 guests`)).toBeDefined();
  });
});

describe('CateringCalculator', () => {
  const page: CalculatorPage = {
    title: 'Catering Calculator',
    description: 'Catering total with tax.',
    path: '/catering-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<CateringCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Catering Calculator' })).toBeDefined();
    expect(screen.getByText('Price per person ($)')).toBeDefined();
    expect(screen.getByText('Total catering cost')).toBeDefined();
  });

  it('applies service charge before tax', () => {
    const { container } = renderCalculatorPage(<CateringCalculator />, page);
    const food = 80 * 35;
    const service = (food * 18) / 100;
    const afterService = food + service;
    const tax = (afterService * 8.5) / 100;
    const total = afterService + tax;
    expect(headline(container)).toBe(money(total));
    expect(screen.getByText('Service charge').nextElementSibling!.textContent).toBe(money(service));
    expect(screen.getByText('Tax').nextElementSibling!.textContent).toBe(money(tax));
  });

  it('recalculates the total when the menu price rises', () => {
    const { container } = renderCalculatorPage(<CateringCalculator />, page);
    fireEvent.change(screen.getByLabelText('Price per person ($)'), { target: { value: '40' } });
    const food = 80 * 40;
    const service = (food * 18) / 100;
    const afterService = food + service;
    const tax = (afterService * 8.5) / 100;
    expect(headline(container)).toBe(money(afterService + tax));
  });
});

describe('TableLayoutCalculator', () => {
  const page: CalculatorPage = {
    title: 'Table Layout Calculator',
    description: 'Tables that fit a room.',
    path: '/table-layout-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<TableLayoutCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Table Layout Calculator' })).toBeDefined();
    expect(screen.getByText('Room length (ft)')).toBeDefined();
    expect(screen.getByText('Tables that fit')).toBeDefined();
  });

  it('packs tables into rows and columns with the aisle gap', () => {
    const { container } = renderCalculatorPage(<TableLayoutCalculator />, page);
    const along = Math.floor((40 + 2) / (6 + 2));
    const across = Math.floor((30 + 2) / (2.5 + 2));
    const tables = along * across;
    expect(headline(container)).toBe(`${tables}`);
    expect(screen.getByText('Seating capacity').nextElementSibling!.textContent).toBe(`${tables * 8}`);
    expect(screen.getByText('Table footprint').nextElementSibling!.textContent).toBe(
      `${fmt((tables * 6 * 2.5) / (40 * 30) * 100)}% of the room`
    );
  });

  it('fits fewer tables when the aisle widens', () => {
    const { container } = renderCalculatorPage(<TableLayoutCalculator />, page);
    fireEvent.change(screen.getByLabelText('Aisle gap (ft)'), { target: { value: '4' } });
    const along = Math.floor((40 + 4) / (6 + 4));
    const across = Math.floor((30 + 4) / (2.5 + 4));
    expect(headline(container)).toBe(`${along * across}`);
  });
});

describe('SeatingCapacityCalculator', () => {
  const page: CalculatorPage = {
    title: 'Seating Capacity Calculator',
    description: 'Guest capacity by style.',
    path: '/seating-capacity-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<SeatingCapacityCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Seating Capacity Calculator' })).toBeDefined();
    expect(screen.getByText('Seating style')).toBeDefined();
    expect(screen.getByText('Guest capacity')).toBeDefined();
  });

  it('divides the usable floor by the style space factor', () => {
    const { container } = renderCalculatorPage(<SeatingCapacityCalculator />, page);
    const usable = 40 * 30 - 100;
    expect(headline(container)).toBe(`${Math.floor(usable / 12)}`);
    expect(screen.getByText('Usable floor area').nextElementSibling!.textContent).toBe(`${fmt(usable)} sq ft`);
    expect(screen.getByText('12.00 sq ft allowed per guest')).toBeDefined();
  });

  it('seats more guests in theatre rows', () => {
    const { container } = renderCalculatorPage(<SeatingCapacityCalculator />, page);
    fireEvent.change(screen.getByLabelText('Seating style'), { target: { value: '8' } });
    const usable = 40 * 30 - 100;
    expect(headline(container)).toBe(`${Math.floor(usable / 8)}`);
  });
});

describe('GuestCountCalculator', () => {
  const page: CalculatorPage = {
    title: 'Guest Count Calculator',
    description: 'Guests your budget allows.',
    path: '/guest-count-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<GuestCountCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Guest Count Calculator' })).toBeDefined();
    expect(screen.getByText('Venue capacity')).toBeDefined();
    expect(screen.getByText('Guests you can host')).toBeDefined();
  });

  it('takes the lower of the budget and venue limits', () => {
    const { container } = renderCalculatorPage(<GuestCountCalculator />, page);
    const budgetLimit = Math.floor(6000 / 60);
    const maxGuests = Math.min(budgetLimit, 80);
    expect(headline(container)).toBe(`${maxGuests}`);
    expect(screen.getByText('Budget allows').nextElementSibling!.textContent).toBe(`${budgetLimit}`);
    expect(screen.getByText('Venue allows').nextElementSibling!.textContent).toBe('80');
    expect(screen.getByText(`${Math.ceil(maxGuests / (85 / 100))} invitations to send at 85% acceptance`)).toBeDefined();
  });

  it('lifts the cap when the venue grows', () => {
    const { container } = renderCalculatorPage(<GuestCountCalculator />, page);
    fireEvent.change(screen.getByLabelText('Venue capacity'), { target: { value: '150' } });
    const maxGuests = Math.min(Math.floor(6000 / 60), 150);
    expect(headline(container)).toBe(`${maxGuests}`);
    expect(screen.getByText(`${Math.ceil(maxGuests / (85 / 100))} invitations to send at 85% acceptance`)).toBeDefined();
  });
});

describe('WeddingCostCalculator', () => {
  const page: CalculatorPage = {
    title: 'Wedding Cost Calculator',
    description: 'Total wedding cost.',
    path: '/wedding-cost-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<WeddingCostCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Wedding Cost Calculator' })).toBeDefined();
    expect(screen.getByText('Contingency (%)')).toBeDefined();
    expect(screen.getByText('Estimated wedding cost')).toBeDefined();
  });

  it('adds catering, fixed bookings and a contingency', () => {
    const { container } = renderCalculatorPage(<WeddingCostCalculator />, page);
    const catering = 100 * 70;
    const fixed = 8000 + 2500 + 1500 + 1200 + 1000 + 1000;
    const subtotal = catering + fixed;
    const contingency = (subtotal * 10) / 100;
    const total = subtotal + contingency;
    expect(headline(container)).toBe(money(total));
    expect(screen.getByText('Catering').nextElementSibling!.textContent).toBe(money(catering));
    expect(screen.getByText('Contingency').nextElementSibling!.textContent).toBe(money(contingency));
  });

  it('drops the total when catering gets cheaper', () => {
    const { container } = renderCalculatorPage(<WeddingCostCalculator />, page);
    fireEvent.change(screen.getByLabelText('Catering per person ($)'), { target: { value: '60' } });
    const catering = 100 * 60;
    const fixed = 8000 + 2500 + 1500 + 1200 + 1000 + 1000;
    const subtotal = catering + fixed;
    const total = subtotal + (subtotal * 10) / 100;
    expect(headline(container)).toBe(money(total));
  });
});

describe('WeddingBudgetCalculator', () => {
  const page: CalculatorPage = {
    title: 'Wedding Budget Calculator',
    description: 'Split a wedding budget.',
    path: '/wedding-budget-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<WeddingBudgetCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Wedding Budget Calculator' })).toBeDefined();
    expect(screen.getByText('Total budget ($)')).toBeDefined();
    expect(screen.getByText('Budget per guest')).toBeDefined();
  });

  it('splits the budget by the rule-of-thumb percentages', () => {
    const { container } = renderCalculatorPage(<WeddingBudgetCalculator />, page);
    const perPerson = 30000 / 100;
    expect(headline(container)).toBe(money(perPerson));
    expect(screen.getByText('Venue & catering (45%)').nextElementSibling!.textContent).toBe(
      money((30000 * 45) / 100)
    );
    expect(screen.getByText('Photography (12%)').nextElementSibling!.textContent).toBe(
      money((30000 * 12) / 100)
    );
  });

  it('raises the per-guest allowance with a bigger budget', () => {
    const { container } = renderCalculatorPage(<WeddingBudgetCalculator />, page);
    fireEvent.change(screen.getByLabelText('Total budget ($)'), { target: { value: '40000' } });
    expect(headline(container)).toBe(money(40000 / 100));
    expect(screen.getByText('Venue & catering (45%)').nextElementSibling!.textContent).toBe(
      money((40000 * 45) / 100)
    );
  });
});

describe('AlcoholCalculator', () => {
  const page: CalculatorPage = {
    title: 'Alcohol Calculator',
    description: 'Standard drinks and BAC.',
    path: '/alcohol-calculator.html',
    category: 'health',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<AlcoholCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Alcohol Calculator' })).toBeDefined();
    expect(screen.getByText('Drinks consumed')).toBeDefined();
    expect(screen.getByText('Standard drinks')).toBeDefined();
  });

  it('converts drink volume and strength into grams and standard drinks', () => {
    const { container } = renderCalculatorPage(<AlcoholCalculator />, page);
    const perDrink = 12 * 29.5735 * (5 / 100) * 0.789;
    const grams = perDrink * 2;
    const standard = grams / 14;
    const bac = (grams / (70 * 0.68)) * 100;
    expect(headline(container)).toBe(fmt(standard));
    expect(screen.getByText('Pure alcohol').nextElementSibling!.textContent).toBe(`${fmt(grams)} g`);
    expect(screen.getByText('Estimated BAC').nextElementSibling!.textContent).toBe(fmt(bac, 3));
  });

  it('doubles the standard drinks when the count doubles', () => {
    const { container } = renderCalculatorPage(<AlcoholCalculator />, page);
    fireEvent.change(screen.getByLabelText('Drinks consumed'), { target: { value: '4' } });
    const perDrink = 12 * 29.5735 * (5 / 100) * 0.789;
    expect(headline(container)).toBe(fmt((perDrink * 4) / 14));
  });
});

describe('CaffeineCalculator', () => {
  const page: CalculatorPage = {
    title: 'Caffeine Calculator',
    description: 'Caffeine against your limit.',
    path: '/caffeine-calculator.html',
    category: 'health',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<CaffeineCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Caffeine Calculator' })).toBeDefined();
    expect(screen.getByText('Caffeine per drink (mg)')).toBeDefined();
    expect(screen.getByText('Caffeine consumed')).toBeDefined();
  });

  it('sizes the limit from body weight and the mg per kg rate', () => {
    const { container } = renderCalculatorPage(<CaffeineCalculator />, page);
    const limit = 70 * 4;
    const total = 2 * 95;
    const percent = (total / limit) * 100;
    expect(headline(container)).toBe(`${fmt(total, 0)} mg`);
    expect(screen.getByText(`${fmt(percent)}% of your daily limit`)).toBeDefined();
    expect(screen.getByText('Daily limit').nextElementSibling!.textContent).toBe(`${fmt(limit, 0)} mg`);
  });

  it('crosses the limit with a third coffee', () => {
    const { container } = renderCalculatorPage(<CaffeineCalculator />, page);
    fireEvent.change(screen.getByLabelText('Drinks today'), { target: { value: '3' } });
    expect(headline(container)).toBe(`${fmt(3 * 95, 0)} mg`);
  });
});

describe('FiberIntakeCalculator', () => {
  const page: CalculatorPage = {
    title: 'Fiber Intake Calculator',
    description: 'Daily fiber goal.',
    path: '/fiber-intake-calculator.html',
    category: 'health',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<FiberIntakeCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Fiber Intake Calculator' })).toBeDefined();
    expect(screen.getByText('Fiber eaten today (g)')).toBeDefined();
    expect(screen.getByText('Daily fiber goal')).toBeDefined();
  });

  it('uses the female adequate intake under fifty', () => {
    const { container } = renderCalculatorPage(<FiberIntakeCalculator />, page);
    const goal = 25;
    const percent = (15 / goal) * 100;
    expect(headline(container)).toBe(`${fmt(goal, 0)} g`);
    expect(screen.getByText(`${fmt(percent, 0)}% of the goal reached today`)).toBeDefined();
    expect(screen.getByText('Still needed').nextElementSibling!.textContent).toBe(`${fmt(goal - 15)} g`);
  });

  it('lowers the goal after age fifty', () => {
    const { container } = renderCalculatorPage(<FiberIntakeCalculator />, page);
    fireEvent.change(screen.getByLabelText('Age'), { target: { value: '60' } });
    const goal = 21;
    expect(headline(container)).toBe(`${fmt(goal, 0)} g`);
    expect(screen.getByText('Still needed').nextElementSibling!.textContent).toBe(`${fmt(goal - 15)} g`);
  });
});

describe('SugarIntakeCalculator', () => {
  const page: CalculatorPage = {
    title: 'Sugar Intake Calculator',
    description: 'Added sugar limit.',
    path: '/sugar-intake-calculator.html',
    category: 'health',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<SugarIntakeCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Sugar Intake Calculator' })).toBeDefined();
    expect(screen.getByText('Daily calories')).toBeDefined();
    expect(screen.getByText('Added sugar limit')).toBeDefined();
  });

  it('takes ten percent of calories and divides by four grams', () => {
    const { container } = renderCalculatorPage(<SugarIntakeCalculator />, page);
    const limit = (2000 * 10) / 100 / 4;
    const overBy = 60 - limit;
    expect(headline(container)).toBe(`${fmt(limit)} g`);
    expect(screen.getByText('Over / under').nextElementSibling!.textContent).toBe(`+${fmt(overBy)} g`);
    expect(screen.getByText('Teaspoons eaten').nextElementSibling!.textContent).toBe(fmt(60 / 4, 1));
  });

  it('shrinks the limit with a smaller calorie target', () => {
    const { container } = renderCalculatorPage(<SugarIntakeCalculator />, page);
    fireEvent.change(screen.getByLabelText('Daily calories'), { target: { value: '1800' } });
    expect(headline(container)).toBe(`${fmt((1800 * 10) / 100 / 4)} g`);
  });
});

describe('SodiumIntakeCalculator', () => {
  const page: CalculatorPage = {
    title: 'Sodium Intake Calculator',
    description: 'Sodium left in your limit.',
    path: '/sodium-intake-calculator.html',
    category: 'health',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<SodiumIntakeCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Sodium Intake Calculator' })).toBeDefined();
    expect(screen.getByText('Sodium eaten (mg)')).toBeDefined();
    expect(screen.getByText('Sodium remaining')).toBeDefined();
  });

  it('reports going over the limit and the salt equivalent', () => {
    const { container } = renderCalculatorPage(<SodiumIntakeCalculator />, page);
    const remaining = 2300 - 3000;
    expect(headline(container)).toBe(`${fmt(remaining)} mg`);
    expect(screen.getByText('Salt equivalent').nextElementSibling!.textContent).toBe(`${fmt(3000 * 2.5)} mg`);
    expect(screen.getByText(`${fmt((3000 / 2300) * 100, 0)}% of the daily limit used`)).toBeDefined();
  });

  it('returns a positive balance for a lower intake', () => {
    const { container } = renderCalculatorPage(<SodiumIntakeCalculator />, page);
    fireEvent.change(screen.getByLabelText('Sodium eaten (mg)'), { target: { value: '2000' } });
    expect(headline(container)).toBe(`${fmt(2300 - 2000)} mg`);
  });
});

describe('MineralCalculator', () => {
  const page: CalculatorPage = {
    title: 'Mineral Calculator',
    description: 'Mineral intake vs RDA.',
    path: '/mineral-calculator.html',
    category: 'health',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<MineralCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Mineral Calculator' })).toBeDefined();
    expect(screen.getByText('Calcium (mg)')).toBeDefined();
    expect(screen.getByText('Minerals at target')).toBeDefined();
  });

  it('expresses each mineral as a percentage of its reference intake', () => {
    const { container } = renderCalculatorPage(<MineralCalculator />, page);
    const magnesiumPct = (210 / 420) * 100;
    expect(screen.getByText('Magnesium').nextElementSibling!.textContent).toBe(`${fmt(magnesiumPct, 0)}%`);
    expect(screen.getByText('Calcium').nextElementSibling!.textContent).toBe(`${fmt((1000 / 1000) * 100, 0)}%`);
    const meeting = [1000 / 1000, 8 / 8, 210 / 420, 11 / 11].filter((p) => p >= 1).length;
    expect(headline(container)).toBe(`${meeting} of 4`);
  });

  it('counts magnesium once it reaches the reference intake', () => {
    const { container } = renderCalculatorPage(<MineralCalculator />, page);
    fireEvent.change(screen.getByLabelText('Magnesium (mg)'), { target: { value: '420' } });
    expect(screen.getByText('Magnesium').nextElementSibling!.textContent).toBe(
      `${fmt((420 / 420) * 100, 0)}%`
    );
    expect(headline(container)).toBe('4 of 4');
  });
});

describe('VitaminCalculator', () => {
  const page: CalculatorPage = {
    title: 'Vitamin Calculator',
    description: 'Vitamin intake vs reference intakes.',
    path: '/vitamin-calculator.html',
    category: 'health',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<VitaminCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Vitamin Calculator' })).toBeDefined();
    expect(screen.getByText('Vitamin B12 (mcg)')).toBeDefined();
    expect(screen.getByText('Vitamins at target')).toBeDefined();
  });

  it('counts vitamins at or above their reference intake', () => {
    const { container } = renderCalculatorPage(<VitaminCalculator />, page);
    expect(screen.getByText('Vitamin C').nextElementSibling!.textContent).toBe(`${fmt((45 / 90) * 100, 0)}%`);
    const average = (100 + (45 / 90) * 100 + 100 + 100) / 4;
    expect(screen.getByText(`${fmt(average, 0)}% of the reference intake on average`)).toBeDefined();
    expect(headline(container)).toBe('3 of 4');
  });

  it('raises the count once vitamin C reaches 90 mg', () => {
    const { container } = renderCalculatorPage(<VitaminCalculator />, page);
    fireEvent.change(screen.getByLabelText('Vitamin C (mg)'), { target: { value: '90' } });
    expect(headline(container)).toBe('4 of 4');
    expect(screen.getByText('Vitamin C').nextElementSibling!.textContent).toBe(`${fmt((90 / 90) * 100, 0)}%`);
  });
});

describe('MicronutrientCalculator', () => {
  const page: CalculatorPage = {
    title: 'Micronutrient Calculator',
    description: 'Nutrient per 100 g scaled to a serving.',
    path: '/micronutrient-calculator.html',
    category: 'health',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<MicronutrientCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Micronutrient Calculator' })).toBeDefined();
    expect(screen.getByText('Serving size (g)')).toBeDefined();
    expect(screen.getByText('Micronutrient in serving')).toBeDefined();
  });

  it('scales the nutrient to the serving and the daily target', () => {
    const { container } = renderCalculatorPage(<MicronutrientCalculator />, page);
    const amount = (150 * 60) / 100;
    const percent = (amount / 90) * 100;
    expect(headline(container)).toBe(`${fmt(amount)} mg`);
    expect(screen.getByText(`${fmt(percent, 0)}% of the daily target`)).toBeDefined();
    expect(screen.getByText('Daily target').nextElementSibling!.textContent).toBe(`${fmt(90, 0)} mg`);
  });

  it('rescales when the serving size changes', () => {
    const { container } = renderCalculatorPage(<MicronutrientCalculator />, page);
    fireEvent.change(screen.getByLabelText('Serving size (g)'), { target: { value: '100' } });
    const amount = (100 * 60) / 100;
    expect(headline(container)).toBe(`${fmt(amount)} mg`);
  });
});

describe('MacronutrientCalculator', () => {
  const page: CalculatorPage = {
    title: 'Macronutrient Calculator',
    description: 'Calories split into macro grams.',
    path: '/macronutrient-calculator.html',
    category: 'health',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<MacroCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Macronutrient Calculator' })).toBeDefined();
    expect(screen.getAllByText('Macro Split').length).toBeGreaterThan(0);
    expect(screen.getByText('Daily Calories')).toBeDefined();
  });

  it('splits 2000 maintain calories into protein, carbs and fat', () => {
    renderCalculatorPage(<MacroCalculator />, page);
    const protein = (2000 * 0.3) / 4;
    const carbs = (2000 * 0.4) / 4;
    const fat = (2000 * 0.3) / 9;
    expect(screen.getByText(`${protein.toFixed(0)}g`)).toBeDefined();
    expect(screen.getByText(`${carbs.toFixed(0)}g`)).toBeDefined();
    expect(screen.getByText(`${fat.toFixed(0)}g`)).toBeDefined();
  });

  it('recomputes the split when calories change', () => {
    renderCalculatorPage(<MacroCalculator />, page);
    fireEvent.change(screen.getAllByRole('spinbutton')[0], { target: { value: '2400' } });
    expect(screen.getByText(`${((2400 * 0.3) / 4).toFixed(0)}g`)).toBeDefined();
  });
});

describe('NutritionalCaloriesCalculator', () => {
  const page: CalculatorPage = {
    title: 'Nutritional Calories Calculator',
    description: 'kcal and kJ from macros.',
    path: '/nutritional-calories-calculator.html',
    category: 'health',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<NutritionalCaloriesCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Nutritional Calories Calculator' })).toBeDefined();
    expect(screen.getByText('Protein (g)')).toBeDefined();
    expect(screen.getByText('Energy from macros')).toBeDefined();
  });

  it('adds macro calories and converts to kilojoules', () => {
    const { container } = renderCalculatorPage(<NutritionalCaloriesCalculator />, page);
    const kcal = 50 * 4 + 200 * 4 + 60 * 9;
    const kj = kcal * 4.184;
    expect(headline(container)).toBe(`${fmt(kcal, 0)} kcal`);
    expect(screen.getByText(`${fmt(kj, 0)} kJ`)).toBeDefined();
    expect(screen.getByText('From fat').nextElementSibling!.textContent).toBe(`${fmt(60 * 9, 0)} kcal`);
  });

  it('adds fat calories when fat intake changes', () => {
    const { container } = renderCalculatorPage(<NutritionalCaloriesCalculator />, page);
    fireEvent.change(screen.getByLabelText('Fat (g)'), { target: { value: '80' } });
    const kcal = 50 * 4 + 200 * 4 + 80 * 9;
    expect(headline(container)).toBe(`${fmt(kcal, 0)} kcal`);
  });
});

describe('EvapotranspirationCalculator', () => {
  const page: CalculatorPage = {
    title: 'Evapotranspiration Calculator',
    description: 'Crop water need from ETo.',
    path: '/evapotranspiration-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<EvapotranspirationCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Evapotranspiration Calculator' })).toBeDefined();
    expect(screen.getByText('Reference ETo (mm/day)')).toBeDefined();
    expect(screen.getByText('Water per day')).toBeDefined();
  });

  it('scales ETo by Kc and area into litres', () => {
    const { container } = renderCalculatorPage(<EvapotranspirationCalculator />, page);
    const cropETo = 5 * 0.8;
    const daily = cropETo * 200;
    const total = daily * 7;
    expect(headline(container)).toBe(`${fmt(daily)} L`);
    expect(screen.getByText(`${fmt(total)} L over 7 days`)).toBeDefined();
    expect(screen.getByText('Crop evapotranspiration').nextElementSibling!.textContent).toBe(
      `${fmt(cropETo)} mm/day`
    );
    expect(screen.getByText('Weekly need').nextElementSibling!.textContent).toBe(`${fmt(total)} L`);
  });

  it('recomputes when the crop coefficient changes', () => {
    const { container } = renderCalculatorPage(<EvapotranspirationCalculator />, page);
    fireEvent.change(screen.getByLabelText('Crop coefficient Kc'), { target: { value: '1' } });
    const daily = 5 * 1 * 200;
    expect(headline(container)).toBe(`${fmt(daily)} L`);
  });
});

describe('GrowthDegreeDaysCalculator', () => {
  const page: CalculatorPage = {
    title: 'Growth Degree Days Calculator',
    description: 'Degree days and days to target.',
    path: '/growth-degree-days-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<GrowthDegreeDaysCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Growth Degree Days Calculator' })).toBeDefined();
    expect(screen.getByText('High temperature (°C)')).toBeDefined();
    expect(screen.getByText('Growing degree days')).toBeDefined();
  });

  it('subtracts the base temperature and divides the target', () => {
    const { container } = renderCalculatorPage(<GrowthDegreeDaysCalculator />, page);
    const mean = (28 + 18) / 2;
    const gdd = mean - 10;
    const days = 1300 / gdd;
    expect(headline(container)).toBe(`${fmt(gdd, 1)} °C·day`);
    expect(screen.getByText(`${fmt(days, 0)} days to reach the target`)).toBeDefined();
    expect(screen.getByText('Mean temperature').nextElementSibling!.textContent).toBe(`${fmt(mean, 1)} °C`);
    expect(screen.getByText('Days to target').nextElementSibling!.textContent).toBe(fmt(days, 0));
  });

  it('recomputes when the base temperature changes', () => {
    const { container } = renderCalculatorPage(<GrowthDegreeDaysCalculator />, page);
    fireEvent.change(screen.getByLabelText('Base temperature (°C)'), { target: { value: '12' } });
    const gdd = (28 + 18) / 2 - 12;
    expect(headline(container)).toBe(`${fmt(gdd, 1)} °C·day`);
    expect(screen.getByText('Days to target').nextElementSibling!.textContent).toBe(fmt(1300 / gdd, 0));
  });
});

describe('HarvestDateCalculator', () => {
  const page: CalculatorPage = {
    title: 'Harvest Date Calculator',
    description: 'Planting date plus days to maturity.',
    path: '/harvest-date-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<DateAddSubtractCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Harvest Date Calculator' })).toBeDefined();
    expect(screen.getByText('Start Date')).toBeDefined();
    expect(screen.getByText('Date Add/Subtract')).toBeDefined();
  });

  it('adds maturity days to the planting date', () => {
    renderCalculatorPage(<DateAddSubtractCalculator />, page);
    expect(screen.getByText('2024-01-31')).toBeDefined();
    fireEvent.change(screen.getAllByRole('spinbutton')[0], { target: { value: '45' } });
    expect(screen.getByText('2024-02-15')).toBeDefined();
  });
});

describe('SeedingRateCalculator', () => {
  const page: CalculatorPage = {
    title: 'Seeding Rate Calculator',
    description: 'Seed mass from density and germination.',
    path: '/seeding-rate-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<SeedingRateCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Seeding Rate Calculator' })).toBeDefined();
    expect(screen.getByText('Seed weight (mg)')).toBeDefined();
    expect(screen.getByText('Seed needed')).toBeDefined();
  });

  it('inflates the seed count for germination losses', () => {
    const { container } = renderCalculatorPage(<SeedingRateCalculator />, page);
    const viable = 1000 * 40;
    const seeds = (1000 * 40) / (80 / 100);
    const mass = (seeds * 50) / 1_000_000;
    expect(headline(container)).toBe(`${fmt(mass)} kg`);
    expect(screen.getByText(`${fmt(seeds, 0)} seeds to sow`)).toBeDefined();
    expect(screen.getByText('Viable plants').nextElementSibling!.textContent).toBe(fmt(viable, 0));
  });

  it('needs less seed when germination is perfect', () => {
    const { container } = renderCalculatorPage(<SeedingRateCalculator />, page);
    fireEvent.change(screen.getByLabelText('Germination (%)'), { target: { value: '100' } });
    const mass = ((1000 * 40) / (100 / 100) * 50) / 1_000_000;
    expect(headline(container)).toBe(`${fmt(mass)} kg`);
  });
});

describe('PlantSpacingCalculator', () => {
  const page: CalculatorPage = {
    title: 'Plant Spacing Calculator',
    description: 'Density from row and plant spacing.',
    path: '/plant-spacing-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<PlantSpacingCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Plant Spacing Calculator' })).toBeDefined();
    expect(screen.getByText('Row spacing (cm)')).toBeDefined();
    expect(screen.getByText('Plant density')).toBeDefined();
  });

  it('divides 10000 square centimetres by the spacing rectangle', () => {
    const { container } = renderCalculatorPage(<PlantSpacingCalculator />, page);
    const perSqM = 10000 / (50 * 25);
    expect(headline(container)).toBe(`${fmt(perSqM)} /m²`);
    expect(screen.getByText(`${fmt(perSqM * 400, 0)} plants in the field`)).toBeDefined();
    expect(screen.getByText('Plants per hectare').nextElementSibling!.textContent).toBe(fmt(perSqM * 10000, 0));
  });

  it('raises density when plants sit closer together', () => {
    const { container } = renderCalculatorPage(<PlantSpacingCalculator />, page);
    fireEvent.change(screen.getByLabelText('Plant spacing (cm)'), { target: { value: '20' } });
    const perSqM = 10000 / (50 * 20);
    expect(headline(container)).toBe(`${fmt(perSqM)} /m²`);
  });
});

describe('IrrigationCalculator', () => {
  const page: CalculatorPage = {
    title: 'Irrigation Calculator',
    description: 'Volume and runtime for a target depth.',
    path: '/irrigation-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<IrrigationCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Irrigation Calculator' })).toBeDefined();
    expect(screen.getByText('Flow rate (L/min)')).toBeDefined();
    expect(screen.getByText('Water to apply')).toBeDefined();
  });

  it('converts depth over area into volume and runtime', () => {
    const { container } = renderCalculatorPage(<IrrigationCalculator />, page);
    const volume = 10 * 200;
    const runtime = volume / 100;
    expect(headline(container)).toBe(`${fmt(volume)} L`);
    expect(screen.getByText(`${fmt(runtime, 1)} minutes of runtime`)).toBeDefined();
    expect(screen.getByText('Runtime').nextElementSibling!.textContent).toBe(`${fmt(runtime, 1)} min`);
  });

  it('halves the volume when the target depth is cut', () => {
    const { container } = renderCalculatorPage(<IrrigationCalculator />, page);
    fireEvent.change(screen.getByLabelText('Target depth (mm)'), { target: { value: '5' } });
    expect(headline(container)).toBe(`${fmt(5 * 200)} L`);
  });
});

describe('FertilizerCalculator', () => {
  const page: CalculatorPage = {
    title: 'Fertilizer Calculator',
    description: 'Bags and cost for a nutrient requirement.',
    path: '/fertilizer-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<FertilizerCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Fertilizer Calculator' })).toBeDefined();
    expect(screen.getByText('Nutrient content (%)')).toBeDefined();
    expect(screen.getByText('Fertilizer product')).toBeDefined();
  });

  it('divides the nutrient requirement by the analysis', () => {
    const { container } = renderCalculatorPage(<FertilizerCalculator />, page);
    const product = 120 / (30 / 100);
    const bags = product / 50;
    const cost = bags * 35;
    expect(headline(container)).toBe(`${fmt(product)} kg`);
    expect(screen.getByText(`${fmt(bags, 1)} bags to buy`)).toBeDefined();
    expect(screen.getByText('Total cost').nextElementSibling!.textContent).toBe(fmt(cost));
    expect(screen.getByText('Cost per kg of nutrient').nextElementSibling!.textContent).toBe(fmt(cost / 120));
  });

  it('uses more product when the analysis is weaker', () => {
    const { container } = renderCalculatorPage(<FertilizerCalculator />, page);
    fireEvent.change(screen.getByLabelText('Nutrient content (%)'), { target: { value: '20' } });
    const product = 120 / (20 / 100);
    expect(headline(container)).toBe(`${fmt(product)} kg`);
  });
});

describe('CropYieldCalculator', () => {
  const page: CalculatorPage = {
    title: 'Crop Yield Calculator',
    description: 'Harvest mass and revenue from yield.',
    path: '/crop-yield-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<CropYieldCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Crop Yield Calculator' })).toBeDefined();
    expect(screen.getByText('Yield (t/ha)')).toBeDefined();
    expect(screen.getByText('Total harvest')).toBeDefined();
  });

  it('multiplies area by yield and prices the crop', () => {
    const { container } = renderCalculatorPage(<CropYieldCalculator />, page);
    const total = 12.5 * 6.4;
    const revenue = total * 240;
    expect(headline(container)).toBe(`${fmt(total)} t`);
    expect(screen.getByText(`${fmt(revenue)} gross revenue`)).toBeDefined();
    expect(screen.getByText('Total kilograms').nextElementSibling!.textContent).toBe(`${fmt(total * 1000, 0)} kg`);
  });

  it('recomputes when the yield changes', () => {
    const { container } = renderCalculatorPage(<CropYieldCalculator />, page);
    fireEvent.change(screen.getByLabelText('Yield (t/ha)'), { target: { value: '7' } });
    expect(headline(container)).toBe(`${fmt(12.5 * 7)} t`);
  });
});
