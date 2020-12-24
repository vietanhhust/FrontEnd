import { Injectable } from '@angular/core';
import { EnumMethod } from 'src/app/common/constants/global/Enums';
import { SystemApis } from 'src/app/common/constants/system/SystemApis';
import { ApiService } from 'src/app/core/services/base/api.service';
import { stringify } from 'querystring';
import { EnumObjectType } from 'src/app/common/constants/system/EnumObjectType';
import { IXModuleContext } from '../../models/base/IXModuleContext';
import { PagingData } from '../../models/base/responedata.model';
import { Department } from '../../models/system/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  constructor(private apiService: ApiService) {
  }

  public search(context: IXModuleContext, keyword: string, page: number, size: number, isActived?: boolean) {
    if(keyword){
      keyword=`keyword=${keyword}&`;
    }
    let isActivedParam = '';
    if(isActived){
      isActivedParam = `isActived=${isActived}&`
    }
    let url = `${SystemApis.departments}?${keyword}${isActivedParam}page=${page}&size=${size}`;
    let method = EnumMethod.Get;
    return this.apiService.requestApi<PagingData<Department>>(context, url, method);
  }

  public add(context: IXModuleContext, departmentObj: Department) {
    let url = `${SystemApis.departments}`;
    let method = EnumMethod.Post;
    return this.apiService.requestApi<number>(context, url, method, departmentObj);
  }

  public update(context: IXModuleContext, departmentId: number, departmentObj: Department) {
    let url = `${SystemApis.departments}/${departmentId}`;
    let method = EnumMethod.Put;
    return this.apiService.requestApi<null>(context, url, method, departmentObj);
  }

  public delete(context: IXModuleContext, departmentId: number) {
    let url = `${SystemApis.departments}/${departmentId}`;
    let method = EnumMethod.Delete;
    return this.apiService.requestApi<null>(context, url, method);
  }

  public getInfo(context: IXModuleContext, departmentId: number) {
    let url = `${SystemApis.departments}/${departmentId}`;
    let method = EnumMethod.Get;
    return this.apiService.requestApi<Department>(context, url, method);
  }
}
