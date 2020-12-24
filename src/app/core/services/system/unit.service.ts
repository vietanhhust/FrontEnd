import { Injectable, Type } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';

import { ApiService } from 'src/app/core/services/base/api.service';
import { SystemApis } from 'src/app/common/constants/system/SystemApis';
import { EnumMethod } from 'src/app/common/constants/global/Enums';
import { IXModuleContext } from '../../models/base/IXModuleContext';
import { PagingData } from '../../models/base/responedata.model';
import { UnitOutput, UnitInput } from '../../models/system/unit.model';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  constructor(private apiService: ApiService) {

  }
  public search(context: IXModuleContext, keyword: string, page: number, size: number) {
    let url = `${SystemApis.units}?keyword=${keyword}&page=${page}&size=${size}`;
    let method = EnumMethod.Get;
    return this.apiService.requestApi<PagingData<UnitOutput>>(context, url, method);
  }
  public add(context: IXModuleContext, unit: UnitInput) {
    let url = `${SystemApis.units}`;
    let method = EnumMethod.Post;
    return this.apiService.requestApi<number>(context, url, method, unit);
  }
  public update(context: IXModuleContext, unitId: number, unit: UnitInput) {
    let url = `${SystemApis.units}/${unitId}`;
    let method = EnumMethod.Put;
    return this.apiService.requestApi<null>(context, url, method, unit);
  }
  public delete(context: IXModuleContext, unitId: number) {
    let url = `${SystemApis.units}/${unitId}`;
    let method = EnumMethod.Delete;
    return this.apiService.requestApi<null>(context, url, method);
  }
  public getDetail(context: IXModuleContext, unitId: number) {
    let url = `${SystemApis.units}/${unitId}`;
    let method = EnumMethod.Get;
    return this.apiService.requestApi<UnitOutput>(context, url, method);
  }



}
