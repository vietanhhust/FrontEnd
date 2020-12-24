export interface InvnetoryUnitConversion {
     productUnitConversionId: number;
     productUnitConversionName: string;
     productId: number;
     secondaryUnitId: number;
     secondaryUnitName: string;
     factorExpression: any;
     conversionDescription: string;
     isDefault?: boolean;
}
export interface InventoryUser {
     userId: number;
     userName: string;
     employeeCode: string;
     fullName: string;
}
//---------- INPUT -----------------
export interface InventoryInput {
     isSelected?: boolean;
     // id phiếu nhập kho
     inventoryId: number;
     // id kho
     stockId: number;
     // mã phiếu
     inventoryCode: string;
     // 1: phiếu nhập; 2: phiếu xuất
     inventoryTypeId: number;
     // người bàn giao
     shipper: string;
     // Nội dung
     content: string;
     // Ngày nhập
     dateUtc: string;
     // Đơn vị cung cấp
     customerId: number;
     // Phòng ban, bộ phận
     department: string;
     // user hiện tại
     stockKeeperUserId: number;
     stockOutput: InventoryInputStock;
     // ảnh chứng từ gốc
     fileList: InventoryInputFile[];
     customerName?: string;
     stockName?: string;
     refObjectCode?: string;
     inventoryDetailOutputList: InventoryInputDetail[];
     isApproved: boolean;
     Approved?: string;
     deliveryCode?: string;
     billForm?: string;
     billCode?: string;
     billSerial?: string;
     billDate?: string;
     inputBills?: [];
     statusBill?: string;
}
export interface InventoryInputStock {
     // Tên kho
     stockName: string;
     // Mô tả chung về kho
     description: string;
     // Mã Id thủ kho
     stockKeeperId: number;
     // Tên thủ kho
     stockKeeperName: string;
     // Loại
     type: number;
     // Trạng thái
     status: number;
}
export interface InventoryInputDetail {
     // id
     inventoryDetailId: number;
     productId: number;
     primaryUnitId: number;
     primaryQuantity: number;
     productUnitConversionId: number;
     productUnitConversion?: InvnetoryUnitConversion;
     secondaryUnitId: number;
     secondaryQuantity: number;
     unitPrice: number;
     refObjectTypeId: number;
     refObjectId: number;          // PO /LSX
     refObjectCode: string;
     toPackageId: number;
     fromPackageId: number;
     packageOptionId: number;
     productUnitConversionQuantity?: number;
     productOutput: InventoryInputDetailProduct;
     accountancyAccountNumberDu: string
}
export interface InventoryInputDetailProduct {
     productCode: string;
     productName: string;
     mainImageFieldId: 0;
     unitName: string;
}
export interface InventoryInputFile {
     fileId: number;
     fileName: string;
     fileTypeId: number;
     fileUrl: string;
     thumbnailUrl: string;
}

