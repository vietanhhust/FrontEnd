import { setTitle } from '../../attributes/all';

class EnumPoProcessStatus {
    @setTitle('Nháp')
    Normal     = 0;
    @setTitle('Đã gửi nhà cung cấp')
    SentToProvider     = 1;
    @setTitle('Hoàn Thành')
    Completed   = 2;
}
export const EnumPoProcessStatusRule = new EnumPoProcessStatus();
