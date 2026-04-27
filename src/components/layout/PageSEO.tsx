import { Helmet } from 'react-helmet-async';

interface PageSEOProps {
  title: string;
  description: string;
  keywords?: string;
  path?: string;
  faqs?: Array<{ question: string; answer: string }>;
}

export function PageSEO({ title, description, keywords, path, faqs }: PageSEOProps) {
  const siteTitle = 'TheCalHub';
  const fullTitle = title === 'Dashboard' ? siteTitle : `${title} | ${siteTitle}`;
  const url = path ? `https://thecalhub.com${path}` : 'https://thecalhub.com';
  
  const jsonLd: any = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": title.includes('Calculator') ? "SoftwareApplication" : "WebApplication",
        "name": fullTitle,
        "description": description,
        "url": url,
        "applicationCategory": title.includes('Calculator') ? "EducationalApplication" : "BusinessApplication",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "author": {
          "@type": "Organization",
          "name": "TheCalHub",
          "url": "https://thecalhub.com"
        }
      }
    ]
  };

  if (faqs && faqs.length > 0) {
    jsonLd["@graph"].push({
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    });
  }

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
