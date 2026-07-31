import fs from "fs";
import path from "path";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import KaronAreaGuideEn from "../../../components/phuket/KaronAreaGuideEn";
import KaronAreaGuideNl from "../../../components/phuket/KaronAreaGuideNl";

interface PartnerEntry { partnerUrl: string }
interface Partners { [key: string]: PartnerEntry }
interface Props { partners: Partners; yachtPartners: Partners }

export default function KaronBeachPillarPage({ partners, yachtPartners }: Props) {
  const { locale } = useRouter();
  const hotelHref = partners.trip_karon_city?.partnerUrl;
  const activityHref = yachtPartners.klook_catamaran?.partnerUrl;
  return locale === "nl" ? <KaronAreaGuideNl hotelHref={hotelHref} activityHref={activityHref} /> : <KaronAreaGuideEn hotelHref={hotelHref} activityHref={activityHref} />;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const area = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "pseo", "areas", "karon-partners.json"), "utf8"));
  const yacht = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "pseo", "yacht-charter", "phuket-partners.json"), "utf8"));
  return { props: { partners: area.partners, yachtPartners: yacht.partners }, revalidate: 604800 };
};
