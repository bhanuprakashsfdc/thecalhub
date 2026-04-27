
import { BookOpen, Clock, TrendingUp, Scale, Calculator } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: 'Understanding EMI: How Your Loan Payments Work',
    excerpt: 'Learn how Equated Monthly Installments are calculated and understand the principal vs interest breakdown in your loan.',
    category: 'Financial',
    readTime: '5 min read',
    date: '2024-01-15',
    icon: TrendingUp,
  },
  {
    id: 2,
    title: 'BMI Explained: What Your Body Mass Index Really Means',
    excerpt: 'Understand how BMI is calculated, its limitations, and why it should be used as a general guideline rather than a definitive health measure.',
    category: 'Health',
    readTime: '4 min read',
    date: '2024-01-10',
    icon: Scale,
  },
  {
    id: 3,
    title: 'The Power of Compound Interest: Growing Your Wealth Over Time',
    excerpt: 'Discover why compound interest is called the eighth wonder of the world and how small investments can grow significantly over long periods.',
    category: 'Financial',
    readTime: '6 min read',
    date: '2024-01-05',
    icon: Calculator,
  },
  {
    id: 4,
    title: 'How to Calculate Percentage Increase and Decrease',
    excerpt: 'A simple guide to calculating percentage changes, commonly used in discounts, price adjustments, and data analysis.',
    category: 'Math',
    readTime: '3 min read',
    date: '2023-12-28',
    icon: Calculator,
  },
  {
    id: 5,
    title: 'Understanding BMR: Your Basal Metabolic Rate',
    excerpt: 'Learn what BMR is, how it differs from TDEE, and why knowing your metabolic rate can help with fitness goals.',
    category: 'Health',
    readTime: '5 min read',
    date: '2023-12-20',
    icon: Scale,
  },
];

export default function Blog() {
  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <BookOpen className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Guides</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Calculator Guides</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">
          Learn how to use our calculators effectively with these in-depth guides and tutorials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => {
          const Icon = article.icon;
          return (
            <article
              key={article.id}
              className="bg-surface-container-low p-6 rounded-xl border border-white/5 hover:border-primary-fixed/50 hover:bg-surface-container-high transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary-fixed/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary-fixed" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">{article.category}</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-fixed transition-colors leading-snug">
                {article.title}
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                {article.excerpt}
              </p>
              <div className="flex items-center gap-4 text-[11px] font-mono text-neutral-600">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {article.readTime}
                </span>
                <span>{article.date}</span>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-12 p-6 bg-surface-container-low rounded-xl border border-white/5">
        <h3 className="text-lg font-bold text-white mb-2">More Guides Coming Soon</h3>
        <p className="text-neutral-400 text-sm">
          We are working on adding more calculator guides covering tax calculations, investment planning, fitness metrics, and more.
        </p>
      </div>
    </div>
  );
}
