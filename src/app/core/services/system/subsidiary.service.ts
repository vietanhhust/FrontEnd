import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';

import { ApiService } from 'src/app/core/services/base/api.service';
import { SystemApis } from 'src/app/common/constants/system/SystemApis';
import { EnumMethod, EnumAction } from 'src/app/common/constants/global/Enums';
import { IXModuleContext } from '../../models/base/IXModuleContext';
import { PagingData } from '../../models/base/responedata.model';
import { SubsidiaryModel, SubsidiaryOutputModel } from '../../models/system/subsidiary.model';


@Injectable({
    providedIn: 'root'
})
export class SubsidiaryService {
    constructor(private apiService: ApiService) {

    }
    public search(context: IXModuleContext, keyword: string, page: number, size: number) {
        const url = `${SystemApis.subsidiary}?keyword=${keyword}&page=${page}&size=${size}`;
        return this.apiService.requestApi<PagingData<SubsidiaryOutputModel>>(context, url, EnumMethod.Get);
    }
    
    public add(context: IXModuleContext, data: SubsidiaryModel) {
        const url = `${SystemApis.subsidiary}`;
        const method = EnumMethod.Post;
        return this.apiService.requestApi(context, url, method, data);
    }

    public delete(context: IXModuleContext, id: number) {
        const url = `${SystemApis.subsidiary}/${id}`;
        const method = EnumMethod.Delete;
        return this.apiService.requestApi(context, url, method);
    }
    
    public update(context: IXModuleContext, id: number, data: SubsidiaryModel) {
        const url = `${SystemApis.subsidiary}/${id}`;
        return this.apiService.requestApi<any>(context, url, EnumMethod.Put, data);
    }

    public getDetail(context: IXModuleContext, id: number) {
        const url = `${SystemApis.subsidiary}/${id}`;
        return this.apiService.requestApi<SubsidiaryOutputModel>(context, url, EnumMethod.Get);
    }

    public getAll(context: IXModuleContext, keyword: string) {
        const url = `${SystemApis.subsidiary}?keyword=${keyword}`;
        return this.apiService.requestApi<PagingData<SubsidiaryOutputModel>>(context, url, EnumMethod.Get);
    }

    public testOtherAPi(context: IXModuleContext){
        const url = `http://192.168.0.2:5001/api/Category/6`; 
        return this.apiService.requestApi<any>(context, url, EnumMethod.Put, {
            id: 3,
            description: "Thuốc lá, cỏ", 
            CategoryName: "Khác"
        });
    }

}
