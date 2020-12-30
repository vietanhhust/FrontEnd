import { Injectable } from "@angular/core";
import { ApiService } from "src/app/core/services/base/api.service";
import { ApiEndpoint } from "src/app/core/models/base/CMSSession.model";
import { IXModuleContext } from "src/app/core/models/base/IXModuleContext";
import { EnumMethod } from "src/app/common/constants/global/Enums";
import { FileObject } from "src/app/core/services/base/base.service";
import { GroupRoleAPi, CMSGroupRoleModel, RoleActiveApi, CMSRoleActiveModel } from "../cmsModel/role.model";

@Injectable({
    providedIn: 'root'
})
export class CMSRoleService {

    constructor(private apiService: ApiService) {
    }

    //Lấy về role theo từ khóa. 
    searchGroupRole(context: IXModuleContext, keyword: string = ''){
        let url = `${GroupRoleAPi}?keyword=${keyword}`
        return this.apiService.requestApi<CMSGroupRoleModel[]>(context, url, EnumMethod.Get);
    }

    // Thêm mới 1 groupRole 
    createGroupRole(context: IXModuleContext, model: CMSGroupRoleModel){
        let url = `${GroupRoleAPi}`; 
        return this.apiService.requestApi<any>(context, url, EnumMethod.Post, model);
    }

    // Lấy chi tiết role
    getGroupRoleDetail(context: IXModuleContext, id: number){
        let url = `${GroupRoleAPi}/${id}`; 
        return this.apiService.requestApi<CMSGroupRoleModel>(context, url, EnumMethod.Get);
    }

    // Sửa 1 group role. 
    updateGroupRoleDetail(context: IXModuleContext, id: number, model: CMSGroupRoleModel){
        let url = `${GroupRoleAPi}/${id}`; 
        return this.apiService.requestApi<any>(context, url, EnumMethod.Put, model);
    }

    // Xóa một group role
    deleteGroupRole(context: IXModuleContext, id: number){
        let url = `${GroupRoleAPi}/${id}`;
        return this.apiService.requestApi<any>(context, url, EnumMethod.Delete);
    }

    // Phân quyền cho 1 nhóm quyền 
    grantRoleToGroup(context: IXModuleContext, id: number, model){
        
    }

    // Lấy quyền theo nhóm quyền 
    getRoleActiveByGroupId(context: IXModuleContext, id: number, keyword: string = ''){
        let url = `${RoleActiveApi}/group/${id}?keyword=${keyword}`; 
        return this.apiService.requestApi<CMSRoleActiveModel[]>(context, url, EnumMethod.Get); 
    }

    // Update quyền 
    updateRoleActiveByGroupId(context: IXModuleContext, id: number, model: CMSRoleActiveModel[]){
        let url = `${RoleActiveApi}/group/${id}`;
        return this.apiService.requestApi<any>(context, url, EnumMethod.Put, model);
    }
}