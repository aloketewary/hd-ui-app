import { Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { L10nLocale, L10nTranslationService, L10N_LOCALE } from 'angular-l10n';
import { BaseComponent } from 'src/app/shared/class/base-component';
import { AppConfig } from 'src/app/shared/model/app-config';
import { DataHandlerService } from 'src/app/shared/service/handler/data-handler.service';
import { ConfigLoaderService } from 'src/app/shared/service/loader/config-loader.service';
import { LoggerService } from 'src/app/shared/service/log/logger.service';
import { ProductUnit } from '../../models/product-unit';
import { ProductUnitService } from '../../service/product-unit.service';
import { ConfigComponent } from '../config/config.component';

@Component({
  selector: 'app-admin-product-unit',
  templateUrl: './admin-product-unit.component.html',
  styleUrls: ['./admin-product-unit.component.scss']
})
export class AdminProductUnitComponent extends BaseComponent  implements OnInit {
  productUnit: ProductUnit;
  isEditMode: boolean;
  config: AppConfig;
  productForm: FormGroup;
  constructor(
    protected snackBar: MatSnackBar,
    protected logger: LoggerService,
    protected translation: L10nTranslationService,
    @Inject(L10N_LOCALE) public locale: L10nLocale,
    configLoader: ConfigLoaderService,
    private formBuilder: FormBuilder,
    public dataHandler: DataHandlerService,
    private location: Location,
    private productUnitService: ProductUnitService,
    @Inject(MatDialogRef) public dialogRef: MatDialogRef<ConfigComponent>
  ) {
    super('AdminProductUnitComponent', snackBar, logger, translation);
    this.config = configLoader.getConfigData();
    this.productUnit = new ProductUnit();
    this.productUnit.isActive = true;
  }

  ngOnInit(): void {
    this.createForm();
    this.productForm.controls.isActive.setValue(this.productUnit.isActive ? this.productUnit.isActive : true);
    this.productForm.controls.readOnly.setValue(this.productUnit.readOnly ? this.productUnit.readOnly : false);
    this.setTitle();
  }

  setTitle(): void {

  }

  createForm(): void {
    this.productForm = this.formBuilder.group({
      name: new FormControl(this.productUnit.name, Validators.compose([Validators.required])),
      multiple: new FormControl(this.productUnit.multiple, Validators.compose([Validators.required])),
      multipleWith: new FormControl(this.productUnit.multipleWith, Validators.compose([])),
      readOnly: new FormControl(this.productUnit.readOnly, Validators.compose([])),
      unit: new FormControl(this.productUnit.unit, Validators.compose([Validators.required])),
      isActive: new FormControl(this.productUnit.isActive, Validators.compose([Validators.required]))
    });
  }

  submitHandler(): void {
    if (this.productForm.valid) {
      const bodyData = new ProductUnit()
        .withId(this.productUnit.id)
        .withName(this.productForm.controls.name.value)
        .withMultiple(this.productForm.controls.multiple.value.toFixed(2))
        .withMultipleWith(this.productForm.controls.multipleWith.value)
        .withReadOnly(this.productForm.controls.readOnly.value)
        .withUnit(this.productForm.controls.unit.value)
        .withIsActive(this.productForm.controls.isActive.value);
      if (this.isEditMode) {
        this.productUnitService.updateProductUnit<ProductUnit>(this.productUnit.id, bodyData).subscribe({
          next: data => {
            if (data) {
              this.dialogRef.close(bodyData);
            }
          }
        });
      } else {
        this.productUnitService.addNewProductUnit<ProductUnit>(bodyData).subscribe({
          next: data => {
            if (data) {
              this.dialogRef.close(bodyData);
            }
          }
        });
      }
    }
  }

  goBack(): void {
    this.location.back();
  }

}
