import { UserDatasource } from './../../datasource/user-datasource';
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../../../shared/class/base-component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoggerService } from '../../../shared/service/log/logger.service';
import { L10nTranslationService, L10nLocale, L10N_LOCALE } from 'angular-l10n';
import { ConfigLoaderService } from '../../../shared/service/loader/config-loader.service';
import { AppConfig } from '../../../shared/model/app-config';
import { AdminUserService } from '../../service/admin-user.service';
import { ChangeDetectionStrategy } from '@angular/core';
import { Roles, UserProfile } from 'src/app/shared/model/user-profile';
import { MediaObserver } from '@angular/flex-layout';
import { MatDialog } from '@angular/material/dialog';
import { AdminUserComponent } from '../admin-user/admin-user.component';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminUserListComponent extends BaseComponent implements OnInit {
  config: AppConfig;
  userDataSource: UserDatasource;
  isLoading: boolean;
  pageIndex: number = 0;
  pageSize: number = 10;
  userProfileList: Array<UserProfile>
  constructor(
    protected snackBar: MatSnackBar,
    protected logger: LoggerService,
    protected translation: L10nTranslationService,
    @Inject(L10N_LOCALE) public locale: L10nLocale,
    configLoader: ConfigLoaderService,
    private userService: AdminUserService,
    private ref: ChangeDetectorRef,
    private dialog: MatDialog,
    public media: MediaObserver,
  ) {
    super('AdminUserListComponent', snackBar, logger, translation);
    this.config = configLoader.getConfigData();
    this.userProfileList = new Array<UserProfile>();
    this.userDataSource = new UserDatasource(this.userService);
   }

  ngOnInit(): void {
    this.isLoading = true;
    this.userDataSource.loadUserProfile();
    this.isLoading = false;
    this.userDataSource.toList().subscribe(data => {
      this.ref.markForCheck()
      this.userProfileList = data
     }
   );
  }

  loadUserProfile() {
    this.userDataSource.loadUserProfile(this.pageIndex, this.pageSize);
  }

  toJoinString(value: Array<Roles>) {
    return value.map(it => it.name).join(', ')
  }

  manageUserDialog(user?: UserProfile) {
    let MAX_WIDTH = '80vw';
    let MIN_WIDTH = '60vw';
    let MAX_HEIGHT = 'auto';
    let MIN_HEIGHT = 'auto';
    if (this.media.isActive('xs') || this.media.isActive('sm')) {
      MAX_WIDTH = '100vw';
      MIN_WIDTH = '100vw';
      MAX_HEIGHT = '100vh';
      MIN_HEIGHT = '100vh';
    }
    const dialogRef = this.dialog.open(AdminUserComponent, {
      disableClose: true,
      maxWidth: MAX_WIDTH,
      minHeight: MIN_HEIGHT,
      minWidth: MIN_WIDTH,
      maxHeight: MAX_HEIGHT
    });
    dialogRef.componentInstance.userModel = user ? user : new UserProfile();
    dialogRef.componentInstance.isEditMode = user ? true : false;
    dialogRef.afterClosed().subscribe((result: UserProfile) => {
      if (result) {
        this.showMessage(`${result.email} ${user ? 'Updated the User.' : 'Added to the User.'}`);
        this.logger.info(this.className, `${user ? 'Updated the User.' : 'Added to the User.'}`, result.email, ' success');
        window.location.reload();
      }
    });
  }
}
