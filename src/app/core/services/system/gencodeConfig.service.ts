import { Injectable } from '@angular/core';
import { concatMap, map } from 'rxjs/operators';
import { EnumMethod } from 'src/app/common/constants/global/Enums';
import { SystemApis } from 'src/app/common/constants/system/SystemApis';
import { ApiService } from 'src/app/core/services/base/api.service';
import { dateHelperService } from 'src/app/shared/services/getFirstloadDate.service';
import { IXModuleContext } from '../../models/base/IXModuleContext';
import { PagingData } from '../../models/base/responedata.model';
import { GencodeConfigOutput, GencodeObjectType, GencodeConfigInput } from '../../models/stock/GencodeConfig';
import { CustomCodeModel } from '../../models/system/CustomCodeModel';
import { CustomGenCodeInputModel } from '../../models/system/CustomGenCodeInputModel';
import { CustomGenCodeBaseValueModel, CustomGenCodeOutputModel } from '../../models/system/CustomGenCodeOutputModel';

@Injectable({
  providedIn: 'root'
})
export class GencodeConfigService {
  constructor(private apiService: ApiService, private dateHelper: dateHelperService) {
  }


  public getList(context: IXModuleContext, keyword: string, page: number, size: number) {
    const url = `${SystemApis.genCodeConfigs}?keyword=${keyword}&page=${page}&size=${size}`;
    const method = EnumMethod.Get;
    return this.apiService.requestApi<PagingData<CustomGenCodeOutputModel>>(context, url, method);
  }

  public getInfo(context: IXModuleContext, customGenCodeId: number) {
    const url = `${SystemApis.genCodeConfigs}/${customGenCodeId}`;
    const method = EnumMethod.Get;
    return this.apiService.requestApi<CustomGenCodeOutputModel>(context, url, method);
  }

  public update(context: IXModuleContext, customGenCodeId: number, model: CustomGenCodeInputModel) {
    const url = `${SystemApis.genCodeConfigs}/${customGenCodeId}`;
    const method = EnumMethod.Put;
    return this.apiService.requestApi<boolean>(context, url, method, model);
  }

  public setLastValue(context: IXModuleContext, customGenCodeId: number, model: CustomGenCodeBaseValueModel) {
    const url = `${SystemApis.genCodeConfigs}/${customGenCodeId}/setLastValue`;
    const method = EnumMethod.Put;
    return this.apiService.requestApi<boolean>(context, url, method, model);
  }

  public deleteLastValue(context: IXModuleContext, customGenCodeId: number, model: CustomGenCodeBaseValueModel) {
    const url = `${SystemApis.genCodeConfigs}/${customGenCodeId}/deleteLastValue`;
    const method = EnumMethod.Delete;
    return this.apiService.requestApi<boolean>(context, url, method, model);
  }

  public delete(context: IXModuleContext, customGenCodeId: number) {
    const url = `${SystemApis.genCodeConfigs}/${customGenCodeId}`;
    const method = EnumMethod.Delete;
    return this.apiService.requestApi<boolean>(context, url, method);
  }

  public create(context: IXModuleContext, model: CustomGenCodeInputModel) {
    const url = `${SystemApis.genCodeConfigs}`;
    const method = EnumMethod.Post;
    return this.apiService.requestApi<boolean>(context, url, method, model);
  }

  public generateCode(context: IXModuleContext, customGenCodeId: number, lastValue: number, fId: number, code: string, date: number | string) {
    const queries = {
      lastValue,
      code,
      fId,
      date: this.dateHelper.parseInputDate(date)
    }
    const url = this.apiService.addQueryString(`${SystemApis.genCodeConfigs}/${customGenCodeId}/GenerateCode`, queries);
    const method = EnumMethod.Post;
    return this.apiService.requestApi<CustomCodeModel>(context, url, method);
  }

  public generateCodeAndConfirm(context: IXModuleContext, customGenCodeId: number, lastValue: number, fId: number, code: string, date: number | string) {
    return this.generateCode(context, customGenCodeId, lastValue, fId, code, date)
      .pipe(concatMap(c => {
        return this.confirmCode(context, c.customGenCodeId).pipe(map(r => c.customCode));
      }))
  }

  public confirmCode(context: IXModuleContext, customGenCodeId: number) {
    const url = `${SystemApis.genCodeConfigs}/${customGenCodeId}/confirmCode`;
    const method = EnumMethod.Put;
    return this.apiService.requestApi<boolean>(context, url, method);
  }


  public formatConfig(cfg: CustomGenCodeOutputModel, code: string) {
    if (!cfg) return '';
    let str = ``;
    for (let i = 0; i < cfg.codeLength; i++) {
      str += 'x';
    }
    str = `${cfg.prefix}${cfg.seperator}${str}${cfg.suffix}`;
    str = str.replace(`%CODE%`, code);
    return str;
  }

  public loadParents(context: IXModuleContext, excludeId?: number, isAddDash: boolean = false) {
    return this.getList(context, '', 1, -1)
      .pipe(map(r => {
        if (r) {
          let lstParents: CustomGenCodeOutputModel[] = [{
            level: 0,
            customGenCodeName: '--Chọn cấu hình sinh mã--',
            customGenCodeId: undefined,
            description: '',
            codeLength: 0,
            prefix: '',
            suffix: '',
            seperator: '',
            lastCode: '',
            lastValue: 0,
            isActived: true,
            updatedUserId: 0,
            updatedTime: 0,
            createdTime: 0,
            sortOrder: -1,
            parentId: null,
            isDefault: false,
            currentLastValue: null,
            lastValues: [],
            baseFormat: '',
            codeFormat: ''
          }];

          this.getLevelTree(r.list, excludeId)
            .forEach(x => {
              if (isAddDash) {
                x.customGenCodeName = this.getDash(x.level - 1) + x.customGenCodeName;
              }
              lstParents.push(x);
            });
          return lstParents;
        } else {
          return null;
        }
      }));
  }

  private getDash(n: number): string {
    let str = '';
    for (let i = 0; i < n; i++) {
      str += '----';
    }
    return str;
  }

  public getLevelTree(lst: CustomGenCodeOutputModel[], excludeId: number) {
    let outputs = [];
    let st: CustomGenCodeOutputModel[] = [];
    let l = lst.filter(p => !p.parentId);
    l.reverse();
    l.forEach(p => {
      if (p.customGenCodeId != excludeId) {
        p.level = 1;
        st.push(p);
      }
    })

    while (st.length > 0) {
      let parent = st.pop();
      outputs.push(parent);
      let c = lst.filter(p => p.parentId == parent.customGenCodeId);
      c.reverse();
      c.forEach(p => {
        if (p.customGenCodeId != excludeId) {
          p.level = parent.level + 1;
          st.push(p);
        }
      })
    }
    return outputs;
  }
}
