import { ApiEndpoint } from "src/app/core/models/base/CMSSession.model"

// Nhóm Client, quan trọng là giá
export interface CMSGroupClientModel{
    id?: number, 
    groupName?: string, 
    description?: string, 
    price?: number
}

// Client
export interface CMSClientModel{
    id?: number, 
    clientId?: number, 
    clientGroupId?: number, 
    description?: string, 
    isNew?: boolean, 
    checked?: boolean
}

export const GroupClientApi = `${ApiEndpoint}GroupClient`
export const ClientApi = `${ApiEndpoint}Client`
