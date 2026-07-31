import fs from "fs";
import path from "path";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import PatongNightlifeEn from "../../../../components/phuket/PatongNightlifeEn";
import PatongNightlifeNl from "../../../../components/phuket/PatongNightlifeNl";

interface PartnerEntry { partnerUrl: string }
interface Props { partners: Record<string, PartnerEntry> }

export default function PatongNightlifePage({ partners }: Props) {
  const { locale } = useRouter();
  const stayHref = partners.trip_patong_nightlife?.partnerUrl;
  return locale === "nl" ? <PatongNightlifeNl stayHref={stayHref} /> : <PatongNightlifeEn stayHref={stayHref} />;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const file = path.join(process.cwd(), "data", "pseo", "areas", "patong-partners.json");
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  return { props: { partners: data.partners }, revalidate: 604800 };
};
