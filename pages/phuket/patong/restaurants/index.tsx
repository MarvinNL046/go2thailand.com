import fs from "fs";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import path from "path";
import PatongRestaurantsEn from "../../../../components/phuket/PatongRestaurantsEn";
import PatongRestaurantsNl from "../../../../components/phuket/PatongRestaurantsNl";

interface PartnerEntry {
  partnerUrl: string;
}

interface Props {
  partners: Record<string, PartnerEntry>;
}

export default function PatongRestaurantsPage({ partners }: Props) {
  const { locale } = useRouter();
  const stayHref = partners.trip_patong_restaurants?.partnerUrl;

  return locale === "nl" ? (
    <PatongRestaurantsNl stayHref={stayHref} />
  ) : (
    <PatongRestaurantsEn stayHref={stayHref} />
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const file = path.join(
    process.cwd(),
    "data",
    "pseo",
    "areas",
    "patong-partners.json",
  );
  const data = JSON.parse(fs.readFileSync(file, "utf8"));

  return {
    props: { partners: data.partners },
    revalidate: 604800,
  };
};
