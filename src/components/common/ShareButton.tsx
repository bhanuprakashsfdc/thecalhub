import React, { useState } from 'react';

interface ShareButtonProps {
  title: string;
  text: string;
  url?: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ title, text, url }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = { title, text, url: url || window.location.href };

    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (e) {
        if ((e as Error).name !== 'AbortError') {
          fallbackCopy();
        }
      }
    } else {
      fallbackCopy();
    }
  };

  const fallbackCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${title}\n${text}\n${url || window.location.href}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.warn('Failed to copy to clipboard');
    }
  };

  return (
    <button
      onClick={handleShare}
      className="share-btn"
      aria-label="Share results"
      style={{
        padding: '8px 16px',
        borderRadius: '6px',
        border: '1px solid var(--border-color, #e5e7eb)',
        background: 'var(--bg-secondary, #f9fafb)',
        cursor: 'pointer',
        fontSize: '14px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
      }}
    >
      {copied ? '✓ Copied!' : 'Share'}
    </button>
  );
};