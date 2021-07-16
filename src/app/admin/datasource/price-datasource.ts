import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { PageableResponse } from "src/app/shared/model/pageable-response";
import { Product, ProductData } from "../models/product";
import { ProductService } from "../service/product.service";

export class PriceDatasource implements DataSource<ProductData>{
  private productSubject = new BehaviorSubject<ProductData[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  private countSubject = new BehaviorSubject<number>(0);
  public counter$ = this.countSubject.asObservable();
  constructor(private productService: ProductService) { }

  connect(collectionViewer: CollectionViewer): Observable<ProductData[]> {
    return this.productSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.productSubject.complete();
    this.loadingSubject.complete();
    this.countSubject.complete();
  }

  loadProductList(filter: string, sortDirection: string, pageNumber: number, pageSize: number) {
    this.loadingSubject.next(true);
    this.productService.getPageableProductList<Product>(filter, sortDirection, pageNumber, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((result: PageableResponse<Product>) => {
        if (result != null) {
          const productDataList = new Array<ProductData>();
          result.content.forEach((element, rIndex) => {
            const productData = new ProductData();
            productData.id = element.id;
            productData.slno = (pageNumber * pageSize) + rIndex + 1;
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
            productDataList.push(productData);
          });
          this.productSubject.next(productDataList);
          this.countSubject.next(result.totalElements);
        }
      }
      );
  }
  length() {
    return this.productSubject.next.length;
  }

  toList() {
    return this.productSubject.asObservable();
  }
}
