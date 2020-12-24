export interface ProductManageOutput {

        //Id Mặt hàng
        productId: number;
        //Mã Mặt hàng
        productCode: string;
        //Tên Mặt hàng
        productName: string;
        mainImageFileId: number;
        // Id Loại Mặt hàng
        productTypeId: number;
        //
        productTypeName: string;
        //
        productCateId: number;
        //
        productCateName: string;
        //
        barcode: string;
        //
        specification: string;
        // Id đơn vị
        unitId: number;
        //tên đơn vị
        unitName: string;
        checked: boolean;
    }
