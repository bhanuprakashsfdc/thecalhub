import type { ReactElement } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CalculatorPageLayout } from '../CalculatorPageLayout';
import { I18nProvider } from '../../lib/i18n';
import TabletDosageCalculator from './TabletDosageCalculator';
import HeartAgeCalculator from './HeartAgeCalculator';
import BloodPressureCalculator from './BloodPressureCalculator';
import CholesterolRatioCalculator from './CholesterolRatioCalculator';
import LiverFunctionCalculator from './LiverFunctionCalculator';
import KidneyFunctionCalculator from './KidneyFunctionCalculator';
import GFRCalculator from './GFRCalculator';
import CreatinineClearanceCalculator from './CreatinineClearanceCalculator';
import BodySurfaceAreaMedicalCalculator from './BodySurfaceAreaMedicalCalculator';
import IVDripRateCalculator from './IVDripRateCalculator';
import IVFlowRateCalculator from './IVFlowRateCalculator';
import DosageCalculator from './DosageCalculator';
import EWasteCalculator from './EWasteCalculator';
import PollutionCalculator from './PollutionCalculator';
import AirQualityCalculator from './AirQualityCalculator';
import CompostingCalculator from './CompostingCalculator';
import RecyclingCalculator from './RecyclingCalculator';
import WaterUsageCalculator from './WaterUsageCalculator';
import EnergyEfficiencyCalculator from './EnergyEfficiencyCalculator';
import Co2EmissionsCalculator from './Co2EmissionsCalculator';
import CarbonFootprintCalculator from './CarbonFootprintCalculator';
import ChemicalPotentialCalculator from './ChemicalPotentialCalculator';
import GibbsFreeEnergyCalculator from './GibbsFreeEnergyCalculator';
import EntropyChemicalCalculator from './EntropyChemicalCalculator';
import EnthalpyCalculator from './EnthalpyCalculator';
import HeatOfCombustionCalculator from './HeatOfCombustionCalculator';
import HeatOfFormationCalculator from './HeatOfFormationCalculator';
import HeatOfReactionCalculator from './HeatOfReactionCalculator';
import ActivationEnergyCalculator from './ActivationEnergyCalculator';
import EquilibriumConstantCalculator from './EquilibriumConstantCalculator';
import ReactionRateCalculator from './ReactionRateCalculator';
import StormWaterCalculator from './StormWaterCalculator';
import CulvertDesignCalculator from './CulvertDesignCalculator';
import PavementDesignCalculator from './PavementDesignCalculator';
import IntersectionDesignCalculator from './IntersectionDesignCalculator';
import TurningRadiusCalculator from './TurningRadiusCalculator';
import StoppingDistanceCalculator from './StoppingDistanceCalculator';
import SightDistanceCalculator from './SightDistanceCalculator';
import SuperelevationCalculator from './SuperelevationCalculator';
import CurveRadiusCalculator from './CurveRadiusCalculator';
import RoadGradeCalculator from './RoadGradeCalculator';
import EntropyCalculator from './EntropyCalculator';
import HeatCapacityCalculator from './HeatCapacityCalculator';
import ThermalConductivityCalculator from './ThermalConductivityCalculator';
import HeatTransferCalculator from './HeatTransferCalculator';
import ThermalExpansionCalculator from './ThermalExpansionCalculator';
import BulkModulusCalculator from './BulkModulusCalculator';
import ShearModulusCalculator from './ShearModulusCalculator';
import PoissonsRatioCalculator from './PoissonsRatioCalculator';
import YoungsModulusCalculator from './YoungsModulusCalculator';
import StressStrainCalculator from './StressStrainCalculator';
import KirchhoffLawCalculator from './KirchhoffLawCalculator';
import WheatstoneBridgeCalculator from './WheatstoneBridgeCalculator';
import VoltageDividerCalculator from './VoltageDividerCalculator';
import CurrentDividerCalculator from './CurrentDividerCalculator';
import VoltageDropCalculator from './VoltageDropCalculator';
import PowerElectricalCalculator from './PowerElectricalCalculator';
import OhmsLawCalculator from './OhmsLawCalculator';
import ElectricalInductanceCalculator from './ElectricalInductanceCalculator';
import ElectricalCapacitanceCalculator from './ElectricalCapacitanceCalculator';
import ElectricalResistanceCalculator from './ElectricalResistanceCalculator';

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

const money = (n: number) =>
  n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const int = (n: number) =>
  n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

const hero = (container: HTMLElement) => container.querySelector('p.text-4xl')!.textContent;

describe('TabletDosageCalculator', () => {
  const page: CalculatorPage = {
    title: 'Tablet Dosage Calculator',
    description: 'Work out total tablets and doses from patient weight, dose per kg and tablet strength.',
    path: '/tablet-dosage-calculator.html',
    category: 'health',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<TabletDosageCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Tablet Dosage Calculator' })).toBeDefined();
    expect(screen.getByText('Patient weight (kg)')).toBeDefined();
    expect(screen.getByText('Total tablets needed')).toBeDefined();
  });

  it('multiplies dose per kg across the full course', () => {
    const { container } = renderCalculatorPage(<TabletDosageCalculator />, page);
    const perDose = 70 * 10;
    const tabletsPerDose = perDose / 500;
    const daily = tabletsPerDose * 3;
    const total = daily * 7;
    expect(hero(container)).toBe(money(total));
    expect(screen.getByText('Tablets per dose').nextElementSibling!.textContent).toBe(money(tabletsPerDose));
    expect(screen.getByText('Total drug (g)').nextElementSibling!.textContent).toBe(
      money((perDose * 3 * 7) / 1000)
    );
  });

  it('shortens the course when days change', () => {
    const { container } = renderCalculatorPage(<TabletDosageCalculator />, page);
    fireEvent.change(screen.getByLabelText('Days of treatment'), { target: { value: '5' } });
    const perDose = 70 * 10;
    const total = (perDose / 500) * 3 * 5;
    expect(hero(container)).toBe(money(total));
    expect(screen.getByText('Tablets per day').nextElementSibling!.textContent).toBe(money((perDose / 500) * 3));
  });
});

describe('HeartAgeCalculator', () => {
  const page: CalculatorPage = {
    title: 'Heart Age Calculator',
    description: 'Compare your real age with an estimated heart age from blood pressure, cholesterol and lifestyle.',
    path: '/heart-age-calculator.html',
    category: 'health',
  };

  const riskPoints = (hr: number, sys: number, chol: number, hdl: number) =>
    Math.max(0, (hr - 60) * 0.15) +
    Math.max(0, (sys - 115) * 0.08) +
    Math.max(0, (chol - 180) * 0.05) +
    Math.max(0, (50 - hdl) * 0.12);

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<HeartAgeCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Heart Age Calculator' })).toBeDefined();
    expect(screen.getByText('Resting heart rate')).toBeDefined();
    expect(screen.getByText('Estimated heart age')).toBeDefined();
  });

  it('adds risk penalties onto the chronological age', () => {
    const { container } = renderCalculatorPage(<HeartAgeCalculator />, page);
    const points = riskPoints(75, 130, 210, 45);
    const heartAge = 45 + points;
    expect(hero(container)).toBe(`${money(heartAge)} yrs`);
    expect(screen.getByText('Risk points').nextElementSibling!.textContent).toBe(money(points));
    expect(screen.getByText('Chronological age').nextElementSibling!.textContent).toBe(money(45) + ' yrs');
  });

  it('lowers heart age when resting heart rate drops', () => {
    const { container } = renderCalculatorPage(<HeartAgeCalculator />, page);
    fireEvent.change(screen.getByLabelText('Resting heart rate'), { target: { value: '60' } });
    const points = riskPoints(60, 130, 210, 45);
    expect(hero(container)).toBe(`${money(45 + points)} yrs`);
    expect(screen.getByText('Resting HR penalty').nextElementSibling!.textContent).toBe(money(0));
  });
});

describe('BloodPressureCalculator', () => {
  const page: CalculatorPage = {
    title: 'Blood Pressure Calculator',
    description: 'Classify a blood pressure reading and calculate pulse pressure, mean arterial pressure and stage.',
    path: '/blood-pressure-calculator.html',
    category: 'health',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<BloodPressureCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Blood Pressure Calculator' })).toBeDefined();
    expect(screen.getByText('Systolic (mmHg)')).toBeDefined();
    expect(screen.getByText('Mean arterial pressure')).toBeDefined();
  });

  it('computes mean arterial pressure as diastolic plus a third of pulse pressure', () => {
    const { container } = renderCalculatorPage(<BloodPressureCalculator />, page);
    const pulsePressure = 120 - 80;
    const map = 80 + pulsePressure / 3;
    expect(hero(container)).toBe(`${money(map)} mmHg`);
    expect(screen.getByText('Pulse pressure').nextElementSibling!.textContent).toBe(
      money(pulsePressure) + ' mmHg'
    );
    expect(screen.getByText('Rate pressure product').nextElementSibling!.textContent).toBe(money(120 * 70));
    expect(screen.getByText('Diastolic share of MAP (%)').nextElementSibling!.textContent).toBe(
      money((80 / map) * 100)
    );
  });

  it('raises MAP when systolic pressure rises', () => {
    const { container } = renderCalculatorPage(<BloodPressureCalculator />, page);
    fireEvent.change(screen.getByLabelText('Systolic (mmHg)'), { target: { value: '140' } });
    const map = 80 + (140 - 80) / 3;
    expect(hero(container)).toBe(`${money(map)} mmHg`);
    expect(screen.getByText('Hypertension stage (0-4)').nextElementSibling!.textContent).toBe(money(3));
    expect(screen.getByText('Stage 2 hypertension')).toBeDefined();
  });
});

describe('CholesterolRatioCalculator', () => {
  const page: CalculatorPage = {
    title: 'Cholesterol Ratio Calculator',
    description: 'Calculate total, LDL and triglyceride ratios to judge cardiovascular cholesterol risk.',
    path: '/cholesterol-ratio-calculator.html',
    category: 'health',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<CholesterolRatioCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Cholesterol Ratio Calculator' })).toBeDefined();
    expect(screen.getByText('HDL (mg/dL)')).toBeDefined();
    expect(screen.getByText('Total / HDL ratio')).toBeDefined();
  });

  it('divides total cholesterol by HDL', () => {
    renderCalculatorPage(<CholesterolRatioCalculator />, page);
    expect(screen.getByText('Total / HDL ratio').nextElementSibling!.textContent).toBe(money(200 / 50));
    expect(screen.getByText('Non-HDL cholesterol').nextElementSibling!.textContent).toBe(
      money(200 - 50) + ' mg/dL'
    );
    expect(screen.getByText('LDL / HDL ratio').nextElementSibling!.textContent).toBe(money(120 / 50));
    expect(screen.getByText('Triglycerides / HDL ratio').nextElementSibling!.textContent).toBe(
      money(150 / 50)
    );
  });

  it('drops the ratio when HDL improves', () => {
    renderCalculatorPage(<CholesterolRatioCalculator />, page);
    fireEvent.change(screen.getByLabelText('HDL (mg/dL)'), { target: { value: '60' } });
    expect(screen.getByText('Total / HDL ratio').nextElementSibling!.textContent).toBe(money(200 / 60));
    expect(screen.getByText('LDL / HDL ratio').nextElementSibling!.textContent).toBe(money(120 / 60));
  });
});

describe('LiverFunctionCalculator', () => {
  const page: CalculatorPage = {
    title: 'Liver Function Calculator',
    description: 'Score liver health from AST, ALT, albumin and bilirubin blood test results.',
    path: '/liver-function-calculator.html',
    category: 'health',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<LiverFunctionCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Liver Function Calculator' })).toBeDefined();
    expect(screen.getByText('AST (U/L)')).toBeDefined();
    expect(screen.getByText('Liver health score')).toBeDefined();
  });

  it('scores healthy markers at 100 and reports the De Ritis ratio', () => {
    const { container } = renderCalculatorPage(<LiverFunctionCalculator />, page);
    const score = 100 - 0 * 0.5 - 0 * 0.5 - 0 * 25 - 0 * 15;
    expect(hero(container)).toBe(money(score));
    expect(screen.getByText('De Ritis ratio (AST/ALT)').nextElementSibling!.textContent).toBe(
      money(30 / 35)
    );
  });

  it('drops the score when AST becomes elevated', () => {
    const { container } = renderCalculatorPage(<LiverFunctionCalculator />, page);
    fireEvent.change(screen.getByLabelText('AST (U/L)'), { target: { value: '100' } });
    const astElev = Math.max(0, 100 - 40);
    const score = 100 - astElev * 0.5 - 0 * 0.5 - 0 * 25 - 0 * 15;
    expect(hero(container)).toBe(money(score));
    expect(screen.getByText('Elevated enzymes (U/L)').nextElementSibling!.textContent).toBe(
      money(astElev)
    );
    expect(screen.getByText('De Ritis ratio (AST/ALT)').nextElementSibling!.textContent).toBe(
      money(100 / 35)
    );
  });
});

describe('KidneyFunctionCalculator', () => {
  const page: CalculatorPage = {
    title: 'Kidney Function Calculator',
    description: 'Estimate kidney function with the MDRD equation from creatinine, age, sex and body surface area.',
    path: '/kidney-function-calculator.html',
    category: 'health',
  };

  const mdrd = (scr: number, age: number, female: boolean) =>
    175 * Math.pow(scr, -1.154) * Math.pow(age, -0.203) * (female ? 0.742 : 1);

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<KidneyFunctionCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Kidney Function Calculator' })).toBeDefined();
    expect(screen.getByText('Serum creatinine (mg/dL)')).toBeDefined();
    expect(screen.getByText('Estimated GFR')).toBeDefined();
  });

  it('applies the MDRD creatinine and age exponents', () => {
    const { container } = renderCalculatorPage(<KidneyFunctionCalculator />, page);
    const indexed = mdrd(1, 50, false);
    expect(hero(container)).toBe(`${money(indexed)} mL/min`);
    expect(screen.getByText('Absolute GFR (mL/min)').nextElementSibling!.textContent).toBe(
      money(indexed * (1.73 / 1.73))
    );
    expect(screen.getByText('CKD stage (1-5)').nextElementSibling!.textContent).toBe(money(2));
  });

  it('falls when creatinine doubles', () => {
    const { container } = renderCalculatorPage(<KidneyFunctionCalculator />, page);
    fireEvent.change(screen.getByLabelText('Serum creatinine (mg/dL)'), { target: { value: '2' } });
    const indexed = mdrd(2, 50, false);
    expect(hero(container)).toBe(`${money(indexed)} mL/min`);
    expect(screen.getByText('CKD stage (1-5)').nextElementSibling!.textContent).toBe(money(4));
  });
});

