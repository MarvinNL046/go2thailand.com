import Link from 'next/link';

export interface IntentInternalLinkItem {
  href: string;
  label: string;
  intent?: string;
}

interface Props {
  title: string;
  links: IntentInternalLinkItem[];
}

function normalizeHref(href: string): string {
  return href.replace(/^\/guides\/where-to-stay\//, '/where-to-stay/');
}

export default function IntentInternalLinks({ title, links }: Props) {
  const seen = new Set<string>();
  const normalizedLinks = links
    .map(link => ({ ...link, href: normalizeHref(link.href) }))
    .filter(link => {
      if (!link.href.startsWith('/') || seen.has(link.href)) return false;
      seen.add(link.href);
      return true;
    })
    .slice(0, 12);

  if (normalizedLinks.length === 0) return null;

  return (
    <section>
      <h2 className="font-heading text-xl font-bold text-gray-900">{title}</h2>
      <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {normalizedLinks.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-900 hover:border-thailand-blue hover:text-thailand-blue hover:bg-thailand-blue/5"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
