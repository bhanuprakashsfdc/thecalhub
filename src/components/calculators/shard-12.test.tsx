import type { ReactElement } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CalculatorPageLayout } from '../CalculatorPageLayout';
import { I18nProvider } from '../../lib/i18n';
import { formatMoney } from './kit';
import RFSignalCalculator, { computeRFSignal } from './RFSignalCalculator';
import DifficultyAdjustmentCalculator, {
  computeDifficultyAdjustment,
} from './DifficultyAdjustmentCalculator';
import StockOptionsCalculator, { computeStockOptions } from './StockOptionsCalculator';
import KnotsCalculator, { computeKnots } from './KnotsCalculator';
import ElevationCalculator, { computeElevation } from './ElevationCalculator';
import ExerciseMachineCalculator, {
  computeExerciseMachine,
} from './ExerciseMachineCalculator';
import PaintCalculator from './PaintCalculator';
import SurveySampleCalculator, {
  computeSurveySample,
} from './SurveySampleCalculator';
import MemoryTestCalculator, { computeMemoryTest } from './MemoryTestCalculator';
import UrineOutputCalculator, { computeUrineOutput } from './UrineOutputCalculator';
import DrugHalfLifeCalculator, {
  computeDrugHalfLife,
} from './DrugHalfLifeCalculator';
import OctonionCalculator, { computeOctonion } from './OctonionCalculator';
import EulersIdentityCalculator, {
  computeEulersIdentity,
} from './EulersIdentityCalculator';
import HashGeneratorCalculator, { computeHash } from './HashGeneratorCalculator';
import DifferenceCalculator, { computeDifference } from './DifferenceCalculator';
import PropertyTaxCalculator, { computePropertyTax } from './PropertyTaxCalculator';
import CreditUtilizationCalculator, {
  computeCreditUtilization,
} from './CreditUtilizationCalculator';
import EmergencyFundCalculator, {
  computeEmergencyFund,
} from './EmergencyFundCalculator';
import ProjectDurationCalculator, {
  computeProjectDuration,
} from './ProjectDurationCalculator';
import PlateCostCalculator, { computePlateCost } from './PlateCostCalculator';
import GrahamsLawCalculator, { computeGrahamsLaw } from './GrahamsLawCalculator';
import PhCalculator, { computePh } from './PhCalculator';
import MolarMassCalculator, { computeMolarMass } from './MolarMassCalculator';
import HarmonicMotionCalculator, {
  computeHarmonicMotion,
} from './HarmonicMotionCalculator';
import DensityCalculator, { computeDensity } from './DensityCalculator';
import DeflectionCalculator, { computeDeflection } from './DeflectionCalculator';
import InsulationCalculator, { computeInsulation } from './InsulationCalculator';
import CementCalculator from './CementCalculator';
import AttorneyFeeCalculator, { computeAttorneyFee } from './AttorneyFeeCalculator';
import BusinessInsuranceCalculator, { computeBusinessInsurance } from './BusinessInsuranceCalculator';
import CarBuyingCalculator, { computeCarBuying } from './CarBuyingCalculator';
import CharacterCountCalculator, { computeCharacterCount } from './CharacterCountCalculator';
import ClosingCostCalculator, { computeClosingCost } from './ClosingCostCalculator';
import CostPerSaleCalculator, { computeCostPerSale } from './CostPerSaleCalculator';
import CurrentRatioCalculator, { computeCurrentRatio } from './CurrentRatioCalculator';
import DataTransferCalculator, { computeDataTransfer } from './DataTransferCalculator';
import DomainAuthorityCalculator, { computeDomainAuthority } from './DomainAuthorityCalculator';
import ExtraPaymentMortgageCalculator, { computeExtraPaymentMortgage } from './ExtraPaymentMortgageCalculator';
import FuelCostCalculator, { computeFuelCost } from './FuelCostCalculator';
import FutureDateCalculator, { computeFutureDate } from './FutureDateCalculator';
import HolidayCalculator, { computeHoliday } from './HolidayCalculator';
import LifeInsuranceCalculator, { computeLifeInsurance } from './LifeInsuranceCalculator';
import OperatingCashFlowCalculator, { computeOperatingCashFlow } from './OperatingCashFlowCalculator';
import PackingListCalculator, { computePackingList } from './PackingListCalculator';
import PercentileRankCalculator, { computePercentileRank } from './PercentileRankCalculator';
import PropertyValueAppreciationCalculator, { computePropertyValueAppreciation } from './PropertyValueAppreciationCalculator';
import RoaCalculator, { computeRoa } from './RoaCalculator';
import TimeDurationCalculator from './TimeDurationCalculator';
import TireSizeCalculator, { computeTireSize } from './TireSizeCalculator';
import UnicodeCalculator, { computeUnicode } from './UnicodeCalculator';
import WallpaperCalculator, { computeWallpaper } from './WallpaperCalculator';
import WeightedGpaCalculator, { computeWeightedGpa } from './WeightedGpaCalculator';

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

const money = (n: number) => `$${formatMoney(n)}`;
const num = (n: number) => formatMoney(n);

describe('DifficultyAdjustmentCalculator', () => {
  const page: CalculatorPage = {
    title: 'Difficulty Adjustment Calculator',
    description: 'Compute Bitcoin-style mining difficulty retargets with the 4x clamp.',
    path: '/difficulty-adjustment-calculator.html',
    category: 'programming',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<DifficultyAdjustmentCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Difficulty Adjustment Calculator' })).toBeDefined();
    expect(screen.getByText('Previous difficulty')).toBeDefined();
    expect(screen.getByText('Adjusted difficulty')).toBeDefined();
  });

  it('applies the target over actual ratio', () => {
    const { container } = renderCalculatorPage(<DifficultyAdjustmentCalculator />, page);
    const result = computeDifficultyAdjustment({ previousDifficulty: 15000, targetMinutes: 10, actualMinutes: 12 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(num(result.difficulty));
    expect(screen.getByText('Adjustment ratio').nextElementSibling!.textContent).toBe(num(result.ratio));
  });

  it('raises difficulty when blocks come fast', () => {
    const { container } = renderCalculatorPage(<DifficultyAdjustmentCalculator />, page);
    fireEvent.change(screen.getByLabelText('Actual block time (minutes)'), { target: { value: '8' } });
    const result = computeDifficultyAdjustment({ previousDifficulty: 15000, targetMinutes: 10, actualMinutes: 8 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(num(result.difficulty));
  });
});

describe('StockOptionsCalculator', () => {
  const page: CalculatorPage = {
    title: 'Stock Options Calculator',
    description: 'Work out call and put option profit, breakeven and intrinsic value.',
    path: '/stock-options-calculator.html',
    category: 'trading',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<StockOptionsCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Stock Options Calculator' })).toBeDefined();
    expect(screen.getByText('Strike price ($)')).toBeDefined();
    expect(screen.getByText('Profit or loss')).toBeDefined();
  });

  it('pays intrinsic minus premium per share', () => {
    const { container } = renderCalculatorPage(<StockOptionsCalculator />, page);
    const result = computeStockOptions({ strike: 50, stockPrice: 55, premium: 2, contracts: 1, optionType: 'call' });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(result.profit));
    expect(screen.getByText('Breakeven price').nextElementSibling!.textContent).toBe(money(result.breakeven));
  });

  it('recomputes when the stock price changes', () => {
    const { container } = renderCalculatorPage(<StockOptionsCalculator />, page);
    fireEvent.change(screen.getByLabelText('Stock price ($)'), { target: { value: '45' } });
    const result = computeStockOptions({ strike: 50, stockPrice: 45, premium: 2, contracts: 1, optionType: 'call' });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(result.profit));
  });
});

describe('KnotsCalculator', () => {
  const page: CalculatorPage = {
    title: 'Knots Calculator',
    description: 'Convert knots to km/h, mph, meters per second and feet per minute.',
    path: '/knots-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<KnotsCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Knots Calculator' })).toBeDefined();
    expect(screen.getByText('Speed (knots)')).toBeDefined();
    expect(screen.getByText('Speed in km/h')).toBeDefined();
  });

  it('converts knots to kilometres per hour', () => {
    const { container } = renderCalculatorPage(<KnotsCalculator />, page);
    const result = computeKnots({ knots: 10 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(result.kmh)} km/h`);
    expect(screen.getByText('Miles per hour (mph)').nextElementSibling!.textContent).toBe(num(result.mph));
  });

  it('recomputes when speed changes', () => {
    const { container } = renderCalculatorPage(<KnotsCalculator />, page);
    fireEvent.change(screen.getByLabelText('Speed (knots)'), { target: { value: '20' } });
    const result = computeKnots({ knots: 20 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(result.kmh)} km/h`);
  });
});

