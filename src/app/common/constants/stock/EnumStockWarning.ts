import { setTitle } from '../../attributes/all';

class EnumStockWarningClass { 
    @setTitle("Đạt Min")
    Min: number = 1;
    @setTitle("Đạt Max")
    Max: number = 2;
    @setTitle("Quá hạn lưu kho")
    Expired: number = 3;
}
export const EnumStockWarning = new EnumStockWarningClass();