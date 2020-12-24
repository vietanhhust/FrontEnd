import { setCssClass, setTitle } from '../../attributes/all';

class EnumHandoverStatusClass {
    @setTitle("Đợi bàn giao")
    @setCssClass("grey-text")
    Waiting = 0;
    
    @setTitle("Đã duyệt")
    @setCssClass("green-text")
    Accepted = 1;

    @setTitle("Từ chối")
    @setCssClass("red-text")
    Rejected = 2;
    
}
export const EnumHandoverStatus = new EnumHandoverStatusClass();