import fs from "fs";
import path from "path";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import OldTownNightMarketEn from "../../../../components/phuket/OldTownNightMarketEn";
import OldTownNightMarketNl from "../../../../components/phuket/OldTownNightMarketNl";

interface PartnerEntry {
  partnerUrl: string;
  label: string;
}
interface Partners {
  [key: string]: PartnerEntry;
}
interface Props {
  partners: Partners;
}

export default function PhuketOldTownNightMarketPage({ partners }: Props) {
  const { locale } = useRouter();
  const activityHref = partners.klook_market?.partnerUrl;
  return locale === "nl" ? (
    <OldTownNightMarketNl activityHref={activityHref} />
  ) : (
    <OldTownNightMarketEn activityHref={activityHref} />
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const file = path.join(
    process.cwd(),
    "data",
    "pseo",
    "areas",
    "old-town-partners.json",
  );
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  return { props: { partners: data.partners }, revalidate: 604800 };
};
