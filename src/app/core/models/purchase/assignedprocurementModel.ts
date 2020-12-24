export interface PoAssignmentOutput {
    poAssignmentId: number,
    purchasingSuggestId: number,
    purchasingSuggestCode: string,
    poAssignmentCode: string,
    orderCode: string,
    assigneeUserId: number
    poAssignmentStatusId: number,
    createdByUserId?: number,
    createdByUser?: string,
    createdDatetimeUtc: number
    isConfirmed: boolean,
    content: string;
    details: PoAssimentDetailModel[],
}
export interface PoAssimentDetailModel {
    customerId?: number;
    customerName?: string;
    providerProductName?: string;
    orderCode?: string;
    productionOrderCode?: string;
}
export interface PoAssignmentOutputList {
    poAssignmentId: number,
            purchasingSuggestId: number,
            purchasingSuggestCode: string,
            poAssignmentCode: string,
            orderCode: string,
            assigneeUserId: number
            poAssignmentStatusId: number,
            createdByUserId?: number,
            createdByUser?: string,
            createdDatetimeUtc: number
            isConfirmed: boolean,
            content: string;
            assignUser?: string;
}
