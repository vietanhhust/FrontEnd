import { setTitle } from '../../attributes/all';

class  EnumProductionOrderStatusClass {
        @setTitle('Đang thiết lập')
        NotReady = 9;
        @setTitle('Chưa sản xuât')
        Waiting = 1;
        @setTitle('Đang sản xuất')
        Processing = 2;
        @setTitle('Hoàn thành')
        Finished = 3;
    }
export const EnumProductionOrderStatus = new EnumProductionOrderStatusClass();
