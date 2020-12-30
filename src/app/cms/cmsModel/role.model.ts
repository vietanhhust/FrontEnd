import { ApiEndpoint } from "src/app/core/models/base/CMSSession.model";

export interface CMSGroupRoleModel {
    id: number,
    groupName?: string,
    description?: string, 
}

export interface CMSRoleActiveModel{
    id?: number, 
    groupRoleId?: number, 
    frontendRoleId?: number, 
    isActive?: boolean, 
    frontendRoleName?: string, 
    frontendCode?: number
}

export const GroupRoleAPi = `${ApiEndpoint}GroupRoles`
export const RoleActiveApi = `${ApiEndpoint}roleActive`


