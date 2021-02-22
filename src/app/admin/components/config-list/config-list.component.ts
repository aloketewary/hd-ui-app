import { Component, Inject, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { L10N_LOCALE, L10nLocale, L10nTranslationService } from 'angular-l10n';
import { AppConfig } from 'src/app/shared/model/app-config';

import { BaseComponent } from '../../../shared/class/base-component';
import { CommonDialogService } from '../../../shared/service/common/dialog/common-dialog.service';
import { DataHandlerService } from '../../../shared/service/handler/data-handler.service';
import { ConfigLoaderService } from '../../../shared/service/loader/config-loader.service';
import { LoggerService } from '../../../shared/service/log/logger.service';
import { AppConfigModel } from '../../models/app-config.model';
import { ConfigService } from '../../service/config.service';
import { ConfigComponent } from '../config/config.component';

@Component({
  selector: 'app-config-list',
  templateUrl: './config-list.component.html',
  styleUrls: ['./config-list.component.scss']
})
export class ConfigListComponent extends BaseComponent implements OnInit {
  config: AppConfig;
  configModelList: Array<AppConfigModel>;
  isLoading: boolean;
  constructor(
    protected snackBar: MatSnackBar,
    protected logger: LoggerService,
    protected translation: L10nTranslationService,
    @Inject(L10N_LOCALE) public locale: L10nLocale,
    configLoader: ConfigLoaderService,
    public dataHandler: DataHandlerService,
    private configService: ConfigService,
    private dialog: MatDialog,
    public media: MediaObserver,
    private commonDialog: CommonDialogService
  ) {
    super('ConfigListComponent', snackBar, logger, translation);
    this.config = configLoader.getConfigData();
    this.configModelList = new Array<AppConfigModel>(0);
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.configService.getConfigList<AppConfigModel>('app').subscribe(data => {
      this.logger.info(this.className, `fetched data is ${data}`)
      if (data != null) {
        this.configModelList = data;
      }
      this.isLoading = false;
    });
  }

  manageConfigDialog(config?: AppConfigModel): void {
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
    const dialogRef = this.dialog.open(ConfigComponent, {
      disableClose: true,
      maxWidth: MAX_WIDTH,
      minHeight: MIN_HEIGHT,
      minWidth: MIN_WIDTH,
      maxHeight: MAX_HEIGHT
    });
    dialogRef.componentInstance.configModel = config ? config : new AppConfigModel();
    dialogRef.componentInstance.isEditMode = config ? true : false;
    dialogRef.afterClosed().subscribe((result: AppConfigModel) => {
      if (result) {
        this.showMessage(`${result.key} ${config ? 'Updated the config.' : 'Added to the list.'}`);
        this.configModelList.push(result);
        this.logger.info(this.className, 'upload files of ', result.key, ' success');
      }
    });
  }

  deleteConfig(config: AppConfigModel): void {
    this.commonDialog.confirm(
      this.translation.translate('ADMIN.CONFIG.MODAL.TITLE', { keyName: config.key }),
      this.translation.translate('ADMIN.CONFIG.MODAL.SUB_TITLE'), 'delete-alert',
      this.translation.translate('ADMIN.CONFIG.BUTTON.MODAL.DELETE'),
      this.translation.translate('ADMIN.CONFIG.BUTTON.MODAL.CANCEL')
    ).subscribe(confirmation => {
      if (confirmation) {
        this.configService.deleteConfig(config).subscribe(data => {
          if (data) {
            this.showMessage(`${config.key} removed from the list.`);
            this.configModelList.splice(this.configModelList.indexOf(config));
          }
        });
      }
    });
  }
}
