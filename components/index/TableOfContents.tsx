import { useT } from '../../lib/i18n';
import { strings as i18nStrings } from '../../lib/i18n/components-index-tableofcontents';
/**
 * TableOfContents — sticky sidebar (desktop) / floating button + drawer (mobile)
 *
 * Uses IntersectionObserver to track the currently visible H2 section.
 * Smooth scrolls to the target section on click.
 */

import { useState, useEffect, useRef, useCallback } from 'react';

export interface TocItem {
  id: string;
  label: string;
}

interface TableOfContentsProps {
  items: TocItem[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  const t = useT(i18nStrings);
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Track which section is in view
  useEffect(() => {
    if (typeof window === 'undefined' || items.length === 0) return;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      // Find the topmost visible entry
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (visible.length > 0) {
        setActiveId(visible[0].target.id);
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: '-80px 0px -60% 0px',
      threshold: 0,
    });

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [items]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(id);
      setDrawerOpen(false);
    }
  }, []);

  // Shared navigation list
  const NavList = ({ onClick }: { onClick?: () => void }) => (
    <nav aria-label={t("s001_table_of_contents")}>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                activeId === item.id
                  ? 'bg-thailand-red/10 text-thailand-red font-semibold border-l-2 border-thailand-red'
                  : 'text-gray-600 hover:text-thailand-blue hover:bg-gray-50'
              }`}
              onClick={() => {
                scrollTo(item.id);
                onClick?.();
              }}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <>
      {/* Desktop: sticky sidebar */}
      <aside className="hidden lg:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
          {t("s002_on_this_page")}
        </p>
        <NavList />
      </aside>

      {/* Mobile: floating button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-thailand-blue text-white shadow-lg hover:bg-thailand-blue-600 transition-colors"
          aria-label={t("s001_table_of_contents")}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile drawer overlay */}
      {drawerOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 flex items-end"
          onClick={() => setDrawerOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Drawer panel */}
          <div
            className="relative w-full bg-white rounded-t-2xl p-6 pb-8 max-h-[70vh] overflow-y-auto animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-gray-700">{t("s002_on_this_page")}</p>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <NavList onClick={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default TableOfContents;