describe('ElevationCalculator', () => {
  const page: CalculatorPage = {
    title: 'Elevation Calculator',
    description: 'Find elevation from horizontal distance, angle and instrument height.',
    path: '/elevation-calculator.html',
    category: 'construction',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<ElevationCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Elevation Calculator' })).toBeDefined();
    expect(screen.getByText('Horizontal distance (m)')).toBeDefined();
    expect(screen.getByText('Elevation (m)')).toBeDefined();
  });

  it('adds instrument height to the trigonometric rise', () => {
    const { container } = renderCalculatorPage(<ElevationCalculator />, page);
    const result = computeElevation({ distance: 100, angleDegrees: 30, instrumentHeight: 1.5 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(result.elevation)} m`);
    expect(screen.getByText('Vertical rise (m)').nextElementSibling!.textContent).toBe(num(result.rise));
  });

  it('recomputes when the angle changes', () => {
    const { container } = renderCalculatorPage(<ElevationCalculator />, page);
    fireEvent.change(screen.getByLabelText('Angle of elevation (°)'), { target: { value: '45' } });
    const result = computeElevation({ distance: 100, angleDegrees: 45, instrumentHeight: 1.5 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(result.elevation)} m`);
  });
});

describe('ExerciseMachineCalculator', () => {
  const page: CalculatorPage = {
    title: 'Exercise Machine Calculator',
    description: 'Estimate calories burned on treadmills, bikes, ellipticals and more.',
    path: '/exercise-machine-calculator.html',
    category: 'fitness',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<ExerciseMachineCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Exercise Machine Calculator' })).toBeDefined();
    expect(screen.getByText('Weight (kg)')).toBeDefined();
    expect(screen.getByText('Calories burned')).toBeDefined();
  });

  it('multiplies METs by weight and hours', () => {
    const { container } = renderCalculatorPage(<ExerciseMachineCalculator />, page);
    const result = computeExerciseMachine({ weightKg: 70, minutes: 30, met: 7 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(result.calories)} kcal`);
    expect(screen.getByText('Calories per minute').nextElementSibling!.textContent).toBe(num(result.perMinute));
  });

  it('recomputes when duration changes', () => {
    const { container } = renderCalculatorPage(<ExerciseMachineCalculator />, page);
    fireEvent.change(screen.getByLabelText('Duration (minutes)'), { target: { value: '60' } });
    const result = computeExerciseMachine({ weightKg: 70, minutes: 60, met: 7 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(result.calories)} kcal`);
  });
});

describe('PaintCalculator', () => {
  const page: CalculatorPage = {
    title: 'Paint Calculator',
    description: 'Calculate paint gallons and cost for walls, doors and windows.',
    path: '/paint-calculator.html',
    category: 'construction',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<PaintCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Paint Calculator' })).toBeDefined();
    expect(screen.getByText('Wall Length (feet)')).toBeDefined();
    expect(screen.getByText('Gallons needed')).toBeDefined();
  });

  it('subtracts openings and rounds up to whole gallons', () => {
    renderCalculatorPage(<PaintCalculator />, page);
    const grossSqft = 20 * 8 * 4;
    const netSqft = grossSqft - 1 * 20 - 2 * 15;
    const gallons = Math.ceil((netSqft / 350) * 2);
    expect(screen.getByText('Gross Area').nextElementSibling!.textContent).toBe(`${grossSqft} sq ft`);
    expect(screen.getByText('Net Area').nextElementSibling!.textContent).toBe(`${netSqft} sq ft`);
    expect(screen.getByText('Gallons needed').nextElementSibling!.textContent).toBe(`${gallons} gal`);
    expect(screen.getByText('Estimated Cost').nextElementSibling!.textContent).toBe(`$${(gallons * 35).toFixed(2)}`);
  });

  it('recomputes when wall length changes', () => {
    const { container } = renderCalculatorPage(<PaintCalculator />, page);
    const inputs = container.querySelectorAll('input[type="number"]');
    fireEvent.change(inputs[0], { target: { value: '30' } });
    const netSqft = 30 * 8 * 4 - 20 - 30;
    const gallons = Math.ceil((netSqft / 350) * 2);
    expect(screen.getByText('Estimated Cost').nextElementSibling!.textContent).toBe(`$${(gallons * 35).toFixed(2)}`);
  });
});

describe('SurveySampleCalculator', () => {
  const page: CalculatorPage = {
    title: 'Survey Sample Calculator',
    description: 'Find the required survey sample size with finite population correction.',
    path: '/survey-sample-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<SurveySampleCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Survey Sample Calculator' })).toBeDefined();
    expect(screen.getByText('Population size')).toBeDefined();
    expect(screen.getByText('Required sample size')).toBeDefined();
  });

  it('applies the finite population correction', () => {
    const { container } = renderCalculatorPage(<SurveySampleCalculator />, page);
    const result = computeSurveySample({ population: 10000, marginError: 5, proportion: 50, zScore: 1.96 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(String(Math.ceil(result.corrected)));
    expect(screen.getByText('Sample before correction').nextElementSibling!.textContent).toBe(num(result.raw));
  });

  it('requires more respondents at a tighter margin', () => {
    const { container } = renderCalculatorPage(<SurveySampleCalculator />, page);
    fireEvent.change(screen.getByLabelText('Margin of error (%)'), { target: { value: '3' } });
    const result = computeSurveySample({ population: 10000, marginError: 3, proportion: 50, zScore: 1.96 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(String(Math.ceil(result.corrected)));
  });
});

describe('MemoryTestCalculator', () => {
  const page: CalculatorPage = {
    title: 'Memory Test Calculator',
    description: 'Score memory tests with recall accuracy and trial success rates.',
    path: '/memory-test-calculator.html',
    category: 'health',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<MemoryTestCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Memory Test Calculator' })).toBeDefined();
    expect(screen.getByText('Items shown')).toBeDefined();
    expect(screen.getByText('Memory score')).toBeDefined();
  });

  it('averages recall accuracy and trial success', () => {
    const { container } = renderCalculatorPage(<MemoryTestCalculator />, page);
    const result = computeMemoryTest({ itemsShown: 10, itemsRecalled: 8, trialsAttempted: 5, trialsCorrect: 4 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(result.score)}%`);
    expect(screen.getByText('Recall accuracy').nextElementSibling!.textContent).toBe(`${num(result.accuracy)}%`);
  });

  it('recomputes when recall changes', () => {
    const { container } = renderCalculatorPage(<MemoryTestCalculator />, page);
    fireEvent.change(screen.getByLabelText('Items recalled'), { target: { value: '6' } });
    const result = computeMemoryTest({ itemsShown: 10, itemsRecalled: 6, trialsAttempted: 5, trialsCorrect: 4 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(result.score)}%`);
  });
});

describe('UrineOutputCalculator', () => {
  const page: CalculatorPage = {
    title: 'Urine Output Calculator',
    description: 'Compute urine output in mL/kg/hr and check against normal ranges.',
    path: '/urine-output-calculator.html',
    category: 'health',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<UrineOutputCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Urine Output Calculator' })).toBeDefined();
    expect(screen.getByText('Urine volume (mL)')).toBeDefined();
    expect(screen.getByText('Urine output')).toBeDefined();
  });

  it('normalises output by weight and hours', () => {
    const { container } = renderCalculatorPage(<UrineOutputCalculator />, page);
    const result = computeUrineOutput({ volumeMl: 600, weightKg: 70, hours: 8 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(result.rate)} mL/kg/hr`);
    expect(screen.getByText('Hourly volume (mL/hr)').nextElementSibling!.textContent).toBe(num(result.hourly));
  });

  it('recomputes when collection time changes', () => {
    const { container } = renderCalculatorPage(<UrineOutputCalculator />, page);
    fireEvent.change(screen.getByLabelText('Collection time (hours)'), { target: { value: '4' } });
    const result = computeUrineOutput({ volumeMl: 600, weightKg: 70, hours: 4 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(result.rate)} mL/kg/hr`);
  });
});

describe('DrugHalfLifeCalculator', () => {
  const page: CalculatorPage = {
    title: 'Drug Half-Life Calculator',
    description: 'Track drug concentration decay over elapsed time and half-lives.',
    path: '/drug-half-life-calculator.html',
    category: 'health',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<DrugHalfLifeCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Drug Half-Life Calculator' })).toBeDefined();
    expect(screen.getByText('Initial dose (mg)')).toBeDefined();
    expect(screen.getByText('Remaining drug')).toBeDefined();
  });

  it('halves the dose once per half-life', () => {
    const { container } = renderCalculatorPage(<DrugHalfLifeCalculator />, page);
    const result = computeDrugHalfLife({ doseMg: 500, halfLifeHours: 6, elapsedHours: 18 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(result.remaining)} mg`);
    expect(screen.getByText('Drug eliminated (mg)').nextElementSibling!.textContent).toBe(num(result.eliminated));
  });

  it('recomputes when elapsed time changes', () => {
    const { container } = renderCalculatorPage(<DrugHalfLifeCalculator />, page);
    fireEvent.change(screen.getByLabelText('Time elapsed (hours)'), { target: { value: '24' } });
    const result = computeDrugHalfLife({ doseMg: 500, halfLifeHours: 6, elapsedHours: 24 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(result.remaining)} mg`);
  });
});

