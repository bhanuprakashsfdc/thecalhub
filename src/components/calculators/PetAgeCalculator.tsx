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

export interface PetAgeInput {
  petYears: number;
  species: string;
}

export function computePetAge(input: PetAgeInput) {
  const y = Math.max(0, input.petYears);
  let humanYears = 0;
  let stage = 'Adult';

  if (input.species === 'dog') {
    humanYears = y <= 1 ? 15 * y : y <= 2 ? 15 + 9 * (y - 1) : 24 + 5 * (y - 2);
    stage = y < 1 ? 'Puppy' : y < 3 ? 'Young' : y < 7 ? 'Adult' : 'Senior';
  } else if (input.species === 'cat') {
    humanYears = y <= 1 ? 15 * y : y <= 2 ? 15 + 9 * (y - 1) : 24 + 4 * (y - 2);
    stage = y < 1 ? 'Kitten' : y < 3 ? 'Young' : y < 8 ? 'Adult' : 'Senior';
  } else {
    humanYears = 7 * y;
    stage = y < 1 ? 'Baby' : y < 2 ? 'Young' : 'Adult';
  }

  return { humanYears, humanMonths: humanYears * 12, stage };
}

export function PetAgeCalculator() {
  const [petYears, setPetYears] = useState('5');
  const [species, setSpecies] = useState('dog');

  const result = computePetAge({
    petYears: Number(petYears) || 0,
    species,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Pet age (years)" value={petYears} onChange={setPetYears} min={0} step="0.5" />
            <SelectField
              label="Species"
              value={species}
              onChange={setSpecies}
              options={[
                { value: 'dog', label: 'Dog' },
                { value: 'cat', label: 'Cat' },
                { value: 'other', label: 'Other' },
              ]}
            />
          </div>
          <Hint>
            Dogs and cats age fastest in their first two years: roughly 15 human years in year one and 9 more in
            year two, then a gentler pace for the rest of their lives.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Human-equivalent age"
            value={`${formatMoney(result.humanYears)} years`}
            sub={`${formatMoney(result.humanMonths, 0)} human months old`}
          />
          <ResultRows>
            <ResultRow label="Life stage" value={result.stage} />
            <ResultRow label="Pet age entered" value={`${Number(petYears) || 0} year(s)`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default PetAgeCalculator;
