import React from 'react';
import { PageSEO } from './layout/PageSEO';
import { SEOContentSection } from './common/SEOContentSection';
import { AdSlot } from './common/AdSlot';
import { getSEOContent } from '../../src/data/seo-data';
import { useLocation } from 'react-router-dom';

interface CalculatorPageLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  keywords?: string;
  category?: string;
}

const CATEGORY_CRUMBS: Record<string, { name: string; path: string }> = {
  finance: { name: 'Finance', path: '/financial.html' },
  financial: { name: 'Finance', path: '/financial.html' },
  health: { name: 'Health', path: '/health.html' },
  math: { name: 'Math', path: '/math.html' },
  construction: { name: 'Construction', path: '/construction.html' },
  datetime: { name: 'Date & Time', path: '/datetime.html' },
  scientific: { name: 'Scientific', path: '/scientific.html' },
  programming: { name: 'Programming', path: '/programming.html' },
  fitness: { name: 'Fitness', path: '/fitness.html' },
  trading: { name: 'Trading', path: '/trading.html' },
  standard: { name: 'Standard', path: '/standard.html' }
};

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

  const categoryCrumb = CATEGORY_CRUMBS[category];
  const breadcrumbItems = [
    { name: 'Home', item: 'https://thecalhub.com/' },
    ...(categoryCrumb ? [{ name: categoryCrumb.name, item: `https://thecalhub.com${categoryCrumb.path}` }] : []),
    { name: title, item: `https://thecalhub.com${path}` }
  ];
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.item
    }))
  };

  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <PageSEO 
        title={title}
        description={description}
        keywords={keywords}
        path={path}
        faqs={seoData.faqs}
      />
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </script>

      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-white tracking-tighter mb-2">{title}</h1>
        <p className="text-neutral-400 max-w-2xl text-lg">{description}</p>
      </div>

      <div className="mb-20">
        {children}
      </div>

      <AdSlot slot="calculator-below-widget" />

      <SEOContentSection 
        title={seoData.title}
        subtitle={seoData.subtitle}
        introduction={seoData.introduction}
        mainContent={seoData.mainContent}
        faqs={seoData.faqs}
        relatedCalculators={seoData.relatedCalculators}
        howWeCalculate={seoData.howWeCalculate}
        workedExample={seoData.workedExample}
        commonValues={seoData.commonValues}
      />

      <AdSlot slot="calculator-below-content" />
    </div>
  );
}
