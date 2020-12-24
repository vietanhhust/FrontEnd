import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/base/api.service';
import { SystemApis } from 'src/app/common/constants/system/SystemApis';
import { EnumMethod } from 'src/app/common/constants/global/Enums';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IXModuleContext } from '../../models/base/IXModuleContext';
import { PagingData } from '../../models/base/responedata.model';
import { MenuLevel } from '../../models/stock/ProductCate';
import { MenuOutputModel } from '../../models/system/businessinfo.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private apiService: ApiService) {

  }
  public loadParents(context: IXModuleContext, excludeId?: number): Observable<MenuLevel[]> {
    return this.search(context)
        .pipe(map(r => {
            if (r) {
                const lstParents: MenuLevel[] = [{ level: 0, info: { menuId: 0, menuName: 'Phân hệ', url: '' } }];
                this.getLevelTree(r as any, excludeId)
                    .forEach(l => {
                        lstParents.push(l);
                    });
                return lstParents;
            } else {
                return null;
            }
        }));
}
public getLevelTree(lst: MenuOutputModel[], excludeId: number) {
  const outputs = [];
  const st: MenuLevel[] = [];
  const l = lst.filter(p => !p.parentId);
  l.reverse();
  l.forEach(p => {
      if (p.menuId != excludeId) {
          st.push({ level: 1, info: p });
      }
  });

  while (st.length > 0) {
      const parent = st.pop();
      outputs.push(parent);
      const c = lst.filter(p => p.parentId == parent.info.menuId);
      c.reverse();
      c.forEach(p => {
          if (p.menuId != excludeId) {
              st.push({ level: parent.level + 1, info: p });
          }
      });
  }
  return outputs;
}
  public search(context: IXModuleContext) {
    const url = `${SystemApis.menu}`;
    const method = EnumMethod.Get;
    return this.apiService.requestApi<PagingData<MenuOutputModel>>(context, url, method);
  }
  public add(context: IXModuleContext, menu: MenuOutputModel) {
    const url = `${SystemApis.menu}`;
    const method = EnumMethod.Post;
    return this.apiService.requestApi<number>(context, url, method, menu);
  }
  public update(context: IXModuleContext, menuId: number, menu: MenuOutputModel) {
    const url = `${SystemApis.menu}/${menuId}`;
    const method = EnumMethod.Put;
    return this.apiService.requestApi<null>(context, url, method, menu);
  }
  public delete(context: IXModuleContext, menuId: number) {
    const url = `${SystemApis.menu}/${menuId}`;
    const method = EnumMethod.Delete;
    return this.apiService.requestApi<null>(context, url, method);
  }
  public getDetail(context: IXModuleContext, menuId: number) {
    const url = `${SystemApis.menu}/${menuId}`;
    const method = EnumMethod.Get;
    return this.apiService.requestApi<MenuOutputModel>(context, url, method);
  }

}

