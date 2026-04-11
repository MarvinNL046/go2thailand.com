import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';

interface Festival {
  name: string;
  thaiName?: string;
  date2026: string;
  month: string;
  location: string;
  type: 'national' | 'regional' | 'buddhist';
  description: string;
  highlights: string[];
  blogSlug?: string;
  image?: string;
}

const festivals: Festival[] = [
  {
    name: 'Makha Bucha',
    thaiName: 'มาฆบูชา',
    date2026: 'February 12',
    month: 'February',
    location: 'Nationwide (temples)',
    type: 'buddhist',
    description: 'Commemorates the day 1,250 disciples spontaneously gathered to hear the Buddha preach. Candlelit processions (Wien Thien) circle temple halls after dark. Alcohol sales are banned.',
    highlights: ['Candlelit temple processions', 'No alcohol sales', 'Wien Thien ceremony at dusk'],
  },
  {
    name: 'Songkran',
    thaiName: 'สงกรานต์',
    date2026: 'April 13–15',
    month: 'April',
    location: 'Nationwide — biggest in Chiang Mai, Bangkok, Phuket',
    type: 'national',
    description: 'Thailand\'s New Year and the world\'s biggest water fight. A UNESCO Intangible Cultural Heritage since 2024. What started as a gentle water-pouring blessing has evolved into a multi-day nationwide celebration of renewal, respect, and absolute soaking.',
    highlights: ['Massive street water fights', 'Song Nam Phra temple blessings', 'Floral shirt tradition', 'UNESCO Intangible Cultural Heritage'],
    blogSlug: 'songkran-2026-survival-guide-what-to-know',
  },
  {
    name: 'Royal Ploughing Ceremony',
    thaiName: 'พระราชพิธีพืชมงคล',
    date2026: 'May (date set by Royal Household)',
    month: 'May',
    location: 'Sanam Luang, Bangkok',
    type: 'national',
    description: 'An ancient Brahmin ceremony marking the start of the rice-growing season. Sacred oxen are offered a selection of foods — their choices predict the year\'s harvest. One of Thailand\'s oldest rituals, attended by the King.',
    highlights: ['Sacred oxen predict the harvest', 'Ancient Brahmin ritual', 'Royal attendance at Sanam Luang'],
  },
  {
    name: 'Bun Bang Fai (Rocket Festival)',
    thaiName: 'บุญบั้งไฟ',
    date2026: 'May 8–10',
    month: 'May',
    location: 'Yasothon, Isan (Northeast Thailand)',
    type: 'regional',
    description: 'Villagers build massive homemade rockets — some over 10 meters long — and launch them skyward to ask the rain gods for a good planting season. Three days of parades, dancing, music, and explosive competition. Isan at its wildest.',
    highlights: ['Homemade rocket launches', 'Rain-asking tradition', 'Parade with music and dancing', 'Isan culture showcase'],
    blogSlug: 'bun-bang-fai-rocket-festival-yasothon-2026',
  },
  {
    name: 'Visakha Bucha',
    thaiName: 'วิสาขบูชา',
    date2026: 'May 12',
    month: 'May',
    location: 'Nationwide (temples)',
    type: 'buddhist',
    description: 'The most important Buddhist holiday — marking the birth, enlightenment, and death of the Buddha, all on the same full moon. Temples fill with worshippers for candlelit processions. Alcohol sales are banned.',
    highlights: ['Most sacred Buddhist holiday', 'Candlelit temple walks', 'No alcohol sales', 'Three events on one full moon'],
  },
  {
    name: 'Phi Ta Khon (Ghost Festival)',
    thaiName: 'ผีตาโขน',
    date2026: 'June 20–22',
    month: 'June',
    location: 'Dan Sai, Loei Province',
    type: 'regional',
    description: 'Thailand\'s most photogenic festival. Locals parade through town in hand-carved ghost masks with long noses and wild eyes, linked to the Buddhist tale of Prince Vessandorn. When the prince returned from exile, the celebration was so loud that spirits from the forest joined the parade.',
    highlights: ['Handcrafted ghost masks', 'Colorful street parade', 'Rooted in Buddhist folklore', 'One of Thailand\'s most unique festivals'],
  },
  {
    name: 'Asanha Bucha & Khao Phansa',
    thaiName: 'อาสาฬหบูชา / เข้าพรรษา',
    date2026: 'July 10–11',
    month: 'July',
    location: 'Nationwide (temples)',
    type: 'buddhist',
    description: 'Asanha Bucha marks the Buddha\'s first sermon. The following day, Khao Phansa, begins Buddhist Lent — a three-month retreat period for monks during the rainy season. The Candle Festival in Ubon Ratchathani features enormous carved wax candle floats.',
    highlights: ['Start of Buddhist Lent', 'Ubon Ratchathani Candle Festival', 'Three-month monk retreat begins', 'Alcohol sales banned on Asanha Bucha'],
  },
  {
    name: 'Vegetarian Festival',
    thaiName: 'เทศกาลกินเจ',
    date2026: 'October 11–19',
    month: 'October',
    location: 'Phuket, Bangkok Chinatown',
    type: 'regional',
    description: 'Nine days of strict vegetarian eating, spiritual purification, and — in Phuket — extreme acts of devotion like fire-walking and body piercing. Restaurants fly yellow flags to signal vegetarian menus. Bangkok\'s Chinatown fills with mock-meat street food.',
    highlights: ['Nine days of vegetarian eating', 'Extreme devotional acts in Phuket', 'Yellow flag restaurants', 'Amazing street food in Chinatown'],
  },
  {
    name: 'Loi Krathong',
    thaiName: 'ลอยกระทง',
    date2026: 'November 25',
    month: 'November',
    location: 'Nationwide — biggest in Chiang Mai, Sukhothai, Bangkok',
    type: 'national',
    description: 'Thailand\'s Festival of Lights. At dusk, people place small lotus-shaped floats (krathong) carrying candles, flowers, and incense onto rivers and lakes — symbolizing letting go of negativity and making wishes. One of the most beautiful nights in Thailand.',
    highlights: ['Floating lotus candle offerings', 'Letting go of negativity', 'Stunning riverside atmosphere', 'Beauty pageants and live music'],
    blogSlug: 'loi-krathong-yi-peng-2026-festival-guide',
  },
  {
    name: 'Yi Peng (Sky Lantern Festival)',
    thaiName: 'ยี่เป็ง',
    date2026: 'November 24–25',
    month: 'November',
    location: 'Chiang Mai',
    type: 'regional',
    description: 'A Lanna tradition unique to Northern Thailand. Thousands of glowing paper lanterns (khom loi) are released into the night sky, creating a sea of floating lights. Often coincides with Loi Krathong for an unforgettable double celebration.',
    highlights: ['Thousands of sky lanterns released', 'Lanna cultural tradition', 'Coincides with Loi Krathong', 'Best viewed in Chiang Mai'],
    blogSlug: 'loi-krathong-yi-peng-2026-festival-guide',
  },
  {
    name: 'His Majesty the King\'s Birthday',
    thaiName: 'วันเฉลิมพระชนมพรรษา',
    date2026: 'July 28',
    month: 'July',
    location: 'Nationwide — centered in Bangkok',
    type: 'national',
    description: 'Thailand\'s national day. Buildings are draped in yellow (the King\'s birth color). Candlelit ceremonies take place nationwide, with the largest at Sanam Luang in Bangkok.',
    highlights: ['Buildings draped in yellow', 'Candlelit ceremonies', 'National holiday', 'Sanam Luang celebrations'],
  },
];

