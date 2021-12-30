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
import { LoginResponse, UserProfile } from 'src/app/shared/model/user-profile';
import { AuthService } from 'src/app/shared/service/auth/auth.service';
import { CommonDialogService } from 'src/app/shared/service/common/dialog/common-dialog.service';
import { DataHandlerService } from 'src/app/shared/service/handler/data-handler.service';
import { ConfigLoaderService } from 'src/app/shared/service/loader/config-loader.service';
import { LoggerService } from 'src/app/shared/service/log/logger.service';
import { StorageService } from 'src/app/shared/service/storage/storage.service';
import { isEqualsIgnoreCase, isNullOrUndefined } from 'src/app/shared/util/app-util';
import { environment } from 'src/environments/environment';

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
  userProfile: UserProfile;
  loginResponse: LoginResponse;
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
    private dialogService: CommonDialogService,
    private auth: AuthService,
    private storage: StorageService
  ) {
    super('HomeComponent', snackBar, logger, translation);
    this.config = configLoader.getConfigData();
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
    this.loginResponse = this.storage.getCookieData(environment.LOGIN_PERSISTENCE_NAME);
    this.userProfile = this.loginResponse as unknown as UserProfile;
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
        rtrn = isEqualsIgnoreCase(role, this.loginResponse?.roles[0]);
      }
    });
    return rtrn;
  }

  /**
   * Remove logout
   */
   logoutDialog() {
    /* Confirm dialog passed optional parameters for better data handle*/
    this.dialogService
      .confirm('LOGOUT.TITLE', 'LOGOUT.SURE_MESSAGE', 'logout', 'LOGOUT.BUTTON.LOGOUT_TEXT', 'LOGOUT.BUTTON.CANCEL', 'info')
      .subscribe(res => {
        try {
          if (res) {
            this.onLoggedOut();
            this.logger.debug(this.className, 'Logout Successfully');
            this.showMessage('Logout Successfully', '');
          }
        } catch (error) {
          this.logger.error(this.className, error);
          this.showMessage('Logout Error');
        }
      });
  }

  onLoggedOut(): void {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }

  handleDarkMode() {
    this.dataHandler.isDarkMode = !this.dataHandler.isDarkMode;
    this.storage.setLocalData('DARK_MODE', this.dataHandler.isDarkMode)
  }

  isAdmin() {
    return this.auth.isAdmin();
  }

}
