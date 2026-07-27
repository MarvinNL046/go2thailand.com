import Link from 'next/link';
import { useRouter } from 'next/router';
import { withSubId } from '../lib/affiliates';
import { useSubId } from '../lib/useSubId';

// All Thai-food categories get the cooking-class CTA — desserts, drinks and
// regional specialities also have hands-on classes available (mango-sticky-rice,
// dessert workshops, curry-paste classes, etc).
const SKIP_CATEGORIES: string[] = [];

const AMAZON_PRODUCTS = {
  cookbook: {
    slug: 'simple-thai-food-cookbook',
    labelNl: 'Thais kookboek',
    labelEn: 'Thai cookbook',
    detailNl: 'Voor recepten, technieken en ingrediëntencontext.',
    detailEn: 'For recipes, techniques and ingredient context.',
  },
  mortar: {
    slug: 'thai-granite-mortar-eight-inch',
    labelNl: 'Granieten vijzel',
    labelEn: 'Granite mortar',
    detailNl: 'Voor currypasta, som tam en verse kruiden.',
    detailEn: 'For curry paste, som tam and fresh aromatics.',
  },
  riceCooker: {
    slug: 'zojirushi-six-cup-rice-cooker',
    labelNl: 'Rijstkoker',
    labelEn: 'Rice cooker',
    detailNl: 'Voor jasmijnrijst en kleefrijst-recepten thuis.',
    detailEn: 'For jasmine rice and rice-based recipes at home.',
  },
} as const;

type AmazonFoodProduct = (typeof AMAZON_PRODUCTS)[keyof typeof AMAZON_PRODUCTS];

function getRelevantAmazonProducts(category: string, dishName: string) {
  const intent = `${category} ${dishName}`.toLowerCase();
  const products: AmazonFoodProduct[] = [AMAZON_PRODUCTS.cookbook];

  if (/curry|paste|som tam|papaya|salad|larb|laab|spice|sauce/.test(intent)) {
    products.push(AMAZON_PRODUCTS.mortar);
  }

  if (/rice|khao|sticky|mango/.test(intent)) {
    products.push(AMAZON_PRODUCTS.riceCooker);
  }

  return products.slice(0, 3);
}

interface FoodAffiliateCTAProps {
  category: string;
  dishName: string;
}

export default function FoodAffiliateCTA({ category, dishName }: FoodAffiliateCTAProps) {
  const { locale } = useRouter();
  const nl = locale === 'nl';
  const subId = useSubId();
  const amazonProducts = getRelevantAmazonProducts(category, dishName);

  if (SKIP_CATEGORIES.includes(category)) return null;

  return (
    <div className="bg-thailand-blue/5 border border-thailand-blue/20 rounded-2xl p-6 my-6">
      <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">
        {nl ? 'Wil je Thais Leren Koken?' : 'Want to Learn Thai Cooking?'}
      </h3>
      <p className="text-gray-600 text-sm mb-4">
        {nl
          ? `Leer ${dishName} en andere Thaise gerechten maken met kooklessen en begeleide food tours.`
          : `Master ${dishName} and other Thai dishes with hands-on cooking classes and guided food tours.`}
      </p>
      <div className="flex flex-wrap gap-3 mb-3">
        <a
          href={withSubId('https://klook.tpo.lv/aq6ZFxvc', subId)}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex items-center gap-2 bg-[#FF5722] text-white font-semibold px-5 py-3 rounded-xl hover:bg-[#e64a19] transition-colors"
        >
          {nl ? 'Kooklessen op Klook' : 'Cooking Classes on Klook'}
        </a>
        <a
          href={withSubId('https://getyourguide.tpo.lv/GuAFfGGK', subId)}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex items-center gap-2 bg-[#1B9E3E] text-white font-semibold px-5 py-3 rounded-xl hover:bg-[#157a30] transition-colors"
        >
          {nl ? 'Food Tours op GetYourGuide' : 'Food Tours on GetYourGuide'}
        </a>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Link href="/best-cooking-classes-in-thailand/" className="text-thailand-blue hover:underline font-medium">
          {nl ? 'Bekijk onze gids voor de beste kooklessen in Thailand →' : 'See our guide to the best cooking classes in Thailand →'}
        </Link>
      </div>
      <div className="mt-6 border-t border-thailand-blue/15 pt-5">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-thailand-blue">
          {nl ? 'Handig om zelf Thais te koken' : 'Useful for cooking Thai food at home'}
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {amazonProducts.map((product) => (
            <a
              key={product.slug}
              href={`/go/${product.slug}/`}
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="group flex min-h-32 flex-col justify-between rounded-xl border border-thailand-blue/15 bg-white p-4 transition-colors hover:border-[#f68b1f]/55"
            >
              <span>
                <span className="block font-heading text-base font-bold text-gray-900">
                  {nl ? product.labelNl : product.labelEn}
                </span>
                <span className="mt-1.5 block text-xs leading-5 text-gray-600">
                  {nl ? product.detailNl : product.detailEn}
                </span>
              </span>
              <span className="mt-4 text-xs font-bold text-[#d86f0d] group-hover:text-thailand-blue">
                {nl ? 'Bekijk actuele prijs bij Amazon →' : 'Check current price at Amazon →'}
              </span>
            </a>
          ))}
        </div>
        <p className="mt-3 text-[11px] leading-5 text-gray-500">
          {nl
            ? 'Als Amazon-partner verdienen wij aan in aanmerking komende aankopen, zonder extra kosten voor jou. OneLink kan je naar een lokale Amazon-winkel sturen; product, prijs, verkoper en beschikbaarheid verschillen per land.'
            : 'As an Amazon Associate we earn from qualifying purchases, at no extra cost to you. OneLink may send you to a local Amazon store; product, price, seller and availability vary by country.'}
        </p>
      </div>
      <p className="text-xs text-gray-500 mt-3">
        {nl
          ? 'De kookles- en foodtourknoppen zijn affiliatelinks. We kunnen commissie ontvangen zonder extra kosten voor jou; controleer de actuele listing bij de aanbieder.'
          : 'The cooking-class and food-tour buttons are affiliate links. We may earn commission at no extra cost to you; check the current provider listing.'}
      </p>
    </div>
  );
}
