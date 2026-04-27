const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://thecalhub.com';
const OUTPUT_FILE = path.join(__dirname, '../public/sitemap.xml');

const pages = [
  { path: '/', changefreq: 'daily', priority: 1.0 },
  { path: '/all.html', changefreq: 'weekly', priority: 0.9 },
  { path: '/standard.html', changefreq: 'monthly', priority: 0.8 },
  { path: '/financial.html', changefreq: 'weekly', priority: 0.7 },
  { path: '/health.html', changefreq: 'weekly', priority: 0.7 },
  { path: '/scientific.html', changefreq: 'weekly', priority: 0.7 },
  { path: '/programming.html', changefreq: 'weekly', priority: 0.7 },
  { path: '/math.html', changefreq: 'weekly', priority: 0.7 },
  { path: '/fitness.html', changefreq: 'weekly', priority: 0.7 },
  { path: '/datetime.html', changefreq: 'weekly', priority: 0.7 },
  { path: '/construction.html', changefreq: 'weekly', priority: 0.7 },
  { path: '/trading.html', changefreq: 'weekly', priority: 0.7 },
  { path: '/scientific-calculator.html', changefreq: 'monthly', priority: 0.8 },
  { path: '/programming-calculator.html', changefreq: 'monthly', priority: 0.8 },
  { path: '/support.html', changefreq: 'monthly', priority: 0.5 },
  { path: '/about.html', changefreq: 'monthly', priority: 0.5 },
  { path: '/contact.html', changefreq: 'monthly', priority: 0.5 },
  { path: '/privacy-policy.html', changefreq: 'monthly', priority: 0.5 },
  { path: '/terms-of-service.html', changefreq: 'monthly', priority: 0.5 },
  { path: '/faq.html', changefreq: 'monthly', priority: 0.6 },
  { path: '/blog.html', changefreq: 'weekly', priority: 0.6 },
  { path: '/tutorials.html', changefreq: 'weekly', priority: 0.6 },
  { path: '/calculator-suite.html', changefreq: 'monthly', priority: 0.7 },
];

const calculatorPaths = [
  '/fraction-calculator.html', '/percent-calculator.html', '/percentage-calculator.html',
  '/bmi-calculator.html', '/bmr-calculator.html', '/calorie-calculator.html',
  '/gst-calculator.html', '/tip-calculator.html', '/pace-calculator.html',
  '/tdee-calculator.html', '/age-calculator.html', '/date-calculator.html',
  '/compound-interest-calculator.html', '/simple-interest-calculator.html',
  '/fd-calculator.html', '/rd-calculator.html', '/sip-calculator.html',
  '/nps-calculator.html', '/ppf-calculator.html', '/home-loan-calculator.html',
  '/car-loan-calculator.html', '/personal-loan-calculator.html', '/mortgage-calculator.html',
  '/loan-calculator.html', '/tax-calculator.html', '/retirement-calculator.html',
  '/investment-calculator.html', '/concrete-calculator.html', '/stair-calculator.html',
  '/gravel-calculator.html', '/tile-calculator.html', '/paint-calculator.html',
  '/wood-calculator.html', '/cubic-yards-calculator.html', '/position-size-calculator.html',
  '/risk-reward-calculator.html', '/pnl-calculator.html', '/stop-loss-calculator.html',
  '/breakeven-calculator.html', '/kelly-criterion-calculator.html', '/risk-of-ruin-calculator.html',
  '/cagr-calculator.html', '/liquidation-calculator.html', '/dca-calculator.html',
  '/standard.html', '/basic-arithmetic-calculator.html', '/trigonometric-calculator.html',
  '/logarithmic-calculator.html', '/complex-number-calculator.html', '/matrix-calculator.html',
  '/statistical-calculator.html', '/unit-conversion-calculator.html', '/equation-solver.html',
  '/graphing-calculator.html', '/scientific-constants.html', '/time-complexity-calculator.html',
  '/big-o-analyzer.html', '/binary-hex-decimal-converter.html', '/bitwise-calculator.html',
  '/regex-tester.html', '/json-formatter.html', '/hash-generator.html',
  '/base64-encoder.html', '/code-beautifier.html', '/memory-size-calculator.html',
  '/addition-calculator.html', '/subtraction-calculator.html', '/multiplication-calculator.html',
  '/division-calculator.html', '/square-root-calculator.html', '/power-calculator.html',
  '/ratio-calculator.html', '/average-calculator.html', '/trigonometry-calculator.html',
  '/body-fat-calculator.html', '/quadratic-calculator.html', '/lcm-calculator.html',
  '/gcd-calculator.html', '/probability-calculator.html', '/permutation-calculator.html',
  '/combination-calculator.html', '/prime-number-calculator.html', '/factorial-calculator.html',
  '/sequence-calculator.html', '/geometry-calculator.html', '/calories-burned-calculator.html',
  '/one-rep-max-calculator.html', '/vo2-max-calculator.html', '/lean-mass-calculator.html',
  '/step-counter-calculator.html', '/macro-calculator.html', '/ideal-weight-calculator.html',
  '/water-intake-calculator.html', '/heart-rate-calculator.html', '/pregnancy-calculator.html',
  '/ovulation-calculator.html', '/inflation-calculator.html', '/npv-calculator.html',
  '/irr-calculator.html', '/date-difference-calculator.html', '/time-duration-calculator.html',
  '/time-zone-converter.html', '/cement-calculator.html', '/brick-calculator.html',
  '/leap-year-calculator.html', '/week-number-calculator.html', '/business-days-calculator.html',
  '/date-add-subtract-calculator.html', '/steel-weight-calculator.html', '/area-calculator.html',
  '/volume-calculator.html', '/roofing-calculator.html', '/flooring-calculator.html',
  '/vector-calculator.html', '/scientific-notation-calculator.html', '/logarithm-calculator.html',
  '/exponential-calculator.html', '/drawdown-calculator.html', '/workout-timer.html',
  '/macro-split-calculator.html', '/investment-pnl-calculator.html',
];

calculatorPaths.forEach(calcPath => {
  pages.push({ path: calcPath, changefreq: 'monthly', priority: 0.8 });
});

const today = new Date().toISOString().split('T')[0];

function generateSitemap() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
  pages.forEach(page => {
    xml += `  <url>
    <loc>${BASE_URL}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  });
  xml += '</urlset>';
  fs.writeFileSync(OUTPUT_FILE, xml);
  console.log(`Sitemap generated! Total URLs: ${pages.length}`);
}

generateSitemap();