// Google Analytics 4 integration
// Replace GA_MEASUREMENT_ID with your actual GA4 measurement ID

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your GA4 measurement ID

/**
 * Initialize Google Analytics 4
 */
export function initAnalytics(): void {
  // Check if already initialized
  if (typeof window !== 'undefined' && !window.gtag) {
    window.dataLayer = window.dataLayer || [];

    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    };

    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      send_page_view: true,
    });
  }
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
  trackPageView,
  trackCalculatorUsage,
  trackEvent,
};
