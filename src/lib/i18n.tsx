import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';

export type Currency = 'USD' | 'INR' | 'EUR' | 'GBP' | 'JPY' | 'AUD' | 'CAD' | 'SGD' | 'AED' | 'SAR';

export interface CurrencyInfo {
  code: Currency;
  symbol: string;
  name: string;
}

export const currencies: CurrencyInfo[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal' },
];

export type Locale = 'en' | 'hi' | 'es';

export interface LocaleInfo {
  code: Locale;
  nativeName: string;
  htmlLang: string;
  ogLocale: string;
}

export const locales: LocaleInfo[] = [
  { code: 'en', nativeName: 'English', htmlLang: 'en', ogLocale: 'en_US' },
  { code: 'hi', nativeName: 'हिन्दी', htmlLang: 'hi', ogLocale: 'hi_IN' },
  { code: 'es', nativeName: 'Español', htmlLang: 'es', ogLocale: 'es_ES' },
];

export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALE_STORAGE_KEY = 'thecalhub-locale';

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && locales.some((entry) => entry.code === value);
}

export interface LocalizedSeo {
  title: string;
  description: string;
}

type MessageBundle = Record<string, string>;

const MESSAGES: Record<Locale, MessageBundle> = {
  en: {
    'home.headline': '{count}+ Calculators in one place',
    'home.searchPlaceholder': 'Search calculators...',
    'home.seoHeading':
      'The Ultimate Hub for Precision Calculations and Financial Planning',
    'seo.emi-calculator.title': 'EMI Calculator',
    'seo.emi-calculator.description':
      'Calculate your loan EMI online with reducing balance method.',
    'seo.bmi-calculator.title': 'BMI Calculator',
    'seo.bmi-calculator.description':
      'Calculate your Body Mass Index (BMI) online for free.',
    'seo.sip-calculator.title': 'SIP Calculator',
    'seo.sip-calculator.description':
      'Calculate SIP returns and plan mutual fund investments.',
  },
  hi: {
    'home.headline': '{count}+ कैलकुलेटर एक ही जगह',
    'home.searchPlaceholder': 'कैलकुलेटर खोजें...',
    'home.seoHeading': 'सटीक गणना और वित्तीय योजना के लिए अंतिम केंद्र',
    'seo.emi-calculator.title': 'ईएमआई कैलकुलेटर',
    'seo.emi-calculator.description':
      'अपने ऋण का ईएमआई घटते शेष विधि से ऑनलाइन गणना करें।',
    'seo.bmi-calculator.title': 'बीएमआई कैलकुलेटर',
    'seo.bmi-calculator.description':
      'अपना बॉडी मास इंडेक्स (BMI) ऑनलाइन मुफ़्त में जाँचें।',
    'seo.sip-calculator.title': 'एसआईपी कैलकुलेटर',
    'seo.sip-calculator.description':
      'एसआईपी रिटर्न की गणना करें और म्यूचुअल फंड निवेश की योजना बनाएँ।',
  },
  es: {
    'home.headline': '{count}+ calculadoras en un solo lugar',
    'home.searchPlaceholder': 'Buscar calculadoras...',
    'home.seoHeading':
      'El centro definitivo para cálculos de precisión y planificación financiera',
    'seo.emi-calculator.title': 'Calculadora de EMI',
    'seo.emi-calculator.description':
      'Calcula la EMI de tu préstamo en línea con el método de saldo decreciente.',
    'seo.bmi-calculator.title': 'Calculadora de IMC',
    'seo.bmi-calculator.description':
      'Calcula tu Índice de Masa Corporal (IMC) online gratis.',
    'seo.sip-calculator.title': 'Calculadora de SIP',
    'seo.sip-calculator.description':
      'Calcula la rentabilidad del SIP y planifica tus inversiones en fondos.',
  },
};

function lookup(locale: Locale, key: string): string | undefined {
  return MESSAGES[locale][key] ?? (locale === DEFAULT_LOCALE ? undefined : MESSAGES[DEFAULT_LOCALE][key]);
}

export function translate(locale: Locale, key: string, fallback?: string): string {
  return lookup(locale, key) ?? fallback ?? key;
}

export function localizedSeo(
  locale: Locale,
  pageId: string,
  fallback: LocalizedSeo
): LocalizedSeo {
  return {
    title: translate(locale, `seo.${pageId}.title`, fallback.title),
    description: translate(locale, `seo.${pageId}.description`, fallback.description),
  };
}

export function hasLocalizedSeo(locale: Locale, pageId: string): boolean {
  return Boolean(MESSAGES[locale][`seo.${pageId}.title`]);
}

export function translatedSeoPages(locale: Locale): string[] {
  return Object.keys(MESSAGES[locale])
    .filter((key) => key.startsWith('seo.') && key.endsWith('.title'))
    .map((key) => key.slice('seo.'.length, -'.title'.length));
}

const STORAGE_KEY = 'thecalhub-currency';

interface I18nContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  getCurrencySymbol: () => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  localeInfo: LocaleInfo;
  availableLocales: LocaleInfo[];
  t: (key: string, fallback?: string) => string;
  localizeSeo: (pageId: string, fallback: LocalizedSeo) => LocalizedSeo;
  hasLocalizedSeo: (pageId: string) => boolean;
  translatedSeoPages: () => string[];
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

function readStoredLocale(): Locale {
  const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
  return isLocale(saved) ? saved : DEFAULT_LOCALE;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return (saved as Currency) || 'USD';
  });

  const [locale, setLocaleState] = useState<Locale>(readStoredLocale);

  useEffect(() => {
    const info = locales.find((entry) => entry.code === locale);
    document.documentElement.lang = info?.htmlLang || DEFAULT_LOCALE;
  }, [locale]);

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    localStorage.setItem(STORAGE_KEY, newCurrency);
  };

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
  };

  const getCurrencySymbol = () => {
    const info = currencies.find(c => c.code === currency);
    return info?.symbol || '$';
  };

  const localeValue = useMemo<LocaleContextType>(() => {
    const localeInfo = locales.find((entry) => entry.code === locale) || locales[0];
    return {
      locale,
      setLocale,
      localeInfo,
      availableLocales: locales,
      t: (key: string, fallback?: string) => translate(locale, key, fallback),
      localizeSeo: (pageId: string, fallback: LocalizedSeo) =>
        localizedSeo(locale, pageId, fallback),
      hasLocalizedSeo: (pageId: string) => hasLocalizedSeo(locale, pageId),
      translatedSeoPages: () => translatedSeoPages(locale),
    };
  }, [locale]);

  return (
    <I18nContext.Provider value={{ currency, setCurrency, getCurrencySymbol }}>
      <LocaleContext.Provider value={localeValue}>
        {children}
      </LocaleContext.Provider>
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within I18nProvider');
  }
  return context;
}

export function formatMoneyWithSymbol(amount: number, symbol: string): string {
  return `${symbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatMoney(amount: number): string {
  const context = useContext(I18nContext);
  const symbol = context?.getCurrencySymbol() || '$';
  return `${symbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
