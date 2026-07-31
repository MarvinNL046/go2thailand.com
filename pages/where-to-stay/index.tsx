import { GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import SEOHead from "../../components/SEOHead";
import Breadcrumbs from "../../components/Breadcrumbs";
import type { TravelIntentPage } from "../../lib/intent-pages";
import WhereToStayHubNl from "../../components/hotels/WhereToStayHubNl";

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
      >
        <link
          rel="canonical"
          href={`https://go2-thailand.com${isNl ? "/nl" : ""}/where-to-stay/`}
        />
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
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
