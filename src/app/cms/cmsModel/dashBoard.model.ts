import { ApiEndpoint } from "src/app/core/models/base/CMSSession.model";

export interface CMSDashboardModel {
    connectionId?: string,
    clientId?: number,
    account?: {
        id?: number,
        accountName?: string,
        password?: number,
        balance?: number,
        description?: string,
        identityNumber?: number,
        debit?: number,
        address?: string,
        email?: string,
        phoneNumber?: number,
        credit?: number,
        elaspedTime?: number,
        isActived?: boolean,
        isLogged?: boolean
    }, 
    // Trường tự thêm
    status?: string,
    isUsed?: boolean, 
    balance?: number, 
    clientName?: string, 
    accountName?: string
}

//Endpoint
export const DashboardApi = `${ApiEndpoint}client/status`
