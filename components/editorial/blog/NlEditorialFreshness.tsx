import { CalendarCheck, CircleAlert, FileCheck2 } from 'lucide-react';
import type { NlEditorialLayout } from '../../../data/editorial/blog/types';

interface NlEditorialFreshnessProps {
  layout: Readonly<NlEditorialLayout>;
  updatedAt: string;
  editorialStatus: 'draft' | 'review' | 'ready' | 'archived';
}

function freshnessCopy(layout: Readonly<NlEditorialLayout>, updatedAt: string) {
  switch (layout.kind) {
    case 'news-update':
      return {
        label: layout.newsStatus === 'developing' ? 'Ontwikkeling loopt' : 'Status gecontroleerd',
        checkedAt: layout.checkedAt,
        detail: layout.newsStatus === 'superseded'
          ? 'Deze update is ingehaald; gebruik de actuele bronlinks hieronder.'
          : layout.newsStatus === 'archived'
            ? 'Dit artikel wordt als historisch overzicht bewaard.'
            : 'Nieuwsdetails kunnen veranderen. Controleer de datum voor je beslist.',
      };
    case 'event-guide':
      return {
        label: layout.temporalStatus === 'scheduled' ? 'Planning gecontroleerd' : 'Datumstatus gecontroleerd',
        checkedAt: layout.checkedAt,
        detail: layout.temporalStatus === 'elapsed'
          ? 'Dit evenement is verstreken; de pagina geeft context en geen nieuwe datumgarantie.'
          : 'Controleer de officiële organisator vlak voor vertrek.',
      };
    case 'policy-guide':
      return {
        label: 'Regelstatus gecontroleerd',
        checkedAt: layout.checkedAt,
        detail: 'Regels en voorwaarden kunnen wijzigen. De primaire bronnen blijven leidend.',
      };
    default:
      return {
        label: 'Redactioneel bijgewerkt',
        checkedAt: updatedAt,
        detail: 'We scheiden blijvende keuzehulp van details die je voor vertrek opnieuw controleert.',
      };
  }
}

export function NlEditorialFreshness({ layout, updatedAt, editorialStatus }: NlEditorialFreshnessProps) {
  const copy = freshnessCopy(layout, updatedAt);
  const formattedDate = new Intl.DateTimeFormat('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(copy.checkedAt));
  const StatusIcon = editorialStatus === 'ready' ? FileCheck2 : CircleAlert;

  return (
    <aside aria-label="Actualiteitsstatus" className="border-y border-jade/10 bg-tonal">
      <div className="container-custom grid gap-5 py-6 sm:grid-cols-[auto_1fr_auto] sm:items-center">
        <span className="grid h-11 w-11 place-items-center rounded-full border border-saffron/30 bg-canvas text-jade">
          <CalendarCheck size={20} aria-hidden="true" />
        </span>
        <div>
          <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-saffron-dark">{copy.label}</p>
          <p className="mt-1 text-xs font-medium leading-5 text-charcoal/66">{copy.detail}</p>
        </div>
        <p className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.1em] text-jade/70">
          <StatusIcon size={15} aria-hidden="true" className="text-saffron-dark" />
          {formattedDate}
        </p>
      </div>
    </aside>
  );
}
