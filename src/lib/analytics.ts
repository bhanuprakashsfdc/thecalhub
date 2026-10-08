declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const GA_MEASUREMENT_ID: string | undefined = import.meta.env.VITE_GA_ID
  ? String(import.meta.env.VITE_GA_ID)
  : undefined;

function hasValidMeasurementId(id: string): boolean {
  return /^G-[A-Z0-9]{4,}$/.test(id);
}

function injectGtagScript(id: string): void {
  if (typeof document === 'undefined') return;
  if (document.querySelector('script[data-ga-measurement-id]')) return;
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  script.setAttribute('data-ga-measurement-id', id);
  document.head.appendChild(script);
}

/**
 * Initialize Google Analytics 4.
 * No-op unless a real VITE_GA_ID (G-XXXXXXXXXX) is configured at build time.
 */
export function initAnalytics(): void {
  if (typeof window === 'undefined' || window.gtag) return;
  if (!GA_MEASUREMENT_ID || !hasValidMeasurementId(GA_MEASUREMENT_ID)) return;

  window.dataLayer = window.dataLayer || [];

  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: true,
  });

  injectGtagScript(GA_MEASUREMENT_ID);
}

export function isAnalyticsEnabled(): boolean {
  return Boolean(GA_MEASUREMENT_ID && hasValidMeasurementId(GA_MEASUREMENT_ID));
}

/**
 * Track page views
 */
export function trackPageView(path: string, title: string): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title,
    });
  }
}

/**
 * Track calculator usage
 */
export function trackCalculatorUsage(calculatorName: string, action: 'calculate' | 'reset'): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', `${calculatorName}_${action}`, {
      event_category: 'calculator',
      event_label: action,
    });
  }
}

/**
 * Track custom events
 */
export function trackEvent(eventName: string, params?: Record<string, unknown>): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
}

export default {
  initAnalytics,
  isAnalyticsEnabled,
  trackPageView,
  trackCalculatorUsage,
  trackEvent,
};
