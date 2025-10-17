import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// Minimal type for the beforeinstallprompt event (Chromium)
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

const DISMISS_KEY = 'pwa-install-dismissed-at';
const DISMISS_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function isIOSDevice(userAgent: string): boolean {
  return /iphone|ipad|ipod/i.test(userAgent);
}

function isStandaloneDisplay(): boolean {
  // iOS: navigator.standalone, Others: matchMedia
  const isIOSStandalone = (window.navigator as any).standalone === true;
  const isDisplayModeStandalone = window.matchMedia && window.matchMedia('(display-mode: standalone)').matches;
  return Boolean(isIOSStandalone || isDisplayModeStandalone);
}

function getDismissedAt(): number | null {
  try {
    const raw = localStorage.getItem(DISMISS_KEY);
    if (!raw) return null;
    const ts = Number(raw);
    return Number.isFinite(ts) ? ts : null;
  } catch {
    return null;
  }
}

function setDismissedNow(): void {
  try {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
  } catch {
    // ignore
  }
}

export function usePWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [canInstall, setCanInstall] = useState(false);
  const [open, setOpen] = useState(false);
  const timerRef = useRef<number | null>(null);

  const isStandalone = useMemo(() => isStandaloneDisplay(), []);
  const isIOS = useMemo(() => isIOSDevice(window.navigator.userAgent), []);

  // Listen for beforeinstallprompt (Android/Chromium)
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setCanInstall(true);
    };
    window.addEventListener('beforeinstallprompt', handler as EventListener);
    return () => window.removeEventListener('beforeinstallprompt', handler as EventListener);
  }, []);

  // Auto open after slight delay when eligible and not dismissed
  useEffect(() => {
    if (isStandalone) return; // already installed

    const dismissedAt = getDismissedAt();
    const recentlyDismissed = dismissedAt !== null && Date.now() - dismissedAt < DISMISS_TTL_MS;
    if (recentlyDismissed) return;

    const eligible = isIOS || canInstall;
    if (!eligible) return;

    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setOpen(true), 2000);

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [canInstall, isIOS, isStandalone]);

  const promptInstall = useCallback(async (): Promise<'accepted' | 'dismissed' | 'unsupported'> => {
    if (!deferredPrompt) return 'unsupported';
    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      setDeferredPrompt(null);
      setCanInstall(false);
      return choice.outcome;
    } catch {
      return 'dismissed';
    }
  }, [deferredPrompt]);

  const closeAndDismiss = useCallback(() => {
    setOpen(false);
    setDismissedNow();
  }, []);

  const openManually = useCallback(() => {
    setOpen(true);
  }, []);

  return {
    // state
    open,
    canInstall,
    isIOS,
    isStandalone,
    // actions
    setOpen,
    openManually,
    closeAndDismiss,
    promptInstall,
  };
}

export default usePWAInstallPrompt;


