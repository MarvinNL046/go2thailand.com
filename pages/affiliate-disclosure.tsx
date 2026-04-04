import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Breadcrumbs from '../components/Breadcrumbs';

export default function AffiliateDisclosure() {
  const { locale } = useRouter();
  const isNl = locale === 'nl';

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Affiliate Verklaring' : 'Affiliate Disclosure', href: '/affiliate-disclosure' },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: isNl ? 'Affiliate Verklaring - Go2Thailand.com' : 'Affiliate Disclosure - Go2Thailand.com',
    description: isNl
      ? 'Leer hoe Go2Thailand.com affiliate commissies verdient, met welke partners we werken en hoe dit nooit onze redactionele aanbevelingen beïnvloedt.'
      : 'Learn how Go2Thailand.com earns affiliate commissions, which partners we work with, and how this never influences our editorial recommendations.',
    url: 'https://go2-thailand.com/affiliate-disclosure/',
    publisher: {
      '@type': 'Organization',
      name: 'Go2Thailand.com',
      url: 'https://go2-thailand.com',
    },
  };

  return (
    <>
      <Head>
        <title>{isNl ? 'Affiliate Verklaring - Go2Thailand.com' : 'Affiliate Disclosure - Go2Thailand.com'}</title>
        <meta
          name="description"
          content={isNl
            ? 'Leer hoe Go2Thailand.com affiliate commissies verdient, met welke partners we werken en hoe dit nooit onze redactionele aanbevelingen beïnvloedt.'
            : 'Learn how Go2Thailand.com earns affiliate commissions, which partners we work with, and how this never influences our editorial recommendations.'}
        />
        <meta name="robots" content="noindex, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="min-h-screen bg-surface-cream">
        <Breadcrumbs items={breadcrumbs} />

        <div className="container-custom py-12">
          <div className="max-w-4xl mx-auto">

            {/* Page header */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <h1 className="text-3xl font-bold font-heading text-gray-900 mb-2">
                {isNl ? 'Affiliate Verklaring' : 'Affiliate Disclosure'}
              </h1>
              <p className="text-sm text-gray-500">{isNl ? 'Laatst bijgewerkt: maart 2026' : 'Last updated: March 2026'}</p>
              <p className="text-gray-700 mt-4">
                {isNl
                  ? 'Go2Thailand.com is een onafhankelijke reisgids. Om deze site gratis te houden voor lezers, nemen we deel aan affiliate programma\'s. Deze pagina legt precies uit hoe dat werkt, welke partners erbij betrokken zijn en wat het voor u betekent.'
                  : 'Go2Thailand.com is an independent travel guide. To keep this site free for readers, we participate in affiliate programmes. This page explains exactly how that works, which partners are involved, and what it means for you.'}
              </p>
            </div>

            {/* How We Earn */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">{isNl ? 'Hoe We Verdienen' : 'How We Earn'}</h2>
              <p className="text-gray-700 mb-4">
                {isNl
                  ? 'Sommige links op Go2Thailand.com zijn affiliate links. Wanneer u op een van deze links klikt en een aankoop of boeking voltooit, kunnen wij een kleine commissie verdienen — zonder extra kosten voor u. De prijs die u betaalt is identiek aan wat u zou betalen als u de partner rechtstreeks bezoekt.'
                  : 'Some links on Go2Thailand.com are affiliate links. When you click one of these links and complete a purchase or booking, we may earn a small commission — at no extra cost to you. The price you pay is identical to what you would pay by visiting the partner directly.'}
              </p>
              <p className="text-gray-700 mb-4">
                {isNl
                  ? 'We nemen momenteel deel aan affiliate programma\'s van de volgende partners:'
                  : 'We currently participate in affiliate programmes from the following partners:'}
              </p>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1 flex-shrink-0">&#8212;</span>
                  <span><strong>Booking.com</strong> — {isNl ? 'hotel- en accommodatieboekingen' : 'hotel and accommodation bookings'}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1 flex-shrink-0">&#8212;</span>
                  <span><strong>Klook</strong> — {isNl ? 'tours, activiteiten en dagtrips' : 'tours, activities, and day trips'}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1 flex-shrink-0">&#8212;</span>
                  <span><strong>GetYourGuide</strong> — {isNl ? 'tours en ervaringen' : 'tours and experiences'}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1 flex-shrink-0">&#8212;</span>
                  <span><strong>Viator</strong> — {isNl ? 'tours en activiteiten' : 'tours and activities'}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1 flex-shrink-0">&#8212;</span>
                  <span><strong>Trip.com</strong> — {isNl ? 'vluchten, hotels en vervoer' : 'flights, hotels, and transport'}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1 flex-shrink-0">&#8212;</span>
                  <span><strong>12Go Asia</strong> — {isNl ? 'bussen, treinen, veerboten en transfers' : 'buses, trains, ferries, and transfers'}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1 flex-shrink-0">&#8212;</span>
                  <span><strong>Saily</strong> — {isNl ? 'eSIM-databundels voor reizigers' : 'eSIM data plans for travellers'}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1 flex-shrink-0">&#8212;</span>
                  <span><strong>NordVPN</strong> — {isNl ? 'VPN-dienst voor veilig internetten in het buitenland' : 'VPN service for secure internet access abroad'}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1 flex-shrink-0">&#8212;</span>
                  <span><strong>SafetyWing</strong> — {isNl ? 'medische reisverzekering en nomadenverzekering' : 'travel medical insurance and nomad insurance'}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1 flex-shrink-0">&#8212;</span>
                  <span><strong>Amazon</strong> — {isNl ? 'reisuitrusting en accessoires' : 'travel gear and accessories'}</span>
                </li>
              </ul>
              <p className="text-gray-700">
                {isNl
                  ? 'Deze verklaring voldoet aan de FTC-richtlijnen inzake aanbevelingen en getuigenissen, en aan de toepasselijke consumentenbeschermingsregelgeving in andere rechtsgebieden.'
                  : 'This disclosure complies with the FTC\u0027s guidelines on endorsements and testimonials, and with applicable consumer protection regulations in other jurisdictions.'}
              </p>
            </div>

            {/* Our Promise */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">{isNl ? 'Onze Belofte' : 'Our Promise'}</h2>
              <p className="text-gray-700 mb-4">
                {isNl
                  ? 'Het verdienen van commissies verandert niet wat we schrijven of aanbevelen. We houden ons zonder uitzondering aan de volgende standaarden:'
                  : 'Earning commissions does not change what we write or recommend. We hold ourselves to the following standards without exception:'}
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 flex-shrink-0">&#10003;</span>
                  <span>
                    {isNl
                      ? <><strong>Commissies beïnvloeden nooit onze aanbevelingen.</strong> We bevelen hotels, tours en diensten aan op basis van kwaliteit en relevantie voor de lezer, niet op basis van commissietarieven.</>
                      : <><strong>Commissions never influence our recommendations.</strong> We recommend hotels, tours, and services based on quality and relevance to the reader, not commission rates.</>}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 flex-shrink-0">&#10003;</span>
                  <span>
                    {isNl
                      ? <><strong>We bevelen producten en diensten aan waar we oprecht in geloven.</strong> Als we iets niet zelf zouden gebruiken, promoten we het niet.</>
                      : <><strong>We recommend products and services we genuinely believe in.</strong> If we would not use something ourselves, we do not promote it.</>}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 flex-shrink-0">&#10003;</span>
                  <span>
                    {isNl
                      ? <><strong>Negatieve bevindingen worden eerlijk gepubliceerd.</strong> Als een bestemming, hotel of dienst echte nadelen heeft, zeggen we dat — ongeacht of we een affiliate relatie hebben.</>
                      : <><strong>Negative findings are published honestly.</strong> If a destination, hotel, or service has real drawbacks, we say so — regardless of whether we have an affiliate relationship.</>}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 flex-shrink-0">&#10003;</span>
                  <span>
                    {isNl
                      ? <><strong>We markeren affiliate links duidelijk.</strong> Waar praktisch worden affiliate links geïdentificeerd zodat u altijd weet wanneer een klik een commissie kan genereren.</>
                      : <><strong>We clearly mark affiliate links.</strong> Where practical, affiliate links are identified so you always know when a click may generate a commission.</>}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 flex-shrink-0">&#10003;</span>
                  <span>
                    {isNl
                      ? <><strong>We onderzoeken en beoordelen voor we aanbevelen.</strong> Affiliate partners worden geselecteerd op basis van feedback van reizigers, reputatie in de branche en onze eigen beoordeling van hun servicekwaliteit.</>
                      : <><strong>We research and vet before recommending.</strong> Affiliate partners are selected based on traveller feedback, industry reputation, and our own assessment of their service quality.</>}
                  </span>
                </li>
              </ul>
            </div>

            {/* Which Links Are Affiliate Links */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                {isNl ? 'Welke Links Zijn Affiliate Links?' : 'Which Links Are Affiliate Links?'}
              </h2>
              <p className="text-gray-700 mb-4">
                {isNl
                  ? 'Affiliate tracking kan aanwezig zijn op de volgende soorten links op de site:'
                  : 'Affiliate tracking may be present on the following types of links across the site:'}
              </p>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1 flex-shrink-0">&#8212;</span>
                  <span>
                    {isNl
                      ? <><strong>Hotel boekingslinks</strong> — &quot;Boek nu&quot; of &quot;Beschikbaarheid bekijken&quot; knoppen op stadspagina&apos;s, top-10-hotels pagina&apos;s en bestemmingsgidsen</>
                      : <><strong>Hotel booking links</strong> — &quot;Book now&quot; or &quot;Check availability&quot; buttons on city pages, top-10-hotels pages, and destination guides</>}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1 flex-shrink-0">&#8212;</span>
                  <span>
                    {isNl
                      ? <><strong>Tour- en activiteitenlinks</strong> — links naar kooklessen, olifantenopvangcentra, duikreizen, Muay Thai-ervaringen en andere activiteiten</>
                      : <><strong>Tour and activity links</strong> — links to cooking classes, elephant sanctuaries, diving trips, Muay Thai experiences, and other activities</>}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1 flex-shrink-0">&#8212;</span>
                  <span>
                    {isNl
                      ? <><strong>Vervoerboekingslinks</strong> — bus-, trein-, veerboot- en transferboekingen via 12Go Asia of Trip.com</>
                      : <><strong>Transport booking links</strong> — bus, train, ferry, and transfer bookings via 12Go Asia or Trip.com</>}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1 flex-shrink-0">&#8212;</span>
                  <span>
                    {isNl
                      ? <><strong>Reisverzekeringlinks</strong> — links naar SafetyWing-plannen op onze reisverzekeringspagina&apos;s</>
                      : <><strong>Travel insurance links</strong> — links to SafetyWing plans on our travel insurance pages</>}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1 flex-shrink-0">&#8212;</span>
                  <span>
                    {isNl
                      ? <><strong>eSIM-links</strong> — links naar Saily op onze SIM-kaart- en connectiviteitsgidsen</>
                      : <><strong>eSIM links</strong> — links to Saily on our SIM card and connectivity guides</>}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1 flex-shrink-0">&#8212;</span>
                  <span>
                    {isNl
                      ? <><strong>VPN-links</strong> — links naar NordVPN op onze reisbeveiliging- en digitale nomadenpagina&apos;s</>
                      : <><strong>VPN links</strong> — links to NordVPN on our travel security and digital nomad pages</>}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1 flex-shrink-0">&#8212;</span>
                  <span>
                    {isNl
                      ? <><strong>Reisuitrustinglinks</strong> — productlinks naar Amazon op onze inpak- en uitrustingsgidsen</>
                      : <><strong>Travel gear links</strong> — product links to Amazon on our packing and gear guides</>}
                  </span>
                </li>
              </ul>
              <p className="text-gray-700">
                {isNl
                  ? 'Links naar externe bronnen die voor feitelijke doeleinden worden geciteerd (overheidswebsites, officiële toerismebureaus, nieuwsartikelen) zijn nooit affiliate links.'
                  : 'Links to external sources cited for factual purposes (government websites, official tourism boards, news articles) are never affiliate links.'}
              </p>
            </div>

            {/* How This Supports Us */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                {isNl ? 'Hoe Dit Ons Ondersteunt' : 'How This Supports Us'}
              </h2>
              <p className="text-gray-700 mb-4">
                {isNl
                  ? 'Het produceren van nauwkeurige, regelmatig bijgewerkte reisinhoud vereist doorlopend onderzoek, schrijfwerk en technisch werk. Affiliate commissies zijn de belangrijkste manier waarop we deze kosten dekken terwijl Go2Thailand.com gratis te gebruiken blijft en grotendeels vrij van opdringerige advertenties.'
                  : 'Producing accurate, regularly updated travel content requires ongoing research, writing, and technical work. Affiliate commissions are the primary way we cover these costs while keeping Go2Thailand.com free to use and largely free of intrusive advertising.'}
              </p>
              <p className="text-gray-700">
                {isNl
                  ? 'Wanneer u boekt via een van onze links, steunt u direct de voortdurende ontwikkeling van deze site zonder extra kosten voor uzelf. We waarderen het en nemen die verantwoordelijkheid serieus door de hierboven beschreven redactionele onafhankelijkheid te handhaven.'
                  : 'When you book through one of our links, you directly support the continued development of this site at no additional cost to yourself. We appreciate it, and we take that responsibility seriously by maintaining the editorial independence described above.'}
              </p>
            </div>

            {/* Related pages */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                {isNl ? 'Gerelateerd Beleid' : 'Related Policies'}
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li>
                  <Link href="/editorial-policy/" className="text-thailand-blue hover:underline font-medium">
                    {isNl ? 'Redactioneel Beleid' : 'Editorial Policy'}
                  </Link>
                  {' '}&mdash; {isNl ? 'hoe we onze inhoud onderzoeken, schrijven en bijwerken' : 'how we research, write, and update our content'}
                </li>
                <li>
                  <Link href="/about/" className="text-thailand-blue hover:underline font-medium">
                    {isNl ? 'Over Ons' : 'About Us'}
                  </Link>
                  {' '}&mdash; {isNl ? 'onze missie en wat we behandelen' : 'our mission and what we cover'}
                </li>
                <li>
                  <Link href="/privacy/" className="text-thailand-blue hover:underline font-medium">
                    {isNl ? 'Privacybeleid' : 'Privacy Policy'}
                  </Link>
                  {' '}&mdash; {isNl ? 'hoe we met uw persoonlijke gegevens omgaan' : 'how we handle your personal data'}
                </li>
                <li>
                  <Link href="/contact/" className="text-thailand-blue hover:underline font-medium">
                    Contact
                  </Link>
                  {' '}&mdash; {isNl ? 'vragen of opmerkingen over deze verklaring' : 'questions or concerns about this disclosure'}
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
