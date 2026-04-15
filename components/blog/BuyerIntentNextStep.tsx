import React from 'react';
import Link from 'next/link';
import { getBlogBuyerIntentContext } from '../../lib/blog-buyer-intent';

interface BuyerIntentNextStepProps {
  post: {
    slug: string;
    title: string;
    tags?: string[];
  };
  locale?: string;
}

const COPY = {
  en: {
    eyebrow: 'Next step',
    heading: (cityName: string) => `Planning your stay in ${cityName}?`,
    body: (cityName: string) =>
      `This article helps with the trip idea. These pages help you choose the right area in ${cityName} and compare hotels before rates move.`,
  },
  nl: {
    eyebrow: 'Volgende stap',
    heading: (cityName: string) => `Je verblijf in ${cityName} plannen?`,
    body: (cityName: string) =>
      `Dit artikel helpt je met het idee voor je trip. Deze pagina's helpen je daarna het juiste gebied in ${cityName} te kiezen en hotels te vergelijken voordat prijzen oplopen.`,
  },
} as const;

export default function BuyerIntentNextStep({ post, locale = 'en' }: BuyerIntentNextStepProps) {
  const context = getBlogBuyerIntentContext(post);

  if (!context) return null;

  const copy = locale === 'nl' ? COPY.nl : COPY.en;

  return (
    <section className="mb-8 rounded-2xl border border-thailand-blue/15 bg-surface-cream p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-thailand-blue/80">
        {copy.eyebrow}
      </p>
      <h2 className="mt-2 font-heading text-2xl font-bold text-gray-900">
        {copy.heading(context.cityName)}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-700">
        {copy.body(context.cityName)}
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {context.links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-xl bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm ring-1 ring-gray-200 transition-colors hover:bg-thailand-blue hover:text-white hover:ring-thailand-blue"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