describe('OctonionCalculator', () => {
  const page: CalculatorPage = {
    title: 'Octonion Calculator',
    description: 'Multiply eight-dimensional octonions and compute their norms.',
    path: '/octonion-calculator.html',
    category: 'math',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<OctonionCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Octonion Calculator' })).toBeDefined();
    expect(screen.getByText('A real part')).toBeDefined();
    expect(screen.getByText('Product norm')).toBeDefined();
  });

  it('multiplies via the Fano plane triples', () => {
    const { container } = renderCalculatorPage(<OctonionCalculator />, page);
    const result = computeOctonion({
      a: [2, 1, 0, 0, 0, 0, 0, 0],
      b: [3, 0, 1, 0, 0, 0, 0, 0],
    });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(num(result.norm));
    expect(screen.getByText('Product real part').nextElementSibling!.textContent).toBe(num(result.product[0]));
    expect(screen.getByText('Product e1 component').nextElementSibling!.textContent).toBe(num(result.product[1]));
    expect(screen.getByText('Product e4 component').nextElementSibling!.textContent).toBe(num(result.product[4]));
  });

  it('recomputes when a coefficient changes', () => {
    const { container } = renderCalculatorPage(<OctonionCalculator />, page);
    fireEvent.change(screen.getByLabelText('A e1 coefficient'), { target: { value: '2' } });
    const result = computeOctonion({
      a: [2, 2, 0, 0, 0, 0, 0, 0],
      b: [3, 0, 1, 0, 0, 0, 0, 0],
    });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(num(result.norm));
  });
});

describe('EulersIdentityCalculator', () => {
  const page: CalculatorPage = {
    title: "Euler's Identity Calculator",
    description: "Evaluate e^(iθ) with Euler's formula and verify the famous identity.",
    path: '/euler-s-identity-calculator.html',
    category: 'math',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<EulersIdentityCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: "Euler's Identity Calculator" })).toBeDefined();
    expect(screen.getByText('Angle (degrees)')).toBeDefined();
    expect(screen.getByText('e^(iθ) + 1')).toBeDefined();
  });

  it('collapses to zero at 180 degrees', () => {
    const { container } = renderCalculatorPage(<EulersIdentityCalculator />, page);
    const result = computeEulersIdentity({ degrees: 180 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(result.realPlusOne)} + ${num(result.imaginary)}i`);
    expect(screen.getByText('Real part (cos θ)').nextElementSibling!.textContent).toBe(num(result.real));
  });

  it('rotates to i at 90 degrees', () => {
    const { container } = renderCalculatorPage(<EulersIdentityCalculator />, page);
    fireEvent.change(screen.getByLabelText('Angle (degrees)'), { target: { value: '90' } });
    const result = computeEulersIdentity({ degrees: 90 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(result.realPlusOne)} + ${num(result.imaginary)}i`);
  });
});

describe('HashGeneratorCalculator', () => {
  const page: CalculatorPage = {
    title: 'Hash Generator Calculator',
    description: 'Generate FNV-1a, DJB2 and SDBM 32-bit hashes from any text.',
    path: '/hash-generator-calculator.html',
    category: 'programming',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<HashGeneratorCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Hash Generator Calculator' })).toBeDefined();
    expect(screen.getByText('Text to hash')).toBeDefined();
    expect(screen.getByText('Hash value')).toBeDefined();
  });

  it('hashes the default text with FNV-1a', () => {
    const { container } = renderCalculatorPage(<HashGeneratorCalculator />, page);
    const result = computeHash({ text: 'thecalhub', algorithm: 'fnv1a' });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(result.hex);
    expect(screen.getByText('Hash (decimal)').nextElementSibling!.textContent).toBe(String(result.value));
    expect(screen.getByText('Character count').nextElementSibling!.textContent).toBe('9');
  });

  it('recomputes when the text changes', () => {
    const { container } = renderCalculatorPage(<HashGeneratorCalculator />, page);
    fireEvent.change(screen.getByLabelText('Text to hash'), { target: { value: 'hello' } });
    const result = computeHash({ text: 'hello', algorithm: 'fnv1a' });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(result.hex);
  });
});

describe('DifferenceCalculator', () => {
  const page: CalculatorPage = {
    title: 'Difference Calculator',
    description: 'Compute absolute difference, percent difference and percent change.',
    path: '/difference-calculator.html',
    category: 'math',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<DifferenceCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Difference Calculator' })).toBeDefined();
    expect(screen.getByText('Value A')).toBeDefined();
    expect(screen.getByText('Percent difference')).toBeDefined();
  });

  it('compares values against their average', () => {
    const { container } = renderCalculatorPage(<DifferenceCalculator />, page);
    const result = computeDifference({ valueA: 25, valueB: 75 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(result.percentDifference)}%`);
    expect(screen.getByText('Absolute difference').nextElementSibling!.textContent).toBe(num(result.absolute));
  });

  it('recomputes when value A changes', () => {
    const { container } = renderCalculatorPage(<DifferenceCalculator />, page);
    fireEvent.change(screen.getByLabelText('Value A'), { target: { value: '50' } });
    const result = computeDifference({ valueA: 50, valueB: 75 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(result.percentDifference)}%`);
  });
});

describe('PropertyTaxCalculator', () => {
  const page: CalculatorPage = {
    title: 'Property Tax Calculator',
    description: 'Estimate annual property tax from assessed value and mill rate.',
    path: '/property-tax-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<PropertyTaxCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Property Tax Calculator' })).toBeDefined();
    expect(screen.getByText('Property value ($)')).toBeDefined();
    expect(screen.getByText('Annual property tax')).toBeDefined();
  });

  it('applies the tax rate to the assessed value', () => {
    const { container } = renderCalculatorPage(<PropertyTaxCalculator />, page);
    const result = computePropertyTax({ propertyValue: 350000, assessmentRate: 80, taxRate: 1.2 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(result.annual));
    expect(screen.getByText('Assessed value').nextElementSibling!.textContent).toBe(money(result.assessed));
  });

  it('recomputes when the tax rate changes', () => {
    const { container } = renderCalculatorPage(<PropertyTaxCalculator />, page);
    fireEvent.change(screen.getByLabelText('Tax rate (%)'), { target: { value: '2' } });
    const result = computePropertyTax({ propertyValue: 350000, assessmentRate: 80, taxRate: 2 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(result.annual));
  });
});

describe('CreditUtilizationCalculator', () => {
  const page: CalculatorPage = {
    title: 'Credit Utilization Calculator',
    description: 'Measure credit utilization against the 30% guideline.',
    path: '/credit-utilization-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<CreditUtilizationCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Credit Utilization Calculator' })).toBeDefined();
    expect(screen.getByText('Credit limit ($)')).toBeDefined();
    expect(screen.getByText('Credit utilization')).toBeDefined();
  });

  it('divides balance by limit', () => {
    const { container } = renderCalculatorPage(<CreditUtilizationCalculator />, page);
    const result = computeCreditUtilization({ creditLimit: 10000, currentBalance: 2500 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(result.utilization)}%`);
    expect(screen.getByText('Available credit').nextElementSibling!.textContent).toBe(money(result.available));
  });

  it('recomputes when the balance changes', () => {
    const { container } = renderCalculatorPage(<CreditUtilizationCalculator />, page);
    fireEvent.change(screen.getByLabelText('Current balance ($)'), { target: { value: '5000' } });
    const result = computeCreditUtilization({ creditLimit: 10000, currentBalance: 5000 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(result.utilization)}%`);
  });
});

describe('EmergencyFundCalculator', () => {
  const page: CalculatorPage = {
    title: 'Emergency Fund Calculator',
    description: 'Size an emergency fund for 3 to 6 months of expenses.',
    path: '/emergency-fund-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<EmergencyFundCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Emergency Fund Calculator' })).toBeDefined();
    expect(screen.getByText('Monthly expenses ($)')).toBeDefined();
    expect(screen.getByText('Emergency fund target')).toBeDefined();
  });

  it('multiplies expenses by coverage months', () => {
    const { container } = renderCalculatorPage(<EmergencyFundCalculator />, page);
    const result = computeEmergencyFund({ monthlyExpenses: 4000, months: 6, currentSavings: 8000 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(result.target));
    expect(screen.getByText('Funding gap').nextElementSibling!.textContent).toBe(money(result.gap));
  });

  it('recomputes when coverage months change', () => {
    const { container } = renderCalculatorPage(<EmergencyFundCalculator />, page);
    fireEvent.change(screen.getByLabelText('Coverage months'), { target: { value: '3' } });
    const result = computeEmergencyFund({ monthlyExpenses: 4000, months: 3, currentSavings: 8000 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(result.target));
  });
});

