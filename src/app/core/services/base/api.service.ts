import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError, defer } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoaderService } from './loader.service';
import { REQUEST_TIMEOUT, UNAUTHORIZED, FORBIDDEN, BAD_REQUEST, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { ExtraRequestOptions, RequestUrl, FileObject } from './base.service';
import { template } from 'src/app/common/helpers/general';
import { EnumMethod } from 'src/app/common/constants/global/Enums';
import { ToastMessageService } from './toastMessage.service';
import { IXModuleContext } from '../../models/base/IXModuleContext';
import { ApiResponse } from '../../models/base/responedata.model';
import { GeneralCode } from 'src/app/common/constants/global/GeneralCode';
import { ErrorLogService } from 'src/app/shared/services/errorLog.service';
import { PopupService } from 'src/app/shared/services/popup.service';
import { PopupDetailErrorComponent } from 'src/app/shared/components/popup-detail-error/popup-detail-error.component';
import { dateHelperService } from 'src/app/shared/services/getFirstloadDate.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    protected httpClient: HttpClient,
    protected loaderService: LoaderService,
    protected toast: ToastMessageService,
    private errorLog: ErrorLogService,
    private popup: PopupService,
    private dateService: dateHelperService
  ) {
    let code = GeneralCode.Success;
  }

  API_ENDPOINT = environment.apiEndpoint;

  static getRequestUrl(requestUrl: RequestUrl | string): string {

    if (typeof requestUrl === 'string') {
      return requestUrl as string;
    }

    const r = requestUrl as RequestUrl;
    if (!r.params) {
      return r.url;
    }


    return template(
      r.url,
      r.params
    );

  }

  private handleError(errors: any, options?: ExtraRequestOptions) {

    let logType: string = 'UNKNOWN';

    if (!environment.production) {
      console.error('An error occurred', errors);
    }
    if (0 === errors.status) {
      // handle unknown error
      errors.error = {
        message: 'Vui lòng kiểm tra lại đường truyền mạng của bạn'
      };
      logType = 'NETWORK_ERROR';
    } else if (REQUEST_TIMEOUT === errors.status) {
      // handle request timeout
      errors.error = {
        message: 'The connection has timed out!'
      };
      logType = 'REQUEST_TIMEOUT';
    } else if (UNAUTHORIZED === errors.status) {
      // handle Unauthorized
      errors.error = {
        message: 'Truy cập bị từ chối! - Chưa xác thực người dùng.'
      };
      logType = 'UNAUTHORIZED';
    } else if (FORBIDDEN === errors.status) {
      // handle Unauthorized
      errors.error = {
        message: 'Truy cập bị từ chối! - Bạn không có quyền truy cập.'
      };
      logType = 'FORBIDDEN';
    }
    else if (INTERNAL_SERVER_ERROR === errors.status) {
      logType = 'INTERNAL_SERVER_ERROR';
      //   // handle internal server error
      //   errors.error = {
      //     message: {
      //       title: 'Không thể kết nối đến máy chủ.',
      //       body: 'Không thể kết nối đến máy chủ.'
      //     }
      //   };
    }


    if (!options || !options.noErrorMessage) {
      this.logError(errors, logType);
    }

    return throwError(errors);
  }

  // log error to local storage
  logError(errors, logType) {
    console.clear(); 
    console.log(errors); 
    console.log(logType);
    let errorMessage = errors.error && errors.error.message ? errors.error.message : errors.message;
    let shortMessage = (errorMessage && errorMessage.length > 50) ?
      (errorMessage as string).substr(0, 50) + '...'
      : errorMessage;


    let err = {
      content: errorMessage,
      time: this.dateService.getNow().getTime(),
      type: logType,
      url: errors.url ? errors.url : window.location.href
    }

    ErrorLogService.addError(err);

    if(errors.error.messege){
      this.toast.error(errors.error.messege).onTap.subscribe(data => {
        this.popup.open(PopupDetailErrorComponent, {
          error: err
        })
      });
    }else{
      this.toast.error(errors.error.message)
    }
  }


  delete(requestUrl: RequestUrl | string, options?: ExtraRequestOptions) {
    return this.request(this.httpClient.delete(ApiService.getRequestUrl(requestUrl), this.getRequestOptions(options)), options);
  }

  delete2<T>(requestUrl: RequestUrl | string, body: any | null, xmodule?: number, options?: ExtraRequestOptions) {
    let reqOptions = this.getRequestOptions(options, xmodule);
    if (!reqOptions) {
      reqOptions = {};
    }
    reqOptions.body = body;
    const r = this.httpClient.request<T>('DELETE', ApiService.getRequestUrl(requestUrl), reqOptions);
    return this.request<T>(r, options);
  }

  checkLoader(options: ExtraRequestOptions = {}, show = true) {
    if (options && options.withoutLoader) {
      return;
    }
    if (show) {
      this.loaderService.show();
    } else {
      this.loaderService.hide();
    }
  }

  get<T>(requestUrl: RequestUrl | string, xmodule?: number, options?: ExtraRequestOptions) {
    const url = ApiService.getRequestUrl(requestUrl);
    return this.request<T>(this.httpClient.get<T>(url, this.getRequestOptions(options, xmodule)), options);
  }

  patch<T>(requestUrl: RequestUrl | string, body: any | null, xmodule?: number, options?: ExtraRequestOptions) {
    return this.request<T>(this.httpClient.patch<T>(ApiService.getRequestUrl(requestUrl), body, this.getRequestOptions(options, xmodule)), options);
  }

  post<T>(requestUrl: RequestUrl | string, body: any | null, xmodule?: number, options?: ExtraRequestOptions) {
    return this.request<T>(
      this.httpClient.post<T>(
        ApiService.getRequestUrl(requestUrl),
        body,
        this.getRequestOptions(options, xmodule)),
      options);
  }

  postFiles<T>(context: IXModuleContext, requestUrl: RequestUrl | string, files: FileObject[], data: any | null, options?: ExtraRequestOptions) {
    const formData = new FormData();
    files.forEach(file => {
      formData.append(file.name, file.file, file.file.name);
    });
    if (data) {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          formData.append(key, data[key]);
        }
      }
    }

    return this.request<ApiResponse<T>>(this.httpClient.post<ApiResponse<T>>(ApiService.getRequestUrl(requestUrl),
      formData, this.getRequestOptions(options, context.moduleId)), options);
  }

  postFilesData<T>(context: IXModuleContext, requestUrl: RequestUrl | string, files: FileObject[], data: any | null, options?: ExtraRequestOptions) {
    const formData = new FormData();
    files.forEach(file => {
      formData.append(file.name, file.file, file.file.name);
    });
    if (data) {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          formData.append(key, data[key]);
        }
      }
    }

    return this.request<T>(this.httpClient.post<T>(ApiService.getRequestUrl(requestUrl),
      formData, this.getRequestOptions(options, context.moduleId)), options);
  }

  put<T>(requestUrl: RequestUrl | string, body: any | null, xmodule?: number, options?: ExtraRequestOptions) {
    return this.request<T>(this.httpClient.put<T>(ApiService.getRequestUrl(requestUrl), body, this.getRequestOptions(options, xmodule)), options);
  }

  requestApi<T>(context: IXModuleContext, url: string, method: EnumMethod, body?: any | null, options?: ExtraRequestOptions): Observable<T> {

    const xmodule = context.moduleId;
    let r: Observable<T> = null;
    switch (method) {
      case EnumMethod.Get:
        r = this.get<T>(url, xmodule, options);
        break;
      case EnumMethod.Post:
        r = this.post<T>(url, body, xmodule, options);
        break;
      case EnumMethod.Put:
        r = this.put<T>(url, body, xmodule, options);
        break;
      case EnumMethod.Delete:
        r = this.delete2<T>(url, body, xmodule, options);
        break;
    }


    return r.pipe(
      map(n => {
        const result = n as any as (ApiResponse<null>);
        if (!result) {
          if (result as any !== 0) {
            if (result) {
              this.toast.error(result.message, `Không thành công!`);
            }
          }
        }
        return n;
      })
    );
  }

  dowloadApi(context: IXModuleContext, url: string, method: EnumMethod, body?: any | null, options?: ExtraRequestOptions): Observable<any> {
    const xmodule = context.moduleId;
    let reqOptions = this.getRequestOptions(options, xmodule);
    if (!reqOptions) {
      reqOptions = {};
    }
    reqOptions.body = body;
    reqOptions.responseType = 'blob';
    reqOptions.observe = 'response';
    // responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    const r = this.httpClient.request(method, ApiService.getRequestUrl(url), reqOptions);
    return this.request(r, options)
      .pipe(map((r) => {

        const req = r as HttpResponse<Blob>;

        const blob = req.body;
        let fileName = null;
        const contentType = req.headers.get('Content-Type');
        const contentDisposition = req.headers.get('Content-Disposition');

        // IE/EDGE seems not returning some response header
        if (contentDisposition) {
          const start = contentDisposition.indexOf('=') + 1;
          const end = contentDisposition.indexOf(';', start);

          if (end > 0) {
            fileName = contentDisposition.substring(start, end);
          } else {
            fileName = contentDisposition.substring(start);
          }

          fileName = fileName.replace(/"/g, '');
        } else {
          fileName = 'unnamed.' + contentType.substring(contentType.indexOf('/') + 1);
        }

        if (window.navigator.msSaveOrOpenBlob) {
          // Internet Explorer
          window.navigator.msSaveOrOpenBlob(new Blob([blob], { type: contentType }), fileName);
        } else {
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = fileName;
          link.click();
        }
      }));
  }

  getFileApi(context: IXModuleContext, url: string, method: EnumMethod, body?: any | null, options?: ExtraRequestOptions): Observable<any> {
    const xmodule = context.moduleId;
    let reqOptions = this.getRequestOptions(options, xmodule);
    if (!reqOptions) {
      reqOptions = {};
    }
    reqOptions.body = body;
    reqOptions.responseType = 'blob';
    reqOptions.observe = 'response';
    const r = this.httpClient.request(method, ApiService.getRequestUrl(url), reqOptions);
    return this.request(r, options)
      .pipe(map((rr) => {
        const req = rr as HttpResponse<Blob>;
        const blob = req.body;
        const contentType = req.headers.get('Content-Type');
        const file = new Blob([blob], { type: contentType });
        return window.URL.createObjectURL(file);
      }));
  }

  getRequestOptions(options: ExtraRequestOptions = {}, xmodule?: number) {
    // tslint:disable-next-line: no-unused-expression
    options.responseType ? 'json' : options.responseType;
    if (!options.headers) {
      options.headers = new HttpHeaders();
      options.headers = options.headers.set('x-timezone-offset', String(new Date().getTimezoneOffset()));
    }

    if (xmodule > 0) {
      options.headers = options.headers.set('X-Module', xmodule.toString());
    }

    options.observe = 'body';
    return options;
  }
  prepare<T>(callback: () => void): (source: Observable<T>) => Observable<T> {
    return (source: Observable<T>): Observable<T> => defer(() => {
      callback();
      return source;
    });
  }

  indicate<T>(options?: ExtraRequestOptions): (source: Observable<T>) => Observable<T> {
    return (source: Observable<T>): Observable<T> => source.pipe(
      this.prepare(() => this.checkLoader(options)),
      finalize(() => this.checkLoader(options, false))
    );
  }

  request<T>(req: Observable<T>, options?: ExtraRequestOptions): Observable<T> {
    return req
      .pipe(this.indicate(options))
      .pipe(
        catchError((error) => {
          return this.handleError(error, options);
        })
      );
  }

  addQueryString(url: string, queries: any) {
    if (!queries) return url;

    let queryStr = '';
    for (let p of queries) {
      if (p && (queries[p] || queries[p] == 0 || queries[p] == false)) {
        if (queryStr) queryStr += '&';
        queryStr += `${p}=${encodeURIComponent(queries[p])}`;
      }
    }

    return `${url}${(url.indexOf('?') > 0 ? '&' : '?')}${queryStr}`;
  }
}
