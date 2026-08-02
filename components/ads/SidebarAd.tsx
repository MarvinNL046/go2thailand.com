import { useEffect, useRef } from "react";

export default function SidebarAd({ className = "" }: { className?: string }) {
  const adsEnabled = process.env.NEXT_PUBLIC_ENABLE_ADS === "true";
  const pushed = useRef(false);

  useEffect(() => {
    if (!adsEnabled) return;
    if (pushed.current) return;
    try {
      const adsbygoogle = (window as any).adsbygoogle || [];
      adsbygoogle.push({});
      pushed.current = true;
    } catch {}
  }, [adsEnabled]);

  if (!adsEnabled) return null;

  return (
    <div className={`my-6 ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-9667530069853985"
        data-ad-slot="auto"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
