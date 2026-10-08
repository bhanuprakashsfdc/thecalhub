import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const ADSENSE_CLIENT: string | undefined = import.meta.env.VITE_ADSENSE_CLIENT
  ? String(import.meta.env.VITE_ADSENSE_CLIENT)
  : undefined;

const ADSENSE_SCRIPT_HOST = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=';

let scriptRequested = false;

function loadAdsenseScript(client: string): void {
  if (scriptRequested) return;
  scriptRequested = true;
  if (typeof document === 'undefined') return;
  if (!document.querySelector('meta[name="google-adsense-account"]')) {
    const meta = document.createElement('meta');
    meta.setAttribute('name', 'google-adsense-account');
    meta.setAttribute('content', client);
    document.head.appendChild(meta);
  }
  if (document.querySelector('script[data-adsbygoogle-client]')) return;
  const script = document.createElement('script');
  script.async = true;
  script.crossOrigin = 'anonymous';
  script.src = `${ADSENSE_SCRIPT_HOST}${encodeURIComponent(client)}`;
  script.setAttribute('data-adsbygoogle-client', client);
  document.head.appendChild(script);
}

export interface AdSlotProps {
  slot: string | number;
  format?: string;
  layout?: string;
  width?: number;
  height?: number;
  className?: string;
}

export function AdSlot({
  slot,
  format = 'auto',
  layout,
  width = 336,
  height = 280,
  className = '',
}: AdSlotProps) {
  const insRef = useRef<HTMLModElement>(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    if (!ADSENSE_CLIENT) return;
    loadAdsenseScript(ADSENSE_CLIENT);
    if (pushedRef.current || !insRef.current) return;
    pushedRef.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      pushedRef.current = false;
    }
  }, [slot]);

  if (!ADSENSE_CLIENT) return null;

  return (
    <aside
      className={`w-full overflow-hidden ${className}`.trim()}
      style={{ minHeight: height }}
      aria-label="Advertisement"
    >
      <ins
        ref={insRef}
        className="adsbygoogle"
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
        {...(layout ? { 'data-ad-layout': layout } : {})}
        style={{
          display: 'block',
          width: '100%',
          height,
          maxWidth: width >= 728 ? '100%' : width,
        }}
      />
    </aside>
  );
}

export default AdSlot;
