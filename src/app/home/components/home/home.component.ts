import { trigger, state, style, transition, animate } from '@angular/animations';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { L10nConfig, L10nLocale, L10nTranslationService, L10N_CONFIG, L10N_LOCALE } from 'angular-l10n';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseComponent } from 'src/app/shared/class/base-component';
import { AppConfig } from 'src/app/shared/model/app-config';
import { DataHandlerService } from 'src/app/shared/service/handler/data-handler.service';
import { ConfigLoaderService } from 'src/app/shared/service/loader/config-loader.service';
import { LoggerService } from 'src/app/shared/service/log/logger.service';
import { isEqualsIgnoreCase } from 'src/app/shared/util/app-util';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class HomeComponent extends BaseComponent implements OnInit, OnDestroy {
  config: AppConfig;
  isOpened = false;
  public currentMode: 'rail' | 'over' | 'side' | 'push';
  @ViewChild(MatSidenav) appDrawer: MatSidenav;
  public isMobileView: boolean;
  @ViewChild('sidenav', { static: true }) menuSidenav: MatSidenav;
  watcher: Subscription;
  rootLogoUrl: any;
  userProfile: any = {};
  schema = this.l10nConfig.schema;
  constructor(
    protected snackBar: MatSnackBar,
    protected logger: LoggerService,
    protected translation: L10nTranslationService,
    public breakpointObserver: BreakpointObserver,
    public media: MediaObserver,
    public dataHandler: DataHandlerService,
    @Inject(L10N_LOCALE) public locale: L10nLocale,
    private router: Router,
    @Inject(L10N_CONFIG) private l10nConfig: L10nConfig,
    configLoader: ConfigLoaderService,
  ) {
    super('HomeComponent', snackBar, logger, translation);
    this.config = configLoader.getConfigData();
    this.currentMode = 'side';
    this.userProfile.userType = 'ADMIN';
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

  showHideNavMenu(link: any): void {
    this.dataHandler.sidenavMenu.forEach(indLink => {
      if (indLink.name !== link.name) {
        indLink.isShow = false;
      }
    });
    this.dataHandler.sidenavMenu[this.dataHandler.sidenavMenu.indexOf(link)].isShow =
      !this.dataHandler.sidenavMenu[this.dataHandler.sidenavMenu.indexOf(link)].isShow;
  }

  onLinkClick(): void {
    if (this.isMobileView) {
      this.menuSidenav.close();
    }
  }

  checkUrlAccessibleOrNot(roleList: string[], loginType: 'teacherapp' | 'adminapp'): boolean {
    let rtrn = false;
    if (isNullOrUndefined(roleList)) {
      return true;
    }
    roleList.forEach((role: string) => {
      if (!rtrn) {
        rtrn = isEqualsIgnoreCase(this.config[role], this.userProfile?.userType);
      }
    });
    return rtrn && (loginType === this.dataHandler.loginAs);
  }

  gotoAdminHome() {
    this.router.navigate(['/admin/dashboard']);
  }
}
