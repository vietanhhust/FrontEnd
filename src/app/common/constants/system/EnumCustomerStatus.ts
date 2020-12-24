import { setTitle } from '../../attributes/all';

class EnumCustomerStatusClass {
    @setTitle('Kích hoạt')
    Active = 1;
    @setTitle('Khóa')
    Lock = 0;
}
export const EnumCustomerStatus = new EnumCustomerStatusClass();
