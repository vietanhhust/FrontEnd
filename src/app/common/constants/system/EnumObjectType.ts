export enum EnumObjectType {
  UserAndEmployee = 1,
  Role = 2,
  RolePermission = 3,
  ProductCate = 4,
  ProductType = 5,
  Product = 6,
  Unit = 7,
  BarcodeConfig = 8,
  /// <summary>
  /// Kho
  /// </summary>
  Stock = 9,
  File = 10,
  /// <summary>
  /// Vị trí trong Kho
  /// </summary>
  Location = 11,

  /// <summary>
  /// Phiếu nhập/xuất kho
  /// </summary>
  Inventory = 12,

  /// <summary>
  /// Phiếu nhập/xuất kho chi tiết
  /// </summary>
  InventoryDetail = 13,

  /// <summary>
  /// Gói / kiện
  /// </summary>
  Package = 14,

  /// <summary>
  /// Gói / kiện
  /// </summary>
  StockProduct = 15,

  GenCodeConfig = 16,

  Customer = 17,

  /// <summary>
  /// BOM - Bill of Material - Thông tin vật tư cấu thành nên sản phẩm
  /// </summary>
  ProductBom = 18,

  /// <summary>
  /// Yêu cầu VT HH
  /// </summary>
  PurchasingRequest = 19,

  PurchasingRequestDetail = 20,

  /// <summary>
  /// Đề nghị mua VT HH
  /// </summary>
  PurchasingSuggest = 21,

  PurchasingSuggestDetail = 22,
  PoAssignment = 23,
  PoAssignmentDetail = 24,
  /// <summary>
  /// PO - Đơn đặt hàng
  /// </summary>
  PurchaseOrder = 25,
  PurchaseOrderDetail = 26,
  BusinessInfo = 28,
  InventoryInput = 30,
  InventoryOutput = 31,
  Category = 32,
  InputType = 34,
  InputTypeRow = 37,

  CategoryConfig = 32,
  CategoryField = 33,

  // new accountantcy
  InputTypeConfig = 34,

  InputAreaField = 38,

  VoucherType = 53,
  VoucherTypeGroup = 54,
  VoucherTypeView = 55,

  VoucherTypeRow = 56,
  VoucherAreaField = 59,

  ProductionOrder = 70,
  OutsourceOrder = 72,
}
export enum EnumMessageType {
  ActivityLog = 1,
  Comment = 2
}
