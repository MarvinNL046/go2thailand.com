import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useTranslatedContent } from '../hooks/useTranslatedContent';

export default function TestTranslation() {
  const router = useRouter();
  const { locale = 'en' } = router;
  
  // Load Bangkok translation as test
  const { content: bangkokContent, loading } = useTranslatedContent('city', 'bangkok');
  
  // Load raw translation file for debugging
  const [rawTranslations, setRawTranslations] = React.useState<any>(null);
  
  React.useEffect(() => {
    // Load city-basics.json directly
    import('../translations/cities/city-basics.json')
      .then(module => setRawTranslations(module.default || module))
      .catch(err => console.error('Failed to load translations:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Translation Test Page</h1>
            <LanguageSwitcher />
          </div>
          
          <div className="mb-6">
            <p className="text-gray-600 mb-2">Current locale: <span className="font-semibold">{locale}</span></p>
            <p className="text-gray-600">Available locales: en, zh, de, fr, ru, ja, ko</p>
          </div>

          <div className="grid gap-6">
            {/* Test Links */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold mb-4">Test Different Languages:</h2>
              <div className="flex flex-wrap gap-2">
                <Link href="/test-translation" locale="en" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  English
                </Link>
                <Link href="/test-translation" locale="zh" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  中文
                </Link>
                <Link href="/test-translation" locale="de" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Deutsch
                </Link>
                <Link href="/test-translation" locale="fr" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Français
                </Link>
              </div>
            </div>

            {/* Bangkok Content Test */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold mb-4">Bangkok Content (from hook):</h2>
              {loading ? (
                <p>Loading...</p>
              ) : bangkokContent ? (
                <div className="space-y-2">
                  <p><strong>Name:</strong> {bangkokContent.name || 'Not found'}</p>
                  <p><strong>Description:</strong> {bangkokContent.description || 'Not found'}</p>
                  <div>
                    <strong>Highlights:</strong>
                    <ul className="list-disc list-inside mt-1">
                      {(bangkokContent.highlights || []).map((highlight: string, idx: number) => (
                        <li key={idx}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <p className="text-red-500">No content loaded</p>
              )}
            </div>

            {/* Raw Translations */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Raw Translations (city-basics.json):</h2>
              {rawTranslations ? (
                <div className="space-y-4">
                  {Object.entries(rawTranslations).map(([citySlug, cityData]: [string, any]) => (
                    <div key={citySlug} className="bg-gray-50 p-4 rounded">
                      <h3 className="font-semibold mb-2">{citySlug}</h3>
                      <div className="text-sm space-y-1">
                        <p><strong>EN:</strong> {cityData.description?.en}</p>
                        <p><strong>ZH:</strong> {cityData.description?.zh}</p>
                        <p><strong>DE:</strong> {cityData.description?.de}</p>
                        <p><strong>FR:</strong> {cityData.description?.fr}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Loading raw translations...</p>
              )}
            </div>
          </div>

          {/* City Page Links */}
          <div className="mt-8 pt-6 border-t">
            <h2 className="text-xl font-semibold mb-4">Test City Pages:</h2>
            <div className="flex flex-wrap gap-2">
              <Link href="/city/bangkok" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Bangkok ({locale})
              </Link>
              <Link href="/zh/city/bangkok" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Bangkok (ZH)
              </Link>
              <Link href="/de/city/bangkok" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Bangkok (DE)
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}