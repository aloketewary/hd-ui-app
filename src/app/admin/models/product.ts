export class Product {
  id: string;
  isActive: boolean;
  productName: string;
  productVariant: ProductVariant;
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
}
