import React from 'react';
import Link from 'next/link';
import { getBlogFunnelContext, BlogFunnelInput, FunnelCta } from '../../lib/blog-funnel-intent';

interface Props {
  post: BlogFunnelInput;
  locale?: string;
  placement?: 'top' | 'bottom';
}

const COPY = {
  en: {
    eyebrow: (type: string) => {
      switch (type) {
        case 'destination': return 'Plan this trip';
        case 'things-to-do': return 'Book these activities';
        case 'transport': return 'Sort your transport';
        case 'hotel': return 'Check rates';
        case 'travel-prep': return 'Get trip-ready';
        default: return 'Next step';
      }
    },
    heading: (cityName: string | null, type: string) => {
      if (type === 'transport') return cityName ? `Ready to travel to ${cityName}?` : 'Ready to sort transport?';
      if (type === 'hotel') return cityName ? `Ready to book in ${cityName}?` : 'Ready to book?';
      if (type === 'travel-prep') return 'Ready to travel?';
      if (type === 'things-to-do') return cityName ? `Build a ${cityName} trip around these` : 'Plan the trip';
      return cityName ? `Planning ${cityName}?` : 'Plan your trip';
    },
  },
  nl: {
    eyebrow: (type: string) => {
      switch (type) {
        case 'destination': return 'Plan je trip';
        case 'things-to-do': return 'Boek deze activiteiten';
        case 'transport': return 'Regel je vervoer';
        case 'hotel': return 'Check prijzen';
        case 'travel-prep': return 'Maak je reis-klaar';
        default: return 'Volgende stap';
      }
    },
    heading: (cityName: string | null, type: string) => {
      if (type === 'transport') return cityName ? `Klaar om naar ${cityName} te reizen?` : 'Klaar om vervoer te regelen?';
      if (type === 'hotel') return cityName ? `Klaar om in ${cityName} te boeken?` : 'Klaar om te boeken?';
      if (type === 'travel-prep') return 'Klaar voor de reis?';
      if (type === 'things-to-do') return cityName ? `Bouw een ${cityName}-trip hier omheen` : 'Plan je trip';
      return cityName ? `Plan je ${cityName}-trip` : 'Plan je trip';
    },
  },
} as const;

function CtaCard({ cta, primary }: { cta: FunnelCta; primary: boolean }) {
  const base = primary
    ? 'rounded-2xl bg-white p-5 border-2 border-thailand-red shadow-sm hover:shadow-md transition'
    : 'rounded-2xl bg-white p-4 border border-gray-200 shadow-sm hover:border-thailand-blue transition';
  const linkClass = primary
    ? 'font-heading font-bold text-gray-900 text-base block'
    : 'font-semibold text-gray-900 text-sm block';
  const inner = (
    <>
      <span className={linkClass}>{cta.label} →</span>
      {cta.sub && <span className="mt-1 block text-xs text-gray-600">{cta.sub}</span>}
    </>
  );
  if (cta.external) {
    return (
      <a href={cta.href} target="_blank" rel="noopener noreferrer nofollow sponsored" className={base}>
        {inner}
      </a>
    );
  }
  return <Link href={cta.href} className={base}>{inner}</Link>;
}

export default function TripFunnelBlock({ post, locale = 'en', placement = 'bottom' }: Props) {
  const ctx = getBlogFunnelContext(post);
  if (ctx.mustCtas.length === 0 && ctx.suggestedCtas.length === 0) return null;

  const copy = locale === 'nl' ? COPY.nl : COPY.en;
  const ctas = [...ctx.mustCtas, ...ctx.suggestedCtas];
  // Top placement shows fewer (scanner mode), bottom shows full set (highest intent).
  const shown = placement === 'top' ? ctas.slice(0, 3) : ctas;
  const primary = shown[0];
  const rest = shown.slice(1);

  return (
    <section className={`${placement === 'top' ? 'mb-8' : 'my-10'} rounded-2xl border border-thailand-blue/15 bg-surface-cream p-6 shadow-sm`}>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-thailand-blue/80">
        {copy.eyebrow(ctx.blogType)}
      </p>
      <h2 className="mt-2 font-heading text-2xl font-bold text-gray-900">
        {copy.heading(ctx.cityName, ctx.blogType)}
      </h2>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {primary && <div className="sm:col-span-2"><CtaCard cta={primary} primary /></div>}
        {rest.map((cta, i) => <CtaCard key={i} cta={cta} primary={false} />)}
      </div>

      {placement === 'bottom' && (
        <p className="mt-4 text-xs text-gray-500">
          {locale === 'nl'
            ? 'Sommige links zijn affiliate-links — we verdienen een kleine commissie zonder extra kosten voor jou.'
            : 'Some links are affiliate — we earn a small commission at no extra cost to you.'}
        </p>
      )}
    </section>
  );
}
