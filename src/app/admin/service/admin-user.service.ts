import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { retry, catchError, finalize, map, tap } from 'rxjs/operators';
import { AppConfig } from 'src/app/shared/model/app-config';
import { CommonResponse } from 'src/app/shared/model/common-response';
import { PageableResponse } from 'src/app/shared/model/pageable-response';
import { AbstractHttpService } from 'src/app/shared/service/http/abstract-http.service';
import { ConfigLoaderService } from 'src/app/shared/service/loader/config-loader.service';
import { LoggerService } from 'src/app/shared/service/log/logger.service';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService  extends AbstractHttpService {
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

  getUsersList<T>(params: {}): Observable<PageableResponse<T>> {
    // tslint:disable-next-line:max-line-length
    const url = `${this.config.ROOT_URL + this.config.API_VERSION + this.config.USER_ADMIN_URL}`;
    return this.http.get<CommonResponse<PageableResponse<T>>>(url, params).pipe(
      retry( this.config.RETRY_TIME),
      map((data: CommonResponse<PageableResponse<T>>) => {
        if (data.success) {
          return data.result as PageableResponse<T>;
        }
        this.showMessage(data.desc);
        return data.result as PageableResponse<T>;
      }),
      tap((t: PageableResponse<T>) => {
        return this.logger.info(this.className, 'Get Users list', t);
      }),
    );
  }
}

