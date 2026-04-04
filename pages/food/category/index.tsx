import Link from 'next/link';
import { useRouter } from 'next/router';
import FadeInText from '../../../components/FadeInText';
import HighlightedText from '../../../components/HighlightedText';
import { useTranslation } from '../../../hooks/useTranslation';
import SEOHead from '../../../components/SEOHead';

const categoryInfo = {
  'main-dish': {
    title: 'Main Dishes',
    titleNl: 'Hoofdgerechten',
    description: 'Hearty and satisfying Thai main courses that form the centerpiece of any meal',
    descriptionNl: 'Hartige en bevredigende Thaise hoofdgerechten die het middelpunt van elke maaltijd vormen',
    icon: '🍽️',
    count: 15,
    editorial: 'Thai main dishes are built around the interplay of five flavours: sweet, sour, salty, bitter, and spicy. A proper main course balances all five rather than emphasising one. Staples include Pad Thai (stir-fried rice noodles with egg, bean sprouts, and peanuts), Pad Krapao (basil stir-fry with minced meat), and Khao Pad (fried rice). Northern Thailand leans on Khao Soi (curried noodle soup) and Sai Oua (herbed sausage). Southern mains tend to be fiercer — Gaeng Som (sour curry) and Moo Hong (braised pork) are regional icons. Central Thai cooking, shaped by centuries of royal court cuisine, emphasises visual presentation and layered complexity.',
    regional: ['Northern: Khao Soi, Nam Prik Ong', 'Central: Pad Thai, Pad Krapao', 'Southern: Gaeng Som, Moo Hong', 'Isan: Larb, Nam Tok'],
  },
  'soup': {
    title: 'Thai Soups',
    titleNl: 'Thaise Soepen',
    description: 'Soul-warming broths and soups that showcase the complex flavors of Thai cuisine',
    descriptionNl: 'Verwarmende bouillons en soepen die de complexe smaken van de Thaise keuken laten zien',
    icon: '🍲',
    count: 8,
    editorial: 'Thai soups divide into two broad families: tom (boiled/simmered soups) and gang (curry-based soups with coconut milk). Tom Yum Goong — the famous hot-and-sour prawn soup with lemongrass, galangal, kaffir lime leaves, and chilli — is so central to Thai culinary identity that UNESCO recognised it as Intangible Cultural Heritage in 2024. Tom Kha Gai (coconut milk chicken soup) is arguably even more universally loved. Clear broths like Tom Jued (mild vegetable and pork soup) appear at every family table. In the north, Khao Soi bridges the gap between soup and curry. Street-side noodle soups (kuaitiao) are the daily staple for millions of Thais who eat them for breakfast.',
    regional: ['Northern: Khao Soi (curried noodle soup)', 'Central: Tom Yum, Tom Kha, Tom Jued', 'Southern: Gaeng Tai Pla (fish organ curry)', 'Isan: Tom Saep (spicy pork broth)'],
  },
  'curry': {
    title: 'Thai Curries',
    titleNl: 'Thaise Curry\'s',
    description: 'Rich and aromatic curry dishes featuring coconut milk and fragrant spice pastes',
    descriptionNl: 'Rijke en aromatische currygerechten met kokosmelk en geurige kruidenpasta\'s',
    icon: '🫕',
    count: 10,
    editorial: 'Thai curries are defined not by powder but by paste — freshly pounded combinations of chilies, lemongrass, galangal, shrimp paste, garlic, and aromatics that vary dramatically by region and colour. Green curry (kaeng khiao wan) is the most popular internationally, made with fresh green chillies and coconut milk. Red curry (kaeng phet) uses dried red chillies for a deeper, more robust flavour. Massaman curry, with its Persian-influenced spice profile (cardamom, cinnamon, star anise), is a Muslim-influenced southern dish that has topped international "world\'s best dish" polls. Panang curry is thick and rich with kaffir lime leaves. In the north, curry pastes are pounded without coconut milk for drier preparations like Gaeng Hung Lay (Burmese-influenced pork curry). Southern curries are the most intensely spiced, often using turmeric and dried spices alongside fresh aromatics.',
    regional: ['Northern: Gaeng Hung Lay, Nam Prik Ong', 'Central: Green, Red, Yellow, Panang curry', 'Southern: Massaman, Gaeng Leung (yellow curry)', 'Isan: Gaeng Om (herb-heavy broth curry)'],
  },
  'salad': {
    title: 'Thai Salads',
    titleNl: 'Thaise Salades',
    description: 'Fresh and vibrant salads with bold flavors, contrasting textures, and punchy dressings',
    descriptionNl: 'Frisse en levendige salades met gedurfde smaken, contrasterende texturen en pittige dressings',
    icon: '🥗',
    count: 7,
    editorial: 'Thai salads (yam) are nothing like Western salads. They are bold, punchy, textural compositions of fresh and cooked ingredients dressed with lime juice, fish sauce, chilli, and sugar. Som Tam (green papaya salad) is the most famous — made by pounding unripe papaya with tomato, green beans, peanuts, dried shrimp, and chilli in a mortar and pestle. It originated in Isan (northeast Thailand) and is now one of the most-eaten dishes in the country. Larb (minced meat salad with toasted rice powder, lime, and fresh herbs) is another Isan classic that has spread nationwide. Yam Woon Sen (glass noodle salad with pork and prawn) and Yam Talay (seafood salad) are popular in Bangkok and the south. What unites them is the balance of sour, spicy, salty, and sweet achieved in a single bowl.',
    regional: ['Northern: Larb Mueang (pork or chicken)', 'Central: Yam Woon Sen, Yam Talay', 'Southern: Yam Som-O (pomelo salad)', 'Isan: Som Tam, Larb, Nam Tok'],
  },
  'dessert': {
    title: 'Thai Desserts',
    titleNl: 'Thaise Desserts',
    description: 'Sweet treats and traditional desserts that use coconut, palm sugar, and tropical fruits',
    descriptionNl: 'Zoete lekkernijen en traditionele desserts met kokos, palmsuiker en tropisch fruit',
    icon: '🍮',
    count: 6,
    editorial: 'Thai desserts (khanom) are an art form shaped by the royal court, where elaborate sweets were gifts of prestige. Many traditional khanom Thai use just three ingredients — coconut milk, palm sugar, and rice flour — yet achieve extraordinary complexity of texture and flavour. Mango with sticky rice (khao niao mamuang) is universally loved and at its peak from April to June when the finest Nam Dok Mai mangoes are in season. Khanom Chan (layered pandan and coconut jelly) and Thong Yip (gold-egg-yolk sweets shaped like flowers) trace their origins to Portuguese influence in the Ayutthaya period. Kluai Buat Chi (banana in coconut milk) is the ultimate street-side comfort dessert. Modern Thai dessert cafes have reimagined these traditions into contemporary creations — coconut ice cream in a young coconut shell is the most photographed dessert in the country.',
    regional: ['Northern: Khao Niao Dum (black sticky rice)', 'Central: Thong Yip, Mango Sticky Rice', 'Southern: Khanom Jeen (rice noodle with sweet coconut)', 'Isan: Khao Tom Mat (sticky rice in banana leaf)'],
  },
  'noodles': {
    title: 'Thai Noodles',
    titleNl: 'Thaise Noedels',
    description: 'From street-stall Pad Thai to boat noodles — noodles are the daily staple of Thai cuisine',
    descriptionNl: 'Van Pad Thai-stalletjes tot bootnoedels — noedels zijn het dagelijkse basisvoedsel van de Thaise keuken',
    icon: '🍜',
    count: 9,
    editorial: 'Noodles arrived in Thailand through Chinese immigration and have been so thoroughly adopted that many dishes are now considered quintessentially Thai. Pad Thai — stir-fried sen lek (thin rice noodles) with egg, bean sprouts, and peanuts — was promoted by the Thai government in the 1940s as a national dish and is now eaten worldwide. But the real daily noodle culture lives in the kuaitiao stalls that open before dawn: you choose your noodle type (sen lek, sen yai, or egg noodles), your broth (clear, dark, or "dry" with sauce), and your protein, then eat standing at a cart. Boat noodles (kuaitiao ruea), originally sold from canal boats in Bangkok, are intensely dark and rich. Ba Mee (yellow egg noodles with BBQ pork) is a Chinatown staple. In the south, Kanom Jeen — thin, fermented rice-flour noodles served with curry — is eaten at breakfast.',
    regional: ['Northern: Khao Soi egg noodles with curry', 'Central: Pad Thai, Kuaitiao, Boat Noodles', 'Southern: Kanom Jeen with curry sauce', 'Isan: Pad Mee (stir-fried vermicelli)'],
  },
  'street-snacks': {
    title: 'Street Food & Snacks',
    titleNl: 'Straatvoedsel & Snacks',
    description: 'Thailand\'s world-famous street food scene — satay, fried insects, skewers, and grilled corn',
    descriptionNl: 'Thailand\'s wereldberoemde straatvoedselscene — satay, gefrituurde insecten, spiesjes en gegrilde maïs',
    icon: '🍢',
    count: 12,
    editorial: 'Bangkok has repeatedly been named the world\'s best street food city, and Thailand\'s street food culture is genuinely extraordinary. Every street corner, every market, and every train station has vendors selling everything from grilled pork skewers (moo ping) and fresh spring rolls (poh pia sod) to fried bananas (kluai tod), coconut pancakes (kanom krok), and Thai iced tea. Satay (grilled meat on skewers with peanut sauce) arrived from Malay and Indonesian influence and is now ubiquitous. In Chiang Mai and Bangkok\'s Khao San Road, tourist-oriented stalls sell fried insects (crickets, grasshoppers, silkworms) — a genuine local snack in Isan, where protein scarcity made insect-eating practical and eventually cultural. A full street food dinner — two mains, a dessert, and a drink — rarely costs more than ฿150–200.',
    regional: ['Northern: Sai Oua grilled sausage, Kanom Krok', 'Central: Moo Ping, Satay, Tod Mun', 'Southern: Roti Mataba, Kanom Buang', 'Isan: Gai Yang grilled chicken, fried insects'],
  },
};