describe('GFRCalculator', () => {
  const page: CalculatorPage = {
    title: 'GFR Calculator',
    description: 'Calculate glomerular filtration rate with the race-free CKD-EPI equation from serum creatinine.',
    path: '/gfr-calculator.html',
    category: 'health',
  };

  const ckdepi = (scr: number, age: number, female: boolean) => {
    const kappa = female ? 0.7 : 0.9;
    const alpha = female ? -0.241 : -0.302;
    const ratio = scr / kappa;
    return (
      142 *
      Math.pow(Math.min(ratio, 1), alpha) *
      Math.pow(Math.max(ratio, 1), -1.2) *
      Math.pow(0.9938, age) *
      (female ? 1.012 : 1)
    );
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<GFRCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'GFR Calculator' })).toBeDefined();
    expect(screen.getByText('Age')).toBeDefined();
    expect(screen.getByText('eGFR (CKD-EPI)')).toBeDefined();
  });

  it('follows the CKD-EPI 2021 equation for a male patient', () => {
    const { container } = renderCalculatorPage(<GFRCalculator />, page);
    const gfr = ckdepi(1, 50, false);
    expect(hero(container)).toBe(`${money(gfr)} mL/min`);
    expect(screen.getByText('Age factor (0.9938^age)').nextElementSibling!.textContent).toBe(
      money(Math.pow(0.9938, 50))
    );
    expect(screen.getByText('CKD stage (1-5)').nextElementSibling!.textContent).toBe(money(1));
  });

  it('changes when sex changes to female', () => {
    const { container } = renderCalculatorPage(<GFRCalculator />, page);
    fireEvent.change(screen.getByLabelText('Sex'), { target: { value: 'female' } });
    const gfr = ckdepi(1, 50, true);
    expect(hero(container)).toBe(`${money(gfr)} mL/min`);
    expect(screen.getByText('kappa (mg/dL)').nextElementSibling!.textContent).toBe(money(0.7));
  });
});

describe('CreatinineClearanceCalculator', () => {
  const page: CalculatorPage = {
    title: 'Creatinine Clearance Calculator',
    description: 'Estimate creatinine clearance with the Cockcroft-Gault equation for drug dosing guidance.',
    path: '/creatinine-clearance-calculator.html',
    category: 'health',
  };

  const cockcroft = (age: number, weight: number, scr: number, female: boolean) =>
    (((140 - age) * weight) / (72 * scr)) * (female ? 0.85 : 1);

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<CreatinineClearanceCalculator />, page);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Creatinine Clearance Calculator' })
    ).toBeDefined();
    expect(screen.getByText('Weight (kg)')).toBeDefined();
    expect(screen.getByText('Creatinine clearance')).toBeDefined();
  });

  it('applies Cockcroft-Gault with the pre-sex term', () => {
    const { container } = renderCalculatorPage(<CreatinineClearanceCalculator />, page);
    const raw = ((140 - 60) * 70) / (72 * 1.2);
    const crCl = cockcroft(60, 70, 1.2, false);
    expect(hero(container)).toBe(`${money(crCl)} mL/min`);
    expect(screen.getByText('Pre-sex-adjusted value').nextElementSibling!.textContent).toBe(money(raw));
    expect(screen.getByText('Fraction of 60 mL/min').nextElementSibling!.textContent).toBe(
      money(crCl / 60)
    );
  });

  it('applies the female 0.85 factor', () => {
    const { container } = renderCalculatorPage(<CreatinineClearanceCalculator />, page);
    fireEvent.change(screen.getByLabelText('Sex'), { target: { value: 'female' } });
    const crCl = cockcroft(60, 70, 1.2, true);
    expect(hero(container)).toBe(`${money(crCl)} mL/min`);
    expect(screen.getByText('Sex adjustment factor').nextElementSibling!.textContent).toBe(money(0.85));
  });
});

describe('BodySurfaceAreaMedicalCalculator', () => {
  const page: CalculatorPage = {
    title: 'Body Surface Area Medical Calculator',
    description: 'Calculate body surface area with the Mosteller and DuBois equations from height and weight.',
    path: '/body-surface-area-medical-calculator.html',
    category: 'health',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<BodySurfaceAreaMedicalCalculator />, page);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Body Surface Area Medical Calculator' })
    ).toBeDefined();
    expect(screen.getByText('Height (cm)')).toBeDefined();
    expect(screen.getByText('Body surface area (Mosteller)')).toBeDefined();
  });

  it('computes the Mosteller and DuBois equations', () => {
    const { container } = renderCalculatorPage(<BodySurfaceAreaMedicalCalculator />, page);
    const mosteller = Math.sqrt((170 * 70) / 3600);
    const dubois = 0.007184 * Math.pow(170, 0.725) * Math.pow(70, 0.425);
    expect(hero(container)).toBe(`${money(mosteller)} m²`);
    expect(screen.getByText('DuBois BSA (m²)').nextElementSibling!.textContent).toBe(money(dubois));
    expect(screen.getByText('BMI (kg/m²)').nextElementSibling!.textContent).toBe(
      money(70 / Math.pow(170 / 100, 2))
    );
  });

  it('grows BSA when weight rises', () => {
    const { container } = renderCalculatorPage(<BodySurfaceAreaMedicalCalculator />, page);
    fireEvent.change(screen.getByLabelText('Weight (kg)'), { target: { value: '80' } });
    const mosteller = Math.sqrt((170 * 80) / 3600);
    expect(hero(container)).toBe(`${money(mosteller)} m²`);
    expect(screen.getByText('BMI (kg/m²)').nextElementSibling!.textContent).toBe(
      money(80 / Math.pow(170 / 100, 2))
    );
  });
});

describe('IVDripRateCalculator', () => {
  const page: CalculatorPage = {
    title: 'IV Drip Rate Calculator',
    description: 'Convert IV volume, infusion time and drop factor into drops per minute.',
    path: '/iv-drip-rate-calculator.html',
    category: 'health',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<IVDripRateCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'IV Drip Rate Calculator' })).toBeDefined();
    expect(screen.getByText('Drop factor (gtt/mL)')).toBeDefined();
    expect(screen.getByText('Drip rate')).toBeDefined();
  });

  it('divides total drops by infusion minutes', () => {
    const { container } = renderCalculatorPage(<IVDripRateCalculator />, page);
    const drops = (1000 * 15) / (8 * 60);
    expect(hero(container)).toBe(`${money(drops)} gtt/min`);
    expect(screen.getByText('Flow rate (mL/hour)').nextElementSibling!.textContent).toBe(
      money(1000 / 8)
    );
    expect(screen.getByText('Total drops').nextElementSibling!.textContent).toBe(money(1000 * 15));
  });

  it('doubles the drip rate when time halves', () => {
    const { container } = renderCalculatorPage(<IVDripRateCalculator />, page);
    fireEvent.change(screen.getByLabelText('Infusion time (hours)'), { target: { value: '4' } });
    const drops = (1000 * 15) / (4 * 60);
    expect(hero(container)).toBe(`${money(drops)} gtt/min`);
    expect(screen.getByText('Total infusion minutes').nextElementSibling!.textContent).toBe(
      money(4 * 60)
    );
  });
});

describe('IVFlowRateCalculator', () => {
  const page: CalculatorPage = {
    title: 'IV Flow Rate Calculator',
    description: 'Convert infusion volume and time into millilitres per hour and per minute.',
    path: '/iv-flow-rate-calculator.html',
    category: 'health',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<IVFlowRateCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'IV Flow Rate Calculator' })).toBeDefined();
    expect(screen.getByText('Volume (mL)')).toBeDefined();
    expect(screen.getByText('Flow rate')).toBeDefined();
  });

  it('scales volume over the infusion window', () => {
    const { container } = renderCalculatorPage(<IVFlowRateCalculator />, page);
    const minutes = 2 * 60;
    const mLPerHour = (500 / minutes) * 60;
    expect(hero(container)).toBe(`${money(mLPerHour)} mL/hr`);
    expect(screen.getByText('mL per minute').nextElementSibling!.textContent).toBe(money(500 / minutes));
    expect(screen.getByText('Seconds per mL').nextElementSibling!.textContent).toBe(
      money(minutes / 500)
    );
  });

  it('raises the rate when the volume increases', () => {
    const { container } = renderCalculatorPage(<IVFlowRateCalculator />, page);
    fireEvent.change(screen.getByLabelText('Volume (mL)'), { target: { value: '750' } });
    const minutes = 2 * 60;
    expect(hero(container)).toBe(`${money((750 / minutes) * 60)} mL/hr`);
    expect(screen.getByText('mL per minute').nextElementSibling!.textContent).toBe(money(750 / minutes));
  });
});

describe('DosageCalculator', () => {
  const page: CalculatorPage = {
    title: 'Dosage Calculator',
    description: 'Work out dose, volume and daily totals from body weight, dose per kilogram and concentration.',
    path: '/dosage-calculator.html',
    category: 'health',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<DosageCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Dosage Calculator' })).toBeDefined();
    expect(screen.getByText('Body weight (kg)')).toBeDefined();
    expect(screen.getByText('Volume per dose')).toBeDefined();
  });

  it('converts mg/kg into a millilitre volume', () => {
    const { container } = renderCalculatorPage(<DosageCalculator />, page);
    const perDose = 70 * 5;
    expect(hero(container)).toBe(`${money(perDose / 100)} mL`);
    expect(screen.getByText('Dose per administration (mg)').nextElementSibling!.textContent).toBe(
      money(perDose)
    );
    expect(screen.getByText('Daily dose (mg)').nextElementSibling!.textContent).toBe(money(perDose * 2));
    expect(screen.getByText('Weekly dose (mg)').nextElementSibling!.textContent).toBe(
      money(perDose * 2 * 7)
    );
  });

  it('doubles the volume when concentration halves', () => {
    const { container } = renderCalculatorPage(<DosageCalculator />, page);
    fireEvent.change(screen.getByLabelText('Concentration (mg/mL)'), { target: { value: '50' } });
    const perDose = 70 * 5;
    expect(hero(container)).toBe(`${money(perDose / 50)} mL`);
    expect(screen.getByText('Daily dose (mg)').nextElementSibling!.textContent).toBe(money(perDose * 2));
  });
});

describe('EWasteCalculator', () => {
  const page: CalculatorPage = {
    title: 'E-Waste Calculator',
    description: 'Estimate electronic waste volumes, recycling rates and recoverable metals over time.',
    path: '/e-waste-calculator.html',
    category: 'scientific',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<EWasteCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'E-Waste Calculator' })).toBeDefined();
    expect(screen.getByText('Recycling rate (%)')).toBeDefined();
    expect(screen.getByText('E-waste generated')).toBeDefined();
  });

  it('multiplies devices, weight and years', () => {
    const { container } = renderCalculatorPage(<EWasteCalculator />, page);
    const total = 50 * 1.5 * 3;
    const recycled = total * (40 / 100);
    expect(hero(container)).toBe(`${money(total)} kg`);
    expect(screen.getByText('Recycled (kg)').nextElementSibling!.textContent).toBe(money(recycled));
    expect(screen.getByText('Landfilled (kg)').nextElementSibling!.textContent).toBe(money(total - recycled));
    expect(screen.getByText('Metals recovered (kg)').nextElementSibling!.textContent).toBe(
      money(recycled * 0.2)
    );
  });

  it('shifts waste from landfill when the recycling rate rises', () => {
    const { container } = renderCalculatorPage(<EWasteCalculator />, page);
    fireEvent.change(screen.getByLabelText('Recycling rate (%)'), { target: { value: '80' } });
    const total = 50 * 1.5 * 3;
    const recycled = total * (80 / 100);
    expect(screen.getByText('Recycled (kg)').nextElementSibling!.textContent).toBe(money(recycled));
    expect(screen.getByText('Landfilled (kg)').nextElementSibling!.textContent).toBe(money(total - recycled));
    expect(hero(container)).toBe(`${money(total)} kg`);
  });
});

describe('PollutionCalculator', () => {
  const page: CalculatorPage = {
    title: 'Pollution Calculator',
    description: 'Model pollutant output from operating hours, emission factors and control efficiency.',
    path: '/pollution-calculator.html',
    category: 'scientific',
  };

  const gross = 8 * 2.5 * 30;

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<PollutionCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Pollution Calculator' })).toBeDefined();
    expect(screen.getByText('Emission factor (kg/hour)')).toBeDefined();
    expect(screen.getByText('Net pollutant released')).toBeDefined();
  });

  it('applies control efficiency to gross emissions', () => {
    const { container } = renderCalculatorPage(<PollutionCalculator />, page);
    const controlled = gross * (1 - 60 / 100);
    expect(hero(container)).toBe(`${money(controlled)} kg`);
    expect(screen.getByText('Gross emissions (kg)').nextElementSibling!.textContent).toBe(money(gross));
    expect(screen.getByText('Captured by controls (kg)').nextElementSibling!.textContent).toBe(
      money(gross - controlled)
    );
    expect(screen.getByText('Daily average (kg)').nextElementSibling!.textContent).toBe(
      money(controlled / 30)
    );
  });

  it('cuts the release when efficiency improves', () => {
    const { container } = renderCalculatorPage(<PollutionCalculator />, page);
    fireEvent.change(screen.getByLabelText('Control efficiency (%)'), { target: { value: '80' } });
    const controlled = gross * (1 - 80 / 100);
    expect(hero(container)).toBe(`${money(controlled)} kg`);
    expect(screen.getByText('Captured by controls (kg)').nextElementSibling!.textContent).toBe(
      money(gross - controlled)
    );
  });
});

