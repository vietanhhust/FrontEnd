import { setCssClass, setTitle } from '../../attributes/all';

class EnumProductionInventoryRequirementStatusClass {
    @setTitle("Đang chờ")
    @setCssClass("grey-text")
    Waiting = 1;
    
    @setTitle("Đã nhận")
    @setCssClass("green-text")
    Accepted = 2;

    @setTitle("Bị từ chối")
    @setCssClass("red-text")
    Rejected = 3;
    
}
export const EnumProductionInventoryRequirementStatus = new EnumProductionInventoryRequirementStatusClass();