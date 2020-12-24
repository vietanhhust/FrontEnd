import { Injectable, Type } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';

import { ApiService } from 'src/app/core/services/base/api.service';
import { SystemApis } from 'src/app/common/constants/system/SystemApis';
import { EnumMethod } from 'src/app/common/constants/global/Enums';
import { IXModuleContext } from '../../models/base/IXModuleContext';
import { PagingData } from '../../models/base/responedata.model';
import { UnitOutput, UnitInput } from '../../models/system/unit.model';
import { GuideModel } from '../../models/system/guide.model';

@Injectable({
    providedIn: 'root'
})
export class GuideService {
    constructor(private apiService: ApiService) {

    }

    getAll(context: IXModuleContext, keyword?: string, pageIndex?: number, size?: number){
        let url = `${SystemApis.guide}?keyword=${keyword}&size=${size}&page=${pageIndex}`; 
        return this.apiService.requestApi<PagingData<GuideModel>>(context, url, EnumMethod.Get);
    }

    add(context: IXModuleContext, model: GuideModel){
        let url = SystemApis.guide; 
        return this.apiService.requestApi<number>(context, url, EnumMethod.Post, model);
    }

    update(context: IXModuleContext,guideId: number, model: GuideModel){
        let url = `${SystemApis.guide}/${guideId}`; 
        return this.apiService.requestApi<number>(context, url, EnumMethod.Put, model);
    }
    
    delete(context: IXModuleContext,guideId: number){
        let url = `${SystemApis.guide}/${guideId}`; 
        return this.apiService.requestApi<number>(context, url, EnumMethod.Delete);
    }

    getGuideByCode(context: IXModuleContext, guideCode: string){
        let url = `${SystemApis.guide}/byCode/${guideCode}`
        return this.apiService.requestApi<GuideModel[]>(context, url, EnumMethod.Get);
    }

    getDetail(context: IXModuleContext, guideId: number){
        let url = `${SystemApis.guide}/${guideId}`;
        return this.apiService.requestApi<GuideModel>(context, url, EnumMethod.Get);
    }
}
