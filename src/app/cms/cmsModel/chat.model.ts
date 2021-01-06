export interface CMSChatModel{
    accountName?: string, 
    clientId?: number, 
    connectionId?: string, 
    isRead?: boolean, 
    messages?: CMSMessageModel[]
}

export interface CMSMessageModel{
    isAdmin?: boolean, 
    message?: string
}

export interface CMSNewMessengerModel{
    message?: string, 
    accountName?: string, 
    connectionId?: string, 
    clientId?: number
}

// Key này để lưu list tin nhắn vào localstorage. 
export const chat_storage_key = 'chat_storage_key'