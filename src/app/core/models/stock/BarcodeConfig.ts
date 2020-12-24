export interface BarcodeConfigOutput {
    //mã barcode Config
    barcodeConfigId:number;
    //Tên barcode Config
    name: string;
    //
    barcodeStandardId:Number;
    barcodeStandard: String;
    //Trang Thái barcode Config
    isActived: boolean;
    Status: string;
}

export interface BarcodeConfigInput {
    //mã barcode Config
    barcodeConfigId:number;
    //Tên barcode Config
    name: string;
    //
    barcodeStandardId:Number;
    //Trang Thái barcode Config
    isActived: boolean;
    ean8: barcodeStandard;
    ean13: barcodeStandard;
}
export interface barcodeStandard {
    countryCode: string;
    companyCode: string;
}
