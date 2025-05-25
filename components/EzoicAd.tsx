import React, { useEffect, useRef } from 'react';

export interface EzoicAdProps {
  /** Unique ad unit identifier */
  adUnit: string;
  /** Ad size/type */
  size?: 'banner' | 'rectangle' | 'skyscraper' | 'mobile-banner' | 'responsive';
  /** Custom className for styling */
  className?: string;
  /** Enable lazy loading */
  lazy?: boolean;
  /** Show placeholder in development */
  showInDev?: boolean;
}

const EzoicAd: React.FC<EzoicAdProps> = ({ 
  adUnit, 
  size = 'rectangle', 
  className = '', 
  lazy = true,
  showInDev = true 
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const isProduction = process.env.NODE_ENV === 'production';

  // Ad size configurations
  const adSizes = {
    banner: { width: 728, height: 90, mobileFallback: { width: 320, height: 50 } },
    rectangle: { width: 300, height: 250 },
    skyscraper: { width: 300, height: 600 },
    'mobile-banner': { width: 320, height: 100 },
    responsive: { width: '100%', height: 'auto' }
  };

  const adConfig = adSizes[size];

  useEffect(() => {
    // Only load Ezoic ads in production
    if (!isProduction) return;

    const loadEzoicAd = () => {
      if (typeof window !== 'undefined' && window.ezstandalone) {
        // Ezoic ad loading logic
        window.ezstandalone.define(adUnit);
        window.ezstandalone.display(adUnit);
      }
    };

    if (lazy) {
      // Intersection Observer for lazy loading
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              loadEzoicAd();
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      if (adRef.current) {
        observer.observe(adRef.current);
      }

      return () => observer.disconnect();
    } else {
      loadEzoicAd();
    }
  }, [adUnit, lazy, isProduction]);

  // Development placeholder
  if (!isProduction && showInDev) {
    return (
      <div 
        ref={adRef}
        className={`bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500 font-medium ${className}`}
        style={{ 
          width: adConfig.width, 
          height: adConfig.height,
          minHeight: typeof adConfig.height === 'number' ? `${adConfig.height}px` : '250px'
        }}
      >
        <div className="text-center">
          <div className="text-sm font-bold">Ezoic Ad</div>
          <div className="text-xs">{adUnit}</div>
          <div className="text-xs">{size} ({adConfig.width}x{adConfig.height})</div>
        </div>
      </div>
    );
  }

  if (!isProduction && !showInDev) {
    return null;
  }

  // Production ad container
  return (
    <div 
      ref={adRef}
      className={`ezoic-ad ${className}`}
      id={adUnit}
      data-ad-unit={adUnit}
      data-ad-size={size}
      style={{ 
        width: adConfig.width, 
        height: adConfig.height,
        minHeight: typeof adConfig.height === 'number' ? `${adConfig.height}px` : '250px'
      }}
    >
      {/* Ezoic will inject ad content here */}
    </div>
  );
};

export default EzoicAd;

// Global type declaration for Ezoic
declare global {
  interface Window {
    ezstandalone?: {
      define: (adUnit: string) => void;
      display: (adUnit: string) => void;
      refresh: (adUnit: string) => void;
    };
  }
}