export interface InventoryInputEdit {
     // id phiếu nhập kho
     inventoryId: number;
     //id kho
     stockId: number;
     // mã phiếu
     inventoryCode: string;
     //1: phiếu nhập; 2: phiếu xuất
     inventoryTypeId: number;
     // người bàn giao
     shipper: string;
     // Nội dung
     content: string;
     // Ngày nhập
     dateUtc: string;
     // Đơn vị cung cấp
     customerId: number;
     // Phòng ban, bộ phận
     department: string;
     // user hiện tại
     stockKeeperUserId: number;
     deliveryCode?: string;
     // ảnh chứng từ gốc
     fileIdList: number[];
     inProducts: InventoryInputEditDetial[];
     billForm?: string;
     billCode?: string;
     billSerial?: string;
     billDate?: string;
     isApproved?: boolean;
}
export interface InventoryInputEditDetial {
     isSelected: boolean;
     inventoryDetailId?: number;
     // fromPackageId: number;
     // fromPackageCode: string;
     toPackageId: number;
     fromPackageId: number;
     packageOptionId: number;
     productId: number;
     productCode: string;
     unitPrice: number;
     productName: string;
     primaryUnitId: number;
     primaryUnitName: string;
     primaryQuantity: number;
     productUnitConversionId: number;
     productUnitConversionQuantity: number;
     productUnitConversionName: string;
     primaryQuantityRemaining?: number;
     productUnitConversionRemaining?: number;
     productUnitConversionPrice: number;
     requestPrimaryQuantity: number;
     requestProductUnitConversionQuantity: number;
     description: string;
     function?: any;
     secondaryQuantity: number;
     refObjectTypeId: number;
     refObjectId: number; // PO LSX
     refObjectCode: string;
     factorExpression?: string;
     accountancyAccountNumberDu: string;
}
export interface InventoryInputModelPost {
     inventoryId?: number;
     stockId: number;
     inventoryCode: string;
     shipper: string;
     content: string;
     date: string;
     customerId: number;
     department: string;
     stockKeeperUserId: number;
     billForm: string;
     billCode: string;
     billSerial: string;
     billDate: string;
     fileIdList: [];
     isApproved?: boolean;
     inProducts: InventoryInputModelPostDetail[];
     accountancyAccountNumber: string;
}
export interface InventoryInputModelPostDetail {
     inventoryDetailId: number;
     isSelected?: boolean;
     toPackageId: number;
     productId: number;
     primaryQuantity: number;
     unitPrice: number;
     productUnitConversion?: any;
     productUnitConversionQuantity: number;
     packageOptionId: number;
     productUnitConversionId: number;
     refObjectTypeId?: number;
     refObjectId?: number;          // PO /LSX
     refObjectCode?: string;
     // Don hang
     orderCode: string;
     // PO code
     poCode: string;
     // LXS
     productionOrderCode: string;
     isNew?: boolean;
     sortOrder: number;
     accountancyAccountNumberDu: string;
     tkFieldConfig: any;

}
export interface InventoryOutputEdit {
     // id phiếu nhập kho
     inventoryId: number;
     //id kho
     stockId: number;
     // mã phiếu
     inventoryCode: string;
     //1: phiếu nhập; 2: phiếu xuất
     inventoryTypeId: number;
     // người bàn giao
     shipper: string;
     // Nội dung
     content: string;
     // Ngày nhập
     dateUtc: string;
     // Đơn vị cung cấp
     customerId: number;
     // Phòng ban, bộ phận
     department: string;
     // user hiện tại
     stockKeeperUserId: number;
     deliveryCode?: string;
     // ảnh chứng từ gốc
     fileIdList: number[];
     outProducts: InventoryInputEditDetial[];
}
export interface InventoryOutputModelPost {
     inventoryId?: number;
     stockId: number;
     inventoryCode: string;
     shipper: string;
     content: string;
     date: string;
     customerId: number;
     department: string;
     stockKeeperUserId: number;
     isApproved?: boolean;
     accountancyAccountNumber: string;
     fileIdList: [];
     outProducts: InventoryOutputModelPostDetail[];
}
export interface InventoryOutputModelPostDetail {
     inventoryDetailId: number;
     isSelected?: boolean;
     fromPackageId: number;
     productId: number;
     primaryQuantity: number;
     unitPrice: number;
     productUnitConversion?: any;
     productUnitConversionQuantity: number;
     packageOptionId: number;
     productUnitConversionId: number;
     refObjectTypeId?: number;
     refObjectId?: number;          // PO /LSX
     refObjectCode?: string;
     // Don hang
     orderCode: string;
     // PO code
     poCode: string;
     // LXS
     productionOrderCode: string;
     isNew?: boolean;
     accountancyAccountNumberDu: string;
     sortOrder: number;
     tkFieldConfig: any;

}
export interface InventoryInputEditStock {
     stockId: number;
     stockName: string;
}

export interface InventoryInputEditCustomer {
     customerId: number;
     customerCode: string;
     customerName: string;
     customerFull?: string;
     address?: string;
}
export interface InventoryInputEditUser {
     userId: number;
     fullName: string;
     userName: string;
}

export interface InventoryInputUnit {
     unitId: number;
     unitName: string;
}

export interface InventoryInputImg {
     id: number;
     name: string;
     url: string;
     file: File;
}

//---------- OUTPUT -----------------
