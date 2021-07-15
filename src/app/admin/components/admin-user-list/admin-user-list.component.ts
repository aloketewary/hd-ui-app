import { UserCdkDatasource } from './../../datasource/user-cdk-datasource';
import { tap } from 'rxjs/operators';
import { UserDatasource } from './../../datasource/user-datasource';
import { Component, OnInit, Inject, ViewChild, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../../../shared/class/base-component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoggerService } from '../../../shared/service/log/logger.service';
import { L10nTranslationService, L10nLocale, L10N_LOCALE } from 'angular-l10n';
import { ConfigLoaderService } from '../../../shared/service/loader/config-loader.service';
import { AppConfig } from '../../../shared/model/app-config';
import { AdminUserService } from '../../service/admin-user.service';
import { MatPaginator } from '@angular/material/paginator';
import { ChangeDetectionStrategy } from '@angular/core';
import { Roles, UserProfile } from 'src/app/shared/model/user-profile';

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
    private ref: ChangeDetectorRef
  ) {
    super('AdminUserListComponent', snackBar, logger, translation);
    this.config = configLoader.getConfigData();
    this.userProfileList = new Array<UserProfile>()
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

  ngAfterViewInit() {
    // this.userDataSource.counter$
    //   .pipe(
    //     tap((count) => {
    //       this.paginator.length = count;
    //     })
    //   )
    //   .subscribe();

    // this.paginator.page
    //   .pipe(
    //     tap(() => this.loadUserProfile())
    //   )
    //   .subscribe();

  }

  loadUserProfile() {
    this.userDataSource.loadUserProfile(this.pageIndex, this.pageSize);
  }

  toJoinString(value: Array<Roles>) {
    return value.map(it => it.name).join(', ')
  }
}