describe('AirQualityCalculator', () => {
  const page: CalculatorPage = {
    title: 'Air Quality Calculator',
    description: 'Convert a PM2.5 reading into the US EPA Air Quality Index and its health category.',
    path: '/air-quality-calculator.html',
    category: 'scientific',
  };

  const aqiFrom = (conc: number) => {
    const span = 35.4 - 12.1;
    const above = conc - 12.1;
    const contribution = ((100 - 51) / span) * above;
    const raw = 51 + contribution;
    return { contribution, raw, aqi: Math.round(raw) };
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<AirQualityCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Air Quality Calculator' })).toBeDefined();
    expect(screen.getByText('PM2.5 concentration (µg/m³)')).toBeDefined();
    expect(screen.getByText('Air Quality Index')).toBeDefined();
  });

  it('interpolates the AQI inside the 12.1-35.4 band', () => {
    const { container } = renderCalculatorPage(<AirQualityCalculator />, page);
    const expected = aqiFrom(20);
    expect(hero(container)).toBe(`AQI ${int(expected.aqi)}`);
    expect(screen.getByText('Raw AQI (unrounded)').nextElementSibling!.textContent).toBe(
      money(expected.raw)
    );
    expect(screen.getByText('Index contribution').nextElementSibling!.textContent).toBe(
      money(expected.contribution)
    );
    expect(screen.getByText('Band width (µg/m³)').nextElementSibling!.textContent).toBe(money(35.4 - 12.1));
  });

  it('rises to the top of the moderate band at 35.4', () => {
    const { container } = renderCalculatorPage(<AirQualityCalculator />, page);
    fireEvent.change(screen.getByLabelText('PM2.5 concentration (µg/m³)'), { target: { value: '35.4' } });
    const expected = aqiFrom(35.4);
    expect(hero(container)).toBe(`AQI ${int(expected.aqi)}`);
    expect(screen.getByText('Raw AQI (unrounded)').nextElementSibling!.textContent).toBe(
      money(expected.raw)
    );
  });
});

describe('CompostingCalculator', () => {
  const page: CalculatorPage = {
    title: 'Composting Calculator',
    description: 'Balance carbon and nitrogen inputs to find the C:N ratio and curing time of a compost pile.',
    path: '/composting-calculator.html',
    category: 'scientific',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<CompostingCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Composting Calculator' })).toBeDefined();
    expect(screen.getByText('Browns — carbon material (kg)')).toBeDefined();
    expect(screen.getByText('Carbon to nitrogen ratio')).toBeDefined();
  });

  it('divides carbon contributed by nitrogen contributed', () => {
    const { container } = renderCalculatorPage(<CompostingCalculator />, page);
    const carbon = 60 * (45 / 100);
    const nitrogen = 10 * (4 / 100);
    const cn = carbon / nitrogen;
    expect(hero(container)).toBe(`${money(cn)} : 1`);
    expect(screen.getByText('Carbon contributed (kg)').nextElementSibling!.textContent).toBe(money(carbon));
    expect(screen.getByText('Nitrogen contributed (kg)').nextElementSibling!.textContent).toBe(
      money(nitrogen)
    );
    expect(screen.getByText('Estimated days to cure').nextElementSibling!.textContent).toBe(
      money(30 + Math.abs(cn - 30) * 1.5)
    );
  });

  it('drops the ratio when more greens are added', () => {
    const { container } = renderCalculatorPage(<CompostingCalculator />, page);
    fireEvent.change(screen.getByLabelText('Greens — nitrogen material (kg)'), { target: { value: '20' } });
    const carbon = 60 * (45 / 100);
    const nitrogen = 20 * (4 / 100);
    const cn = carbon / nitrogen;
    expect(hero(container)).toBe(`${money(cn)} : 1`);
    expect(screen.getByText('Estimated days to cure').nextElementSibling!.textContent).toBe(
      money(30 + Math.abs(cn - 30) * 1.5)
    );
  });
});

describe('RecyclingCalculator', () => {
  const page: CalculatorPage = {
    title: 'Recycling Calculator',
    description: 'See how much waste is diverted from landfill and the carbon savings from recycling.',
    path: '/recycling-calculator.html',
    category: 'scientific',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<RecyclingCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Recycling Calculator' })).toBeDefined();
    expect(screen.getByText('Total waste (kg)')).toBeDefined();
    expect(screen.getByText('Recyclable material')).toBeDefined();
  });

  it('takes the recycling percentage of total waste', () => {
    const { container } = renderCalculatorPage(<RecyclingCalculator />, page);
    const recycled = 500 * (45 / 100);
    expect(hero(container)).toBe(`${money(recycled)} kg`);
    expect(screen.getByText('Sent to landfill (kg)').nextElementSibling!.textContent).toBe(
      money(500 - recycled)
    );
    expect(screen.getByText('CO₂ avoided (kg)').nextElementSibling!.textContent).toBe(money(recycled * 1.5));
  });

  it('diverts more when the rate rises', () => {
    const { container } = renderCalculatorPage(<RecyclingCalculator />, page);
    fireEvent.change(screen.getByLabelText('Recycling rate (%)'), { target: { value: '60' } });
    const recycled = 500 * (60 / 100);
    expect(hero(container)).toBe(`${money(recycled)} kg`);
    expect(screen.getByText('Sent to landfill (kg)').nextElementSibling!.textContent).toBe(
      money(500 - recycled)
    );
  });
});

describe('WaterUsageCalculator', () => {
  const page: CalculatorPage = {
    title: 'Water Usage Calculator',
    description: 'Add up shower, toilet and laundry consumption to find daily and monthly household water use.',
    path: '/water-usage-calculator.html',
    category: 'scientific',
  };

  const dailyFrom = (showerMinutes: number) => {
    const shower = showerMinutes * 9;
    const toilet = 6 * 6;
    const laundry = (4 * 50) / 7;
    return { shower, toilet, laundry, daily: shower + toilet + laundry };
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<WaterUsageCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Water Usage Calculator' })).toBeDefined();
    expect(screen.getByText('Shower minutes per day')).toBeDefined();
    expect(screen.getByText('Daily water use')).toBeDefined();
  });

  it('adds shower, toilet and laundry flows', () => {
    const { container } = renderCalculatorPage(<WaterUsageCalculator />, page);
    const expected = dailyFrom(8);
    expect(hero(container)).toBe(`${money(expected.daily)} L`);
    expect(screen.getByText('Shower (L/day)').nextElementSibling!.textContent).toBe(money(expected.shower));
    expect(screen.getByText('Laundry (L/day)').nextElementSibling!.textContent).toBe(
      money(expected.laundry)
    );
    expect(screen.getByText('Monthly (L)').nextElementSibling!.textContent).toBe(
      money(expected.daily * 30)
    );
  });

  it('cuts daily use when showers shorten', () => {
    const { container } = renderCalculatorPage(<WaterUsageCalculator />, page);
    fireEvent.change(screen.getByLabelText('Shower minutes per day'), { target: { value: '4' } });
    const expected = dailyFrom(4);
    expect(hero(container)).toBe(`${money(expected.daily)} L`);
    expect(screen.getByText('Shower (L/day)').nextElementSibling!.textContent).toBe(money(expected.shower));
  });
});

describe('EnergyEfficiencyCalculator', () => {
  const page: CalculatorPage = {
    title: 'Energy Efficiency Calculator',
    description: 'Compare useful energy output with total input to calculate efficiency and wasted cost.',
    path: '/energy-efficiency-calculator.html',
    category: 'scientific',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<EnergyEfficiencyCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Energy Efficiency Calculator' })).toBeDefined();
    expect(screen.getByText('Useful energy out (kWh)')).toBeDefined();
    expect(screen.getByText('Energy efficiency')).toBeDefined();
  });

  it('divides useful output by total input', () => {
    const { container } = renderCalculatorPage(<EnergyEfficiencyCalculator />, page);
    const efficiency = (800 / 1000) * 100;
    const losses = 1000 - 800;
    expect(hero(container)).toBe(`${money(efficiency)} %`);
    expect(screen.getByText('Energy losses (kWh)').nextElementSibling!.textContent).toBe(money(losses));
    expect(screen.getByText('Cost of waste ($)').nextElementSibling!.textContent).toBe(
      money(losses * 0.15)
    );
  });

  it('raises efficiency when useful output climbs', () => {
    const { container } = renderCalculatorPage(<EnergyEfficiencyCalculator />, page);
    fireEvent.change(screen.getByLabelText('Useful energy out (kWh)'), { target: { value: '900' } });
    const efficiency = (900 / 1000) * 100;
    expect(hero(container)).toBe(`${money(efficiency)} %`);
    expect(screen.getByText('Energy losses (kWh)').nextElementSibling!.textContent).toBe(
      money(1000 - 900)
    );
  });
});

describe('Co2EmissionsCalculator', () => {
  const page: CalculatorPage = {
    title: 'CO2 Emissions Calculator',
    description: 'Turn electricity and fuel consumption into kilograms and tonnes of CO2 using grid factors.',
    path: '/co2-emissions-calculator.html',
    category: 'scientific',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<Co2EmissionsCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'CO2 Emissions Calculator' })).toBeDefined();
    expect(screen.getByText('Electricity used (kWh)')).toBeDefined();
    expect(screen.getByText('Total CO₂ emissions')).toBeDefined();
  });

  it('scales each source by its emission factor', () => {
    const { container } = renderCalculatorPage(<Co2EmissionsCalculator />, page);
    const electricityCo2 = 500 * 0.4;
    const fuelCo2 = 100 * 2.31;
    const totalKg = electricityCo2 + fuelCo2;
    expect(hero(container)).toBe(`${money(totalKg)} kg`);
    expect(screen.getByText('From electricity (kg)').nextElementSibling!.textContent).toBe(
      money(electricityCo2)
    );
    expect(screen.getByText('From fuel (kg)').nextElementSibling!.textContent).toBe(money(fuelCo2));
    expect(screen.getByText('Total tonnes').nextElementSibling!.textContent).toBe(money(totalKg / 1000));
  });

  it('grows with electricity use', () => {
    const { container } = renderCalculatorPage(<Co2EmissionsCalculator />, page);
    fireEvent.change(screen.getByLabelText('Electricity used (kWh)'), { target: { value: '1000' } });
    const totalKg = 1000 * 0.4 + 100 * 2.31;
    expect(hero(container)).toBe(`${money(totalKg)} kg`);
    expect(screen.getByText('From electricity (kg)').nextElementSibling!.textContent).toBe(
      money(1000 * 0.4)
    );
  });
});

describe('CarbonFootprintCalculator', () => {
  const page: CalculatorPage = {
    title: 'Carbon Footprint Calculator',
    description: 'Estimate an annual household carbon footprint from driving, home energy and flights.',
    path: '/carbon-footprint-calculator.html',
    category: 'scientific',
  };

  const footprint = (carKm: number) => {
    const carKg = carKm * 0.17;
    const homeKg = 3000 * 0.4;
    const flightKg = 2 * 500;
    const totalKg = carKg + homeKg + flightKg;
    return { carKg, homeKg, flightKg, totalKg, tonnes: totalKg / 1000 };
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<CarbonFootprintCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Carbon Footprint Calculator' })).toBeDefined();
    expect(screen.getByText('Car travel (km/year)')).toBeDefined();
    expect(screen.getByText('Annual carbon footprint')).toBeDefined();
  });

  it('sums driving, home energy and flights', () => {
    const { container } = renderCalculatorPage(<CarbonFootprintCalculator />, page);
    const expected = footprint(8000);
    expect(hero(container)).toBe(`${money(expected.tonnes)} t CO₂e`);
    expect(screen.getByText('Driving (kg)').nextElementSibling!.textContent).toBe(money(expected.carKg));
    expect(screen.getByText('Home energy (kg)').nextElementSibling!.textContent).toBe(money(expected.homeKg));
    expect(screen.getByText('Flights (kg)').nextElementSibling!.textContent).toBe(
      money(expected.flightKg)
    );
    expect(screen.getByText('Total (kg)').nextElementSibling!.textContent).toBe(money(expected.totalKg));
  });

  it('falls when driving is halved', () => {
    const { container } = renderCalculatorPage(<CarbonFootprintCalculator />, page);
    fireEvent.change(screen.getByLabelText('Car travel (km/year)'), { target: { value: '4000' } });
    const expected = footprint(4000);
    expect(hero(container)).toBe(`${money(expected.tonnes)} t CO₂e`);
    expect(screen.getByText('Driving (kg)').nextElementSibling!.textContent).toBe(money(expected.carKg));
  });
});

describe('ChemicalPotentialCalculator', () => {
  const page: CalculatorPage = {
    title: 'Chemical Potential Calculator',
    description: 'Find reaction free energy at non-standard conditions from ΔG°, temperature and the quotient Q.',
    path: '/chemical-potential-calculator.html',
    category: 'scientific',
  };

  const deltaG = (q: number) => {
    const rt = 0.008314 * 298;
    const correction = rt * Math.log(q);
    return { rt, correction, deltaG: -40 + correction };
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<ChemicalPotentialCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Chemical Potential Calculator' })).toBeDefined();
    expect(screen.getByText('Reaction quotient Q')).toBeDefined();
    expect(screen.getByText('Reaction free energy')).toBeDefined();
  });

  it('adds the RT ln Q correction to ΔG°', () => {
    const { container } = renderCalculatorPage(<ChemicalPotentialCalculator />, page);
    const expected = deltaG(1);
    expect(hero(container)).toBe(`${money(expected.deltaG)} kJ/mol`);
    expect(screen.getByText('RT term (kJ/mol)').nextElementSibling!.textContent).toBe(money(expected.rt));
    expect(screen.getByText('Correction term (kJ/mol)').nextElementSibling!.textContent).toBe(
      money(expected.correction)
    );
  });

  it('shifts ΔG when the quotient moves away from unity', () => {
    const { container } = renderCalculatorPage(<ChemicalPotentialCalculator />, page);
    fireEvent.change(screen.getByLabelText('Reaction quotient Q'), { target: { value: '2' } });
    const expected = deltaG(2);
    expect(hero(container)).toBe(`${money(expected.deltaG)} kJ/mol`);
    expect(screen.getByText('ln(Q)').nextElementSibling!.textContent).toBe(money(Math.log(2)));
  });
});

