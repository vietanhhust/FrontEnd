import { ExtraRequestOptions, BaseRequestOptions } from './base.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpHandler } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { LoaderService } from './loader.service';
import { ApiService } from 'src/app/core/services/base/api.service';
import { AppConfig } from 'src/app/common/config/app.config';
import { Observable } from 'rxjs';
import { MeApis } from 'src/app/common/constants/me/MeApis';
import { EnumMethod } from "src/app/common/constants/global/Enums";
import { IXModuleContext } from '../../models/base/IXModuleContext';
import { ResponeTokenData } from '../../models/base/responedata.model';
import { SystemApis } from 'src/app/common/constants/system/SystemApis';
import { SubsidiaryModel } from '../../models/system/subsidiary.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(protected apiService: ApiService) {
  }
  login(username: string, password: string, subsidiary_id: string): Observable<ResponeTokenData> {
    const params = new HttpParams({
      fromObject: {
        grant_type: 'password',
        username: username,
        password: password,
        subsidiary_id: subsidiary_id,
        client_id: AppConfig.client.client_id,
        client_secret: AppConfig.client.client_secret,
      }
    });
    const option = this.apiService.getRequestOptions();
    option.headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.apiService.post<ResponeTokenData>(
      MeApis.tokenEnpoint,
      params,
      0,
      option);
  }

  getCompany(context: IXModuleContext) {
    const url = `${SystemApis.subsidiary}/forLogin`;
    return this.apiService.requestApi<SubsidiaryModel>(context, url, EnumMethod.Get);
  }

  changePassword(context: IXModuleContext, oldPassword: string, newPassword: string) {
    let url = `${MeApis.me}/changePassword`
    return this.apiService.requestApi<null>(context, url, EnumMethod.Put, { oldPassword: oldPassword, newPassword: newPassword });
  }
  refreshToken(refreshToken: string): Observable<ResponeTokenData> {
    const params = new HttpParams({
      fromObject: {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: AppConfig.client.client_id,
        client_secret: AppConfig.client.client_secret,
      }
    });
    const option = this.apiService.getRequestOptions();
    option.headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.apiService.post<ResponeTokenData>(MeApis.tokenEnpoint, params, 0, option);
  }
}
