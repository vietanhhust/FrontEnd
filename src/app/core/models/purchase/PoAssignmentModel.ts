
export interface PoAssignmentOutput {
    content: string;
    details: PoAssimentDetailModel[];
    poAssignmentId: number;
    purchasingSuggestId: number;
    purchasingSuggestCode: string;
    orderCode: string;
    poAssignmentCode: string;
    assigneeUserId: number;
    assigneeUser?: string;
    poAssignmentStatusId: number;
    isConfirmed: boolean;
    createdDatetimeUtc: number;
    isEdit?: boolean;
    purchasingSuggestDate?: number;
    createdByUserId?: any,
}
export interface PoAssimentDetailModel {
    poAssignmentDetailId?: number;
    purchasingSuggestDetailId: number;
    providerProductName?: string;
    primaryQuantity: number;
    primaryUnitPrice: number;
    taxInPercent?: number;
    taxInMoney: number;
    productId: number;
    productCode?: string;
    productName?: string;
    primaryUnitName?: string;
    Quantity?: number;
    isSelected?: boolean;
    productUnitConversionId: number;
    productUnitConversionQuantity: number;
    productUnitConversionPrice: number;
    lstUnitConvert: any;
    factorExpression?: any;
    isFreeStyle?: boolean;
    productUnitConversionName?: string;
    customerId?: number;
    customerName?: string
}
export interface PoAssignmentInput {
    assigneeUserId: number;
    assigneeUser?: string;
    content: string;
    poAssignmentId?: number;
    poAssignmentCode?: string;
    details: PoAssimentDetailModel[];
    isEdit?: boolean;
}
