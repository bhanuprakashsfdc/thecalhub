# Calculator Build Agent Playbook

You are one of ten parallel build agents finishing the calculator catalogue in
`calculator.md` (reverse order — the bottom of the file first).

## 1. Your assignment

| Thing | Path |
|---|---|
| Work queue | `scripts/chunks/chunk-NN.txt` (NN = your agent number, zero padded) |
| Registry shard you own | `src/data/registry/shard-NN.ts` |
| Test file you own | `src/components/calculators/shard-NN.test.tsx` |
| Progress report you own | `scripts/chunks/report-NN.txt` |

Each chunk line is tab separated:

```
num <TAB> Name <TAB> /path.html <TAB> category <TAB> mode <TAB> source section
```

Work **top to bottom** — the file is already in reverse `calculator.md` order.
Do not skip entries; if you must stop, stop between entries.

## 2. What to do per entry

### `mode = BUILD` — the calculator does not exist yet

1. **Reuse check.** Run `ls src/components/calculators/` and grep the routes in
   `src/App.tsx`. If an existing component already implements the same inputs and
   outputs (≥90 % equivalent), **reuse it** — do not write a duplicate component.
   Otherwise create `src/components/calculators/<Name>Calculator.tsx`.
2. Register it in **your shard** (`src/data/registry/shard-NN.ts`).
3. Add tests in **your test file**.
4. Append `<num>\t<slug>` to **your report**.

### `mode = TESTONLY` — component + route already exist, tests do not

1. Read the existing component and write tests for it in your test file.
   Never edit the component itself.
2. Append `<num>\t<slug>` to your report.

## 3. Files you may create / edit

* create: `src/components/calculators/<YourCalculatorName>.tsx`
* edit: `src/data/registry/shard-NN.ts`, `src/components/calculators/shard-NN.test.tsx`, `scripts/chunks/report-NN.txt`

## 4. Files you must NEVER touch

`calculator.md`, `src/App.tsx`, `src/data/data.js`, `src/data/registry/index.ts`,
`src/data/registry/types.ts`, any other `shard-*.ts`, `src/data/seo*`,
`src/components/calculators/kit.tsx`, `src/pages/**`, existing calculator
components (read only), `src/test/**`, `tests/**`, `package.json`, `scripts/**`
other than your own report file.

Route wiring, home-page visibility and `calculator.md` bookkeeping are handled
centrally by the orchestrator after your report is verified.

## 5. Code conventions (copy the exemplar exactly)

Exemplar trio — read all three before writing anything:

* component: `src/components/calculators/LongTermCareCalculator.tsx`
* test: `src/components/calculators/shard-01.test.tsx`
* registration: `src/data/registry/shard-01.ts`

Shared kit: `src/components/calculators/kit.tsx`
(`CalcGrid`, `Panel`, `PanelEyebrow`, `NumberField`, `TextField`, `SelectField`,
`SegmentedControl`, `ResultHero`, `ResultRows`, `ResultRow`, `Hint`, `formatMoney`).

Rules:

1. Layout: `<CalcGrid inputs={<Panel>…</Panel>} results={<Panel>…</Panel>} />`
   (inputs ≈ 5 cols, results ≈ 7 cols).
2. Export the maths as a pure function (`export function computeX(input) { … }`)
   so tests can assert against independently computed numbers. The component
   keeps inputs as strings in `useState` and coerces with `Number(x) || 0`.
3. **Never render an `<h1>`** — `CalculatorPageLayout` renders the page title.
4. Default export is required (`export default XCalculator`) because the route
   lazy-imports it.
5. Guard against division by zero, negative years, empty inputs; show `0` rather
   than `NaN`/`Infinity`.
6. Keep `description` ≤ 165 characters (it is the meta description).
7. Use the `category` from the chunk line verbatim — it must be one of
   `standard | financial | health | scientific | programming | math | fitness |
   dateTime | construction | trading`.
8. Unique file names. Before creating a file check it does not already exist;
   if it does, either it is the same calculator (reuse it) or pick a distinct name.

### Registration entry format

```ts
import { lazy } from 'react';
import type { CalculatorDef } from './types';

export const SHARD_01: CalculatorDef[] = [
  {
    id: 'disability-insurance-calculator',
    title: 'Disability Insurance Calculator',
    path: '/disability-insurance-calculator.html',
    description: 'Estimate disability insurance cover and premiums.',
    category: 'financial',
    keywords: ['disability insurance', 'income protection', 'premium'],
    component: lazy(() => import('../../components/calculators/DisabilityInsuranceCalculator')),
  },
];
```

`id` = slug without `.html`; `path` = `/${id}.html` — this is checked by a test.

## 6. Test requirements

Keep the `renderCalculatorPage` helper at the top of your shard test file
(copy it from `shard-01.test.tsx`). For **every** entry you complete:

1. renders through `CalculatorPageLayout` —
   `screen.getByRole('heading', { level: 1, name: title })`;
2. one numeric assertion where the expected value is computed **in the test**
   with plain maths (do not import the implementation to get the expected value);
3. one interaction assertion — change an input, expect the displayed result to
   change to the newly computed value.

Useful patterns: `container.querySelector('p.text-4xl')` for the headline
result, `screen.getByText('Label').nextElementSibling.textContent` for
`ResultRow` values, `screen.getByLabelText('Label')` for inputs.

## 7. Verification (must pass before you report)

```bash
npx vitest run src/components/calculators/shard-NN.test.tsx
npm run lint
```

* `npm run lint` is `tsc --noEmit` — **your** files must produce zero errors.
* Ignore errors coming from `src/pages/Blog.tsx` (owned by a concurrent
  session) and from other agents' files (their `shard-*.ts` / calculators are
  being written in parallel right now). Never "fix" someone else's file.
* Do not run the full test suite — other agents' work is in flight.

## 8. How much to build

Aim for **at least 30 entries**, more if you can, always in chunk order. Stop at
a clean entry boundary, write your report file, then finish.

## 9. Report format

`scripts/chunks/report-NN.txt`, one line per completed entry:

```
1000	disability-insurance-calculator
999	life-insurance-need-calculator
```

Numbers or slugs only — this file is what marks the row `[DONE]` in
`calculator.md`, so it must contain only entries you actually finished and
verified.
