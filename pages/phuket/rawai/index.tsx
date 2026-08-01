import fs from "fs";
import path from "path";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import RawaiAreaGuideEn from "../../../components/phuket/RawaiAreaGuideEn";
import RawaiAreaGuideNl from "../../../components/phuket/RawaiAreaGuideNl";

interface PartnerEntry { partnerUrl: string; label: string }
interface Partners { [key: string]: PartnerEntry }
interface Props { partners: Partners }

export default function PhuketRawaiPillarPage({ partners }: Props) {
  const { locale } = useRouter();
  const hotelHref = partners.trip_pillar?.partnerUrl;
  const activityHref = partners.klook_pillar?.partnerUrl;
  return locale === "nl" ? (
    <RawaiAreaGuideNl hotelHref={hotelHref} activityHref={activityHref} />
  ) : (
    <RawaiAreaGuideEn hotelHref={hotelHref} activityHref={activityHref} />
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const file = path.join(process.cwd(), "data", "pseo", "areas", "rawai-partners.json");
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  return { props: { partners: data.partners }, revalidate: 604800 };
};
