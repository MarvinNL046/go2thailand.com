interface Source {
  name: string;
  url: string;
}

interface SourcesProps {
  sources: Source[];
  locale?: string;
}

function sourceLabel(source: Source): string {
  if (source.name?.trim()) return source.name.trim();

  try {
    return new URL(source.url).hostname.replace(/^www\./, '');
  } catch {
    return 'Source';
  }
}

export default function Sources({ sources, locale = 'en' }: SourcesProps) {
  if (!sources || sources.length === 0) return null;

  const lang = locale === 'nl' ? 'nl' : 'en';
  const title = lang === 'nl' ? 'Bronnen & Referenties' : 'Sources & References';
  const note = lang === 'nl'
    ? 'Dit artikel is samengesteld op basis van redactioneel onderzoek en geverifieerd met de volgende bronnen:'
    : 'This article is based on editorial research and verified with the following sources:';
  const sourceRel = (url: string) =>
    /(?:\.tpo\.lv\/|tp\.media\/|[?&]tag=[^&]+|amazon\.[a-z.]+\/)/i.test(url)
      ? 'noopener noreferrer nofollow sponsored'
      : 'noopener noreferrer nofollow';

  return (
    <div className="mt-8 pt-8 border-t">
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-3">{note}</p>
      <ul className="space-y-1.5">
        {sources.map((source, i) => (
          <li key={i} className="text-sm">
            <a
              href={source.url}
              target="_blank"
              rel={sourceRel(source.url)}
              className="text-thailand-blue hover:underline"
            >
              {sourceLabel(source)}
            </a>
            <span className="text-gray-400 ml-1 text-xs">&#8599;</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
