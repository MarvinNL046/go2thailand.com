import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Facebook, Instagram, Mail, MapPinned, ShieldCheck, Sparkles } from "lucide-react";
import SEOHead from "../SEOHead";
import { EditorialHero } from "../design/EditorialHero";
import { PageSectionNav } from "../design/PageSectionNav";
import { SectionHeading } from "../design/SectionHeading";

const editorialDoors = [
  { title: "Bestemmingen kiezen", copy: "Van Bangkok en Chiang Mai tot kust en eilanden: begin bij de sfeer die bij je route past.", href: "/city/", image: "/images/redesign/bangkok-destination-hero.webp" },
  { title: "Thais eten begrijpen", copy: "Gebruik gerechten, regio's en bestelcontext om verder te kijken dan één virale foodvideo.", href: "/food/", image: "/images/redesign/thailand-food-hub-hero.webp" },
  { title: "Activiteiten afwegen", copy: "Vergelijk wat je echt doet, welke voorwaarden gelden en wanneer een alternatief beter past.", href: "/things-to-do-in-thailand/", image: "/images/redesign/experience-snorkelling.webp" },
];

export default function NlSocialHub() {
  const pageUrl = "https://go2-thailand.com/nl/social/";
  const schemas = [
    { "@context": "https://schema.org", "@type": "CollectionPage", name: "GO2 Thailand op social media", description: "Officiële GO2 Thailand-kanalen en redactionele startpunten voor Nederlandse Thailand-reizigers.", url: pageUrl, inLanguage: "nl-NL" },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Thailand", item: "https://go2-thailand.com/nl/" }, { "@type": "ListItem", position: 2, name: "Social media", item: pageUrl }] },
  ];

  return <>
    <SEOHead title="GO2 Thailand op social media en in je inbox" description="Volg de officiële GO2 Thailand-kanalen voor reisideeën en ga vanuit iedere post door naar controleerbare gidsen over bestemmingen, eten en activiteiten." ogImage="https://go2-thailand.com/images/redesign/thailand-food-shared-table.webp">
      {schemas.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
    </SEOHead>
    <div data-premium-template="nl-social-hub" className="overflow-hidden bg-canvas text-charcoal">
      <EditorialHero
        image="/images/redesign/thailand-food-shared-table.webp"
        imageAlt="Reizigers delen Thailand-inspiratie aan een tafel met lokale gerechten"
        breadcrumbs={[{ label: "Thailand", href: "/" }, { label: "Social media" }]}
        eyebrow="Inspiratie is het begin"
        title={<>Volg het verhaal.<br /><span className="text-saffron-light">Controleer de reis.</span></>}
        description="Onze sociale kanalen laten ideeën zien. De website bewaart de route, bron, nuance en praktische grens die je vóór een besluit nodig hebt."
        actions={[{ label: "Bekijk de kanalen", href: "#kanalen", kind: "primary" }, { label: "Open de reisgidsen", href: "#gidsen", kind: "secondary" }]}
        contentTone="light"
        gradientClassName="bg-[linear-gradient(90deg,rgba(3,29,29,0.97)_0%,rgba(3,29,29,0.89)_45%,rgba(3,29,29,0.2)_74%,rgba(3,29,29,0.02)_100%)]"
        titleClassName="max-w-[790px] text-[3.9rem] leading-[.86] !text-white sm:text-[5rem] lg:text-[5.6rem]"
        descriptionClassName="mt-5 max-w-[620px] text-sm leading-7 !text-white/76"
      />
      <PageSectionNav items={[{ href: "#kanalen", label: "Kanalen", icon: Sparkles }, { href: "#gidsen", label: "Gidsen", icon: MapPinned }, { href: "#werkwijze", label: "Werkwijze", icon: ShieldCheck }]} />

      <section id="kanalen" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
        <div className="container-custom">
          <SectionHeading eyebrow="Officiële uitgangen" title="Drie manieren om bij te blijven" description="Geen nagebouwde live feed, verzonnen likes of automatische beschikbaarheidsclaim: alleen duidelijke kanalen en een weg terug naar controleerbare informatie." />
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {[
              { title: "Facebook", copy: "Reisideeën, nieuwe gidsen en gesprekken rond Thailand-planning.", href: "https://facebook.com/go2thailand", icon: Facebook, label: "Open Facebook" },
              { title: "Instagram", copy: "Visuele inspiratie die je via de site verder kunt onderzoeken.", href: "https://instagram.com/go2thailand", icon: Instagram, label: "Open Instagram" },
              { title: "Thailand in je inbox", copy: "Nieuwe gidsen en praktische inspiratie zonder afhankelijk te zijn van een social algoritme.", href: "/#newsletter", icon: Mail, label: "Ga naar nieuwsbrief" },
            ].map(({ title, copy, href, icon: Icon, label }) => {
              const external = href.startsWith("http");
              const body = <><span className="grid h-12 w-12 place-items-center rounded-xl bg-jade text-saffron"><Icon size={22} /></span><h2 className="mt-8 font-display text-[2rem] font-semibold text-jade">{title}</h2><p className="mt-4 flex-1 text-sm font-medium leading-7 text-charcoal/64">{copy}</p><span className="mt-7 inline-flex items-center gap-2 text-xs font-extrabold text-jade">{label} <ArrowRight size={14} className="text-saffron" /></span></>;
              const classes = "flex min-h-[310px] flex-col rounded-2xl border border-jade/10 bg-white p-7 shadow-editorial-card transition hover:-translate-y-1";
              return external ? <a key={title} href={href} target="_blank" rel="noopener noreferrer" className={classes}>{body}</a> : <Link key={title} href={href} className={classes}>{body}</Link>;
            })}
          </div>
        </div>
      </section>

      <section id="gidsen" className="section-divider-bottom scroll-mt-24 bg-tonal py-14 lg:py-20">
        <div className="container-custom">
          <SectionHeading eyebrow="Van beeld naar besluit" title="Open de gids achter het idee" description="Een foto vertelt niet hoe druk, ver, nat, duur of passend een keuze op jouw datum is. Deze owners helpen dat uitzoeken." />
          <div className="mt-9 grid gap-5 lg:grid-cols-3">
            {editorialDoors.map((item) => <Link key={item.href} href={item.href} className="group overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-editorial-card"><div className="relative h-56"><Image src={item.image} alt="" fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" /></div><div className="p-6"><h2 className="font-display text-[1.7rem] font-semibold text-jade">{item.title}</h2><p className="mt-3 text-xs font-medium leading-6 text-charcoal/62">{item.copy}</p><span className="mt-5 inline-flex items-center gap-2 text-[10px] font-extrabold text-saffron-dark">Open de owner <ArrowRight size={13} /></span></div></Link>)}
          </div>
        </div>
      </section>

      <section id="werkwijze" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
        <div className="container-custom grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-center">
          <div><p className="eyebrow">Onze sociale grens</p><h2 className="font-display text-[3.2rem] font-semibold leading-[.9] text-jade">Geen engagement als bewijs</h2><p className="mt-5 text-sm font-medium leading-7 text-charcoal/65">Likes, shares en korte captions bewijzen geen kwaliteit, veiligheid of actuele beschikbaarheid. Daarom tonen we hier geen voorbeeldfeed of fictieve cijfers.</p></div>
          <div className="grid gap-4 sm:grid-cols-2">{["Controleer actuele details bij de primaire bron.","Lees de volledige route- en veiligheidscontext.","Herken affiliatelinks aan de zichtbare toelichting.","Deel geen locatie van kwetsbare natuur zonder noodzaak."].map((copy, index)=><article key={copy} className="rounded-2xl border border-jade/10 bg-white p-6 shadow-editorial-card"><span className="text-[10px] font-extrabold tracking-[.15em] text-saffron-dark">PRINCIPE 0{index+1}</span><p className="mt-5 text-sm font-semibold leading-7 text-jade">{copy}</p></article>)}</div>
        </div>
      </section>
    </div>
  </>;
}
