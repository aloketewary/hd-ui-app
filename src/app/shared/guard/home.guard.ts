import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate, CanLoad {

  constructor(private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.router.navigate([`/auth/login`], { queryParams: { returnUrl: state.url }, queryParamsHandling: null });

    return false;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      this.router.navigate([`/auth/login`], { queryParams: { returnUrl: this.router.url }, queryParamsHandling: null });
    return false;
  }
}
