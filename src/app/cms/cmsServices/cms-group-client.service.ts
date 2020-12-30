import { Injectable } from "@angular/core";
import { ApiService } from "src/app/core/services/base/api.service";
import { ApiEndpoint } from "src/app/core/models/base/CMSSession.model";
import { IXModuleContext } from "src/app/core/models/base/IXModuleContext";
import { EnumMethod } from "src/app/common/constants/global/Enums";
import { FileObject } from "src/app/core/services/base/base.service";
import { CMSClientModel, CMSGroupClientModel, ClientApi, GroupClientApi } from "../cmsModel/group-client.model";

@Injectable({
    providedIn: 'root'
})
export class CMSGroupClientService {

    constructor(private apiService: ApiService) {

    }

    // Lấy về nhóm máy. 
    searchGroupClient(context: IXModuleContext, keyword: string = ''){
        const url = `${GroupClientApi}?keyword=${keyword}`; 
        return this.apiService.requestApi<CMSGroupClientModel[]>(context, url, EnumMethod.Get); 
    }

    // Lấy chi tiêt một nhóm máy
    getGroupClientDetail(context: IXModuleContext, id: number){
        const url = `${GroupClientApi}/${id}`;
        return this.apiService.requestApi<CMSGroupClientModel>(context, url, EnumMethod.Get); 
    }

    // Tạo một nhóm máy. 
    createGroupClient(context: IXModuleContext, model: CMSGroupClientModel){
        const url = `${GroupClientApi}`;
        return this.apiService.requestApi<any>(context, url, EnumMethod.Post, model); 
    }


    // Sửa chi tiết một nhóm máy 
    putGroupClient(context: IXModuleContext, id: number, model: CMSGroupClientModel){
        const url = `${GroupClientApi}/${id}`;
        return this.apiService.requestApi<any>(context, url, EnumMethod.Put, model);
    }

    // Xóa một nhóm máy
    deleteGroupClient(context: IXModuleContext, id: number){
        const url = `${GroupClientApi}/${id}`;
        return this.apiService.requestApi<any>(context, url, EnumMethod.Delete);   
    }

    // Đổi giá tiền cho máy. 
    changePriceGroupClient(context: IXModuleContext, id: number, model: CMSGroupClientModel){
        const url = `${GroupClientApi}/changePrice/${id}`
        return this.apiService.requestApi<any>(context, url, EnumMethod.Put, model);
    }

    // Đổi nhóm cho các máy trạm
    // id ở đây là id của nhóm máy
    changeGroupForClient(context: IXModuleContext, id: number, model: CMSGroupClientModel[]){
        const url = `${GroupClientApi}/changeGroup/${id}`; 
        return this.apiService.requestApi<any>(context, url, EnumMethod.Put, model);
    }

    // Lấy ra các client thuộc về một nhóm. 
    getClientsByGroupId(context: IXModuleContext, id: number){
        const url = `${ClientApi}/group/${id}/clients`; 
        return this.apiService.requestApi<CMSClientModel[]>(context, url, EnumMethod.Get);
    }
}