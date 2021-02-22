import { Component, OnInit, Inject } from '@angular/core';
import { BaseComponent } from '../../../shared/class/base-component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoggerService } from '../../../shared/service/log/logger.service';
import { L10nTranslationService, L10nLocale, L10N_LOCALE } from 'angular-l10n';
import { ConfigLoaderService } from '../../../shared/service/loader/config-loader.service';
import { AppConfig } from '../../../shared/model/app-config';
import { AppConfigModel } from '../../models/app-config.model';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.scss']
})
export class AdminUserListComponent extends BaseComponent implements OnInit {
  config: AppConfig;
  configModelList: Array<AppConfigModel>;
  isLoading: boolean;
  constructor(
    protected snackBar: MatSnackBar,
    protected logger: LoggerService,
    protected translation: L10nTranslationService,
    @Inject(L10N_LOCALE) public locale: L10nLocale,
    configLoader: ConfigLoaderService,
  ) {
    super('AdminUserListComponent', snackBar, logger, translation);
    this.config = configLoader.getConfigData();
    this.configModelList = [];
   }

  ngOnInit(): void {
  }

}
