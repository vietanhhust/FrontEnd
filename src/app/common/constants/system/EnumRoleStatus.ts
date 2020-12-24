import { setTitle } from '../../attributes/all';

class EnumRoleStatusClass {
    @setTitle("Chưa kích hoạt")
    InActive: number = 0;
    @setTitle("Hoạt động")
    Active: number = 1
}
export const EnumRoleStatus = new EnumRoleStatusClass();