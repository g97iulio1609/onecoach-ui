const LOCALE_STORAGE_KEY = 'onecoach-locale';

export async function saveLanguagePreference(locale: string) {
  // 1. Save to localStorage (immediate)
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }

  // 2. Save to cookie (for SSR/Middleware)
  const oneYear = 60 * 60 * 24 * 365;
  if (typeof document !== 'undefined') {
    document.cookie = `${LOCALE_STORAGE_KEY}=${locale}; path=/; max-age=${oneYear}; SameSite=Lax`;
  }

  // 3. Sync to DB (background, for authenticated users)
  try {
    await fetch('/api/user/preferences', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ preferredLocale: locale }),
    });
  } catch {
    // Silently fail - localStorage is already saved
  }
}
