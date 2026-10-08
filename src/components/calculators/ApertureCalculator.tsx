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

export interface ApertureInput {
  focalLength: number;
  entrancePupil: number;
}

export function computeAperture(input: ApertureInput) {
  const focal = Math.max(0, input.focalLength);
  const pupil = Math.max(0, input.entrancePupil);

  const fNumber = pupil > 0 ? focal / pupil : 0;
  const area = Math.PI * Math.pow(pupil / 2, 2);
  const relativeLight = fNumber > 0 ? Math.pow(2 / fNumber, 2) : 0;
  const tStop = fNumber * 0.97;

  return { fNumber, area, relativeLight, tStop };
}

export function ApertureCalculator() {
  const [focalLength, setFocalLength] = useState('50');
  const [entrancePupil, setEntrancePupil] = useState('25');

  const result = computeAperture({
    focalLength: Number(focalLength) || 0,
    entrancePupil: Number(entrancePupil) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Focal length (mm)" value={focalLength} onChange={setFocalLength} min={0} step="1" />
            <NumberField label="Entrance pupil (mm)" value={entrancePupil} onChange={setEntrancePupil} min={0} step="0.5" />
          </div>
          <Hint>
            The f-number is focal length divided by entrance-pupil diameter. Halving the pupil diameter raises
            the f-number by one stop and cuts the light to a quarter... one stop is a factor of two in diameter.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Aperture"
            value={`f/${formatMoney(result.fNumber)}`}
            sub={`${formatMoney(result.area)} mm² opening area`}
          />
          <ResultRows>
            <ResultRow label="Entrance pupil area" value={`${formatMoney(result.area)} mm²`} />
            <ResultRow label="Relative light vs f/2" value={formatMoney(result.relativeLight)} />
            <ResultRow label="T-stop estimate" value={`f/${formatMoney(result.tStop)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ApertureCalculator;
