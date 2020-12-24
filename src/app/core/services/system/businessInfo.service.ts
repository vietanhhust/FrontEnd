import { Injectable } from '@angular/core';
import { EnumMethod } from 'src/app/common/constants/global/Enums';
import { SystemApis } from 'src/app/common/constants/system/SystemApis';
import { ApiService } from 'src/app/core/services/base/api.service';
import { stringify } from 'querystring';
import { IXModuleContext } from '../../models/base/IXModuleContext';
import { BusinessInfo } from '../../models/system/businessinfo.model';

@Injectable({
  providedIn: 'root'
})
export class BusinessInfoService {
  constructor(private apiService: ApiService) {
  }

  public getInfo(context: IXModuleContext) {
    let url = `${SystemApis.businessInfo}`;
    let method = EnumMethod.Get;
    return this.apiService.requestApi<BusinessInfo>(context, url, method);
  }

  public update(context: IXModuleContext, businessInfo: BusinessInfo) {
    let url = `${SystemApis.businessInfo}`;
    let method = EnumMethod.Put;
    return this.apiService.requestApi<null>(context, url, method, businessInfo);
  }
}
