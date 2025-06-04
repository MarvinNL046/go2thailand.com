import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type TranslationFile = 'common' | 'cities' | 'food' | 'attractions';

export function useTranslation(file: TranslationFile = 'common') {
  const router = useRouter();
  const { locale = 'en' } = router;
  const [translations, setTranslations] = useState<any>({});

  useEffect(() => {
    async function loadTranslations() {
      try {
        const translationModule = await import(`../translations/${locale}/${file}.json`);
        setTranslations(translationModule.default || translationModule);
      } catch (error) {
        // Fallback to English if translation doesn't exist
        try {
          const fallbackModule = await import(`../translations/en/${file}.json`);
          setTranslations(fallbackModule.default || fallbackModule);
        } catch (fallbackError) {
          console.error(`Translation file not found: ${file}`, fallbackError);
          setTranslations({});
        }
      }
    }

    loadTranslations();
  }, [locale, file]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations;

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }

    return value || key;
  };

  return { t, locale };
}