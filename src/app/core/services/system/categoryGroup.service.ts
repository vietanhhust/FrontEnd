import { Injectable, Type } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';

import { ApiService } from 'src/app/core/services/base/api.service';
import { SystemApis } from 'src/app/common/constants/system/SystemApis';
import { EnumMethod } from 'src/app/common/constants/global/Enums';
import { IXModuleContext } from '../../models/base/IXModuleContext';
import { PagingData } from '../../models/base/responedata.model';
import { UnitOutput, UnitInput } from '../../models/system/unit.model';
import { CategoryGroup } from '../../models/system/categoryGroup.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryGroupService {
  constructor(private apiService: ApiService) {

  }

  // Lấy về nhóm danh mục
  getCategoryGroups(context: IXModuleContext){
    let url = `${SystemApis.categoryGroup}`; 
    return this.apiService.requestApi<CategoryGroup[]>(context, url, EnumMethod.Get);
  }

  // Tạo nhóm danh mục
  createCategoryGroup(context: IXModuleContext, model: CategoryGroup){
    let url = `${SystemApis.categoryGroup}`;  
    return this.apiService.requestApi<number>(context, url, EnumMethod.Post, model);
  }

  // Sửa nhóm danh mục
  updateCategoryGroup(context: IXModuleContext, id: number, model: CategoryGroup){
    let url = `${SystemApis.categoryGroup}/${id}`;
    return this.apiService.requestApi<boolean>(context, url, EnumMethod.Put, model);  
  }

  // Xóa nhóm danh mục 
  deleteCategoryGroup(context: IXModuleContext, id: number){
    let url = `${SystemApis.categoryGroup}/${id}`;
    return this.apiService.requestApi<boolean>(context, url, EnumMethod.Delete);  
  }
}
