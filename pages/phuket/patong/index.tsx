import fs from "fs";
import path from "path";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import PatongAreaGuideEn from "../../../components/phuket/PatongAreaGuideEn";
import PatongAreaGuideNl from "../../../components/phuket/PatongAreaGuideNl";

interface PartnerEntry { partnerUrl: string }
interface Partners { [key: string]: PartnerEntry }
interface Props { partners: Partners }

export default function PatongPillarPage({ partners }: Props) {
  const { locale } = useRouter();
  const hotelHref = partners.trip_patong_pillar?.partnerUrl;
  return locale === "nl" ? <PatongAreaGuideNl hotelHref={hotelHref} /> : <PatongAreaGuideEn hotelHref={hotelHref} />;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const file = path.join(process.cwd(), "data", "pseo", "areas", "patong-partners.json");
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  return { props: { partners: data.partners }, revalidate: 604800 };
};