describe('GibbsFreeEnergyCalculator', () => {
  const page: CalculatorPage = {
    title: 'Gibbs Free Energy Calculator',
    description: 'Calculate Gibbs free energy from enthalpy and entropy changes to test spontaneity.',
    path: '/gibbs-free-energy-calculator.html',
    category: 'scientific',
  };

  const gibbs = (temperature: number) => {
    const entropyKj = -120 / 1000;
    const tDeltaS = temperature * entropyKj;
    return { entropyKj, tDeltaS, deltaG: -80 - tDeltaS };
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<GibbsFreeEnergyCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Gibbs Free Energy Calculator' })).toBeDefined();
    expect(screen.getByText('Enthalpy change ΔH (kJ/mol)')).toBeDefined();
    expect(screen.getByText('Gibbs free energy')).toBeDefined();
  });

  it('subtracts TΔS from enthalpy', () => {
    const { container } = renderCalculatorPage(<GibbsFreeEnergyCalculator />, page);
    const expected = gibbs(298);
    expect(hero(container)).toBe(`${money(expected.deltaG)} kJ/mol`);
    expect(screen.getByText('TΔS (kJ/mol)').nextElementSibling!.textContent).toBe(money(expected.tDeltaS));
    expect(screen.getByText('Equilibrium temperature (K)').nextElementSibling!.textContent).toBe(
      money(-80 / (-120 / 1000))
    );
  });

  it('warms toward less negative ΔG at higher temperature', () => {
    const { container } = renderCalculatorPage(<GibbsFreeEnergyCalculator />, page);
    fireEvent.change(screen.getByLabelText('Temperature (K)'), { target: { value: '400' } });
    const expected = gibbs(400);
    expect(hero(container)).toBe(`${money(expected.deltaG)} kJ/mol`);
    expect(screen.getByText('TΔS (kJ/mol)').nextElementSibling!.textContent).toBe(money(expected.tDeltaS));
  });
});

describe('EntropyChemicalCalculator', () => {
  const page: CalculatorPage = {
    title: 'Entropy Chemical Calculator',
    description: 'Work out entropy change from reversible heat and temperature, with molar values too.',
    path: '/entropy-chemical-calculator.html',
    category: 'scientific',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<EntropyChemicalCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Entropy Chemical Calculator' })).toBeDefined();
    expect(screen.getByText('Reversible heat exchanged (J)')).toBeDefined();
    expect(screen.getByText('Entropy change')).toBeDefined();
  });

  it('divides reversible heat by temperature', () => {
    const { container } = renderCalculatorPage(<EntropyChemicalCalculator />, page);
    const deltaS = 5000 / 300;
    const molar = deltaS / 2;
    expect(hero(container)).toBe(`${money(deltaS)} J/K`);
    expect(screen.getByText('Molar entropy change (J/mol·K)').nextElementSibling!.textContent).toBe(
      money(molar)
    );
    expect(screen.getByText('Heat per mole (J/mol)').nextElementSibling!.textContent).toBe(
      money(5000 / 2)
    );
  });

  it('halves entropy change when temperature doubles', () => {
    const { container } = renderCalculatorPage(<EntropyChemicalCalculator />, page);
    fireEvent.change(screen.getByLabelText('Temperature (K)'), { target: { value: '600' } });
    const deltaS = 5000 / 600;
    expect(hero(container)).toBe(`${money(deltaS)} J/K`);
    expect(screen.getByText('Molar entropy change (J/mol·K)').nextElementSibling!.textContent).toBe(
      money(deltaS / 2)
    );
  });
});

describe('EnthalpyCalculator', () => {
  const page: CalculatorPage = {
    title: 'Enthalpy Calculator',
    description: 'Convert internal energy change into enthalpy using ΔH = ΔU + ΔnRT for gas reactions.',
    path: '/enthalpy-calculator.html',
    category: 'scientific',
  };

  const enthalpy = (dn: number) => {
    const rt = 0.008314 * 298;
    const correction = dn * rt;
    return { rt, correction, enthalpy: 100 + correction };
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<EnthalpyCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Enthalpy Calculator' })).toBeDefined();
    expect(screen.getByText('Internal energy change ΔU (kJ)')).toBeDefined();
    expect(screen.getByText('Enthalpy change')).toBeDefined();
  });

  it('adds the ΔnRT term to internal energy', () => {
    const { container } = renderCalculatorPage(<EnthalpyCalculator />, page);
    const expected = enthalpy(2);
    expect(hero(container)).toBe(`${money(expected.enthalpy)} kJ`);
    expect(screen.getByText('ΔnRT term (kJ)').nextElementSibling!.textContent).toBe(
      money(expected.correction)
    );
    expect(screen.getByText('RT (kJ/mol)').nextElementSibling!.textContent).toBe(money(expected.rt));
  });

  it('returns ΔU unchanged when no gas moles change', () => {
    const { container } = renderCalculatorPage(<EnthalpyCalculator />, page);
    fireEvent.change(screen.getByLabelText('Change in moles of gas Δn'), { target: { value: '0' } });
    const expected = enthalpy(0);
    expect(hero(container)).toBe(`${money(expected.enthalpy)} kJ`);
    expect(screen.getByText('ΔnRT term (kJ)').nextElementSibling!.textContent).toBe(
      money(expected.correction)
    );
  });
});

describe('HeatOfCombustionCalculator', () => {
  const page: CalculatorPage = {
    title: 'Heat of Combustion Calculator',
    description: 'Turn energy released and fuel mass into molar and per-gram heat of combustion values.',
    path: '/heat-of-combustion-calculator.html',
    category: 'scientific',
  };

  const combustion = (energy: number) => {
    const moles = 64 / 32;
    const perMole = -(energy / moles);
    return { moles, perMole, perGram: energy / 64 };
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<HeatOfCombustionCalculator />, page);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Heat of Combustion Calculator' })
    ).toBeDefined();
    expect(screen.getByText('Mass burned (g)')).toBeDefined();
    expect(screen.getByText('Heat of combustion')).toBeDefined();
  });

  it('reports energy per mole as a negative value', () => {
    const { container } = renderCalculatorPage(<HeatOfCombustionCalculator />, page);
    const expected = combustion(2400);
    expect(hero(container)).toBe(`${money(expected.perMole)} kJ/mol`);
    expect(screen.getByText('Moles burned').nextElementSibling!.textContent).toBe(money(expected.moles));
    expect(screen.getByText('Energy per gram (kJ/g)').nextElementSibling!.textContent).toBe(
      money(expected.perGram)
    );
    expect(screen.getByText('Energy per mole (kJ/mol)').nextElementSibling!.textContent).toBe(
      money(-expected.perMole)
    );
  });

  it('grows with more energy released', () => {
    const { container } = renderCalculatorPage(<HeatOfCombustionCalculator />, page);
    fireEvent.change(screen.getByLabelText('Energy released (kJ)'), { target: { value: '3000' } });
    const expected = combustion(3000);
    expect(hero(container)).toBe(`${money(expected.perMole)} kJ/mol`);
    expect(screen.getByText('Energy per gram (kJ/g)').nextElementSibling!.textContent).toBe(
      money(expected.perGram)
    );
  });
});

describe('HeatOfFormationCalculator', () => {
  const page: CalculatorPage = {
    title: 'Heat of Formation Calculator',
    description: 'Apply Hess’s law to standard formation enthalpies to get the heat of the reaction.',
    path: '/heat-of-formation-calculator.html',
    category: 'scientific',
  };

  const formation = (products: number) => products - -450;

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<HeatOfFormationCalculator />, page);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Heat of Formation Calculator' })
    ).toBeDefined();
    expect(screen.getByText('Σ ΔHf of products (kJ)')).toBeDefined();
    expect(screen.getByText('Enthalpy of formation')).toBeDefined();
  });

  it('subtracts the reactant total from the product total', () => {
    const { container } = renderCalculatorPage(<HeatOfFormationCalculator />, page);
    const deltaH = formation(-600);
    expect(hero(container)).toBe(`${money(deltaH)} kJ`);
    expect(screen.getByText('Per mole of reaction (kJ)').nextElementSibling!.textContent).toBe(
      money(deltaH / 1)
    );
    expect(screen.getByText('Products minus reactants (kJ)').nextElementSibling!.textContent).toBe(
      money(deltaH)
    );
  });

  it('becomes less exothermic as product energy rises', () => {
    const { container } = renderCalculatorPage(<HeatOfFormationCalculator />, page);
    fireEvent.change(screen.getByLabelText('Σ ΔHf of products (kJ)'), { target: { value: '-500' } });
    const deltaH = formation(-500);
    expect(hero(container)).toBe(`${money(deltaH)} kJ`);
    expect(screen.getByText('Products minus reactants (kJ)').nextElementSibling!.textContent).toBe(
      money(deltaH)
    );
  });
});

describe('HeatOfReactionCalculator', () => {
  const page: CalculatorPage = {
    title: 'Heat of Reaction Calculator',
    description: 'Balance the energy needed to break bonds against the energy released forming new ones.',
    path: '/heat-of-reaction-calculator.html',
    category: 'scientific',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<HeatOfReactionCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Heat of Reaction Calculator' })).toBeDefined();
    expect(screen.getByText('Energy to break bonds (kJ)')).toBeDefined();
    expect(screen.getByText('Heat of reaction')).toBeDefined();
  });

  it('subtracts bond formation energy from bond breaking energy', () => {
    const { container } = renderCalculatorPage(<HeatOfReactionCalculator />, page);
    const deltaH = 1200 - 1450;
    expect(hero(container)).toBe(`${money(deltaH)} kJ`);
    expect(screen.getByText('Formed / broken ratio').nextElementSibling!.textContent).toBe(
      money(1450 / 1200)
    );
    expect(screen.getByText('Bond energy balance (kJ)').nextElementSibling!.textContent).toBe(
      money(deltaH)
    );
  });

  it('flips endothermic when formation absorbs more', () => {
    const { container } = renderCalculatorPage(<HeatOfReactionCalculator />, page);
    fireEvent.change(screen.getByLabelText('Energy released forming bonds (kJ)'), {
      target: { value: '1100' },
    });
    const deltaH = 1200 - 1100;
    expect(hero(container)).toBe(`${money(deltaH)} kJ`);
    expect(screen.getByText('Formed / broken ratio').nextElementSibling!.textContent).toBe(
      money(1100 / 1200)
    );
  });
});

describe('ActivationEnergyCalculator', () => {
  const page: CalculatorPage = {
    title: 'Activation Energy Calculator',
    description: 'Estimate activation energy from rate constants measured at two different temperatures.',
    path: '/activation-energy-calculator.html',
    category: 'scientific',
  };

  const activation = (t2: number) => {
    const numerator = -8.314 * Math.log(4 / 1);
    const denominator = 1 / t2 - 1 / 300;
    return { numerator, denominator, ea: numerator / denominator };
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<ActivationEnergyCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Activation Energy Calculator' })).toBeDefined();
    expect(screen.getByText('Rate constant k₁')).toBeDefined();
    expect(screen.getByText('Activation energy')).toBeDefined();
  });

  it('solves the two-point Arrhenius equation', () => {
    const { container } = renderCalculatorPage(<ActivationEnergyCalculator />, page);
    const expected = activation(320);
    expect(hero(container)).toBe(`${money(expected.ea / 1000)} kJ/mol`);
    expect(screen.getByText('Activation energy (J/mol)').nextElementSibling!.textContent).toBe(
      money(expected.ea)
    );
    expect(screen.getByText('Rate ratio k₂/k₁').nextElementSibling!.textContent).toBe(money(4 / 1));
  });

  it('lowers the estimate when the second temperature climbs', () => {
    const { container } = renderCalculatorPage(<ActivationEnergyCalculator />, page);
    fireEvent.change(screen.getByLabelText('Temperature T₂ (K)'), { target: { value: '400' } });
    const expected = activation(400);
    expect(hero(container)).toBe(`${money(expected.ea / 1000)} kJ/mol`);
    expect(screen.getByText('Temperature difference (K)').nextElementSibling!.textContent).toBe(
      money(400 - 300)
    );
  });
});

describe('EquilibriumConstantCalculator', () => {
  const page: CalculatorPage = {
    title: 'Equilibrium Constant Calculator',
    description: 'Convert standard free energy into the equilibrium constant with ΔG° = −RT ln K.',
    path: '/equilibrium-constant-calculator.html',
    category: 'scientific',
  };

  const equilibrium = (dg0: number) => {
    const rt = 0.008314 * 298;
    const lnK = -dg0 / rt;
    return { rt, lnK, k: Math.exp(lnK) };
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<EquilibriumConstantCalculator />, page);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Equilibrium Constant Calculator' })
    ).toBeDefined();
    expect(screen.getByText('Temperature (K)')).toBeDefined();
    expect(screen.getByText('Equilibrium constant K')).toBeDefined();
  });

  it('exponentiates −ΔG°/RT', () => {
    const { container } = renderCalculatorPage(<EquilibriumConstantCalculator />, page);
    const expected = equilibrium(-10);
    expect(hero(container)).toBe(money(expected.k));
    expect(screen.getByText('ln K').nextElementSibling!.textContent).toBe(money(expected.lnK));
    expect(screen.getByText('RT (kJ/mol)').nextElementSibling!.textContent).toBe(money(expected.rt));
  });

  it('settles at K = 1 when ΔG° is zero', () => {
    const { container } = renderCalculatorPage(<EquilibriumConstantCalculator />, page);
    fireEvent.change(screen.getByLabelText('Standard free energy ΔG° (kJ/mol)'), {
      target: { value: '0' },
    });
    const expected = equilibrium(0);
    expect(hero(container)).toBe(money(expected.k));
    expect(screen.getByText('ln K').nextElementSibling!.textContent).toBe(money(expected.lnK));
  });
});

