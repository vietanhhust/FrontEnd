

import { setTitle } from '../../attributes/all';

class EnumFilterProductInventoryClass {
    @setTitle('Đạt số lượng max')
    Max = '2';
    @setTitle('Đạt số lượng min')
    Min = '1';
    @setTitle('Quá hạn lưu kho')
    Expired = '3';

    // @setTitle('Vật tư chính')
    // Main = 4;
    // @setTitle('Vật tư phụ')
    // Sub = 5;
    // @setTitle('Thành phẩm')
    // Product = 6;
}
export const EnumFilterProductInventory = new EnumFilterProductInventoryClass();
