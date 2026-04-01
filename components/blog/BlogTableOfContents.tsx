import { useState, useEffect, useRef, useCallback } from 'react';

interface TocItem {
  id: string;
  label: string;
}

interface NavListProps {
  items: TocItem[];
  activeId: string;
  scrollTo: (id: string) => void;
  onClick?: () => void;
}

function NavList({ items, activeId, scrollTo, onClick }: NavListProps) {
  return (
    <nav aria-label="Table of contents">
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
              onClick={() => { scrollTo(item.id); onClick?.(); }}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function BlogTableOfContents() {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const contentEl = document.querySelector('[data-blog-content]');
    if (!contentEl) return;

    const headings = contentEl.querySelectorAll('h2');
    if (headings.length < 2) return;

    const tocItems: TocItem[] = [];
    headings.forEach((h2, i) => {
      if (!h2.id) {
        h2.id = h2.textContent
          ?.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '') || `section-${i}`;
      }
      tocItems.push({ id: h2.id, label: h2.textContent || `Section ${i + 1}` });
    });

    setItems(tocItems);
    if (tocItems.length > 0) setActiveId(tocItems[0].id);
  }, []);

  useEffect(() => {
    if (items.length === 0) return;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
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

    return () => { observerRef.current?.disconnect(); };
  }, [items]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(id);
      setDrawerOpen(false);
    }
  }, []);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  if (items.length === 0) return null;

  return (
    <>
      <div className="hidden lg:block bg-white rounded-2xl shadow-md p-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
          On this page
        </p>
        <NavList items={items} activeId={activeId} scrollTo={scrollTo} />
      </div>

      <div className="lg:hidden fixed bottom-20 right-4 z-40">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-thailand-blue text-white shadow-lg hover:bg-thailand-blue/90 transition-colors"
          aria-label="Table of contents"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-end" onClick={closeDrawer}>
          <div className="absolute inset-0 bg-black/30" />
          <div
            className="relative w-full bg-white rounded-t-2xl p-6 pb-8 max-h-[70vh] overflow-y-auto animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-gray-700">On this page</p>
              <button type="button" onClick={closeDrawer} className="text-gray-400 hover:text-gray-600" aria-label="Close">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <NavList items={items} activeId={activeId} scrollTo={scrollTo} onClick={closeDrawer} />
          </div>
        </div>
      )}
    </>
  );
}
