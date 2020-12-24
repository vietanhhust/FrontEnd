export interface RoleInput {
  roleName: string;
  description: string;
  parentRoleId: number;
  roleStatusId: number;
  roleStatus?: String;
  checked?: boolean;
  isModulePermissionInherit: boolean;
  isDataPermissionInheritOnStock: boolean;
  rootPath?: string;
}

export interface RoleOutput extends RoleInput {
  roleId: number;
  isEditable: boolean;
}

export interface RoleLevel {
  level: number;
  info: RoleOutput;
}

export interface ModuleGroup {
  moduleGroupId: number;
  moduleGroupName: string;
  isAll?: boolean;
}


export interface Module {
  moduleGroupId: number;
  moduleId: number;
  moduleName: string;
  description: string;
}

export interface ModuleObjectModel extends Module {

  objectTypeId: number;
  objectId: number;
}

export class RolePermission {
  moduleGroupId: number;
  moduleId: number;
  objectTypeId: number;
  objectId: number;
  permission: number;
  actionIds: number[];

  isView: boolean;
  isUpdate: boolean;
  isAdd: boolean;
  isDelete: boolean;
  isCensor: boolean;
  isCheck: boolean;

  isAllowAction(actionId: number): boolean {
    if (!this.actionIds) return false;
    if (this.actionIds.find(a => a == actionId)) return true;
    return false;
  }

}

export interface ModuleRolePermission extends RolePermission, Module {
  isFull: boolean;
  isGroup: boolean;
  level: number;

  actionObjects: ModuleActionModel[]
}


export interface ModuleActionModel {
  id: number,
  title: string,
  isAllow: boolean
}
export interface MenuPage {
  id: number;
  fatherId: number;
  isDisabled?: boolean;
  isLove?: boolean;
  hasChild?: boolean;
  child?: any[];
  name: string;
  url: string;
  icon: string;
  moduleId: number;
  type?: string;
  param?: any;
  groupId?: number;
  isGroup?: boolean;
  isNotGroup?: boolean;
}
