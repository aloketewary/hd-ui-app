import { Component, Inject, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { L10nLocale, L10nTranslationService, L10N_LOCALE } from 'angular-l10n';
import { BaseComponent } from 'src/app/shared/class/base-component';
import { AppConfig } from 'src/app/shared/model/app-config';
import { DataHandlerService } from 'src/app/shared/service/handler/data-handler.service';
import { ConfigLoaderService } from 'src/app/shared/service/loader/config-loader.service';
import { LoggerService } from 'src/app/shared/service/log/logger.service';
import { ProductUnit } from '../../models/product-unit';
import { ProductUnitService } from '../../service/product-unit.service';
import { AdminProductUnitComponent } from '../admin-product-unit/admin-product-unit.component';

@Component({
  selector: 'app-admin-product-unit-list',
  templateUrl: './admin-product-unit-list.component.html',
  styleUrls: ['./admin-product-unit-list.component.scss']
})
export class AdminProductUnitListComponent extends BaseComponent implements OnInit {

  config: AppConfig;
  productUnitList: Array<ProductUnit>;
  isLoading: boolean;
  constructor(
    protected snackBar: MatSnackBar,
    protected logger: LoggerService,
    protected translation: L10nTranslationService,
    @Inject(L10N_LOCALE) public locale: L10nLocale,
    configLoader: ConfigLoaderService,
    public dataHandler: DataHandlerService,
    private dialog: MatDialog,
    public media: MediaObserver,
    private productUnitService: ProductUnitService
  ) {
    super('AdminProductUnitListComponent', snackBar, logger, translation);
    this.config = configLoader.getConfigData();
    this.productUnitList = new Array<ProductUnit>(0);
  }

  ngOnInit(): void {
    this.fetchServiceData();
  }

  fetchServiceData(): void {
    this.isLoading = true;
    this.productUnitService.getProductUnitList<ProductUnit>().subscribe(data => {
      this.logger.info(this.className, `fetched data is ${data}`);
      if (data != null) {
        this.productUnitList = data;
      }
      this.isLoading = false;
    });
  }

  manageProductUnitDialog(unit?: ProductUnit): void {
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
    const dialogRef = this.dialog.open(AdminProductUnitComponent, {
      disableClose: true,
      maxWidth: MAX_WIDTH,
      minHeight: MIN_HEIGHT,
      minWidth: MIN_WIDTH,
      maxHeight: MAX_HEIGHT
    });
    dialogRef.componentInstance.productUnit = unit ? unit : new ProductUnit();
    dialogRef.componentInstance.isEditMode = unit ? true : false;
    dialogRef.afterClosed().subscribe((result: ProductUnit) => {
      if (result) {
        this.showMessage(`${result.name} ${unit ? 'Updated the Unit.' : 'Added to the list.'}`);
        this.productUnitList.push(result);
        this.logger.info(this.className, 'upload files of ', result.name, ' success');
      }
    });
  }

  deleteConfig(config){

  }

}
