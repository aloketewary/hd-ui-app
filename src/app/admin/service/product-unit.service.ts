import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/shared/model/app-config';
import { AbstractHttpService } from 'src/app/shared/service/http/abstract-http.service';
import { ConfigLoaderService } from 'src/app/shared/service/loader/config-loader.service';
import { LoggerService } from 'src/app/shared/service/log/logger.service';
import { ProductUnit } from '../models/product-unit';

@Injectable({
  providedIn: 'root'
})
export class ProductUnitService extends AbstractHttpService {
  config: AppConfig;
  constructor(
    protected http: HttpClient,
    protected snackBar: MatSnackBar,
    protected logger: LoggerService,
    configLoader: ConfigLoaderService
  ) {
    super('ProductUnitService', http, snackBar, logger);
    this.config = configLoader.getConfigData();
  }

  getProductUnitList<T>(): Observable<T[]> {
    // tslint:disable-next-line:max-line-length
    const url = `${this.config.ROOT_URL + this.config.API_VERSION + this.config.PRODUCT_UNIT_URL}`;
    return this.getCallReturnList<T>(url, this.config.RETRY_TIME,
      `(getProductUnitList) fetched available product unit list`);
  }

  addNewProductUnit<T>(unit: ProductUnit): Observable<boolean> {
    // tslint:disable-next-line:max-line-length
    const url = `${this.config.ROOT_URL + this.config.API_VERSION + this.config.PRODUCT_UNIT_URL}`;
    const bodyData = {
      name: unit.name,
      readOnly: unit.readOnly,
      isActive: unit.isActive,
      multiple: unit.multiple,
      multipleWith: unit.multipleWith,
      unit: unit.unit
    };
    return this.postCallReturnBoolean<T, {
      name: string,
      readOnly: boolean,
      isActive: boolean,
      multiple: number,
      multipleWith: string,
      unit: string
    }>(url, bodyData, this.config.RETRY_TIME,
      `(addNewProductUnit) Added new Product Unit for ${unit.name}`);
  }

  deleteProductUnit<T>(unit: ProductUnit): Observable<boolean> {
    // tslint:disable-next-line:max-line-length
    const url = `${this.config.ROOT_URL + this.config.API_VERSION + this.config.PRODUCT_UNIT_URL}/${unit.id}`;
    return this.deleteCallReturnBoolean<T>(url, this.config.RETRY_TIME,
      `(deleteConfig) Delete Product Unit for ${unit.id}`);
  }

  updateProductUnit<T>(unitId: string, unit: ProductUnit): Observable<T | null> {
    // tslint:disable-next-line:max-line-length
    const url = `${this.config.ROOT_URL + this.config.API_VERSION + this.config.PRODUCT_UNIT_URL}/${unitId}`;
    const bodyData = {
      name: unit.name,
      readOnly: unit.readOnly,
      is_active: unit.isActive,
      multiple: unit.multiple,
      multipleWith: unit.multipleWith,
      unit: unit.unit
    };
    return this.patchCallReturnObject<T, {
      name: string,
      readOnly: boolean,
      is_active: boolean,
      multiple: number,
      multipleWith: string,
      unit: string
    }>(url, bodyData, this.config.RETRY_TIME,
      `(updateConfig) updated existing product unit for ${unitId}`);
  }
}
