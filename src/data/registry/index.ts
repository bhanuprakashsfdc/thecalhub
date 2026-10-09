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
import { SHARD_11 } from './shard-11';
import { SHARD_12 } from './shard-12';
import { SHARD_13 } from './shard-13';
import { SHARD_14 } from './shard-14';
import { SHARD_15 } from './shard-15';
import { SHARD_16 } from './shard-16';
import { SHARD_17 } from './shard-17';
import { SHARD_18 } from './shard-18';
import { SHARD_19 } from './shard-19';
import { SHARD_20 } from './shard-20';
import { SHARD_21 } from './shard-21';
import { SHARD_22 } from './shard-22';
import { SHARD_23 } from './shard-23';
import { SHARD_24 } from './shard-24';
import { SHARD_25 } from './shard-25';
import { SHARD_26 } from './shard-26';
import { SHARD_27 } from './shard-27';
import { SHARD_28 } from './shard-28';
import { SHARD_29 } from './shard-29';
import { SHARD_30 } from './shard-30';
import { SHARD_31 } from './shard-31';
import { SHARD_32 } from './shard-32';
import { SHARD_33 } from './shard-33';
import { SHARD_34 } from './shard-34';
import { SHARD_35 } from './shard-35';
import { SHARD_36 } from './shard-36';
import { SHARD_37 } from './shard-37';
import { SHARD_38 } from './shard-38';
import { SHARD_39 } from './shard-39';
import { SHARD_40 } from './shard-40';
import { SHARD_41 } from './shard-41';
import { SHARD_42 } from './shard-42';
import { SHARD_43 } from './shard-43';
import { SHARD_44 } from './shard-44';
import { SHARD_45 } from './shard-45';
import { SHARD_46 } from './shard-46';
import { SHARD_47 } from './shard-47';
import { SHARD_48 } from './shard-48';
import { SHARD_49 } from './shard-49';
import { SHARD_50 } from './shard-50';
import { SHARD_51 } from './shard-51';
import { SHARD_52 } from './shard-52';
import { SHARD_53 } from './shard-53';
import { SHARD_54 } from './shard-54';
import { SHARD_55 } from './shard-55';
import { SHARD_56 } from './shard-56';
import { SHARD_57 } from './shard-57';
import { SHARD_58 } from './shard-58';
import { SHARD_59 } from './shard-59';
import { SHARD_60 } from './shard-60';
import { SHARD_61 } from './shard-61';
import { SHARD_62 } from './shard-62';
import { SHARD_63 } from './shard-63';
import { SHARD_64 } from './shard-64';
import { SHARD_65 } from './shard-65';
import { SHARD_66 } from './shard-66';
import { SHARD_67 } from './shard-67';
import { SHARD_68 } from './shard-68';
import { SHARD_69 } from './shard-69';
import { SHARD_70 } from './shard-70';
import { SHARD_71 } from './shard-71';
import { SHARD_72 } from './shard-72';
import { SHARD_73 } from './shard-73';
import { SHARD_74 } from './shard-74';
import { SHARD_75 } from './shard-75';

/** Every calculator registered by the build agents, in shard order. */
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
  ...SHARD_11,
  ...SHARD_12,
  ...SHARD_13,
  ...SHARD_14,
  ...SHARD_15,
  ...SHARD_16,
  ...SHARD_17,
  ...SHARD_18,
  ...SHARD_19,
  ...SHARD_20,
  ...SHARD_21,
  ...SHARD_22,
  ...SHARD_23,
  ...SHARD_24,
  ...SHARD_25,
  ...SHARD_26,
  ...SHARD_27,
  ...SHARD_28,
  ...SHARD_29,
  ...SHARD_30,
  ...SHARD_31,
  ...SHARD_32,
  ...SHARD_33,
  ...SHARD_34,
  ...SHARD_35,
  ...SHARD_36,
  ...SHARD_37,
  ...SHARD_38,
  ...SHARD_39,
  ...SHARD_40,
  ...SHARD_41,
  ...SHARD_42,
  ...SHARD_43,
  ...SHARD_44,
  ...SHARD_45,
  ...SHARD_46,
  ...SHARD_47,
  ...SHARD_48,
  ...SHARD_49,
  ...SHARD_50,
  ...SHARD_51,
  ...SHARD_52,
  ...SHARD_53,
  ...SHARD_54,
  ...SHARD_55,
  ...SHARD_56,
  ...SHARD_57,
  ...SHARD_58,
  ...SHARD_59,
  ...SHARD_60,
  ...SHARD_61,
  ...SHARD_62,
  ...SHARD_63,
  ...SHARD_64,
  ...SHARD_65,
  ...SHARD_66,
  ...SHARD_67,
  ...SHARD_68,
  ...SHARD_69,
  ...SHARD_70,
  ...SHARD_71,
  ...SHARD_72,
  ...SHARD_73,
  ...SHARD_74,
  ...SHARD_75,
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
