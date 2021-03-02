import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { APP_INITIALIZER, Inject, Injectable, NgModule, Optional, PLATFORM_ID } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  L10nIntlModule,
  L10nLoader,
  L10nLocale,
  L10nProvider,
  L10nRoutingModule,
  L10nStorage,
  L10nTranslationLoader,
  L10nTranslationModule,
} from 'angular-l10n';
import { Observable } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigLoaderService } from './shared/service/loader/config-loader.service';
import { TranslationLoaderService } from './shared/service/loader/translation-loader.service';
import { LogLoaderService } from './shared/service/log/log-loader.service';
import { httpInterceptorProviders } from './shared/interceptor/http-interceptor.provider';
import { StoreModule } from '@ngrx/store';
import { isPlatformBrowser } from '@angular/common';
import { StorageService } from './shared/service/storage/storage.service';
import { ENCRYPTION_SECRET_KEY, ROOT_LOGO_URL } from './shared/util/injection.token';
import { environment } from '../environments/environment.prod';

@Injectable() export class HttpTranslationLoader implements L10nTranslationLoader {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(@Optional() private http: HttpClient) { }

  public get(language: string, provider: L10nProvider): Observable<{ [key: string]: any }> {
    const url = `${provider.asset}-${language}.json`;
    const options = {
      headers: this.headers,
      params: new HttpParams().set('v', provider.options.version)
    };
    return this.http.get(url, options);
  }

}

@Injectable() export class AppStorage implements L10nStorage {

  constructor(@Inject(PLATFORM_ID) private platformId: object, private storageService: StorageService) { }

  public async read(): Promise<L10nLocale | null> {
    return Promise.resolve(this.storageService.getCookieData<L10nLocale>('locale'));
  }

  public async write(locale: L10nLocale): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      this.storageService.setCookieData('locale', locale);
    }
  }

}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    L10nRoutingModule.forRoot(),
    L10nTranslationModule.forRoot(TranslationLoaderService, {
      storage: AppStorage,
      translationLoader: HttpTranslationLoader,
    }),
    L10nIntlModule,
    SharedModule,
    StoreModule.forRoot({}, {})
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: init, deps: [ConfigLoaderService], multi: true },
    { provide: APP_INITIALIZER, useFactory: logPublisherFactory, deps: [LogLoaderService], multi: true },
    { provide: APP_INITIALIZER, useFactory: initL10n, deps: [L10nLoader], multi: true },
    { provide: ENCRYPTION_SECRET_KEY, useValue: environment.SECRET_KEY },
    { provide: ROOT_LOGO_URL, useValue: '/home/dashboard' },
    { provide: HAMMER_GESTURE_CONFIG, useClass: HammerGestureConfig },
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function init(config: ConfigLoaderService): () => void {
  return () => config.load();
}

export function logPublisherFactory(provider: LogLoaderService): () => void {
  return () => provider.load();
}

export function initL10n(l10nLoader: L10nLoader): () => void {
  return () => l10nLoader.init();
}

