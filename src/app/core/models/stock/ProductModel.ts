export interface ProductListOutput {
  productId: number;
  productCode: string;
  productName: string;
  mainImageFileId?: number;
  productTypeId?: number;
  productTypeName: string;
  productCateId: number;
  productCateName: string;
  barcode: string;
  specification: string;
  unitId: number;
  unitName: string;
  checked?: boolean;

  stockProductModelList: StockProductOutput[]
}

export interface StockProductOutput {
    stockId: number;

    productId: number;

    primaryUnitId: number;

    primaryQuantityRemaining: number;

    productUnitConversionId: number;

    productUnitConversionRemaining: number;
}

export interface ProductModel {
  productId?: number;
  productCode: string;
  productName: string;
  isCanBuy: boolean;
  isCanSell: boolean;
  mainImageFileId?: number;
  productTypeId?: number;
  productCateId: number;
  barcodeConfigId?: number;
  barcodeStandardId?: number;
  barcode: string;
  unitId: number;
  estimatePrice: number;
  extra: ProductExtra;
  long: number;
  width: number;
  height: number;
  packingMethod: string;
  customerId: number;
  netWeight: number;
  grossWeight: number;
  measurement: number;
  loadAbility: number;
  quantitative?: number;
  quantitativeUnitTypeId?: number;

  productDescription: string;
  productNameEng: string;
  stockInfo: ProductStockInfo;
}

export interface ProductExtra {
  specification: string;
  description: string;
}

export interface ProductStockInfo {
  stockOutputRuleId?: number;
  amountWarningMin?: number;
  amountWarningMax?: number;
  timeWarningAmount?: number;
  expireTimeAmount?: number;
  expireTimeTypeId?: number;
  timeWarningTimeTypeId?: number;
  descriptionToStock: string;
  stockIds: number[];
  unitConversions: ProductUnitConversion[];
}

export interface ProductUnitConversion {
  productUnitConversionId: number;
  productUnitConversionName: string;
  secondaryUnitId: number;
  factorExpression: string;
  conversionDescription: string;
  isDefault: boolean;
}

export interface EntityField {
  fieldName: string;
  title: string;
}

export interface ProductBomOutput {
  productBomId?: number;
  level?: number;
  productId?: number;
  childProductId?: number;
  productCode?: string;
  productName?: string;
  specification?: string;
  quantity?: number;
  wastage?: number;
  description?: string;
  isMaterial: boolean;
  total?: number;
  unitName?: string;
  isExpand?: boolean;
  isShow?: boolean;
  pathProductIds?: string;
  child?: any;
  numberOrder?: string;
  isMaterialEdit?: boolean;

  //additional data
  neededQuantity?: number;
}

export interface ProductBomModel {
  productBoms: ProductBomOutput[];
  productMaterials: ProductMaterialModel[];
}

export interface ProductMaterialModel {
  rootProductId: number;
  pathProductIds: string;
  productId: number;
}

export interface ProductAttachmentModel {
  productAttachmentId: number;
  productId: number;
  attachmentFileId: number;  
  title: string;
  name: string;

  //addition
  url: string;
}