describe('ReactionRateCalculator', () => {
  const page: CalculatorPage = {
    title: 'Reaction Rate Calculator',
    description: 'Calculate reaction rate from the rate constant, concentrations and reaction orders.',
    path: '/reaction-rate-calculator.html',
    category: 'scientific',
  };

  const rate = (a: number) => 2.5 * Math.pow(a, 1) * Math.pow(2, 1);

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<ReactionRateCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Reaction Rate Calculator' })).toBeDefined();
    expect(screen.getByText('Concentration A (M)')).toBeDefined();
    expect(screen.getByText('Reaction rate')).toBeDefined();
  });

  it('multiplies k by each concentration raised to its order', () => {
    const { container } = renderCalculatorPage(<ReactionRateCalculator />, page);
    expect(hero(container)).toBe(`${money(rate(3))} M/s`);
    expect(screen.getByText('Overall reaction order').nextElementSibling!.textContent).toBe(money(1 + 1));
    expect(screen.getByText('First-order half-life').nextElementSibling!.textContent).toBe(
      money(Math.LN2 / 2.5)
    );
  });

  it('scales linearly with concentration A at first order', () => {
    const { container } = renderCalculatorPage(<ReactionRateCalculator />, page);
    fireEvent.change(screen.getByLabelText('Concentration A (M)'), { target: { value: '4' } });
    expect(hero(container)).toBe(`${money(rate(4))} M/s`);
    expect(screen.getByText('Overall reaction order').nextElementSibling!.textContent).toBe(money(2));
  });
});

describe('StormWaterCalculator', () => {
  const page: CalculatorPage = {
    title: 'Storm Water Calculator',
    description: 'Estimate peak storm water runoff with the rational method from intensity, area and runoff coefficient.',
    path: '/storm-water-calculator.html',
    category: 'construction',
  };

  const peak = (coefficient: number) => (coefficient * 50 * 4) / 360;

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<StormWaterCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Storm Water Calculator' })).toBeDefined();
    expect(screen.getByText('Rainfall intensity (mm/hr)')).toBeDefined();
    expect(screen.getByText('Peak runoff')).toBeDefined();
  });

  it('applies the rational method CiA/360', () => {
    const { container } = renderCalculatorPage(<StormWaterCalculator />, page);
    const q = peak(0.6);
    expect(hero(container)).toBe(`${money(q)} m³/s`);
    expect(screen.getByText('Flow rate (L/s)').nextElementSibling!.textContent).toBe(money(q * 1000));
    expect(screen.getByText('Volume per hour (m³)').nextElementSibling!.textContent).toBe(
      money(q * 3600)
    );
    expect(screen.getByText('Effective intensity (mm/hr)').nextElementSibling!.textContent).toBe(
      money(0.6 * 50)
    );
  });

  it('rises with a more impervious coefficient', () => {
    const { container } = renderCalculatorPage(<StormWaterCalculator />, page);
    fireEvent.change(screen.getByLabelText('Runoff coefficient C'), { target: { value: '0.8' } });
    expect(hero(container)).toBe(`${money(peak(0.8))} m³/s`);
    expect(screen.getByText('Flow rate (L/s)').nextElementSibling!.textContent).toBe(
      money(peak(0.8) * 1000)
    );
  });
});

describe('CulvertDesignCalculator', () => {
  const page: CalculatorPage = {
    title: 'Culvert Design Calculator',
    description: 'Size culvert discharge from headwater depth using weir flow at the inlet.',
    path: '/culvert-design-calculator.html',
    category: 'construction',
  };

  const discharge = (head: number) => 3 * 2 * Math.pow(head, 1.5);

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<CulvertDesignCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Culvert Design Calculator' })).toBeDefined();
    expect(screen.getByText('Headwater depth (m)')).toBeDefined();
    expect(screen.getByText('Culvert discharge')).toBeDefined();
  });

  it('raises headwater to the 1.5 power', () => {
    const { container } = renderCalculatorPage(<CulvertDesignCalculator />, page);
    const q = discharge(1.2);
    expect(hero(container)).toBe(`${money(q)} m³/s`);
    expect(screen.getByText('Flow area (m²)').nextElementSibling!.textContent).toBe(money(2 * 1.2));
    expect(screen.getByText('Unit discharge (m²/s)').nextElementSibling!.textContent).toBe(money(q / 2));
    expect(screen.getByText('Inlet velocity (m/s)').nextElementSibling!.textContent).toBe(
      money(q / (2 * 1.2))
    );
  });

  it('grows sharply with a deeper head', () => {
    const { container } = renderCalculatorPage(<CulvertDesignCalculator />, page);
    fireEvent.change(screen.getByLabelText('Headwater depth (m)'), { target: { value: '2' } });
    expect(hero(container)).toBe(`${money(discharge(2))} m³/s`);
    expect(screen.getByText('Flow area (m²)').nextElementSibling!.textContent).toBe(money(2 * 2));
  });
});

describe('PavementDesignCalculator', () => {
  const page: CalculatorPage = {
    title: 'Pavement Design Calculator',
    description: 'Estimate required pavement thickness from design traffic and subgrade CBR values.',
    path: '/pavement-design-calculator.html',
    category: 'construction',
  };

  const required = (esals: number, cbr: number) => 10 + 5 * Math.log10(esals) + 150 / cbr;

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<PavementDesignCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Pavement Design Calculator' })).toBeDefined();
    expect(screen.getByText('Subgrade CBR (%)')).toBeDefined();
    expect(screen.getByText('Required thickness')).toBeDefined();
  });

  it('adds traffic and subgrade terms', () => {
    const { container } = renderCalculatorPage(<PavementDesignCalculator />, page);
    const need = required(10, 5);
    expect(hero(container)).toBe(`${money(need)} cm`);
    expect(screen.getByText('Thickness margin (cm)').nextElementSibling!.textContent).toBe(
      money(25 - need)
    );
    expect(screen.getByText('Structural index').nextElementSibling!.textContent).toBe(money(25 * 5));
  });

  it('needs less thickness on a stronger subgrade', () => {
    const { container } = renderCalculatorPage(<PavementDesignCalculator />, page);
    fireEvent.change(screen.getByLabelText('Subgrade CBR (%)'), { target: { value: '10' } });
    const need = required(10, 10);
    expect(hero(container)).toBe(`${money(need)} cm`);
    expect(screen.getByText('Thickness margin (cm)').nextElementSibling!.textContent).toBe(
      money(25 - need)
    );
  });
});

describe('IntersectionDesignCalculator', () => {
  const page: CalculatorPage = {
    title: 'Intersection Design Calculator',
    description: 'Check intersection capacity and level of service from lanes, saturation flow and peak volume.',
    path: '/intersection-design-calculator.html',
    category: 'construction',
  };

  const losFrom = (vc: number) => {
    const limits = [0.35, 0.55, 0.75, 0.9, 1];
    const index = limits.findIndex((limit) => vc <= limit) + 1;
    return index > 0 ? index : 6;
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<IntersectionDesignCalculator />, page);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Intersection Design Calculator' })
    ).toBeDefined();
    expect(screen.getByText('Saturation flow (pc/h/ln)')).toBeDefined();
    expect(screen.getByText('Volume to capacity')).toBeDefined();
  });

  it('divides volume by lanes times saturation flow', () => {
    renderCalculatorPage(<IntersectionDesignCalculator />, page);
    const capacity = 2 * 1900;
    const vc = 900 / capacity;
    expect(screen.getByText('Volume to capacity').nextElementSibling!.textContent).toBe(money(vc));
    expect(screen.getByText('Approach capacity (veh/h)').nextElementSibling!.textContent).toBe(
      money(capacity)
    );
    expect(screen.getByText('Level of service (1-6)').nextElementSibling!.textContent).toBe(
      money(losFrom(vc))
    );
    expect(screen.getByText('Capacity used (%)').nextElementSibling!.textContent).toBe(money(vc * 100));
  });

  it('drops the level of service as volume climbs', () => {
    renderCalculatorPage(<IntersectionDesignCalculator />, page);
    fireEvent.change(screen.getByLabelText('Peak hour volume (veh/h)'), { target: { value: '3000' } });
    const vc = 3000 / (2 * 1900);
    expect(screen.getByText('Volume to capacity').nextElementSibling!.textContent).toBe(money(vc));
    expect(screen.getByText('Level of service (1-6)').nextElementSibling!.textContent).toBe(
      money(losFrom(vc))
    );
  });
});

describe('TurningRadiusCalculator', () => {
  const page: CalculatorPage = {
    title: 'Turning Radius Calculator',
    description: 'Find turning circle radii from wheelbase, steering angle and vehicle width.',
    path: '/turning-radius-calculator.html',
    category: 'construction',
  };

  const turning = (angle: number) => 3 / Math.tan((angle * Math.PI) / 180);

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<TurningRadiusCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Turning Radius Calculator' })).toBeDefined();
    expect(screen.getByText('Wheelbase (m)')).toBeDefined();
    expect(screen.getByText('Centreline radius')).toBeDefined();
  });

  it('divides wheelbase by the tangent of the steering angle', () => {
    const { container } = renderCalculatorPage(<TurningRadiusCalculator />, page);
    const centre = turning(30);
    expect(hero(container)).toBe(`${money(centre)} m`);
    expect(screen.getByText('Outer radius (m)').nextElementSibling!.textContent).toBe(
      money(centre + 1.8 / 2)
    );
    expect(screen.getByText('Inner radius (m)').nextElementSibling!.textContent).toBe(
      money(centre - 1.8 / 2)
    );
    expect(screen.getByText('Turning diameter (m)').nextElementSibling!.textContent).toBe(
      money(centre * 2)
    );
  });

  it('tightens the circle with more steering lock', () => {
    const { container } = renderCalculatorPage(<TurningRadiusCalculator />, page);
    fireEvent.change(screen.getByLabelText('Steering angle (degrees)'), { target: { value: '45' } });
    expect(hero(container)).toBe(`${money(turning(45))} m`);
    expect(screen.getByText('Turning diameter (m)').nextElementSibling!.textContent).toBe(
      money(turning(45) * 2)
    );
  });
});

describe('StoppingDistanceCalculator', () => {
  const page: CalculatorPage = {
    title: 'Stopping Distance Calculator',
    description: 'Split stopping distance into reaction and braking components for any speed and road friction.',
    path: '/stopping-distance-calculator.html',
    category: 'construction',
  };

  const stopping = (speed: number) => {
    const reaction = 0.278 * speed * 2.5;
    const denominator = 254 * (0.7 + 0 / 100);
    const braking = (speed * speed) / denominator;
    return { reaction, braking, total: reaction + braking };
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<StoppingDistanceCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Stopping Distance Calculator' })).toBeDefined();
    expect(screen.getByText('Friction factor')).toBeDefined();
    expect(screen.getByText('Stopping distance')).toBeDefined();
  });

  it('adds reaction and braking distances', () => {
    const { container } = renderCalculatorPage(<StoppingDistanceCalculator />, page);
    const expected = stopping(100);
    expect(hero(container)).toBe(`${money(expected.total)} m`);
    expect(screen.getByText('Reaction distance (m)').nextElementSibling!.textContent).toBe(
      money(expected.reaction)
    );
    expect(screen.getByText('Braking distance (m)').nextElementSibling!.textContent).toBe(
      money(expected.braking)
    );
    expect(screen.getByText('Speed (m/s)').nextElementSibling!.textContent).toBe(money(100 / 3.6));
  });

  it('shortens the distance at lower speed', () => {
    const { container } = renderCalculatorPage(<StoppingDistanceCalculator />, page);
    fireEvent.change(screen.getByLabelText('Speed (km/h)'), { target: { value: '80' } });
    const expected = stopping(80);
    expect(hero(container)).toBe(`${money(expected.total)} m`);
    expect(screen.getByText('Reaction distance (m)').nextElementSibling!.textContent).toBe(
      money(expected.reaction)
    );
  });
});

describe('SightDistanceCalculator', () => {
  const page: CalculatorPage = {
    title: 'Sight Distance Calculator',
    description: 'Compare required stopping sight distance with what the road alignment actually provides.',
    path: '/sight-distance-calculator.html',
    category: 'construction',
  };

  const requiredSight = () => {
    const reaction = 0.278 * 80 * 2.5;
    const braking = (80 * 80) / (254 * 0.6);
    return { reaction, braking, required: reaction + braking };
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<SightDistanceCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Sight Distance Calculator' })).toBeDefined();
    expect(screen.getByText('Design speed (km/h)')).toBeDefined();
    expect(screen.getByText('Required sight distance')).toBeDefined();
  });

  it('compares required distance with available sight', () => {
    const { container } = renderCalculatorPage(<SightDistanceCalculator />, page);
    const expected = requiredSight();
    const margin = 120 - expected.required;
    expect(hero(container)).toBe(`${money(expected.required)} m`);
    expect(screen.getByText('Margin (m)').nextElementSibling!.textContent).toBe(money(margin));
    expect(screen.getByText('Adequate (1 = yes)').nextElementSibling!.textContent).toBe(
      money(margin >= 0 ? 1 : 0)
    );
  });

  it('flags a shortfall when sight is cut', () => {
    const { container } = renderCalculatorPage(<SightDistanceCalculator />, page);
    fireEvent.change(screen.getByLabelText('Available sight distance (m)'), { target: { value: '80' } });
    const expected = requiredSight();
    const margin = 80 - expected.required;
    expect(hero(container)).toBe(`${money(expected.required)} m`);
    expect(screen.getByText('Margin (m)').nextElementSibling!.textContent).toBe(money(margin));
    expect(screen.getByText('Adequate (1 = yes)').nextElementSibling!.textContent).toBe(
      money(margin >= 0 ? 1 : 0)
    );
  });
});