describe('ProjectDurationCalculator', () => {
  const page: CalculatorPage = {
    title: 'Project Duration Calculator',
    description: 'Estimate project days from task hours, team size and efficiency.',
    path: '/project-duration-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<ProjectDurationCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Project Duration Calculator' })).toBeDefined();
    expect(screen.getByText('Total task hours')).toBeDefined();
    expect(screen.getByText('Project duration')).toBeDefined();
  });

  it('divides task hours by effective daily capacity', () => {
    const { container } = renderCalculatorPage(<ProjectDurationCalculator />, page);
    const result = computeProjectDuration({ taskHours: 480, members: 4, hoursPerDay: 8, efficiency: 90 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(result.days)} days`);
    expect(screen.getByText('Daily capacity (hours)').nextElementSibling!.textContent).toBe(num(result.dailyCapacity));
  });

  it('shortens when the team grows', () => {
    const { container } = renderCalculatorPage(<ProjectDurationCalculator />, page);
    fireEvent.change(screen.getByLabelText('Team members'), { target: { value: '8' } });
    const result = computeProjectDuration({ taskHours: 480, members: 8, hoursPerDay: 8, efficiency: 90 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(result.days)} days`);
  });
});

describe('PlateCostCalculator', () => {
  const page: CalculatorPage = {
    title: 'Plate Cost Calculator',
    description: 'Calculate restaurant plate cost and suggested menu pricing.',
    path: '/plate-cost-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<PlateCostCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Plate Cost Calculator' })).toBeDefined();
    expect(screen.getByText('Total ingredient cost ($)')).toBeDefined();
    expect(screen.getByText('Cost per plate')).toBeDefined();
  });

  it('divides ingredient cost by servings', () => {
    const { container } = renderCalculatorPage(<PlateCostCalculator />, page);
    const result = computePlateCost({ ingredientCost: 120, servings: 10, targetFoodCost: 30 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(result.plateCost));
    expect(screen.getByText('Suggested menu price').nextElementSibling!.textContent).toBe(money(result.suggestedPrice));
  });

  it('recomputes when servings change', () => {
    const { container } = renderCalculatorPage(<PlateCostCalculator />, page);
    fireEvent.change(screen.getByLabelText('Number of servings'), { target: { value: '8' } });
    const result = computePlateCost({ ingredientCost: 120, servings: 8, targetFoodCost: 30 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(result.plateCost));
  });
});

describe('GrahamsLawCalculator', () => {
  const page: CalculatorPage = {
    title: "Graham's Law Calculator",
    description: 'Compare gas effusion rates using molar masses.',
    path: '/graham-s-law-calculator.html',
    category: 'scientific',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<GrahamsLawCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: "Graham's Law Calculator" })).toBeDefined();
    expect(screen.getByText('Molar mass of gas 1 (g/mol)')).toBeDefined();
    expect(screen.getByText('Rate ratio (gas 1 ÷ gas 2)')).toBeDefined();
  });

  it('takes the square root of the molar mass ratio', () => {
    const { container } = renderCalculatorPage(<GrahamsLawCalculator />, page);
    const result = computeGrahamsLaw({ molarMass1: 4, molarMass2: 32 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(num(result.ratio));
    expect(screen.getByText('Gas 1 relative rate').nextElementSibling!.textContent).toBe(num(result.rate1));
  });

  it('equals one when molar masses match', () => {
    const { container } = renderCalculatorPage(<GrahamsLawCalculator />, page);
    fireEvent.change(screen.getByLabelText('Molar mass of gas 2 (g/mol)'), { target: { value: '4' } });
    const result = computeGrahamsLaw({ molarMass1: 4, molarMass2: 4 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(num(result.ratio));
  });
});

describe('PhCalculator', () => {
  const page: CalculatorPage = {
    title: 'pH Calculator',
    description: 'Convert hydrogen ion concentration to pH, pOH and acidity.',
    path: '/ph-calculator.html',
    category: 'scientific',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<PhCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'pH Calculator' })).toBeDefined();
    expect(screen.getByText('Hydrogen ion concentration (mol/L)')).toBeDefined();
    expect(screen.getByText('pH level')).toBeDefined();
  });

  it('takes the negative log of concentration', () => {
    const { container } = renderCalculatorPage(<PhCalculator />, page);
    const result = computePh({ hydrogenConcentration: 0.0001 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(num(result.ph));
    expect(screen.getByText('pOH').nextElementSibling!.textContent).toBe(num(result.poh));
    expect(screen.getByText('Hydroxide concentration (mol/L)').nextElementSibling!.textContent).toBe(result.ohConcentration.toExponential(2));
  });

  it('turns neutral at 1e-7', () => {
    const { container } = renderCalculatorPage(<PhCalculator />, page);
    fireEvent.change(screen.getByLabelText('Hydrogen ion concentration (mol/L)'), { target: { value: '0.0000001' } });
    const result = computePh({ hydrogenConcentration: 0.0000001 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(num(result.ph));
  });
});

describe('MolarMassCalculator', () => {
  const page: CalculatorPage = {
    title: 'Molar Mass Calculator',
    description: 'Parse chemical formulas and compute molar mass and moles.',
    path: '/molar-mass-calculator.html',
    category: 'scientific',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<MolarMassCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Molar Mass Calculator' })).toBeDefined();
    expect(screen.getByText('Chemical formula')).toBeDefined();
    expect(screen.getByText('Molar mass')).toBeDefined();
  });

  it('sums atomic masses across the formula', () => {
    const { container } = renderCalculatorPage(<MolarMassCalculator />, page);
    const result = computeMolarMass({ formula: 'C6H12O6', sampleMassG: 90 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(result.molarMass)} g/mol`);
    expect(screen.getByText('Moles in sample').nextElementSibling!.textContent).toBe(num(result.moles));
    expect(screen.getByText('Elements present').nextElementSibling!.textContent).toBe(num(result.elements));
  });

  it('recomputes when the formula changes', () => {
    const { container } = renderCalculatorPage(<MolarMassCalculator />, page);
    fireEvent.change(screen.getByLabelText('Chemical formula'), { target: { value: 'H2O' } });
    const result = computeMolarMass({ formula: 'H2O', sampleMassG: 90 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(result.molarMass)} g/mol`);
  });
});

describe('HarmonicMotionCalculator', () => {
  const page: CalculatorPage = {
    title: 'Harmonic Motion Calculator',
    description: 'Solve spring-mass oscillators for period, frequency and velocity.',
    path: '/harmonic-motion-calculator.html',
    category: 'scientific',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<HarmonicMotionCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Harmonic Motion Calculator' })).toBeDefined();
    expect(screen.getByText('Mass (kg)')).toBeDefined();
    expect(screen.getByText('Period')).toBeDefined();
  });

  it('derives the period from mass and spring constant', () => {
    const { container } = renderCalculatorPage(<HarmonicMotionCalculator />, page);
    const result = computeHarmonicMotion({ massKg: 2, springConstant: 200, amplitude: 0.1 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(result.period)} s`);
    expect(screen.getByText('Angular frequency (rad/s)').nextElementSibling!.textContent).toBe(num(result.omega));
  });

  it('recomputes when the spring constant changes', () => {
    const { container } = renderCalculatorPage(<HarmonicMotionCalculator />, page);
    fireEvent.change(screen.getByLabelText('Spring constant (N/m)'), { target: { value: '800' } });
    const result = computeHarmonicMotion({ massKg: 2, springConstant: 800, amplitude: 0.1 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(result.period)} s`);
  });
});

describe('DensityCalculator', () => {
  const page: CalculatorPage = {
    title: 'Density Calculator',
    description: 'Compute density in kg/m³, g/cm³ and specific gravity.',
    path: '/density-calculator.html',
    category: 'scientific',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<DensityCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Density Calculator' })).toBeDefined();
    expect(screen.getByText('Mass (kg)')).toBeDefined();
    expect(screen.getByText('Density')).toBeDefined();
  });

  it('divides mass by volume', () => {
    const { container } = renderCalculatorPage(<DensityCalculator />, page);
    const result = computeDensity({ massKg: 5, volumeM3: 0.002 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(result.density)} kg/m³`);
    expect(screen.getByText('Density (g/cm³)').nextElementSibling!.textContent).toBe(num(result.gramsPerCm3));
  });

  it('recomputes when volume changes', () => {
    const { container } = renderCalculatorPage(<DensityCalculator />, page);
    fireEvent.change(screen.getByLabelText('Volume (m³)'), { target: { value: '0.001' } });
    const result = computeDensity({ massKg: 5, volumeM3: 0.001 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(result.density)} kg/m³`);
  });
});

describe('DeflectionCalculator', () => {
  const page: CalculatorPage = {
    title: 'Deflection Calculator',
    description: 'Beam mid-span deflection for a central point load, δ = PL³/48EI.',
    path: '/deflection-calculator.html',
    category: 'construction',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<DeflectionCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Deflection Calculator' })).toBeDefined();
    expect(screen.getByText('Load (N)')).toBeDefined();
    expect(screen.getByText('Maximum deflection')).toBeDefined();
  });

  it('applies the point load deflection formula', () => {
    const { container } = renderCalculatorPage(<DeflectionCalculator />, page);
    const result = computeDeflection({ loadN: 10000, spanM: 5, elasticModulusGpa: 200, momentInertiaCm4: 400 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(result.deltaMm)} mm`);
    expect(screen.getByText('Deflection (m)').nextElementSibling!.textContent).toBe(num(result.delta));
    expect(screen.getByText(`Deflection ratio (L/${num(result.ratio)})`).nextElementSibling!.textContent).toBe(num(result.ratio));
  });

  it('recomputes when the load doubles', () => {
    const { container } = renderCalculatorPage(<DeflectionCalculator />, page);
    fireEvent.change(screen.getByLabelText('Load (N)'), { target: { value: '20000' } });
    const result = computeDeflection({ loadN: 20000, spanM: 5, elasticModulusGpa: 200, momentInertiaCm4: 400 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(result.deltaMm)} mm`);
  });
});

