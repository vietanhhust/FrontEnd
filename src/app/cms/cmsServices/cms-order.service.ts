import { OnInit, OnChanges, Renderer2, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CMSSessionService } from 'src/app/core/services/base/CMSsession.service';
import { IXModuleContext } from 'src/app/core/models/base/IXModuleContext';
import { CMSOrderCreating, OrderApi } from '../cmsModel/order.model';
import { ApiService } from 'src/app/core/services/base/api.service';
import { EnumMethod } from 'src/app/common/constants/global/Enums';
@Injectable({
    providedIn: 'root'
})
export class CMSOrderService {
    constructor(private cmsSessionService: CMSSessionService,public apiService: ApiService) {
    }

    acceptOrder(context: IXModuleContext, model: CMSOrderCreating){
        let url = `${OrderApi}/neworder`
        return this.apiService.requestApi<number>(context, url, EnumMethod.Post, model); 
    }
}

