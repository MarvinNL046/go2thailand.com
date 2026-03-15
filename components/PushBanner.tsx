import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const PUSH_DISMISSED_KEY = 'go2t-push-dismissed';
const PUSH_SUBSCRIBED_KEY = 'go2t-push-subscribed';

const translations: Record<string, { text: string; allow: string }> = {
  en: { text: '🔔 Get daily Thailand travel tips', allow: 'Enable' },
  nl: { text: '🔔 Dagelijks Thailand reistips', allow: 'Inschakelen' },
  de: { text: '🔔 Tägliche Thailand-Reisetipps', allow: 'Aktivieren' },
  fr: { text: '🔔 Conseils de voyage quotidiens', allow: 'Activer' },
  zh: { text: '🔔 每日泰国旅行提示', allow: '启用' },
  ja: { text: '🔔 毎日のタイ旅行ヒント', allow: '有効にする' },
  ko: { text: '🔔 매일 태국 여행 팁', allow: '활성화' },
  ru: { text: '🔔 Ежедневные советы о Таиланде', allow: 'Включить' },
  th: { text: '🔔 เคล็ดลับท่องเที่ยวไทยรายวัน', allow: 'เปิดใช้งาน' },
};

export default function PushBanner() {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const locale = router.locale || 'en';
  const t = translations[locale] || translations.en;

  useEffect(() => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;
    if (localStorage.getItem(PUSH_DISMISSED_KEY)) return;
    if (localStorage.getItem(PUSH_SUBSCRIBED_KEY)) return;

    if (Notification.permission === 'granted') {
      localStorage.setItem(PUSH_SUBSCRIBED_KEY, 'true');
      return;
    }
    if (Notification.permission === 'denied') return;

    const timer = setTimeout(() => setShow(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleAllow = async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      await navigator.serviceWorker.ready;

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      });

      const res = await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subscription: subscription.toJSON(),
          locale,
        }),
      });

      if (res.ok) {
        localStorage.setItem(PUSH_SUBSCRIBED_KEY, 'true');
      }
    } catch (err) {
      console.error('[PushBanner] Subscription failed:', err);
    }

    setShow(false);
  };

  const handleDismiss = () => {
    localStorage.setItem(PUSH_DISMISSED_KEY, 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="bg-surface-dark text-white text-xs sm:text-sm flex items-center justify-center gap-3 px-4 py-1.5">
      <span>{t.text}</span>
      <button
        onClick={handleAllow}
        className="px-2.5 py-0.5 bg-thailand-red text-white rounded text-xs font-medium hover:bg-thailand-red-600 transition-colors"
      >
        {t.allow}
      </button>
      <button
        onClick={handleDismiss}
        className="text-gray-400 hover:text-white transition-colors"
        aria-label="Dismiss"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
