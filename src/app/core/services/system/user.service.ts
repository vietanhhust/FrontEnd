import { Injectable } from '@angular/core';

import { EnumObjectType } from 'src/app/common/constants/system/EnumObjectType';
import { ApiService } from 'src/app/core/services/base/api.service';
import { SystemApis } from 'src/app/common/constants/system/SystemApis';
import { EnumMethod } from 'src/app/common/constants/global/Enums';
import { AuthenticationService } from 'src/app/core/services/base/authen.service';
import { MeApis } from 'src/app/common/constants/me/MeApis';
import { UserDataModel } from '../../models/system/userData.model';
import { UserOutput, UserInput, UserBasicInfoOutput } from '../../models/system/user.model';
import { IXModuleContext } from '../../models/base/IXModuleContext';
import { PagingData } from '../../models/base/responedata.model';
import { FileObject } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private apiService: ApiService, private session: AuthenticationService) {

  }
  public getAll(context: IXModuleContext, keyword: string, page: number, size: number) {
    const url = `${SystemApis.users}?keyword=${keyword}&page=${page}&size=${size}`;
    const method = EnumMethod.Get;
    return this.apiService.requestApi<PagingData<UserOutput>>(context, url, method);
  }

  public getByDepartment(context: IXModuleContext, departmentId: number) {
    const url = `${SystemApis.users}/departments/${departmentId}`;
    const method = EnumMethod.Get;
    return this.apiService.requestApi<UserBasicInfoOutput[]>(context, url, method);
  }

  public getByIds(context: IXModuleContext, ids: any) {
    const url = `${SystemApis.users}/GetListByUserIds`;
    const method = EnumMethod.Post;
    return this.apiService.requestApi<any>(context, url, method, ids);
  }

  public add(context: IXModuleContext, user: UserInput) {
    const url = `${SystemApis.users}`;
    const method = EnumMethod.Post;
    return this.apiService.requestApi<number>(context, url, method, user);
  }

  public addOwner(context: IXModuleContext, subsidiaryId: number, user: UserInput) {
    const url = `${SystemApis.users}/subsidiaryOwner/${subsidiaryId}`;
    const method = EnumMethod.Post;
    return this.apiService.requestApi<number>(context, url, method, user);
  }

  public update(context: IXModuleContext, userId: number, user: UserInput) {
    const url = `${SystemApis.users}/${userId}`;
    const method = EnumMethod.Put;
    return this.apiService.requestApi<boolean>(context, url, method, user);
  }
  public getDetail(context: IXModuleContext, userId: number) {
    const url = `${SystemApis.users}/${userId}`;
    const method = EnumMethod.Get;
    return this.apiService.requestApi<UserOutput>(context, url, method);
  }
  public getInfo(context: IXModuleContext) {
    const url = `${SystemApis.users}/me/info`;
    const method = EnumMethod.Get;
    return this.apiService.requestApi<UserOutput>(context, url, method);
  }

  public uploadAvatar(context: IXModuleContext, file: FileObject) {
    const url = `${SystemApis.users}/avatar`;
    return this.apiService.postFilesData<number>(context, url, [file], {});
  }


  public getFileUrl(context: IXModuleContext, id: number) {
    const url = `${SystemApis.avatarUrl}` + id.toString() + '/GetFileUrl';
    const method = EnumMethod.Get;
    return this.apiService.requestApi<object>(context, url, method);
  }

  public getOldAvatar(context: IXModuleContext, url: string) {
    const method = EnumMethod.Get;
    return this.apiService.requestApi<File>(context, url, method);
  }

  private getFile(context: IXModuleContext, url: string) {
    return this.apiService.requestApi<File>(context, url, EnumMethod.Get);
  }

  public getAvatarImage(context: IXModuleContext, id: number) {
    const url = `${SystemApis.avatarUrl}` + id.toString() + '/GetFileUrl';
    const method = EnumMethod.Get;
    this.apiService.requestApi<object>(context, url, method).
      subscribe(res => {
        return this.getFile(context, res.toString()).subscribe(respone => console.log(respone));
      });

  }

  public getUserData(context: IXModuleContext, key: string) {
    const method = EnumMethod.Get;
    const url = `${MeApis.me}/userData/${key}`;
    return this.apiService.requestApi<UserDataModel>(context, url, method);
  }

  public updateUserData(context: IXModuleContext, key: string, objData: any) {
    const method = EnumMethod.Put;
    const url = `${MeApis.me}/userData/${key}`;
    return this.apiService.requestApi<boolean>(context, url, method, { dataContent: JSON.stringify(objData) } as UserDataModel);
  }

  public deleteUser(context: IXModuleContext, userId: number) {
    const url = `${SystemApis.users}/${userId}`;
    const method = EnumMethod.Delete;
    return this.apiService.requestApi<boolean>(context, url, method);
  }

  public fieldDataForMapping(context: IXModuleContext) {
    // const url = `${SystemApis.users}/fieldDataForMapping`;
    // const method = EnumMethod.Get;
    // return this.apiService.requestApi<CategoryNameModel>(context, url, method);
  }

  public importExcelFromMapping(context: IXModuleContext, data: any, file: FileObject) {
    // const url = `${SystemApis.users}/importFromMapping`;
    // return this.apiService.postFilesData<boolean>(context, url, [file], { mapping: JSON.stringify(data) });
  }
}


