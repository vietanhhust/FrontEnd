export interface StockReportInventory {
    total: number;
    list: [
        {
            productCode: string;
            productName: string;
            primaryQualtityBefore: number;
            primaryQualtityInput: number;
            primaryQualtityOutput: number;
            primaryQualtityAfter: number;
            unitId: number;
            unitName?: string;
        }
    ];
}
