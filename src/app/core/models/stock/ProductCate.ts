import { MenuOutputModel } from "../system/businessinfo.model";

export interface ProductCateOutput {
    productCateId: number;
    productCateName: string;
    parentProductCateId?: number;
    sortOrder: number;

    checked?: boolean;
}
export interface ProductCateOutputProduct {
    productCateId: number;
    productCateName: string;
    sortOrder: number;

    checked:boolean;
}
export interface ProductCateProductLevel {
    level: number;
    checked:boolean;
    info: ProductCateOutput;
}
export interface ProductCateLevel {
    level: number;
    info: ProductCateOutput;
}

export interface ProductCateInput {
    productCateName: string;
    parentProductCateId?: number;
    sortOrder: number;
}
export interface MenuLevel {
  level: number;
  info: MenuOutputModel;
}
