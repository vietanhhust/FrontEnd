import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';

import { ApiService } from 'src/app/core/services/base/api.service';
import { SystemApis } from 'src/app/common/constants/system/SystemApis';
import { EnumMethod, EnumBarcodeStandard } from 'src/app/common/constants/global/Enums';
import { IXModuleContext } from '../../models/base/IXModuleContext';
import { PagingData } from '../../models/base/responedata.model';
import { BarcodeConfigOutput, BarcodeConfigInput } from '../../models/stock/BarcodeConfig';

@Injectable({
  providedIn: 'root'
})
export class BarcodeConfigService {
  constructor(private apiService: ApiService) {
  }

  public Generate(context: IXModuleContext, barcodeConfigId: number) {
    let url = `${SystemApis.barcodeConfigs}/${barcodeConfigId}/Generate`;
    let method = EnumMethod.Post;
    return this.apiService.requestApi<string>(context, url, method);
  }

  public search(context: IXModuleContext, keyword: string, page: number, size: number) {
    let url = `${SystemApis.barcodeConfigs}?keyword=${keyword}&page=${page}&size=${size}`;
    let method = EnumMethod.Get;
    return this.apiService.requestApi<PagingData<BarcodeConfigOutput>>(context, url, method);
  }

  public add(context: IXModuleContext, barcodeConfigsObj: BarcodeConfigInput) {
    let url = SystemApis.barcodeConfigs;
    let method = EnumMethod.Post;
    return this.apiService.requestApi<number>(context, url, method, barcodeConfigsObj);
  }

  public update(context: IXModuleContext, barcodeConfigId: number, barcodeConfigsObj: BarcodeConfigInput) {
    let url = `${SystemApis.barcodeConfigs}/${barcodeConfigId}`;
    let method = EnumMethod.Put;
    return this.apiService.requestApi<null>(context, url, method, barcodeConfigsObj);
  }

  public delete(context: IXModuleContext, barcodeConfigId: number) {
    let url = `${SystemApis.barcodeConfigs}/${barcodeConfigId}`;
    let method = EnumMethod.Delete;
    return this.apiService.requestApi<null>(context, url, method);
  }

  public getInfo(context: IXModuleContext, barcodeConfigId: number) {
    let url = `${SystemApis.barcodeConfigs}/${barcodeConfigId}`;
    let method = EnumMethod.Get;
    return this.apiService.requestApi<BarcodeConfigInput>(context, url, method);
  }
}
