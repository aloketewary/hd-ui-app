import { Component, OnInit, Inject, ViewChild, OnDestroy } from '@angular/core';
import { ConfigLoaderService } from '../../../shared/service/loader/config-loader.service';
import { L10nLocale, L10nTranslationService, L10N_LOCALE } from 'angular-l10n';
import { LoggerService } from '../../../shared/service/log/logger.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConfig } from '../../../shared/model/app-config';
import { BaseComponent } from '../../../shared/class/base-component';
import { ProductService } from '../../service/product.service';
import { Product, ProductData } from '../../models/product';
import { animate, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { DataHandlerService } from '../../../shared/service/handler/data-handler.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { CommonDialogService } from 'src/app/shared/service/common/dialog/common-dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { MediaObserver } from '@angular/flex-layout';
import { AppConfigModel } from '../../models/app-config.model';
import { AdminPriceManagerComponent } from '../admin-price-manager/admin-price-manager.component';
import { FilesUploadComponent } from '../files-upload/files-upload.component';
import { FilesModel } from 'src/app/shared/model/files-model.model';

@Component({
  selector: 'app-admin-price-list',
  templateUrl: './admin-price-list.component.html',
  styleUrls: ['./admin-price-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter', [
          style({ opacity: 0 }),
          stagger(100, [
            animate('0.5s', style({ opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ])
  ],
})
export class AdminPriceListComponent extends BaseComponent implements OnInit, OnDestroy {
  config: AppConfig;
  isLoading: boolean;
  productList: Array<Product>;
  productDataList: Array<ProductData>;
  dataSource: MatTableDataSource<ProductData>;
  columns: any[];
  private rIndex = 0;
  displayedColumns: any[];
  expandedElement: ProductData;
  private paginator: MatPaginator;
  private sort: MatSort;
  selection = new SelectionModel<ProductData>(true, []);
  public isSearch: boolean;
  constructor(
    protected snackBar: MatSnackBar,
    protected logger: LoggerService,
    protected translation: L10nTranslationService,
    @Inject(L10N_LOCALE) public locale: L10nLocale,
    configLoader: ConfigLoaderService,
    private productService: ProductService,
    public dataHandler: DataHandlerService,
    private commonDialog: CommonDialogService,
    private dialog: MatDialog,
    public media: MediaObserver,
  ) {
    super('AdminPriceListComponent', snackBar, logger, translation);
    this.config = configLoader.getConfigData();
    this.productList = [];
    this.productDataList = [];
    this.dataSource = new MatTableDataSource(this.productDataList);
  }

  ngOnInit(): void {
    this.columns = [
      {
        columnDef: 'select', header: this.translation.translate('ADMIN.PRODUCT.SELECT'),
        cell: (element: ProductData) => `${element.slno}`
      },
      {
        columnDef: 'slno', header: this.translation.translate('ADMIN.PRODUCT.SL_NO'),
        cell: (element: ProductData) => `${element.slno}`
      },
      {
        columnDef: 'productName', header: this.translation.translate('ADMIN.PRODUCT.NAME'),
        cell: (element: ProductData) => `${element.productName}`
      },
      {
        columnDef: 'buyPrice', header: this.translation.translate('ADMIN.PRODUCT.BUY_PRICE'),
        cell: (element: ProductData) => `${element.buyPrice}`
      },
      {
        columnDef: 'wholeSalePrice', header: this.translation.translate('ADMIN.PRODUCT.WHOLE_SALE_PRICE'),
        cell: (element: ProductData) => `${element.wholeSalePrice}`
      },
      {
        columnDef: 'stockTotal', header: this.translation.translate('ADMIN.PRODUCT.STOCK'),
        cell: (element: ProductData) => `${element.stockTotal}`
      },
      {
        columnDef: 'sellingPrice', header: this.translation.translate('ADMIN.PRODUCT.SELLING_PRICE'),
        cell: (element: ProductData) => `${element.sellingPrice}`
      },
    ];
    this.displayedColumns = this.columns.map(c => c.columnDef);
    this.getServerData();
  }

  @ViewChild(MatSort, { static: false }) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator, { static: false }) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    this.dataSource.disconnect();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ProductData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }

  deleteProduct(row: ProductData): void {
    this.commonDialog.confirm(
      this.translation.translate('ADMIN.PRODUCT.MODAL.TITLE', { keyName: row.productName }),
      this.translation.translate('ADMIN.PRODUCT.MODAL.SUB_TITLE'), 'delete-alert',
      this.translation.translate('ADMIN.PRODUCT.BUTTON.MODAL.DELETE'),
      this.translation.translate('ADMIN.PRODUCT.BUTTON.MODAL.CANCEL')
    ).subscribe(confirmation => {
      if (confirmation) {
        this.productService.deleteProduct(row).subscribe(data => {
          if (data) {
            this.showMessage(`${row.productName} removed from the list.`);
            this.getServerData();
          }
        });
      }
    });
  }

  getServerData(): void {
    this.productService.getProductList<Product>().subscribe(data => {
      if (data != null) {
        this.productDataList = [];
        this.productList = data;
        this.productList.forEach(element => {
          const productData = new ProductData();
          productData.id = element.id;
          productData.slno = this.rIndex += 1;
          productData.productName = element.productName;
          productData.buyPrice = element.productVariant.buyPrice;
          productData.variantId = element.productVariant.id;
          productData.variantIsActive = element.productVariant.isActive;
          productData.onSale = element.productVariant.onSale;
          productData.onSalePrice = element.productVariant.onSalePrice;
          productData.parentId = element.productVariant.parentId;
          productData.sellingPrice = element.productVariant.sellingPrice;
          productData.stockTotal = element.productVariant.stockTotal;
          productData.variant = element.productVariant.variant;
          productData.variantName = element.productVariant.variantName;
          productData.wholeSalePrice = element.productVariant.wholeSalePrice;
          productData.unit = element.productVariant.unit;
          productData.multiText = element.productVariant.multiText;
          productData.isActive = element.isActive;
          this.productDataList.push(productData);
        });
        this.dataSource.data = this.productDataList;
        this.selection.clear();
      }
    });
  }

  manageProductDialog(productModel?: ProductData): void {
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
    const dialogRef = this.dialog.open(AdminPriceManagerComponent, {
      disableClose: true,
      maxWidth: MAX_WIDTH,
      minHeight: MIN_HEIGHT,
      minWidth: MIN_WIDTH,
      maxHeight: MAX_HEIGHT
    });
    dialogRef.componentInstance.productModel = productModel ? productModel : new ProductData();
    dialogRef.componentInstance.isEditMode = productModel ? true : false;
    dialogRef.afterClosed().subscribe((result: ProductData) => {
      if (result) {
        this.showMessage(`${result.productName} ${productModel ? 'Updated the Product.' : 'Product added.'}`);
        this.getServerData();
        this.logger.info(this.className, 'upload files of ', result.productName, ' success');
      }
    });
  }

  deleteListProduct(): void {
    this.commonDialog.confirm(
      this.translation.translate('ADMIN.PRODUCT.MODAL.TITLE', { keyName: 'Products' }),
      this.translation.translate('ADMIN.PRODUCT.MODAL.SUB_TITLE'), 'delete-alert',
      this.translation.translate('ADMIN.PRODUCT.BUTTON.MODAL.DELETE'),
      this.translation.translate('ADMIN.PRODUCT.BUTTON.MODAL.CANCEL')
    ).subscribe(confirmation => {
      if (confirmation) {
        const ids = this.selection.selected.map(val => val.id);
        this.productService.deleteAllProduct<ProductData>(ids).subscribe(data => {
          if (data) {
            this.showMessage(`${ids} removed from the list.`);
            this.getServerData();
          }
        });
      }
    });
  }

  uploadFileDialog(): void {
    let maxWidth = '80vw';
    let minWidth = '60vw';
    let maxHeight = 'auto';
    let minHeight = 'auto';
    if (this.media.isActive('xs') || this.media.isActive('sm')) {
      maxWidth = '100vw';
      minWidth = '100vw';
      maxHeight = '100vh';
      minHeight = '100vh';
    }
    const dialogRef = this.dialog.open(FilesUploadComponent, {
      disableClose: true,
      maxWidth,
      minHeight,
      minWidth,
      maxHeight
    });
    dialogRef.componentInstance.config = this.config;
    dialogRef.afterClosed().subscribe((result: FilesModel) => {
      if (result) {
        this.getServerData();
        this.showMessage(`${result.fileName} Added to the list.`);
        this.logger.info(this.className, 'upload files of ', result.fileName, ' success');
      }
    });
  }
}
