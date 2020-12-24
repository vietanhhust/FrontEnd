import { Department } from "./department";


export interface EmployeeBaseModel {
  employeeCode?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  genderId?: number;
  avatarFileId?: number;
}

export interface UserInput extends EmployeeBaseModel {
  userName?: string;
  userStatusId?: number;
  userStatus?: String;
  roleId?: number;
  role?: String;
  gender?: String;
  password?: string;
  repassword?: string;
  departments?: UserDepartmentInfoModel[]

  avatarUrl?: string;
}

export interface UserOutput extends UserInput {
  userId: number;
  checked?: boolean;
  department?: Department;
  displayTitle?: string;
}

export interface UserBasicInfoOutput {
  userId: number,
  userName: string,
  fullName: string,
  avatarFileId?: number,
}
export interface UserDepartmentMappingModel {
  departmentId: number,
  userDepartmentMappingId: number,
  effectiveDate: number,
  expirationDate: number,
}

export interface UserDepartmentInfoModel extends UserDepartmentMappingModel {
  departmentCode?: string,
  departmentName?: string,
}