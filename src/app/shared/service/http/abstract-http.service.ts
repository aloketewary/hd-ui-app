import { Observable, of } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { AppConfig } from '../../model/app-config';
import { CommonResponse } from '../../model/common-response';
import { AppUtil } from '../../util/app-util';
import { LoggerService } from '../log/logger.service';
import { Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AbstractHttpService {

  protected constructor(
    @Inject('className') protected className: string,
    protected http: HttpClient,
    protected snackBar: MatSnackBar,
    protected logger: LoggerService) {
    this.className = className;
  }

  protected handleError<T>(uri: string, result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      this.logger.error(this.className, 'http request failed:', uri);
      this.logger.error(this.className, 'error', error);
      this.logger.error(this.className, 'response', JSON.stringify(result));
      return result != null ? of(result) : of();
    };
  }

  showMessage(message: string): void {
    const config: MatSnackBarConfig = {
      verticalPosition: 'top',
      horizontalPosition: 'right',
      duration: 5000,
    };
    this.snackBar.open(message || '', '', config);
  }

  /**
   * Calculate the expired time for Authentication token
   * @param authTokenExpires AuthToken Expires
   * @param expireTime Expire Time from config
   * @returns Date
   */
  getCalculatedAuthTokenExpires(authTokenExpires: any, expireTime: number): Date {
    if (AppUtil.isNullOrUndefined(authTokenExpires)) {
      authTokenExpires = new Date(new Date().getTime() + (expireTime * 60 * 1000));
    }
    return new Date(authTokenExpires);
  }

  makeApiUrl(config: AppConfig, rootUrl: string, rootMainService: string, apiVersion: string, apiTobeHit: string): string {
    return `${config[rootUrl]}${config[rootMainService]}${config[apiVersion]}${config[apiTobeHit]}`;
  }

  // postCallReturnObject<T, E>(url: string, bodyData: E): Observable<T> {

  // }

  /**
   * Generic class for making post call and return type boolean
   * @param url Url to be called
   * @param bodyData post body data
   * @param logMsg logger messages
   */
  postCallReturnBoolean<T, E>(url: string, bodyData: E, retryTime: number, logMsg: string): Observable<boolean> {
    return this.http.post<CommonResponse<T>>(url, bodyData).pipe(
      retry(retryTime),
      map((data: CommonResponse<T>) => this.mapTheResultForBoolean<T>(data)),
      tap((t: boolean) => {
        return this.logger.info(this.className, logMsg, t);
      }),
      catchError(this.handleError<boolean>(url))
    );
  }

  postCallReturnObject<T, E>(url: string, bodyData: E, retryTime: number, logMsg: string): Observable<T> {
    return this.http.post<CommonResponse<T>>(url, bodyData).pipe(
      retry(retryTime),
      map((data: CommonResponse<T>) => this.mapTheResultForObject<T>(data)),
      tap((t: T) => {
        return this.logger.info(this.className, logMsg, t);
      }),
      catchError(this.handleError<T>(url))
    );
  }

  postCallReturnList<T, E>(url: string, bodyData: E, retryTime: number, logMsg: string): Observable<T[]> {
    return this.http.post<CommonResponse<T>>(url, bodyData).pipe(
      retry(retryTime),
      map((data: CommonResponse<T>) => this.mapTheResultForList<T>(data)),
      tap((t: T[]) => {
        return this.logger.info(this.className, logMsg, t);
      }),
      catchError(this.handleError<T[]>(url))
    );
  }

  /**
   * Generic class for making get call and return type boolean
   * @param url Url to be called
   * @param logMsg Logger message
   */
  getCallReturnBoolean<T>(url: string, retryTime: number, logMsg: string): Observable<boolean> {
    return this.http.get<CommonResponse<T>>(url).pipe(
      retry(retryTime),
      map((data: CommonResponse<T>) => this.mapTheResultForBoolean<T>(data)),
      tap((t: boolean) => {
        return this.logger.info(this.className, logMsg, t);
      }),
      catchError(this.handleError<boolean>(url))
    );
  }

  getCallReturnObject<T>(url: string, retryTime: number, logMsg: string): Observable<T> {
    return this.http.get<CommonResponse<T>>(url).pipe(
      retry(retryTime),
      map((data: CommonResponse<T>) => this.mapTheResultForObject<T>(data)),
      tap((t: T) => {
        return this.logger.info(this.className, logMsg, t);
      }),
      catchError(this.handleError<T>(url))
    );
  }

  getCallReturnList<T>(url: string, retryTime: number, logMsg: string): Observable<T[]> {
    return this.http.get<CommonResponse<T>>(url).pipe(
      retry(retryTime),
      map((data: CommonResponse<T>) => this.mapTheResultForList<T>(data)),
      tap((t: T[]) => {
        return this.logger.info(this.className, logMsg, t);
      }),
      catchError(this.handleError<T[]>(url))
    );
  }

  deleteCallReturnBoolean<T>(url: string, retryTime: number, logMsg: string): Observable<boolean> {
    return this.http.delete<CommonResponse<T>>(url).pipe(
      retry(retryTime),
      map((data: CommonResponse<T>) => this.mapTheResultForBoolean<T>(data)),
      tap((t: boolean) => {
        return this.logger.info(this.className, logMsg, t);
      }),
      catchError(this.handleError<boolean>(url))
    );
  }

  deleteCallReturnList<T>(url: string, retryTime: number, logMsg: string): Observable<T[]> {
    return this.http.delete<CommonResponse<T>>(url, ).pipe(
      retry(retryTime),
      map((data: CommonResponse<T>) => this.mapTheResultForList<T>(data)),
      tap((t: T[]) => {
        return this.logger.info(this.className, logMsg, t);
      }),
      catchError(this.handleError<T[]>(url))
    );
  }

  patchCallReturnObject<T, E>(url: string, bodyData: E, retryTime: number, logMsg: string): Observable<T> {
    return this.http.patch<CommonResponse<T>>(url, bodyData).pipe(
      retry(retryTime),
      map((data: CommonResponse<T>) => this.mapTheResultForObject<T>(data)),
      tap((t: T) => {
        return this.logger.info(this.className, logMsg);
      }),
      catchError(this.handleError<T>(url))
    );
  }
  /**
   * Map the result in common chunk
   * @param data Common Response
   */
  private mapTheResultForBoolean<T>(data: CommonResponse<T>): boolean {
    if (data.success) {
      return data.success;
    }
    this.showMessage(data.desc);
    return false;
  }

  /**
   * Map the result in common chunk
   * @param data Common Response
   */
  private mapTheResultForObject<T>(data: CommonResponse<T>): T {
    if (data.success) {
      return data.result as T;
    }
    this.showMessage(data.desc);
    return data.result as T;
  }

  /**
   * Map the result in common chunk
   * @param data Common Response
   */
  private mapTheResultForList<T>(data: CommonResponse<T>): T[] {
    if (data.success) {
      return data.result as T[];
    }
    this.showMessage(data.desc);
    return data.result as T[];
  }
}
