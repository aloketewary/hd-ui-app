import { AfterViewChecked, AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { L10nLocale, L10nTranslationService, L10N_LOCALE } from 'angular-l10n';
import { BaseComponent } from 'src/app/shared/class/base-component';
import { AppConfig } from 'src/app/shared/model/app-config';
import { DataHandlerService } from 'src/app/shared/service/handler/data-handler.service';
import { ConfigLoaderService } from 'src/app/shared/service/loader/config-loader.service';
import { LoggerService } from 'src/app/shared/service/log/logger.service';
import { Product, ProductData, ProductVariant } from '../../models/product';
import { ProductUnit } from '../../models/product-unit';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-admin-price-manager',
  templateUrl: './admin-price-manager.component.html',
  styleUrls: ['./admin-price-manager.component.scss']
})
export class AdminPriceManagerComponent extends BaseComponent implements OnInit, AfterViewInit {
  config: AppConfig;
  productModel: ProductData;
  isEditMode: boolean;
  productForm: FormGroup;
  addOrEditText: string;
  constructor(
    protected snackBar: MatSnackBar,
    protected logger: LoggerService,
    protected translation: L10nTranslationService,
    @Inject(L10N_LOCALE) public locale: L10nLocale,
    configLoader: ConfigLoaderService,
    public dataHandler: DataHandlerService,
    @Inject(MatDialogRef) public dialogRef: MatDialogRef<AdminPriceManagerComponent>,
    private formBuilder: FormBuilder,
    private productService: ProductService,
  ) {
    super('AdminPriceManagerComponent', snackBar, logger, translation);
    this.config = configLoader.getConfigData();
    this.addOrEditText = this.isEditMode ? 'Edit' : 'Add';
   }

  ngOnInit(): void {
    this.createForm();
  }

  ngAfterViewInit(): void {
    this.productForm.controls.isActive.setValue(this.isEditMode ? this.productModel?.isActive : true);
    this.productForm.controls.onSale.setValue(this.isEditMode ? this.productModel?.onSale : false);
  }

  createForm(): void {
    this.productForm = this.formBuilder.group({
      productName: new FormControl(this.productModel.productName, Validators.compose([Validators.required])),
      buyPrice: new FormControl(this.productModel.buyPrice, Validators.compose([Validators.required])),
      variantId: new FormControl(this.productModel.variantId, Validators.compose([])),
      variantIsActive: new FormControl(this.productModel.variantIsActive, Validators.compose([])),
      onSale: new FormControl(this.productModel.onSale, Validators.compose([Validators.required])),
      onSalePrice: new FormControl(this.productModel.onSalePrice, Validators.compose([Validators.required])),
      parentId: new FormControl(this.productModel.parentId, Validators.compose([Validators.required])),
      sellingPrice: new FormControl(this.productModel.sellingPrice, Validators.compose([Validators.required])),
      stockTotal: new FormControl(this.productModel.stockTotal, Validators.compose([Validators.required])),
      variant: new FormControl(this.productModel.variant, Validators.compose([Validators.required])),
      variantName: new FormControl(this.productModel.variantName, Validators.compose([Validators.required])),
      wholeSalePrice: new FormControl(this.productModel.wholeSalePrice, Validators.compose([Validators.required])),
      isActive: new FormControl(this.productModel.isActive, Validators.compose([])),
      unit: new FormControl(this.productModel.unit, Validators.compose([])),
      multiText: new FormControl(this.productModel.multiText, Validators.compose([]))
    });
  }

  submitHandler(): void {
    if (this.productForm.valid) {
      const productVariant = new ProductVariant()
      .withBuyPrice(this.productForm.controls.buyPrice.value)
      .withId(this.productModel.variantId)
      .withIsActive(this.isEditMode ? this.productModel.variantIsActive : true)
      .withOnSale(this.productForm.controls.onSale.value)
      .withOnSalePrice(this.productForm.controls.onSalePrice.value)
      .withParentId(this.productForm.controls.parentId.value)
      .withSellingPrice(this.productForm.controls.sellingPrice.value)
      .withStockTotal(this.productForm.controls.stockTotal.value)
      .withVariant(this.productForm.controls.variant.value)
      .withVariantName(this.productForm.controls.variantName.value)
      .withWholeSalePrice(this.productForm.controls.wholeSalePrice.value)
      .withUnit(this.productForm.controls.unit.value)
      .withMultiText('');
      const bodyData = new Product()
        .withId(this.productModel.id)
        .withPproductName(this.productForm.controls.productName.value)
        .withProductVariant(productVariant)
        .withIsActive(this.productForm.controls.isActive.value);
      if (this.isEditMode) {
        this.productService.updateProduct<Product>(this.productModel.id, bodyData).subscribe(data => {
          if (data) {
            this.dialogRef.close(bodyData);
          }
        });
      } else {
        this.productService.addNewProduct<Product>(bodyData).subscribe(data => {
          if (data) {
            this.dialogRef.close(bodyData);
          }
        });
      }
    }
  }

}
