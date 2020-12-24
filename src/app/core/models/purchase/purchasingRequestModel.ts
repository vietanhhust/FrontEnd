import { ProductListOutput } from "../stock/ProductModel";

export interface PurchasingRequestListOutput {
  total: number;
  list: [
    {
      purchasingRequestId: number;
      purchasingRequestCode: string;
      purchasingRequestStatusId: number;
      poProcessStatusId: number;
      orderCode: string;
      productionOrderCode: string;
      date: number;
      content: string;
      isApproved: boolean;
      createdByUserId: number;
      createdByUser?: string;
      updatedByUserId: number;
      censorByUserId: number;
      censorByUser?: string;
      createdDatetimeUtc: number;
      updatedDatetimeUtc: number;
    }
  ];
}
export interface PurchasingRequestOutputDetail {
  purchasingRequestDetailId: number;
  purchasingRequestId: number;
  productId: number;
  primaryUnitId: number;
  primaryQuantity: number;
  createdDatetime: string;
  updatedDatetime: string;
  productName: string;
  productCode: string;
  primaryUnitName: string;
}
export interface PurchasingRequestModel {
  purchasingRequestId: number;
  purchasingRequestCode: string;
  purchasingRequestStatusId: number;
  poProcessStatusId: number;
  orderCode: string;
  productionOrderCode: string;
  date: number;
  content: string;
  isApproved: boolean;
  createdByUserId: number;
  createdByUser?: string;
  updatedByUserId: number;
  censorByUserId: number;
  censorByUser?: string;
  createdDatetimeUtc: number;
  updatedDatetimeUtc: number;
  fileIds: [];
  rejectCount: number;
  details: PurchasingRequestDetailInputModel[];
}
export interface PurchasingRequestInputModel {
  purchasingRequestId?: number;
  purchasingRequestCode: string;
  purchasingRequestStatusId: number;
  isApproved?: boolean;
  status?: number;
  date: number;
  fileIds: [];
  content: string;
  details: PurchasingRequestDetailInputModel[];
}
export interface PurchasingRequestDetailInputModel {
  purchasingRequestId: number;
  productId: number;
  productCode?: string;
  productName?: string;
  Quantity?: number;
  unitName?: string;
  primaryUnitName?: string;
  primaryUnitId: number;
  primaryQuantity: number;
  isSelected?: boolean;
  description: string;
  orderCode: string;
  productUnitConversionQuantity: number;
  productionOrderCode: string;
  productUnitConversionId: number;
  lstUnitConvert: any;
  factorExpression?: any;
  isFreeStyle?: boolean;
  productUnitConversionName?: string;
  purchasingRequestDetailId?: number;

  //addition data for material request
  originalProductId?: number;
  originalProduct?: ProductListOutput;
  specification?:string;
}
export interface ConvertModel {
  factorExpression?: string;
  productUnitConversionName?: string;
  isFreeStyle?: boolean;
}
