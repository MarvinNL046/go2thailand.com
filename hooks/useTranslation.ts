import { useRouter } from 'next/router';

// Import translations synchronously so SSR renders the correct locale
import commonEn from '../translations/en/common.json';
import commonNl from '../translations/nl/common.json';

const allTranslations: Record<string, Record<string, any>> = {
  en: { common: commonEn },
  nl: { common: commonNl },
};

type TranslationFile = 'common' | 'cities' | 'food' | 'attractions';

export function useTranslation(file: TranslationFile = 'common') {
  const router = useRouter();
  const { locale = 'en' } = router;

  const translations = allTranslations[locale]?.[file] || allTranslations['en']?.[file] || {};

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