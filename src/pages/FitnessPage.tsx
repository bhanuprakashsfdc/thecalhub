
import { Activity, Scale, Droplets, TrendingUp } from 'lucide-react';

const fitnessCalculators = [
  { name: 'Pace Calculator', path: '/pace-calculator.html', description: 'Running pace' },
  { name: 'TDEE Calculator', path: '/tdee-calculator.html', description: 'Total daily energy' },
  { name: 'BMI Calculator', path: '/bmi-calculator.html', description: 'Body mass index' },
  { name: 'BMR Calculator', path: '/bmr-calculator.html', description: 'Basal metabolic rate' },
  { name: 'Calorie Calculator', path: '/calorie-calculator.html', description: 'Daily calorie needs' },
];

export default function FitnessPage() {
  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Activity className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Fitness</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Fitness & Health Calculators</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">
          Track your fitness goals with calculators for pace, calories, BMI, BMR, and total daily energy expenditure.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {fitnessCalculators.map((calc) => {
          let Icon = Activity;
          if (calc.name.includes('BMI')) Icon = Scale;
          else if (calc.name.includes('Pace')) Icon = TrendingUp;
          else if (calc.name.includes('Calorie')) Icon = Droplets;

          return (
            <a
              key={calc.name}
              href={calc.path}
              className="bg-surface-container-low p-5 rounded-xl border border-white/5 hover:border-primary-fixed/50 transition-all flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-fixed/10 flex items-center justify-center">
                <Icon className="w-6 h-6 text-primary-fixed" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{calc.name}</h3>
                <p className="text-neutral-400 text-sm">{calc.description}</p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
