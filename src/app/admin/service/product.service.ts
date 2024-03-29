import { Injectable } from '@angular/core';
import { AppConfig } from 'src/app/shared/model/app-config';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoggerService } from '../../shared/service/log/logger.service';
import { ConfigLoaderService } from '../../shared/service/loader/config-loader.service';
import { AbstractHttpService } from 'src/app/shared/service/http/abstract-http.service';
import { Observable } from 'rxjs';
import { Product, ProductData } from '../models/product';
import { PageableResponse } from 'src/app/shared/model/pageable-response';
import { retry, map, tap } from 'rxjs/operators';
import { CommonResponse } from 'src/app/shared/model/common-response';

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
     const url = `${this.config.ROOT_URL + this.config.API_VERSION + this.config.PRODUCT_MANAGE_URL}/${product.id}`;
     return this.deleteCallReturnBoolean<T>(url, this.config.RETRY_TIME,
       `(deleteProduct) delete product`);
  }

  updateProduct<T>(id: string, product: Product): Observable<T> {
    // tslint:disable-next-line:max-line-length
    const url = `${this.config.ROOT_URL + this.config.API_VERSION + this.config.PRODUCT_MANAGE_URL}/${id}`;
    return this.patchCallReturnObject<T, Product>(url, product, this.config.RETRY_TIME,
      `(updateProduct) update product list `);
  }

  addNewProduct<T>(product: Product): Observable<T> {
    // tslint:disable-next-line:max-line-length
    const url = `${this.config.ROOT_URL + this.config.API_VERSION + this.config.PRODUCT_MANAGE_URL}`;
    return this.postCallReturnObject<T, Product>(url, product, this.config.RETRY_TIME,
      `(addNewProduct) add new product list `);
  }

  deleteAllProduct<T>(id: string[]): Observable<T[]> {
    const ids = id.join(',');
    // tslint:disable-next-line:max-line-length
    const url = `${this.config.ROOT_URL + this.config.API_VERSION + this.config.PRODUCT_BULK_URL}/${ids}`;
    return this.deleteCallReturnList<T>(url, this.config.RETRY_TIME,
      `(deleteAllProduct) delete product list`);
 }

 getPageableProductList<T>(filter: string, sortDirection: string, pageNumber: number, pageSize: number): Observable<PageableResponse<T>> {
  // tslint:disable-next-line:max-line-length
  const url = `${this.config.ROOT_URL + this.config.API_VERSION + this.config.PRODUCT_URL_PAGEABLE}?filter=${filter}&page=${pageNumber}&size=${pageSize}&sortOrder=${sortDirection}`;
  return this.http.get<CommonResponse<PageableResponse<T>>>(url).pipe(
    retry( this.config.RETRY_TIME),
    map((data: CommonResponse<PageableResponse<T>>) => {
      if (data.success) {
        return data.result as PageableResponse<T>;
      }
      this.showMessage(data.desc);
      return data.result as PageableResponse<T>;
    }),
    tap((t: PageableResponse<T>) => {
      return this.logger.info(this.className, 'Get Users list', t);
    }),
  );
}

}
