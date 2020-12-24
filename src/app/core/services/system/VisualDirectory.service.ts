import { Injectable } from '@angular/core';

import { EnumObjectType } from 'src/app/common/constants/system/EnumObjectType';
import { ApiService } from 'src/app/core/services/base/api.service';
import { EnumMethod } from 'src/app/common/constants/global/Enums';
import { AuthenticationService } from 'src/app/core/services/base/authen.service';
import { SystemApis } from 'src/app/common/constants/system/SystemApis';
import { UserDataModel } from '../../models/system/userData.model';
import { UserOutput, UserInput } from '../../models/system/user.model';
import { IXModuleContext } from '../../models/base/IXModuleContext';
import { PagingData } from '../../models/base/responedata.model';

@Injectable({
    providedIn: 'root'
})
export class VisualDirectory {
    constructor(private apiService: ApiService) {

    }

    

}