describe('InsulationCalculator', () => {
  const page: CalculatorPage = {
    title: 'Insulation Calculator',
    description: 'Estimate heat loss through walls from R-value and temperature gap.',
    path: '/insulation-calculator.html',
    category: 'construction',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<InsulationCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Insulation Calculator' })).toBeDefined();
    expect(screen.getByText('Wall area (m²)')).toBeDefined();
    expect(screen.getByText('Heat loss')).toBeDefined();
  });

  it('divides area times temperature gap by R-value', () => {
    const { container } = renderCalculatorPage(<InsulationCalculator />, page);
    const result = computeInsulation({ areaM2: 150, temperatureDiffC: 25, rValue: 3.5 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(result.heatLoss)} W`);
    expect(screen.getByText('U-value (W/m²·K)').nextElementSibling!.textContent).toBe(num(result.uValue));
  });

  it('recomputes when R-value changes', () => {
    const { container } = renderCalculatorPage(<InsulationCalculator />, page);
    fireEvent.change(screen.getByLabelText('R-value (m²·K/W)'), { target: { value: '7' } });
    const result = computeInsulation({ areaM2: 150, temperatureDiffC: 25, rValue: 7 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(result.heatLoss)} W`);
  });
});

describe('CementCalculator', () => {
  const page: CalculatorPage = {
    title: 'Cement Calculator',
    description: 'Estimate cement bags, sand and aggregate for a concrete slab.',
    path: '/cement-calculator.html',
    category: 'construction',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<CementCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Cement Calculator' })).toBeDefined();
    expect(screen.getByText('Area (sq m)')).toBeDefined();
    expect(screen.getByText('Cement (bags)')).toBeDefined();
  });

  it('scales materials by dry volume', () => {
    renderCalculatorPage(<CementCalculator />, page);
    const dryVolume = 100 * 0.15 * 1.54;
    const bags = (dryVolume / 7) / 0.035;
    const sand = (dryVolume * 2) / 7;
    const aggregate = (dryVolume * 4) / 7;
    expect(screen.getByText('Cement (bags)').nextElementSibling!.textContent).toBe(bags.toFixed(1));
    expect(screen.getByText('Sand (cu m)').nextElementSibling!.textContent).toBe(sand.toFixed(2));
    expect(screen.getByText('Aggregate (cu m)').nextElementSibling!.textContent).toBe(aggregate.toFixed(2));
  });

  it('recomputes when area changes', () => {
    const { container } = renderCalculatorPage(<CementCalculator />, page);
    const inputs = container.querySelectorAll('input[type="number"]');
    fireEvent.change(inputs[0], { target: { value: '200' } });
    const dryVolume = 200 * 0.15 * 1.54;
    const bags = (dryVolume / 7) / 0.035;
    expect(screen.getByText('Cement (bags)').nextElementSibling!.textContent).toBe(bags.toFixed(1));
  });
});

describe('AttorneyFeeCalculator', () => {
  const page: CalculatorPage = {
    title: 'Attorney Fee Calculator',
    description: 'Estimate attorney fees for hourly, flat and contingency billing.',
    path: '/attorney-fee-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<AttorneyFeeCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Attorney Fee Calculator' })).toBeDefined();
    expect(screen.getByText('Retainer ($)')).toBeDefined();
    expect(screen.getByText('Total attorney fee')).toBeDefined();
  });

  it('adds hourly fees to the retainer', () => {
    const { container } = renderCalculatorPage(<AttorneyFeeCalculator />, page);
    const result = computeAttorneyFee({
      retainer: 5000, hourlyRate: 350, hours: 20, flatFee: 8000,
      settlement: 100000, contingencyPct: 33, feeStructure: 'hourly',
    });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(result.total));
    expect(screen.getByText('Effective cost per hour').nextElementSibling!.textContent).toBe(money(result.effectivePerHour));
  });

  it('uses the flat fee when selected', () => {
    const { container } = renderCalculatorPage(<AttorneyFeeCalculator />, page);
    fireEvent.click(screen.getByRole('radio', { name: 'Flat fee' }));
    const result = computeAttorneyFee({
      retainer: 5000, hourlyRate: 350, hours: 20, flatFee: 8000,
      settlement: 100000, contingencyPct: 33, feeStructure: 'flat',
    });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(result.total));
  });
});

describe('BusinessInsuranceCalculator', () => {
  const page: CalculatorPage = {
    title: 'Business Insurance Calculator',
    description: 'Estimate annual business insurance premiums from revenue and cover.',
    path: '/business-insurance-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<BusinessInsuranceCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Business Insurance Calculator' })).toBeDefined();
    expect(screen.getByText('Annual revenue ($)')).toBeDefined();
    expect(screen.getByText('Annual premium')).toBeDefined();
  });

  it('prices revenue and coverage with the risk factor', () => {
    const { container } = renderCalculatorPage(<BusinessInsuranceCalculator />, page);
    const result = computeBusinessInsurance({ revenue: 500000, coverage: 1000000, riskFactor: 1 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(result.premium));
    expect(screen.getByText('Monthly premium').nextElementSibling!.textContent).toBe(money(result.monthly));
  });

  it('raises the premium for high risk', () => {
    const { container } = renderCalculatorPage(<BusinessInsuranceCalculator />, page);
    fireEvent.click(screen.getByRole('radio', { name: 'High' }));
    const result = computeBusinessInsurance({ revenue: 500000, coverage: 1000000, riskFactor: 1.6 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(result.premium));
  });
});

describe('LifeInsuranceCalculator', () => {
  const page: CalculatorPage = {
    title: 'Life Insurance Calculator',
    description: 'Estimate life cover needed from income, debts and education costs.',
    path: '/life-insurance-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<LifeInsuranceCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Life Insurance Calculator' })).toBeDefined();
    expect(screen.getByText('Annual income ($)')).toBeDefined();
    expect(screen.getByText('Coverage needed')).toBeDefined();
  });

  it('nets savings against income replacement and debts', () => {
    const { container } = renderCalculatorPage(<LifeInsuranceCalculator />, page);
    const result = computeLifeInsurance({
      annualIncome: 75000, yearsToReplace: 10, debts: 50000,
      educationFund: 60000, existingSavings: 80000,
    });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(result.need));
    expect(screen.getByText('Income replacement total').nextElementSibling!.textContent).toBe(money(result.incomeReplacement));
  });

  it('recomputes when the income years change', () => {
    const { container } = renderCalculatorPage(<LifeInsuranceCalculator />, page);
    fireEvent.change(screen.getByLabelText('Years to replace income'), { target: { value: '20' } });
    const result = computeLifeInsurance({
      annualIncome: 75000, yearsToReplace: 20, debts: 50000,
      educationFund: 60000, existingSavings: 80000,
    });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(result.need));
  });
});

describe('TireSizeCalculator', () => {
  const page: CalculatorPage = {
    title: 'Tire Size Calculator',
    description: 'Convert tire codes to overall diameter, circumference and revs per km.',
    path: '/tire-size-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<TireSizeCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Tire Size Calculator' })).toBeDefined();
    expect(screen.getByText('Tire width (mm)')).toBeDefined();
    expect(screen.getByText('Overall diameter')).toBeDefined();
  });

  it('builds the diameter from rim and sidewalls', () => {
    const { container } = renderCalculatorPage(<TireSizeCalculator />, page);
    const result = computeTireSize({ widthMm: 205, aspectRatio: 55, rimDiameterIn: 16 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(result.diameterIn)} in`);
    expect(screen.getByText('Sidewall height (mm)').nextElementSibling!.textContent).toBe(num(result.sidewallMm));
  });

  it('recomputes when the rim diameter changes', () => {
    const { container } = renderCalculatorPage(<TireSizeCalculator />, page);
    fireEvent.change(screen.getByLabelText('Rim diameter (in)'), { target: { value: '17' } });
    const result = computeTireSize({ widthMm: 205, aspectRatio: 55, rimDiameterIn: 17 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(result.diameterIn)} in`);
  });
});

