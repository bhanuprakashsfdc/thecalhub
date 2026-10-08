import type { ComponentType, LazyExoticComponent } from 'react';

export type HomeCategory =
  | 'standard'
  | 'financial'
  | 'health'
  | 'scientific'
  | 'programming'
  | 'math'
  | 'fitness'
  | 'dateTime'
  | 'construction'
  | 'trading';

export interface CalculatorDef {
  /** Kebab-case id without the .html extension, e.g. `auto-loan-calculator`. */
  id: string;
  /** Page heading, e.g. `Auto Loan Calculator`. */
  title: string;
  /** Route path, always `/${id}.html`. */
  path: string;
  /** One-line card + meta description. */
  description: string;
  /** Home/dashboard category — must be a TOOL_CATEGORIES id. */
  category: HomeCategory;
  keywords?: string[];
  component: LazyExoticComponent<ComponentType>;
}
