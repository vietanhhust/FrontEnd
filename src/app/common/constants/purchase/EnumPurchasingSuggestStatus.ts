import { setTitle } from '../../attributes/all';

class EnumPurchasingSuggestStatus {
    @setTitle('Nháp')
    Draff    = 1;
    @setTitle('Gửi/Đợi duyệt')
    WaitToCensor    = 2;
    @setTitle('Đã được duyệt')
    Censored     = 3;
}
export const EnumPurchasingSuggestStatusRule = new EnumPurchasingSuggestStatus();
