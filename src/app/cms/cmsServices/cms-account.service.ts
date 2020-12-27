import { Injectable } from "@angular/core";
import { ApiService } from "src/app/core/services/base/api.service";
import { ApiEndpoint } from "src/app/core/models/base/CMSSession.model";
import { IXModuleContext } from "src/app/core/models/base/IXModuleContext";
import { EnumMethod } from "src/app/common/constants/global/Enums";
import { FileObject } from "src/app/core/services/base/base.service";
import { AccountApi, AccountModel, BalanceModel } from "../cmsModel/account.model";

@Injectable({
    providedIn: 'root'
})
export class CMSAccountService{
    
    constructor(private apiService: ApiService){

    }

    // Lấy về tất cả tài khoản.
    public getAccount(context: IXModuleContext) {
        const url = `${AccountApi}`;
        return this.apiService.requestApi<AccountModel[]>(context, url, EnumMethod.Get);
    }
    
    // Lấy về tài khoản
    public getAccountByKeyword(context: IXModuleContext, keyword?: string) {
        const url = `${AccountApi}/search?keyword=${keyword}`;
        const method = EnumMethod.Get;
        return this.apiService.requestApi<AccountModel[]>(context, url, method);
    }

    // Lấy chi tiết tài khoản
    public getAccountDetail(context: IXModuleContext, id?: number) {
        const url = `${AccountApi}/${id}`;
        const method = EnumMethod.Get;
        return this.apiService.requestApi<AccountModel>(context, url, method);
    }

    // Tạo mới tài khoản
    public createAccount(context: IXModuleContext, model: AccountModel){
        const url = `${AccountApi}`;
        return this.apiService.requestApi<any>(context, url, EnumMethod.Post, model);
    }

    // Sửa danh mục 
    public putAccount(context: IXModuleContext, id: number, model: AccountModel){
        const url = `${AccountApi}/${id}`;
        return this.apiService.requestApi<any>(context, url, EnumMethod.Put, model);
    }

    // Xóa tài khoản.
    public deleteAccount(context: IXModuleContext, id: number){
        const url = `${AccountApi}/${id}`;
        return this.apiService.requestApi<any>(context, url, EnumMethod.Delete);
    }

    // Nạp tiền 
    public addBalanceAccount(context: IXModuleContext, model: BalanceModel){
        const url = `${AccountApi}/balance`; 
        return this.apiService.requestApi<any>(context, url, EnumMethod.Put, model);
    }

    // Trả tiền. 
    public refundAccount(context: IXModuleContext, model: BalanceModel){
        const url = `${AccountApi}/refund`; 
        return this.apiService.requestApi<any>(context, url, EnumMethod.Put, model);
    }
}