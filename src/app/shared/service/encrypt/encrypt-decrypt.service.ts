import { Injectable, Injector } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { ENCRYPTION_SECRET_KEY } from 'src/app/shared/util/injection.token';


@Injectable({
  providedIn: 'root'
})
export class EncryptDecryptService {

  private className = 'EncryptDecryptService';
  protected readonly encryptSecretKey: string;
  constructor(
    private injector: Injector
  ) {
    this.encryptSecretKey = this.injector.get<string>(ENCRYPTION_SECRET_KEY);
  }

  /**
   * To encrypt any text at forntend for not visible to user
   * @param data any data
   */
  encryptData<T>(data: string | T | Array<T> | number): string | null {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptSecretKey).toString();
    } catch (e) {
      console.error(this.className, e);
    }
    return null;
  }

  /**
   * To decrypt any text at frontend for visible to user
   * @param data encrypt text
   */
  decryptData<T>(data: string): T {
    if (data !== null) {
      try {
        const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
        if (bytes.toString()) {
          return JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) as T;
        }
        return null;
      } catch (e) {
        console.error(this.className, e);
      }
    }
    return null;
  }
}
