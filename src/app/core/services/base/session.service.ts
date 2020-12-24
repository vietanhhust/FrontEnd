import { Injectable } from '@angular/core';
import { CurrentUser } from '../../models/base/currentuser.model';
import { ApiService } from './api.service';
import { Observable, forkJoin, Subject } from 'rxjs';
import { EnumModule, EnumMethod, EnumAction } from 'src/app/common/constants/global/Enums';
import { storage } from 'src/app/common/helpers/storage';
import { MeApis } from 'src/app/common/constants/me/MeApis';
import { takeLast } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IXModuleContext } from '../../models/base/IXModuleContext';
import { RolePermission, ModuleGroup, Module } from '../../models/system/role.model';
import { UserModel } from '../../models/base/UserModel';
import { UserOutput } from '../../models/system/user.model';
import { GencodeConfigService } from '../system/gencodeConfig.service';
import { CustomGencodeConfigService } from '../system/customgencodeConfig.service';
import { ErrorLogService } from 'src/app/shared/services/errorLog.service';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  storageKey = 'current_user';
  storageTokenKey = 'current_user_token';
  storageRefreshtokenTokenKey = 'current_user_refreshtoken';
  storagePermission = 'current_user_permission';
  context: IXModuleContext = {
    moduleId: EnumModule.Me
  };
  public moduleId: number;

  constructor(
    private apiService: ApiService,
    public router: Router,
    public customGenCodeService: CustomGencodeConfigService,
    public gencodeConfigService: GencodeConfigService
  ) {

  }
  get token(): string | null {
    return storage.getItem(this.storageTokenKey);
  }

  get user(): CurrentUser | null {
    const user = storage.getObject<CurrentUser>(this.storageKey);
    if (!user) {
      return null;
    }
    return new CurrentUser(user);
  }


  get permission(): RolePermission[] {
    const data = storage.getObject<RolePermission[]>(this.storagePermission);
    if (!data) {
      return [];
    }
    return data;
  }

  setPermission(data: RolePermission[]) {
    storage.setObject(this.storagePermission, data);
  }

  set(user: UserModel) {
    storage.setObject(this.storageKey, user);
    storage.setItem(this.storageTokenKey, user.token);
    storage.setItem(this.storageRefreshtokenTokenKey, user.refreshtoken);
  }

  clear() {
    storage.removeItem(this.storageKey);
    storage.removeItem(this.storageTokenKey);
    storage.removeItem(this.storageRefreshtokenTokenKey);
    storage.removeItem(this.storagePermission);
    storage.removeItem(ErrorLogService.errorKey);
  }


  public getCurentPermission() {
    const url = `${MeApis.me}/permissions`;
    const method = EnumMethod.Get;
    return this.apiService.requestApi<RolePermission[]>(this.context, url, method);
  }

  public getCurentInfo() {
    const url = `${MeApis.me}/info`;
    const method = EnumMethod.Get;
    return this.apiService.requestApi<UserOutput>(this.context, url, method);
  }

  public getModuleGroups() {
    const url = MeApis.getModuleGroups;
    const method = EnumMethod.Get;
    return this.apiService.requestApi<ModuleGroup[]>(this.context, url, method);
  }

  public getModules() {
    const url = MeApis.getModules;
    const method = EnumMethod.Get;
    return this.apiService.requestApi<Module[]>(this.context, url, method);
  }


  public loadCurrentModulesPermissions() {
    let subject = new Subject<boolean>();
    this.getCurentPermission()
      .subscribe(permissions => {

        this.processPermission(permissions);

        this.setPermission(permissions.filter(m => m.permission > 0));

        // when login
        subject.next(true);
        subject.complete();
      });

    return subject.asObservable();
  }

  public processPermission(permissions: RolePermission[]) {
    permissions.forEach(item => {

      item.isView = (item.permission & EnumAction.View) == EnumAction.View;;
      item.isAdd = (item.permission & EnumAction.Add) == EnumAction.Add;
      item.isUpdate = (item.permission & EnumAction.Update) == EnumAction.Update;
      item.isDelete = (item.permission & EnumAction.Delete) == EnumAction.Delete;
      item.isCensor = (item.permission & EnumAction.Censor) == EnumAction.Censor;
    });
  }
}
