import { ApiEndpoint } from "src/app/core/models/base/CMSSession.model";

// Dùng để lấy lịch sử nạp tiền:
// Admin nào, nạp bao nhiêu, nạp ai, khi nào và bao giờ, loại nạp hay là trừ
export interface CMSHistoryBalanceChangeModel {
    id?: number,

    // Admin
    managingAccountId?: number,
    managinAccoungName?: string,

    // Tài khoản
    accountId?: number,
    accountName?: string,

    // Cost
    cost?: number,
    costString?: string,

    // Loại nạp hay trừ
    typeChange?: boolean,
    typeChangeString?: string

    // Thời gian
    timeChange?: number,
    timeChangeString?: string
}

// Model này dùng để query lịch sử balance
export interface CMSHistoryBalanceChangeQueryModel {
    fromDate?: number,
    toDate?: number,
    accountId?: number,
    typeChange?: boolean
}

// Model này dùng để query lịch sử order 
export interface CMSHistoryOrderModel {
    fromDate?: number,
    toDate?: number,
    accountId?: number,
    adminId?: number,
    clientId?: number
}

// Model này dùng để nhận đơn từ cơ sở dữ liệu. 
export interface CMSOrderDbModel {
    accountId?: number,
    adminId?: number
    clientId?: number,
    createdTime?: number,
    id?: number
}

export interface CMSOrderDetailModel{
    id?: number, 
    categoryItemId?: number, 
    categoryPrice?: number,
    amount?: number, 
    orderId?: number, 
    categoryItemName?: string
}


export interface BigOrderModel{
    id?: number, 

    accountId?: number, 
    accountName?: string, 

    adminId?: number, 
    adminName?: string, 

    createdTime?: number, 
    createdTimeString?: string, 

    clientId?: number, 
    clientIdString?: string,

    totals?: number, 
    totalsString?: string
    details?: CMSOrderDetailModel[]

}
export const HistoryApi = `${ApiEndpoint}history`