export default function FoodCategoriesIndex() {
  const { t } = useTranslation('common');
  const { locale } = useRouter();
  const isNl = locale === 'nl';

  return (
    <>
      <SEOHead
        title={isNl ? "Thaise Gerechten per Categorie — Curry's, Soepen, Noedels & Meer | Go2Thailand" : "Thai Food Categories — Curries, Soups, Noodles & More | Go2Thailand"}
        description={isNl ? "Bekijk Thaise gerechten per categorie: curry's, soepen, salades, noedels, straatvoedsel en desserts. Inclusief regionale variaties uit Noord-, Centraal-, Zuid- en Isan-Thailand." : "Browse Thai dishes by category: curries, soups, salads, noodles, street snacks, and desserts. Includes regional variations from Northern, Central, Southern, and Isan Thailand."}
      >
        <meta name="keywords" content="Thai food categories, Thai dishes, Thai recipes, Thai cuisine types, Thai curries, Thai soups, Thai street food, regional Thai cuisine" />
      </SEOHead>

      <div className="min-h-screen bg-surface-cream">
        {/* Hero Section */}
        <section className="relative py-16 bg-surface-dark">
          <div className="container-custom text-center text-white">
            <FadeInText>
              <p className="font-script text-thailand-gold mb-2">{isNl ? 'Verken op Type' : 'Explore by Type'}</p>
              <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-4">
                <HighlightedText
                  text={isNl ? "Thaise Gerechten Categorieën" : "Thai Food Categories"}
                  highlightWords={['Thai', 'Thaise', 'Food', 'Gerechten']}
                  highlightClassName="text-thailand-gold"
                  animationType="glow"
                />
              </h1>
            </FadeInText>
            <FadeInText delay={200}>
              <p className="text-xl max-w-3xl mx-auto">
                {isNl
                  ? 'Verken de diverse wereld van de Thaise keuken georganiseerd per gerecht — van UNESCO-erkende Tom Yum tot koninklijke hofdesserts en Isan-straatvoedsel.'
                  : 'Explore the diverse world of Thai cuisine organised by dish type — from UNESCO-recognised Tom Yum to royal court desserts and Isan street snacks.'}
              </p>
            </FadeInText>
          </div>
        </section>

        {/* Editorial Introduction */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">{isNl ? 'De Thaise Keuken Begrijpen' : 'Understanding Thai Cuisine'}</h2>
              <div className="prose prose-lg text-gray-700">
                <p className="mb-4">
                  {isNl
                    ? 'De Thaise keuken is een van de meest complexe en gevierde eetculturen ter wereld, gevoed door eeuwenlange invloeden uit de Chinese, Indiase, Maleisische, Portugese en koninklijke hofkeukentradities. Wat het bijzonder maakt is niet alleen de pittigheid — het is het streven naar harmonie tussen vijf fundamentele smaken: zoet, zuur, zout, bitter en pikant. Een goed bereid Thais gerecht balanceert alle vijf in één hap.'
                    : "Thai cuisine is one of the world's most complex and celebrated food cultures, drawing on centuries of influence from Chinese, Indian, Malay, Portuguese, and royal court traditions. What makes it distinctive is not heat alone — it is the pursuit of harmony between five fundamental flavours: sweet, sour, salty, bitter, and spicy. A well-made Thai dish balances all five in a single bite."}
                </p>
                <p className="mb-4">
                  {isNl
                    ? <>De vier belangrijkste culinaire regio&apos;s van Thailand produceren dramatisch verschillend eten. <strong>Noord-Thailand</strong> (Chiang Mai, Chiang Rai) heeft koelere temperaturen die aardse, minder kokoszware gerechten begunstigen, beïnvloed door Birmese en Yunnan-Chinese kookkunst — kleefrijst, gefermenteerd varkensvlees en milde kruidenrijke bereidingen. <strong>Centraal-Thailand</strong>, gecentreerd rond Bangkok, is de thuisbasis van de koninklijke hofkeukentraditie: uitgebreide, gebalanceerde en visueel verfijnde gerechten zoals Pad Thai, Groene Curry en Mango Sticky Rice die internationaal synoniem zijn geworden met &quot;Thais eten.&quot;</>
                    : <>The four main culinary regions of Thailand produce dramatically different food. <strong>Northern Thailand</strong> (Chiang Mai, Chiang Rai) has cooler temperatures that favour earthier, less coconut-heavy dishes influenced by Burmese and Yunnan Chinese cooking — sticky rice, fermented pork, and mild herb-heavy preparations. <strong>Central Thailand</strong>, centred on Bangkok, is home to the royal court cuisine tradition: elaborate, balanced, visually refined dishes like Pad Thai, Green Curry, and Mango Sticky Rice that have become internationally synonymous with &quot;Thai food.&quot;</>}
                </p>
                <p className="mb-4">
                  {isNl
                    ? <><strong>Isan (Noordoost-)Thailand</strong>, de grootste en armste regio van het land, heeft een keuken gebouwd op vindingrijkheid: gefermenteerde vis (pla ra), vurige papajasalades (som tam), gegrild vlees en kleefrijst die met de handen wordt gegeten. Isan-eten is misschien wel het meest eerlijke eten van Thailand — gedurfd, krachtig en ongegeneerd smaakrijk. Het is ook het eten dat de meeste Thais daadwerkelijk elke dag eten. <strong>Zuid-Thailand</strong> brengt overvloed aan zeevruchten en sterke Maleisische en islamitische invloeden, met kurkumarijke curry&apos;s, intense garnalenpasta&apos;s en gerechten die aanzienlijk pittiger zijn dan alles wat je in het centrum of noorden vindt.</>
                    : <><strong>Isan (Northeastern) Thailand</strong>, the country&apos;s largest and poorest region, has a cuisine built on resourcefulness: fermented fish (pla ra), fiery papaya salads (som tam), grilled meats, and sticky rice eaten with the hands. Isan food is arguably Thailand&apos;s most honest — bold, punchy, and unapologetically flavourful. It is also the food most Thais actually eat every day. <strong>Southern Thailand</strong> brings seafood abundance and heavy Malay and Muslim influence, with turmeric-heavy curries, intense shrimp pastes, and dishes that are significantly spicier than anything found in the centre or north.</>}
                </p>
                <p className="mb-0">
                  In 2024, UNESCO recognised Tom Yum Goong as Intangible Cultural Heritage, acknowledging the cultural importance of Thai cuisine at the highest international level. Phetchaburi, a Central Thai province famous for its palm sugar and intricate sweets, holds UNESCO Creative City of Gastronomy status. Thai cooking classes are the most booked tourist activity in the country — learning to make a curry paste from scratch is one of the most memorable experiences Thailand offers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Regional Overview */}
        <section className="py-10">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6 text-center">{isNl ? 'Thaise Keuken per Regio' : 'Thai Cuisine by Region'}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <h3 className="font-heading font-bold text-gray-900 mb-2">{isNl ? 'Noord-Thailand' : 'Northern Thailand'}</h3>
                  <p className="text-sm text-gray-600 mb-3">{isNl ? 'Kleefrijst, milde kruiden, Birmese en Yunnan-invloed. Minder kokosmelk, meer gefermenteerde smaken.' : 'Sticky rice, mild herbs, Burmese and Yunnan influence. Less coconut milk, more fermented flavours.'}</p>
                  <p className="text-xs text-thailand-gold font-medium">Key dishes: Khao Soi, Larb Mueang, Nam Prik Ong, Sai Oua</p>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <h3 className="font-heading font-bold text-gray-900 mb-2">{isNl ? 'Centraal-Thailand' : 'Central Thailand'}</h3>
                  <p className="text-sm text-gray-600 mb-3">{isNl ? 'Koninklijke hoftraditie, gebalanceerde smaken, curry\'s op basis van kokos. Het "klassieke Thai" dat de wereld kent.' : 'Royal court tradition, balanced flavours, coconut-based curries. The "classic Thai" most of the world knows.'}</p>
                  <p className="text-xs text-thailand-gold font-medium">Key dishes: Pad Thai, Green/Red Curry, Tom Yum, Tom Kha</p>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <h3 className="font-heading font-bold text-gray-900 mb-2">{isNl ? 'Isan (Noordoost)' : 'Isan (Northeast)'}</h3>
                  <p className="text-sm text-gray-600 mb-3">{isNl ? 'Gedurfd, gefermenteerd, vurig. Kleefrijst gegeten met de hand, gestampte salades, gegrild vlees. Laotiaanse invloed.' : 'Bold, fermented, fiery. Sticky rice eaten by hand, pounded salads, grilled meats. Laos-influenced.'}</p>
                  <p className="text-xs text-thailand-gold font-medium">Key dishes: Som Tam, Larb, Gai Yang, Tom Saep</p>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <h3 className="font-heading font-bold text-gray-900 mb-2">{isNl ? 'Zuid-Thailand' : 'Southern Thailand'}</h3>
                  <p className="text-sm text-gray-600 mb-3">{isNl ? 'Maleisische en islamitische invloed, intense kruiden, overvloedige zeevruchten, kurkuma en gedroogde specerijen prominent.' : 'Malay and Muslim influence, intense spice, abundant seafood, turmeric and dried spices prominent.'}</p>
                  <p className="text-xs text-thailand-gold font-medium">Key dishes: Massaman Curry, Gaeng Som, Roti, Kanom Jeen</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-12">
          <div className="container-custom">
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-8 text-center">{isNl ? 'Bekijk per Categorie' : 'Browse by Dish Category'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {Object.entries(categoryInfo).map(([slug, info]) => (
                <Link key={slug} href={`/food/category/${slug}/`}>
                  <div className="bg-white rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer h-full">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-4xl flex-shrink-0">{info.icon}</div>
                      <div>
                        <h2 className="text-xl font-heading font-bold text-gray-900 mb-1">{isNl ? info.titleNl : info.title}</h2>
                        <p className="text-gray-500 text-sm">{isNl ? info.descriptionNl : info.description}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">{info.editorial}</p>
                    {info.regional && (
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{isNl ? 'Regionale Hoogtepunten' : 'Regional Highlights'}</p>
                        <ul className="space-y-1">
                          {info.regional.map((r) => (
                            <li key={r} className="text-xs text-gray-600 flex items-start gap-1">
                              <span className="text-thailand-gold mt-0.5">&#9656;</span>
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-sm font-medium text-gray-500">
                        {info.count} {isNl ? 'Traditionele Gerechten' : 'Traditional Dishes'}
                      </span>
                      <span className="text-thailand-blue font-medium text-sm hover:text-thailand-red transition-colors">
                        {isNl ? `Bekijk ${info.titleNl}` : `Explore ${info.title}`} &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* UNESCO & Cultural Context */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <p className="section-label font-script text-thailand-gold">{isNl ? 'Cultureel Erfgoed' : 'Cultural Heritage'}</p>
              <h2 className="text-3xl font-heading font-bold mb-4">{isNl ? 'Thais Eten op het Wereldtoneel' : 'Thai Food on the World Stage'}</h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                {isNl
                  ? 'In 2024 schreef UNESCO Tom Yum Goong in op de lijst van Immaterieel Cultureel Erfgoed, als erkenning van het gerecht als een levende uitdrukking van Thaise cultuur, identiteit en gemeenschap. De provincie Phetchaburi heeft de UNESCO Creative City of Gastronomy-status voor zijn eeuwenoude traditie van palmsuikersnoepjes en banketbakkerij.'
                  : 'In 2024, UNESCO inscribed Tom Yum Goong on its list of Intangible Cultural Heritage, recognising the dish as a living expression of Thai culture, identity, and community. Phetchaburi Province holds UNESCO Creative City of Gastronomy status for its century-old tradition of palm sugar sweets and confectionery craftsmanship. Thailand\u2019s government actively promotes \u201cgastro-diplomacy\u201d \u2014 over 15,000 Thai restaurants operate worldwide, making it one of the most globally distributed cuisines on earth.'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-surface-cream p-6 rounded-2xl shadow-md">
                  <div className="text-2xl mb-2">&#127942;</div>
                  <h3 className="font-heading font-semibold mb-2">{isNl ? 'UNESCO Erfgoed' : 'UNESCO Heritage'}</h3>
                  <p className="text-sm text-gray-600">
                    {isNl ? 'Tom Yum Goong erkend als Immaterieel Cultureel Erfgoed in 2024' : 'Tom Yum Goong recognised as Intangible Cultural Heritage in 2024'}
                  </p>
                </div>
                <div className="bg-surface-cream p-6 rounded-2xl shadow-md">
                  <div className="text-2xl mb-2">&#128506;&#65039;</div>
                  <h3 className="font-heading font-semibold mb-2">{isNl ? '4 Verschillende Regio\'s' : '4 Distinct Regions'}</h3>
                  <p className="text-sm text-gray-600">
                    {isNl ? 'Noord, Centraal, Zuid en Isan hebben elk een compleet andere keuken' : 'Northern, Central, Southern, and Isan each have entirely different cuisines'}
                  </p>
                </div>
                <div className="bg-surface-cream p-6 rounded-2xl shadow-md">
                  <div className="text-2xl mb-2">&#127798;&#65039;</div>
                  <h3 className="font-heading font-semibold mb-2">{isNl ? 'Vijf Smaken Balans' : 'Five Flavour Balance'}</h3>
                  <p className="text-sm text-gray-600">
                    {isNl ? 'Zoet, zuur, zout, bitter en pittig in harmonie definieert authentiek Thais koken' : 'Sweet, sour, salty, bitter, and spicy in harmony defines authentic Thai cooking'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Learn to Cook */}
        <section className="bg-white py-16">
          <div className="container-custom text-center">
            <p className="section-label font-script text-thailand-gold">{isNl ? 'Ervaring' : 'Experience'}</p>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
              {isNl ? 'Leer Deze Gerechten Koken' : 'Learn to Cook These Dishes'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {isNl
                ? 'Volg een hands-on Thaise kookcursus en leer je favoriete gerechten thuis na te maken. Cursussen behandelen currypasta maken, woktechniek en dessertbereiding.'
                : 'Take a hands-on Thai cooking class and learn to recreate your favourite dishes at home. Classes cover curry paste-making, wok technique, and dessert preparation.'}
            </p>
            <Link
              href="/best-cooking-classes-in-thailand/"
              className="inline-block bg-thailand-red text-white px-8 py-3 rounded-xl font-semibold hover:bg-thailand-blue transition-colors"
            >
              {isNl ? 'Vergelijk Kookcursussen in Thailand' : 'Compare Cooking Classes Across Thailand'}
            </Link>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-8 bg-white">
          <div className="container-custom text-center space-y-4">
            <div>
              <Link href="/drinks/" className="text-thailand-blue hover:underline font-medium">
                {isNl ? 'Ontdek Thaise Dranken' : 'Explore Thai Drinks'} &rarr;
              </Link>
            </div>
            <div>
              <Link href="/food/" className="btn-primary">
                &larr; {isNl ? 'Terug naar Alle Thaise Gerechten' : 'Back to All Thai Dishes'}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
