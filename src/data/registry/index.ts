import type { CalculatorDef } from './types';
import { SHARD_01 } from './shard-01';
import { SHARD_02 } from './shard-02';
import { SHARD_03 } from './shard-03';
import { SHARD_04 } from './shard-04';
import { SHARD_05 } from './shard-05';
import { SHARD_06 } from './shard-06';
import { SHARD_07 } from './shard-07';
import { SHARD_08 } from './shard-08';
import { SHARD_09 } from './shard-09';
import { SHARD_10 } from './shard-10';

/** Every calculator registered by the ten build agents, in shard order. */
export const REGISTRY: CalculatorDef[] = [
  ...SHARD_01,
  ...SHARD_02,
  ...SHARD_03,
  ...SHARD_04,
  ...SHARD_05,
  ...SHARD_06,
  ...SHARD_07,
  ...SHARD_08,
  ...SHARD_09,
  ...SHARD_10,
];

export const REGISTRY_BY_PATH: Map<string, CalculatorDef> = new Map(
  REGISTRY.map((def) => [def.path, def])
);

export const REGISTRY_ROUTES: string[] = REGISTRY.map((def) => def.path);

export const REGISTRY_BY_CATEGORY: Record<string, CalculatorDef[]> = REGISTRY.reduce(
  (acc, def) => {
    (acc[def.category] ||= []).push(def);
    return acc;
  },
  {} as Record<string, CalculatorDef[]>
);
