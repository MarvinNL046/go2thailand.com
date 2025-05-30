import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

export interface EzoicAdProps {
  /** Unique ad placement ID (e.g., 101, 102, etc.) */
  placementId: number;
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
  placementId, 
  size = 'rectangle', 
  className = '', 
  lazy = true,
  showInDev = true 
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isAdLoaded, setIsAdLoaded] = useState(false);
  const isProduction = process.env.NODE_ENV === 'production';
  const router = useRouter();

  // Ad size configurations
  type AdSize = {
    width: number | string;
    height: number | string;
    mobileFallback?: { width: number; height: number; };
  };
  
  const adSizes: Record<string, AdSize> = {
    banner: { width: 728, height: 90, mobileFallback: { width: 320, height: 50 } },
    rectangle: { width: 300, height: 250 },
    skyscraper: { width: 300, height: 600 },
    'mobile-banner': { width: 320, height: 100 },
    responsive: { width: '100%', height: 'auto' }
  };

  const adConfig = adSizes[size];

  // Handle client-side only logic to prevent hydration errors
  useEffect(() => {
    setIsMounted(true);
    
    // Check if mobile on client side
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Cleanup function to destroy placeholder on unmount
  useEffect(() => {
    return () => {
      if (isAdLoaded && typeof window !== 'undefined' && window.ezstandalone && window.ezstandalone.destroyPlaceholders) {
        window.ezstandalone.cmd?.push(function() {
          window.ezstandalone.destroyPlaceholders(placementId);
        });
      }
    };
  }, [isAdLoaded, placementId]);

  // Handle router changes to refresh ads
  useEffect(() => {
    const handleRouteChange = () => {
      if (isAdLoaded && typeof window !== 'undefined' && window.ezstandalone) {
        window.ezstandalone.cmd?.push(function() {
          window.ezstandalone.showAds();
        });
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, isAdLoaded]);

  useEffect(() => {
    // Only load Ezoic ads in production
    if (!isProduction) return;

    const loadEzoicAd = () => {
      if (typeof window !== 'undefined' && window.ezstandalone && window.ezstandalone.cmd) {
        // Use the new showAds method
        window.ezstandalone.cmd.push(function() {
          window.ezstandalone.showAds(placementId);
        });
        setIsAdLoaded(true);
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
  }, [placementId, lazy, isProduction]);

  // Get display size based on mounted state and device
  const getDisplaySize = (): AdSize => {
    if (!isMounted) {
      // During SSR, always return desktop size to prevent hydration mismatch
      return adConfig;
    }
    // On client, return mobile size if applicable
    return size === 'banner' && isMobile && adConfig.mobileFallback 
      ? adConfig.mobileFallback 
      : adConfig;
  };
  
  const displaySize = getDisplaySize();

  // Development placeholder
  if (!isProduction && showInDev) {
    return (
      <div 
        ref={adRef}
        className={`bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500 font-medium ${className}`}
        style={{ 
          width: displaySize.width, 
          height: displaySize.height,
          maxWidth: '100%',
          minHeight: typeof displaySize.height === 'number' ? `${displaySize.height}px` : '250px'
        }}
      >
        <div className="text-center">
          <div className="text-sm font-bold">Ezoic Ad</div>
          <div className="text-xs">Placement ID: {placementId}</div>
          <div className="text-xs">{size} ({displaySize.width}x{displaySize.height})</div>
        </div>
      </div>
    );
  }

  if (!isProduction && !showInDev) {
    return null;
  }

  // Production ad container
  return (
    <div className="w-full overflow-hidden">
      <div 
        ref={adRef}
        className={`ezoic-ad mx-auto ${className}`}
        id={`ezoic-pub-ad-placeholder-${placementId}`}
        data-placement-id={placementId}
        data-ad-size={size}
        style={{ 
          width: displaySize.width, 
          height: displaySize.height,
          maxWidth: '100%',
          minHeight: typeof displaySize.height === 'number' ? `${displaySize.height}px` : '250px'
        }}
      >
        {/* Ezoic will inject ad content here */}
      </div>
    </div>
  );
};

export default EzoicAd;

// Global type declaration for Ezoic
declare global {
  interface Window {
    ezstandalone?: {
      cmd?: Array<() => void>;
      showAds: (...placementIds: number[]) => void;
      destroyPlaceholders: (...placementIds: number[]) => void;
      destroyAll: () => void;
      define?: (adUnit: string) => void;
      display?: (adUnit: string) => void;
      refresh?: (adUnit: string) => void;
    };
  }
}
