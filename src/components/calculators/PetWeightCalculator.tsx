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
  formatMoney,
} from './kit';

const BCS_FACTOR: Record<string, number> = {
  '1': 1.35,
  '2': 1.25,
  '3': 1.15,
  '4': 1.08,
  '5': 1,
  '6': 0.92,
  '7': 0.85,
  '8': 0.75,
  '9': 0.65,
};

export interface PetWeightInput {
  weightKg: number;
  bcs: string;
  species: string;
}

export function computePetWeight(input: PetWeightInput) {
  const weight = Math.max(0, input.weightKg);
  const score = Number(input.bcs) || 5;
  const factor = BCS_FACTOR[String(score)] ?? 1;
  const idealKg = weight * factor;
  const idealLb = idealKg * 2.20462;
  const deltaKg = idealKg - weight;
  const condition = score <= 3 ? 'Underweight' : score >= 7 ? 'Overweight' : 'Ideal';
  const species = input.species === 'cat' ? 'cat' : 'dog';
  const status = `${condition} ${species}`;

  return { idealKg, idealLb, deltaKg, status, score, species };
}

export function PetWeightCalculator() {
  const [weightKg, setWeightKg] = useState('10');
  const [bcs, setBcs] = useState('5');
  const [species, setSpecies] = useState('dog');

  const result = computePetWeight({
    weightKg: Number(weightKg) || 0,
    bcs,
    species,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Current weight (kg)" value={weightKg} onChange={setWeightKg} min={0} step="0.1" />
            <SelectField
              label="Body condition score (1-9)"
              value={bcs}
              onChange={setBcs}
              options={[
                { value: '1', label: '1 - Emaciated' },
                { value: '2', label: '2 - Very thin' },
                { value: '3', label: '3 - Thin' },
                { value: '4', label: '4 - Slightly thin' },
                { value: '5', label: '5 - Ideal' },
                { value: '6', label: '6 - Slightly heavy' },
                { value: '7', label: '7 - Overweight' },
                { value: '8', label: '8 - Obese' },
                { value: '9', label: '9 - Severely obese' },
              ]}
            />
            <SelectField
              label="Species"
              value={species}
              onChange={setSpecies}
              options={[
                { value: 'dog', label: 'Dog' },
                { value: 'cat', label: 'Cat' },
              ]}
            />
          </div>
          <Hint>
            On the 9-point body condition scale, scores of 4 to 6 are ideal. The target weight applies the typical
            correction factor for the score you select.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Target weight"
            value={`${formatMoney(result.idealKg)} kg`}
            sub={`${formatMoney(result.idealLb)} lb — ${result.status} (score ${result.score})`}
          />
          <ResultRows>
            <ResultRow label="Weight to gain/lose" value={`${formatMoney(result.deltaKg)} kg`} />
            <ResultRow label="Current weight" value={`${formatMoney(Number(weightKg) || 0)} kg`} />
            <ResultRow label="Target weight (lb)" value={`${formatMoney(result.idealLb)} lb`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default PetWeightCalculator;
