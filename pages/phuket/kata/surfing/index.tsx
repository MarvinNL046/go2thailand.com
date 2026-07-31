import fs from "fs";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import path from "path";
import { KataSurfingGuideEn } from "../../../../components/phuket/KataSurfingGuideEn";
import { KataSurfingGuideNl } from "../../../../components/phuket/KataSurfingGuideNl";
import { withSubId } from "../../../../lib/affiliates";

interface PartnerEntry {
  partnerUrl: string;
}

interface Props {
  partners: Record<string, PartnerEntry>;
}

export default function KataSurfingPage({ partners }: Props) {
  const { locale } = useRouter();
  const marker =
    locale === "nl" ? "kata-surfing-owner-nl" : "kata-surfing-owner-en";
  const props = {
    lessonHref: withSubId(partners.klook_surfing.partnerUrl, `${marker}-klook`),
    alternativeLessonHref: withSubId(
      partners.gyg_surfing.partnerUrl,
      `${marker}-gyg`,
    ),
    hotelHref: withSubId(partners.trip_hotels.partnerUrl, `${marker}-hotels`),
  };

  return locale === "nl" ? (
    <KataSurfingGuideNl {...props} />
  ) : (
    <KataSurfingGuideEn {...props} />
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
