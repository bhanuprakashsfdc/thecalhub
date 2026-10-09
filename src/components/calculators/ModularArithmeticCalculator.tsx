import { useState } from 'react';
import {
  CalcGrid,
  Panel,
  PanelEyebrow,
  NumberField,
  SelectField,
  ResultHero,
  ResultRows,
  ResultRow,
  Hint,
} from './kit';

export interface ModularArithmeticInput {
  a: number;
  b: number;
  modulus: number;
  operation: 'add' | 'subtract' | 'multiply' | 'power';
}

export interface ModularArithmeticResult {
  result: number;
  raw: string;
  gcdAN: number;
  inverseA: number | null;
  modulus: number;
}

const toInt = (n: number) => (Number.isFinite(n) ? Math.trunc(n) : 0);

function mod(x: number, n: number): number {
  const r = x % n;
  return r < 0 ? r + n : r;
}

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const t = x % y;
    x = y;
    y = t;
  }
  return x;
}

function modPow(base: number, exp: number, m: number): number {
  const mm = BigInt(m);
  let result = 1n;
  let b = BigInt(mod(base, m));
  let e = BigInt(exp);
  while (e > 0n) {
    if (e % 2n === 1n) result = (result * b) % mm;
    b = (b * b) % mm;
    e /= 2n;
  }
  return Number(result);
}

function modInverse(a: number, m: number): number | null {
  if (m <= 0 || gcd(a, m) !== 1) return null;
  let oldR = mod(a, m);
  let r = m;
  let oldS = 1;
  let s = 0;
  while (r !== 0) {
    const q = Math.floor(oldR / r);
    const nextR = oldR - q * r;
    const nextS = oldS - q * s;
    oldR = r;
    r = nextR;
    oldS = s;
    s = nextS;
  }
  return mod(oldS, m);
}

export function computeModularArithmetic(input: ModularArithmeticInput): ModularArithmeticResult {
  const a = toInt(input.a);
  const b = toInt(input.b);
  const m = toInt(input.modulus);
  if (m <= 0) {
    return { result: 0, raw: '0', gcdAN: 0, inverseA: null, modulus: 0 };
  }
  let raw: number;
  let rawDisplay: string;
  switch (input.operation) {
    case 'subtract':
      raw = a - b;
      rawDisplay = String(raw);
      break;
    case 'multiply':
      raw = a * b;
      rawDisplay = String(raw);
      break;
    case 'power':
      raw = b < 0 ? 0 : modPow(a, b, m);
      rawDisplay = `${a}^${b}`;
      break;
    default:
      raw = a + b;
      rawDisplay = String(raw);
  }
  return {
    result: mod(raw, m),
    raw: rawDisplay,
    gcdAN: gcd(a, m),
    inverseA: modInverse(a, m),
    modulus: m,
  };
}

const OPERATIONS = [
  { value: 'add', label: 'Addition (a + b)' },
  { value: 'subtract', label: 'Subtraction (a - b)' },
  { value: 'multiply', label: 'Multiplication (a * b)' },
  { value: 'power', label: 'Exponentiation (a^b)' },
];

const toNumber = (raw: string) => {
  const n = Number(raw);
  return Number.isFinite(n) ? n : 0;
};

export function ModularArithmeticCalculator() {
  const [a, setA] = useState('17');
  const [b, setB] = useState('5');
  const [modulus, setModulus] = useState('13');
  const [operation, setOperation] = useState('add');

  const result = computeModularArithmetic({
    a: toNumber(a),
    b: toNumber(b),
    modulus: toNumber(modulus),
    operation: operation as ModularArithmeticInput['operation'],
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <SelectField label="Operation" value={operation} onChange={setOperation} options={OPERATIONS} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Value a" value={a} onChange={setA} />
              <NumberField label="Value b" value={b} onChange={setB} />
            </div>
            <NumberField
              label="Modulus n"
              value={modulus}
              onChange={setModulus}
              min={1}
              hint="Must be a positive integer."
            />
          </div>
          <Hint>
            The result is the remainder of a op b divided by n, always between 0 and n - 1. Exponentiation
            reduces modulo n at every multiplication step so huge powers stay exact.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Result mod n"
            value={String(result.result)}
            sub={`${result.raw} mod ${result.modulus}`}
          />
          <ResultRows>
            <ResultRow label="Value before reduction" value={result.raw} />
            <ResultRow label="gcd(a, n)" value={String(result.gcdAN)} />
            <ResultRow
              label="Inverse of a mod n"
              value={result.inverseA === null ? 'none' : String(result.inverseA)}
            />
          </ResultRows>
          <Hint>
            A modular inverse exists only when a and n are coprime (gcd = 1); then a * inverse = 1 (mod n).
            Negative remainders are normalised into the range 0..n-1.
          </Hint>
        </Panel>
      }
    />
  );
}

export default ModularArithmeticCalculator;
