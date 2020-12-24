import { setTitle } from '../../attributes/all';

class EnumUserStatusClass {
    @setTitle("Chưa kích hoạt")
    InActive: number = 0;
    @setTitle("Hoạt động")
    Active: number = 1;
    @setTitle("Khóa")
    Locked: number = 2;
}
export const EnumUserStatus = new EnumUserStatusClass();