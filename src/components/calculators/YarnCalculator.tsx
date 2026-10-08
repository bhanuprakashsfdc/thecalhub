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

const whole = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 0 });

export interface YarnInput {
  projectWeightG: number;
  yardagePer100g: number;
  ballWeightG: number;
  pricePerBall: number;
}

export function computeYarn(input: YarnInput) {
  const weight = Math.max(0, input.projectWeightG);
  const yardage = Math.max(0, input.yardagePer100g);
  const ballWeight = Math.max(1, input.ballWeightG);
  const price = Math.max(0, input.pricePerBall);

  const totalYards = (weight * yardage) / 100;
  const balls = Math.ceil(weight / ballWeight);
  const cost = balls * price;

  return { totalYards, balls, cost, ballWeight };
}

export function YarnCalculator() {
  const [projectWeightG, setProjectWeightG] = useState('250');
  const [yardagePer100g, setYardagePer100g] = useState('400');
  const [ballWeightG, setBallWeightG] = useState('100');
  const [pricePerBall, setPricePerBall] = useState('8');

  const result = computeYarn({
    projectWeightG: Number(projectWeightG) || 0,
    yardagePer100g: Number(yardagePer100g) || 0,
    ballWeightG: Number(ballWeightG) || 0,
    pricePerBall: Number(pricePerBall) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Project yarn weight (g)" value={projectWeightG} onChange={setProjectWeightG} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField
                label="Yards per 100 g"
                value={yardagePer100g}
                onChange={setYardagePer100g}
                min={0}
              />
              <NumberField label="Ball weight (g)" value={ballWeightG} onChange={setBallWeightG} min={1} />
            </div>
            <NumberField label="Price per ball ($)" value={pricePerBall} onChange={setPricePerBall} min={0} step="0.5" />
          </div>
          <Hint>
            Weigh a finished swatch to get your grams per square inch, or add up the ball band weights of a
            similar project. Yards are converted from the ball band's yardage per 100 g.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Balls to buy"
            value={whole(result.balls)}
            sub={`${formatMoney(result.totalYards)} yards in ${Number(projectWeightG) || 0} g of yarn`}
          />
          <ResultRows>
            <ResultRow label="Estimated cost" value={`$${formatMoney(result.cost)}`} />
            <ResultRow label="Total yards" value={`${formatMoney(result.totalYards)} yd`} />
            <ResultRow label="Ball weight" value={`${Number(ballWeightG) || 0} g`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default YarnCalculator;
