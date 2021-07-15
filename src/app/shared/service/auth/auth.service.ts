import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookiesStorageService, LocalStorageService } from 'ngx-store';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../../model/user-profile';
import { EncryptDecryptService } from '../encrypt/encrypt-decrypt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
  constructor(
    private http: HttpClient,
    private cookieStorage: CookiesStorageService,
    private router: Router,
    private encDec: EncryptDecryptService,
    // private localStorageService: LocalStorageService
  ) { }

  /**
   * if we have token the user is loggedIn
   * @returns boolean
   */
  private hasToken(): boolean {
    return !!this.cookieStorage.get(environment.LOGIN_PERSISTENCE_NAME);
  }

  /**
   * if we have token the user is loggedIn
   * @returns string
   */
  public getToken(): LoginResponse {
    return this.encDec.decryptData<LoginResponse>(this.cookieStorage.get(environment.LOGIN_PERSISTENCE_NAME));
  }

  /**
  * Log out the user then tell all the subscribers about the new status
  */
  public logout(): void {
    this.cookieStorage.remove(environment.LOGIN_PERSISTENCE_NAME);
    this.isLoginSubject.next(false);
    this.router.navigate(['/auth/login']);
  }

  /**
* Check for isLoggedIn
* @returns Observable<boolean> check for loggedin
*/
  public isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable().pipe(take(1));
  }

  /**
   * if we have token the user is loggedIn
   * @returns string String returns
   */
  public getAuthKey(): Observable<string> {
    return this.encDec.decryptData(this.cookieStorage.get(environment.LOGIN_PERSISTENCE_NAME));
  }
}
