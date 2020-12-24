import { FileToDownloadInfo } from './FileToDownloadInfo';
import { InvnetoryUnitConversion } from './Inventory';
import { ProductUnitConversion } from './ProductModel';

export interface InventoryRequirementBase {
     inventoryRequirementCode?: string;
     content?: string;
     date: number;
     departmentId?: number;
     scheduleTurnId?: number;
     productionStepId?: number;
}

export interface InventoryRequirementList extends InventoryRequirementBase {
     inventoryRequirementId: number;
     censorStatus: number;
     censorByUserId?: number;
     censorDatetimeUtc?: number;
     createdByUserId: number;
     //add
     isSelected?: boolean;
     departmentTitle: string;
     createdByUserName: string;
}

export interface InventoryRequirementInput extends InventoryRequirementBase {
     inventoryRequirementDetail: InventoryRequirementDetailInput[];
     inventoryRequirementFile: InventoryRequirementFileInput[];
}

export interface InventoryRequirementOutput extends InventoryRequirementList {
     inventoryRequirementDetail: InventoryRequirementDetailOutput[];
     inventoryRequirementFile: InventoryRequirementFileOutput[];
}

export interface InventoryRequirementDetailInput {
     inventoryRequirementDetailId?: number;
     subsidiaryId: number;
     inventoryRequirementId: number;
     productId: number;
     primaryQuantity: number;
     productUnitConversionId?: number;
     productUnitConversionQuantity?: number;
     pocode?: string;
     productionOrderCode: string;
     sortOrder?: number;
     // additional
     listUnitConvert?: InvnetoryUnitConversion[];
     factorExpression?: string;
     unitConversionName?: string;
}

export interface InventoryRequirementDetailOutput extends InventoryRequirementDetailInput {
     productUnitConversion: ProductUnitConversion;
     // add
     productName: string;
     productCode: string;
     primaryUnitName: string;
     productUnitConversionName: string;
     isSelected?: boolean;
}

export interface InventoryRequirementFileInput {
     inventoryRequirementId: number;
     fileId: number;
}

export interface InventoryRequirementFileOutput extends InventoryRequirementFileInput {
     inventoryRequirementId: number;
     fileId: number;
     fileToDownloadInfo?: FileToDownloadInfo;
}
