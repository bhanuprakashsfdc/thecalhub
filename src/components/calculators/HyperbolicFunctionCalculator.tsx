import { useState, useMemo } from 'react';
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

export interface HyperbolicFunctionInput {
  x: number;
  functionType: 'sinh' | 'cosh' | 'tanh' | 'coth';
}

export function computeHyperbolicFunction(input: HyperbolicFunctionInput) {
  const x = input.x;
  let sinh = Math.sinh(x);
  let cosh = Math.cosh(x);
  let tanh = Math.tanh(x);
  const cothRaw = cosh / (sinh || 1e-12);
  let coth = Number.isFinite(cothRaw) ? cothRaw : 0;
  let result: number;
  switch (input.functionType) {
    case 'sinh':
      result = sinh;
      break;
    case 'cosh':
      result = cosh;
      break;
    case 'tanh':
      result = tanh;
      break;
    case 'coth':
      result = coth;
      break;
    default:
      result = sinh;
  }
  return { sinh, cosh, tanh, coth, result };
}

export function HyperbolicFunctionCalculator() {
  const [x, setX] = useState('1');
  const [functionType, setFunctionType] = useState<HyperbolicFunctionInput['functionType']>('sinh');

  const result = useMemo(
    () =>
      computeHyperbolicFunction({
        x: Number(x) || 0,
        functionType,
      }),
    [x, functionType]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="x" value={x} onChange={setX} step="0.1" />
            <div className="block">
              <span className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Function</span>
              <div className="flex flex-wrap gap-2">
                {(['sinh', 'cosh', 'tanh', 'coth'] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    role="radio"
                    aria-checked={functionType === opt}
                    onClick={() => setFunctionType(opt)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      functionType === opt
                        ? 'bg-primary-fixed text-on-primary-fixed'
                        : 'bg-surface-container-highest text-neutral-400 hover:text-white'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <Hint>
            Hyperbolic functions are the trigonometric analogues for the hyperbola. sinh and tanh are
            odd and unbounded; cosh is even and grows exponentially; coth is the reciprocal of tanh.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label={functionType}
            value={`${formatMoney(result.result)}`}
          />
          <ResultRows>
            <ResultRow label="sinh(x)" value={formatMoney(result.sinh)} />
            <ResultRow label="cosh(x)" value={formatMoney(result.cosh)} />
            <ResultRow label="tanh(x)" value={formatMoney(result.tanh)} />
            <ResultRow label="coth(x)" value={formatMoney(result.coth)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default HyperbolicFunctionCalculator;