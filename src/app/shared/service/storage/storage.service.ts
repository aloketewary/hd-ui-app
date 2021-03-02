import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookiesStorageService, LocalStorageService, SessionStorageService } from 'ngx-store';
import { environment } from 'src/environments/environment';
import { EncryptDecryptService } from '../encrypt/encrypt-decrypt.service';
import { AbstractHttpService } from '../http/abstract-http.service';
import { LoggerService } from '../log/logger.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService extends AbstractHttpService {

  constructor(
    public logger: LoggerService,
    public http: HttpClient,
    public snackBar: MatSnackBar,
    private router: Router,
    private localStorageService: LocalStorageService,
    private encryptDecryptService: EncryptDecryptService,
    private sessionStorageService: SessionStorageService,
    private cookieStorageService: CookiesStorageService) {
    super('StorageService', http, snackBar, logger);
    // this.startListen();
  }

  getLocalData<T>(param: any): T {
    return this.encryptDecryptService.decryptData<T>(this.localStorageService.get(param));
  }

  async setLocalData(key: string, param: any): Promise<any> {
    this.logger.debug(this.className, `Set Localstorage Data for ${key}`);
    this.localStorageService.set(key, this.encryptDecryptService.encryptData(param));
  }

  getSessionData<T>(param: any): T {
    return this.encryptDecryptService.decryptData<T>(this.sessionStorageService.get(param));
  }

  setSessionData(key: string, param: any): void {
    this.sessionStorageService.set(key, this.encryptDecryptService.encryptData(param));
  }

  getCookieData<T>(param: any): T {
    this.logger.debug(this.className, `getCookieData() Data`);
    const data: T = this.encryptDecryptService.decryptData<T>(this.cookieStorageService.get(param));
    return data;
  }

  async setCookieData(key: string, param: any, expiredTime?: Date): Promise<any> {
    this.cookieStorageService.set(key, await this.encryptDecryptService.encryptData(param), expiredTime);
  }

  remove(key: string): void {
    this.cookieStorageService.remove(key);
  }

  getUserID(): string {
    return this.getCookieData('USER_DATA_KEY') ? this.getCookieData('USER_DATA_KEY')['userId'] : null;
  }

  // getUserData<T>(): T {
  //   const userData = this.getLocalData<UserProfile>('environment.USER_DATA_KEY');
  //   if (!isNullOrUndefined(userData)) {
  //     return userData as unknown as T;
  //   }
  //   return;
  // }

  // startListen() {
  //   this.cookieStorageService.observe(environment.LOGIN_PERSISTENCE_NAME).subscribe(val => {
  //     if (isNullOrUndefined(val)) {
  //       this.router.navigateByUrl('/auth/login');
  //     }
  //   });
  // }

  // getLoginType<T>(): T {
  //   const loginAs = this.getLocalData<string>(environment.LOGIN_AS_KEY);
  //   if (!isNullOrUndefined(loginAs)) {
  //     return loginAs as unknown as T;
  //   }
  //   return;
  // }
}
