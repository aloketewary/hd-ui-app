export class Product {
  id: string;
  isActive: boolean;
  productName: string;
  buyPrice: number;
  onSale: boolean;
  onSalePrice: number;
  parentId: string;
  sellingPrice: number;
  stockTotal: number;
  variant: string;
  variantName: string;
  wholeSalePrice: number;
  unit: string;
  multiText: string;

  withBuyPrice(buyPrice: number): Product {
    this.buyPrice = buyPrice;
    return this;
  }

  withId(id: string): Product {
    this.id = id;
    return this;
  }

  withIsActive(isActive: boolean): Product {
    this.isActive = isActive;
    return this;
  }

  withOnSale(onSale: boolean): Product {
    this.onSale = onSale;
    return this;
  }

  withOnSalePrice(onSalePrice: number): Product {
    this.onSalePrice = onSalePrice;
    return this;
  }

  withParentId(parentId: string): Product {
    this.parentId = parentId;
    return this;
  }

  withSellingPrice(sellingPrice: number): Product {
    this.sellingPrice = sellingPrice;
    return this;
  }

  withStockTotal(stockTotal: number): Product {
    this.stockTotal = stockTotal;
    return this;
  }

  withVariant(variant: string): Product {
    this.variant = variant;
    return this;
  }

  withVariantName(variantName: string): Product {
    this.variantName = variantName;
    return this;
  }

  withWholeSalePrice(wholeSalePrice: number): Product {
    this.wholeSalePrice = wholeSalePrice;
    return this;
  }

  withUnit(unit: string): Product {
    this.unit = unit;
    return this;
  }

  withMultiText(multiText: string): Product {
    this.multiText = multiText;
    return this;
  }

  withPproductName(productName: string): Product {
    this.productName = productName;
    return this;
  }

}

export class ProductData {
  id: string;
  slno: number;
  isActive: boolean;
  productName: string;
  buyPrice: number;
  variantId: string;
  variantIsActive: boolean;
  onSale: boolean;
  onSalePrice: number;
  parentId: string;
  sellingPrice: number;
  stockTotal: number;
  variant: string;
  variantName: string;
  wholeSalePrice: number;
  unit: string;
  multiText: string;
}
