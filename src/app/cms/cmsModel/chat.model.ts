// Cuộc hội thoại server client
export interface CMSChatModel {
    accountName?: string,
    clientId?: number,
    connectionId?: string,
    isRead?: boolean,
    messages?: CMSMessageModel[],
    lastMessage?: string,
    lastMessageTimeStamp?: number
}

// Model cho tin nhắn.
export interface CMSMessageModel {
    isAdmin?: boolean,
    message?: string,
    timeStamp?: number, 
    adminName?: string
}

// Tin nhắn mới, từ Client gửi đến
export interface CMSNewMessengerModel {
    message?: string,
    accountName?: string,
    connectionId?: string,
    clientId?: number,
    timeStamp?: number
}

// Dung để nhận tin nhắn từ admin khác ( đồng bộ tin nhắn)
export interface CMSAdminToAdminMessengerModel {
    message?: string,
    timeStamp?: number,
    adminName?: string, 
    connectionId?: string
}


// Key này để lưu list tin nhắn vào localstorage. 
export const chat_storage_key = 'chat_storage_key'