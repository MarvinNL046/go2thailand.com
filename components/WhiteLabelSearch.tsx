import { useEffect, useRef } from 'react';

interface WhiteLabelSearchProps {
  className?: string;
}

declare global {
  interface Window {
    TPWL_CONFIGURATION?: Record<string, unknown>;
  }
}

export default function WhiteLabelSearch({ className = '' }: WhiteLabelSearchProps) {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Set up TPWL configuration before loading the script
    window.TPWL_CONFIGURATION = {
      ...window.TPWL_CONFIGURATION,
      resultsURL: 'https://search.go2-thailand.com',
    };

    const script = document.createElement('script');
    script.async = true;
    script.type = 'module';
    script.src = 'https://tpembd.com/wl_web/main.js?wl_id=12956';
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className={className}>
      <div id="tpwl-search"></div>
    </div>
  );
}
