import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as "en" | "es")) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: {
      ...(await import(`../messages/${locale}/common.json`)).default,
      ...(await import(`../messages/${locale}/home.json`)).default,
      ...(await import(`../messages/${locale}/hr.json`)).default,
      ...(await import(`../messages/${locale}/projects.json`)).default,
      ...(await import(`../messages/${locale}/selector.json`)).default,
      ...(await import(`../messages/${locale}/notfound.json`)).default
    }
  };
});