describe('CarBuyingCalculator', () => {
  const page: CalculatorPage = {
    title: 'Car Buying Calculator',
    description: 'Total car cost with tax, fees, trade-in and monthly payments.',
    path: '/car-buying-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<CarBuyingCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Car Buying Calculator' })).toBeDefined();
    expect(screen.getByText('Car price ($)')).toBeDefined();
    expect(screen.getByText('Monthly payment')).toBeDefined();
  });

  it('amortises the financed amount over the term', () => {
    const { container } = renderCalculatorPage(<CarBuyingCalculator />, page);
    const result = computeCarBuying({
      carPrice: 30000, downPayment: 5000, tradeIn: 4000, salesTaxPct: 7,
      registrationFee: 300, interestRatePct: 6.5, termYears: 5,
    });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(result.monthly));
    expect(screen.getByText('Amount financed').nextElementSibling!.textContent).toBe(money(result.financed));
    expect(screen.getByText('Total interest').nextElementSibling!.textContent).toBe(money(result.totalInterest));
  });

  it('recomputes when the car price changes', () => {
    const { container } = renderCalculatorPage(<CarBuyingCalculator />, page);
    fireEvent.change(screen.getByLabelText('Car price ($)'), { target: { value: '35000' } });
    const result = computeCarBuying({
      carPrice: 35000, downPayment: 5000, tradeIn: 4000, salesTaxPct: 7,
      registrationFee: 300, interestRatePct: 6.5, termYears: 5,
    });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(result.monthly));
  });
});

describe('UnicodeCalculator', () => {
  const page: CalculatorPage = {
    title: 'Unicode Calculator',
    description: 'Count Unicode code points, UTF-8 bytes and inspect code points.',
    path: '/unicode-calculator.html',
    category: 'programming',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<UnicodeCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Unicode Calculator' })).toBeDefined();
    expect(screen.getByText('Text to inspect')).toBeDefined();
    expect(screen.getByText('Code points')).toBeDefined();
  });

  it('counts code points and reports their hex values', () => {
    const { container } = renderCalculatorPage(<UnicodeCalculator />, page);
    const result = computeUnicode({ text: 'Hello!' });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(String(result.count));
    expect(screen.getByText('First code point').nextElementSibling!.textContent).toBe(result.firstCodePoint);
    expect(screen.getByText('Last code point').nextElementSibling!.textContent).toBe(result.lastCodePoint);
    expect(screen.getByText('UTF-8 bytes').nextElementSibling!.textContent).toBe(String(result.utf8Bytes));
  });

  it('recomputes when the text changes', () => {
    const { container } = renderCalculatorPage(<UnicodeCalculator />, page);
    fireEvent.change(screen.getByLabelText('Text to inspect'), { target: { value: 'A✓' } });
    const result = computeUnicode({ text: 'A✓' });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(String(result.count));
  });
});

describe('DataTransferCalculator', () => {
  const page: CalculatorPage = {
    title: 'Data Transfer Calculator',
    description: 'Estimate file transfer time from size and network speed.',
    path: '/data-transfer-calculator.html',
    category: 'programming',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<DataTransferCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Data Transfer Calculator' })).toBeDefined();
    expect(screen.getByText('File size (GB)')).toBeDefined();
    expect(screen.getByText('Transfer time')).toBeDefined();
  });

  it('divides gigabits by the line rate', () => {
    const { container } = renderCalculatorPage(<DataTransferCalculator />, page);
    const result = computeDataTransfer({ sizeGb: 5, speedMbps: 100 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(result.seconds)} s`);
    expect(screen.getByText('Formatted duration').nextElementSibling!.textContent).toBe(result.formatted);
  });

  it('recomputes when the speed changes', () => {
    const { container } = renderCalculatorPage(<DataTransferCalculator />, page);
    fireEvent.change(screen.getByLabelText('Transfer speed (Mbps)'), { target: { value: '200' } });
    const result = computeDataTransfer({ sizeGb: 5, speedMbps: 200 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(result.seconds)} s`);
  });
});

describe('PackingListCalculator', () => {
  const page: CalculatorPage = {
    title: 'Packing List Calculator',
    description: 'Plan packing totals for people, days and items per day.',
    path: '/packing-list-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<PackingListCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Packing List Calculator' })).toBeDefined();
    expect(screen.getByText('Number of people')).toBeDefined();
    expect(screen.getByText('Total items to pack')).toBeDefined();
  });

  it('multiplies people, days and daily items', () => {
    const { container } = renderCalculatorPage(<PackingListCalculator />, page);
    const result = computePackingList({ people: 2, days: 7, itemsPerPersonPerDay: 3 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(String(result.totalItems));
    expect(screen.getByText('Estimated bag weight (kg)').nextElementSibling!.textContent).toBe(num(result.weightKg));
  });

  it('recomputes when the trip lengthens', () => {
    const { container } = renderCalculatorPage(<PackingListCalculator />, page);
    fireEvent.change(screen.getByLabelText('Days of travel'), { target: { value: '14' } });
    const result = computePackingList({ people: 2, days: 14, itemsPerPersonPerDay: 3 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(String(result.totalItems));
  });
});

describe('FuelCostCalculator', () => {
  const page: CalculatorPage = {
    title: 'Fuel Cost Calculator',
    description: 'Compute trip fuel cost from distance, efficiency and fuel price.',
    path: '/fuel-cost-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<FuelCostCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Fuel Cost Calculator' })).toBeDefined();
    expect(screen.getByText('Distance (km)')).toBeDefined();
    expect(screen.getByText('Total fuel cost')).toBeDefined();
  });

  it('multiplies litres needed by the pump price', () => {
    const { container } = renderCalculatorPage(<FuelCostCalculator />, page);
    const result = computeFuelCost({ distanceKm: 450, efficiencyKmPerL: 15, pricePerL: 1.8 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(result.cost));
    expect(screen.getByText('Fuel needed (L)').nextElementSibling!.textContent).toBe(num(result.fuelNeeded));
  });

  it('recomputes when the fuel price changes', () => {
    const { container } = renderCalculatorPage(<FuelCostCalculator />, page);
    fireEvent.change(screen.getByLabelText('Fuel price ($/L)'), { target: { value: '2' } });
    const result = computeFuelCost({ distanceKm: 450, efficiencyKmPerL: 15, pricePerL: 2 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(result.cost));
  });
});

describe('CharacterCountCalculator', () => {
  const page: CalculatorPage = {
    title: 'Character Count Calculator',
    description: 'Count characters, words, sentences and reading time for text.',
    path: '/character-count-calculator.html',
    category: 'programming',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<CharacterCountCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Character Count Calculator' })).toBeDefined();
    expect(screen.getByText('Text to analyse')).toBeDefined();
    expect(screen.getByText('Characters')).toBeDefined();
  });

  it('counts characters, words and sentences', () => {
    const { container } = renderCalculatorPage(<CharacterCountCalculator />, page);
    const result = computeCharacterCount({ text: 'The quick brown fox' });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(String(result.characters));
    expect(screen.getByText('Words').nextElementSibling!.textContent).toBe(String(result.words));
    expect(screen.getByText('Sentences').nextElementSibling!.textContent).toBe(String(result.sentences));
    expect(screen.getByText('Reading time (seconds)').nextElementSibling!.textContent).toBe(String(result.readingSeconds));
  });

  it('recomputes when the text changes', () => {
    const { container } = renderCalculatorPage(<CharacterCountCalculator />, page);
    fireEvent.change(screen.getByLabelText('Text to analyse'), { target: { value: 'Hello world' } });
    const result = computeCharacterCount({ text: 'Hello world' });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(String(result.characters));
  });
});

describe('PercentileRankCalculator', () => {
  const page: CalculatorPage = {
    title: 'Percentile Rank Calculator',
    description: 'Convert a score into its percentile rank within a group.',
    path: '/percentile-rank-calculator.html',
    category: 'math',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<PercentileRankCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Percentile Rank Calculator' })).toBeDefined();
    expect(screen.getByText('Your score')).toBeDefined();
    expect(screen.getByText('Percentile rank')).toBeDefined();
  });

  it('divides scores below by the total', () => {
    const { container } = renderCalculatorPage(<PercentileRankCalculator />, page);
    const result = computePercentileRank({ yourScore: 85, scoresBelow: 68, totalScores: 80 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(num(result.percentile));
    expect(screen.getByText('Rank from top').nextElementSibling!.textContent).toBe(String(result.rankFromTop));
  });

  it('recomputes when scores below change', () => {
    const { container } = renderCalculatorPage(<PercentileRankCalculator />, page);
    fireEvent.change(screen.getByLabelText('Scores below yours'), { target: { value: '40' } });
    const result = computePercentileRank({ yourScore: 85, scoresBelow: 40, totalScores: 80 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(num(result.percentile));
  });
});

describe('WeightedGpaCalculator', () => {
  const page: CalculatorPage = {
    title: 'Weighted GPA Calculator',
    description: 'Compute credit-weighted GPA across three courses on a 4.0 scale.',
    path: '/weighted-gpa-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<WeightedGpaCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Weighted GPA Calculator' })).toBeDefined();
    expect(screen.getByText('Course 1 credits')).toBeDefined();
    expect(screen.getByText('Weighted GPA')).toBeDefined();
  });

  it('weights grade points by credits', () => {
    const { container } = renderCalculatorPage(<WeightedGpaCalculator />, page);
    const result = computeWeightedGpa({
      credits: [4, 3, 3],
      gradePoints: [4.0, 3.3, 3.7],
    });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(num(result.gpa));
    expect(screen.getByText('Total grade points').nextElementSibling!.textContent).toBe(num(result.totalPoints));
    expect(screen.getByText('Letter equivalent').nextElementSibling!.textContent).toBe(result.letter);
  });

  it('recomputes when a grade changes', () => {
    const { container } = renderCalculatorPage(<WeightedGpaCalculator />, page);
    fireEvent.change(screen.getByLabelText('Course 2 grade'), { target: { value: 'A' } });
    const result = computeWeightedGpa({
      credits: [4, 3, 3],
      gradePoints: [4.0, 4.0, 3.7],
    });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(num(result.gpa));
  });
});

