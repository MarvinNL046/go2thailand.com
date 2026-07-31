import fs from "fs";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import path from "path";
import KamalaAreaGuideEn from "../../../components/phuket/KamalaAreaGuideEn";
import KamalaAreaGuideNl from "../../../components/phuket/KamalaAreaGuideNl";

interface PartnerEntry {
  partnerUrl: string;
}

interface Props {
  partners: Record<string, PartnerEntry>;
}

export default function KamalaBeachPillar({ partners }: Props) {
  const { locale } = useRouter();
  const props = {
    hotelHref: partners.trip_pillar?.partnerUrl,
    activityHref: partners.klook_pillar?.partnerUrl,
  };

  return locale === "nl" ? (
    <KamalaAreaGuideNl {...props} />
  ) : (
    <KamalaAreaGuideEn {...props} />
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const file = path.join(
    process.cwd(),
    "data",
    "pseo",
    "areas",
    "kamala-partners.json",
  );
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  return { props: { partners: data.partners }, revalidate: 604800 };
};
