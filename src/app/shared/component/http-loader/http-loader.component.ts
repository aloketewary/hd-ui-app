import { Subscription } from 'rxjs';

import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { LoaderState } from '../../interface/loader-state';
import { HttpLoaderService } from '../../service/loader/http-loader.service';

@Component({
  selector: 'app-http-loader',
  templateUrl: './http-loader.component.html',
  styleUrls: ['./http-loader.component.scss']
})
export class HttpLoaderComponent implements OnInit, OnDestroy {

  show = false;
  private subscription: Subscription;
  constructor(
    private loaderService: HttpLoaderService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.subscription = this.loaderService.loaderState
      .subscribe((state: LoaderState) => {
        this.show = state.show;
        this.cdRef.detectChanges();
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
