import { Injectable } from "@angular/core";
import { ApiService } from "src/app/core/services/base/api.service";
import { ApiEndpoint } from "src/app/core/models/base/CMSSession.model";
import { IXModuleContext } from "src/app/core/models/base/IXModuleContext";
import { EnumMethod } from "src/app/common/constants/global/Enums";
import { FileObject } from "src/app/core/services/base/base.service";
import { AccountApi, AccountModel, BalanceModel } from "../cmsModel/account.model";
import { CMSHistoryBalanceChangeQueryModel, HistoryApi, CMSHistoryBalanceChangeModel } from "../cmsModel/history.model";
import { ManagingAccountApi, CMSManagingAccountModel } from "../cmsModel/managingAccount.model";

@Injectable({
    providedIn: 'root'
})
export class CMSManagingAccountService{
    
    constructor(private apiService: ApiService){

    }

    // Lấy về tất cả tài khoản.
    public getManagingAccount(context: IXModuleContext, keyword?: string) {
        if(!keyword){
            keyword = ''
        }
        const url = `${ManagingAccountApi}?keyword=${keyword}`;
        return this.apiService.requestApi<CMSManagingAccountModel[]>(context, url, EnumMethod.Get);
    }

    public searchManagingAccount(context: IXModuleContext, keyword?: string) {
        if(!keyword){
            keyword = ''
        }
        const url = `${ManagingAccountApi}/search?keyword=${keyword}`;
        return this.apiService.requestApi<CMSManagingAccountModel[]>(context, url, EnumMethod.Get);
    }
    
   
}