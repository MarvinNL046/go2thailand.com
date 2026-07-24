import { useRouter } from 'next/router';

export default function AnnouncementBar() {
  const { locale } = useRouter();
  return (
    <div className="bg-jade px-4 py-2 text-center text-[11px] font-semibold tracking-wide text-white sm:text-xs">
      <span className="mr-2 text-saffron-light">✧</span>
      {locale === 'nl' ? 'Jouw Thailand avontuur begint hier' : 'Your Thailand adventure starts here'}
    </div>
  );
}
