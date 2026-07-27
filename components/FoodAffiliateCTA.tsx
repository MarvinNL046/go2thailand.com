import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowRight, BookOpen, ChefHat, ExternalLink, ShoppingBag, UtensilsCrossed } from 'lucide-react';
import { withSubId } from '../lib/affiliates';
import { useSubId } from '../lib/useSubId';
import { AffiliateDisclosure } from './design/AffiliateDisclosure';

const AMAZON_PRODUCTS = {
  cookbook: {
    slug: 'simple-thai-food-cookbook',
    labelNl: 'Thais kookboek',
    labelEn: 'Thai cookbook',
    detailNl: 'Voor recepten, technieken en uitleg over Thaise ingrediënten.',
    detailEn: 'For recipes, techniques and context on Thai ingredients.',
  },
  mortar: {
    slug: 'thai-granite-mortar-eight-inch',
    labelNl: 'Granieten vijzel',
    labelEn: 'Granite mortar',
    detailNl: 'Voor currypasta, som tam en het kneuzen van verse aromaten.',
    detailEn: 'For curry paste, som tam and bruising fresh aromatics.',
  },
  riceCooker: {
    slug: 'zojirushi-six-cup-rice-cooker',
    labelNl: 'Rijstkoker',
    labelEn: 'Rice cooker',
    detailNl: 'Voor jasmijnrijst en andere rijstgerechten; controleer spanning en stekker.',
    detailEn: 'For jasmine rice and rice dishes; verify voltage and plug compatibility.',
  },
} as const;

type AmazonFoodProduct = (typeof AMAZON_PRODUCTS)[keyof typeof AMAZON_PRODUCTS];

