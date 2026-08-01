interface NlEditorialProseProps {
  html: string;
  id?: string;
  className?: string;
}

const BLOCKED_ELEMENTS =
  /<\s*(script|style|iframe|object|embed|form|input|button|select|textarea|option|meta|link|base|svg|math)\b[^>]*>[\s\S]*?<\s*\/\s*\1\s*>|<\s*\/?\s*(script|style|iframe|object|embed|form|input|button|select|textarea|option|meta|link|base|svg|math)\b[^>]*\/?>/gi;

const UNSAFE_ATTRIBUTES =
  /\s(?:on[a-z]+|style|srcdoc|formaction|xlink:href|data-widget(?:-[a-z0-9_-]+)?)\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi;

const UNSAFE_PROTOCOL =
  /(href|src)\s*=\s*(["'])\s*(?:javascript|vbscript|data)\s*:[\s\S]*?\2/gi;

/**
 * The editorial source is repository-owned Markdown, but historical files can
 * still contain raw HTML. Keep the useful semantic markup while removing the
 * executable and widget-specific surface before it reaches React.
 */
export function sanitizeEditorialHtml(html: string): string {
  let safeHtml = html;
  let previousHtml = '';

  // Repeat because a malformed nested blocked element can be exposed after the
  // first pass. Repository content is bounded, so the guard prevents looping.
  for (let pass = 0; pass < 4 && safeHtml !== previousHtml; pass += 1) {
    previousHtml = safeHtml;
    safeHtml = safeHtml.replace(BLOCKED_ELEMENTS, '');
  }

  return safeHtml
    .replace(UNSAFE_ATTRIBUTES, '')
    .replace(UNSAFE_PROTOCOL, '$1="#"')
    .replace(/<!--([\s\S]*?)-->/g, '');
}

export function NlEditorialProse({
  html,
  id = 'artikel',
  className = '',
}: NlEditorialProseProps) {
  return (
    <section
      id={id}
      aria-label="Artikel"
      className={`section-divider-bottom scroll-mt-24 py-14 lg:py-20 ${className}`.trim()}
    >
      <div className="container-custom">
        <div
          className="mx-auto max-w-[820px] text-[15px] font-medium leading-8 text-charcoal/78
            [&_a]:font-extrabold [&_a]:text-jade [&_a]:underline [&_a]:decoration-saffron/45 [&_a]:decoration-2 [&_a]:underline-offset-4 [&_a]:transition hover:[&_a]:text-saffron-dark
            [&_blockquote]:my-9 [&_blockquote]:border-l-2 [&_blockquote]:border-saffron [&_blockquote]:bg-[#fff3df] [&_blockquote]:px-6 [&_blockquote]:py-5 [&_blockquote]:font-display [&_blockquote]:text-2xl [&_blockquote]:font-semibold [&_blockquote]:leading-snug [&_blockquote]:text-jade
            [&_h2]:mb-5 [&_h2]:mt-14 [&_h2]:scroll-mt-28 [&_h2]:font-display [&_h2]:text-[2.65rem] [&_h2]:font-semibold [&_h2]:leading-[0.95] [&_h2]:tracking-[-0.035em] [&_h2]:text-jade
            [&_h3]:mb-4 [&_h3]:mt-10 [&_h3]:scroll-mt-28 [&_h3]:font-display [&_h3]:text-[1.75rem] [&_h3]:font-semibold [&_h3]:leading-none [&_h3]:text-jade
            [&_hr]:my-12 [&_hr]:border-jade/10
            [&_img]:my-9 [&_img]:h-auto [&_img]:w-full [&_img]:rounded-2xl [&_img]:border [&_img]:border-jade/10 [&_img]:shadow-editorial-card
            [&_li]:my-2 [&_li]:pl-1 [&_ol]:my-6 [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-6
            [&_p]:my-5 [&_strong]:font-extrabold [&_strong]:text-jade
            [&_table]:w-full [&_table]:min-w-[620px] [&_table]:border-collapse [&_td]:border-b [&_td]:border-jade/10 [&_td]:px-4 [&_td]:py-3 [&_td]:align-top
            [&_th]:bg-jade [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:text-xs [&_th]:font-extrabold [&_th]:text-ivory
            [&_ul]:my-6 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6
            [&>div:has(>table)]:my-8 [&>div:has(>table)]:overflow-x-auto [&>table]:my-8 [&>table]:block [&>table]:overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: sanitizeEditorialHtml(html) }}
        />
      </div>
    </section>
  );
}
