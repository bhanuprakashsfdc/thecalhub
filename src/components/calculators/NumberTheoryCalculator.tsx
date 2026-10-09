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
} from './kit';

export interface NumberTheoryInput {
  n: number;
}

export interface NumberTheoryResult {
  n: number;
  isPrime: boolean;
  isSquare: boolean;
  divisorCount: number;
  divisorSum: number;
  totient: number;
  digitSum: number;
  factorization: string;
  primeFactors: number[];
}

function primeFactorsOf(n: number): number[] {
  const factors: number[] = [];
  let m = n;
  for (let d = 2; d * d <= m; d += 1) {
    while (m % d === 0) {
      factors.push(d);
      m /= d;
    }
  }
  if (m > 1) factors.push(m);
  return factors;
}

export function computeNumberTheory(input: NumberTheoryInput): NumberTheoryResult {
  const rawN = Number(input.n);
  const n = Number.isFinite(rawN) ? Math.trunc(Math.abs(rawN)) : 0;
  if (n < 2) {
    return {
      n,
      isPrime: false,
      isSquare: n === 1,
      divisorCount: n === 1 ? 1 : 0,
      divisorSum: n,
      totient: n === 1 ? 1 : 0,
      digitSum: n,
      factorization: n === 1 ? '1' : '0',
      primeFactors: [],
    };
  }
  const primeFactors = primeFactorsOf(n);
  const distinct = Array.from(new Set(primeFactors));
  let totient = n;
  for (const p of distinct) {
    totient = (totient / p) * (p - 1);
  }
  let divisorCount = 0;
  let divisorSum = 0;
  const root = Math.floor(Math.sqrt(n));
  for (let d = 1; d <= root; d += 1) {
    if (n % d === 0) {
      if (d * d === n) {
        divisorCount += 1;
        divisorSum += d;
      } else {
        divisorCount += 2;
        divisorSum += d + n / d;
      }
    }
  }
  const counts = new Map<number, number>();
  for (const f of primeFactors) {
    counts.set(f, (counts.get(f) ?? 0) + 1);
  }
  const factorization = Array.from(counts.entries())
    .map(([p, e]) => (e === 1 ? `${p}` : `${p}^${e}`))
    .join(' x ');
  const digitSum = String(n)
    .split('')
    .reduce((acc, ch) => acc + Number(ch), 0);
  return {
    n,
    isPrime: primeFactors.length === 1,
    isSquare: root * root === n,
    divisorCount,
    divisorSum,
    totient,
    digitSum,
    factorization,
    primeFactors: distinct,
  };
}

const toNumber = (raw: string) => {
  const n = Number(raw);
  return Number.isFinite(n) ? n : 0;
};

export function NumberTheoryCalculator() {
  const [n, setN] = useState('36');

  const result = computeNumberTheory({ n: toNumber(n) });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField
              label="Number n"
              value={n}
              onChange={setN}
              min={0}
              hint="Any non-negative whole number; results update instantly."
            />
          </div>
          <Hint>
            Divisors, prime factorization, Euler's totient phi(n) and the digit sum are all derived from a
            single trial-division pass over n.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Number of divisors"
            value={String(result.divisorCount)}
            sub={`${result.n} = ${result.factorization}`}
          />
          <ResultRows>
            <ResultRow label="Prime" value={result.isPrime ? 'yes' : 'no'} />
            <ResultRow label="Euler totient phi(n)" value={String(result.totient)} />
            <ResultRow label="Sum of divisors" value={String(result.divisorSum)} />
            <ResultRow label="Digit sum" value={String(result.digitSum)} />
            <ResultRow label="Perfect square" value={result.isSquare ? 'yes' : 'no'} />
          </ResultRows>
          <Hint>
            phi(n) counts integers up to n that are coprime to n; for n = p^k it equals p^k - p^(k-1).
            A number is prime exactly when it has no factor between 2 and its square root.
          </Hint>
        </Panel>
      }
    />
  );
}

export default NumberTheoryCalculator;
