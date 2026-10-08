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
  formatMoney,
} from './kit';

const RDA = { calcium: 1000, iron: 8, magnesium: 420, zinc: 11 };

export interface MineralInput {
  calcium: number;
  iron: number;
  magnesium: number;
  zinc: number;
}

export function computeMinerals(input: MineralInput) {
  const calcium = Math.max(0, input.calcium);
  const iron = Math.max(0, input.iron);
  const magnesium = Math.max(0, input.magnesium);
  const zinc = Math.max(0, input.zinc);

  const calciumPct = (calcium / RDA.calcium) * 100;
  const ironPct = (iron / RDA.iron) * 100;
  const magnesiumPct = (magnesium / RDA.magnesium) * 100;
  const zincPct = (zinc / RDA.zinc) * 100;

  const meeting = [calciumPct, ironPct, magnesiumPct, zincPct].filter((p) => p >= 100).length;
  const average = (calciumPct + ironPct + magnesiumPct + zincPct) / 4;

  return { calciumPct, ironPct, magnesiumPct, zincPct, meeting, average };
}

export function MineralCalculator() {
  const [calcium, setCalcium] = useState('1000');
  const [iron, setIron] = useState('8');
  const [magnesium, setMagnesium] = useState('210');
  const [zinc, setZinc] = useState('11');

  const result = computeMinerals({
    calcium: Number(calcium) || 0,
    iron: Number(iron) || 0,
    magnesium: Number(magnesium) || 0,
    zinc: Number(zinc) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Calcium (mg)" value={calcium} onChange={setCalcium} min={0} />
              <NumberField label="Iron (mg)" value={iron} onChange={setIron} min={0} step="0.5" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Magnesium (mg)" value={magnesium} onChange={setMagnesium} min={0} />
              <NumberField label="Zinc (mg)" value={zinc} onChange={setZinc} min={0} step="0.5" />
            </div>
          </div>
          <Hint>
            Percentages are against adult reference intakes: calcium 1,000 mg, iron 8 mg, magnesium 420 mg and
            zinc 11 mg. Pregnancy and childhood targets differ — check with a clinician.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Minerals at target"
            value={`${result.meeting} of 4`}
            sub={`${formatMoney(result.average, 0)}% of the reference intake on average`}
          />
          <ResultRows>
            <ResultRow label="Calcium" value={`${formatMoney(result.calciumPct, 0)}%`} />
            <ResultRow label="Iron" value={`${formatMoney(result.ironPct, 0)}%`} />
            <ResultRow label="Magnesium" value={`${formatMoney(result.magnesiumPct, 0)}%`} />
            <ResultRow label="Zinc" value={`${formatMoney(result.zincPct, 0)}%`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default MineralCalculator;
