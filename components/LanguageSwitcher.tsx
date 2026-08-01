import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'nl', name: 'Nederlands' },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const { locale, pathname, asPath } = router;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentLanguage = languages.find(language => language.code === locale) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function switchLanguage(languageCode: string) {
    void router.push(pathname, asPath, { locale: languageCode });
    setIsOpen(false);
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(value => !value)}
        aria-label={`Taal: ${currentLanguage.name}`}
        aria-expanded={isOpen}
        className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-bold uppercase tracking-[0.08em] text-jade transition hover:bg-white/55 hover:text-saffron-dark"
      >
        <span>{currentLanguage.code}</span>
        <svg aria-hidden="true" className={`h-3.5 w-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-44 rounded-xl border border-jade/10 bg-white shadow-xl">
          <div className="py-2">
            {languages.map(language => (
              <button
                key={language.code}
                type="button"
                onClick={() => switchLanguage(language.code)}
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-ivory ${language.code === locale ? 'bg-ivory/70 text-saffron-dark' : 'text-jade'}`}
              >
                <span className="w-6 text-xs font-bold uppercase tracking-wider">{language.code}</span>
                <span className="text-sm font-semibold">{language.name}</span>
                {language.code === locale && (
                  <svg aria-hidden="true" className="ml-auto h-4 w-4 text-saffron" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
