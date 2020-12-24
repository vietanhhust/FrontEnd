import { EnumInventoryTypeId } from 'src/app/common/constants/stock/EnumInventory';

export interface StockOpeningBalanceModel {
  // Mã kho
  stockId: number;

  /// Loại 1: nhập kho | 2: xuất kho
  type: EnumInventoryTypeId;

  inventoryType?: number;

  // Ngày nhập liệu
  issuedDate: string;

  // Mô tả chung
  description: string;

  fileIdList: number[];
  
  accountancyAccountNumber: string;
}
