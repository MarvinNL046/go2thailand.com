import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { AffiliateDisclosure } from './AffiliateDisclosure';
import { SectionHeading } from './SectionHeading';

interface RelatedGuide {
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt?: string;
}

interface RelatedGuidesSectionProps {
  eyebrow?: string;
  title: string;
  guides: RelatedGuide[];
  sideLink?: {
    label: string;
    href: string;
    affiliate?: boolean;
  };
  disclosure?: string;
  readLabel?: string;
}

export function RelatedGuidesSection({ eyebrow = 'Verder plannen', title, guides, sideLink, disclosure, readLabel = 'Lees de gids' }: RelatedGuidesSectionProps) {
  const sideLinkRel = sideLink?.affiliate ? 'noopener noreferrer nofollow sponsored' : 'noopener noreferrer';
  const sideLinkIsExternal = Boolean(sideLink && (sideLink.affiliate || /^https?:\/\//i.test(sideLink.href)));
  const sideLinkContent = sideLink ? <>{sideLink.label} {sideLinkIsExternal ? <ExternalLink size={14} aria-hidden="true" /> : <ArrowRight size={14} aria-hidden="true" />}</> : null;

  return (
    <section className="section-divider-bottom py-14 lg:py-20">
      <div className="container-custom">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow={eyebrow} title={title} />
          {sideLink ? (
            sideLinkIsExternal ? (
              <a href={sideLink.href} target="_blank" rel={sideLinkRel} className="inline-flex items-center gap-2 text-xs font-extrabold text-jade transition hover:text-saffron-dark">
                {sideLinkContent}
              </a>
            ) : (
              <Link href={sideLink.href} className="inline-flex items-center gap-2 text-xs font-extrabold text-jade transition hover:text-saffron-dark">
                {sideLinkContent}
              </Link>
            )
          ) : null}
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {guides.map((guide) => (
            <Link key={guide.href} href={guide.href} className="group overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-editorial-card">
              <div className="relative h-44 overflow-hidden">
                <Image src={guide.image} alt={guide.imageAlt || guide.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.035]" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-[1.65rem] font-semibold leading-none text-jade">{guide.title}</h3>
                <p className="mt-3 text-xs leading-5 text-charcoal/72">{guide.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-extrabold text-jade">{readLabel} <ArrowRight size={14} aria-hidden="true" className="text-saffron-dark transition group-hover:translate-x-1" /></span>
              </div>
            </Link>
          ))}
        </div>
        {disclosure ? <AffiliateDisclosure className="mt-3">{disclosure}</AffiliateDisclosure> : null}
      </div>
    </section>
  );
}
