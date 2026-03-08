import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const PUSH_DISMISSED_KEY = 'go2t-push-dismissed';
const PUSH_SUBSCRIBED_KEY = 'go2t-push-subscribed';

const translations: Record<string, { text: string; allow: string; dismiss: string }> = {
  en: {
    text: 'Get daily Thailand travel tips?',
    allow: 'Allow notifications',
    dismiss: 'No thanks',
  },
  nl: {
    text: 'Dagelijks Thailand reistips ontvangen?',
    allow: 'Meldingen toestaan',
    dismiss: 'Nee bedankt',
  },
  de: {
    text: 'Tägliche Thailand-Reisetipps erhalten?',
    allow: 'Benachrichtigungen erlauben',
    dismiss: 'Nein danke',
  },
  fr: {
    text: 'Recevoir des conseils de voyage en Thaïlande ?',
    allow: 'Autoriser les notifications',
    dismiss: 'Non merci',
  },
  zh: {
    text: '获取每日泰国旅行提示？',
    allow: '允许通知',
    dismiss: '不了谢谢',
  },
  ja: {
    text: '毎日のタイ旅行のヒントを受け取りますか？',
    allow: '通知を許可',
    dismiss: 'いいえ結構です',
  },
  ko: {
    text: '매일 태국 여행 팁을 받으시겠습니까?',
    allow: '알림 허용',
    dismiss: '괜찮습니다',
  },
  ru: {
    text: 'Получать ежедневные советы по путешествиям в Таиланд?',
    allow: 'Разрешить уведомления',
    dismiss: 'Нет, спасибо',
  },
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

    const timer = setTimeout(() => setShow(true), 3000);
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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-surface-dark/95 backdrop-blur-sm border-t border-white/10 px-4 py-3 animate-slide-up">
      <div className="container-custom flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-thailand-red flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <p className="text-white text-sm">{t.text}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDismiss}
            className="px-3 py-1.5 text-gray-400 hover:text-white text-sm transition-colors"
          >
            {t.dismiss}
          </button>
          <button
            onClick={handleAllow}
            className="px-4 py-1.5 bg-thailand-red text-white rounded-lg text-sm font-medium hover:bg-thailand-red-600 transition-colors"
          >
            {t.allow}
          </button>
        </div>
      </div>
    </div>
  );
}
