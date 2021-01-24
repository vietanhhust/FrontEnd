export enum CSMEnumModule{

    // Tự do truy cập
    FreeAccess = 1,
    // Màn hình tài khoản người dùng.
    AccountView = 100,
    AccountCreate = 101, 
    AccountPut = 102, 
    AccountDelete = 103, 
    // Tài khoản - nạp tiền
    AccountAddBalance = 104, 
    //Tài khoản, trừ tiền
    AccountMinusBalance = 105,


    // Màn hình danh mục 
    CategoryView = 200, 
    CategoryCreate = 201, 
    CategoryPut = 202, 
    CategoryDetele = 203, 
    
    // Màn hình phân quyền
    GroupRoleView = 300, 
    GroupRoleCreate = 301, 
    GroupRolePut = 302, 
    GroupRoleDelete = 303, 
    GroupRoleGrante = 304, 
    RoleActiveUpdate = 305,

    // Màn hình Nhóm máy
    GroupClientView = 400, 
    GroupClientCreate = 401, 
    GroupClientPut = 402,
    GroupClientDelete = 403, 
    GroupClientChange = 404,
    
    // Màn hình chat 
    ChatView = 500, 
    // Gửi tin nhắn.
    ChatSend = 501,

    // Màn hình dashboard 
    DashboardView = 600, 

    // Màn hình order 
    OrderView = 700,
        // Duyệt yêu cầu gọi đồ
    AcceptOrder = 701, 
        // Hủy yêu cầu gọi đồ
    RejectOrder = 702
    
}