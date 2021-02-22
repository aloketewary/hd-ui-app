import { Component, OnInit, Inject } from '@angular/core';
import { ConfigLoaderService } from '../../../shared/service/loader/config-loader.service';
import { L10nLocale, L10nTranslationService, L10N_LOCALE } from 'angular-l10n';
import { LoggerService } from '../../../shared/service/log/logger.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConfigModel } from '../../models/app-config.model';
import { AppConfig } from '../../../shared/model/app-config';
import { BaseComponent } from '../../../shared/class/base-component';

@Component({
  selector: 'app-admin-price-list',
  templateUrl: './admin-price-list.component.html',
  styleUrls: ['./admin-price-list.component.scss']
})
export class AdminPriceListComponent extends BaseComponent implements OnInit {
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
    super('AdminPriceListComponent', snackBar, logger, translation);
    this.config = configLoader.getConfigData();
    this.configModelList = [];
   }

  ngOnInit(): void {
  }

}
