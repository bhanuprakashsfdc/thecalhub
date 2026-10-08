import { useState, type ReactNode } from 'react';

/**
 * Shared building blocks for calculator widgets.
 *
 * Conventions these components guarantee (tests rely on them):
 *  - `ResultRow` label text and value are siblings: `getByText(label).nextElementSibling`
 *  - `ResultHero` renders a `<p class="text-4xl ...">` for the headline number
 *  - `NumberField`/`TextField` wrap the control in a `<label>` so `getByLabelText` works
 *  - `SegmentedControl` exposes `role="radio"` buttons with `aria-checked`
 */

export function CalcGrid({ inputs, results }: { inputs: ReactNode; results: ReactNode }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5">{inputs}</div>
      <div className="lg:col-span-7">{results}</div>
    </div>
  );
}

export function Panel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl ${className}`}>
      {children}
    </div>
  );
}

export function PanelEyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-primary-fixed mb-6">
      <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed" />
      <span className="text-[10px] uppercase tracking-[0.2em] font-bold">{children}</span>
    </div>
  );
}

export function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <span className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">
      {children}
    </span>
  );
}

export interface NumberFieldProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
  step?: string | number;
  placeholder?: string;
  hint?: string;
}

export function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  step,
  placeholder,
  hint,
}: NumberFieldProps) {
  return (
    <label className="block">
      <FieldLabel>{label}</FieldLabel>
      <input
        type="number"
        inputMode="decimal"
        aria-label={label}
        className="w-full bg-surface-container-highest border border-white/5 rounded-lg p-4 text-white font-mono text-lg outline-none focus:border-primary-fixed/50"
        value={value}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint ? <span className="block text-[11px] text-neutral-500 mt-2">{hint}</span> : null}
    </label>
  );
}

export interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  hint?: string;
}

export function TextField({ label, value, onChange, placeholder, type = 'text', hint }: TextFieldProps) {
  return (
    <label className="block">
      <FieldLabel>{label}</FieldLabel>
      <input
        type={type}
        aria-label={label}
        className="w-full bg-surface-container-highest border border-white/5 rounded-lg p-4 text-white font-mono text-lg outline-none focus:border-primary-fixed/50"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint ? <span className="block text-[11px] text-neutral-500 mt-2">{hint}</span> : null}
    </label>
  );
}

export interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}

export function SelectField({ label, value, onChange, options }: SelectFieldProps) {
  return (
    <label className="block">
      <FieldLabel>{label}</FieldLabel>
      <select
        aria-label={label}
        className="w-full bg-surface-container-highest border border-white/5 rounded-lg p-4 text-white text-lg outline-none focus:border-primary-fixed/50"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-surface-container-highest text-white">
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export interface SegmentedControlProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}

export function SegmentedControl({ label, value, onChange, options }: SegmentedControlProps) {
  return (
    <div className="block">
      <FieldLabel>{label}</FieldLabel>
      <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(opt.value)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                active
                  ? 'bg-primary-fixed text-on-primary-fixed'
                  : 'bg-surface-container-highest text-neutral-400 hover:text-white'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ResultHero({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-surface-container-highest p-8 rounded-xl">
      <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">{label}</p>
      <p className="text-4xl font-bold text-white font-mono break-words">{value}</p>
      {sub ? <p className="text-sm text-neutral-400 mt-3">{sub}</p> : null}
    </div>
  );
}

export function ResultRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-white/5 last:border-b-0">
      <p className="text-sm text-neutral-400">{label}</p>
      <p className="text-sm font-bold text-white font-mono text-right">{value}</p>
    </div>
  );
}

export function ResultRows({ children }: { children: ReactNode }) {
  return <div className="mt-6 bg-surface-container-highest p-6 rounded-xl">{children}</div>;
}

export function Hint({ children }: { children: ReactNode }) {
  return <p className="text-xs text-neutral-500 mt-4 leading-relaxed">{children}</p>;
}

/** Small helper so callers can keep numeric inputs as strings in state. */
export function useNumberState(initial: string) {
  const [raw, setRaw] = useState(initial);
  const value = Number(raw);
  return { raw, setRaw, value, valid: raw !== '' && Number.isFinite(value) };
}

export const formatMoney = (n: number, digits = 2) =>
  n.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });

export const safeDiv = (a: number, b: number) => (b === 0 ? 0 : a / b);
