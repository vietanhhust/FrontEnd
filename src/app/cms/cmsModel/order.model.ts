import { ApiEndpoint } from "src/app/core/models/base/CMSSession.model";

// Interface này dành cho yêu cầu gọi đồ đến. 
export interface CMSOrderModel{
    id?: number,
    timeStamp?: number, 
    connectionId?: string, 
    status?: boolean,

    adminId?: number, 
    adminName?: string, 
    
    clientId?: number, 
    clientNumber?: number, 

    userId?: number, 
    userName?: string,

    listCategory?: CMSCategoryModel[]
    clicked?: boolean

    // trường này dành cho việc xem đây có phải là yêu cầu phát sinh không
    incurred?: boolean
}

// Interface này chứa thông tin về đồ. 
export interface CMSCategoryModel{
    CategoryId?: number, 
    CategoryName?: string, 
    Quantity?: number, 
    UnitPrice?: number
}

// Interface dùng để push subject có order đến. 
export interface CMSCategoryOrderSubject{
    timeStamp?: number, 
    connectionId?: string, 
    clientId?: number, 
    accountName?: string, 
    listCategory?: string, 
    accountId?: number  
}

// Interface này dùng để gửi model lên server
export interface CMSOrderCreating{
    accountId?: number, 
    AdminId?: number, 
    CreatedTime?: number, 
    ClientId?: number, 
    ListCategory?: CMSCategoryModel[]
}


export const order_storage_key = 'order_storage_key'
export const OrderApi = `${ApiEndpoint}order`;