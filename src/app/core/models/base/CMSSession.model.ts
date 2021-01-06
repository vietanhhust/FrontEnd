// Cái này lưu vào localstorage thông tin về tài khoản quản trị. 
export interface CMSSessionModel {
    token?: string, 
    name?: string, 
    groupRoleId?: number, 
    role?: FrontEndRoles[]
}

export interface FrontEndRoles{
    id?: number, 
    isActive?: boolean, 
    frontendCode?: number, 
    description?: string, 
    frontendRoleId?: number, 
    groupRoleId?: number
}

export const ApiEndpoint = 'http://192.168.0.2:5001/api/'
export const ServerIp = '192.168.0.2:5001';
export const SignalREndpoint = 'http://192.168.0.2:5001/adminpage'