const typeLabels: Record<Festival['type'], string> = {
  national: 'National Holiday',
  regional: 'Regional Festival',
  buddhist: 'Buddhist Holy Day',
};

const typeColors: Record<Festival['type'], string> = {
  national: 'bg-blue-100 text-blue-700',
  regional: 'bg-amber-100 text-amber-700',
  buddhist: 'bg-purple-100 text-purple-700',
};

export default function FestivalsPage() {
  const { locale } = useRouter();
  const isNl = locale === 'nl';

  const majorFestivals = festivals.filter(f => ['Songkran', 'Loi Krathong', 'Yi Peng (Sky Lantern Festival)'].includes(f.name));
  const allByMonth = festivals.reduce<Record<string, Festival[]>>((acc, f) => {
    const month = f.month;
    if (!acc[month]) acc[month] = [];
    acc[month].push(f);
    return acc;
  }, {});

  const monthOrder = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <>
      <SEOHead
        title="Thailand Festivals 2026: Complete Calendar & Guide to Every Major Celebration"
        description="Plan your trip around Thailand's best festivals in 2026 — Songkran, Loi Krathong, Yi Peng, Phi Ta Khon, Vegetarian Festival, and more. Dates, locations, and insider tips."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Festivals', href: '/festivals' }]} />

        {/* Hero */}
        <header className="mt-6 mb-12">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-3">
            Thailand Festival Calendar 2026
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold font-heading text-gray-900 leading-tight">
            Every Festival Worth Planning a Trip Around
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl leading-relaxed">
            Thailand celebrates dozens of festivals throughout the year — from the world-famous
            Songkran water fight to ghost parades in remote Isan villages. This guide covers every
            major festival in 2026 with exact dates, locations, and what to expect when you get there.
          </p>
        </header>

        {/* Quick reference table */}
        <section className="bg-white rounded-2xl shadow-md overflow-hidden mb-12">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold font-heading">2026 Festival Dates at a Glance</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-6 py-3 font-semibold text-gray-500 uppercase tracking-wider text-xs">Festival</th>
                  <th className="px-6 py-3 font-semibold text-gray-500 uppercase tracking-wider text-xs">Date</th>
                  <th className="px-6 py-3 font-semibold text-gray-500 uppercase tracking-wider text-xs">Location</th>
                  <th className="px-6 py-3 font-semibold text-gray-500 uppercase tracking-wider text-xs">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {festivals.map((f) => (
                  <tr key={f.name} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-900">{f.name}</span>
                      {f.thaiName && <span className="block text-xs text-gray-400 mt-0.5">{f.thaiName}</span>}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap">{f.date2026}</td>
                    <td className="px-6 py-4 text-gray-600">{f.location}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${typeColors[f.type]}`}>
                        {typeLabels[f.type]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* The Big Three */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold font-heading mb-2">The Big Three: Festivals Every Visitor Should See</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            If you can only plan your trip around one festival, make it one of these. They're the most
            visually spectacular, most accessible, and most culturally significant celebrations in the country.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {majorFestivals.map((f) => (
              <div key={f.name} className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold mb-3 ${typeColors[f.type]}`}>
                    {f.date2026}
                  </span>
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-1">{f.name}</h3>
                  {f.thaiName && <p className="text-sm text-gray-400 mb-3">{f.thaiName}</p>}
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{f.description}</p>
                  <ul className="space-y-1.5 mb-5">
                    {f.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-blue-500 mt-0.5 shrink-0">✦</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                  {f.blogSlug && (
                    <Link href={`/blog/${f.blogSlug}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700">
                      Read the full guide →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Month by month */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold font-heading mb-2">Month-by-Month Festival Calendar</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            Plan your Thailand trip around the festivals that interest you most.
            Each month has something worth seeing.
          </p>

          <div className="space-y-6">
            {monthOrder.map((month) => {
              const monthFestivals = allByMonth[month];
              if (!monthFestivals) return null;

              return (
                <div key={month} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                    <h3 className="text-lg font-bold font-heading text-gray-900">{month}</h3>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {monthFestivals.map((f) => (
                      <div key={f.name} className="px-6 py-5">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                          <div>
                            <h4 className="text-base font-bold text-gray-900">
                              {f.blogSlug ? (
                                <Link href={`/blog/${f.blogSlug}`} className="hover:text-blue-600 transition-colors">
                                  {f.name}
                                </Link>
                              ) : f.name}
                            </h4>
                            {f.thaiName && <p className="text-xs text-gray-400">{f.thaiName}</p>}
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-sm font-medium text-gray-700">{f.date2026}</span>
                            <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold ${typeColors[f.type]}`}>
                              {typeLabels[f.type]}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{f.description}</p>
                        <p className="text-xs text-gray-400 mt-2">📍 {f.location}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Practical tips */}
        <section className="bg-white rounded-2xl shadow-md p-6 sm:p-8 mb-12">
          <h2 className="text-2xl font-bold font-heading mb-4">Practical Tips for Festival Travel</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Book Early</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Accommodation near major festivals books out weeks in advance. Songkran in Chiang Mai,
                Yi Peng, and Vegetarian Festival in Phuket are especially competitive. Book at least
                a month ahead for the best rates.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Alcohol Bans</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Buddhist holy days (Makha Bucha, Visakha Bucha, Asanha Bucha) have nationwide
                alcohol sales bans. Bars and restaurants won't serve alcohol. Stock up the day before if needed.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Temple Etiquette</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Cover shoulders and knees at temples. Remove shoes before entering buildings.
                Don't point your feet at Buddha images. Dress respectfully — this is especially
                important during religious festivals.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Transport Chaos</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Major festivals cause massive traffic. Songkran week sees millions travel between
                Bangkok and their home provinces. Book <Link href="/transport" className="text-blue-600 hover:underline">buses and trains</Link> early,
                and expect delays during peak festival days.
              </p>
            </div>
          </div>
        </section>

        {/* Related reading */}
        <section className="bg-gray-50 rounded-2xl p-6 sm:p-8 mb-12">
          <h2 className="text-2xl font-bold font-heading mb-4">Related Reading</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: 'Songkran 2026 Survival Guide', slug: 'songkran-2026-survival-guide-what-to-know' },
              { title: 'Songkran Festival 2026: Where to Celebrate', slug: 'songkran-festival-2026-guide' },
              { title: 'Loi Krathong & Yi Peng 2026 Guide', slug: 'loi-krathong-yi-peng-2026-festival-guide' },
              { title: 'Bun Bang Fai Rocket Festival Yasothon', slug: 'bun-bang-fai-rocket-festival-yasothon-2026' },
              { title: 'Songkran Nationwide in All 76 Provinces', slug: 'songkran-2026-76-provinces-nationwide-celebrations-guide' },
              { title: 'Songkran Water Gun Rules & Safety', slug: 'songkran-2026-water-gun-rules-fines-safety-guide' },
            ].map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all"
              >
                <span className="text-blue-500 shrink-0">📖</span>
                <span className="text-sm font-medium text-gray-800">{post.title}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Sources */}
        <section className="border-t border-gray-200 pt-8 mb-12">
          <h2 className="text-lg font-bold font-heading mb-3">Sources</h2>
          <ul className="space-y-1.5 text-sm text-gray-500">
            <li>
              <a href="https://www.tatnews.org/2026/03/songkran-festival-2026-to-proceed-nationwide-welcoming-global-visitors-to-thailands-unesco-recognised-new-year-celebration/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                TAT Newsroom — Songkran Festival 2026
              </a>
            </li>
            <li>
              <a href="https://www.thailandroutes.com/en/thailand-festival-calendar-2026-a-complete-guide-to-the-countrys-most-iconic-celebrations/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                Thailand Routes — Festival Calendar 2026
              </a>
            </li>
            <li>
              <a href="https://www.chiangraitimes.com/learning/thailand-culture-festivals-in-2026/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                Chiang Rai Times — Thailand Culture Festivals 2026
              </a>
            </li>
            <li>
              <a href="https://expatsthai.com/culture/thai-festivals" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                Expats Thailand — Thai Festivals Calendar
              </a>
            </li>
            <li>
              <a href="https://www.carnifest.com/phi-ta-khon-festival-2026/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                Carnifest — Phi Ta Khon Festival 2026
              </a>
            </li>
            <li>
              <a href="https://thecoloursofthailand.com/explore-thailand/thailand-events-and-festivals-2026/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                The Colours of Thailand — Events and Festivals 2026
              </a>
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}
