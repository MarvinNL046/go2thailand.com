import fs from "fs";
import path from "path";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import OldTownThingsToDoEn from "../../../../components/phuket/OldTownThingsToDoEn";
import OldTownThingsToDoNl from "../../../../components/phuket/OldTownThingsToDoNl";

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

export default function PhuketOldTownThingsToDoPage({ partners }: Props) {
  const { locale } = useRouter();
  const activityHref = partners.klook_things?.partnerUrl;
  return locale === "nl" ? (
    <OldTownThingsToDoNl activityHref={activityHref} />
  ) : (
    <OldTownThingsToDoEn activityHref={activityHref} />
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
