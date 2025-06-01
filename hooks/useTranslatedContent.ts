import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from './useTranslation';

interface TranslatedContent {
  [key: string]: any;
}

export function useTranslatedContent(contentType: string, slug?: string) {
  const router = useRouter();
  const { locale = 'en' } = router;
  const [content, setContent] = useState<TranslatedContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadContent() {
      setLoading(true);
      setError(null);
      
      try {
        // For English, load from the regular data files
        if (locale === 'en') {
          let data;
          switch (contentType) {
            case 'city':
              data = await import(`../data/enhanced/${slug}.json`);
              break;
            case 'food':
              data = await import(`../data/enhanced/food/${slug}.json`);
              break;
            case 'attraction':
              const [city, attractionSlug] = slug?.split('/') || [];
              data = await import(`../data/enhanced/attractions/${city}/${attractionSlug}.json`);
              break;
            default:
              throw new Error(`Unknown content type: ${contentType}`);
          }
          const rawData = data.default || data;
          // Process the data to extract English strings from objects
          const processedData = mergeTranslations(rawData, null, 'en');
          setContent(processedData);
        } else {
          // For other languages, try to load translations
          let translationData;
          try {
            switch (contentType) {
              case 'city':
                // First try individual city translation
                try {
                  translationData = await import(`../translations/cities/${slug}.json`);
                } catch {
                  // Fallback to city-basics if individual translation doesn't exist
                  const cityBasics = await import(`../translations/cities/city-basics.json`);
                  translationData = cityBasics.default?.[slug] || cityBasics[slug];
                }
                break;
              case 'food':
                // Try individual food translation or food-names
                try {
                  translationData = await import(`../translations/food/${slug}.json`);
                } catch {
                  const foodNames = await import(`../translations/food/food-names.json`);
                  translationData = foodNames.default?.[slug] || foodNames[slug];
                }
                break;
              default:
                throw new Error(`Translations not available for ${contentType}`);
            }
          } catch (err) {
            // If no translation exists, fall back to English
            console.warn(`No ${locale} translation for ${contentType}/${slug}, using English`);
            const englishData = await loadEnglishContent(contentType, slug);
            setContent(englishData);
            return;
          }

          // Merge translation with English base data
          const englishData = await loadEnglishContent(contentType, slug);
          const mergedContent = mergeTranslations(englishData, translationData, locale);
          setContent(mergedContent);
        }
      } catch (err) {
        console.error('Error loading content:', err);
        setError(err instanceof Error ? err.message : 'Failed to load content');
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      loadContent();
    }
  }, [contentType, slug, locale]);

  return { content, loading, error, locale };
}

// Helper to load English content
async function loadEnglishContent(contentType: string, slug?: string) {
  switch (contentType) {
    case 'city':
      const cityData = await import(`../data/enhanced/${slug}.json`);
      return cityData.default || cityData;
    case 'food':
      const foodData = await import(`../data/enhanced/food/${slug}.json`);
      return foodData.default || foodData;
    case 'attraction':
      const [city, attractionSlug] = slug?.split('/') || [];
      const attractionData = await import(`../data/enhanced/attractions/${city}/${attractionSlug}.json`);
      return attractionData.default || attractionData;
    default:
      throw new Error(`Unknown content type: ${contentType}`);
  }
}

// Helper to merge translations with base content
function mergeTranslations(baseContent: any, translations: any, locale: string): any {
  const merged = { ...baseContent };
  
  // For English, we need to extract the English strings from objects
  if (locale === 'en') {
    // Handle name
    if (merged.name && typeof merged.name === 'object' && merged.name.en) {
      merged.name = merged.name.en;
    }
    
    // Handle description
    if (merged.description && typeof merged.description === 'object' && merged.description.en) {
      merged.description = merged.description.en;
    }
    
    // Handle categories
    if (merged.categories) {
      Object.keys(merged.categories).forEach(key => {
        if (merged.categories[key] && typeof merged.categories[key] === 'object' && merged.categories[key].en) {
          merged.categories[key] = merged.categories[key].en;
        }
      });
    }
    
    return merged;
  }
  
  // Handle different translation structures for other languages
  if (translations) {
    // Direct field translations (name, description, etc.)
    Object.keys(translations).forEach(key => {
      if (translations[key] && translations[key][locale] !== undefined) {
        merged[key] = translations[key][locale];
      }
    });
    
    // Handle nested structures
    if (merged.name && typeof merged.name === 'object' && translations.name?.[locale]) {
      merged.name = translations.name[locale];
    }
    
    if (merged.description && typeof merged.description === 'object' && translations.description?.[locale]) {
      merged.description = translations.description[locale];
    }
  }
  
  return merged;
}

// Hook for getting translated text from common translations
export function useTranslatedText(key: string, fallback: string = '') {
  const { t } = useTranslation('common');
  const [text, setText] = useState(fallback);
  
  useEffect(() => {
    const translated = t(key);
    setText(translated !== key ? translated : fallback);
  }, [key, fallback, t]);
  
  return text;
}