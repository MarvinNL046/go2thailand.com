import Link from 'next/link';

interface AuthorBioProps {
  name: string;
  locale?: string;
}

const authorData: Record<string, { bio: Record<string, string>; credentials: Record<string, string> }> = {
  'Go2Thailand Team': {
    bio: {
      en: 'We are a team of travel writers and Thailand residents who explore the country year-round. Our guides are based on first-hand experience, local knowledge, and verified official sources.',
      nl: 'Wij zijn een team van reisschrijvers en Thailand-bewoners die het land het hele jaar door verkennen. Onze gidsen zijn gebaseerd op eigen ervaring, lokale kennis en geverifieerde officiële bronnen.',
    },
    credentials: {
      en: 'Based in Thailand since 2019 | 50+ provinces visited | Updated monthly',
      nl: 'Gevestigd in Thailand sinds 2019 | 50+ provincies bezocht | Maandelijks bijgewerkt',
    },
  },
};

export default function AuthorBio({ name, locale = 'en' }: AuthorBioProps) {
  const lang = locale === 'nl' ? 'nl' : 'en';
  const author = authorData[name] || authorData['Go2Thailand Team'];

  return (
    <div className="mt-12 pt-8 border-t" itemScope itemType="https://schema.org/Person">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-thailand-blue to-thailand-gold rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-2xl font-bold text-white" itemProp="name">
            {name.charAt(0)}
          </span>
        </div>
        <div>
          <h3 className="font-bold text-lg" itemProp="name">{name}</h3>
          <p className="text-sm text-thailand-blue font-medium mt-0.5">
            {author.credentials[lang]}
          </p>
          <p className="text-gray-600 mt-2 text-sm" itemProp="description">
            {author.bio[lang]}
          </p>
          <Link
            href="/"
            className="text-thailand-blue text-sm hover:underline mt-2 inline-block"
          >
            {lang === 'nl' ? 'Meer over ons' : 'More about us'} &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
