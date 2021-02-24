import { Injectable } from '@angular/core';
import { AppConfig } from 'src/app/shared/model/app-config';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoggerService } from '../../shared/service/log/logger.service';
import { ConfigLoaderService } from '../../shared/service/loader/config-loader.service';
import { AbstractHttpService } from 'src/app/shared/service/http/abstract-http.service';
import { Observable } from 'rxjs';
import { Product, ProductData } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends AbstractHttpService {
  config: AppConfig;
  constructor(
    protected http: HttpClient,
    protected snackBar: MatSnackBar,
    protected logger: LoggerService,
    configLoader: ConfigLoaderService
  ) {
    super('ProductService', http, snackBar, logger);
    this.config = configLoader.getConfigData();
  }

  getProductList<T>(): Observable<T[]> {
    // tslint:disable-next-line:max-line-length
    const url = `${this.config.ROOT_URL + this.config.API_VERSION + this.config.PRODUCT_ROOT_URL}`;
    return this.getCallReturnList<T>(url, this.config.RETRY_TIME,
      `(getProductList) fetched available product list `);
  }

  deleteProduct<T>(product: ProductData): Observable<boolean> {
     // tslint:disable-next-line:max-line-length
     const url = `${this.config.ROOT_URL + this.config.API_VERSION + this.config.PRODUCT_ROOT_URL}/${product.id}`;
     return this.deleteCallReturnBoolean<T>(url, this.config.RETRY_TIME,
       `(deleteProduct) delete product`);
  }

  updateProduct<T>(id: string, product: Product): Observable<T> {
    // tslint:disable-next-line:max-line-length
    const url = `${this.config.ROOT_URL + this.config.API_VERSION + this.config.PRODUCT_ROOT_URL}`;
    return this.patchCallReturnObject<T, Product>(url, product, this.config.RETRY_TIME,
      `(updateProduct) fetched available product list `);
  }

  addNewProduct<T>(product: Product): Observable<T> {
    // tslint:disable-next-line:max-line-length
    const url = `${this.config.ROOT_URL + this.config.API_VERSION + this.config.PRODUCT_MANAGE_URL}`;
    return this.postCallReturnObject<T, Product>(url, product, this.config.RETRY_TIME,
      `(addNewProduct) fetched available product list `);
  }
}
