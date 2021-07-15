import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../model/app-config';
import { NavigationExtras, Router } from '@angular/router';
import { ConfigLoaderService } from '../service/loader/config-loader.service';
import { HttpLoaderService } from '../service/loader/http-loader.service';
import { CommonDialogService } from '../service/common/dialog/common-dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { AuthService } from '../service/auth/auth.service';
import { LoginResponse } from '../model/user-profile';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private auth: AuthService,
    private httpLoader: HttpLoaderService,
    private commonDialog: CommonDialogService,
    private dialog: MatDialog
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handleAccess(request, next)).pipe(
      tap(
        succ => { this.httpLoader.hide(); },
        err => {
          this.httpLoader.hide();
          if (err.status === 401 || err.status === 0) {
            if (!this.commonDialog.isAlertOpen) {
              this.commonDialog.isAlertOpen = true;
              this.commonDialog.authErrorAlert('Unauthorized Access', '',
                'auth-error-alert', 'UPDATE AUTHORIZATION', 'CANCEL').subscribe(val => {
                  if (val) {
                    // this.auth.refreshToken().subscribe(resp => {
                    //   if (resp) {
                    //     this.dialog.closeAll();
                    //   } else {
                    //     this.dialog.closeAll();
                    //     this.auth.logout();
                    //     this.router.navigateByUrl('/auth/login', { queryParams: { returnUrl: request.url }, queryParamsHandling: null });
                    //   }
                    // });
                  } else {
                    this.dialog.closeAll();
                    this.auth.logout();
                    // Set our navigation extras object
                    // that passes on our global query params and fragment
                    const navigationExtras: NavigationExtras = {
                      queryParams: {
                        returnUrl: request.url
                      },
                      queryParamsHandling: null
                    };
                    this.router.navigateByUrl('/auth/login', navigationExtras);
                  }
                  this.commonDialog.isAlertOpen = false;
                });
            }
          }
        }
      )
    );
  }

  private async handleAccess(request: HttpRequest<any>, next: HttpHandler):
    Promise<HttpEvent<any>> {
    if (request.url.startsWith('./assets') || request.url.startsWith('../assets') || request.url.startsWith('../../assets')) {
      return next.handle(request.clone({
        headers: new HttpHeaders()
      })).toPromise();
    }
    this.httpLoader.show();
    const token: LoginResponse = this.auth.getToken();
    let isUploadUrl: boolean;
    let isExcelUpload: boolean;
    const headerSettings: { [name: string]: string | string[]; } = {};

    if (isEqualsIgnoreCase(request.headers.get('No-Auth'), 'true')) {
      return next.handle(request.clone({
        headers: new HttpHeaders(headerSettings)
      })).toPromise();
    }
    if (isEqualsIgnoreCase(request.headers.get('upload'), 'true')) {
      isUploadUrl = true;
    } else if (isEqualsIgnoreCase(request.headers.get('uploadExcel'), 'true')) {
      isExcelUpload = true;
    } else {
      for (const key of request.headers.keys()) {
        headerSettings[key] = request.headers.getAll(key);
      }
    }
    let changedRequest = request;
    // HttpHeader object immutable - copy values

    if (token) {
      headerSettings.Authorization = `${token.tokenType} ${token.accessToken}`;
      if (isUploadUrl) {
        headerSettings['Content-Type'] = 'multipart/form-data';
        // headerSettings['enctype'] = 'multipart/form-data';
      } else if (isExcelUpload) {

      } else {
        headerSettings['Content-Type'] = 'application/json';
      }
      headerSettings.Accept = 'application/json';
      const newHeader = new HttpHeaders(headerSettings);

      changedRequest = request.clone({
        headers: newHeader
      });
    } else {
      // Keeps the original request params. as a new HttpParams
      let newParams = new HttpParams();
      newParams = newParams.append('returnUrl', `${this.router.url}`);
      changedRequest = request.clone({
        url: `/auth/login`,
        params: newParams
      });
    }
    return next.handle(changedRequest).toPromise();
  }
}

function isEqualsIgnoreCase(val: any, val2: any): boolean {
  return  typeof val === 'string' && typeof val2 === 'string'
  ? val.localeCompare(val2, undefined, { sensitivity: 'accent' }) === 0
  : val === val2;
}
