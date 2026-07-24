import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AffiliateDisclosure } from './AffiliateDisclosure';

interface EditorialHeroBreadcrumb {
  label: string;
  href?: string;
}

export interface EditorialHeroAction {
  label: string;
  href: string;
  kind: 'primary' | 'secondary';
  newTab?: boolean;
  affiliate?: boolean;
  icon?: ReactNode;
  ariaLabel?: string;
}

interface EditorialHeroProps {
  image: string;
  imageAlt: string;
  breadcrumbs: EditorialHeroBreadcrumb[];
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  actions: EditorialHeroAction[];
  subtitle?: ReactNode;
  disclosure?: ReactNode;
  sideCard?: ReactNode;
  decorativeOverlay?: ReactNode;
  minHeightClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  descriptionClassName?: string;
  imageClassName?: string;
  gradientClassName?: string;
}

const defaultGradient = 'bg-[linear-gradient(180deg,rgba(252,250,246,0.08)_0%,rgba(252,250,246,0.38)_42%,rgba(252,250,246,0.98)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.98)_0%,rgba(252,250,246,0.91)_35%,rgba(252,250,246,0.28)_63%,rgba(18,63,54,0.08)_100%)]';

export function EditorialHero({
  image,
  imageAlt,
  breadcrumbs,
  eyebrow,
  title,
  description,
  actions,
  subtitle,
  disclosure,
  sideCard,
  decorativeOverlay,
  minHeightClassName = 'min-h-[700px] lg:min-h-[650px]',
  contentClassName = 'max-w-[650px]',
  titleClassName = 'max-w-[640px] text-[4.2rem] leading-[0.84] sm:text-[5.3rem] lg:text-[6rem]',
  subtitleClassName = 'max-w-[570px] text-[1.45rem] leading-[1.1] sm:text-[1.7rem]',
  descriptionClassName = 'mt-4 max-w-[580px] text-sm leading-7',
  imageClassName = 'object-cover object-[65%_center] lg:object-center',
  gradientClassName = defaultGradient,
}: EditorialHeroProps) {
  return (
    <section className={`relative overflow-hidden bg-mist ${minHeightClassName}`}>
      <Image src={image} alt={imageAlt} fill priority sizes="100vw" className={imageClassName} />
      <div className={`absolute inset-0 ${gradientClassName}`} />
      {decorativeOverlay}

      <div className={`container-custom relative z-10 flex items-end pb-10 pt-32 lg:items-center lg:pb-0 lg:pt-20 ${minHeightClassName}`}>
        <div className={contentClassName}>
          <nav aria-label="Kruimelpad" className="mb-5 flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.13em] text-jade/65">
            {breadcrumbs.map((breadcrumb, index) => (
              <span key={`${breadcrumb.label}-${index}`} className="contents">
                {index > 0 ? <span aria-hidden="true">/</span> : null}
                {breadcrumb.href ? <Link href={breadcrumb.href} className="transition hover:text-saffron-dark">{breadcrumb.label}</Link> : <span className="text-jade">{breadcrumb.label}</span>}
              </span>
            ))}
          </nav>

          <p className="eyebrow">{eyebrow}</p>
          <h1 className={`font-display font-semibold tracking-[-0.05em] text-jade ${titleClassName}`}>{title}</h1>
          {subtitle ? <div className={`mt-5 font-display font-semibold text-jade ${subtitleClassName}`}>{subtitle}</div> : null}
          <div className={`font-medium text-charcoal/72 ${descriptionClassName}`}>{description}</div>

          <div className="mt-7 flex flex-wrap gap-3">
            {actions.map((action) => {
              const rel = action.affiliate ? 'noopener noreferrer nofollow sponsored' : action.newTab ? 'noopener noreferrer' : undefined;
              return (
                <a
                  key={`${action.kind}-${action.href}`}
                  href={action.href}
                  target={action.newTab ? '_blank' : undefined}
                  rel={rel}
                  aria-label={action.ariaLabel}
                  className={`${action.kind === 'primary' ? 'btn-jade btn-jade-pattern' : 'btn-cream text-saffron-dark'} group min-h-12 w-full justify-center px-6 sm:w-auto`}
                >
                  {action.label}
                  {action.icon || (action.kind === 'primary'
                    ? <ArrowRight size={17} aria-hidden="true" className="text-saffron transition-transform group-hover:translate-x-1" />
                    : <span className="grid h-6 w-6 place-items-center rounded-md border border-saffron/45"><ArrowRight size={14} aria-hidden="true" /></span>)}
                </a>
              );
            })}
          </div>
          {disclosure ? <AffiliateDisclosure className="mt-3 max-w-[550px]">{disclosure}</AffiliateDisclosure> : null}
        </div>
      </div>

      {sideCard}
    </section>
  );
}
