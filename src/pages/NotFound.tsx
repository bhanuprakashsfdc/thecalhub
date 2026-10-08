import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, ArrowLeft, SearchX } from 'lucide-react';
import { searchCalculators } from '../data/data';

const TOP_CALCULATORS = [
  { name: 'BMI Calculator', path: '/bmi-calculator.html', description: 'Body mass index from weight and height' },
  { name: 'EMI Calculator', path: '/emi-calculator.html', description: 'Monthly loan installment and interest' },
  { name: 'SIP Calculator', path: '/sip-calculator.html', description: 'Mutual fund SIP returns' },
  { name: 'Percentage Calculator', path: '/percentage-calculator.html', description: 'Percent of, percent change, and more' },
  { name: 'Age Calculator', path: '/age-calculator.html', description: 'Exact age in years, months, and days' },
  { name: 'GST Calculator', path: '/gst-calculator.html', description: 'Add or remove GST from any amount' },
  { name: 'Compound Interest Calculator', path: '/compound-interest-calculator.html', description: 'Growth of savings and investments' },
  { name: 'Home Loan Calculator', path: '/home-loan-calculator.html', description: 'Home loan EMI and total interest' },
];

export default function NotFound() {
  const [query, setQuery] = useState('');
  const trimmed = query.trim();
  const results = trimmed ? searchCalculators(trimmed) : [];

  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <Helmet>
        <title>Page Not Found | TheCalHub</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="mb-10 max-w-2xl">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <SearchX className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Error 404</span>
        </div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Page not found</h1>
        <p className="text-neutral-400 text-lg leading-relaxed">
          Sorry — the page you are looking for does not exist. It may have been moved, renamed, or the link may be mistyped.
          Nothing was lost: every calculator is still one click away below.
        </p>
        <a href="/" className="inline-flex items-center gap-2 mt-6 px-5 py-3 rounded-lg bg-primary-fixed text-on-primary-fixed text-sm font-bold hover:opacity-90 transition-all">
          <ArrowLeft className="w-4 h-4" />
          Back to homepage
        </a>
      </div>

      <div className="max-w-2xl mb-14">
        <label htmlFor="notfound-search" className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Search calculators</label>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
          <input
            id="notfound-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try “bmi”, “emi”, “gst”…"
            className="w-full bg-surface-container-low border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white text-base focus:ring-1 focus:ring-primary-fixed outline-none transition-all"
          />
        </div>
        {trimmed && (
          <div className="mt-4 space-y-2">
            {results.length > 0 ? (
              results.slice(0, 8).map((calc) => (
                <a key={calc.id} href={calc.path} className="flex items-center justify-between gap-4 bg-surface-container-low p-4 rounded-xl border border-white/5 hover:border-primary-fixed/50 transition-all">
                  <span className="text-white font-medium">{calc.name}</span>
                  <span className="text-neutral-500 text-sm hidden sm:block">{calc.description}</span>
                </a>
              ))
            ) : (
              <p className="text-neutral-500 text-sm">No calculator matches “{trimmed}”. Try a broader search below.</p>
            )}
          </div>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-white tracking-tight">Popular calculators</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {TOP_CALCULATORS.map((calc) => (
          <a key={calc.path} href={calc.path} className="bg-surface-container-low p-5 rounded-xl border border-white/5 hover:border-primary-fixed/50 transition-all block">
            <h3 className="text-lg font-bold text-white mb-1">{calc.name}</h3>
            <p className="text-neutral-400 text-sm">{calc.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
