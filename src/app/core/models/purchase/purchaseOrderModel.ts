export interface PurchaseOrderInput {
    purchaseOrderId?: number;
    details: PurchaseOrderInputDetail[];
    date: number;
    purchaseOrderCode: string;
    deliveryDestination: DeliveryDestinationModel;
    content: string;
    additionNote: string;
    deliveryFee: number;
    otherFee: number;
    totalMoney: number;
    deliveryDate: number;
    paymentInfo: string;
    deliveryUserId: number;
    deliveryCustomerId: number;
}
export interface PurchaseOrderInputDetail {
    purchaseOrderDetailId: number;
    poAssignmentDetailId: number;
    purchasingSuggestDetailId: number;
    providerProductName: string;
    primaryQuantity: number;
    primaryUnitPrice: number;
    taxInPercent?: number;
    taxInMoney: number;
    productId: number;
    productCode?: string;
    productName?: string;
    specification?: string;
    description?: string;
    primaryUnitName?: string;

    Quantity?: number;
    QuantityYCP?: number;
    QuantityYCCV?: number;

    customerId?: number;
    isSelected?: boolean;
    poAssignmentDetail?: any;
    purchasingSuggestDetail?: any;
    orderCode?: string;
    productionOrderCode?: string;
    productUnitConversionPrice: number;
    productUnitConversionQuantity: number;
    productUnitConversionId: number;
    lstUnitConvert?: any;
    isFreeStyle?: boolean;
    factorExpression?: any;
    productUnitConversionName?: string;
    isOutSide?: boolean;
    money?: number;

}
export interface DeliveryDestinationModel {
    deliverTo: string;
    company: string;
    address: string;
    telephone: string;
    fax: string;
    additionNote: string;
}

export interface PurchaseOrderOutput {
details?: PurchaseOrderInputDetail[];
purchaseOrderId: number;
purchaseOrderCode: string;
date: number;
customerId: number;
customer?: any;
company?: any;
deliveryDestination: DeliveryDestinationModel;
content: string;
additionNote: string;
deliveryFee: number;
otherFee: number;
totalMoney: number;
purchaseOrderStatusId: number;
isApproved: boolean;
isChecked?: boolean;
poProcessStatusId: number;
createdByUserId: number;
createdByUser?: string;
updatedByUserId: number;
updatedByUser?: number;
censorByUserId: number;
censorByUser?: string;
checkByUser?: string;
censorDatetimeUtc: number;
createdDatetimeUtc: number;
updatedDatetimeUtc: number;
checkedByUserId?: number;
checkedDatetimeUtc?: number;
checked?: boolean;
deliveryDate: number;
    paymentInfo: string;
    deliveryUserId: number;
    deliveryCustomerId: number;
    fileIds: any[];
}
export interface PurchaseOrderPost {
    purchaseOrderId?: number;
    details: PurchaseOrderPostDetail[];
    date: number;
    deliveryDate: number;
    paymentInfo: string;
    deliveryUserId: number;
    deliveryCustomerId: number;
    purchaseOrderCode: string;
    deliveryDestination: DeliveryDestinationModel;
    content: string;
    additionNote: string;
    deliveryFee: number;
    otherFee: number;
    totalMoney: number;
    customerId: number;
    fileIds: any;
}
export interface PurchaseOrderPostDetail {
    purchaseOrderDetailId: number;
    poAssignmentDetailId: number;
    providerProductName: string;
    primaryQuantity: number;
    primaryUnitPrice: number;
    taxInPercent?: number;
    taxInMoney: number;
    productId: number;
    orderCode?: string;
    productionOrderCode?: string;
}
