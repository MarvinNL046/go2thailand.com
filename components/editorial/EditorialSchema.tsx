import React from 'react';

interface EditorialSchemaProps {
  title: string;
  url: string;
  updatedAt?: string;
}

const PERSON_ID = 'https://go2-thailand.com/#marvin';
const ORG_ID = 'https://go2-thailand.com/#organization';
const WEBSITE_ID = 'https://go2-thailand.com/#website';

export default function EditorialSchema({ title, url, updatedAt }: EditorialSchemaProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: 'Marvin',
        jobTitle: 'Founder & Lead Editor',
        image: 'https://go2-thailand.com/images/team/marvin.webp',
        description:
          'Dutch expat and travel technology specialist exploring Thailand extensively since 2019, with more than 50 provinces visited.',
        worksFor: { '@id': ORG_ID },
      },
      {
        '@type': 'Organization',
        '@id': ORG_ID,
        name: 'Go2Thailand.com',
        url: 'https://go2-thailand.com',
        logo: 'https://go2-thailand.com/images/brand/go2thailand-logo-2026.png',
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: 'https://go2-thailand.com',
        name: 'Go2Thailand.com',
        publisher: { '@id': ORG_ID },
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: title,
        ...(updatedAt ? { dateModified: updatedAt } : {}),
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': ORG_ID },
        author: { '@id': PERSON_ID },
        publisher: { '@id': ORG_ID },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
