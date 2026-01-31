import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  // Always return 'vi' as default - client will handle locale preference via localStorage
  // This avoids hydration mismatches since server always renders the same locale
  const locale = 'vi';
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
