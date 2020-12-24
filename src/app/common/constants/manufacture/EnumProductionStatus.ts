import { setCssClass, setTitle } from '../../attributes/all';

class EnumProductionStatusClass {
    @setTitle("Chưa sản xuât")
    @setCssClass("grey-text")
    Waiting = 1;
    
    @setTitle("Đang sản xuất")
    @setCssClass("blue-text")
    Processing = 2;

    @setCssClass("green-text")
    @setTitle("Hoàn thành")
    Finished = 3;
    
    @setCssClass("red-text")
    @setTitle("Chậm tiến độ")    
    OverDeadline = 4
}
export const EnumProductionStatus = new EnumProductionStatusClass();