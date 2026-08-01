import fs from "fs";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import path from "path";
import KataAreaGuideEn from "../../../components/phuket/KataAreaGuideEn";
import KataAreaGuideNl from "../../../components/phuket/KataAreaGuideNl";

interface PartnerEntry {
  partnerUrl: string;
}

interface Props {
  partners: Record<string, PartnerEntry>;
}

export default function KataBeachPillar({ partners }: Props) {
  const { locale } = useRouter();
  const props = {
    hotelHref: partners.trip_pillar?.partnerUrl,
    activityHref: partners.klook_pillar?.partnerUrl,
    surfingHref: partners.klook_surfing?.partnerUrl,
  };

  return locale === "nl" ? (
    <KataAreaGuideNl {...props} />
  ) : (
    <KataAreaGuideEn {...props} />
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const file = path.join(
    process.cwd(),
    "data",
    "pseo",
    "areas",
    "kata-partners.json",
  );
  const data = JSON.parse(fs.readFileSync(file, "utf8"));

  return {
    props: { partners: data.partners },
    revalidate: 604800,
  };
};
