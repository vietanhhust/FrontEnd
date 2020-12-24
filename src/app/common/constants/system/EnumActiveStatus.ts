import { setTitle } from '../../attributes/all';

class EnumActiveStatusClass {
    @setTitle("Không hoạt động")
    InActive: boolean = false;
    @setTitle("Hoạt động")
    Active: boolean = true
}
export const EnumActiveStatus = new EnumActiveStatusClass();