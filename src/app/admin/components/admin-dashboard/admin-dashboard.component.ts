import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, ViewChild, Inject } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { L10nTranslationService, L10N_LOCALE, L10nLocale } from 'angular-l10n';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { BaseComponent } from '../../../shared/class/base-component';
import { LoggerService } from '../../../shared/service/log/logger.service';
import { DataHandlerService } from '../../../shared/service/handler/data-handler.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent extends BaseComponent implements OnInit, OnDestroy {

  isOpened = false;
  public currentMode: 'rail' | 'over' | 'side' | 'push';
  @ViewChild(MatSidenav) appDrawer: MatSidenav;
  public isMobileView: boolean;
  @ViewChild('sidenav', { static: true }) menuSidenav: MatSidenav;
  watcher: Subscription;
  rootLogoUrl: any;
  userProfile: any;

  constructor(
    protected snackBar: MatSnackBar,
    protected logger: LoggerService,
    protected translation: L10nTranslationService,
    public breakpointObserver: BreakpointObserver,
    public media: MediaObserver,
    public dataHandler: DataHandlerService,
    @Inject(L10N_LOCALE) public locale: L10nLocale,
  ) {
    super('AdminDashboardComponent', snackBar, logger, translation);
    this.currentMode = 'side';
  }

  ngOnInit(): void {
    this.isMobileView = this.media.isActive('xs') || this.media.isActive('sm');
    // this.watcher = this.media.media$.subscribe((change: MediaChange) => {
    //   this.isMobileView = change.mqAlias === 'xs' || change.mqAlias === 'sm';
    // });
    this.watcher = this.media.asObservable().pipe(
      filter((changes: MediaChange[]) => changes.length > 0),
      map((changes: MediaChange[]) => changes[0])
    ).subscribe((change: MediaChange) => {
      this.isMobileView = change.mqAlias === 'xs';
    });
  }

  ngOnDestroy(): void {
    this.watcher.unsubscribe();

  }

}
