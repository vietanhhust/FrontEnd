import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/base/api.service';
import { SystemApis } from 'src/app/common/constants/system/SystemApis';
import { EnumMethod } from 'src/app/common/constants/global/Enums';
import { IXModuleContext } from '../../models/base/IXModuleContext';
import { PagingData } from '../../models/base/responedata.model';
import { StockRole } from '../../models/stock/Stock';
import { RoleOutput, RoleInput, RolePermission, RoleLevel } from '../../models/system/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private apiService: ApiService) {

  }
  public getAllRoleOfStoack(context: IXModuleContext) {
    const url = `${SystemApis.roles}/Stocks`;
    const method = EnumMethod.Get;
    return this.apiService.requestApi<StockRole[]>(context, url, method);
  }
  
  public updateRoleOfStoack(context: IXModuleContext, data: StockRole[]) {
    const url = `${SystemApis.roles}/Stocks`;
    const method = EnumMethod.Put;
    return this.apiService.requestApi<null>(context, url, method, data);
  }
  //////////////

  public getAllRoleOfCate(context: IXModuleContext) {
    // const url = `${SystemApis.roles}/Categorys`;
    // const method = EnumMethod.Get;
    // return this.apiService.requestApi<PagingData<CateRole>>(context, url, method);
  }
  public updateRoleOfCate(context: IXModuleContext, data: any) {
    // const url = `${SystemApis.roles}/Categorys`;
    // const method = EnumMethod.Put;
    // return this.apiService.requestApi<null>(context, url, method, data);
  }
  //////////////

  public getAll(context: IXModuleContext, keyword: string, page: number, size: number) {
    const url = `${SystemApis.roles}?keyword=${keyword}&page=${page}&size=${size}`;
    const method = EnumMethod.Get;
    return this.apiService.requestApi<PagingData<RoleOutput>>(context, url, method);
  }
  public add(context: IXModuleContext, role: RoleInput) {
    const url = SystemApis.roles;
    const method = EnumMethod.Post;
    return this.apiService.requestApi<number>(context, url, method, role);
  }
  public update(context: IXModuleContext, roleId: number, role: RoleInput) {
    const url = `${SystemApis.roles}/${roleId}`;
    const method = EnumMethod.Put;
    return this.apiService.requestApi<null>(context, url, method, role);
  }

  public getDetail(context: IXModuleContext, roleId: number) {
    const url = `${SystemApis.roles}/${roleId}`;
    const method = EnumMethod.Get;
    return this.apiService.requestApi<RoleOutput>(context, url, method);
  }
  public delete(context: IXModuleContext, roleId: number) {
    const url = `${SystemApis.roles}/${roleId}`;
    const method = EnumMethod.Delete;
    return this.apiService.requestApi<null>(context, url, method);
}


  public getRolePermission(context: IXModuleContext, roleId: number) {
    const url = `${SystemApis.roles}/${roleId}/Permissions`;
    const method = EnumMethod.Get;
    return this.apiService.requestApi<RolePermission[]>(context, url, method);
  }

  public setRolePermission(context: IXModuleContext, roleId: number, data: RolePermission[]) {
    const url = `${SystemApis.roles}/${roleId}/Permissions`;
    const method = EnumMethod.Put;
    return this.apiService.requestApi<null>(context, url, method, data);
  }

  public getLevelTree(lst: RoleOutput[], excludeId: number) {
    const outputs: RoleLevel[] = [];
    const st: RoleLevel[] = [];
    const l = lst.filter(p => !p.parentRoleId);
    l.reverse();
    l.forEach(p => {
        if (p.roleId !== excludeId) {
            st.push({ level: 1, info: p });
        }
    });

    while (st.length > 0) {
        const parent = st.pop();
        outputs.push(parent);
        const c = lst.filter(p => p.parentRoleId == parent.info.roleId);
        c.reverse();
        c.forEach(p => {
            if (p.roleId != excludeId) {
                st.push({ level: parent.level + 1, info: p });
            }
        });
    }
    return outputs;
}
}