describe('SuperelevationCalculator', () => {
  const page: CalculatorPage = {
    title: 'Superelevation Calculator',
    description: 'Work out required superelevation from curve radius, design speed and side friction.',
    path: '/superelevation-calculator.html',
    category: 'construction',
  };

  const superElevation = (speed: number) => {
    const total = (speed * speed) / (127 * 150);
    return { total, percent: (total - 0.12) * 100, acceleration: total * 9.81 };
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<SuperelevationCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Superelevation Calculator' })).toBeDefined();
    expect(screen.getByText('Curve radius (m)')).toBeDefined();
    expect(screen.getByText('Required superelevation')).toBeDefined();
  });

  it('takes e out of the V²/127R requirement', () => {
    const { container } = renderCalculatorPage(<SuperelevationCalculator />, page);
    const expected = superElevation(60);
    expect(hero(container)).toBe(`${money(expected.percent)} %`);
    expect(screen.getByText('e + f requirement (%)').nextElementSibling!.textContent).toBe(
      money(expected.total * 100)
    );
    expect(screen.getByText('Centripetal acceleration (m/s²)').nextElementSibling!.textContent).toBe(
      money(expected.acceleration)
    );
    expect(screen.getByText('Side friction used (%)').nextElementSibling!.textContent).toBe(
      money(0.12 * 100)
    );
  });

  it('demands more banking at higher speed', () => {
    const { container } = renderCalculatorPage(<SuperelevationCalculator />, page);
    fireEvent.change(screen.getByLabelText('Design speed (km/h)'), { target: { value: '80' } });
    const expected = superElevation(80);
    expect(hero(container)).toBe(`${money(expected.percent)} %`);
    expect(screen.getByText('e + f requirement (%)').nextElementSibling!.textContent).toBe(
      money(expected.total * 100)
    );
  });
});

describe('CurveRadiusCalculator', () => {
  const page: CalculatorPage = {
    title: 'Curve Radius Calculator',
    description: 'Find the minimum horizontal curve radius from speed, superelevation and side friction.',
    path: '/curve-radius-calculator.html',
    category: 'construction',
  };

  const radiusFor = (speed: number) => {
    const combined = 6 / 100 + 0.14;
    const radius = (speed * speed) / (127 * combined);
    return { combined, radius, degree: 5729.57795 / radius, feet: radius * 3.28084 };
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<CurveRadiusCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Curve Radius Calculator' })).toBeDefined();
    expect(screen.getByText('Superelevation (%)')).toBeDefined();
    expect(screen.getByText('Minimum curve radius')).toBeDefined();
  });

  it('inverts the superelevation equation', () => {
    const { container } = renderCalculatorPage(<CurveRadiusCalculator />, page);
    const expected = radiusFor(80);
    expect(hero(container)).toBe(`${money(expected.radius)} m`);
    expect(screen.getByText('Combined e + f').nextElementSibling!.textContent).toBe(
      money(expected.combined)
    );
    expect(screen.getByText('Degree of curve (degrees)').nextElementSibling!.textContent).toBe(
      money(expected.degree)
    );
    expect(screen.getByText('Radius (ft)').nextElementSibling!.textContent).toBe(money(expected.feet));
  });

  it('shrinks the radius at lower speed', () => {
    const { container } = renderCalculatorPage(<CurveRadiusCalculator />, page);
    fireEvent.change(screen.getByLabelText('Design speed (km/h)'), { target: { value: '60' } });
    const expected = radiusFor(60);
    expect(hero(container)).toBe(`${money(expected.radius)} m`);
    expect(screen.getByText('Degree of curve (degrees)').nextElementSibling!.textContent).toBe(
      money(expected.degree)
    );
  });
});

describe('RoadGradeCalculator', () => {
  const page: CalculatorPage = {
    title: 'Road Grade Calculator',
    description: 'Convert rise and run into percentage grade, angle and slope ratio for roads and ramps.',
    path: '/road-grade-calculator.html',
    category: 'construction',
  };

  const grade = (rise: number) => (rise / 100) * 100;

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<RoadGradeCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Road Grade Calculator' })).toBeDefined();
    expect(screen.getByText('Rise (m)')).toBeDefined();
    expect(screen.getByText('Road grade')).toBeDefined();
  });

  it('turns rise over run into a percentage and angle', () => {
    const { container } = renderCalculatorPage(<RoadGradeCalculator />, page);
    const expectedGrade = grade(5);
    expect(hero(container)).toBe(`${money(expectedGrade)} %`);
    expect(screen.getByText('Angle (degrees)').nextElementSibling!.textContent).toBe(
      money((Math.atan2(5, 100) * 180) / Math.PI)
    );
    expect(screen.getByText('Run : rise ratio').nextElementSibling!.textContent).toBe(money(100 / 5));
    expect(screen.getByText('Cosine of grade').nextElementSibling!.textContent).toBe(
      money(1 / Math.sqrt(1 + Math.pow(expectedGrade / 100, 2)))
    );
  });

  it('steepens when the rise doubles', () => {
    const { container } = renderCalculatorPage(<RoadGradeCalculator />, page);
    fireEvent.change(screen.getByLabelText('Rise (m)'), { target: { value: '10' } });
    expect(hero(container)).toBe(`${money(grade(10))} %`);
    expect(screen.getByText('Run : rise ratio').nextElementSibling!.textContent).toBe(money(100 / 10));
  });
});

describe('EntropyCalculator', () => {
  const page: CalculatorPage = {
    title: 'Entropy Calculator',
    description: 'Compute entropy change when heating a mass from its start and end temperatures.',
    path: '/entropy-calculator.html',
    category: 'scientific',
  };

  const entropy = (end: number) => {
    const ratio = end / 300;
    const logTerm = Math.log(ratio);
    return { ratio, logTerm, deltaS: 2 * 4186 * logTerm, heat: 2 * 4186 * (end - 300) };
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<EntropyCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Entropy Calculator' })).toBeDefined();
    expect(screen.getByText('Start temperature (K)')).toBeDefined();
    expect(screen.getByText('Entropy change')).toBeDefined();
  });

  it('uses the log of the temperature ratio', () => {
    const { container } = renderCalculatorPage(<EntropyCalculator />, page);
    const expected = entropy(350);
    expect(hero(container)).toBe(`${money(expected.deltaS)} J/K`);
    expect(screen.getByText('ln(T₂/T₁)').nextElementSibling!.textContent).toBe(money(expected.logTerm));
    expect(screen.getByText('Heat transferred (J)').nextElementSibling!.textContent).toBe(
      money(expected.heat)
    );
    expect(screen.getByText('mc product (J/K)').nextElementSibling!.textContent).toBe(money(2 * 4186));
  });

  it('grows when the end temperature rises', () => {
    const { container } = renderCalculatorPage(<EntropyCalculator />, page);
    fireEvent.change(screen.getByLabelText('End temperature (K)'), { target: { value: '400' } });
    const expected = entropy(400);
    expect(hero(container)).toBe(`${money(expected.deltaS)} J/K`);
    expect(screen.getByText('Heat transferred (J)').nextElementSibling!.textContent).toBe(
      money(expected.heat)
    );
  });
});

describe('HeatCapacityCalculator', () => {
  const page: CalculatorPage = {
    title: 'Heat Capacity Calculator',
    description: 'Find heat capacity and the energy needed to raise a mass through a temperature change.',
    path: '/heat-capacity-calculator.html',
    category: 'scientific',
  };

  const heating = (deltaT: number) => {
    const capacity = 5 * 4186;
    const heat = capacity * deltaT;
    return { capacity, heat, heatKj: heat / 1000 };
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<HeatCapacityCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Heat Capacity Calculator' })).toBeDefined();
    expect(screen.getByText('Specific heat (J/kg·K)')).toBeDefined();
    expect(screen.getByText('Heat required')).toBeDefined();
  });

  it('multiplies mass, specific heat and temperature change', () => {
    const { container } = renderCalculatorPage(<HeatCapacityCalculator />, page);
    const expected = heating(20);
    expect(hero(container)).toBe(`${money(expected.heat)} J`);
    expect(screen.getByText('Heat capacity (J/K)').nextElementSibling!.textContent).toBe(
      money(expected.capacity)
    );
    expect(screen.getByText('Heat added (kJ)').nextElementSibling!.textContent).toBe(
      money(expected.heatKj)
    );
    expect(screen.getByText('ΔT applied (K)').nextElementSibling!.textContent).toBe(money(20));
  });

  it('doubles the heat when ΔT doubles', () => {
    const { container } = renderCalculatorPage(<HeatCapacityCalculator />, page);
    fireEvent.change(screen.getByLabelText('Temperature change (K)'), { target: { value: '40' } });
    const expected = heating(40);
    expect(hero(container)).toBe(`${money(expected.heat)} J`);
    expect(screen.getByText('Heat capacity (J/K)').nextElementSibling!.textContent).toBe(
      money(expected.capacity)
    );
  });
});

describe('ThermalConductivityCalculator', () => {
  const page: CalculatorPage = {
    title: 'Thermal Conductivity Calculator',
    description: 'Derive thermal conductivity from heat flow, thickness, area and temperature difference.',
    path: '/thermal-conductivity-calculator.html',
    category: 'scientific',
  };

  const conductivity = (power: number) => (power * 0.2) / (2 * 25);

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<ThermalConductivityCalculator />, page);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Thermal Conductivity Calculator' })
    ).toBeDefined();
    expect(screen.getByText('Heat flow rate (W)')).toBeDefined();
    expect(screen.getByText('Thermal conductivity')).toBeDefined();
  });

  it('applies Fourier’s steady-state law', () => {
    const { container } = renderCalculatorPage(<ThermalConductivityCalculator />, page);
    expect(hero(container)).toBe(`${money(conductivity(500))} W/m·K`);
    expect(screen.getByText('Heat flux (W/m²)').nextElementSibling!.textContent).toBe(money(500 / 2));
    expect(screen.getByText('Temperature gradient (K/m)').nextElementSibling!.textContent).toBe(
      money(25 / 0.2)
    );
    expect(screen.getByText('Thermal conductance (W/K)').nextElementSibling!.textContent).toBe(
      money(500 / 25)
    );
  });

  it('doubles conductivity when heat flow doubles', () => {
    const { container } = renderCalculatorPage(<ThermalConductivityCalculator />, page);
    fireEvent.change(screen.getByLabelText('Heat flow rate (W)'), { target: { value: '1000' } });
    expect(hero(container)).toBe(`${money(conductivity(1000))} W/m·K`);
    expect(screen.getByText('Heat flux (W/m²)').nextElementSibling!.textContent).toBe(money(1000 / 2));
  });
});

describe('HeatTransferCalculator', () => {
  const page: CalculatorPage = {
    title: 'Heat Transfer Calculator',
    description: 'Calculate steady heat flow through a surface from the overall coefficient and temperature difference.',
    path: '/heat-transfer-calculator.html',
    category: 'scientific',
  };

  const transfer = (deltaT: number) => {
    const rate = 15 * 10 * deltaT;
    return { rate, flux: 15 * deltaT, perHour: rate * 3.6, conductance: 15 * 10 };
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<HeatTransferCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Heat Transfer Calculator' })).toBeDefined();
    expect(screen.getByText('Surface area (m²)')).toBeDefined();
    expect(screen.getByText('Heat transfer rate')).toBeDefined();
  });

  it('multiplies U, area and temperature difference', () => {
    const { container } = renderCalculatorPage(<HeatTransferCalculator />, page);
    const expected = transfer(30);
    expect(hero(container)).toBe(`${money(expected.rate)} W`);
    expect(screen.getByText('Heat flux (W/m²)').nextElementSibling!.textContent).toBe(
      money(expected.flux)
    );
    expect(screen.getByText('Per hour (kJ/hr)').nextElementSibling!.textContent).toBe(
      money(expected.perHour)
    );
    expect(screen.getByText('UA conductance (W/K)').nextElementSibling!.textContent).toBe(
      money(expected.conductance)
    );
  });

  it('scales linearly with the temperature difference', () => {
    const { container } = renderCalculatorPage(<HeatTransferCalculator />, page);
    fireEvent.change(screen.getByLabelText('Temperature difference (K)'), { target: { value: '60' } });
    const expected = transfer(60);
    expect(hero(container)).toBe(`${money(expected.rate)} W`);
    expect(screen.getByText('Heat flux (W/m²)').nextElementSibling!.textContent).toBe(
      money(expected.flux)
    );
  });
});

describe('ThermalExpansionCalculator', () => {
  const page: CalculatorPage = {
    title: 'Thermal Expansion Calculator',
    description: 'Estimate linear and volumetric thermal expansion from the coefficient and temperature change.',
    path: '/thermal-expansion-calculator.html',
    category: 'scientific',
  };

  const expansion = (deltaT: number) => {
    const deltaL = 1 * 0.000012 * deltaT;
    const beta = 3 * 0.000012;
    return { deltaL, mm: deltaL * 1000, beta, deltaV: 1 * beta * deltaT };
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<ThermalExpansionCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Thermal Expansion Calculator' })).toBeDefined();
    expect(screen.getByText('Expansion coefficient (1/K)')).toBeDefined();
    expect(screen.getByText('Change in length')).toBeDefined();
  });

  it('multiplies length, coefficient and temperature change', () => {
    const { container } = renderCalculatorPage(<ThermalExpansionCalculator />, page);
    const expected = expansion(50);
    expect(hero(container)).toBe(`${money(expected.mm)} mm`);
    expect(screen.getByText('Change in length (m)').nextElementSibling!.textContent).toBe(
      money(expected.deltaL)
    );
    expect(screen.getByText('Volumetric coefficient (1/K)').nextElementSibling!.textContent).toBe(
      money(expected.beta)
    );
    expect(screen.getByText('Change in volume (L)').nextElementSibling!.textContent).toBe(
      money(expected.deltaV * 1000)
    );
  });

  it('streteps proportionally with temperature', () => {
    const { container } = renderCalculatorPage(<ThermalExpansionCalculator />, page);
    fireEvent.change(screen.getByLabelText('Temperature change (K)'), { target: { value: '100' } });
    const expected = expansion(100);
    expect(hero(container)).toBe(`${money(expected.mm)} mm`);
    expect(screen.getByText('Change in volume (L)').nextElementSibling!.textContent).toBe(
      money(expected.deltaV * 1000)
    );
  });
});