function getRelevantAmazonProducts(category: string, dishName: string): AmazonFoodProduct[] {
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
  const klookHref = withSubId('https://klook.tpo.lv/aq6ZFxvc', subId);
  const getYourGuideHref = withSubId('https://getyourguide.tpo.lv/GuAFfGGK', subId);

  return (
    <section aria-labelledby="food-affiliate-title" className="my-10 overflow-hidden rounded-[28px] border border-jade/10 bg-canvas shadow-editorial-lift">
      <div className="relative overflow-hidden bg-jade px-6 py-8 text-white sm:px-9 sm:py-10 lg:px-11">
        <div aria-hidden="true" className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:18px_18px]" />
        <div className="relative grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-[0.18em] text-saffron-light">
              <ChefHat size={15} strokeWidth={1.7} />
              {nl ? 'Van proeven naar zelf maken' : 'From tasting to cooking'}
            </span>
            <h2 id="food-affiliate-title" className="mt-3 max-w-xl font-display text-[2.55rem] font-semibold leading-[0.93] tracking-[-0.035em] sm:text-[3.15rem]">
              {nl ? `Leer ${dishName} met techniek, niet alleen een recept.` : `Learn ${dishName} through technique, not just a recipe.`}
            </h2>
            <p className="mt-5 max-w-xl text-sm font-medium leading-7 text-white/68">
              {nl
                ? 'Vergelijk eerst de actuele lesinhoud, taal, locatie en groepsgrootte. Kies daarna alleen keukengerei dat je thuis echt gaat gebruiken.'
                : 'Compare the current class menu, language, location and group size first. Then choose only the kitchen tools you will genuinely use at home.'}
            </p>
          </div>

          <div className="relative grid gap-3 sm:grid-cols-2">
            <span aria-hidden="true" className="absolute -left-8 right-8 top-1/2 hidden border-t-2 border-dotted border-saffron-light/45 lg:block" />
            <a href={klookHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="group relative flex min-h-32 flex-col justify-between rounded-2xl border border-white/16 bg-white/[0.09] p-5 backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/[0.13] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-light">
              <UtensilsCrossed size={21} className="text-saffron-light" strokeWidth={1.6} />
              <span className="mt-5 flex items-end justify-between gap-3">
                <span>
                  <strong className="block font-display text-xl font-semibold">Klook</strong>
                  <span className="mt-1 block text-[10px] font-medium leading-5 text-white/58">{nl ? 'Controleer actuele kooklessen' : 'Check current cooking classes'}</span>
                </span>
                <ExternalLink size={14} className="shrink-0 text-saffron-light transition group-hover:translate-x-0.5" />
              </span>
            </a>
            <a href={getYourGuideHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="group relative flex min-h-32 flex-col justify-between rounded-2xl border border-white/16 bg-white/[0.09] p-5 backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/[0.13] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-light">
              <ShoppingBag size={21} className="text-saffron-light" strokeWidth={1.6} />
              <span className="mt-5 flex items-end justify-between gap-3">
                <span>
                  <strong className="block font-display text-xl font-semibold">GetYourGuide</strong>
                  <span className="mt-1 block text-[10px] font-medium leading-5 text-white/58">{nl ? 'Controleer actuele foodtours' : 'Check current food tours'}</span>
                </span>
                <ExternalLink size={14} className="shrink-0 text-saffron-light transition group-hover:translate-x-0.5" />
              </span>
            </a>
          </div>
        </div>
        <AffiliateDisclosure className="relative mt-5 !text-white/52">
          {nl
            ? 'De les- en tourknoppen zijn affiliatelinks. Wij kunnen commissie ontvangen zonder extra kosten voor jou; controleer menu, voorwaarden en actuele beschikbaarheid bij de aanbieder.'
            : 'The class and tour buttons are affiliate links. We may earn commission at no extra cost to you; verify the menu, terms and current availability with the provider.'}
        </AffiliateDisclosure>
      </div>

      <div className="px-6 py-8 sm:px-9 sm:py-10 lg:px-11">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="eyebrow">{nl ? 'Voor je eigen keuken' : 'For your own kitchen'}</span>
            <h3 className="mt-2 font-display text-[2.15rem] font-semibold leading-none tracking-[-0.025em] text-jade sm:text-[2.6rem]">
              {nl ? 'Alleen gerei dat bij dit gerecht past.' : 'Only tools that fit this dish.'}
            </h3>
          </div>
          <Link href="/best-cooking-classes-in-thailand/" className="inline-flex items-center gap-2 text-xs font-extrabold text-jade transition hover:text-saffron-dark">
            {nl ? 'Bekijk de kooklesgids' : 'Open the cooking-class guide'}
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className={`mt-7 grid gap-3 ${amazonProducts.length === 1 ? 'sm:max-w-md' : amazonProducts.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
          {amazonProducts.map((product, index) => (
            <a key={product.slug} href={`/go/${product.slug}/`} target="_blank" rel="noopener noreferrer nofollow sponsored" className="group flex min-h-48 flex-col rounded-2xl border border-jade/10 bg-white p-5 shadow-editorial-card transition hover:-translate-y-1 hover:border-saffron/45 hover:shadow-editorial-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron">
              <span className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-jade/[0.06] text-jade">
                  {index === 0 ? <BookOpen size={19} strokeWidth={1.55} /> : <ShoppingBag size={19} strokeWidth={1.55} />}
                </span>
                <span className="font-display text-lg font-semibold text-saffron-dark">0{index + 1}</span>
              </span>
              <strong className="mt-5 block font-display text-[1.5rem] font-semibold leading-none text-jade">{nl ? product.labelNl : product.labelEn}</strong>
              <span className="mt-3 block text-xs font-medium leading-5 text-charcoal/58">{nl ? product.detailNl : product.detailEn}</span>
              <span className="mt-auto flex items-center justify-between border-t border-jade/8 pt-4 text-[10px] font-extrabold text-saffron-dark">
                {nl ? 'Bekijk actuele prijs bij Amazon' : 'Check current price at Amazon'}
                <ExternalLink size={13} className="transition group-hover:translate-x-0.5" />
              </span>
            </a>
          ))}
        </div>

        <AffiliateDisclosure className="mt-5 max-w-4xl">
          {nl
            ? 'Als Amazon-partner verdienen wij aan in aanmerking komende aankopen, zonder extra kosten voor jou. OneLink kan je naar een lokale Amazon-winkel sturen; controleer product, maat, spanning, stekker, verkoper, actuele prijs en levering zelf.'
            : 'As an Amazon Associate we earn from qualifying purchases, at no extra cost to you. OneLink may send you to a local Amazon store; verify the product, size, voltage, plug, seller, current price and delivery yourself.'}
        </AffiliateDisclosure>
      </div>
    </section>
  );
}
