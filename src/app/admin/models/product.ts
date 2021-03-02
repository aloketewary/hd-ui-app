export class Product {
  id: string;
  isActive: boolean;
  productName: string;
  productVariant: ProductVariant;

  withId(id: string): Product {
    this.id = id;
    return this;
  }
  withIsActive(isActive: boolean): Product {
    this.isActive = isActive;
    return this;
  }
  withPproductName(productName: string): Product {
    this.productName = productName;
    return this;
  }
  withProductVariant(productVariant: ProductVariant): Product {
    this.productVariant = productVariant;
    return this;
  }
}

export class ProductVariant {
  buyPrice: number;
  id: string;
  isActive: boolean;
  onSale: boolean;
  onSalePrice: number;
  parentId: string;
  sellingPrice: number;
  stockTotal: number;
  variant: string;
  variantName: string;
  wholeSalePrice: number;
  buyPriceUnit: string;
  sellingPriceUnit: string;

  withBuyPrice(buyPrice: number): ProductVariant {
    this.buyPrice = buyPrice;
    return this;
  }

  withId(id: string): ProductVariant {
    this.id = id;
    return this;
  }

  withIsActive(isActive: boolean): ProductVariant {
    this.isActive = isActive;
    return this;
  }

  withOnSale(onSale: boolean): ProductVariant {
    this.onSale = onSale;
    return this;
  }

  withOnSalePrice(onSalePrice: number): ProductVariant {
    this.onSalePrice = onSalePrice;
    return this;
  }

  withParentId(parentId: string): ProductVariant {
    this.parentId = parentId;
    return this;
  }

  withSellingPrice(sellingPrice: number): ProductVariant {
    this.sellingPrice = sellingPrice;
    return this;
  }

  withStockTotal(stockTotal: number): ProductVariant {
    this.stockTotal = stockTotal;
    return this;
  }

  withVariant(variant: string): ProductVariant {
    this.variant = variant;
    return this;
  }

  withVariantName(variantName: string): ProductVariant {
    this.variantName = variantName;
    return this;
  }

  withWholeSalePrice(wholeSalePrice: number): ProductVariant {
    this.wholeSalePrice = wholeSalePrice;
    return this;
  }

  withBuyPriceUnit(buyPriceUnit: string): ProductVariant {
    this.buyPriceUnit = buyPriceUnit;
    return this;
  }

  withSellingPriceUnit(sellingPriceUnit: string): ProductVariant {
    this.sellingPriceUnit = sellingPriceUnit;
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
  buyPriceUnit: string;
  sellingPriceUnit: string;
}
