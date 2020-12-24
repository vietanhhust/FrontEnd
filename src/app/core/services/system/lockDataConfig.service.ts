import { Injectable } from "@angular/core";
import { ApiService } from "../base/api.service";
import { IXModuleContext } from "../../models/base/IXModuleContext";
import { SystemApis } from "src/app/common/constants/system/SystemApis";
import { EnumMethod } from "src/app/common/constants/global/Enums";
import { PagingData } from "../../models/base/responedata.model";
import { StockRole } from "../../models/stock/Stock";
import { LockDataConfigModel } from "../../models/system/lockData.model";

@Injectable({
    providedIn: 'root'
})
export class LockDataConfigService {
    constructor(private apiService: ApiService) {

    }

    getCurrentConfig(context: IXModuleContext){
        let url = SystemApis.lockConfig; 
        let method = EnumMethod.Get; 
        return this.apiService.requestApi<LockDataConfigModel>(context, url, method);
    }

    updateLockConfig(context: IXModuleContext, model: LockDataConfigModel){
        let url = SystemApis.lockConfig; 
        let method = EnumMethod.Put; 
        return this.apiService.requestApi<LockDataConfigModel>(context, url, method, model);
    }
}