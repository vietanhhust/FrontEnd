export interface StockWarningOutput {
    stockId: number,
    stockName: string,
    check?: boolean,
    warnings: WarningOutput[]
}
export interface WarningOutput {
    productId: number,
    productCode: string,
    productName: string,
    stockWarningTypeId: number,
    packageCode: string
}
