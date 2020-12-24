import { setTitle } from '../../attributes/all';

class EnumTimeTypeClass {
    @setTitle("Năm")
    Year = 1;
    @setTitle("Tháng")
    Month = 2;
    @setTitle("Tuần")
    Week = 3;
    @setTitle("Ngày")
    Day = 4;
    @setTitle("Giờ")
    Hour = 5;
    @setTitle("Phút")
    Minute = 6;
}
export const EnumTimeType = new EnumTimeTypeClass();