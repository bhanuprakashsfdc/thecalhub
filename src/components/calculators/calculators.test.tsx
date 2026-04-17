import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BMICalculator from './BMICalculator';
import PercentageCalculator from './PercentageCalculator';
import GSTCalculator from './GSTCalculator';
import CalorieCalculator from './CalorieCalculator';

describe('BMICalculator', () => {
  it('renders the BMI calculator', () => {
    render(<BMICalculator />);
    expect(screen.getByText('BMI Calculator')).toBeDefined();
  });

  it('accepts weight input', () => {
    render(<BMICalculator />);
    const weightInput = document.querySelector('input[type="number"]') as HTMLInputElement;
    fireEvent.change(weightInput, { target: { value: '80' } });
    expect(weightInput.value).toBe('80');
  });

  it('accepts height input', () => {
    render(<BMICalculator />);
    const inputs = document.querySelectorAll('input[type="number"]');
    const heightInput = inputs[1] as HTMLInputElement;
    fireEvent.change(heightInput, { target: { value: '180' } });
    expect(heightInput.value).toBe('180');
  });

  it('switches between metric and imperial units', () => {
    render(<BMICalculator />);
    const imperialBtn = screen.getByText('Imperial (lbs/in)');
    fireEvent.click(imperialBtn);
    expect(screen.getByText('Imperial (lbs/in)')).toBeDefined();
  });
});

describe('PercentageCalculator', () => {
  it('renders the percentage calculator', () => {
    render(<PercentageCalculator />);
    expect(screen.getByText('Percentage Calculator')).toBeDefined();
  });

  it('accepts value input', () => {
    render(<PercentageCalculator />);
    const inputs = document.querySelectorAll('input[type="number"]');
    const valueInput = inputs[0] as HTMLInputElement;
    fireEvent.change(valueInput, { target: { value: '200' } });
    expect(valueInput.value).toBe('200');
  });

  it('switches between modes', () => {
    render(<PercentageCalculator />);
    const whatPercentBtn = screen.getByText('X is what % of Y');
    fireEvent.click(whatPercentBtn);
    expect(screen.getByText('X is what % of Y')).toBeDefined();
  });
});

describe('GSTCalculator', () => {
  it('renders the GST calculator', () => {
    render(<GSTCalculator />);
    expect(screen.getByText('GST Calculator')).toBeDefined();
  });

  it('accepts amount input', () => {
    render(<GSTCalculator />);
    const amountInput = document.querySelectorAll('input[type="number"]')[0] as HTMLInputElement;
    fireEvent.change(amountInput, { target: { value: '5000' } });
    expect(amountInput.value).toBe('5000');
  });

  it('switches between add and remove GST modes', () => {
    render(<GSTCalculator />);
    const removeBtn = screen.getByText('Remove GST');
    fireEvent.click(removeBtn);
    expect(screen.getByText('Remove GST')).toBeDefined();
  });

  it('shows GST rate buttons', () => {
    render(<GSTCalculator />);
    expect(screen.getByText('5%')).toBeDefined();
    expect(screen.getByText('12%')).toBeDefined();
    expect(screen.getByText('18%')).toBeDefined();
    expect(screen.getByText('28%')).toBeDefined();
  });
});

describe('CalorieCalculator', () => {
  it('renders the calorie calculator', () => {
    render(<CalorieCalculator />);
    expect(screen.getByText('Calorie Calculator')).toBeDefined();
  });

  it('accepts weight input', () => {
    render(<CalorieCalculator />);
    const inputs = document.querySelectorAll('input[type="number"]');
    const weightInput = inputs[0] as HTMLInputElement;
    fireEvent.change(weightInput, { target: { value: '75' } });
    expect(weightInput.value).toBe('75');
  });

  it('accepts height input', () => {
    render(<CalorieCalculator />);
    const inputs = document.querySelectorAll('input[type="number"]');
    const heightInput = inputs[1] as HTMLInputElement;
    fireEvent.change(heightInput, { target: { value: '175' } });
    expect(heightInput.value).toBe('175');
  });

  it('accepts age input', () => {
    render(<CalorieCalculator />);
    const inputs = document.querySelectorAll('input[type="number"]');
    const ageInput = inputs[2] as HTMLInputElement;
    fireEvent.change(ageInput, { target: { value: '25' } });
    expect(ageInput.value).toBe('25');
  });

  it('switches between male and female gender', () => {
    render(<CalorieCalculator />);
    const femaleBtn = screen.getByText('Female');
    fireEvent.click(femaleBtn);
    expect(screen.getByText('Female')).toBeDefined();
  });
});
