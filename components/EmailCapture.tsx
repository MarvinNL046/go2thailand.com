import { useState } from 'react';
import { useRouter } from 'next/router';
import { useToast } from './Toast';

type Variant = 'inline' | 'sidebar' | 'hero';

interface EmailCaptureProps {
  variant?: Variant;
  heading?: string;
  subtext?: string;
  buttonText?: string;
  className?: string;
}

export default function EmailCapture({
  variant = 'inline',
  heading,
  subtext,
  buttonText,
  className = '',
}: EmailCaptureProps) {
  const { locale } = useRouter();
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const isNl = locale === 'nl';

  const defaults: Record<Variant, { heading: string; subtext: string; buttonText: string }> = {
    inline: {
      heading: isNl ? 'Ontvang Gratis Thailand Reistips' : 'Get Free Thailand Travel Tips',
      subtext: isNl ? 'Sluit je aan bij 1.000+ reizigers. Wekelijkse gidsen, verborgen pareltjes en budget tips \u2014 direct in je inbox.' : 'Join 1,000+ travelers. Weekly guides, hidden gems, and budget hacks \u2014 straight to your inbox.',
      buttonText: isNl ? 'Abonneren' : 'Subscribe',
    },
    sidebar: {
      heading: isNl ? 'Ontvang Thailand Updates' : 'Get Thailand Updates',
      subtext: isNl ? 'Wekelijkse reistips en gidsen' : 'Weekly travel tips and guides',
      buttonText: isNl ? 'Abonneren' : 'Subscribe',
    },
    hero: {
      heading: isNl ? 'Plan je Perfecte Thailand Reis' : 'Plan Your Perfect Thailand Trip',
      subtext: isNl ? 'Ontvang insidertips, budget hacks en verborgen pareltjes wekelijks. Voor altijd gratis.' : 'Get insider tips, budget hacks, and hidden gems delivered weekly. Free forever.',
      buttonText: isNl ? 'Ontvang Gratis Tips' : 'Get Free Tips',
    },
  };

  const d = defaults[variant];
  const h = heading || d.heading;
  const s = subtext || d.subtext;
  const b = buttonText || d.buttonText;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === 'loading') return;
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, site: 'go2thailand', locale: locale || 'en' }),
      });
      if (!res.ok) throw new Error();
      setStatus('idle');
      setEmail('');
      toast.success(isNl ? 'Je bent geabonneerd! Welkom aan boord.' : "You're subscribed! Welcome aboard.");
    } catch {
      setStatus('error');
    }
  };

  if (variant === 'sidebar') {
    return (
      <div className={`bg-surface-dark text-white rounded-2xl p-6 ${className}`}>
        <span className="section-label font-script text-thailand-gold text-sm">{isNl ? 'Blijf op de hoogte' : 'Stay in the loop'}</span>
        <h3 className="text-xl font-bold font-heading mb-2">{h}</h3>
        <p className="mb-4 text-sm opacity-90">{s}</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
            placeholder={isNl ? 'Je e-mailadres' : 'Your email'}
            required
            className="w-full px-4 py-2 rounded-xl text-gray-900 mb-3"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-thailand-red text-white font-medium py-2 rounded-xl hover:bg-thailand-red/90 transition-colors disabled:opacity-50"
          >
            {status === 'loading' ? (isNl ? 'Bezig met abonneren...' : 'Subscribing...') : b}
          </button>
          {status === 'error' && (
            <p className="text-red-300 text-xs mt-2 text-center">{isNl ? 'Er ging iets mis. Probeer opnieuw.' : 'Something went wrong. Try again.'}</p>
          )}
        </form>
      </div>
    );
  }

  if (variant === 'hero') {
    return (
      <div className={`${className}`}>
        <h3 className="text-lg font-bold font-heading text-gray-900 mb-1">{h}</h3>
        <p className="text-sm text-gray-600 mb-3">{s}</p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
            placeholder={isNl ? 'je@email.com' : 'your@email.com'}
            required
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-thailand-red focus:ring-1 focus:ring-thailand-red transition-colors"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-thailand-red text-white font-semibold px-6 py-3 rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 whitespace-nowrap"
          >
            {status === 'loading' ? '...' : b}
          </button>
        </form>
        {status === 'error' && (
          <p className="text-red-500 text-xs mt-2">{isNl ? 'Er ging iets mis. Probeer opnieuw.' : 'Something went wrong. Try again.'}</p>
        )}
        <p className="text-xs text-gray-400 mt-2">{isNl ? 'Geen spam, afmelden wanneer je wilt.' : 'No spam, unsubscribe anytime.'}</p>
      </div>
    );
  }

  // inline variant (default) — mid-article CTA
  return (
    <div className={`bg-gradient-to-r from-thailand-blue/5 to-thailand-red/5 border border-thailand-blue/15 rounded-2xl p-6 my-8 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold font-heading text-gray-900 mb-1">{h}</h3>
          <p className="text-sm text-gray-600">{s}</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 sm:min-w-[320px]">
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
            placeholder={isNl ? 'je@email.com' : 'your@email.com'}
            required
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-thailand-red focus:ring-1 focus:ring-thailand-red transition-colors"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-thailand-red text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 whitespace-nowrap text-sm"
          >
            {status === 'loading' ? '...' : b}
          </button>
        </form>
      </div>
      {status === 'error' && (
        <p className="text-red-500 text-xs mt-2">{isNl ? 'Er ging iets mis. Probeer opnieuw.' : 'Something went wrong. Try again.'}</p>
      )}
      <p className="text-xs text-gray-400 mt-2">{isNl ? 'Voor altijd gratis. Geen spam, afmelden wanneer je wilt.' : 'Free forever. No spam, unsubscribe anytime.'}</p>
    </div>
  );
}