describe('BulkModulusCalculator', () => {
  const page: CalculatorPage = {
    title: 'Bulk Modulus Calculator',
    description: 'Turn applied pressure and volume reduction into the bulk modulus of a material.',
    path: '/bulk-modulus-calculator.html',
    category: 'scientific',
  };

  const bulk = (reduction: number) => {
    const strain = reduction / 100;
    const pressurePa = 10 * 1e6;
    const modulus = pressurePa / strain;
    return { strain, pressurePa, modulus, gpa: modulus / 1e9 };
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<BulkModulusCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Bulk Modulus Calculator' })).toBeDefined();
    expect(screen.getByText('Volume reduction (%)')).toBeDefined();
    expect(screen.getByText('Bulk modulus')).toBeDefined();
  });

  it('divides pressure by volumetric strain', () => {
    const { container } = renderCalculatorPage(<BulkModulusCalculator />, page);
    const expected = bulk(0.5);
    expect(hero(container)).toBe(`${money(expected.gpa)} GPa`);
    expect(screen.getByText('Bulk modulus (Pa)').nextElementSibling!.textContent).toBe(
      money(expected.modulus)
    );
    expect(screen.getByText('Volumetric strain').nextElementSibling!.textContent).toBe(
      money(expected.strain)
    );
    expect(screen.getByText('Applied pressure (Pa)').nextElementSibling!.textContent).toBe(
      money(expected.pressurePa)
    );
  });

  it('halves stiffness when compression doubles', () => {
    const { container } = renderCalculatorPage(<BulkModulusCalculator />, page);
    fireEvent.change(screen.getByLabelText('Volume reduction (%)'), { target: { value: '1' } });
    const expected = bulk(1);
    expect(hero(container)).toBe(`${money(expected.gpa)} GPa`);
    expect(screen.getByText('Volumetric strain').nextElementSibling!.textContent).toBe(
      money(expected.strain)
    );
  });
});

describe('ShearModulusCalculator', () => {
  const page: CalculatorPage = {
    title: 'Shear Modulus Calculator',
    description: 'Derive shear modulus from Young’s modulus and Poisson’s ratio with G = E / 2(1 + ν).',
    path: '/shear-modulus-calculator.html',
    category: 'scientific',
  };

  const shear = (poisson: number) => {
    const denominator = 2 * (1 + poisson);
    return { denominator, shear: 200 / denominator, mpa: (200 / denominator) * 1000 };
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<ShearModulusCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Shear Modulus Calculator' })).toBeDefined();
    expect(screen.getByText('Poisson’s ratio')).toBeDefined();
    expect(screen.getByText('Shear modulus')).toBeDefined();
  });

  it('divides E by 2(1 + ν)', () => {
    const { container } = renderCalculatorPage(<ShearModulusCalculator />, page);
    const expected = shear(0.3);
    expect(hero(container)).toBe(`${money(expected.shear)} GPa`);
    expect(screen.getByText('Shear modulus (MPa)').nextElementSibling!.textContent).toBe(
      money(expected.mpa)
    );
    expect(screen.getByText('Denominator 2(1+ν)').nextElementSibling!.textContent).toBe(
      money(expected.denominator)
    );
    expect(screen.getByText('E used in the relation (GPa)').nextElementSibling!.textContent).toBe(
      money(200)
    );
  });

  it('raises shear stiffness as Poisson’s ratio falls', () => {
    const { container } = renderCalculatorPage(<ShearModulusCalculator />, page);
    fireEvent.change(screen.getByLabelText('Poisson’s ratio'), { target: { value: '0.25' } });
    const expected = shear(0.25);
    expect(hero(container)).toBe(`${money(expected.shear)} GPa`);
    expect(screen.getByText('Denominator 2(1+ν)').nextElementSibling!.textContent).toBe(
      money(expected.denominator)
    );
  });
});

describe('PoissonsRatioCalculator', () => {
  const page: CalculatorPage = {
    title: 'Poisson’s Ratio Calculator',
    description: 'Calculate Poisson’s ratio from lateral and axial strain measurements.',
    path: '/poisson-s-ratio-calculator.html',
    category: 'scientific',
  };

  const poissonFrom = (lateral: number) => {
    const axial = 0.004;
    return {
      poisson: -(lateral / axial),
      magnitude: Math.abs(lateral / axial),
      volumeStrain: axial + 2 * lateral,
    };
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<PoissonsRatioCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Poisson’s Ratio Calculator' })).toBeDefined();
    expect(screen.getByText('Lateral strain')).toBeDefined();
    expect(screen.getByText('Poisson’s ratio')).toBeDefined();
  });

  it('negates the lateral over axial strain ratio', () => {
    const { container } = renderCalculatorPage(<PoissonsRatioCalculator />, page);
    const expected = poissonFrom(-0.001);
    expect(hero(container)).toBe(money(expected.poisson));
    expect(screen.getByText('Strain ratio').nextElementSibling!.textContent).toBe(
      money(expected.magnitude)
    );
    expect(screen.getByText('Volumetric strain').nextElementSibling!.textContent).toBe(
      money(expected.volumeStrain)
    );
  });

  it('rises when lateral contraction grows', () => {
    const { container } = renderCalculatorPage(<PoissonsRatioCalculator />, page);
    fireEvent.change(screen.getByLabelText('Lateral strain'), { target: { value: '-0.002' } });
    const expected = poissonFrom(-0.002);
    expect(hero(container)).toBe(money(expected.poisson));
    expect(screen.getByText('Strain ratio').nextElementSibling!.textContent).toBe(
      money(expected.magnitude)
    );
  });
});

describe('YoungsModulusCalculator', () => {
  const page: CalculatorPage = {
    title: 'Young’s Modulus Calculator',
    description: 'Find Young’s modulus as stress divided by strain in the elastic range.',
    path: '/young-s-modulus-calculator.html',
    category: 'scientific',
  };

  const modulus = (strain: number) => {
    const stressPa = 250 * 1e6;
    const pa = stressPa / strain;
    return { stressPa, pa, mpa: 250 / strain, gpa: pa / 1e9 };
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<YoungsModulusCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Young’s Modulus Calculator' })).toBeDefined();
    expect(screen.getByText('Stress (MPa)')).toBeDefined();
    expect(screen.getByText('Young’s modulus')).toBeDefined();
  });

  it('divides stress by strain', () => {
    const { container } = renderCalculatorPage(<YoungsModulusCalculator />, page);
    const expected = modulus(0.00125);
    expect(hero(container)).toBe(`${money(expected.gpa)} GPa`);
    expect(screen.getByText('Modulus (MPa)').nextElementSibling!.textContent).toBe(money(expected.mpa));
    expect(screen.getByText('Stress (Pa)').nextElementSibling!.textContent).toBe(money(expected.stressPa));
    expect(screen.getByText('Strain (%)').nextElementSibling!.textContent).toBe(money(0.00125 * 100));
  });

  it('stiffens as strain falls', () => {
    const { container } = renderCalculatorPage(<YoungsModulusCalculator />, page);
    fireEvent.change(screen.getByLabelText('Axial strain'), { target: { value: '0.001' } });
    const expected = modulus(0.001);
    expect(hero(container)).toBe(`${money(expected.gpa)} GPa`);
    expect(screen.getByText('Modulus (MPa)').nextElementSibling!.textContent).toBe(money(expected.mpa));
  });
});

describe('StressStrainCalculator', () => {
  const page: CalculatorPage = {
    title: 'Stress-Strain Calculator',
    description: 'Convert force, area and extension into stress, strain, modulus and strain energy.',
    path: '/stress-strain-calculator.html',
    category: 'scientific',
  };

  const loading = (extension: number) => {
    const stress = 50000 / 250;
    const strain = extension / 100;
    return { stress, strain, modulus: stress / strain, energy: 0.5 * stress * 1e6 * strain * 0.001 };
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<StressStrainCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Stress-Strain Calculator' })).toBeDefined();
    expect(screen.getByText('Cross-section area (mm²)')).toBeDefined();
    expect(screen.getByText('Engineering stress')).toBeDefined();
  });

  it('computes stress, strain and elastic modulus', () => {
    const { container } = renderCalculatorPage(<StressStrainCalculator />, page);
    const expected = loading(0.5);
    expect(hero(container)).toBe(`${money(expected.stress)} MPa`);
    expect(screen.getByText('Strain').nextElementSibling!.textContent).toBe(money(expected.strain));
    expect(screen.getByText('Young’s modulus (MPa)').nextElementSibling!.textContent).toBe(
      money(expected.modulus)
    );
    expect(screen.getByText('Strain energy density (kJ/m³)').nextElementSibling!.textContent).toBe(
      money(expected.energy)
    );
  });

  it('softens the apparent modulus as extension doubles', () => {
    const { container } = renderCalculatorPage(<StressStrainCalculator />, page);
    fireEvent.change(screen.getByLabelText('Extension (mm)'), { target: { value: '1' } });
    const expected = loading(1);
    expect(hero(container)).toBe(`${money(expected.stress)} MPa`);
    expect(screen.getByText('Young’s modulus (MPa)').nextElementSibling!.textContent).toBe(
      money(expected.modulus)
    );
  });
});

describe('KirchhoffLawCalculator', () => {
  const page: CalculatorPage = {
    title: "Kirchhoff's Law Calculator",
    description: 'Solve a single-loop circuit for current, power and voltage balance using Kirchhoff’s laws.',
    path: '/kirchhoff-s-law-calculator.html',
    category: 'scientific',
  };

  const loop = (v2: number) => {
    const netEmf = 12 - v2;
    const current = netEmf / 7;
    return { netEmf, current, power: current * current * 7 };
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<KirchhoffLawCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: "Kirchhoff's Law Calculator" })).toBeDefined();
    expect(screen.getByText('Loop resistance (Ω)')).toBeDefined();
    expect(screen.getByText('Loop current')).toBeDefined();
  });

  it('divides the net EMF by the loop resistance', () => {
    const { container } = renderCalculatorPage(<KirchhoffLawCalculator />, page);
    const expected = loop(5);
    expect(hero(container)).toBe(`${money(expected.current)} A`);
    expect(screen.getByText('Net EMF (V)').nextElementSibling!.textContent).toBe(money(expected.netEmf));
    expect(screen.getByText('Power dissipated (W)').nextElementSibling!.textContent).toBe(
      money(expected.power)
    );
    expect(screen.getByText('KVL residual (V)').nextElementSibling!.textContent).toBe(
      money(12 - 5 - expected.current * 7)
    );
  });

  it('raises current when the opposing source falls', () => {
    const { container } = renderCalculatorPage(<KirchhoffLawCalculator />, page);
    fireEvent.change(screen.getByLabelText('Source V2 (V)'), { target: { value: '2' } });
    const expected = loop(2);
    expect(hero(container)).toBe(`${money(expected.current)} A`);
    expect(screen.getByText('Net EMF (V)').nextElementSibling!.textContent).toBe(money(expected.netEmf));
  });
});

describe('WheatstoneBridgeCalculator', () => {
  const page: CalculatorPage = {
    title: 'Wheatstone Bridge Calculator',
    description: 'Find bridge output voltage and imbalance from four resistors and the supply voltage.',
    path: '/wheatstone-bridge-calculator.html',
    category: 'scientific',
  };

  const bridge = (r4: number) => {
    const ratio1 = 120 / 180;
    const ratio2 = 220 / r4;
    const output = 10 * (r4 / (220 + r4) - 180 / (120 + 180));
    return { ratio1, ratio2, output, imbalance: ratio1 - ratio2 };
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<WheatstoneBridgeCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Wheatstone Bridge Calculator' })).toBeDefined();
    expect(screen.getByText('Resistor R3 (Ω)')).toBeDefined();
    expect(screen.getByText('Bridge output')).toBeDefined();
  });

  it('compares the two resistor ratios against the supply', () => {
    const { container } = renderCalculatorPage(<WheatstoneBridgeCalculator />, page);
    const expected = bridge(200);
    expect(hero(container)).toBe(`${money(expected.output)} V`);
    expect(screen.getByText('R1 / R2 ratio').nextElementSibling!.textContent).toBe(money(expected.ratio1));
    expect(screen.getByText('R3 / R4 ratio').nextElementSibling!.textContent).toBe(money(expected.ratio2));
    expect(screen.getByText('Ratio imbalance').nextElementSibling!.textContent).toBe(
      money(expected.imbalance)
    );
    expect(screen.getByText('Balanced (1 = yes)').nextElementSibling!.textContent).toBe(money(0));
  });

  it('moves the output when R4 changes', () => {
    const { container } = renderCalculatorPage(<WheatstoneBridgeCalculator />, page);
    fireEvent.change(screen.getByLabelText('Resistor R4 (Ω)'), { target: { value: '270' } });
    const expected = bridge(270);
    expect(hero(container)).toBe(`${money(expected.output)} V`);
    expect(screen.getByText('R3 / R4 ratio').nextElementSibling!.textContent).toBe(money(expected.ratio2));
  });
});

