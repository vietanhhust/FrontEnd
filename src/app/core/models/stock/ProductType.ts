
export interface ProductTypeOutput {
    productTypeId: number;
    productTypeName: string;
    identityCode: string;
    parentProductTypeId?: number
    sortOrder: number;
}

export interface ProductTypeLevel {
    level: number;
    info: ProductTypeOutput;
}

export interface ProductTypeInput {
    productTypeName: string;
    identityCode: string;
    parentProductTypeId?: number;
    sortOrder: number;
}
