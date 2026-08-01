import { ExternalLink, ShoppingBag } from 'lucide-react';
import type { DeepReadonly, NlEditorialAffiliateBlock as AffiliateBlock } from '../../../data/editorial/blog/types';
import { AffiliateDisclosure } from '../../design/AffiliateDisclosure';

interface NlEditorialAffiliateBlockProps {
  block: DeepReadonly<AffiliateBlock>;
}

const PROVIDER_LABELS: Record<AffiliateBlock['provider'], string> = {
  amazon: 'Amazon',
  klook: 'Klook',
  'trip.com': 'Trip.com',
  '12go': '12Go',
  travelpayouts: 'Travelpartner',
};

export function NlEditorialAffiliateBlock({ block }: NlEditorialAffiliateBlockProps) {
  const provider = PROVIDER_LABELS[block.provider];

  return (
    <section id={block.id} className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
      <div className="container-custom">
        <div className="relative overflow-hidden rounded-[28px] bg-jade px-7 py-9 text-ivory shadow-editorial-card sm:px-10 lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12 lg:px-12">
          <div className="pointer-events-none absolute -right-10 -top-14 h-52 w-52 rounded-full border border-saffron/20" />
          <div className="relative">
            <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-saffron-light">Contextuele keuze · {provider}</p>
            <h2 className="mt-3 max-w-[720px] font-display text-[2.6rem] font-semibold leading-[0.92] tracking-[-0.035em]">{block.title}</h2>
            <p className="mt-4 max-w-[720px] text-sm font-medium leading-7 text-white/67">{block.description}</p>
            <AffiliateDisclosure className="mt-4 !text-white/52">{block.disclosure}</AffiliateDisclosure>
          </div>
          <a
            href={block.cta.href}
            target="_blank"
            rel="noopener noreferrer nofollow sponsored"
            aria-label={`${block.cta.label} bij ${provider}`}
            className="btn-cream group relative mt-7 min-h-12 justify-center text-jade lg:mt-0"
          >
            <ShoppingBag size={17} aria-hidden="true" className="text-saffron-dark" />
            {block.cta.label}
            <ExternalLink size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