describe('VoltageDividerCalculator', () => {
  const page: CalculatorPage = {
    title: 'Voltage Divider Calculator',
    description: 'Calculate output voltage, current and power for a two-resistor voltage divider.',
    path: '/voltage-divider-calculator.html',
    category: 'scientific',
  };

  const divider = (r2: number) => {
    const total = 1000 + r2;
    const vout = (12 * r2) / total;
    const current = 12 / total;
    return { total, vout, current, power: 12 * current, acrossR1: 12 - vout };
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<VoltageDividerCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Voltage Divider Calculator' })).toBeDefined();
    expect(screen.getByText('Top resistor R1 (Ω)')).toBeDefined();
    expect(screen.getByText('Output voltage')).toBeDefined();
  });

  it('scales the input voltage by R2 over the total', () => {
    const { container } = renderCalculatorPage(<VoltageDividerCalculator />, page);
    const expected = divider(2000);
    expect(hero(container)).toBe(`${money(expected.vout)} V`);
    expect(screen.getByText('Total resistance (Ω)').nextElementSibling!.textContent).toBe(
      money(expected.total)
    );
    expect(screen.getByText('Voltage across R1 (V)').nextElementSibling!.textContent).toBe(
      money(expected.acrossR1)
    );
    expect(screen.getByText('Source power (W)').nextElementSibling!.textContent).toBe(
      money(expected.power)
    );
  });

  it('lowers the output when R2 shrinks', () => {
    const { container } = renderCalculatorPage(<VoltageDividerCalculator />, page);
    fireEvent.change(screen.getByLabelText('Bottom resistor R2 (Ω)'), { target: { value: '1000' } });
    const expected = divider(1000);
    expect(hero(container)).toBe(`${money(expected.vout)} V`);
    expect(screen.getByText('Total resistance (Ω)').nextElementSibling!.textContent).toBe(
      money(expected.total)
    );
  });
});

describe('CurrentDividerCalculator', () => {
  const page: CalculatorPage = {
    title: 'Current Divider Calculator',
    description: 'Split a total current between two parallel branches and find the branch voltage.',
    path: '/current-divider-calculator.html',
    category: 'scientific',
  };

  const divider = (r1: number) => {
    const i1 = (10 * 100) / (r1 + 100);
    const i2 = 10 - i1;
    const equivalent = (r1 * 100) / (r1 + 100);
    return { i1, i2, equivalent, voltage: 10 * equivalent };
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<CurrentDividerCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Current Divider Calculator' })).toBeDefined();
    expect(screen.getByText('Total current (A)')).toBeDefined();
    expect(screen.getByText('Current through R1')).toBeDefined();
  });

  it('sends half the current down equal branches', () => {
    const { container } = renderCalculatorPage(<CurrentDividerCalculator />, page);
    const expected = divider(100);
    expect(hero(container)).toBe(`${money(expected.i1)} A`);
    expect(screen.getByText('Current through R2 (A)').nextElementSibling!.textContent).toBe(
      money(expected.i2)
    );
    expect(screen.getByText('Equivalent resistance (Ω)').nextElementSibling!.textContent).toBe(
      money(expected.equivalent)
    );
    expect(screen.getByText('Branch voltage (V)').nextElementSibling!.textContent).toBe(
      money(expected.voltage)
    );
  });

  it('favours the lower resistance branch', () => {
    const { container } = renderCalculatorPage(<CurrentDividerCalculator />, page);
    fireEvent.change(screen.getByLabelText('Branch R1 (Ω)'), { target: { value: '50' } });
    const expected = divider(50);
    expect(hero(container)).toBe(`${money(expected.i1)} A`);
    expect(screen.getByText('Current through R2 (A)').nextElementSibling!.textContent).toBe(
      money(expected.i2)
    );
  });
});

describe('VoltageDropCalculator', () => {
  const page: CalculatorPage = {
    title: 'Voltage Drop Calculator',
    description: 'Estimate cable voltage drop and power loss from current, length, area and resistivity.',
    path: '/voltage-drop-calculator.html',
    category: 'scientific',
  };

  const dropFor = (current: number) => {
    const resistance = (0.0175 * (2 * 10)) / 2.5;
    const drop = current * resistance;
    return {
      resistance,
      drop,
      loss: current * current * resistance,
      percent: (drop / 12) * 100,
      load: 12 - drop,
    };
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<VoltageDropCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Voltage Drop Calculator' })).toBeDefined();
    expect(screen.getByText('Conductor area (mm²)')).toBeDefined();
    expect(screen.getByText('Voltage drop')).toBeDefined();
  });

  it('doubles conductor length inside the resistance term', () => {
    const { container } = renderCalculatorPage(<VoltageDropCalculator />, page);
    const expected = dropFor(10);
    expect(hero(container)).toBe(`${money(expected.drop)} V`);
    expect(screen.getByText('Conductor resistance (Ω)').nextElementSibling!.textContent).toBe(
      money(expected.resistance)
    );
    expect(screen.getByText('Power lost in cable (W)').nextElementSibling!.textContent).toBe(
      money(expected.loss)
    );
    expect(screen.getByText('Voltage at load (V)').nextElementSibling!.textContent).toBe(
      money(expected.load)
    );
  });

  it('scales drop linearly with current', () => {
    const { container } = renderCalculatorPage(<VoltageDropCalculator />, page);
    fireEvent.change(screen.getByLabelText('Current (A)'), { target: { value: '20' } });
    const expected = dropFor(20);
    expect(hero(container)).toBe(`${money(expected.drop)} V`);
    expect(screen.getByText('Power lost in cable (W)').nextElementSibling!.textContent).toBe(
      money(expected.loss)
    );
  });
});

describe('PowerElectricalCalculator', () => {
  const page: CalculatorPage = {
    title: 'Power Electrical Calculator',
    description: 'Work out real, apparent and reactive power from voltage, current and power factor.',
    path: '/power-electrical-calculator.html',
    category: 'scientific',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<PowerElectricalCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Power Electrical Calculator' })).toBeDefined();
    expect(screen.getByText('Power factor')).toBeDefined();
    expect(screen.getByText('Real power')).toBeDefined();
  });

  it('multiplies voltage, current and power factor', () => {
    const { container } = renderCalculatorPage(<PowerElectricalCalculator />, page);
    const apparent = 230 * 10;
    const real = apparent * 0.9;
    const reactive = Math.sqrt(apparent * apparent - real * real);
    expect(hero(container)).toBe(`${money(real)} W`);
    expect(screen.getByText('Apparent power (VA)').nextElementSibling!.textContent).toBe(
      money(apparent)
    );
    expect(screen.getByText('Reactive power (VAR)').nextElementSibling!.textContent).toBe(
      money(reactive)
    );
    expect(screen.getByText('Power factor used').nextElementSibling!.textContent).toBe(money(0.9));
  });

  it('applies the √3 factor in three phase', () => {
    const { container } = renderCalculatorPage(<PowerElectricalCalculator />, page);
    fireEvent.click(screen.getByRole('radio', { name: 'Three phase' }));
    const apparent = Math.sqrt(3) * 230 * 10;
    const real = apparent * 0.9;
    expect(hero(container)).toBe(`${money(real)} W`);
    expect(screen.getByText('Apparent power (VA)').nextElementSibling!.textContent).toBe(
      money(apparent)
    );
  });
});

describe('OhmsLawCalculator', () => {
  const page: CalculatorPage = {
    title: "Ohm's Law Calculator",
    description: 'Calculate current, power and conductance from voltage and resistance with Ohm’s law.',
    path: '/ohm-s-law-calculator.html',
    category: 'scientific',
  };

  const ohms = (resistance: number) => {
    const current = 10 / resistance;
    return { current, power: 10 * current, conductance: 1 / resistance };
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<OhmsLawCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: "Ohm's Law Calculator" })).toBeDefined();
    expect(screen.getByText('Resistance (Ω)')).toBeDefined();
    expect(screen.getByText('Current')).toBeDefined();
  });

  it('divides voltage by resistance', () => {
    const { container } = renderCalculatorPage(<OhmsLawCalculator />, page);
    const expected = ohms(5);
    expect(hero(container)).toBe(`${money(expected.current)} A`);
    expect(screen.getByText('Power (W)').nextElementSibling!.textContent).toBe(money(expected.power));
    expect(screen.getByText('Conductance (S)').nextElementSibling!.textContent).toBe(
      money(expected.conductance)
    );
    expect(screen.getByText('Voltage across load (V)').nextElementSibling!.textContent).toBe(
      money(expected.current * 5)
    );
  });

  it('halves the current when resistance doubles', () => {
    const { container } = renderCalculatorPage(<OhmsLawCalculator />, page);
    fireEvent.change(screen.getByLabelText('Resistance (Ω)'), { target: { value: '10' } });
    const expected = ohms(10);
    expect(hero(container)).toBe(`${money(expected.current)} A`);
    expect(screen.getByText('Power (W)').nextElementSibling!.textContent).toBe(money(expected.power));
  });
});

describe('ElectricalInductanceCalculator', () => {
  const page: CalculatorPage = {
    title: 'Electrical Inductance Calculator',
    description: 'Find inductive reactance and stored energy from inductance, frequency and current.',
    path: '/electrical-inductance-calculator.html',
    category: 'scientific',
  };

  const inductive = (frequency: number) => {
    const henries = 100 / 1000;
    const omega = 2 * Math.PI * frequency;
    return { henries, omega, reactance: omega * henries, energy: 0.5 * henries * 2 * 2 };
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<ElectricalInductanceCalculator />, page);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Electrical Inductance Calculator' })
    ).toBeDefined();
    expect(screen.getByText('Inductance (mH)')).toBeDefined();
    expect(screen.getByText('Inductive reactance')).toBeDefined();
  });

  it('multiplies angular frequency by inductance', () => {
    const { container } = renderCalculatorPage(<ElectricalInductanceCalculator />, page);
    const expected = inductive(50);
    expect(hero(container)).toBe(`${money(expected.reactance)} Ω`);
    expect(screen.getByText('Inductance (H)').nextElementSibling!.textContent).toBe(
      money(expected.henries)
    );
    expect(screen.getByText('Angular frequency (rad/s)').nextElementSibling!.textContent).toBe(
      money(expected.omega)
    );
    expect(screen.getByText('Energy stored (J)').nextElementSibling!.textContent).toBe(
      money(expected.energy)
    );
  });

  it('rises with frequency', () => {
    const { container } = renderCalculatorPage(<ElectricalInductanceCalculator />, page);
    fireEvent.change(screen.getByLabelText('Frequency (Hz)'), { target: { value: '60' } });
    const expected = inductive(60);
    expect(hero(container)).toBe(`${money(expected.reactance)} Ω`);
    expect(screen.getByText('Angular frequency (rad/s)').nextElementSibling!.textContent).toBe(
      money(expected.omega)
    );
  });
});

describe('ElectricalCapacitanceCalculator', () => {
  const page: CalculatorPage = {
    title: 'Electrical Capacitance Calculator',
    description: 'Find capacitive reactance and stored energy from capacitance, frequency and voltage.',
    path: '/electrical-capacitance-calculator.html',
    category: 'scientific',
  };

  const f6 = (n: number) =>
    n.toLocaleString('en-US', { minimumFractionDigits: 6, maximumFractionDigits: 6 });

  const capacitive = (frequency: number) => {
    const farads = 100 * 1e-6;
    const omega = 2 * Math.PI * frequency;
    return { farads, omega, reactance: 1 / (omega * farads), energy: 0.5 * farads * 12 * 12 };
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<ElectricalCapacitanceCalculator />, page);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Electrical Capacitance Calculator' })
    ).toBeDefined();
    expect(screen.getByText('Capacitance (µF)')).toBeDefined();
    expect(screen.getByText('Capacitive reactance')).toBeDefined();
  });

  it('inverts omega times capacitance', () => {
    const { container } = renderCalculatorPage(<ElectricalCapacitanceCalculator />, page);
    const expected = capacitive(50);
    expect(hero(container)).toBe(`${money(expected.reactance)} Ω`);
    expect(screen.getByText('Capacitance (F)').nextElementSibling!.textContent).toBe(f6(expected.farads));
    expect(screen.getByText('Angular frequency (rad/s)').nextElementSibling!.textContent).toBe(
      money(expected.omega)
    );
    expect(screen.getByText('Energy stored (J)').nextElementSibling!.textContent).toBe(
      f6(expected.energy)
    );
  });

  it('falls as frequency doubles', () => {
    const { container } = renderCalculatorPage(<ElectricalCapacitanceCalculator />, page);
    fireEvent.change(screen.getByLabelText('Frequency (Hz)'), { target: { value: '100' } });
    const expected = capacitive(100);
    expect(hero(container)).toBe(`${money(expected.reactance)} Ω`);
    expect(screen.getByText('Energy stored (J)').nextElementSibling!.textContent).toBe(
      f6(expected.energy)
    );
  });
});

describe('ElectricalResistanceCalculator', () => {
  const page: CalculatorPage = {
    title: 'Electrical Resistance Calculator',
    description: 'Derive conductor resistance from resistivity, length and cross-sectional area.',
    path: '/electrical-resistance-calculator.html',
    category: 'scientific',
  };

  const f8 = (n: number) =>
    n.toLocaleString('en-US', { minimumFractionDigits: 8, maximumFractionDigits: 8 });

  const conductor = (length: number) => {
    const resistance = (0.0175 * length) / 1.5;
    return {
      resistance,
      perMetre: 0.0175 / 1.5,
      conductance: 1 / resistance,
      resistivityM: 0.0175 * 1e-6,
    };
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<ElectricalResistanceCalculator />, page);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Electrical Resistance Calculator' })
    ).toBeDefined();
    expect(screen.getByText('Cross-section (mm²)')).toBeDefined();
    expect(screen.getByText('Electrical resistance')).toBeDefined();
  });

  it('applies R = ρL/A', () => {
    const { container } = renderCalculatorPage(<ElectricalResistanceCalculator />, page);
    const expected = conductor(10);
    expect(hero(container)).toBe(`${money(expected.resistance)} Ω`);
    expect(screen.getByText('Resistance per metre (Ω/m)').nextElementSibling!.textContent).toBe(
      money(expected.perMetre)
    );
    expect(screen.getByText('Conductance (S)').nextElementSibling!.textContent).toBe(
      money(expected.conductance)
    );
    expect(screen.getByText('Resistivity (Ω·m)').nextElementSibling!.textContent).toBe(
      f8(expected.resistivityM)
    );
  });

  it('doubles with length', () => {
    const { container } = renderCalculatorPage(<ElectricalResistanceCalculator />, page);
    fireEvent.change(screen.getByLabelText('Length (m)'), { target: { value: '20' } });
    const expected = conductor(20);
    expect(hero(container)).toBe(`${money(expected.resistance)} Ω`);
    expect(screen.getByText('Conductance (S)').nextElementSibling!.textContent).toBe(
      money(expected.conductance)
    );
  });
});
