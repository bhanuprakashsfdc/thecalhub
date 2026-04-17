import { Helmet } from 'react-helmet-async';

interface PageSEOProps {
  title: string;
  description: string;
  keywords?: string;
  path?: string;
}

export function PageSEO({ title, description, keywords, path }: PageSEOProps) {
  const siteTitle = 'TheCalHub';
  const fullTitle = title === 'Dashboard' ? siteTitle : `${title} | ${siteTitle}`;
  const url = path ? `https://thecalhub.com${path}` : 'https://thecalhub.com';
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      
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
