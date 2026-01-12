import { defineRouting } from 'next-intl/routing';
import { locales, defaultLocale } from '@onecoach/translations';

export const routing = defineRouting({
  locales,
  defaultLocale,
});
