import { ApiEndpoint } from "src/app/core/models/base/CMSSession.model";

export interface CategoryItemModel{
    id?: number,
    categoryId?: number,
    categoryItemName?: string,
    unitPrice?: number,
    imageUrl?: string,
    categoryName?: string
}

export interface CategoryModel{
    id?: number, 
    categoryName?: string, 
    description?: string,
}

//Endpoint
export const CategoryApi = `${ApiEndpoint}category`
export const CategoryItemApi = `${ApiEndpoint}categoryItem`;