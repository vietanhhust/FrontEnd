import { Injectable } from '@angular/core';
import { EnumMethod } from 'src/app/common/constants/global/Enums';
import { SystemApis } from 'src/app/common/constants/system/SystemApis';
import { ApiService } from 'src/app/core/services/base/api.service';
import { stringify } from 'querystring';
import { IXModuleContext } from '../../models/base/IXModuleContext';
import { ObjectProcessInfoModel, ObjectProcessInfoStepListModel, ObjectProcessInfoStepModel } from '../../models/system/objectProcessInfoModel.model';

@Injectable({
  providedIn: 'root'
})
export class ObjectProcessService {
  constructor(private apiService: ApiService) {
  }

  public getList(context: IXModuleContext) {
    let url = `${SystemApis.objectProcess}`;
    let method = EnumMethod.Get;
    return this.apiService.requestApi<ObjectProcessInfoModel[]>(context, url, method);
  }

  public getSteps(context: IXModuleContext, objectProcessTypeId: number) {
    let url = `${SystemApis.objectProcess}/${objectProcessTypeId}/Steps`;
    let method = EnumMethod.Get;
    return this.apiService.requestApi<ObjectProcessInfoStepListModel[]>(context, url, method);
  }

  public objectProcessStepCreate(context: IXModuleContext, objectProcessTypeId: number, model: ObjectProcessInfoStepModel) {
    let url = `${SystemApis.objectProcess}/${objectProcessTypeId}/Steps`;
    let method = EnumMethod.Post;
    return this.apiService.requestApi<number>(context, url, method, model);
  }

  public objectProcessStepUpdate(context: IXModuleContext, objectProcessTypeId: number, objectProcessStepId: number, model: ObjectProcessInfoStepModel) {
    let url = `${SystemApis.objectProcess}/${objectProcessTypeId}/Steps/${objectProcessStepId}`;
    let method = EnumMethod.Put;
    return this.apiService.requestApi<boolean>(context, url, method, model);
  }

  public objectProcessStepDelete(context: IXModuleContext, objectProcessTypeId: number, objectProcessStepId: number) {
    let url = `${SystemApis.objectProcess}/${objectProcessTypeId}/Steps/${objectProcessStepId}`;
    let method = EnumMethod.Delete;
    return this.apiService.requestApi<boolean>(context, url, method);
  }

}
