import { useEffect, useRef } from 'react';

interface AffiliateWidgetProps {
  scriptContent: string;
  className?: string;
  minHeight?: string;
}

export default function AffiliateWidget({ scriptContent, className = '', minHeight = '200px' }: AffiliateWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const srcMatch = scriptContent.match(/src="([^"]+)"/);
      if (srcMatch && srcMatch[1]) {
        const script = document.createElement('script');
        script.src = srcMatch[1];
        script.async = true;
        script.charset = 'utf-8';
        containerRef.current.appendChild(script);

        return () => {
          if (script && script.parentNode) {
            script.parentNode.removeChild(script);
          }
        };
      }
    }
  }, [scriptContent]);

  // Fix: Travelpayouts 12Go widget's ".powered" div uses position:relative + bottom:17px
  // which shifts it over the interactive form elements, blocking all clicks.
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = '.powered { pointer-events: none !important; } .powered a { pointer-events: auto !important; }';
    document.head.appendChild(style);
    return () => { style.remove(); };
  }, []);

  return (
    <div ref={containerRef} className={`affiliate-widget ${className}`} style={{ minHeight }} />
  );
}
