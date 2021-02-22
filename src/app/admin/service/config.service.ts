import { Injectable } from '@angular/core';
import { AbstractHttpService } from '../../shared/service/http/abstract-http.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoggerService } from '../../shared/service/log/logger.service';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/shared/model/app-config';
import { ConfigLoaderService } from '../../shared/service/loader/config-loader.service';
import { AppConfigModel } from '../models/app-config.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService extends AbstractHttpService {
  config: AppConfig;
  constructor(
    protected http: HttpClient,
    protected snackBar: MatSnackBar,
    protected logger: LoggerService,
    configLoader: ConfigLoaderService
  ) {
    super('ConfigService', http, snackBar, logger);
    this.config = configLoader.getConfigData();
  }

  getConfigList<T>(usedFor: string): Observable<T[]> {
    // tslint:disable-next-line:max-line-length
    const url = `${this.config.ROOT_URL + this.config.API_VERSION + this.config.CONFIG_ADMIN_URL}/${usedFor}`;
    return this.getCallReturnList<T>(url, this.config.RETRY_TIME,
      `(getConfigList) fetched available config list where used_for= ${usedFor}`);
  }

  addNewConfig<T>(config: AppConfigModel): Observable<boolean> {
    // tslint:disable-next-line:max-line-length
    const url = `${this.config.ROOT_URL + this.config.API_VERSION + this.config.CONFIG_ADMIN_URL}`;
    const bodyData = {
      key: config.key,
      value: config.value,
      is_active: config.isActive,
      used_for: config.usedFor
    };
    return this.postCallReturnBoolean<T, {
      key: string,
      value: any,
      is_active: boolean,
      used_for: string,
    }>(url, bodyData, this.config.RETRY_TIME,
      `(addNewConfig) Added new config for ${config.key}`);
  }

  deleteConfig<T>(config: AppConfigModel): Observable<boolean> {
    // tslint:disable-next-line:max-line-length
    const url = `${this.config.ROOT_URL + this.config.API_VERSION + this.config.CONFIG_ADMIN_URL}/${config.id}`;
    return this.deleteCallReturnBoolean<T>(url, this.config.RETRY_TIME,
      `(addNewConfig) Delete config for ${config.id}`);
  }

  updateConfig<T>(configId: string, config: AppConfigModel): Observable<T | null> {
    // tslint:disable-next-line:max-line-length
    const url = `${this.config.ROOT_URL + this.config.API_VERSION + this.config.CONFIG_ADMIN_URL}/${configId}`;
    const bodyData = {
      key: config.key,
      value: config.value,
      is_active: config.isActive,
      used_for: config.usedFor
    };
    return this.patchCallReturnObject<T, {
      key: string,
      value: any,
      is_active: boolean,
      used_for: string,
    }>(url, bodyData, this.config.RETRY_TIME,
      `(addNewConfig) updated existing config for ${config.id}`);
  }

}
