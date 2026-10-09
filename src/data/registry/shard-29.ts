import { lazy } from 'react';
import type { CalculatorDef } from './types';

export const SHARD_29: CalculatorDef[] = [
  {
    id: 'elliptical-distance-calculator',
    title: 'Elliptical Distance Calculator',
    path: '/elliptical-distance-calculator.html',
    description:
      'Turn stride length, strides per minute and workout time into distance, average speed and calories for any elliptical session.',
    category: 'fitness',
    keywords: ['elliptical', 'stride', 'distance', 'workout', 'cardio'],
    component: lazy(() => import('../../components/calculators/EllipticalDistanceCalculator')),
  },
  {
    id: 'treadmill-distance-calculator',
    title: 'Treadmill Distance Calculator',
    path: '/treadmill-distance-calculator.html',
    description:
      'Convert treadmill speed, duration and incline into distance covered, elevation gained and pace in kilometres or miles.',
    category: 'fitness',
    keywords: ['treadmill', 'incline', 'pace', 'distance', 'running'],
    component: lazy(() => import('../../components/calculators/TreadmillDistanceCalculator')),
  },
  {
    id: 'livestock-feed-calculator',
    title: 'Livestock Feed Calculator',
    path: '/livestock-feed-calculator.html',
    description:
      'Estimate daily intake, total feed required and feed cost for a group of animals over any feeding period, waste allowance included.',
    category: 'health',
    keywords: ['livestock feed', 'dry matter', 'feed cost', 'ration', 'cattle'],
    component: lazy(() => import('../../components/calculators/LivestockFeedCalculator')),
  },
  {
    id: 'horse-weight-calculator',
    title: 'Horse Weight Calculator',
    path: '/horse-weight-calculator.html',
    description:
      "Estimate a horse's body weight from heart girth and body length with the standard livestock tape formula, in kilograms or pounds.",
    category: 'health',
    keywords: ['horse weight', 'heart girth', 'body length', 'livestock', 'forage'],
    component: lazy(() => import('../../components/calculators/HorseWeightCalculator')),
  },
  {
    id: 'cat-age-calculator',
    title: 'Cat Age Calculator',
    path: '/cat-age-calculator.html',
    description:
      "Convert a cat's age in years or months into human years using the classic veterinary rule or the modern logarithmic formula.",
    category: 'health',
    keywords: ['cat age', 'cat years', 'kitten', 'senior cat', 'pet age'],
    component: lazy(() => import('../../components/calculators/CatAgeCalculator')),
  },
  {
    id: 'map-scale-calculator',
    title: 'Map Scale Calculator',
    path: '/map-scale-calculator.html',
    description:
      'Convert map distance into real ground distance for any cartographic scale, and see how much ground one map centimetre covers.',
    category: 'standard',
    keywords: ['map scale', 'cartography', 'scale ratio', 'distance', 'surveying'],
    component: lazy(() => import('../../components/calculators/MapScaleCalculator')),
  },
  {
    id: 'coordinate-distance-calculator',
    title: 'Coordinate Distance Calculator',
    path: '/coordinate-distance-calculator.html',
    description:
      'Find the straight-line distance, midpoint, slope and angle between two Cartesian coordinates, plus the Manhattan distance.',
    category: 'standard',
    keywords: ['coordinate distance', 'distance formula', 'midpoint', 'geometry', 'plane'],
    component: lazy(() => import('../../components/calculators/CoordinateDistanceCalculator')),
  },
  {
    id: 'latitude-longitude-calculator',
    title: 'Latitude Longitude Calculator',
    path: '/latitude-longitude-calculator.html',
    description:
      'Convert decimal latitude and longitude into degrees, minutes and seconds, with distances from the equator and prime meridian.',
    category: 'standard',
    keywords: ['latitude', 'longitude', 'decimal degrees', 'coordinates', 'dms'],
    component: lazy(() => import('../../components/calculators/LatitudeLongitudeCalculator')),
  },
  {
    id: 'bearing-calculator',
    title: 'Bearing Calculator',
    path: '/bearing-calculator.html',
    description:
      'Calculate the initial compass bearing and great-circle distance between two latitude and longitude points, with the reverse bearing.',
    category: 'standard',
    keywords: ['bearing', 'compass', 'navigation', 'gps', 'great circle'],
    component: lazy(() => import('../../components/calculators/BearingCalculator')),
  },
  {
    id: 'azimuth-calculator',
    title: 'Azimuth Calculator',
    path: '/azimuth-calculator.html',
    description:
      "Estimate the sun's azimuth and elevation for any date, time and location from declination, hour angle and the equation of time.",
    category: 'standard',
    keywords: ['azimuth', 'sun position', 'solar', 'elevation', 'sundial'],
    component: lazy(() => import('../../components/calculators/AzimuthCalculator')),
  },
];
