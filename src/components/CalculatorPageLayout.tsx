import React from 'react';
import { PageSEO } from './layout/PageSEO';
import { SEOContentSection } from './common/SEOContentSection';
import { getSEOContent } from '../../src/data/seo-data';
import { useLocation } from 'react-router-dom';

interface CalculatorPageLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  keywords?: string;
  category?: 'finance' | 'health' | 'math' | 'construction';
}

export function CalculatorPageLayout({
  children,
  title,
  description,
  keywords,
  category = 'finance'
}: CalculatorPageLayoutProps) {
  const location = useLocation();
  const path = location.pathname;
  
  // Use the filename (without extension) as the ID for SEO content
  const id = path.split('/').pop()?.replace('.html', '') || 'default';
  const seoData = getSEOContent(id, category);

  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <PageSEO 
        title={title}
        description={description}
        keywords={keywords}
        path={path}
        faqs={seoData.faqs}
      />
      
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-white tracking-tighter mb-2">{title}</h1>
        <p className="text-neutral-400 max-w-2xl text-lg">{description}</p>
      </div>

      <div className="mb-20">
        {children}
      </div>

      <SEOContentSection 
        title={seoData.title}
        subtitle={seoData.subtitle}
        introduction={seoData.introduction}
        mainContent={seoData.mainContent}
        faqs={seoData.faqs}
        relatedCalculators={seoData.relatedCalculators}
      />
    </div>
  );
}
