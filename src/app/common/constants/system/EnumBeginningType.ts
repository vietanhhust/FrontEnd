import { setTitle } from '../../attributes/all';

class EnumBeginningTypeClass {
    @setTitle("Ngày chứng từ")
    BillDate: number = 0;
    @setTitle("Ngày cuối tháng")
    EndOfMonth: number = 1
}
export const EnumBeginningType = new EnumBeginningTypeClass();