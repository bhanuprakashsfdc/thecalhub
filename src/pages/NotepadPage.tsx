import { useState, useEffect, useRef } from 'react';
import { X, Download, Printer, Save, Clock, FileText, RefreshCw } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const STORAGE_KEY = 'thecalhub-notepad-content';

export default function NotepadPage() {
  const [content, setContent] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setContent(saved);
    }
  }, []);

  useEffect(() => {
    const words = content.trim() ? content.trim().split(/\s+/).length : 0;
    setWordCount(words);
    setCharCount(content.length);
  }, [content]);

  useEffect(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, content);
      setLastSaved(new Date());
    }, 1000);
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [content]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'notes.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (confirm('Clear all content? This cannot be undone.')) {
      setContent('');
      localStorage.removeItem(STORAGE_KEY);
      setLastSaved(null);
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Online Notepad",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser",
    "description": "Free online notepad - a simple, distraction-free text editor with autosave, word count, and instant access. No registration required.",
    "url": "https://thecalhub.com/notepad.html",
    "author": {
      "@type": "Organization",
      "name": "TheCalHub",
      "url": "https://thecalhub.com"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Free online text editor",
      "Autosave to browser storage",
      "Real-time word count",
      "Character count",
      "Download as text file",
      "Print notes",
      "Mobile friendly",
      "No registration required",
      "Privacy focused - data stays on device"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is this online notepad free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our online notepad is completely free. No registration or login required. Just open the page and start typing."
        }
      },
      {
        "@type": "Question",
        "name": "Where are my notes stored?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your notes are stored locally in your browser using localStorage. Your data never leaves your device and is not sent to any server."
        }
      },
      {
        "@type": "Question",
        "name": "Will my notes be saved if I close the browser?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Your notes are automatically saved every second as you type. When you return to the page, your notes will be restored automatically."
        }
      },
      {
        "@type": "Question",
        "name": "Can I download my notes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, click the download icon to save your notes as a .txt file to your computer. You can also print your notes directly from the browser."
        }
      },
      {
        "@type": "Question",
        "name": "Does this notepad work on mobile devices?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our notepad is fully responsive and works on smartphones and tablets. The editor adapts to any screen size."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Free Online Notepad | Text Editor with Autosave | TheCalHub</title>
        <meta name="description" content="Free online notepad - simple, distraction-free text editor with autosave. Type notes instantly with real-time word count. No registration required. Access your notes from any device." />
        <meta name="keywords" content="online notepad, free notepad, text editor, word counter, notes app, web notepad, browser notepad, plain text editor, notes online, free text editor, notes storage, simple notepad, minimalist text editor" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://thecalhub.com/notepad.html" />
        <meta property="og:title" content="Free Online Notepad | TheCalHub" />
        <meta property="og:description" content="Simple, free notepad with autosave and word count. No registration required." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://thecalhub.com/notepad.html" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Free Online Notepad" />
        <meta name="twitter:description" content="Simple notepad with autosave - no signup required" />
      </Helmet>
      
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      
      <div className="min-h-screen bg-neutral-900 flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 bg-neutral-800/50 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <h1 className="text-white font-bold text-lg">Free Online Notepad</h1>
            {lastSaved && (
              <span className="text-xs text-green-500 flex items-center gap-1">
                <Save className="w-3 h-3" />
                Saved
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="p-2 hover:bg-white/10 rounded-lg text-neutral-400 hover:text-white transition-colors"
              title="Download as .txt"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={handlePrint}
              className="p-2 hover:bg-white/10 rounded-lg text-neutral-400 hover:text-white transition-colors"
              title="Print notes"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={handleClear}
              className="p-2 hover:bg-red-500/20 rounded-lg text-neutral-400 hover:text-red-400 transition-colors"
              title="Clear all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden p-4">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleContentChange}
            className="w-full h-[calc(100vh-180px)] bg-neutral-900 text-white p-4 outline-none resize-none rounded-lg border border-white/10"
            style={{
              fontSize: '16px',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
              lineHeight: 1.6,
            }}
            placeholder="Start typing your notes..."
            spellCheck={true}
            aria-label="Notepad text editor"
          />
        </div>

        <div className="flex items-center justify-between px-4 py-2 bg-neutral-800/30 border-t border-white/5 text-xs text-neutral-500">
          <div className="flex items-center gap-4">
            <span>{wordCount} words</span>
            <span>{charCount} characters</span>
          </div>
          <span className="text-neutral-600">Plain text editor</span>
        </div>
      </div>

      <div className="bg-neutral-900 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-white mb-6">Why Use Our Free Online Notepad?</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-neutral-800/50 rounded-xl p-5 border border-white/5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary-fixed/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary-fixed" />
                </div>
                <h3 className="text-white font-semibold">Autosave Feature</h3>
              </div>
              <p className="text-neutral-400 text-sm">Your notes are automatically saved every second. Never lose your work again - close the browser and your notes will be there when you return.</p>
            </div>
            
            <div className="bg-neutral-800/50 rounded-xl p-5 border border-white/5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary-fixed/20 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary-fixed" />
                </div>
                <h3 className="text-white font-semibold">Real-time Word Count</h3>
              </div>
              <p className="text-neutral-400 text-sm">Track your writing progress with live word and character counts. Perfect for writers, students, and anyone who needs to meet word limits.</p>
            </div>
            
            <div className="bg-neutral-800/50 rounded-xl p-5 border border-white/5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary-fixed/20 flex items-center justify-center">
                  <Download className="w-5 h-5 text-primary-fixed" />
                </div>
                <h3 className="text-white font-semibold">Download & Print</h3>
              </div>
              <p className="text-neutral-400 text-sm">Easily download your notes as a .txt file or print them directly. Your notes can be saved to your computer or printed as hard copies.</p>
            </div>
            
            <div className="bg-neutral-800/50 rounded-xl p-5 border border-white/5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary-fixed/20 flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 text-primary-fixed" />
                </div>
                <h3 className="text-white font-semibold">Mobile Friendly</h3>
              </div>
              <p className="text-neutral-400 text-sm">Access your notepad from any device - desktop, tablet, or smartphone. Your notes sync automatically across all your devices.</p>
            </div>
          </div>

          <div className="bg-neutral-800/30 rounded-xl p-6 border border-white/5 mb-10">
            <h3 className="text-xl font-bold text-white mb-4">How to Use This Free Notepad</h3>
            <ol className="space-y-3 text-neutral-300">
              <li className="flex gap-3">
                <span className="text-primary-fixed font-bold">1.</span>
                <span>Open the notepad in your web browser - no download or installation needed.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary-fixed font-bold">2.</span>
                <span>Start typing your notes in the text area. Your content saves automatically as you type.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary-fixed font-bold">3.</span>
                <span>View real-time word and character counts in the footer as you type.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary-fixed font-bold">4.</span>
                <span>Click the download icon to save your notes as a .txt file to your computer.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary-fixed font-bold">5.</span>
                <span>Your notes are stored locally - they remain in your browser even after closing.</span>
              </li>
            </ol>
          </div>

          <div className="bg-neutral-800/30 rounded-xl p-6 border border-white/5">
            <h3 className="text-xl font-bold text-white mb-4">Privacy & Security</h3>
            <p className="text-neutral-400 mb-4">
              Your privacy is our priority. Unlike other online notepads, your notes never leave your device. All data is stored using your browser's localStorage - a secure, local storage mechanism that keeps your information on your computer or phone only.
            </p>
            <ul className="space-y-2 text-neutral-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                No data is sent to any server
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                No registration or login required
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                No cookies or tracking
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                Notes persist between sessions
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}