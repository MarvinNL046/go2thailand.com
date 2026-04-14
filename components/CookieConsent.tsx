import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';
import { Button } from './ui/button';
import { useT } from '../lib/i18n';
import { strings as i18nStrings } from '../lib/i18n/components-cookieconsent';

const CookieConsent = () => {
  const t = useT(i18nStrings);
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show banner after a short delay
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', 'all');
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setShowBanner(false);
    
    // Enable Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted'
      });
    }
  };

  const acceptNecessary = () => {
    localStorage.setItem('cookie-consent', 'necessary');
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setShowBanner(false);
    
    // Deny optional cookies for Google
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied'
      });
    }
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 animate-slide-up">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Cookie className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                We use cookies
              </h3>
              <p className="text-sm text-gray-600">
                We use cookies to enhance your browsing experience and analyze site traffic. 
                {!showDetails && (
                  <button
                    onClick={() => setShowDetails(true)}
                    className="text-blue-600 hover:underline ml-1"
                  >
                    Learn more
                  </button>
                )}
              </p>
              
              {showDetails && (
                <div className="mt-3 text-sm text-gray-600 space-y-2">
                  <p>
                    <strong>{t("s001_necessary_cookies")}</strong> {t("s002_required_for_the_website")}
                  </p>
                  <p>
                    <strong>{t("s003_analytics_cookies")}</strong> {t("s004_help_us_understand_how")}
                  </p>
                  <p>
                    <strong>{t("s005_marketing_cookies")}</strong> {t("s006_used_to_show_relevant")}
                  </p>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="text-blue-600 hover:underline"
                  >
                    Show less
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={acceptNecessary}
              className="w-full sm:w-auto"
            >
              Necessary only
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={acceptAll}
              className="w-full sm:w-auto"
            >
              Accept all
            </Button>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CookieConsent;