import { setTitle } from '../../attributes/all';

class EnumUnitStatusClass {
    @setTitle('Kích hoạt')
    Active = 1;
    @setTitle('Khóa')
    Lock = 0;
}
export const EnumUnitStatus = new EnumUnitStatusClass();
