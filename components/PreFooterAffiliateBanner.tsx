import Link from 'next/link';

type BannerLink = {
  label: string;
  href: string;
  internal?: boolean;
};

interface PreFooterAffiliateBannerProps {
  title: string;
  description: string;
  links: BannerLink[];
  eyebrow?: string;
  sectionClassName?: string;
}

const AFFILIATE_REL = 'sponsored nofollow noopener noreferrer';

export default function PreFooterAffiliateBanner({
  title,
  description,
  links,
  eyebrow,
  sectionClassName = 'bg-surface-dark',
}: PreFooterAffiliateBannerProps) {
  return (
    <section className={sectionClassName}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white">
            {eyebrow ? <p className="font-script text-thailand-gold mb-1">{eyebrow}</p> : null}
            <h2 className="text-2xl font-bold font-heading mb-1">{title}</h2>
            <p className="opacity-90 text-sm">{description}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {links.map((item) =>
              item.internal ? (
                <Link
                  key={`${item.label}-${item.href}`}
                  href={item.href}
                  className="bg-white text-thailand-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={`${item.label}-${item.href}`}
                  href={item.href}
                  target="_blank"
                  rel={AFFILIATE_REL}
                  className="bg-white text-thailand-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
                >
                  {item.label}
                </a>
              )
            )}
          </div>
        </div>
        <p className="text-white/70 text-xs text-center mt-4">
          Some links are affiliate links. We may earn a commission at no extra cost to you.
        </p>
      </div>
    </section>
  );
}
