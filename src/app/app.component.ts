import { DataHandlerService } from './shared/service/handler/data-handler.service';
import {
  L10N_CONFIG, L10N_LOCALE, L10nConfig, L10nLocale, L10nTranslationService
} from 'angular-l10n';
import { Observable } from 'rxjs';

import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BaseComponent } from './shared/class/base-component';
import { LoggerService } from './shared/service/log/logger.service';
import { environment } from 'src/environments/environment';
import { MenuLoaderService } from './shared/service/loader/menu-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent implements OnInit {
  schema = this.l10nConfig.schema;

  constructor(
    public snackBar: MatSnackBar,
    public logger: LoggerService,
    public translation: L10nTranslationService,
    @Inject(L10N_LOCALE) public locale: L10nLocale,
    @Inject(L10N_CONFIG) private l10nConfig: L10nConfig,
    public dataHandler: DataHandlerService,
    private menuLoader: MenuLoaderService
  ) {
    super('AppComponent', snackBar, logger, translation);
  }

  ngOnInit(): void {
    this.translation.onChange().subscribe({
      next: (locale: L10nLocale) => this.logger.info(this.className, locale.language)
    });
    this.translation.onError().subscribe({
      next: (error: any) => {
        if (error) {
          this.logger.error(this.className, error);
        }
      }
    });

    this.dataHandler.projectName = this.translation.translate('APP.PROJECT_NAME') || 'HardWare Dash';

    this.dataHandler.showRequiredMarker = true;
    this.dataHandler.textAreaMaxRows = 4;
    this.dataHandler.textAreaMinRows = 4;
    this.dataHandler.tablePageSize = environment.TABLE_PAGE_SIZE;
    this.getMenuList();
  }

  getMenuList(): void {
    this.menuLoader.load();
  }
}
