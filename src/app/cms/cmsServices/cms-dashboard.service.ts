import { Injectable } from "@angular/core";
import { ApiService } from "src/app/core/services/base/api.service";
import { ApiEndpoint } from "src/app/core/models/base/CMSSession.model";
import { IXModuleContext } from "src/app/core/models/base/IXModuleContext";
import { EnumMethod } from "src/app/common/constants/global/Enums";
import { FileObject } from "src/app/core/services/base/base.service";
import { CMSClientModel, CMSGroupClientModel, ClientApi, GroupClientApi } from "../cmsModel/group-client.model";
import { DashboardApi, CMSDashboardModel } from "../cmsModel/dashBoard.model";

@Injectable({
    providedIn: 'root'
})
export class CMSDashboardService {

    constructor(private apiService: ApiService) {

    }

    // Lấy về nhóm máy. 
    searchGroupClient(context: IXModuleContext){
        let url = `${DashboardApi}`;
        return this.apiService.requestApi<CMSDashboardModel[]>(context, url, EnumMethod.Get); 
    }

    
}