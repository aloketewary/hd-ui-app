import { Injectable, Injector } from '@angular/core';
import SimpleCrypto from "simple-crypto-js";
import { ENCRYPTION_SECRET_KEY } from 'src/app/shared/util/injection.token';

@Injectable({
  providedIn: 'root'
})
export class EncryptDecryptService {

  private className = 'EncryptDecryptService';
  protected readonly encryptSecretKey: string;
  private simpleCrypto: SimpleCrypto;
  constructor(
    private injector: Injector
  ) {
    this.encryptSecretKey = this.injector.get<string>(ENCRYPTION_SECRET_KEY);
    this.simpleCrypto = new SimpleCrypto(this.encryptSecretKey)
  }

  /**
   * To encrypt any text at forntend for not visible to user
   * @param data any data
   */
  encryptData<T>(data: string | T | Array<T> | number): string | null {
    try {
      return this.simpleCrypto.encrypt(JSON.stringify(data));
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
    if (data) {
      try {
        const bytes = this.simpleCrypto.decrypt(data);
        if (bytes) {
          return bytes as unknown as T;
        }
        return null;
      } catch (e) {
        console.error(this.className, e);
      }
    }
    return null;
  }
}
