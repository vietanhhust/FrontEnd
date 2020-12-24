export interface BusinessInfo {
  businessInfoId: number;
  companyName: string;
  legalRepresentative: string;
  address: string;
  taxIdNo: string;
  website: string;
  phoneNumber: string;
  email: string;
  logoFileId?: number;
  bank?: BusinessBankInfo[];
  logo?: BusinessLogo;
}
export interface BusinessLogo {
  url: string;
}
export interface BusinessBankInfo {
  name: string;
  stk: string;
  cn: string;
}
export interface MenuOutputModel {
  menuId?: number;
  parentId?: number;
  isDisabled?: boolean;
  moduleId?: number;
  objectTypeId?: number,
  objectId?: number,
  menuName?: string;
  url?: string;
  icon?: string;
  parent?: string;
  param?: any;
  isGroup?: boolean;
  isShow?: boolean;
  sortOrder?: number;
  level?: number;
}


