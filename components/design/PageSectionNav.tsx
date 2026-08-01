import type { LucideIcon } from 'lucide-react';

export interface PageSectionNavItem {
  href: `#${string}`;
  label: string;
  icon: LucideIcon;
}

interface PageSectionNavProps {
  label?: string;
  items: PageSectionNavItem[];
  activeIndex?: number;
}

export function PageSectionNav({ label = 'Op deze pagina', items, activeIndex = 0 }: PageSectionNavProps) {
  return (
    <nav aria-label={label} className="section-divider-bottom bg-canvas">
      <div className="container-custom scrollbar-hide flex snap-x items-stretch overflow-x-auto py-1 lg:justify-center">
        {items.map(({ href, label: itemLabel, icon: Icon }, index) => {
          const active = index === activeIndex;
          return (
            <a
              key={href}
              href={href}
              aria-current={active ? 'location' : undefined}
              className={`group flex min-w-[145px] snap-start items-center justify-center gap-2 border-b-2 px-5 py-4 text-xs font-bold transition ${active ? 'border-jade text-jade' : 'border-transparent text-charcoal/70 hover:border-saffron/45 hover:text-jade'}`}
            >
              <Icon size={16} aria-hidden="true" className={active ? 'text-jade' : 'text-charcoal/70 group-hover:text-saffron-dark'} />
              {itemLabel}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
