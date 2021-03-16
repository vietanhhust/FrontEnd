import { Injectable } from "@angular/core";
import { ApiService } from "src/app/core/services/base/api.service";
import { ApiEndpoint } from "src/app/core/models/base/CMSSession.model";
import { IXModuleContext } from "src/app/core/models/base/IXModuleContext";
import { EnumMethod } from "src/app/common/constants/global/Enums";
import { FileObject } from "src/app/core/services/base/base.service";
import { AccountApi, AccountModel, BalanceModel } from "../cmsModel/account.model";
import { CMSHistoryBalanceChangeQueryModel, HistoryApi, CMSHistoryBalanceChangeModel, CMSHistoryOrderModel, CMSOrderDetailModel, CMSOrderDbModel } from "../cmsModel/history.model";

@Injectable({
    providedIn: 'root'
})
export class CMSHistoryService{
    
    constructor(private apiService: ApiService){

    }

    // Lấy về tất cả tài khoản.
    public getHistoryByQuery(context: IXModuleContext, model: CMSHistoryBalanceChangeQueryModel) {
        const url = `${HistoryApi}/balance`;
        return this.apiService.requestApi<CMSHistoryBalanceChangeModel[]>(context, url, EnumMethod.Post, model);
    }
    
   
    // Lấy về các đơn yêu cầu theo bộ lọc
    public getHistoryOrderByQuery(context: IXModuleContext, model: CMSHistoryOrderModel) {
        const url = `${HistoryApi}/order`;
        return this.apiService.requestApi<CMSOrderDbModel[]>(context, url, EnumMethod.Post, model);
    }

    // Lấy về detail theo id dodwdn 
    public getOrderDetail(context: IXModuleContext, id: number){
        const url = `${HistoryApi}/details/${id}`;
        return this.apiService.requestApi<CMSOrderDetailModel[]>(context, url, EnumMethod.Get);
    }
}