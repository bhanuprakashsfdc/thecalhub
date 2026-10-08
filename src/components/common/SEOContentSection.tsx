import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowRight, Calculator, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FAQ {
  question: string;
  answer: string;
}

interface HowWeCalculate {
  formula?: string;
  explanation?: string;
  example?: string;
}

interface WorkedExample {
  scenario: string;
  steps: string[];
  result: string;
}

interface CommonValuesTable {
  heading?: string;
  columns: string[];
  rows: string[][];
}

interface SEOContentSectionProps {
  title: string;
  subtitle: string;
  introduction: string;
  mainContent: React.ReactNode;
  faqs: FAQ[];
  relatedCalculators: Array<{ name: string; path: string; icon?: React.ElementType }>;
  howWeCalculate?: HowWeCalculate;
  workedExample?: WorkedExample;
  commonValues?: CommonValuesTable;
}

export function SEOContentSection({
  title,
  subtitle,
  introduction,
  mainContent,
  faqs,
  relatedCalculators,
  howWeCalculate,
  workedExample,
  commonValues
}: SEOContentSectionProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const topic = subtitle.replace(/\b(Calculator|Tool|Online|Number)\b/gi, '').trim() || subtitle;
  const defaultExplanation = `The ${subtitle} applies the standard, widely accepted ${topic} method to the values you enter above. The result is computed instantly in your browser with full precision, and your inputs never leave this device.`;

  return (
    <section className="mt-24 border-t border-white/5 pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-12">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-3xl font-black text-white tracking-tighter mb-8 leading-tight">
              {title} <span className="text-primary-fixed">{subtitle}</span>
            </h2>
            <p className="text-neutral-400 text-lg leading-relaxed mb-6">
              {introduction}
            </p>
            
            {mainContent}

            <div className="mt-16">
              <h3 className="text-2xl font-black text-white mb-6 tracking-tight">How we calculate this</h3>
              {howWeCalculate?.formula && (
                <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-6 mb-6">
                  <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-3">Formula</h4>
                  <p className="font-mono text-neutral-200 text-sm leading-relaxed">{howWeCalculate.formula}</p>
                </div>
              )}
              <p className="text-neutral-400 leading-relaxed mb-6">
                {howWeCalculate?.explanation || defaultExplanation}
              </p>
              {howWeCalculate?.example && (
                <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-6">
                  <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-3">Example</h4>
                  <p className="text-neutral-300 text-sm leading-relaxed">{howWeCalculate.example}</p>
                </div>
              )}
            </div>

            {workedExample && workedExample.steps.length > 0 && (
              <div className="mt-16">
                <h3 className="text-2xl font-black text-white mb-6 tracking-tight">Worked example</h3>
                <div className="bg-surface-container-low border border-white/5 rounded-2xl p-6">
                  <p className="text-white font-bold text-sm mb-5">{workedExample.scenario}</p>
                  <ol className="space-y-3 mb-6">
                    {workedExample.steps.map((step, index) => (
                      <li key={index} className="flex items-start gap-3 text-neutral-400 text-sm leading-relaxed">
                        <span className="shrink-0 w-6 h-6 rounded bg-white/5 flex items-center justify-center text-primary-fixed font-bold text-xs">{index + 1}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                  <div className="bg-surface-container-high/50 border border-primary-fixed/10 rounded-xl px-4 py-3">
                    <span className="text-primary-fixed font-black uppercase tracking-widest text-xs">Result: </span>
                    <span className="text-white font-bold text-sm">{workedExample.result}</span>
                  </div>
                </div>
              </div>
            )}

            {commonValues && commonValues.rows.length > 0 && commonValues.columns.length > 0 && (
              <div className="mt-16">
                <h3 className="text-2xl font-black text-white mb-6 tracking-tight">{commonValues.heading || 'Common values'}</h3>
                <div className="bg-surface-container-low border border-white/5 rounded-2xl overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        {commonValues.columns.map((column, index) => (
                          <th key={index} className="text-left text-primary-fixed font-black uppercase tracking-widest text-xs px-5 py-4 whitespace-nowrap">{column}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {commonValues.rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border-b border-white/5 last:border-b-0">
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className={`px-5 py-3 whitespace-nowrap ${cellIndex === 0 ? 'text-white font-bold' : 'text-neutral-400'}`}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="mt-16">
              <h3 className="text-2xl font-black text-white mb-8 tracking-tight">Calculator FAQs</h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div 
                    key={index}
                    className="bg-surface-container-low border border-white/5 rounded-2xl overflow-hidden transition-all hover:border-white/10"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                      className="w-full flex items-center justify-between p-6 text-left"
                    >
                      <span className="font-bold text-white text-[15px]">{faq.question}</span>
                      {openFaqIndex === index ? (
                        <ChevronUp className="w-5 h-5 text-primary-fixed" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-neutral-500" />
                      )}
                    </button>
                    {openFaqIndex === index && (
                      <div className="px-6 pb-6 text-neutral-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-surface-container-low border border-white/5 rounded-2xl p-6">
            <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-widest">Related Tools</h4>
            <div className="space-y-4">
              {relatedCalculators.map((item) => {
                const Icon = item.icon || Calculator;
                return (
                  <Link 
                    key={item.name} 
                    to={item.path}
                    className="flex items-center justify-between p-3 hover:bg-white/5 rounded-xl transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-primary-fixed">
                        <Icon className="w-4 h-4" />
                      </div>
                      <p className="text-sm font-bold text-white group-hover:text-primary-fixed">{item.name}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-primary-fixed" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="bg-primary-fixed/5 border border-primary-fixed/10 rounded-2xl p-6 flex flex-col items-center text-center">
            <ShieldCheck className="text-primary-fixed w-10 h-10 mb-4 shadow-[0_0_15px_rgba(214,237,121,0.2)]" />
            <h4 className="text-white font-bold text-sm mb-2 uppercase tracking-widest">Verified Precision</h4>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Every tool on TheCalHub is tested against industry standards. All calculations are private and happen entirely in your browser.
            </p>
          </div>

          <div className="bg-surface-container-highest/30 border border-white/5 rounded-2xl p-6">
            <Zap className="text-secondary w-8 h-8 mb-4" />
            <h4 className="text-white font-bold text-sm mb-2 uppercase tracking-widest">Lightning Fast</h4>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Experience zero-latency results. Optimized for mobile and desktop for instant access whenever you need it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
