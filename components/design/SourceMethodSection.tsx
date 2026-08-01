import { ExternalLink } from "lucide-react";

interface DetailedEditorialSource {
  title: string;
  creator: string;
  url: string;
  note: string;
}

interface CompactEditorialSource {
  label: string;
  href: string;
}

type EditorialSource = DetailedEditorialSource | CompactEditorialSource;

interface SourceMethodSectionProps {
  eyebrow?: string;
  title: string;
  description: string;
  method?: string;
  sources: EditorialSource[];
}

export function SourceMethodSection({
  eyebrow = "Bronnen & methode",
  title,
  description,
  method,
  sources,
}: SourceMethodSectionProps) {
  return (
    <section className="section-divider-bottom bg-tonal py-12 lg:py-16">
      <div className="container-custom grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="font-display text-[2.8rem] font-semibold leading-[0.92] tracking-[-0.035em] text-jade">
            {title}
          </h2>
          <p className="mt-5 text-sm font-medium leading-7 text-charcoal/64">
            {description}
          </p>
          {method ? (
            <p className="mt-3 text-xs font-medium leading-6 text-charcoal/58">
              {method}
            </p>
          ) : null}
        </div>
        <div className="grid gap-3">
          {sources.map((source) => {
            const compact = "label" in source;
            const url = compact ? source.href : source.url;
            const title = compact ? source.label : source.title;
            const creator = compact ? "Externe bron" : source.creator;
            const note = compact
              ? "Open de oorspronkelijke bron voor de actuele details."
              : source.note;
            return (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between gap-4 rounded-xl border border-jade/10 bg-white/75 p-5 transition hover:border-saffron/35 hover:bg-white"
              >
                <div>
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-saffron-dark">
                    {creator}
                  </p>
                  <h3 className="mt-1 text-sm font-extrabold text-jade">
                    {title}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-charcoal/58">
                    {note}
                  </p>
                </div>
                <ExternalLink
                  size={16}
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-jade/45 transition group-hover:text-saffron-dark"
                />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
