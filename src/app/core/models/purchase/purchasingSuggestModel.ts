export interface PurchasingSuggestListOutput {
  total: number;
  list: [
    {
      PurchasingSuggestId: number;
      PurchasingSuggestCode: string;
      PurchasingSuggestStatusId: number;
      poProcessStatusId: number;
      orderCode: string;
      productionOrderCode: string;
      date: number;
      rejectCount: number;
      content: string;
      isApproved: boolean;
      createdByUserId: number;
      createdByUser?: string;
      updatedByUserId: number;
      createdDatetimeUtc: number;
      updatedDatetimeUtc: number;
      censorByUserId: number;
      censorByUser?: string;
      censorDatetimeUtc: number;
      details: PurchasingSuggestDetailOutputModel[];
    }
  ];
}
export interface PurchasingSuggestDetailOutputModel {
  PurchasingSuggestDetailId: number;
  purchasingSuggestId: number;
  customerId: number;
  customerCode: string;
  customerName: string;
  purchasingRequestId: number;
  purchasingRequestDetailId?: number;
  purchasingRequestCode?: string;
  purchasingRequestPrimaryQuantity: number;
  primaryUnitId: number;
  primaryQuantity: number;
  createdDatetimeUtc: number;
  updatedDatetimeUtc: number;
  productId: number;
  productName: string;
  productCode: string;
  primaryUnitName: string;
  primaryUnitPrice: number;
  taxInPercent?: number;
  taxInMoney?: number;
  isSelected?: boolean;
  fileIds: any[];
}

export interface PurchasingSuggestOutputModel {
  purchasingSuggestId: number;
  purchasingSuggestCode: string;
  orderCode: string;
  productionOrderCode: string;
  date: number;
  rejectCount: number;
  content: string;
  isApproved: boolean;
  createdByUserId: number;
  createdByUser?: string;
  updatedByUserId: number;
  createdDatetimeUtc: number;
  updatedDatetimeUtc: number;
  censorByUserId: number;
  censorByUser?: string;
  censorDatetimeUtc: number;
  fileIds: any[];
  details: PurchasingSuggestDetailOutputModel[];
}
export interface PurchasingSuggestInputModel {
  purchasingSuggestCode: string;
  date: number;
  content: string;
  fileIds: any[];
  createdDatetimeUtc?: number;
  purchasingSuggestStatusId?: number;
  createdByUserId?: number;
  details: PurchasingSuggestDetailInputModel[];
  isApproved: boolean;
  rejectCount: any;
  purchasingSuggestId: any;
  status: any;
}
export interface PurchasingSuggestDetailInputModel {
  purchasingSuggestDetailId?: number;
  customerId: number;
  purchasingRequestId?: number;
  purchasingRequestDetailId: number;
  productId: number;
  productCode?: string;
  productName?: string;
  primaryUnitName?: string;
  primaryUnitId: number;
  primaryQuantity: number;
  primaryUnitPrice: number;
  taxInPercent?: number;
  taxInMoney?: number;
  isSelected?: boolean;
  customerName?: string;
  Quantity?: number;
  purchasingRequestPrimaryQuantity?: number;
  primaryRemaining?: number;
  requestDetail: RequestDetail;

  productUnitConversionPrice: number;
  orderCode: string;
  productUnitConversionQuantity: number;
  productionOrderCode: string;
  productUnitConversionId: number;
  lstUnitConvert?: any;
  isFreeStyle?: boolean;
  factorExpression?: any;
  productUnitConversionName?: string;
  description: string;
}
export interface RequestDetail {
  purchasingRequestId: number;
  purchasingRequestCode: string;
  purchasingRequestDetailId: number;
  primaryQuantity: number;
  productUnitConversionId: number;
  productUnitConversionQuantity: number;
}
export interface PurchasingSuggestFile {
  fileId: number;
  fileName: string;
  fileTypeId: number;
  fileUrl: string;
  thumbnailUrl: string;
}
