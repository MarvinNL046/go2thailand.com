import Link from 'next/link';
import { useRouter } from 'next/router';
import { withSubId } from '../../lib/affiliates';
import { useSubId } from '../../lib/useSubId';

const AFFILIATE_REL = 'sponsored nofollow noopener noreferrer';

export default function TravelSecurityAffiliateBlock() {
  const subId = useSubId();
  const { locale } = useRouter();
  const isNl = locale === 'nl';

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <span className="section-label font-script text-thailand-gold text-sm">{isNl ? 'Reis veiligheid' : 'Travel security'}</span>
      <h3 className="text-xl font-bold font-heading mb-2">{isNl ? 'VPN & Wachtwoordbeheerder' : 'VPN & Password Manager'}</h3>
      <p className="text-sm text-gray-600 mb-4">
        {isNl
          ? 'Bescherm je reisgegevens onderweg met een VPN voor openbare Wi-Fi en een wachtwoordbeheerder voor sterkere accountbeveiliging.'
          : 'Protect your travel logins on the road with a VPN for public Wi-Fi and a password manager for stronger account security.'}
      </p>
      <div className="space-y-3">
        <a
          href={withSubId('https://nordvpn.tpo.lv/ekHF1i55', subId)}
          target="_blank"
          rel={AFFILIATE_REL}
          className="block bg-thailand-blue text-white text-center px-4 py-2 rounded-xl font-semibold hover:bg-thailand-blue/90 transition-colors text-sm"
        >
          NordVPN
        </a>
        <a
          href={withSubId('https://nordvpn.tpo.lv/tp12zNjC', subId)}
          target="_blank"
          rel={AFFILIATE_REL}
          className="block bg-surface-dark text-white text-center px-4 py-2 rounded-xl font-semibold hover:bg-surface-dark/90 transition-colors text-sm"
        >
          NordPass
        </a>
      </div>
      <Link href="/travel-security/" className="block text-thailand-blue text-center text-sm hover:underline mt-4">
        {isNl ? 'Bekijk de volledige reisveiligheidsgids →' : 'See the full travel security guide →'}
      </Link>
      <p className="text-xs text-gray-500 mt-3 text-center">{isNl ? 'Affiliate links' : 'Affiliate links'}</p>
    </div>
  );
}
