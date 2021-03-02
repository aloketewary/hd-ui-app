import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/shared/model/app-config';
import { AbstractHttpService } from 'src/app/shared/service/http/abstract-http.service';
import { ConfigLoaderService } from 'src/app/shared/service/loader/config-loader.service';
import { LoggerService } from 'src/app/shared/service/log/logger.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends AbstractHttpService {

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

  getDashboardInfo<T>(): Observable<T> {
    // tslint:disable-next-line:max-line-length
    const url = `${this.config.ROOT_URL + this.config.API_VERSION + this.config.DASHBOARD_ADMIN_URL}/info`;
    return this.getCallReturnObject<T>(url, this.config.RETRY_TIME,
      `(getConfigList) fetched available config list`);
  }
}
