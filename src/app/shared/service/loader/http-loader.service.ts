import { Subject } from 'rxjs';

import { Injectable, NgZone } from '@angular/core';

import { LoaderState } from '../../interface/loader-state';

@Injectable({
  providedIn: 'root'
})
export class HttpLoaderService {
  private loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();

  constructor(
    private ngZone: NgZone
  ) { }

  show() {
    this.ngZone.runOutsideAngular(() => {
      this.loaderSubject.next(<LoaderState>{ show: true });
    });
  }
  hide() {
    this.ngZone.runOutsideAngular(() => {
      this.loaderSubject.next(<LoaderState>{ show: false });
    });
  }
}
