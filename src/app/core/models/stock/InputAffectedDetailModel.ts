import { InventoryInputModelPost } from "./Inventory";

export interface InputAffectedDetailModel {
    inventoryDetailId: number;
    productId: number;
    primaryUnitId: number;
    oldPrimaryQuantity: number;
    newPrimaryQuantity: number;
    productUnitConversionId: number;
    productUnitConversionName: string;
    factorExpression: string;

    oldProductUnitConversionQuantity: number;
    newProductUnitConversionQuantity: number;
    toPackageId: number;
    affectObjects: AffectObjectModel[];
}

export interface AffectObjectModel {
    objectKey: string;
    isRoot: boolean;
    isCurrentFlow: boolean;
    objectId: number;
    objectCode: string;
    objectTypeId: number;
    oldPrimaryQuantity: number;
    newPrimaryQuantity: number;
    oldProductUnitConversionQuantity: number;
    newProductUnitConversionQuantity: number;
    children: AffectTransferModel[];

    /*process*/
    levelLeft?: number;
    levelTop?: number;
    inputs?: any;
    outputs?: any;
    class?: string;
    inputOutputRowsLength?: number;
}

export interface AffectTransferModel {
    objectKey: string;
    isEditable: boolean;
    objectId: number;
    objectTypeId: number;
    packageOperationTypeId: number;
    oldTransferPrimaryQuantity: number;
    newTransferPrimaryQuantity: number;
    oldTransferProductUnitConversionQuantity: number;
    newTransferProductUnitConversionQuantity: number;
}


export interface ApprovedInputDataSubmit {
    affectDetails: InputAffectedDetailModel[];
    inventory: InventoryInputModelPost;
}
