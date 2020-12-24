import { Injectable, Type } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';

import { ApiService } from 'src/app/core/services/base/api.service';
import { SystemApis } from 'src/app/common/constants/system/SystemApis';
import { EnumMethod } from 'src/app/common/constants/global/Enums';
import { IXModuleContext } from '../../models/base/IXModuleContext';
import { PagingData } from '../../models/base/responedata.model';
import { UnitOutput, UnitInput } from '../../models/system/unit.model';
import { StepConfig, StepGroupConfig } from '../../models/system/stepConfig.model';

@Injectable({
    providedIn: 'root'
})
export class StepService {
    constructor(private apiService: ApiService) {

    }

    // Step config
    searchSteps(context: IXModuleContext, keyword: string, page: number, size: number) {
        let url = `${SystemApis.step}?keyword=${keyword}&page=${page}&size=${size}`;
        return this.apiService.requestApi<PagingData<StepConfig>>(context, url, EnumMethod.Get);
    }

    createStep(context: IXModuleContext, model: StepConfig) {
        let url = `${SystemApis.step}`;
        return this.apiService.requestApi<number>(context, url, EnumMethod.Post, model);
    }

    updateStep(context: IXModuleContext, stepId: number, model: StepConfig) {
        let url = `${SystemApis.step}/${stepId}`;
        return this.apiService.requestApi<boolean>(context, url, EnumMethod.Put, model);
    }

    deleteStep(context: IXModuleContext, stepId: number) {
        let url = `${SystemApis.step}/${stepId}`;
        return this.apiService.requestApi<boolean>(context, url, EnumMethod.Delete);
    }


    // StepGroup config
    searchStepGroups(context: IXModuleContext, keyword: string, page: number, size: number) {
        let url = `${SystemApis.stepGroup}?keyword=${keyword}&page=${page}&size=${size}`;
        return this.apiService.requestApi<PagingData<StepGroupConfig>>(context, url, EnumMethod.Get);
    }

    createStepGroup(context: IXModuleContext, model: StepGroupConfig) {
        let url = `${SystemApis.stepGroup}`;
        return this.apiService.requestApi<number>(context, url, EnumMethod.Post, model);
    }

    updateStepGroup(context: IXModuleContext, stepGroupId: number, model: StepGroupConfig) {
        let url = `${SystemApis.stepGroup}/${stepGroupId}`;
        return this.apiService.requestApi<boolean>(context, url, EnumMethod.Put, model);
    }

    deleteStepGroup(context: IXModuleContext, stepGroupId: number) {
        let url = `${SystemApis.stepGroup}/${stepGroupId}`;
        return this.apiService.requestApi<boolean>(context, url, EnumMethod.Delete);
    }
}
