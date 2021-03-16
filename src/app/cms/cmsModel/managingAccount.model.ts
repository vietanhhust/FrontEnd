import { ApiEndpoint } from "src/app/core/models/base/CMSSession.model";

export interface CMSManagingAccountModel{
    id?: number, 
    name?: string
    password?: string,
    groupRoleId?: number 
    description?: number
}

export const ManagingAccountApi = `${ApiEndpoint}ManagingAccounts`