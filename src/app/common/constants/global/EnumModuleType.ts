import { setTitle } from '../../attributes/all';

class EnumModuleTypeClass {
  @setTitle('Phân hệ chung')
  Master = 1;
  @setTitle('Kho')
  Stock = 2;
  @setTitle('Cơ cấu, tổ chức')
  Organization = 3;
  @setTitle('Mua hàng')
  PurchaseOrder = 4;
  @setTitle('Kế toán')
  Accountant = 5;
}

export const EnumModuleType = new EnumModuleTypeClass();
