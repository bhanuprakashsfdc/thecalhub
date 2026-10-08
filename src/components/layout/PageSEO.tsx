import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { initAnalytics } from '@/src/lib/analytics';

interface PageSEOProps {
  title: string;
  description: string;
  keywords?: string;
  path?: string;
  faqs?: Array<{ question: string; answer: string }>;
}

type JsonLdNode = Record<string, unknown>;

const SITE_NAME = 'TheCalHub';
const SITE_URL = 'https://thecalhub.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

function resolveOgImage(): string {
  const configured = import.meta.env.VITE_OG_IMAGE;
  if (configured && String(configured).trim().length > 0) {
    return String(configured);
  }
  return DEFAULT_OG_IMAGE;
}

export function PageSEO({ title, description, keywords, path, faqs }: PageSEOProps) {
  useEffect(() => {
    initAnalytics();
  }, []);

  const fullTitle = title === 'Dashboard' ? SITE_NAME : `${title} | ${SITE_NAME}`;
  const url = path ? `${SITE_URL}${path}` : `${SITE_URL}/`;
  const ogImage = resolveOgImage();
  const graph: JsonLdNode[] = [
    {
      '@type': title.includes('Calculator') ? 'SoftwareApplication' : 'WebApplication',
      name: fullTitle,
      description,
      url,
      applicationCategory: title.includes('Calculator') ? 'EducationalApplication' : 'BusinessApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      author: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
    },
  ];

  if (faqs && faqs.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  if (path && path !== '/') {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${SITE_URL}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: title,
          item: url,
        },
      ],
    });
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': graph,
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={`${fullTitle} — free online calculator on ${SITE_NAME}`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={`${fullTitle} — free online calculator on ${SITE_NAME}`} />
    </Helmet>
  );
}
