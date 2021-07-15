import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/shared/model/app-config';
import { AbstractHttpService } from 'src/app/shared/service/http/abstract-http.service';
import { ConfigLoaderService } from 'src/app/shared/service/loader/config-loader.service';
import { LoggerService } from 'src/app/shared/service/log/logger.service';
import { LoginRequest } from '../models/login-request';

const httpOptions = {
  headers: new HttpHeaders({
    'No-Auth': 'True',
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService extends AbstractHttpService {
  private _isLogin: BehaviorSubject<boolean>;
  config: AppConfig;
  constructor(
    protected http: HttpClient,
    protected snackBar: MatSnackBar,
    protected logger: LoggerService,
    configLoader: ConfigLoaderService
  ) {
    super('LoginService', http, snackBar, logger);
    this._isLogin = new BehaviorSubject<boolean>(null);
    this.config = configLoader.getConfigData();
  }

   public get isLogin(): BehaviorSubject<boolean> {
    return this._isLogin;
  }
  public set isLogin(value: BehaviorSubject<boolean>) {
    this._isLogin = value;
  }

  signin<T>(bodyData: LoginRequest): Observable<T> {
    // tslint:disable-next-line:max-line-length
    const url = `${this.config.ROOT_URL + this.config.API_VERSION + this.config.LOGIN_URL}`;
    return this.postCallReturnObject<T, LoginRequest>(url, bodyData, this.config.RETRY_TIME,
      `(signin) fetched available config list`, httpOptions);
  }
}
