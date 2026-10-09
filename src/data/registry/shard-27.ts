import { lazy } from 'react';
import type { CalculatorDef } from './types';

export const SHARD_27: CalculatorDef[] = [
  {
    id: 'ship-stability-calculator',
    title: 'Ship Stability Calculator',
    path: '/ship-stability-calculator.html',
    description:
      'Assess a ship’s transverse stability from hull data, calculating metacentric height, righting lever and natural roll period.',
    category: 'construction',
    keywords: ['ship stability', 'metacentric height', 'gm', 'righting lever', 'roll period', 'naval architecture'],
    component: lazy(() => import('../../components/calculators/ShipStabilityCalculator')),
  },
  {
    id: 'swell-calculator',
    title: 'Swell Calculator',
    path: '/swell-calculator.html',
    description:
      'Convert swell period and water depth into wavelength, celerity and group speed using the linear wave dispersion relation.',
    category: 'construction',
    keywords: ['swell', 'wavelength', 'wave celerity', 'dispersion relation', 'group speed', 'ocean waves'],
    component: lazy(() => import('../../components/calculators/SwellCalculator')),
  },
  {
    id: 'wave-height-calculator',
    title: 'Wave Height Calculator',
    path: '/wave-height-calculator.html',
    description:
      'Estimate fetch-limited significant and maximum wave height plus peak period from wind speed and fetch length using SPM growth laws.',
    category: 'construction',
    keywords: ['wave height', 'significant wave height', 'fetch', 'wind waves', 'peak period', 'sea state'],
    component: lazy(() => import('../../components/calculators/WaveHeightCalculator')),
  },
  {
    id: 'current-speed-calculator',
    title: 'Current Speed Calculator',
    path: '/current-speed-calculator.html',
    description:
      'Combine vessel speed, heading and tidal current vectors to get speed over ground, course made good and drift rate.',
    category: 'construction',
    keywords: ['current speed', 'set and drift', 'speed over ground', 'tidal current', 'dead reckoning', 'navigation'],
    component: lazy(() => import('../../components/calculators/CurrentSpeedCalculator')),
  },
  {
    id: 'pressure-altitude-calculator',
    title: 'Pressure Altitude Calculator',
    path: '/pressure-altitude-calculator.html',
    description:
      'Convert altimeter setting to pressure altitude in feet and metres, with the pressure offset from the standard atmosphere (29.92 inHg).',
    category: 'construction',
    keywords: ['pressure altitude', 'altimeter setting', 'qnh', 'barometric pressure', 'flight level', 'aviation'],
    component: lazy(() => import('../../components/calculators/PressureAltitudeCalculator')),
  },
  {
    id: 'density-altitude-calculator',
    title: 'Density Altitude Calculator',
    path: '/density-altitude-calculator.html',
    description:
      'Calculate density altitude from altimeter setting, outside air temperature and humidity — essential for takeoff performance planning.',
    category: 'construction',
    keywords: ['density altitude', 'altimeter setting', 'oat', 'humidity', 'takeoff performance', 'aviation'],
    component: lazy(() => import('../../components/calculators/DensityAltitudeCalculator')),
  },
  {
    id: 'mach-number-calculator',
    title: 'Mach Number Calculator',
    path: '/mach-number-calculator.html',
    description:
      'Turn true airspeed and air temperature into Mach number, speed of sound and equivalent airspeed for high-altitude flight planning.',
    category: 'construction',
    keywords: ['mach number', 'true airspeed', 'speed of sound', 'sonic', 'transonic', 'aviation'],
    component: lazy(() => import('../../components/calculators/MachNumberCalculator')),
  },
  {
    id: 'indicated-airspeed-calculator',
    title: 'Indicated Airspeed Calculator',
    path: '/indicated-airspeed-calculator.html',
    description:
      'Convert true airspeed to indicated and equivalent airspeed using the density ratio at a given static pressure and temperature.',
    category: 'construction',
    keywords: ['indicated airspeed', 'ias', 'equivalent airspeed', 'density ratio', 'pitot static', 'aviation'],
    component: lazy(() => import('../../components/calculators/IndicatedAirspeedCalculator')),
  },
  {
    id: 'true-airspeed-calculator',
    title: 'True Airspeed Calculator',
    path: '/true-airspeed-calculator.html',
    description:
      'Convert indicated airspeed to true airspeed using ambient air density, with Mach number and density ratio outputs.',
    category: 'construction',
    keywords: ['true airspeed', 'tas', 'indicated airspeed', 'density ratio', 'flight planning', 'aviation'],
    component: lazy(() => import('../../components/calculators/TrueAirspeedCalculator')),
  },
  {
    id: 'ground-speed-calculator',
    title: 'Ground Speed Calculator',
    path: '/ground-speed-calculator.html',
    description:
      'Resolve true airspeed, heading and wind into ground speed, drift angle, headwind component and estimated time enroute.',
    category: 'construction',
    keywords: ['ground speed', 'wind triangle', 'drift angle', 'headwind', 'crosswind', 'flight planning'],
    component: lazy(() => import('../../components/calculators/GroundSpeedCalculator')),
  },
];
