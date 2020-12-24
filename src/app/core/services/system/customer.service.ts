import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { EnumObjectType } from 'src/app/common/constants/system/EnumObjectType';
import { ApiService } from 'src/app/core/services/base/api.service';
import { SystemApis } from 'src/app/common/constants/system/SystemApis';
import { EnumMethod } from 'src/app/common/constants/global/Enums';
import { EnumFileType } from 'src/app/common/constants/global/Enums';
import { FileObject } from '../base/base.service';
import { IXModuleContext } from '../../models/base/IXModuleContext';
import { PagingData } from '../../models/base/responedata.model';
import { CustomerOutput, CustomerInput } from '../../models/system/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private apiService: ApiService) {

  }
  public getAll(context: IXModuleContext, keyword: string, page: number, size: number) {
    let url = `${SystemApis.customers}?keyword=${keyword}&page=${page}&size=${size}`;
    let method = EnumMethod.Get;
    return this.apiService.requestApi<PagingData<CustomerOutput>>(context, url, method);
  }
  public add(context: IXModuleContext, customer: CustomerInput) {
    let url = `${SystemApis.customers}`;
    let method = EnumMethod.Post;
    return this.apiService.requestApi<number>(context, url, method, customer);
  }
  public update(context: IXModuleContext, customerId: number, customer: CustomerInput) {
    let url = `${SystemApis.customers}/${customerId}`;
    let method = EnumMethod.Put;
    return this.apiService.requestApi<null>(context, url, method, customer);
  }
  public delete(context: IXModuleContext, customerId: number) {
    let url = `${SystemApis.customers}/${customerId}`;
    let method = EnumMethod.Delete;
    return this.apiService.requestApi<null>(context, url, method);
  }
  public getDetail(context: IXModuleContext, customerId: number) {
    let url = `${SystemApis.customers}/${customerId}`;
    let method = EnumMethod.Get;
    return this.apiService.requestApi<CustomerOutput>(context, url, method);
  }
  public getByIds(context: IXModuleContext, ids: any) {
    let url = `${SystemApis.customers}/GetByIds`;
    let method = EnumMethod.Post;
    return this.apiService.requestApi<any>(context, url, method, ids);
  }

  public uploadFile(context: IXModuleContext, fileType: EnumFileType, file: FileObject, data?: any) {
    const url = `${SystemApis.customers}/File/${fileType}`;
    const files: FileObject[] = [];
    files[0] = file;
    return this.apiService.postFiles<number>(context, url, files, data);
  }
  public importCustomerData(context: IXModuleContext, fileId: number) {
    const url = `${SystemApis.customers}/ImportCustomerData`;
    const method = EnumMethod.Post;
    return this.apiService.requestApi<null>(context, url, method, fileId);
  }

  public fieldDataForMapping(context: IXModuleContext) {
    // const url = `${SystemApis.customers}/fieldDataForMapping`;
    // const method = EnumMethod.Get;
    // return this.apiService.requestApi<any>(context, url, method);
  }

  public importExcelFromMapping(context: IXModuleContext, data: any, file: FileObject) {
    // const url = `${SystemApis.customers}/importFromMapping`;
    // return this.apiService.postFilesData<boolean>(context, url, [file], { mapping: JSON.stringify(data) });
  }

}
