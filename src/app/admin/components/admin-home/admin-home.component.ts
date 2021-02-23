import { Component, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoggerService } from '../../../shared/service/log/logger.service';
import { L10nTranslationService, L10nLocale, L10N_LOCALE } from 'angular-l10n';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { DataHandlerService } from '../../../shared/service/handler/data-handler.service';
import { BaseComponent } from '../../../shared/class/base-component';
import { filter, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent extends BaseComponent implements OnInit, OnDestroy {


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
    private router: Router,
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

  routeIsActive(routePath: string): boolean {
    const mainUrl = this.router.url;
    return mainUrl.includes(routePath);
  }
}
