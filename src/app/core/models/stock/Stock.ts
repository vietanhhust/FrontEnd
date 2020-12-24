
export interface StockOutput {
    // Mã kho
    stockId: number;

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
    status: number

    checked?: boolean;
}
export interface StockInput {
    // Mã kho
    stockId: number;

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

export interface StockSimpleInfo {
    stockId: number;
    stockName: string;
}
export interface StockRole {
    stockId: number;
    roleId: number;
}
export interface StockInventory {
    total: number;
    list: [
        {
            productId: number;
            productCode: string;
            productName: string;
            productTypeId: number;
            productCateId: number;
            specification: string;
            unitId: number;
            primaryQuantityRemaining: 0;
        }
    ];
}

export interface ProductDetailOutput {
    checked: boolean;
    packageId: number;
    packageTypeId?: number;
    packageCode: string;
    locationId: number;
    locationName?: string;
    date: string;
    expriredDate: string;
    primaryUnitId: number;
    primaryQuantity: number;
    secondaryUnitId: number;
    secondaryQuantity: number;
    productUnitConversionId?: number;
    productUnitConversionName?: string;
    productUnitConversionQualtity?: number;
    refObjectId: number;
    refObjectCode: string;
    description: string;
}

export interface PrintPackageModel {
    productCode: string;
    productName: string;
    barcode: string;
    specification: string;
    package: PrintPackageList[];
}

export interface PrintPackageList {
    checked: boolean;
    packageId: number;
    packageCode: string;
    locationId: number;
    date: string;
    expriredDate: string;
    primaryUnitId: number;
    primaryQuantity: number;
    secondaryUnitId: number;
    secondaryQuantity: number;
    refObjectId: number;
    refObjectCode: string;
    primaryUnit?: string;
    secondaryUnit?: string;
    productUnitConversionName?: string;
}


