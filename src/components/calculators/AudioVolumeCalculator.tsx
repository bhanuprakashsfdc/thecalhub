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

export interface AudioVolumeInput {
  amplifierPower: number;
  sensitivity: number;
  distance: number;
}

export function computeAudioVolume(input: AudioVolumeInput) {
  const power = Math.max(0, input.amplifierPower);
  const sensitivity = input.sensitivity;
  const distance = Math.max(0.1, input.distance);

  const powerGain = power > 0 ? 10 * Math.log10(power) : 0;
  const distanceLoss = 20 * Math.log10(distance);
  const splAtOneMetre = sensitivity + powerGain;
  const spl = splAtOneMetre - distanceLoss;

  return { powerGain, distanceLoss, splAtOneMetre, spl };
}

export function AudioVolumeCalculator() {
  const [amplifierPower, setAmplifierPower] = useState('50');
  const [sensitivity, setSensitivity] = useState('87');
  const [distance, setDistance] = useState('3');

  const result = computeAudioVolume({
    amplifierPower: Number(amplifierPower) || 0,
    sensitivity: Number(sensitivity) || 0,
    distance: Number(distance) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Amplifier power (W)" value={amplifierPower} onChange={setAmplifierPower} min={0} step="1" />
            <NumberField label="Speaker sensitivity (dB @ 1W/1m)" value={sensitivity} onChange={setSensitivity} step="0.5" />
            <NumberField label="Listening distance (m)" value={distance} onChange={setDistance} min={0.1} step="0.5" />
          </div>
          <Hint>
            SPL = sensitivity + 10·log₁₀(power) − 20·log₁₀(distance). Halving the distance adds 6 dB at your
            ears, which is the loudest lever you have.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Sound pressure level"
            value={`${formatMoney(result.spl)} dB SPL`}
            sub="At your listening position"
          />
          <ResultRows>
            <ResultRow label="Level at 1 m" value={`${formatMoney(result.splAtOneMetre)} dB`} />
            <ResultRow label="Distance penalty" value={`${formatMoney(result.distanceLoss)} dB`} />
            <ResultRow label="Power gain" value={`${formatMoney(result.powerGain)} dB`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default AudioVolumeCalculator;
