import { setCssClass, setTitle } from '../../attributes/all';

class EnumInventoryRequirementStatusClass {
    @setTitle("Đang chờ duyệt")
    @setCssClass("far fa-check-circle chuaduyet")
    Waiting = 1;
    
    @setTitle("Đã duyệt")
    @setCssClass("far fa-check-circle daduyet")
    Accepted = 2;

    @setTitle("Từ chối")
    @setCssClass("far fa-check-circle tuchoi")
    Rejected = 3;
    
}
export const EnumInventoryRequirementStatus = new EnumInventoryRequirementStatusClass();