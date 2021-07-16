import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserProfile } from '../model/user-profile';
import { StorageService } from '../service/storage/storage.service';
import { isNullOrUndefined } from '../util/app-util';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router,
    private storage: StorageService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canAccess();
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.canAccess();
  }

  canAccess(): boolean {
    if (!!isNullOrUndefined(this.storage.getCookieData(environment.LOGIN_PERSISTENCE_NAME))) {
      return true;
    }
    this.router.navigate([`/home/dashboard/`]);
    return false;
  }
}
