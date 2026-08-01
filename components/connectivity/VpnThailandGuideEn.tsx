import {
  AppWindow, BadgeCheck, BriefcaseBusiness, Cable, CircleOff, Cloud, EyeOff,
  FileCheck2, Fingerprint, Gauge, KeyRound, Laptop, LockKeyhole, MessageCircle,
  MonitorSmartphone, Network, RadioTower, RefreshCw, Router, ScanLine, ShieldCheck,
  Smartphone, UserRoundCheck, Wifi,
} from 'lucide-react';
import { NORDVPN_GENERIC, SAILY_GENERIC, withSubId } from '../../lib/affiliates';
import { DigitalSafetyGuideTemplate, type DigitalSafetyGuideData } from './DigitalSafetyGuideTemplate';

const HERO = '/images/redesign/vpn-thailand-digital-safety-hero-v2.webp';

export function VpnThailandGuideEn() {
  const vpn = withSubId(NORDVPN_GENERIC, 'en-vpn-thailand-owner-nordvpn');
  const esim = withSubId(SAILY_GENERIC, 'en-vpn-thailand-owner-esim');

  const data: DigitalSafetyGuideData = {
    locale: 'en',
    pageUrl: 'https://go2-thailand.com/travel-guides/vpn-thailand/',
    updatedAt: '2026-07-27',
    title: 'VPN in Thailand: Do You Need One & Is It Allowed?',
    description: 'Decide whether you need a VPN in Thailand for public Wi-Fi, work or geo-access. Understand legal limits, setup, provider checks and what a VPN cannot protect.',
    heroImage: HERO,
    heroAlt: 'Traveller using a laptop and phone in a Bangkok riverside lounge at night',
    breadcrumbs: [{ label: 'Thailand', href: '/' }, { label: 'Travel guides', href: '/travel-guides/' }, { label: 'VPN in Thailand' }],
    heroEyebrow: 'Digital travel safety · Thailand',
    heroTitle: <>Thailand online.<br /><span className="text-saffron-light">Fewer blind spots.</span></>,
    heroSubtitle: 'A VPN protects a connection—not your whole identity.',
    heroDescription: 'Use it deliberately on shared Wi-Fi, for work policy or a chosen network location. Keep lawful behaviour, device updates and account security as separate layers.',
    vpnHref: vpn,
    navItems: [
      { href: '#decision', label: 'Do I need one?', icon: ShieldCheck },
      { href: '#scope', label: 'Limits', icon: EyeOff },
      { href: '#networks', label: 'Networks', icon: Wifi },
      { href: '#law', label: 'Thai law', icon: FileCheck2 },
      { href: '#choose', label: 'Choose', icon: BadgeCheck },
      { href: '#setup', label: 'Set up', icon: RefreshCw },
      { href: '#next', label: 'Current plans', icon: AppWindow },
    ],
    decisions: [
      { eyebrow: 'Shared connection', title: 'Hotel or café Wi-Fi', verdict: 'Often useful', copy: 'Confirm the network with staff, clear the captive portal, then connect the VPN before sensitive browsing or work.', icon: Wifi, tone: 'dark' },
      { eyebrow: 'Your cellular link', title: 'Thai SIM or eSIM data', verdict: 'Optional layer', copy: 'Mobile data removes the shared café network, but a VPN can still serve privacy, work-policy or location needs.', icon: RadioTower, tone: 'light' },
      { eyebrow: 'Employer-controlled', title: 'Remote work access', verdict: 'Follow policy', copy: 'Use the corporate VPN and device controls your organisation requires. A personal VPN is not a substitute for the work tunnel.', icon: BriefcaseBusiness, tone: 'tonal' },
      { eyebrow: 'Different network region', title: 'Home services', verdict: 'May help', copy: 'A chosen server location may change what a service sees, but access, licensing and platform terms still vary and can change.', icon: Cloud, tone: 'light' },
    ],
    protects: [
      { title: 'Traffic inside the tunnel', copy: 'A correctly established VPN encrypts traffic between your device and its VPN endpoint, reducing what the local Wi-Fi operator can inspect in transit.', icon: LockKeyhole },
      { title: 'A different visible network address', copy: 'Websites generally see the VPN exit address rather than the connection address assigned by the hotel, café or mobile provider.', icon: Network },
      { title: 'A policy-controlled route', copy: 'For managed work devices, an approved VPN can route company traffic through organisational security controls.', icon: BriefcaseBusiness },
    ],
    limits: [
      { title: 'The provider still matters', copy: 'Traffic leaves through the VPN operator. Read its ownership, logging, audit and legal-jurisdiction information rather than assuming “VPN” equals trust.', icon: UserRoundCheck },
      { title: 'Accounts can identify you', copy: 'Signing in, browser fingerprints, cookies, payment records and device telemetry can still connect activity to an account or person.', icon: Fingerprint },
      { title: 'Malware and phishing remain', copy: 'A VPN does not replace updates, cautious links, password hygiene, multi-factor authentication or endpoint protection.', icon: CircleOff },
    ],
    contexts: [
      { network: 'Airport or hotel captive portal', firstMove: 'Confirm the network name and complete only the venue login page.', vpnRole: 'Connect immediately after portal access succeeds.', watch: 'A forced VPN can block the portal until the device has authenticated.', icon: Router },
      { network: 'Café or co-working Wi-Fi', firstMove: 'Ask staff for the correct SSID; disable automatic joining and file sharing.', vpnRole: 'Useful for sensitive browsing or any required work session.', watch: 'A shared password does not prove the network or every connected device is trustworthy.', icon: Wifi },
      { network: 'Thai SIM or eSIM data', firstMove: 'Use your own mobile plan when the public network is unclear.', vpnRole: 'Optional for added privacy, location choice or work requirements.', watch: 'Coverage, roaming, hotspot and fair-use terms belong to the SIM/eSIM plan.', icon: Smartphone },
      { network: 'Corporate laptop', firstMove: 'Follow employer travel, Wi-Fi and device policy before connecting.', vpnRole: 'Use the approved corporate tunnel; ask IT about personal-VPN conflicts.', watch: 'Split tunnelling and double VPNs can break access or violate policy.', icon: Laptop },
      { network: 'Streaming or home service', firstMove: 'Check whether the service is available in Thailand and what its terms permit.', vpnRole: 'A home-region endpoint may help, but no provider can guarantee access.', watch: 'Catalogues, detection and licensing change independently of the VPN app.', icon: MonitorSmartphone },
    ],
    selectionCriteria: [
      { title: 'Apps for every device', copy: 'Confirm support for the exact phone, laptop, tablet and operating-system versions you will carry.', proof: 'current app-store listing and provider support page', icon: MonitorSmartphone },
      { title: 'Automatic protection', copy: 'Look for auto-connect on untrusted networks and a kill-switch behaviour you understand and can test.', proof: 'device-specific documentation—not a generic feature badge', icon: ShieldCheck },
      { title: 'Transparent ownership', copy: 'Know which company operates the service, where it is based and how it describes data handling.', proof: 'privacy policy, ownership page and recent independent audit', icon: UserRoundCheck },
      { title: 'Server locations you need', copy: 'Nearby exits can suit normal browsing; a home-country exit matters only for the services that require that location.', proof: 'live in-app server list for your plan', icon: Network },
      { title: 'Useful support and recovery', copy: 'Travel problems happen outside office hours. Check account recovery and real support routes before departure.', proof: 'support channel and recovery flow without buying again', icon: MessageCircle },
      { title: 'Whole-plan cost', copy: 'Compare initial term, renewal, tax, supported devices and refund wording rather than one promotional monthly equivalent.', proof: 'current checkout total and renewal terms', icon: Gauge },
    ],
    setupSteps: [
      { step: '01', title: 'Install at home', copy: 'Download only from the provider or official app store. Add every travel device before departure.', icon: AppWindow },
      { step: '02', title: 'Update everything', copy: 'Update the operating system, browser, VPN app and important account recovery details.', icon: RefreshCw },
      { step: '03', title: 'Test the failure mode', copy: 'Enable auto-connect and the kill switch if suitable, then learn what happens when the tunnel drops.', icon: ShieldCheck },
      { step: '04', title: 'Verify the network', copy: 'Ask for the exact Wi-Fi name. Do not join a lookalike network simply because the signal is stronger.', icon: ScanLine },
      { step: '05', title: 'Clear the portal first', copy: 'Some venue networks require a browser login before the VPN can connect. Authenticate, then establish the tunnel.', icon: Router },
      { step: '06', title: 'Check before sensitive use', copy: 'Confirm the VPN status and intended server before banking, work or account administration.', icon: BadgeCheck },
    ],
    layers: [
      { number: '01', title: 'Connection layer', copy: 'A SIM, eSIM or venue Wi-Fi gets the device online. Choose the network deliberately and keep a mobile-data fallback.', href: '/travel-guides/sim-card-thailand/', icon: RadioTower },
      { number: '02', title: 'Traffic layer', copy: 'The VPN tunnels selected traffic to an endpoint. Configuration, provider trust and connection state determine what is covered.', icon: Cable },
      { number: '03', title: 'Account layer', copy: 'Unique credentials, a password manager, multi-factor authentication and recovery access protect the accounts beyond the tunnel.', href: '/blog/digital-nomad-thailand-2026-dtv-visa-costs-cities/', icon: KeyRound },
    ],
    nextSteps: [
      { title: 'A sponsored VPN option', copy: 'Compare NordVPN against the six editorial checks above, then inspect the current term, renewal, devices and refund conditions.', href: vpn, label: 'Check the current NordVPN plan', icon: ShieldCheck, affiliate: true },
      { title: 'Mobile data instead of shared Wi-Fi', copy: 'A travel eSIM can provide a separate connection layer. Coverage, hotspot, speed policy and device compatibility still vary.', href: esim, label: 'Check the current Saily eSIM offer', icon: Smartphone, affiliate: true },
      { title: 'SIM and eSIM decision guide', copy: 'Compare local SIM, travel eSIM and roaming by arrival setup, coverage, number needs and current total.', href: '/travel-guides/sim-card-thailand/', label: 'Open the Thailand SIM guide', icon: RadioTower },
    ],
    faqs: [
      { question: 'Is a VPN legal in Thailand?', answer: 'The official Thai computer-law sources reviewed for this guide do not present ordinary VPN software as a prohibited product. However, a VPN does not legalise the underlying activity or content, and laws, court interpretations and platform rules can change. Treat this as practical travel guidance rather than legal advice and check official sources for a sensitive use case.' },
      { question: 'Should you use a VPN in Thailand?', answer: 'It is often useful on shared hotel, café, airport or co-working Wi-Fi, and when an employer requires a secure tunnel. On your own mobile-data connection it is an optional additional layer unless you need it for work, privacy or a chosen server location.' },
      { question: 'Does Thailand block VPNs?', answer: 'We found no reliable basis for saying Thailand universally blocks VPN traffic. A specific provider site, protocol, network or service can still fail or change. Install and test before departure, keep the app updated and maintain a mobile-data fallback.' },
      { question: 'Does NordVPN work in Thailand?', answer: 'NordVPN markets apps and server access for travellers, but performance and reachability depend on the current app, device, local network, server and service being accessed. Check the live provider status and test the connection; the sponsored link on this page is not a guarantee.' },
      { question: 'Can hotel Wi-Fi see what you search with a VPN?', answer: 'When the VPN is correctly connected, the local network can generally see that your device is communicating with a VPN endpoint and how much data moves, but not the contents inside that tunnel. The VPN operator, destination service, browser and signed-in accounts still hold other parts of the picture.' },
      { question: 'Are you safe without a VPN?', answer: 'No single tool makes a connection “safe” or “unsafe”. Updated devices, HTTPS, correct network selection, multi-factor authentication and careful account use all matter. A VPN adds useful protection against local-network visibility, especially on shared Wi-Fi.' },
      { question: 'Can I use WhatsApp in Thailand without a VPN?', answer: 'WhatsApp is generally available in Thailand, so ordinary messaging does not normally require a VPN. Availability and network behaviour can change; if a connection fails, first check mobile data, Wi-Fi and the service status before assuming censorship.' },
      { question: 'Will my phone work on Wi-Fi in Thailand?', answer: 'A compatible phone can join hotel, café, airport and other Wi-Fi networks, sometimes through a captive portal. Confirm the correct network name, keep automatic joining off and use mobile data when the venue network is unclear.' },
      { question: 'Should I use a free VPN in Thailand?', answer: 'Free does not automatically mean unsafe, but the business model, data limits, logging, ownership, app permissions and support deserve scrutiny. A reputable limited free tier can be different from an unknown “unlimited” app. Do not choose solely by price or app-store stars.' },
      { question: 'When should you not use a personal VPN?', answer: 'Do not use one when it conflicts with employer policy, breaks a captive portal or required local service, violates a platform term, or creates a false sense of anonymity. For work, follow the organisation’s approved corporate setup.' },
    ],
    related: [
      { title: 'Thailand SIM card guide', description: 'Choose local SIM, travel eSIM or roaming as the actual connection layer.', href: '/travel-guides/sim-card-thailand/', image: '/images/redesign/thailand-esim-provider-hero.webp', imageAlt: 'Traveller setting up a phone connection in Thailand' },
      { title: 'Thailand eSIM comparison', description: 'Compare setup, coverage questions and current travel-eSIM offers.', href: '/esim/', image: '/images/redesign/esim-thailand-hero.webp', imageAlt: 'Phone used for travel connectivity in Thailand' },
      { title: 'Digital nomad guide', description: 'Plan work setup, locations and the practical boundaries of remote work.', href: '/blog/digital-nomad-thailand-2026-dtv-visa-costs-cities/', image: '/images/blog/digital-nomad-thailand-2026-dtv-visa-costs-cities.webp', imageAlt: 'Laptop workspace for remote travel in Thailand' },
    ],
    sources: [
      { title: 'Computer-related laws', creator: 'Thailand Ministry of Digital Economy and Society', url: 'https://mdes.go.th/law/24', note: 'Primary Thai ministry index for the Computer-Related Crime Act and related digital laws.' },
      { title: 'Computer-Related Crime Act (No. 2) — unofficial translation', creator: 'Thailand Ministry of Digital Economy and Society', url: 'https://www.mdes.go.th/law/detail/3618-', note: 'Official ministry-hosted English translation used to define the legal boundary without claiming immunity.' },
      { title: 'Virtual Private Networks guidance', creator: 'UK National Cyber Security Centre', url: 'https://www.ncsc.gov.uk/collection/device-security-guidance/infrastructure/virtual-private-networks', note: 'Primary cybersecurity guidance for VPN routing, forced connections and captive portals.' },
      { title: 'Thailand safety and security', creator: 'UK Foreign, Commonwealth & Development Office', url: 'https://www.gov.uk/foreign-travel-advice/thailand/safety-and-security', note: 'Current official travel-law context for UK readers; checked 27 July 2026.' },
    ],
    methodDescription: 'Updated 27 July 2026 after four DataForSEO keyword clusters with 97 records and 41 competitor domains, eleven validated live UK-English SERPs with 93 organic results and 59 genuine PAA questions, three full competitor parses, exact owner ranking and backlink checks, and primary MDES, NCSC and FCDO verification. GA4 had repeatedly identified this owner as a low-engagement route. The rebuild removes broken encoding, absolute legality claims, fixed prices, fixed latency and speed, guaranteed service access, absolute Wi-Fi risk labels, unsupported app availability lists and the claim that a VPN makes a user anonymous. `/travel-guides/sim-card-thailand/` and `/esim/` retain connection-product intent; this URL owns the VPN decision. Amazon was assessed but not forced because a physical product does not solve the task.'
  };

  return <DigitalSafetyGuideTemplate data={data} />;
}
