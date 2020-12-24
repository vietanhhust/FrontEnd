import { setTitle } from '../../attributes/all';

class EnumPurchaseOrderStatus {
    @setTitle('Nháp')
    Draff    = 1;
    @setTitle('Gửi/Đợi duyệt')
    WaitToCensor    = 2;
    @setTitle('Đã kiểm tra')
    Checked     = 3;
    @setTitle('Đã được duyệt')
    Censored     = 4;
}
export const EnumPurchaseOrderStatusRule = new EnumPurchaseOrderStatus();
