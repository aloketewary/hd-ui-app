import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { CookiesStorageService } from 'ngx-store';
import { Observable } from 'rxjs';
import { isNullOrUndefined } from '../util/app-util';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate, CanLoad {

  constructor(
    private cookieStorage: CookiesStorageService,
    private router: Router,
    private location: Location) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const token = this.cookieStorage.get(environment.LOGIN_PERSISTENCE_NAME);
    if (!isNullOrUndefined(token)) {
      return true;
    }
    this.router.navigate([`/auth/login`], { queryParams: { returnUrl: state.url }, queryParamsHandling: null });
    return false;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    const token = this.cookieStorage.get(environment.LOGIN_PERSISTENCE_NAME);
    if (!isNullOrUndefined(token)) {
      return true;
    }
    this.router.navigate([`/auth/login`], { queryParams: { returnUrl: this.location.path() }, queryParamsHandling: null });
    return false;
  }
}
