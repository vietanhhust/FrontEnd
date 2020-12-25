import { Injectable } from "@angular/core";
import { ApiService } from "src/app/core/services/base/api.service";
import { ApiEndpoint } from "src/app/core/models/base/CMSSession.model";
import { IXModuleContext } from "src/app/core/models/base/IXModuleContext";
import { CategoryApi, CategoryModel, CategoryItemApi, CategoryItemModel } from "../cmsModel/categoryItem.model";
import { EnumMethod } from "src/app/common/constants/global/Enums";
import { FileObject } from "src/app/core/services/base/base.service";

@Injectable({
    providedIn: 'root'
})
export class CMSCategoryService{
    
    constructor(private apiService: ApiService){

    }

    // Lấy về các loại danh mục
    public getCategory(context: IXModuleContext) {
        const url = `${CategoryApi}`;
        return this.apiService.requestApi<CategoryModel[]>(context, url, EnumMethod.Get);
    }
    
    // Lấy về các danh mục theo từ khóa. 
    public getCategoryItem(context: IXModuleContext, keyword?: string) {
        const url = `${CategoryItemApi}?keyword=${keyword}`;
        const method = EnumMethod.Get;
        return this.apiService.requestApi<CategoryItemModel[]>(context, url, method);
    }

    // Lấy chi tiết danh mục
    public getCategoryItemDetail(context: IXModuleContext, id?: number) {
        const url = `${CategoryItemApi}/${id}`;
        const method = EnumMethod.Get;
        return this.apiService.requestApi<CategoryItemModel>(context, url, method);
    }

    // Tạo mới danh mục
    public createCategoryItem(context: IXModuleContext, model: CategoryItemModel){
        const url = `${CategoryItemApi}`;
        return this.apiService.requestApi<any>(context, url, EnumMethod.Post, model);
    }

    // Sửa danh mục 
    public putCategoryItem(context: IXModuleContext, id: number, model: CategoryItemModel){
        const url = `${CategoryItemApi}/${id}`;
        return this.apiService.requestApi<any>(context, url, EnumMethod.Put, model);
    }

    // Xóa danh mục 
    public deleteCategoryItem(context: IXModuleContext, id: number){
        const url = `${CategoryItemApi}/${id}`;
        return this.apiService.requestApi<any>(context, url, EnumMethod.Delete);
    }

    // Upload file 
    public uploadCategoryImage(context: IXModuleContext, file: FileObject) {
        const url = `${CategoryItemApi}/image`;
        return this.apiService.postFilesData<any>(context, url, [file], {});
    }
}