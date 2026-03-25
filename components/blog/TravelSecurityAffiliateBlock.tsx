import Link from 'next/link';

const AFFILIATE_REL = 'sponsored nofollow noopener noreferrer';

export default function TravelSecurityAffiliateBlock() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <span className="section-label font-script text-thailand-gold text-sm">Travel security</span>
      <h3 className="text-xl font-bold font-heading mb-2">VPN & Password Manager</h3>
      <p className="text-sm text-gray-600 mb-4">
        Protect your travel logins on the road with a VPN for public Wi-Fi and a password manager for stronger account security.
      </p>
      <div className="space-y-3">
        <a
          href="https://nordvpn.tpo.lv/ekHF1i55"
          target="_blank"
          rel={AFFILIATE_REL}
          className="block bg-thailand-blue text-white text-center px-4 py-2 rounded-xl font-semibold hover:bg-thailand-blue/90 transition-colors text-sm"
        >
          NordVPN
        </a>
        <a
          href="https://nordvpn.tpo.lv/tp12zNjC"
          target="_blank"
          rel={AFFILIATE_REL}
          className="block bg-surface-dark text-white text-center px-4 py-2 rounded-xl font-semibold hover:bg-surface-dark/90 transition-colors text-sm"
        >
          NordPass
        </a>
      </div>
      <Link href="/travel-security/" className="block text-thailand-blue text-center text-sm hover:underline mt-4">
        See the full travel security guide →
      </Link>
      <p className="text-xs text-gray-500 mt-3 text-center">Affiliate links</p>
    </div>
  );
}
