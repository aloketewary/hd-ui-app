import { L10nConfig } from 'angular-l10n';


export const TranslationLoaderService: L10nConfig = {
  format: 'language',
  providers: [
    { name: 'app', asset: './assets/i18n/locale', options: { version: '1.0.0' } },
  ],
  cache: true,
  keySeparator: '.',
  defaultLocale: {
    language: 'en',
    currency: 'USD',
    // timeZone: 'America/Los_Angeles'
  },
  schema: [
    {
      locale: {
        language: 'en',
        currency: 'USD',
        // timeZone: 'America/Los_Angeles'
      },
      dir: 'ltr',
      text: 'APP.ENGLISH'
    },
    {
      locale: {
        language: 'hn',
        currency: 'INR',
        // timeZone: 'Europe/Rome'
      },
      dir: 'ltr',
      text: 'APP.HINDI'
    },
    {
      locale: {
        language: 'bn',
        currency: 'INR',
        // timeZone: 'Europe/Rome'
      },
      dir: 'ltr',
      text: 'APP.BENGALI'
    }
  ],
  // defaultRouting: true
};

