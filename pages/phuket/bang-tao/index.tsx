import fs from "fs";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import path from "path";
import BangTaoAreaGuideEn from "../../../components/phuket/BangTaoAreaGuideEn";
import BangTaoAreaGuideNl from "../../../components/phuket/BangTaoAreaGuideNl";

interface PartnerEntry {
  partnerUrl: string;
}
interface Props {
  partners: Record<string, PartnerEntry>;
}

export default function BangTaoPillar({ partners }: Props) {
  const { locale } = useRouter();
  const props = {
    hotelHref: partners.trip_pillar?.partnerUrl,
    activityHref: partners.klook_pillar?.partnerUrl,
  };
  return locale === "nl" ? (
    <BangTaoAreaGuideNl {...props} />
  ) : (
    <BangTaoAreaGuideEn {...props} />
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const file = path.join(
    process.cwd(),
    "data",
    "pseo",
    "areas",
    "bang-tao-partners.json",
  );
  const payload = JSON.parse(fs.readFileSync(file, "utf8"));
  return { props: { partners: payload.partners } };
};
