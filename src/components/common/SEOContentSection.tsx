import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowRight, Calculator, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FAQ {
  question: string;
  answer: string;
}

interface SEOContentSectionProps {
  title: string;
  subtitle: string;
  introduction: string;
  mainContent: React.ReactNode;
  faqs: FAQ[];
  relatedCalculators: Array<{ name: string; path: string; icon?: React.ElementType }>;
}

export function SEOContentSection({
  title,
  subtitle,
  introduction,
  mainContent,
  faqs,
  relatedCalculators
}: SEOContentSectionProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

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
