import fs from "fs";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import path from "path";
import SurinAreaGuideEn from "../../../components/phuket/SurinAreaGuideEn";
import SurinAreaGuideNl from "../../../components/phuket/SurinAreaGuideNl";

interface PartnerEntry {
  partnerUrl: string;
}
interface Props {
  partners: Record<string, PartnerEntry>;
}

export default function SurinPillar({ partners }: Props) {
  const { locale } = useRouter();
  const props = {
    hotelHref: partners.trip_pillar?.partnerUrl,
    activityHref: partners.klook_pillar?.partnerUrl,
  };
  return locale === "nl" ? (
    <SurinAreaGuideNl {...props} />
  ) : (
    <SurinAreaGuideEn {...props} />
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const file = path.join(
    process.cwd(),
    "data",
    "pseo",
    "areas",
    "surin-partners.json",
  );
  const payload = JSON.parse(fs.readFileSync(file, "utf8"));
  return { props: { partners: payload.partners } };
};
