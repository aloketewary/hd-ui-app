import { L10nConfig, L10nLocale, L10nStorage } from 'angular-l10n';

export class Storage implements L10nStorage {
  read(): Promise<L10nLocale> {
    throw new Error('Method not implemented.');
  }
  write(locale: L10nLocale): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

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

