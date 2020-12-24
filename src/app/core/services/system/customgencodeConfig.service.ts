import { Injectable } from '@angular/core';
import { EnumMethod } from 'src/app/common/constants/global/Enums';
import { SystemApis } from 'src/app/common/constants/system/SystemApis';
import { ApiService } from 'src/app/core/services/base/api.service';
import { stringify } from 'querystring';
import { EnumObjectType } from 'src/app/common/constants/system/EnumObjectType';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExtraRequestOptions } from '../base/base.service';
import { IXModuleContext } from '../../models/base/IXModuleContext';
import { PagingData } from '../../models/base/responedata.model';

import { GencodeObjectType } from '../../models/stock/GencodeConfig';
import { ObjectCustomGenCodeMapping } from '../../models/system/objectcustomgencodemapping.model';
import { ObjectGenCodeMappingTypeModel } from '../../models/system/ObjectGenCodeMappingTypeModel';
import { CustomGenCodeOutputModel } from '../../models/system/CustomGenCodeOutputModel';
import { ObjectGenCodeMappingInput } from '../../models/system/ObjectGenCodeMappingInput';
import { dateHelperService } from 'src/app/shared/services/getFirstloadDate.service';

@Injectable({
  providedIn: 'root'
})
export class CustomGencodeConfigService {
  constructor(private apiService: ApiService, private dateHelper: dateHelperService) {
  }

  public getObjectGenCodeMappingTypes(context: IXModuleContext, keyword: string, page: number, size: number) {
    const url = `${SystemApis.objectGenCode}?keyword=${keyword}&page=${page}&size=${size}`;
    const method = EnumMethod.Get;
    return this.apiService.requestApi<PagingData<ObjectGenCodeMappingTypeModel>>(context, url, method);
  }

  public currentConfig(context: IXModuleContext, targetObjectTypeId: EnumObjectType, configObjectTypeId: EnumObjectType, configObjectId: number,
    fId: number, code: string, date: number,
    opt?: ExtraRequestOptions) {

    const queries = {
      targetObjectTypeId,
      configObjectTypeId,
      configObjectId,
      code,
      fId,
      date: this.dateHelper.parseInputDate(date)
    }

    const url = this.apiService.addQueryString(`${SystemApis.objectGenCode}/currentConfig`, queries);
    const method = EnumMethod.Get;
    return this.apiService.requestApi<CustomGenCodeOutputModel>(context, url, method, null, opt);
  }

  public mapObjectCustomGenCode(context: IXModuleContext, model: ObjectGenCodeMappingInput) {
    const url = `${SystemApis.objectGenCode}/objectCustomGenCode`;
    const method = EnumMethod.Post;
    return this.apiService.requestApi<boolean>(context, url, method, model);
  }

  public deleteMapObjectGenCode(context: IXModuleContext, objectCustomGenCodeMappingId: number) {
    const url = `${SystemApis.objectGenCode}/${objectCustomGenCodeMappingId}`;
    const method = EnumMethod.Delete;
    return this.apiService.requestApi<boolean>(context, url, method);
  }



}
