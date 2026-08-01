import fs from "fs";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import path from "path";
import KataNoiAreaGuideEn from "../../../../components/phuket/KataNoiAreaGuideEn";
import KataNoiAreaGuideNl from "../../../../components/phuket/KataNoiAreaGuideNl";

interface PartnerEntry {
  partnerUrl: string;
}

interface Props {
  partners: Record<string, PartnerEntry>;
}

export default function KataNoiPage({ partners }: Props) {
  const { locale } = useRouter();
  const props = {
    hotelHref: partners.trip_kata_noi?.partnerUrl,
    activityHref: partners.klook_kata_noi?.partnerUrl,
  };

  return locale === "nl" ? (
    <KataNoiAreaGuideNl {...props} />
  ) : (
    <KataNoiAreaGuideEn {...props} />
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
  return { props: { partners: data.partners }, revalidate: 604800 };
};
