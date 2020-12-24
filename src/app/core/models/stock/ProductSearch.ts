export interface ProductSearchOutput {
    isSelected:boolean;
    productId: number;
    productCode: string;
    productName: string;
    mainImageFileId: number;
    productTypeId?: number;
    productTypeName: string;
    productCateId: number;
    productCateName: string;
    barcode: string;
    specification: string;
    unitId: number;
    unitName: string;
    stockProductModelList: stockProductModelList[];
    productUnitConversionId: number;
    listUnitConvert: any;
    productUnitConversionName: string;
    factorExpression: any;
}
export interface stockProductModelList {
    stockId: number,
    productId: number,
    primaryUnitId: number,
    primaryQuantityRemaining: number,
    productUnitConversionId: number,
    productUnitConversionRemaining: number,
    lstUnitConvert?: any,
}