describe('DomainAuthorityCalculator', () => {
  const page: CalculatorPage = {
    title: 'Domain Authority Calculator',
    description: 'Estimate domain authority from referring domains, links and age.',
    path: '/domain-authority-calculator.html',
    category: 'programming',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<DomainAuthorityCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Domain Authority Calculator' })).toBeDefined();
    expect(screen.getByText('Referring domains')).toBeDefined();
    expect(screen.getByText('Estimated domain authority')).toBeDefined();
  });

  it('combines link equity with the age bonus', () => {
    const { container } = renderCalculatorPage(<DomainAuthorityCalculator />, page);
    const result = computeDomainAuthority({ referringDomains: 120, backlinks: 800, ageYears: 5 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(String(result.authority));
    expect(screen.getByText('Link equity score').nextElementSibling!.textContent).toBe(num(result.linkEquity));
  });

  it('recomputes when referring domains grow', () => {
    const { container } = renderCalculatorPage(<DomainAuthorityCalculator />, page);
    fireEvent.change(screen.getByLabelText('Referring domains'), { target: { value: '1200' } });
    const result = computeDomainAuthority({ referringDomains: 1200, backlinks: 800, ageYears: 5 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(String(result.authority));
  });
});

describe('CostPerSaleCalculator', () => {
  const page: CalculatorPage = {
    title: 'Cost Per Sale Calculator',
    description: 'Measure cost per sale, profit per sale and return on ad spend.',
    path: '/cost-per-sale-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<CostPerSaleCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Cost Per Sale Calculator' })).toBeDefined();
    expect(screen.getByText('Total campaign cost ($)')).toBeDefined();
    expect(screen.getByText('Cost per sale')).toBeDefined();
  });

  it('divides campaign cost by sales', () => {
    const { container } = renderCalculatorPage(<CostPerSaleCalculator />, page);
    const result = computeCostPerSale({ campaignCost: 12000, sales: 150, revenuePerSale: 200 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(result.cps));
    expect(screen.getByText('Return on ad spend').nextElementSibling!.textContent).toBe(`${num(result.roas)}%`);
  });

  it('recomputes when sales change', () => {
    const { container } = renderCalculatorPage(<CostPerSaleCalculator />, page);
    fireEvent.change(screen.getByLabelText('Sales generated'), { target: { value: '100' } });
    const result = computeCostPerSale({ campaignCost: 12000, sales: 100, revenuePerSale: 200 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(result.cps));
  });
});

describe('OperatingCashFlowCalculator', () => {
  const page: CalculatorPage = {
    title: 'Operating Cash Flow Calculator',
    description: 'Derive operating cash flow from net income and non-cash items.',
    path: '/operating-cash-flow-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<OperatingCashFlowCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Operating Cash Flow Calculator' })).toBeDefined();
    expect(screen.getByText('Net income ($)')).toBeDefined();
    expect(screen.getByText('Operating cash flow')).toBeDefined();
  });

  it('adds depreciation back to net income', () => {
    const { container } = renderCalculatorPage(<OperatingCashFlowCalculator />, page);
    const result = computeOperatingCashFlow({
      netIncome: 120000, depreciation: 15000, workingCapitalIncrease: 8000, currentLiabilities: 90000,
    });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(result.ocf));
    expect(screen.getByText('OCF ratio').nextElementSibling!.textContent).toBe(num(result.ratio));
  });

  it('recomputes when depreciation changes', () => {
    const { container } = renderCalculatorPage(<OperatingCashFlowCalculator />, page);
    fireEvent.change(screen.getByLabelText('Depreciation ($)'), { target: { value: '25000' } });
    const result = computeOperatingCashFlow({
      netIncome: 120000, depreciation: 25000, workingCapitalIncrease: 8000, currentLiabilities: 90000,
    });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(result.ocf));
  });
});

describe('CurrentRatioCalculator', () => {
  const page: CalculatorPage = {
    title: 'Current Ratio Calculator',
    description: 'Assess liquidity with the current ratio and working capital.',
    path: '/current-ratio-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<CurrentRatioCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Current Ratio Calculator' })).toBeDefined();
    expect(screen.getByText('Current assets ($)')).toBeDefined();
    expect(screen.getByText('Current ratio')).toBeDefined();
  });

  it('divides current assets by current liabilities', () => {
    const { container } = renderCalculatorPage(<CurrentRatioCalculator />, page);
    const result = computeCurrentRatio({ currentAssets: 180000, currentLiabilities: 90000 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(num(result.ratio));
    expect(screen.getByText('Working capital').nextElementSibling!.textContent).toBe(money(result.workingCapital));
  });

  it('recomputes when liabilities change', () => {
    const { container } = renderCalculatorPage(<CurrentRatioCalculator />, page);
    fireEvent.change(screen.getByLabelText('Current liabilities ($)'), { target: { value: '120000' } });
    const result = computeCurrentRatio({ currentAssets: 180000, currentLiabilities: 120000 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(num(result.ratio));
  });
});

describe('RoaCalculator', () => {
  const page: CalculatorPage = {
    title: 'ROA Calculator',
    description: 'Calculate return on assets and asset efficiency metrics.',
    path: '/roa-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<RoaCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'ROA Calculator' })).toBeDefined();
    expect(screen.getByText('Net income ($)')).toBeDefined();
    expect(screen.getByText('Return on assets')).toBeDefined();
  });

  it('expresses net income as a share of assets', () => {
    const { container } = renderCalculatorPage(<RoaCalculator />, page);
    const result = computeRoa({ netIncome: 45000, totalAssets: 600000 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(result.roa)}%`);
    expect(screen.getByText('Income per $1,000 of assets').nextElementSibling!.textContent).toBe(money(result.incomePerThousand));
  });

  it('recomputes when net income changes', () => {
    const { container } = renderCalculatorPage(<RoaCalculator />, page);
    fireEvent.change(screen.getByLabelText('Net income ($)'), { target: { value: '60000' } });
    const result = computeRoa({ netIncome: 60000, totalAssets: 600000 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(result.roa)}%`);
  });
});

describe('WallpaperCalculator', () => {
  const page: CalculatorPage = {
    title: 'Wallpaper Calculator',
    description: 'Estimate wallpaper rolls from room perimeter, height and openings.',
    path: '/wallpaper-calculator.html',
    category: 'construction',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<WallpaperCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Wallpaper Calculator' })).toBeDefined();
    expect(screen.getByText('Room perimeter (ft)')).toBeDefined();
    expect(screen.getByText('Rolls needed')).toBeDefined();
  });

  it('nets out openings and adds a waste allowance', () => {
    const { container } = renderCalculatorPage(<WallpaperCalculator />, page);
    const result = computeWallpaper({
      perimeterFt: 48, wallHeightFt: 8, doors: 1, windows: 2, rollCoverageSqFt: 56,
    });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(String(result.rolls));
    expect(screen.getByText('Net wall area (sq ft)').nextElementSibling!.textContent).toBe(num(result.netArea));
  });

  it('recomputes when wall height changes', () => {
    const { container } = renderCalculatorPage(<WallpaperCalculator />, page);
    fireEvent.change(screen.getByLabelText('Wall height (ft)'), { target: { value: '10' } });
    const result = computeWallpaper({
      perimeterFt: 48, wallHeightFt: 10, doors: 1, windows: 2, rollCoverageSqFt: 56,
    });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(String(result.rolls));
  });
});

describe('PropertyValueAppreciationCalculator', () => {
  const page: CalculatorPage = {
    title: 'Property Value Appreciation Calculator',
    description: 'Project property value growth with annual compounding.',
    path: '/property-value-appreciation-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<PropertyValueAppreciationCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Property Value Appreciation Calculator' })).toBeDefined();
    expect(screen.getByText('Current property value ($)')).toBeDefined();
    expect(screen.getByText('Future property value')).toBeDefined();
  });

  it('compounds the annual rate over the holding period', () => {
    const { container } = renderCalculatorPage(<PropertyValueAppreciationCalculator />, page);
    const result = computePropertyValueAppreciation({ currentValue: 400000, annualRate: 5, years: 10 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(result.futureValue));
    expect(screen.getByText('Appreciation gain').nextElementSibling!.textContent).toBe(money(result.gain));
  });

  it('recomputes when the appreciation rate changes', () => {
    const { container } = renderCalculatorPage(<PropertyValueAppreciationCalculator />, page);
    fireEvent.change(screen.getByLabelText('Annual appreciation rate (%)'), { target: { value: '10' } });
    const result = computePropertyValueAppreciation({ currentValue: 400000, annualRate: 10, years: 10 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(result.futureValue));
  });
});

