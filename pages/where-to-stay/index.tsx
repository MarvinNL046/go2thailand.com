import { GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import SEOHead from "../../components/SEOHead";
import Breadcrumbs from "../../components/Breadcrumbs";
import type { TravelIntentPage } from "../../lib/intent-pages";
import WhereToStayHubNl from "../../components/hotels/WhereToStayHubNl";
import { AffiliateDisclosure } from "../../components/design/AffiliateDisclosure";
import { TRIP_GENERIC, withSubId } from "../../lib/affiliates";

interface Props {
  pages: Array<
    Pick<TravelIntentPage, "slug" | "intro" | "topPicks"> & {
      city: string;
      cityName: string;
    }
  >;
}

export default function WhereToStayHubPage({ pages }: Props) {
  const { locale } = useRouter();
  const isNl = locale === "nl";
  if (isNl) return <WhereToStayHubNl pages={pages} />;
  const breadcrumbs = [
    { name: "Home", href: "/" },
    {
      name: isNl ? "Waar verblijven" : "Where to Stay",
      href: "/where-to-stay/",
    },
  ];
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Where to Stay in Thailand",
    description: "Compare hotel areas by destination, traveller fit, transport and trade-offs before checking live accommodation options.",
    url: "https://go2-thailand.com/where-to-stay/",
    inLanguage: "en",
    mainEntity: { "@id": "https://go2-thailand.com/where-to-stay/#destinations" },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `https://go2-thailand.com${crumb.href}`,
    })),
  };
  const destinationListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": "https://go2-thailand.com/where-to-stay/#destinations",
    itemListElement: pages.map((page, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `Where to stay in ${page.cityName}`,
      url: `https://go2-thailand.com${page.slug}`,
    })),
  };

  return (
    <>
      <SEOHead
        title={
          isNl
            ? "Waar verblijven in Thailand? Beste gebieden per stad"
            : "Where to Stay in Thailand: Best Areas by City (2026)"
        }
        description={
          isNl
            ? "Vergelijk de beste verblijfsgebieden en hotels per Thaise bestemming. Kies een uitvalsbasis op sfeer, reistijd, budget en jouw reisstijl."
            : "Choose where to stay in Thailand with city-by-city area guides, hotel zones, traveller-type recommendations, and booking links."
        }
        ogImage="https://go2-thailand.com/images/redesign/phuket-hotels-hero.webp"
      >
        <link
          rel="canonical"
          href={`https://go2-thailand.com${isNl ? "/nl" : ""}/where-to-stay/`}
        />
        {!isNl && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />}
        {!isNl && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />}
        {!isNl && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(destinationListJsonLd) }} />}
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        <section className="bg-thailand-blue text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Breadcrumbs items={breadcrumbs} />
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/75">
              {isNl
                ? "Kies eerst je uitvalsbasis"
                : "Thailand accommodation decision hub"}
            </p>
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-2">
              {isNl
                ? "Waar verblijven in Thailand?"
                : "Where to stay in Thailand"}
            </h1>
            <p className="mt-4 text-lg opacity-90 max-w-3xl">
              {isNl
                ? "Kies eerst de bestemming en vergelijk daarna welke wijk of kustzone bij je route past. Zo voorkom je onnodige reistijd voordat je een hotel boekt."
                : "Pick the right city area before you book. These guides compare neighborhoods by traveller type, transport, hotel value, and trade-offs."}
            </p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div id="destinations" className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {pages.map((page) => (
              <Link
                key={page.slug}
                href={isNl ? `/best-hotels/${page.city}/` : page.slug}
                className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200 hover:border-thailand-blue hover:shadow-md transition-all"
              >
                <h2 className="font-heading text-xl font-bold text-gray-900">
                  {isNl
                    ? `Waar verblijven in ${page.cityName}?`
                    : `Where to stay in ${page.cityName}`}
                </h2>
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                  {page.intro}
                </p>
                {page.topPicks.length > 0 && (
                  <p className="mt-4 text-sm text-gray-700">
                    <span className="font-semibold">
                      {isNl ? "Begin bij:" : "Start with:"}
                    </span>{" "}
                    {page.topPicks
                      .slice(0, 3)
                      .map((pick) => pick.name)
                      .join(", ")}
                  </p>
                )}
                <span className="mt-4 inline-block text-sm font-semibold text-thailand-blue">
                  {isNl ? "Vergelijk gebieden en hotels" : "Compare areas"}
                </span>
              </Link>
            ))}
          </div>
          {!isNl && (
            <section className="mt-10 rounded-2xl bg-thailand-blue p-7 text-white shadow-md lg:flex lg:items-center lg:justify-between lg:gap-8">
              <div className="max-w-2xl">
                <h2 className="font-heading text-2xl font-bold">Chosen an area? Compare the live hotel details.</h2>
                <p className="mt-2 text-sm leading-6 text-white/80">Use the guides for location fit, then verify the exact room, taxes, breakfast, cancellation terms and final total for your dates.</p>
              </div>
              <div className="mt-5 shrink-0 lg:mt-0">
                <a href={withSubId(TRIP_GENERIC, "where-to-stay-en-hub")} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-thailand-blue hover:bg-gray-100">Compare hotels on Trip.com</a>
                <AffiliateDisclosure className="mt-2 !text-white/65">Affiliate link; a booking may earn us a commission at no extra cost to you.</AffiliateDisclosure>
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { getWhereToStayIntentPage, listIntentPaths } =
    await import("../../lib/intent-pages");
  const pages = listIntentPaths("where-to-stay")
    .map((path) => getWhereToStayIntentPage(path.params.city))
    .filter((page): page is TravelIntentPage => page !== null)
    .map((page) => ({
      city: page.city!,
      cityName: page.cityName!,
      slug: page.slug,
      intro: page.intro,
      topPicks: page.topPicks,
    }))
    .sort((a, b) => (a.cityName || "").localeCompare(b.cityName || ""));

  return {
    props: { pages },
    revalidate: 604800,
  };
};
