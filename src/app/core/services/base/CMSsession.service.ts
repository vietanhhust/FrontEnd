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
import { UserModel } from '../../models/base/UserModel';
import { UserOutput } from '../../models/system/user.model';
import { GencodeConfigService } from '../system/gencodeConfig.service';
import { CustomGencodeConfigService } from '../system/customgencodeConfig.service';
import { ErrorLogService } from 'src/app/shared/services/errorLog.service';
import { CSMEnumModule } from 'src/app/common/constants/global/CSMEnumModule';
import { FrontEndRoles, CMSSessionModel } from '../../models/base/CMSSession.model';
import { RolePermission, ModuleGroup, Module } from '../../models/system/role.model';


@Injectable({
  providedIn: 'root'
})
export class CMSSessionService {

  cmsStorageKey = 'cms_current_user';
  cmsStorageTokenKey = 'cms_current_user_token';
  cmsStorageRefreshtokenTokenKey = 'cms_current_user_refreshtoken';
  cmsStoragePermission = 'cms_current_user_permission';
  cmsCurrentSession = 'cms_current_session'
  context: IXModuleContext = {
    moduleId: 0
  };
  public moduleId: number;

  constructor(
    private apiService: ApiService,
  ) {

  }
  get token(): string | null {
    return storage.getItem(this.cmsStorageTokenKey);
  }

  get user(): CurrentUser | null {
    const user = storage.getObject<CurrentUser>(this.cmsStorageKey);
    if (!user) {
      return null;
    }
    return new CurrentUser(user);
  }

  get permission(): RolePermission[] {
    const data = storage.getObject<RolePermission[]>(this.cmsStoragePermission);
    if (!data) {
      return [];
    }
    return data;
  }



  set(user: UserModel) {
    storage.setObject(this.cmsStorageKey, user);
    storage.setItem(this.cmsStorageTokenKey, user.token);
    storage.setItem(this.cmsStorageRefreshtokenTokenKey, user.refreshtoken);
  }

  setPermission(data: FrontEndRoles[]) {
    storage.setObject(this.cmsStoragePermission, data);
  }


  // Hàm này cũ của project ERP
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

        //this.setPermission(permissions.filter(m => m.permission > 0));

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







  // Triển khai cho project mới.
  // Lấy các frontendrole từ local storage
  getCMSPermission(): FrontEndRoles[] {
    const data = storage.getObject<any>(this.cmsStoragePermission);
    if (!data) {
      return [];
    }
    return data;
  }

  // Lưu các FrontendRole vào localStorage
  setCMSPermission(data: FrontEndRoles[]) {
    storage.setObject(this.cmsStoragePermission, data);
  }

  // Xóa các session storage đi
  clearStorage() {
    storage.removeItem(this.cmsStorageKey);
    storage.removeItem(this.cmsStorageTokenKey);
    storage.removeItem(this.cmsStorageRefreshtokenTokenKey);
    storage.removeItem(this.cmsStoragePermission);
    storage.removeItem(ErrorLogService.errorKey);
    storage.removeItem(this.cmsCurrentSession);
  }

  // Xem có quyền không theo frontend Code. 
  getPermissionByFrontendCode(frontenCode: number): boolean {
    if (this.getCMSPermission().length == 0) 
      return false;
    else 
      var found = this.getCMSPermission().find(x => x.frontendCode == frontenCode);
      if(found ==undefined){
        return false;
      }else{
        if(found.isActive){
          return true; 
        }else{
          return false;
        }
      }
  }

  // Lưu session đăng nhập hiện tại
  setCMSSession(data: CMSSessionModel) {
    storage.setObject(this.cmsCurrentSession, data);
  }

  // Lấy ra session hiện tại 
  getCMSSession(): CMSSessionModel {
    return storage.getObject<CMSSessionModel>(this.cmsCurrentSession);
  }
}