describe('ExtraPaymentMortgageCalculator', () => {
  const page: CalculatorPage = {
    title: 'Extra Payment Mortgage Calculator',
    description: 'See interest saved and time cut by extra mortgage payments.',
    path: '/extra-payment-mortgage-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<ExtraPaymentMortgageCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Extra Payment Mortgage Calculator' })).toBeDefined();
    expect(screen.getByText('Loan amount ($)')).toBeDefined();
    expect(screen.getByText('Interest saved')).toBeDefined();
  });

  it('compares amortisation with and without the extra payment', () => {
    const { container } = renderCalculatorPage(<ExtraPaymentMortgageCalculator />, page);
    const result = computeExtraPaymentMortgage({
      loanAmount: 300000, interestRatePct: 6.5, termYears: 30, extraPayment: 200,
    });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(result.saved));
    expect(screen.getByText('Payoff with extra (months)').nextElementSibling!.textContent).toBe(String(result.payoffMonths));
    expect(screen.getByText('Time saved (months)').nextElementSibling!.textContent).toBe(String(result.timeSaved));
  });

  it('saves more with a bigger extra payment', () => {
    const { container } = renderCalculatorPage(<ExtraPaymentMortgageCalculator />, page);
    fireEvent.change(screen.getByLabelText('Extra monthly payment ($)'), { target: { value: '500' } });
    const result = computeExtraPaymentMortgage({
      loanAmount: 300000, interestRatePct: 6.5, termYears: 30, extraPayment: 500,
    });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(result.saved));
  });
});

describe('ClosingCostCalculator', () => {
  const page: CalculatorPage = {
    title: 'Closing Cost Calculator',
    description: 'Estimate home closing costs, origination and cash to close.',
    path: '/closing-cost-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<ClosingCostCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Closing Cost Calculator' })).toBeDefined();
    expect(screen.getByText('Home price ($)')).toBeDefined();
    expect(screen.getByText('Estimated closing costs')).toBeDefined();
  });

  it('applies the closing rate to the loan amount', () => {
    const { container } = renderCalculatorPage(<ClosingCostCalculator />, page);
    const result = computeClosingCost({ homePrice: 400000, downPayment: 80000, closingRate: 3 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(result.closingCosts));
    expect(screen.getByText('Loan amount').nextElementSibling!.textContent).toBe(money(result.loanAmount));
    expect(screen.getByText('Cash to close').nextElementSibling!.textContent).toBe(money(result.cashToClose));
  });

  it('recomputes when the closing rate changes', () => {
    const { container } = renderCalculatorPage(<ClosingCostCalculator />, page);
    fireEvent.change(screen.getByLabelText('Closing cost rate (%)'), { target: { value: '5' } });
    const result = computeClosingCost({ homePrice: 400000, downPayment: 80000, closingRate: 5 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(result.closingCosts));
  });
});

describe('HolidayCalculator', () => {
  const page: CalculatorPage = {
    title: 'Holiday Calculator',
    description: 'Count days until a holiday and show the weekday of each date.',
    path: '/holiday-calculator.html',
    category: 'dateTime',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<HolidayCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Holiday Calculator' })).toBeDefined();
    expect(screen.getByText('Start date')).toBeDefined();
    expect(screen.getByText('Days until holiday')).toBeDefined();
  });

  it('counts the days between the two dates', () => {
    const { container } = renderCalculatorPage(<HolidayCalculator />, page);
    const result = computeHoliday({ startDate: '2026-10-09', holidayDate: '2026-12-25' });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(String(result.days));
    expect(screen.getByText('Holiday day of week').nextElementSibling!.textContent).toBe(result.holidayDay);
    expect(screen.getByText('Start day of week').nextElementSibling!.textContent).toBe(result.startDay);
  });

  it('recomputes when the holiday date changes', () => {
    const { container } = renderCalculatorPage(<HolidayCalculator />, page);
    fireEvent.change(screen.getByLabelText('Holiday date'), { target: { value: '2027-01-01' } });
    const result = computeHoliday({ startDate: '2026-10-09', holidayDate: '2027-01-01' });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(String(result.days));
  });
});

describe('FutureDateCalculator', () => {
  const page: CalculatorPage = {
    title: 'Future Date Calculator',
    description: 'Add days to a date and find the resulting weekday.',
    path: '/future-date-calculator.html',
    category: 'dateTime',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<FutureDateCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Future Date Calculator' })).toBeDefined();
    expect(screen.getByText('Start date')).toBeDefined();
    expect(screen.getByText('Future date')).toBeDefined();
  });

  it('adds days to the start date', () => {
    const { container } = renderCalculatorPage(<FutureDateCalculator />, page);
    const result = computeFutureDate({ startDate: '2026-10-09', daysToAdd: 45 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(result.futureDate);
    expect(screen.getByText('Day of week').nextElementSibling!.textContent).toBe(result.dayOfWeek);
    expect(screen.getByText('Days remaining in year').nextElementSibling!.textContent).toBe(String(result.daysRemainingInYear));
  });

  it('recomputes when the day count changes', () => {
    const { container } = renderCalculatorPage(<FutureDateCalculator />, page);
    fireEvent.change(screen.getByLabelText('Days to add'), { target: { value: '90' } });
    const result = computeFutureDate({ startDate: '2026-10-09', daysToAdd: 90 });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(result.futureDate);
  });
});

describe('TimeDurationCalculator', () => {
  const page: CalculatorPage = {
    title: 'Time Duration Calculator',
    description: 'Find the duration between two clock times in hours and minutes.',
    path: '/time-duration-calculator.html',
    category: 'dateTime',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<TimeDurationCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Time Duration Calculator' })).toBeDefined();
    expect(screen.getByText('Start Time')).toBeDefined();
    expect(screen.getByText('Duration')).toBeDefined();
  });

  it('subtracts the start time from the end time', () => {
    renderCalculatorPage(<TimeDurationCalculator />, page);
    expect(screen.getByText('Duration').nextElementSibling!.textContent).toBe('4h 15m');
  });

  it('recomputes when the end minutes change', () => {
    const { container } = renderCalculatorPage(<TimeDurationCalculator />, page);
    const inputs = container.querySelectorAll('input[type="number"]');
    fireEvent.change(inputs[3], { target: { value: '15' } });
    expect(screen.getByText('Duration').nextElementSibling!.textContent).toBe('3h 45m');
  });
});

describe('RFSignalCalculator', () => {
  const page: CalculatorPage = {
    title: 'RF Signal Calculator',
    description: 'Build a link budget from transmit power, gains, losses and receiver sensitivity.',
    path: '/rf-signal-calculator.html',
    category: 'scientific',
  };

  it('renders through CalculatorPageLayout with link budget inputs', () => {
    renderCalculatorPage(<RFSignalCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'RF Signal Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Transmit power (dBm)')).toBeDefined();
    expect(screen.getByLabelText('Path loss (dB)')).toBeDefined();
    expect(screen.getByText('Received power')).toBeDefined();
  });

  it('adds the link budget in dB for the default inputs', () => {
    const { container } = renderCalculatorPage(<RFSignalCalculator />, page);
    const result = computeRFSignal({
      txPowerDbm: 30,
      txGain: 8,
      cableLoss: 3,
      pathLoss: 100,
      rxGain: 2,
      rxLoss: 1,
      sensitivityDbm: -85,
      noiseFloorDbm: -100,
    });
    expect(result.eirp).toBe(35);
    expect(result.received).toBe(-64);
    expect(result.margin).toBe(21);
    expect(result.snr).toBe(36);
    expect(result.linkOk).toBe(true);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(result.received)} dBm`);
    expect(screen.getByText('EIRP (dBm)').nextElementSibling!.textContent).toBe(num(result.eirp));
    expect(screen.getByText('Link margin (dB)').nextElementSibling!.textContent).toBe(num(result.margin));
  });

  it('recomputes when the path loss changes', () => {
    const { container } = renderCalculatorPage(<RFSignalCalculator />, page);
    fireEvent.change(screen.getByLabelText('Path loss (dB)'), { target: { value: '130' } });
    const result = computeRFSignal({
      txPowerDbm: 30,
      txGain: 8,
      cableLoss: 3,
      pathLoss: 130,
      rxGain: 2,
      rxLoss: 1,
      sensitivityDbm: -85,
      noiseFloorDbm: -100,
    });
    expect(result.received).toBe(-94);
    expect(result.linkOk).toBe(false);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(result.received)} dBm`);
    expect(screen.getByText('Link does not close')).toBeDefined();
  });

  it('never renders NaN for invalid transmit power', () => {
    const { container } = renderCalculatorPage(<RFSignalCalculator />, page);
    fireEvent.change(screen.getByLabelText('Transmit power (dBm)'), { target: { value: 'abc' } });
    expect(container.querySelector('p.text-4xl')!.textContent).not.toContain('NaN');
    const result = computeRFSignal({
      txPowerDbm: 0,
      txGain: 8,
      cableLoss: 3,
      pathLoss: 100,
      rxGain: 2,
      rxLoss: 1,
      sensitivityDbm: -85,
      noiseFloorDbm: -100,
    });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(result.received)} dBm`);
  });
});

