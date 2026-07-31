import fs from "fs";
import path from "path";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import NaiHarnAreaGuideEn from "../../../components/phuket/NaiHarnAreaGuideEn";
import NaiHarnAreaGuideNl from "../../../components/phuket/NaiHarnAreaGuideNl";

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

export default function PhuketNaiHarnPillarPage({ partners }: Props) {
  const { locale } = useRouter();
  const hotelHref = partners.trip_pillar?.partnerUrl;
  const activityHref =
    partners.klook_activities?.partnerUrl || partners.klook_pillar?.partnerUrl;

  return locale === "nl" ? (
    <NaiHarnAreaGuideNl
      hotelHref={hotelHref}
      activityHref={activityHref}
    />
  ) : (
    <NaiHarnAreaGuideEn
      hotelHref={hotelHref}
      activityHref={activityHref}
    />
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const file = path.join(
    process.cwd(),
    "data",
    "pseo",
    "areas",
    "nai-harn-partners.json",
  );
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  return { props: { partners: data.partners }, revalidate: 604800 };
};
