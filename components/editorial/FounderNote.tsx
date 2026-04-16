import React from 'react';
import { formatEditorialUpdatedAt } from '../../lib/pseo-editorial-date';

interface FounderNoteProps {
  updatedAt?: string;
}

export default function FounderNote({ updatedAt }: FounderNoteProps) {
  const formattedDate = formatEditorialUpdatedAt(updatedAt);

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
      <div className="flex flex-col gap-5 md:flex-row md:items-start">
        <img
          src="/images/team/marvin.webp"
          alt="Marvin — Founder of Go2Thailand.com"
          width={96}
          height={96}
          className="h-24 w-24 rounded-2xl object-cover"
        />

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-thailand-blue">Edited by Marvin</p>
          <h2 className="mt-1 font-heading text-2xl font-bold text-gray-900">Marvin — Founder &amp; Lead Editor</h2>

          {formattedDate && (
            <p className="mt-2 text-sm text-gray-600">
              Last updated: <strong>{formattedDate}</strong>
            </p>
          )}

          <p className="mt-4 text-gray-700 leading-relaxed">
            Marvin is the founder and lead editor of Go2Thailand.com. A Dutch expat and travel
            technology specialist, he has been exploring Thailand extensively since 2019 and has
            visited more than 50 provinces across the country.
          </p>

          <p className="mt-3 text-gray-700 leading-relaxed">
            Based between the Netherlands and Southeast Asia, he combines firsthand travel
            experience with a background in web development to build practical, data-driven travel
            guides. He oversees editorial quality across the site, regularly reviews pricing
            patterns and logistics, and focuses on honest recommendations that help travelers make
            better local decisions.
          </p>

          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <a href="/about/" className="font-semibold text-thailand-blue hover:underline">
              Meet the founder
            </a>
            <a href="/editorial-policy/" className="font-semibold text-thailand-blue hover:underline">
              Read our editorial policy
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
