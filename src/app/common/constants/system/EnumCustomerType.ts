import { setTitle } from '../../attributes/all';

class EnumCustomerTypeClass {
    @setTitle("Tổ chức")
    Organization: number = 1;
    @setTitle("Cá nhân")
    Personal: number = 2
}
export const EnumCustomerType = new EnumCustomerTypeClass();