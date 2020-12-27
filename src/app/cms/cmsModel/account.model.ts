import { ApiEndpoint } from "src/app/core/models/base/CMSSession.model";

// Tài khoản người chơi
export interface AccountModel {
    id?: number,
    accountName?: string,
    password?: string,
    balance: number,
    description?: string,
    identityNumber?: string,
    debit?: number,
    address?: string,
    email?: string,
    phoneNumber?: string,
    credit?: number,
    elaspedTime?: number,
    isActived?: boolean,
    isLogged?: boolean, 
    status?: string
}

// Nạp tiền người chơi
export interface BalanceModel{
    money: number, 
    AccountId: number
}

export const AccountApi = `${ApiEndpoint}accounts`
