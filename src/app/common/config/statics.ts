

import { EnumModule } from 'src/app/common/constants/global/Enums';
import { MenuPage } from 'src/app/core/models/system/role.model';


export enum EnumStaticContent {
    NoImage = '/assets/images/noimageavailable.png'

}

export const genderList: any[] = [

    { value: 1, text: 'Male' }, { value: 2, text: 'FeMale' }
];

export const userStatusList: any[] = [
    { value: 0, text: 'InActived' },
    { value: 1, text: 'Actived' },
    { value: 2, text: 'Locked' }
];

export const roleStatusList: any[] = [
    { value: 1, text: 'Actived' },
    { value: 0, text: 'InActived' }
];

export const pageList: MenuPage[] = [
    // group
    { fatherId: 2, id: 1001, isGroup: true, isDisabled: false, moduleId: 0, name: 'Chung', url: '', icon: 'fas fa-layer-group' },
    { fatherId: 2, id: 1002, isGroup: true, isDisabled: false, moduleId: 0, name: 'Kho', url: '', icon: 'fas fa-layer-group' },
    { fatherId: 2, id: 1003, isGroup: true, isDisabled: false, moduleId: 0, name: 'Cấu hình', url: '', icon: 'fas fa-layer-group' },
    { fatherId: 2, id: 1004, isGroup: true, isDisabled: false, moduleId: 0, name: 'Cấu hình(Admin)', url: '', icon: 'fas fa-layer-group' },

    { fatherId: 3, id: 3001, isGroup: true, isDisabled: false, moduleId: 0, name: 'Quản lý', url: '', icon: 'fas fa-layer-group' },
    { fatherId: 3, id: 3002, isGroup: true, isDisabled: false, moduleId: 0, name: 'Báo cáo', url: '', icon: 'fas fa-layer-group' },

    { fatherId: 4, id: 4001, isGroup: true, isDisabled: false, moduleId: 0, name: 'Yêu cầu', url: '', icon: 'fas fa-layer-group' },
    { fatherId: 4, id: 4002, isGroup: true, isDisabled: false, moduleId: 0, name: 'Quản lý', url: '', icon: 'fas fa-layer-group' },

    { fatherId: 5, id: 5001, isGroup: true, isDisabled: false, moduleId: EnumModule.CategoryData, name: 'Danh mục', url: '', icon: 'fas fa-layer-group' },
   // { fatherId: 5, id: 5003, isGroup: true, isDisabled: false, moduleId: EnumModule.Inputs, name: 'Chứng từ', url: '', icon: 'fas fa-layer-group' },

    // { fatherId: 6, id: 6002, isGroup: true, isDisabled: false, moduleId: EnumModule.ReportType, name: 'Danh sách báo cáo', url: '/report/list', icon: 'fas fa-layer-group' },



    { fatherId: 0, id: 2, isDisabled: false, moduleId: 0, name: 'Thiết lập', url: '/settings', icon: 'fa fa-cogs' },
    { fatherId: 2, groupId: 1001, id: 205, isDisabled: false, moduleId: EnumModule.ProductType, name: 'Mã Mặt hàng', url: '/system/product-types', icon: 'fa fa-bookmark' },
    { fatherId: 2, groupId: 1001, id: 204, isDisabled: false, moduleId: EnumModule.ProductCate, name: 'Danh mục Mặt hàng', url: '/system/product-cates', icon: 'fa fa-briefcase' },
    { fatherId: 2, groupId: 1001, id: 203, isDisabled: false, moduleId: EnumModule.Unit, name: 'Đơn vị tính', url: '/system/units', icon: 'fa fa-flask' },
    { fatherId: 2, groupId: 1001, id: 206, isDisabled: false, isLove: true, moduleId: EnumModule.Product, name: 'Mặt hàng', url: '/system/products', icon: 'fab fa-product-hunt' },
    { fatherId: 2, groupId: 1003, id: 211, isDisabled: false, moduleId: EnumModule.BarcodeConfig, name: 'Cấu hình barcode', url: '/system/barcode-config', icon: 'fa fa-barcode' },
    { fatherId: 2, groupId: 1003, id: 216, isDisabled: false, moduleId: EnumModule.ObjectGencodeConfig, name: 'Cấu hình sinh mã', url: '/system/gencode-config', icon: 'fas fa-terminal' },
    { fatherId: 2, groupId: 1003, id: 217, isDisabled: false, moduleId: EnumModule.CustomGencodeConfig, name: 'Cấu hình sinh mã tùy chọn', url: '/system/customgencode-config', icon: 'fas fa-terminal' },
    { fatherId: 2, groupId: 1003, id: 222, isDisabled: false, moduleId: EnumModule.Menu, name: 'Cấu hình menu', url: '/system/menuconfig', icon: 'fa fa-list' },

    { fatherId: 2, groupId: 1001, id: 208, isDisabled: false, isLove: true, moduleId: EnumModule.Customer, name: 'Đối tác', url: '/system/customer', icon: 'far fa-address-card' },
    { fatherId: 2, groupId: 1002, id: 207, isDisabled: false, isLove: true, moduleId: EnumModule.StockManager, name: 'Kho chứa', url: '/system/stock-manager', icon: 'fas fa-building' },
    { fatherId: 2, groupId: 1002, id: 227, isDisabled: false, moduleId: EnumModule.StockManager, name: 'Phân quyền kho', url: '/system/stock-role', icon: 'fas fa-user-tag' },
    { fatherId: 2, groupId: 1002, id: 209, isDisabled: false, moduleId: EnumModule.Location, name: 'Vị trí lưu kho', url: '/system/location-manager', icon: 'fa fa-map-marker-alt' },
    { fatherId: 2, groupId: 1001, id: 201, isDisabled: false, moduleId: EnumModule.User, name: 'Nhân viên', url: '/system/users', icon: 'fa fa-user' },
    { fatherId: 2, groupId: 1001, id: 202, isDisabled: false, moduleId: EnumModule.Role, name: 'Nhóm quyền', url: '/system/roles', icon: 'fa fa-user-secret' },
    { fatherId: 2, groupId: 1003, id: 221, isDisabled: false, moduleId: EnumModule.ObjectProcess, name: 'Cấu hình xử lý', url: '/system/object-process/configs', icon: 'fa fa-check-square' },
    { fatherId: 2, groupId: 1001, id: 218, isDisabled: false, moduleId: EnumModule.BusinessInfo, name: 'Thông tin doanh nghiệp', url: '/system/business-info', icon: 'fas fa-address-card' },
    { fatherId: 2, groupId: 1001, id: 219, isDisabled: false, moduleId: EnumModule.Department, name: 'Thông tin bộ phận', url: '/system/department', icon: 'far fa-building' },
    { fatherId: 2, groupId: 1001, id: 220, isDisabled: false, moduleId: EnumModule.Subsidiaries, name: 'Công ty con', url: '/system/subsidiary', icon: 'fa fa-id-card'},

    { fatherId: 0, id: 3, isDisabled: false, moduleId: 0, name: 'Quản trị kho', url: '/stock/', icon: 'fab fa-stack-overflow' },
    { fatherId: 3, groupId: 3001, id: 307, isDisabled: false, isLove: true, moduleId: EnumModule.StockWarnings, name: 'Danh sách kho', url: '/stock/stock-warnings', icon: 'fab fa-stack-overflow' },
    { fatherId: 3, groupId: 3001, id: 301, isDisabled: false, isLove: true, moduleId: EnumModule.GoodReceipt, name: 'Nhập kho', url: '/stock/input', icon: 'fa fa-download' },
    { fatherId: 3, groupId: 3001, id: 302, isDisabled: false, isLove: true, moduleId: EnumModule.GoodIssue, name: 'Xuất kho', url: '/stock/output', icon: 'fa fa-upload' },
    { fatherId: 3, groupId: 3002, id: 303, isDisabled: false, moduleId: EnumModule.StockReport, name: 'Báo cáo tổng hợp XNT', url: '/stock/report/general', icon: 'fas fa-chart-area' },
    { fatherId: 3, groupId: 3002, id: 305, isDisabled: false, moduleId: EnumModule.StockReport, name: 'Báo cáo TH XNT(S.lg)', url: '/stock/report/general-quantity', icon: 'fas fa-chart-bar' },
    { fatherId: 3, groupId: 3002, id: 306, isDisabled: false, moduleId: EnumModule.StockReport, name: 'Nhật ký nhập xuất kho', url: '/stock/report/input-output-log', icon: 'fas fa-clipboard' },
    { fatherId: 3, groupId: 3002, id: 304, isDisabled: false, moduleId: EnumModule.StockReport, name: 'Thẻ kho', url: '/stock/report/productdetail-report', icon: 'fa fa-book' },

    { fatherId: 0, id: 4, isDisabled: false, moduleId: 0, name: 'Mua hàng', url: '/purchase/', icon: 'fas fa-shopping-cart' },
    { fatherId: 4, groupId: 4001, id: 401, isDisabled: false, isLove: true, moduleId: EnumModule.PurchasingRequest, name: 'Yêu cầu vật tư', url: '/purchase/purchasingRequest', icon: 'fas fa-receipt' },
    { fatherId: 4, groupId: 4001, id: 402, isDisabled: false, isLove: true, moduleId: EnumModule.PurchasingSuggest, name: 'Đề nghị mua hàng', url: '/purchase/purchasingSuggest', icon: 'fas fa-ellipsis-v' },
    { fatherId: 4, groupId: 4002, id: 403, isDisabled: false, isLove: true, moduleId: EnumModule.AssignedProcurement, name: 'Danh sách phân công', url: '/purchase/assigned-procurement?mode=all', icon: 'far fa-minus-square' },
    { fatherId: 4, groupId: 4002, id: 403, isDisabled: false, isLove: true, moduleId: EnumModule.AssignedProcurement, name: 'Phân công của tôi', url: '/purchase/assigned-procurement', param: {mode : 'onlyme'}, icon: 'far fa-minus-square' },
    { fatherId: 4, groupId: 4002, id: 404, isDisabled: false, isLove: true, moduleId: EnumModule.PurchasingOrder, name: 'Đơn mua hàng', url: '/purchase/purchasingOrder', icon: 'fas fa-scroll' },

    { fatherId: 0, id: 5, isDisabled: false, moduleId: 0, name: 'Kế toán', url: '/accountant/', icon: 'far fa-money-bill-alt' },
    { fatherId: 2, groupId: 1004,  id: 701, isDisabled: false, moduleId: EnumModule.CategoryConfig, name: 'Cấu hình danh mục', url: '/category/category-config', icon: 'fas fa-cogs' },
    { fatherId: 2, groupId: 1004,  id: 504, isDisabled: false, moduleId: EnumModule.Input, name: 'Cấu hình chứng từ', url: '/accountant/accounting-inputs', icon: 'fas fa-cogs' },
    { fatherId: 2, groupId: 1004,  id: 504, isDisabled: false, moduleId: EnumModule.ProgrammingFunction, name: 'Global Function', url: '/accountant/functions', icon: 'fas fa-cogs' },


    { fatherId: 0, id: 6, isDisabled: false, moduleId: 0, name: 'Báo cáo', url: '/report/', icon: 'fas fa-chart-area' },
    { fatherId: 2, groupId: 1004, id: 601, isDisabled: false, moduleId: EnumModule.ReportType, name: 'Cấu hình báo cáo', url: '/report/report-type', icon: 'fas fa-cogs' },

    // { fatherId: 0, id: 7, isDisabled: false, moduleId: 0, name: 'Danh mục', url: '/report/', icon: 'fas fa-chart-area' },

];

